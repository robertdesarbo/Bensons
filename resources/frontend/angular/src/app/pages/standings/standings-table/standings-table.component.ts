import { Component, OnInit, ViewChild, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Standings } from 'src/app/models/standings.model';
import { Division } from 'src/app/models/division.model';
import { Season } from 'src/app/models/season.model';

import spacetime from 'spacetime';

@Component({
	selector: 'app-standings-table',
	templateUrl: './standings-table.component.html',
	styleUrls: ['./standings-table.component.scss']
})
export class StandingsTableComponent implements OnInit {
	@Input() season: Season;

	@Input() teamSearch: string;
	@Input() divisionSearch: string;
	@Input() divisionBadgeName: string;

	@Output() searchHasResultsEmitter = new EventEmitter<boolean>();

	@ViewChild(MatTable, { static: true }) table: MatTable<Standings> = Object.create(null);
	@ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);
	searchText: any;
	displayedColumns: string[] = ['rank', 'team', 'won', 'lost', 'win_percentage', 'games_behind', 'games_played'];

	dataSource = new MatTableDataSource<Standings>();
	notData$: Observable<boolean>;

	public standings$: Observable<Standings[]>;

	public division_name: string;

	public searchValues: { team: '', division: null };

	public showTable = true;

	constructor(private http: HttpClient,
		private changeDetector: ChangeDetectorRef) {
		//
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.teamSearch || changes.divisionSearch) {
			if (changes.teamSearch) {
				this.searchValues = { ...this.searchValues, team: changes ?.teamSearch ?.currentValue.trim().toLowerCase() };
			}

			if (changes.divisionSearch) {
				this.searchValues = { ...this.searchValues, division: changes ?.divisionSearch ?.currentValue };
			}

			this.dataSource.filter = JSON.stringify(this.searchValues);
		}
	}

	ngOnInit(): void {
		const season_name = spacetime(this.season.start_at, 'America/New_York').season();

		this.division_name = this.season.division.league.name + " " + this.season.division.name + " (" + season_name.charAt(0).toUpperCase() + season_name.slice(1) + ")";

		const season = { params: new HttpParams().set('season', this.season.id) };
		this.standings$ = this.http.get<Standings[]>('/api/standing', season).pipe(tap((standing: Standings[]) => {
			this.dataSource.data = this.addRank(standing);
			this.notData$ = this.dataSource.connect().pipe(
				tap((data) => {
					if (data.length === 0) {
						this.showTable = false;
					} else {
						this.showTable = true;
						this.searchHasResultsEmitter.emit(true);
					}

					this.changeDetector.detectChanges();
				}),
				map(data => data.length === 0));
		}));

		this.dataSource.filterPredicate = ((data: Standings, filter: string): boolean => {
			let filterObject: { team: string, division: number | string, umpire: number | string, previousWeeks: boolean };
			filterObject = JSON.parse(filter);

			let teamSearch = true;
			let divisionSearch = true;

			if (filterObject.team || filterObject.division) {
				teamSearch = !filterObject.team || data.team.name.toLowerCase().includes(filterObject.team);

				divisionSearch = !filterObject.division || data.team.division_id === filterObject.division;
			}

			return teamSearch && divisionSearch;
		});
	}

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
	}

	compareWins(left: Standings, right: Standings): number {
		const n = parseFloat(right.win_percentage) - parseFloat(left.win_percentage);

		if (n !== 0) {
			return n;
		}

		return right.won - left.won;
	}

	addRank(sorted_standings: Standings[]): Standings[] {
		sorted_standings = sorted_standings.map(function(standing, index) {
			return Standings.from({ ...standing });
		});

		sorted_standings = sorted_standings.sort(this.compareWins);

		let first_place: Standings;
		return sorted_standings.map(function(standing, index) {
			if (index === 0) {
				first_place = standing;
			}

			let standing_with_rank = Standings.from({
				...standing,
				rank: index + 1,
				games_behind: ((first_place.won - standing.won) + (standing.lost - first_place.lost)) / 2
			});

			return standing_with_rank;
		});
	}
}
