import {Component} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { divisions } from 'src/app/data/divisions.data';

@Component({
    selector: 'register-team-dialog',
    templateUrl: 'register-team-dialog.html',
})
export class DialogRegisterTeam {

    readonly formControl: FormGroup;

    public listOfDivisions = divisions;

    constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<DialogRegisterTeam>) {
            this.formControl = this.formBuilder.group({
                teamName: '',
                captainName: '',
                phone: '',
                email: '',
                division: '',
            })
        }

        onNoClick(): void {
            this.dialogRef.close();
        }
    }