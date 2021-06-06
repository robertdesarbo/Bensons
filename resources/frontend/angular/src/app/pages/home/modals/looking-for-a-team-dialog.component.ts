import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

import { Division } from 'src/app/models/division.model';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
	selector: 'looking-for-a-team-dialog',
	templateUrl: 'looking-for-a-team-dialog.html',
})
export class DialogLookingForATeam {

	readonly formControl: FormGroup;

	public division$: Observable<Division[]>;
	public listOfDivisions: Division[];

	constructor(private formBuilder: FormBuilder,
		public dialogRef: MatDialogRef<DialogLookingForATeam>,
		public http: HttpClient) {

		this.division$ = this.http.get<Division[]>('/api/division').pipe(tap((divisions: Division[]) => {
			this.listOfDivisions = divisions;
		}));

		this.division$.subscribe();

		this.formControl = this.formBuilder.group({
			name: '',
			phone: '',
			email: '',
			division: '',
		})
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
}
