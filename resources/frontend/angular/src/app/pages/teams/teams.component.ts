import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { AuthenticationService } from 'src/app/authentication/authentication.service';

import { Team } from 'src/app/models/team.model';
import { Division } from 'src/app/models/division.model';
import { League } from 'src/app/models/league.model';

@Component({
	selector: 'app-teams',
	templateUrl: './teams.component.html',
	styleUrls: ['./teams.component.scss']
})
export class TeamsComponent {

	@ViewChild(MatTable, { static: true }) table: MatTable<Team> = Object.create(null);
	@ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);
	searchText: any;
	displayedColumns: string[] = ['name', 'abbreviation', 'league', 'division'];
	dataSource = new MatTableDataSource<Team>();
	noData: Observable<boolean>;

	readonly formControl: FormGroup;

	public team$: Observable<Team[]>;
	public division$: Observable<Division[]>;
	public league$: Observable<League[]>;

	constructor(
		private formBuilder: FormBuilder, public dialog: MatDialog,
		public authenticationService: AuthenticationService,
		public http: HttpClient) {

		// pull in data
		this.division$ = this.http.get<Division[]>('/api/division');
		this.league$ = this.http.get<League[]>('/api/league');

		this.team$ = this.http.get<Team[]>('/api/team').pipe(tap((teams: Team[]) => {
			this.dataSource.data = teams;
			this.noData = this.dataSource.connect().pipe(map(data => data.length === 0));
		}));

		this.team$.subscribe(() => { },
			(errorResponse) => { console.log(errorResponse); },
			() => {
				this.dataSource.filterPredicate = ((data: Team, filter: string): boolean => {
					let filterObject: { team: string, division: number | string, league: number | string };
					filterObject = JSON.parse(filter);

					let teamSearch = true;
					let divisionSearch = true;
					let leagueSearch = true;

					if (filterObject.team || filterObject.division || filterObject.league) {
						teamSearch = !filterObject.team || data.name.toLowerCase().includes(filterObject.team) || data.name.toLowerCase().includes(filterObject.team);

						divisionSearch = !filterObject.division || data.division.id === filterObject.division || filterObject.division == "All";

						leagueSearch = !filterObject.league || data.division.league.id === filterObject.league || filterObject.league == "All";
					}

					return teamSearch && divisionSearch && leagueSearch;
				});
			});


		this.formControl = this.formBuilder.group({
			team: '',
			league: '',
			division: ''
		});

		this.formControl.valueChanges.subscribe(value => {
			if (value.team) {
				value = { ...value, team: value.team.trim().toLowerCase() };
			}

			// need to stringify because of type issue with filterPredicate
			this.dataSource.filter = JSON.stringify(value);
		});

	}

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
	}

	applyFilter(filterValue: string): void {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	searchTeamName(filterValue: string): void {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	searchDivision(filterValue: string): void {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	searchLeague(filterValue: string): void {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	openTeam(type, teamId): void {
		let data = {};

		data['type'] = type;
		data['teamId'] = teamId;

		// const dialogRef = this.dialog.open(DialogScheduleGame, {
		// 	width: '475px',
		// 	data: data
		// });
		//
		// dialogRef.afterClosed().subscribe((refreshData) => {
		// 	if (refreshData) {
		// 		this.loadSchedule().subscribe();
		// 	}
		// });
	}
}
