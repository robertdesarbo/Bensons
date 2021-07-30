import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatStepper } from '@angular/material/stepper';

import { Division } from 'src/app/models/division.model';

import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'looking-for-a-team-dialog',
	templateUrl: 'looking-for-a-team-dialog.html',
	styleUrls: ['looking-for-a-team-dialog.scss'],
})
export class DialogLookingForATeam {

	readonly reasonFormGroup: FormGroup;
	readonly playerInfoFormGroup: FormGroup;
	readonly contactInformationFormGroup: FormGroup;
	public errors: string[];

	public division$: Observable<Division[]>;

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

		this.playerInfoFormGroup = this.formBuilder.group({
			positions: [''],
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

			this.playerInfoFormGroup.controls["positions"].clearValidators();
			this.playerInfoFormGroup.controls["genders"].clearValidators();
			this.playerInfoFormGroup.controls["division"].clearValidators();

			this.playerInfoFormGroup.controls["positions"].updateValueAndValidity();
			this.playerInfoFormGroup.controls["genders"].updateValueAndValidity();
			this.playerInfoFormGroup.controls["division"].updateValueAndValidity();

			if (reason == "need_players") {
				this.playerInfoFormGroup.controls["positions"].setValidators([Validators.required]);
				this.playerInfoFormGroup.controls["genders"].setValidators([Validators.required]);
			} else {
				this.playerInfoFormGroup.controls["division"].setValidators([Validators.required]);
			}
		});
	}

	goBack() {
		this.childStepper$.value.previous();
	}

	goForward() {
		this.childStepper$.value.next();
	}

	submit(): void {
		if (this.reasonFormGroup.valid && this.playerInfoFormGroup.valid && this.contactInformationFormGroup.valid) {
			if (this.reasonFormGroup.get('reason').value == 'need_players') {
				let team: any = {
					name: this.contactInformationFormGroup.get('name').value,
					phone: this.contactInformationFormGroup.get('phone').value,
					email: this.contactInformationFormGroup.get('email').value,
					positions: this.playerInfoFormGroup.get('positions').value,
					genders: this.playerInfoFormGroup.get('genders').value
				}

				this.http.post<any>('/api/find-player', team)
					.subscribe(
						() => {
							this.snackBar.open('Your contact information has been added to the free agent list for finding players.', 'Dismiss', {
								duration: 3000,
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
					division: this.playerInfoFormGroup.get('division').value,
				}

				this.http.post<any>('/api/find-team', player)
					.subscribe(
						() => {
							this.snackBar.open('Your contact information has been added to the free agent list for finding a team.', 'Dismiss', {
								duration: 3000,
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
