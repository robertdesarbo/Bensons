import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpParams } from "@angular/common/http";
import { Observable, EMPTY } from 'rxjs';

import { Schedule } from 'src/app/models/schedule.model';

import {
	MatSnackBar,
	MatSnackBarHorizontalPosition,
	MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
	selector: 'dialog-schedule-game-dialog',
	templateUrl: 'dialog-schedule-game.html',
})
export class DialogScheduleGame {

	readonly formControl: FormGroup;

	public listOfDivisions;
	public listOfTeams;
	public listOfFields;
	public listOfUmpires;

	public errors;

	public scheduledGame$: Observable<Schedule>;

	constructor(private formBuilder: FormBuilder,
		private snackBar: MatSnackBar,
		public dialogRef: MatDialogRef<DialogScheduleGame>,
		private http: HttpClient,
		@Inject(MAT_DIALOG_DATA) public injectedData: any) {
		this.formControl = this.formBuilder.group({
			division: ['', Validators.required],
			homeTeam: ['', Validators.required],
			awayTeam: ['', Validators.required],
			date: ['', Validators.required],
			field: ['', Validators.required],
			umpire: ['']
		});

		if (this.injectedData.type === 'remove' || this.injectedData.type === 'edit') {
			const options = { params: new HttpParams().set('schedule', this.injectedData.scheduleId) };

			this.scheduledGame$ = this.http.get<Schedule>('/api/schedule-get-scheduled-game', options);

			this.scheduledGame$.subscribe((scheduledGame: Schedule) => {
				this.formControl.get('division').setValue(scheduledGame.home_team.division.id);
				this.formControl.get('homeTeam').setValue(scheduledGame.home_id);
				this.formControl.get('awayTeam').setValue(scheduledGame.away_id);
				this.formControl.get('date').setValue(scheduledGame.game_date);
				this.formControl.get('field').setValue(scheduledGame.field_id);
				// this.formControl.get('umpire').setValue(scheduledGame.umpire);
			});

		} else {
			this.scheduledGame$ = EMPTY;
			this.scheduledGame$.subscribe();
		}

		// pull in data
		this.http.get<any>('/api/schedule-get-divisions').subscribe((divisions) => {
			this.listOfDivisions = divisions;
		});

		this.formControl.get("division").valueChanges.subscribe(division => {
			const config = {
				params: {
					division: division
				}
			}

			this.http.get<any>('/api/schedule-game-set-up', config).subscribe((gameInfo) => {
				this.listOfTeams = gameInfo.teams;
				this.listOfFields = gameInfo.fields;
				this.listOfUmpires = gameInfo.umpires;
			});
		});

	}

	removeGame(): void {
		const formData = new FormData();
		formData.append('schedule', this.injectedData.scheduleId);

		this.http.post<any>('/api/remove-game', formData).subscribe(() => {
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
			const formData = new FormData();
			formData.append('homeTeam', this.formControl.get('homeTeam').value);
			formData.append('awayTeam', this.formControl.get('awayTeam').value);
			formData.append('date', new Date(this.formControl.get('date').value).toISOString());
			formData.append('field', this.formControl.get('field').value);
			formData.append('umpire', this.formControl.get('umpire').value);

			if (this.injectedData.scheduleId) {
				formData.append('schedule', this.injectedData.scheduleId);

				// editting a games
				this.http.post<any>('/api/edit-game', formData).subscribe(() => {
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
			} else {
				this.http.post<any>('/api/schedule-game', formData).subscribe(() => {
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

		} else {
			this.errors = ['required fields are missing'];
		}
	}

	cancel(): void {
		this.dialogRef.close(false);
	}
}
