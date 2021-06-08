import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';

import { Team } from 'src/app/models/team.model';
import { League } from 'src/app/models/league.model';
import { Division } from 'src/app/models/division.model';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'dialog-team-dialog',
	templateUrl: 'dialog-team.html',
	styleUrls: ['./dialog-team.scss']
})
export class DialogTeam {

	readonly formControl: FormGroup;

	public dialogTitle: string;
	public errors: string[];

	public team$: Observable<Team>;
	public division$: Observable<Division[]>;
	public league$: Observable<League[]>;

	public isLoading: boolean = true;

	constructor(private formBuilder: FormBuilder,
		private snackBar: MatSnackBar,
		public dialogRef: MatDialogRef<DialogTeam>,
		private http: HttpClient,
		@Inject(MAT_DIALOG_DATA) public injectedData: any) {

		this.formControl = this.formBuilder.group({
			name: ['', Validators.required],
			abbreviation: ['', Validators.required],
			league: ['', Validators.required],
			division: ['', Validators.required]
		});

		if (this.injectedData.type === 'remove') {
			this.dialogTitle = "Remove"
		} else if (this.injectedData.type === 'edit') {
			this.dialogTitle = "Update"
		} else {
			this.dialogTitle = "Add"
		}

		if (this.injectedData.type === 'remove' || this.injectedData.type === 'edit') {
			const option = {
				params: {
					team: this.injectedData.scheduleId
				}
			}

			this.team$ = this.http.get<Team>('/api/team', option);

			this.team$.subscribe((team: Team) => {
				this.formControl.get('name').setValue(team.name);
				this.formControl.get('abbreviation').setValue(team.abbreviation);
				this.formControl.get('league').setValue(team.division.league.id);
				this.formControl.get('division').setValue(team.division.id);

				this.isLoading = false;
			});

		} else {
			this.team$ = of(null);
			this.team$.subscribe(() => {
				this.isLoading = false;
			});
		}

		// pull in data
		this.league$ = this.http.get<League[]>('/api/league');

		this.formControl.get("league").valueChanges.subscribe(division => {
			const option = {
				params: {
					division: division
				}
			}

			this.division$ = this.http.get<Division[]>('/api/division', option);
		});

	}

	removeTeam(): void {
		let team: any = {
			team: this.injectedData.teamId
		}

		this.http.post<any>('/api/remove-team', team).subscribe(() => {
			this.snackBar.open('Team has been removed', 'Dismiss', {
				duration: 3000,
				horizontalPosition: "right",
				verticalPosition: "top",
			});

			this.dialogRef.close(true);
		},
			errorMessage => {
				this.snackBar.open('Something went wrong, team was not removed', 'Dismiss', {
					duration: 3000,
					horizontalPosition: "right",
					verticalPosition: "top",
				});
			});
	}

	addTeam(): void {
		if (this.formControl.valid) {

			let team: any = {
				name: this.formControl.get('name').value,
				abbreviation: this.formControl.get('abbreviation').value,
				league: this.formControl.get('league').value,
				division: this.formControl.get('division').value,
			}

			if (this.injectedData.teamId) {
				team = {
					...team,
					team: this.injectedData.teamId
				}

				// editting a teams
				this.http.post<any>('/api/edit-team', team).subscribe(() => {
					this.snackBar.open('Team has been edited', 'Dismiss', {
						duration: 3000,
						horizontalPosition: "right",
						verticalPosition: "top",
					});

					this.dialogRef.close(true);
				},
					errorMessage => {
						this.errors = Object.values(errorMessage.error.errors);
					});
			} else {
				this.http.post<any>('/api/add-team', team).subscribe(() => {
					this.snackBar.open('Team has been added', 'Dismiss', {
						duration: 3000,
						horizontalPosition: "right",
						verticalPosition: "top",
					});

					this.dialogRef.close(true);
				},
					errorMessage => {
						this.errors = Object.values(errorMessage.error.errors);
					});
			}
		}
	}

	cancel(): void {
		this.dialogRef.close(false);
	}
}
