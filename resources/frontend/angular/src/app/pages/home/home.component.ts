import { Component, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DialogRegisterTeam } from './modals/register-team-dialog.component';
import { DialogLookingForATeam } from './modals/looking-for-a-team-dialog.component';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Field } from 'src/app/models/field.model';
import { Team } from 'src/app/models/team.model';

@Component({
	selector: 'app-starter',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
	stacked = false;

	total_locations: number = 0;
	total_teams: number = 0;

	public field$: Observable<Field[]>;
	public team$: Observable<Team[]>;

	constructor(public dialog: MatDialog, public http: HttpClient) {
		this.field$ = this.http.get<Field[]>('/api/field').pipe(tap((fields: Field[]) => {
			this.total_locations = fields.length;
		}));

		this.team$ = this.http.get<Team[]>('/api/field').pipe(tap((teams: Team[]) => {
			this.total_locations = teams.length;
		}));

		this.field$.subscribe();
		this.team$.subscribe();

	}

	ngAfterViewInit() { }

	openRegisterDialog(): void {
		const dialogRef = this.dialog.open(DialogRegisterTeam, {
			width: '375px',
			data: {}
		});

		dialogRef.afterClosed().subscribe((result) => {
			console.log('The dialog was closed');
		});
	}

	openLookingForATeamDialog(): void {
		const dialogRef = this.dialog.open(DialogLookingForATeam, {
			width: '375px',
			data: {}
		});

		dialogRef.afterClosed().subscribe((result) => {
			console.log('The dialog was closed');
		});
	}
}
