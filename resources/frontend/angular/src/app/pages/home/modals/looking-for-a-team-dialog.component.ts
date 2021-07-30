import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatStepper } from '@angular/material/stepper';

import { Division } from 'src/app/models/division.model';

import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Gender } from 'src/app/models/enum/gender.enum';
import { Position } from 'src/app/models/enum/position.enum';
import { FreeAgentType } from 'src/app/models/enum/free-agent-type.enum';

@Component({
	selector: 'looking-for-a-team-dialog',
	templateUrl: 'looking-for-a-team-dialog.html',
	styleUrls: ['looking-for-a-team-dialog.scss'],
})
export class DialogLookingForATeam {

	readonly reasonFormGroup: FormGroup;
	readonly playerInformationFormGroup: FormGroup;
	readonly contactInformationFormGroup: FormGroup;
	public errors: string[];

	public positions = Object.values(Position);
	public freeAgentType = FreeAgentType;
	public division$: Observable<Division[]>;

	@ViewChild('playerInformationFormDirective') playerInformationFormDirective: FormGroupDirective;
	@ViewChild('contactInformationFormDirective') contactInformationFormDirective: FormGroupDirective;

	@ViewChild('stepper')
	set pane(stepper: MatStepper) {
		setTimeout(() => {
			this.childStepper$.next(stepper);
			this.totalStepsCount = stepper._steps.length;
		}, 0);
	}

	public childStepper$ = new BehaviorSubject<MatStepper>(null);
	public totalStepsCount: number;

	constructor(private formBuilder: FormBuilder,
		private snackBar: MatSnackBar,
		public dialogRef: MatDialogRef<DialogLookingForATeam>,
		public http: HttpClient) {

		this.division$ = this.http.get<Division[]>('/api/division');

		this.reasonFormGroup = this.formBuilder.group({
			reason: ['', Validators.required]
		});

		this.playerInformationFormGroup = this.formBuilder.group({
			positions: [''],
			gender: [''],
			genders: [''],
			division: ['']
		});

		this.contactInformationFormGroup = this.formBuilder.group({
			name: ['', Validators.required],
			phone: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]]
		});

		this.reasonFormGroup.get("reason").valueChanges.subscribe(reason => {
			if (!reason) {
				return;
			}

			// reset forms
			this.playerInformationFormGroup.reset();
			this.playerInformationFormDirective.resetForm();

			this.contactInformationFormGroup.reset();
			this.contactInformationFormDirective.resetForm();

			// dynamically set validation
			this.playerInformationFormGroup.controls["positions"].clearValidators();
			this.playerInformationFormGroup.controls["gender"].clearValidators();
			this.playerInformationFormGroup.controls["genders"].clearValidators();
			this.playerInformationFormGroup.controls["division"].clearValidators();

			this.playerInformationFormGroup.controls["positions"].updateValueAndValidity();
			this.playerInformationFormGroup.controls["gender"].updateValueAndValidity();
			this.playerInformationFormGroup.controls["genders"].updateValueAndValidity();
			this.playerInformationFormGroup.controls["division"].updateValueAndValidity();

			if (reason == FreeAgentType.team) {
				this.playerInformationFormGroup.controls["positions"].setValidators([Validators.required]);
				this.playerInformationFormGroup.controls["genders"].setValidators([Validators.required]);
			} else {
				this.playerInformationFormGroup.controls["division"].setValidators([Validators.required]);
				this.playerInformationFormGroup.controls["gender"].setValidators([Validators.required]);
			}

			this.playerInformationFormGroup.controls["positions"].updateValueAndValidity();
			this.playerInformationFormGroup.controls["gender"].updateValueAndValidity();
			this.playerInformationFormGroup.controls["genders"].updateValueAndValidity();
			this.playerInformationFormGroup.controls["division"].updateValueAndValidity();

		});
	}

	goBack() {
		this.childStepper$.value.previous();
	}

	goForward() {
		if (this.childStepper$.value.selectedIndex === this.totalStepsCount - 1) {
			this.submit();
		} else {
			this.childStepper$.value.next();
		}
	}

	submit(): void {
		if (this.reasonFormGroup.valid && this.playerInformationFormGroup.valid && this.contactInformationFormGroup.valid) {
			if (this.reasonFormGroup.get('reason').value == FreeAgentType.team) {
				let team: any = {
					name: this.contactInformationFormGroup.get('name').value,
					phone: this.contactInformationFormGroup.get('phone').value,
					email: this.contactInformationFormGroup.get('email').value,
					positions: this.playerInformationFormGroup.get('positions').value,
					genders: this.playerInformationFormGroup.get('genders').value
				}

				this.http.post<any>('/api/find-players', team)
					.subscribe(
						() => {
							this.snackBar.open('Your contact information has been added to the free agent list for finding players.', 'Dismiss', {
								duration: 6000,
								horizontalPosition: "right",
								verticalPosition: "top",
							});

							this.dialogRef.close(true);
						},
						errorMessage => {
							this.errors = Object.values(errorMessage.error.errors);
						}
					);
			} else {
				let player: any = {
					name: this.contactInformationFormGroup.get('name').value,
					phone: this.contactInformationFormGroup.get('phone').value,
					email: this.contactInformationFormGroup.get('email').value,
					division: this.playerInformationFormGroup.get('division').value,
					gender: this.playerInformationFormGroup.get('gender').value
				}

				this.http.post<any>('/api/find-team', player)
					.subscribe(
						() => {
							this.snackBar.open('Your contact information has been added to the free agent list for finding a team.', 'Dismiss', {
								duration: 6000,
								horizontalPosition: "right",
								verticalPosition: "top",
							});

							this.dialogRef.close(true);
						},
						errorMessage => {
							this.errors = Object.values(errorMessage.error.errors);
						}
					);
			}
		}
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
}
