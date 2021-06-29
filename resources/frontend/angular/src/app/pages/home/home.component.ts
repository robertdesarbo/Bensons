import { Component, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DialogRegisterTeam } from './modals/register-team-dialog.component';
import { DialogLookingForATeam } from './modals/looking-for-a-team-dialog.component';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { LeagueStat } from 'src/app/models/league-stat.model';

@Component({
	selector: 'app-starter',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
	stacked = false;

	public leagueStat$: Observable<LeagueStat[]>;

	constructor(public dialog: MatDialog, public http: HttpClient) {
		this.leagueStat$ = this.http.get<LeagueStat[]>('/api/home/stats').pipe(
			shareReplay()
		);
	}

	ngAfterViewInit(): void {
		(<any>window).twttr.widgets.load();
	}

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
