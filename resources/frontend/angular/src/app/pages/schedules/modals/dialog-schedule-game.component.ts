import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Schedule } from 'src/app/models/schedule.model';
import { Division } from 'src/app/models/division.model';
import { Season } from 'src/app/models/season.model';
import { Field } from 'src/app/models/field.model';

import { MatSnackBar } from '@angular/material/snack-bar';

import { NgxMatMomentModule, NgxMatMomentAdapter, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular-material-components/moment-adapter';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NGX_MAT_DATE_FORMATS, NgxMatDateAdapter } from '@angular-material-components/datetime-picker';

import * as moment from 'moment';
import spacetime from 'spacetime';

export const CUSTOM_MOMENT_FORMATS = {
	parse: {
		dateInput: "dddd MMMM Do @ h:mm a"
	},
	display: {
		dateInput: "dddd MMMM Do @ h:mm a",
		monthYearLabel: "MMM YYYY",
		dateA11yLabel: "LL",
		monthYearA11yLabel: "MMMM YYYY"
	}
};

@Component({
	selector: 'dialog-schedule-game-dialog',
	templateUrl: 'dialog-schedule-game.html',
	styleUrls: ['./dialog-schedule-game.scss'],
	providers: [
		{ provide: NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
		{ provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_MOMENT_FORMATS },
		{ provide: NgxMatDateAdapter, useClass: NgxMatMomentAdapter },
	],
})
export class DialogScheduleGame {

	readonly spacetime = spacetime;
	readonly formControl: FormGroup;

	public errors: string[];

	public scheduledGame$: Observable<Schedule>;
	public division$: Observable<Division[]>;
	public season$: Observable<Season[]>;
	public game$: Observable<any[]>;

	public listOfFields: Field[];

	public totalFields: number;
	public fieldAlphaDisplay: boolean;

	public isLoading: boolean = true;

	constructor(private formBuilder: FormBuilder,
		private snackBar: MatSnackBar,
		public dialogRef: MatDialogRef<DialogScheduleGame>,
		private http: HttpClient,
		@Inject(MAT_DIALOG_DATA) public injectedData: any) {
		this.formControl = this.formBuilder.group({
			division: ['', Validators.required],
			season: ['', Validators.required],
			homeTeam: ['', Validators.required],
			awayTeam: ['', Validators.required],
			date: ['', Validators.required],
			field: ['', Validators.required],
			field_number: [{ value: '', disabled: true }],
			umpire: [''],
			homeScore: [''],
			awayScore: [''],
			outcome: [''],
			notes: ['']
		});

		if (this.injectedData.type === 'remove' || this.injectedData.type === 'edit') {
			const options = { params: new HttpParams().set('schedule', this.injectedData.scheduleId) };

			this.scheduledGame$ = this.http.get<Schedule>('/api/schedule-get-scheduled-game', options);

			this.scheduledGame$.subscribe((scheduledGame: Schedule) => {
				this.formControl.get('division').setValue(scheduledGame.home_team.division.id);
				this.formControl.get('season').setValue(scheduledGame.season_id);
				this.formControl.get('homeTeam').setValue(scheduledGame.home_id);
				this.formControl.get('awayTeam').setValue(scheduledGame.away_id);
				this.formControl.get('date').setValue(moment(scheduledGame.game_date));
				this.formControl.get('field').setValue(scheduledGame.field_id);
				this.formControl.get('umpire').setValue((scheduledGame.umpires === undefined || scheduledGame.umpires.length == 0 ? null : scheduledGame.umpires[0].id));
				this.formControl.get('notes').setValue(scheduledGame.notes);

				if (scheduledGame.field_number !== null) {
					this.formControl.get('field_number').setValue(scheduledGame.field_number);
					this.formControl.get('field_number').enable();
				}

				if (scheduledGame.home_score !== null) {
					this.formControl.get('homeScore').setValue(scheduledGame.home_score);
				}

				if (scheduledGame.away_score !== null) {
					this.formControl.get('awayScore').setValue(scheduledGame.away_score);
				}

				if (scheduledGame.completed === 1) {
					this.formControl.get('outcome').setValue('completed');
				}

				if (scheduledGame.delayed === 1) {
					this.formControl.get('outcome').setValue('delayed');
				}

				if (scheduledGame.rescheduled === 1) {
					this.formControl.get('outcome').setValue('rescheduled');
				}

				if (scheduledGame.canceled === 1) {
					this.formControl.get('outcome').setValue('canceled');
				}

				this.isLoading = false;
			});

			if (this.injectedData.type === 'edit') {
				// do not allow to change
				this.formControl.get('division').disable();
			}

		} else {
			this.scheduledGame$ = of(null);
			this.scheduledGame$.subscribe(() => {
				this.isLoading = false;
			});
		}

		// pull in data
		this.division$ = this.http.get<Division[]>('/api/divisions-with-active-seasons');

		this.formControl.get("division").valueChanges.subscribe(division => {
			const params = {
				params: {
					division: division
				}
			}

			this.season$ = this.http.get<any>('/api/active-seasons-by-division', params);;

			this.game$ = this.http.get<any>('/api/schedule-game-set-up', params).pipe(
				tap((game) => {
					this.listOfFields = game.fields;

					if (this.formControl.get("field").value) {
						this.updateFieldNumbers(this.formControl.get("field").value);
					}
				}));
		});

		this.formControl.get("field").valueChanges.subscribe(fieldId => {
			if (!this.listOfFields) {
				return;
			}

			this.updateFieldNumbers(fieldId);
		});

		this.formControl.get("homeScore").valueChanges.subscribe(() => {
			if (!this.formControl.get('outcome').value) {
				this.formControl.get('outcome').setValue('completed');
			}
		});

		this.formControl.get("awayScore").valueChanges.subscribe(() => {
			if (!this.formControl.get('outcome').value) {
				this.formControl.get('outcome').setValue('completed');
			}
		});

	}

	updateFieldNumbers(fieldId): void {
		const field = this.listOfFields.find(field => field.id === fieldId);

		this.totalFields = field ?.total_fields;
		this.fieldAlphaDisplay = field ?.field_alpha_display;

		if (this.totalFields === 1) {
			this.formControl.get('field_number').disable();
			this.formControl.get('field_number').setValue('');
		} else {
			this.formControl.get('field_number').enable();
		}
	}

	removeGame(): void {
		let game: any = {
			schedule: this.injectedData.scheduleId
		}

		this.http.post<any>('/api/remove-game', game).subscribe(() => {
			this.snackBar.open('Game has been removed', 'Dismiss', {
				duration: 3000,
				horizontalPosition: "right",
				verticalPosition: "top",
			});

			this.dialogRef.close(true);
		},
			errorMessage => {
				this.snackBar.open('Something went wrong, game was not removed', 'Dismiss', {
					duration: 3000,
					horizontalPosition: "right",
					verticalPosition: "top",
				});
			});
	}

	addGame(): void {
		if (this.formControl.valid) {

			let game: any = {
				season: this.formControl.get('season').value,
				homeTeam: this.formControl.get('homeTeam').value,
				awayTeam: this.formControl.get('awayTeam').value,
				date: this.formControl.get('date').value.format('YYYY-MM-DD HH:mm:ss'),
				field: this.formControl.get('field').value,
				field_number: this.formControl.get('field_number').value,
				umpire: this.formControl.get('umpire').value,
				homeScore: this.formControl.get('homeScore').value,
				awayScore: this.formControl.get('awayScore').value,
				outcome: this.formControl.get('outcome').value,
				notes: this.formControl.get('notes').value
			}

			if (this.injectedData.scheduleId) {
				game = {
					...game,
					schedule: this.injectedData.scheduleId
				}

				// editting a games
				this.http.post<any>('/api/edit-game', game).subscribe(() => {
					this.snackBar.open('Game has been edited', 'Dismiss', {
						duration: 3000,
						horizontalPosition: "right",
						verticalPosition: "top",
					});

					this.dialogRef.close(true);
				},
					errorMessage => {
						this.errors = Object.values(errorMessage.error.errors);
					});
			} else {
				this.http.post<any>('/api/schedule-game', game).subscribe(() => {
					this.snackBar.open('Game has been added', 'Dismiss', {
						duration: 3000,
						horizontalPosition: "right",
						verticalPosition: "top",
					});

					this.dialogRef.close(true);
				},
					errorMessage => {
						this.errors = Object.values(errorMessage.error.errors);
					});
			}
		}
	}

	getFieldDisplay(fieldNumber) {
		if (this.fieldAlphaDisplay) {
			return String.fromCharCode(96 + parseInt(fieldNumber, 10)).toUpperCase();
		} else {
			return fieldNumber;
		}
	}

	getFieldNumberCollection(total_fields: number) {
		return Array(total_fields).fill(1).map((x, i) => i + 1);
	}

	cancel(): void {
		this.dialogRef.close(false);
	}
}
