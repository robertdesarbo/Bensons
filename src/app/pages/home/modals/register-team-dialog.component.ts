import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
                captainName: '',
                teamName: '',
                division: '',
            })
        }

        onNoClick(): void {
            this.dialogRef.close();
        }
    }
