import { Component, OnInit, Inject, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Team } from 'src/app/models/team.model';
import { Standings } from 'src/app/models/standings.model';

import { teams } from 'src/app/data/teams.data';

const standings_c_d: Standings[] = [
	Standings.from({
		team: teams.find(element => element.abbreviation == 'GIA') as Team,
		won: 1,
		lost: 2
	}),
	Standings.from({
		team: teams.find(element => element.abbreviation == 'CAK') as Team,
		won: 0,
		lost: 3
	}),
	Standings.from({
		team: teams.find(element => element.abbreviation == 'H4I') as Team,
		won: 1,
		lost: 3
	}),
	Standings.from({
		team: teams.find(element => element.abbreviation == 'HHS') as Team,
		won: 3,
		lost: 0
	}),
	Standings.from({
		team: teams.find(element => element.abbreviation == 'TBS') as Team,
		won: 2,
		lost: 2
	}),
	Standings.from({
		team: teams.find(element => element.abbreviation == 'TKS') as Team,
		won: 1,
		lost: 2
	}),
	Standings.from({
		team: teams.find(element => element.abbreviation == 'PUB') as Team,
		won: 4,
		lost: 0
	}),
	Standings.from({
		team: teams.find(element => element.abbreviation == 'BRJ') as Team,
		won: 2,
		lost: 2
	})
];

const standings_e: Standings[] = [
	Standings.from({
		team: teams.find(element => element.abbreviation == 'FAK') as Team,
		won: 1,
		lost: 2
	}),
	Standings.from({
		team: teams.find(element => element.abbreviation == 'HIT') as Team,
		won: 2,
		lost: 2
	}),
	Standings.from({
		team: teams.find(element => element.abbreviation == '518') as Team,
		won: 1,
		lost: 2
	}),
	Standings.from({
		team: teams.find(element => element.abbreviation == 'MIS') as Team,
		won: 3,
		lost: 1
	}),
	Standings.from({
		team: teams.find(element => element.abbreviation == 'TTB') as Team,
		won: 1,
		lost: 1
	}),
	Standings.from({
		team: teams.find(element => element.abbreviation == 'FVS') as Team,
		won: 0,
		lost: 4
	}),
	Standings.from({
		team: teams.find(element => element.abbreviation == 'BCS') as Team,
		won: 4,
		lost: 0
	})
];

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

	dataSource_divison_c_d = new MatTableDataSource<Standings>(standings_c_d);
	dataSource_divison_e = new MatTableDataSource<Standings>(standings_e);

	noDataLeagueCD: Observable<boolean>;
	noDataLeagueE: Observable<boolean>;

	constructor() {
		this.dataSource_divison_c_d = new MatTableDataSource<Standings>(this.addRank(standings_c_d));
		this.dataSource_divison_e = new MatTableDataSource<Standings>(this.addRank(standings_e));

		this.noDataLeagueCD = this.dataSource_divison_c_d.connect().pipe(map(data => data.length === 0));
		this.noDataLeagueE = this.dataSource_divison_e.connect().pipe(map(data => data.length === 0));
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
