import { Component, ViewChild } from '@angular/core';

import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, shareReplay } from 'rxjs/operators';

import { FreeAgent } from 'src/app/models/free-agent.model';
import { TeamFreeAgent } from 'src/app/models/team-free-agent.model';

@Component({
	selector: 'app-free-agents',
	templateUrl: './free-agents.component.html',
	styleUrls: ['./free-agents.component.scss']
})
export class FreeAgentsComponent {

	@ViewChild(MatTable, { static: true }) table: MatTable<FreeAgent> = Object.create(null);
	@ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);

	searchText: any;

	teamsDisplayedColumns: string[] = ['name', 'phone', 'email', 'genders', 'positions'];
	teamsDataSource = new MatTableDataSource<TeamFreeAgent>();
	teamsNoData: Observable<boolean>;

	playersDisplayedColumns: string[] = ['name', 'phone', 'email', 'gender', 'division'];
	playersDataSource = new MatTableDataSource<FreeAgent>();
	playersNoData: Observable<boolean>;


	public freeAgentTeams$: Observable<TeamFreeAgent[]>;
	public freeAgent$: Observable<FreeAgent[]>;

	constructor(public http: HttpClient) {
		// pull in data
		this.freeAgentTeams$ = this.http.get<TeamFreeAgent[]>('/api/team-free-agent').pipe(tap((teamFreeAgent: TeamFreeAgent[]) => {
			this.teamsDataSource.data = teamFreeAgent;

			this.teamsDataSource.sort = this.sort;

			this.teamsNoData = this.teamsDataSource.connect().pipe(map(data => data.length === 0));
		}));

		// pull in data
		this.freeAgent$ = this.http.get<FreeAgent[]>('/api/free-agent').pipe(tap((freeAgent: FreeAgent[]) => {
			this.playersDataSource.data = freeAgent;

			this.playersDataSource.sort = this.sort;

			this.playersNoData = this.playersDataSource.connect().pipe(map(data => data.length === 0));
		}));
	}
}
