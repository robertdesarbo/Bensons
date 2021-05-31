import {Component} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'add-game-dialog',
    templateUrl: 'add-game-dialog.html',
})
export class DialogAddGame {

    readonly formControl: FormGroup;

    public listOfTeams;
    public listOfFields;
    public listOfUmpires;

    constructor(private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<DialogAddGame>,
        private http: HttpClient) {
            this.formControl = this.formBuilder.group({
                homeTeam: '',
                awayTeam: '',
                date: '',
                field: '',
                umpire: '',
            })


            // pull in data
            this.http.get<any>('/api/schedule-game-set-up').subscribe((data) => {
                this.listOfTeams = data.teams;
                this.listOfFields = data.fields;
                this.listOfUmpires = data.umpires;
            });

        }

        onNoClick(): void {
            this.dialogRef.close();
        }
    }
