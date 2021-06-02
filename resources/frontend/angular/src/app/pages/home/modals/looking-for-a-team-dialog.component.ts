import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { divisions } from 'src/app/data/divisions.data';

@Component({
	selector: 'looking-for-a-team-dialog',
	templateUrl: 'looking-for-a-team-dialog.html',
})
export class DialogLookingForATeam {

	readonly formControl: FormGroup;

	public listOfDivisions = divisions;

	constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<DialogLookingForATeam>) {
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
