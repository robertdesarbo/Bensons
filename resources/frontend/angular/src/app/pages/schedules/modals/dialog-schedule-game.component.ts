import {Component, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
    selector: 'dialog-schedule-game-dialog',
    templateUrl: 'dialog-schedule-game.html',
})
export class DialogScheduleGame {

    readonly formControl: FormGroup;

    public listOfDivisions;
    public listOfTeams;
    public listOfFields;
    public listOfUmpires;

    public errors;

    constructor(private formBuilder: FormBuilder,
        private snackBar: MatSnackBar,
        public dialogRef: MatDialogRef<DialogScheduleGame>,
        private http: HttpClient,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.formControl = this.formBuilder.group({
                division: ['', Validators.required],
                homeTeam: ['', Validators.required],
                awayTeam: ['', Validators.required],
                date: ['', Validators.required],
                field: ['', Validators.required],
                umpire: ['']
            });

            if(data.schedule) {
                this.http.get<any>('/api/schedule-get-scheduled-game').subscribe((scheduled_game) => {
                    this.formControl.get('division').setValue(scheduled_game.division);
                    this.formControl.get('homeTeam').setValue(scheduled_game.home_id);
                    this.formControl.get('awayTeam').setValue(scheduled_game.away_id);
                    this.formControl.get('date').setValue(scheduled_game.game_date);
                    this.formControl.get('field').setValue(scheduled_game.field_id);
                    // this.formControl.get('umpire').setValue(scheduled_game.umpire);
                });

            }

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

        removeGame(): void {
            const formData = new FormData();
            formData.append('schedule', this.data.schedule);

            this.http.post<any>('/api/remove-game', formData).subscribe(() => {
                this.snackBar.open('Game has been removed', 'Dismiss', {
                    duration: 3000,
                    horizontalPosition: "right",
                    verticalPosition: "top",
                });

                this.dialogRef.close();
            },
            errorMessage => {
                this.snackBar.open('Something went wrong, game was not removed', 'Dismiss', {
                    duration: 3000,
                    horizontalPosition: "right",
                    verticalPosition: "top",
                });
            } );
        }

        addGame(): void {
            if(this.formControl.valid){
                const formData = new FormData();
                formData.append('homeTeam', this.formControl.get('homeTeam').value);
                formData.append('awayTeam', this.formControl.get('awayTeam').value);
                formData.append('date', new Date(this.formControl.get('date').value).toISOString());
                formData.append('field', this.formControl.get('field').value);
                formData.append('umpire', this.formControl.get('umpire').value);

                if(this.data.schedule) {
                    formData.append('schedule', this.data.schedule);

                    // editting a games
                    this.http.post<any>('/api/edit-game', formData).subscribe(() => {
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
                }

            } else {
                this.errors = [ 'required fields are missing' ];
            }
        }

        cancel(): void {
            this.dialogRef.close();
        }
    }
