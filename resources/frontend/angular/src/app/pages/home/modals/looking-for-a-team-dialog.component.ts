import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Division } from 'src/app/models/division.model';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'looking-for-a-team-dialog',
	templateUrl: 'looking-for-a-team-dialog.html',
})
export class DialogLookingForATeam {

	readonly formControl: FormGroup;
	public errors: string[];

	public division$: Observable<Division[]>;

	constructor(private formBuilder: FormBuilder,
		private snackBar: MatSnackBar,
		public dialogRef: MatDialogRef<DialogLookingForATeam>,
		public http: HttpClient) {

		this.division$ = this.http.get<Division[]>('/api/division');

		this.formControl = this.formBuilder.group({
			name: ['', Validators.required],
			phone: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			division: ['', Validators.required]
		})
	}

	findTeam(): void {
		if (this.formControl.valid) {
			const formData = new FormData();
			formData.append('name', this.formControl.get('name').value);
			formData.append('phone', this.formControl.get('phone').value);
			formData.append('email', this.formControl.get('email').value);
			formData.append('division', this.formControl.get('division').value);

			this.http.post<any>('/api/find-team', formData)
				.subscribe(
					() => {
						this.snackBar.open(this.formControl.get('name').value + ' has been added to the free agent list.', 'Dismiss', {
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
