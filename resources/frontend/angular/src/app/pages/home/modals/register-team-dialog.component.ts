import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Division } from 'src/app/models/division.model';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'register-team-dialog',
	templateUrl: 'register-team-dialog.html',
})
export class DialogRegisterTeam {

	readonly formControl: UntypedFormGroup;
	public errors: string[];

	public division$: Observable<Division[]>;

	constructor(private formBuilder: UntypedFormBuilder,
		private snackBar: MatSnackBar,
		public dialogRef: MatDialogRef<DialogRegisterTeam>,
		public http: HttpClient) {

		this.division$ = this.http.get<Division[]>('/api/division');

		this.formControl = this.formBuilder.group({
			teamName: ['', Validators.required],
			captainName: ['', Validators.required],
			phone: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			division: ['', Validators.required],
		})
	}

	registerTeam(): void {
		if (this.formControl.valid) {
			let team: any = {
				teamName: this.formControl.get('teamName').value,
				captainName: this.formControl.get('captainName').value,
				phone: this.formControl.get('phone').value,
				email: this.formControl.get('email').value,
				division: this.formControl.get('division').value,
			}

			this.http.post<any>('/api/register-team', team)
				.subscribe(
					() => {
						this.snackBar.open(this.formControl.get('teamName').value + ' is pending approval.', 'Dismiss', {
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

	onNoClick(): void {
		this.dialogRef.close();
	}
}
