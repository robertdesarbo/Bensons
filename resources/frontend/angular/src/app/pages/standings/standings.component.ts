import { Component, OnInit, Inject, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Team } from 'src/app/models/team.model';
import { Standings } from 'src/app/models/standings.model';


@Component({
	selector: 'app-standings',
	templateUrl: './standings.component.html',
	styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit {

	@ViewChild(MatTable, { static: true }) table: MatTable<Standings> = Object.create(null);
	@ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);
	searchText: any;
	displayedColumns: string[] = ['rank', 'team', 'won', 'lost', 'win_percentage', 'games_behind', 'games_played'];

	dataSource_divison_c_d = new MatTableDataSource<Standings>();
	dataSource_divison_e = new MatTableDataSource<Standings>();

	noDataLeagueCD: Observable<boolean>;
	noDataLeagueE: Observable<boolean>;

	public standingDivisionCD$: Observable<Standings[]>;
	public standingDivisionE$: Observable<Standings[]>;

	constructor(public http: HttpClient) {

		const optionsDivisionCD = { params: new HttpParams().set('division', 1) };
		this.standingDivisionCD$ = this.http.get<Standings[]>('/api/standing', optionsDivisionCD).pipe(tap((standing: Standings[]) => {
			this.dataSource_divison_c_d.data = this.addRank(standing);
			this.noDataLeagueCD = this.dataSource_divison_c_d.connect().pipe(map(data => data.length === 0));
		}));

		this.standingDivisionCD$.subscribe(() => { },
			(errorResponse) => { console.log(errorResponse); },
			() => {
			});


		const optionsDivisionE = { params: new HttpParams().set('division', 2) };
		this.standingDivisionE$ = this.http.get<Standings[]>('/api/standing', optionsDivisionE).pipe(tap((standing: Standings[]) => {
			this.dataSource_divison_e.data = this.addRank(standing);
			this.noDataLeagueE = this.dataSource_divison_e.connect().pipe(map(data => data.length === 0));
		}));

		this.standingDivisionE$.subscribe(() => { },
			(errorResponse) => { console.log(errorResponse); },
			() => {
			});
	}

	compareWins(left: Standings, right: Standings): number {
		return right.won - left.won;
	}

	addRank(sorted_standings: Standings[]): Standings[] {
		sorted_standings = sorted_standings.sort(this.compareWins);

		let first_place: Standings;
		return sorted_standings.map(function(standing, index) {
			if (index === 0) {
				first_place = standing;
			}

			let standing_with_rank = Standings.from({
				...standing,
				rank: index + 1,
				games_behind: ((first_place.won - first_place.lost) - (standing.won - standing.lost)) / 2
			});

			return standing_with_rank;
		});
	}

	ngOnInit(): void {
		this.dataSource_divison_c_d.filterPredicate = (data: Standings, filter: string) => {
			return data.team.name.toLowerCase().includes(filter);
		};

		this.dataSource_divison_e.filterPredicate = (data: Standings, filter: string) => {
			return data.team.name.toLowerCase().includes(filter);
		};

		// this.dataSource.sortingDataAccessor = (item, property) => {
		//     switch (property) {
		//         case 'team': return item.team.name;
		//
		//         default: return item[property] as any;
		//     }
		// };

	}

	ngAfterViewInit(): void {
		this.dataSource_divison_c_d.sort = this.sort;
		this.dataSource_divison_e.sort = this.sort;
	}

	applyFilter(filterValue: string): void {
		this.dataSource_divison_c_d.filter = filterValue.trim().toLowerCase();
		this.dataSource_divison_e.filter = filterValue.trim().toLowerCase();
	}

}
