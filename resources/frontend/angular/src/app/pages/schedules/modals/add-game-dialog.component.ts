import {Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
    selector: 'add-game-dialog',
    templateUrl: 'add-game-dialog.html',
})
export class DialogAddGame {

    readonly formControl: FormGroup;

    public listOfDivisions;
    public listOfTeams;
    public listOfFields;
    public listOfUmpires;

    public errors;

    constructor(private formBuilder: FormBuilder,
        private snackBar: MatSnackBar,
        public dialogRef: MatDialogRef<DialogAddGame>,
        private http: HttpClient) {
            this.formControl = this.formBuilder.group({
                division: ['', Validators.required],
                homeTeam: ['', Validators.required],
                awayTeam: ['', Validators.required],
                date: ['', Validators.required],
                field: ['', Validators.required],
                umpire: ['']
            })

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

                this.http.get<any>('/api/schedule-game-set-up', config).subscribe((data) => {
                    this.listOfTeams = data.teams;
                    this.listOfFields = data.fields;
                    this.listOfUmpires = data.umpires;
                });
            })

        }

        addGame(): void {
            if(this.formControl.valid){
                const formData = new FormData();
                formData.append('homeTeam', this.formControl.get('homeTeam').value);
                formData.append('awayTeam', this.formControl.get('awayTeam').value);
                formData.append('date', new Date(this.formControl.get('date').value).toISOString());
                formData.append('field', this.formControl.get('field').value);
                formData.append('umpire', this.formControl.get('umpire').value);

                this.http.post<any>('/api/schedule-game', formData).subscribe(() => {
                    this.snackBar.open('Game has been added', 'Dismiss', {
                        duration: 3000,
                        horizontalPosition: "right",
                        verticalPosition: "top",
                    });

                    this.dialogRef.close();
                },
                errorMessage => {
                    this.errors = Object.values(errorMessage.error.errors);
                } );
            } else {
                this.errors = [ 'required fields are missing' ];
            }
        }

        onNoClick(): void {
            this.dialogRef.close();
        }
    }
