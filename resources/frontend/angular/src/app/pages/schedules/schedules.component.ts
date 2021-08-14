import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, shareReplay } from 'rxjs/operators';

import { AuthenticationService } from 'src/app/authentication/authentication.service';

import { Schedule } from 'src/app/models/schedule.model';
import { Field } from 'src/app/models/field.model';
import { Umpire } from 'src/app/models/umpire.model';
import { Division } from 'src/app/models/division.model';

import { DialogScheduleGame } from './modals/dialog-schedule-game.component';

@Component({
	selector: 'app-schedules',
	templateUrl: './schedules.component.html',
	styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit {

	@ViewChild(MatTable, { static: true }) table: MatTable<Schedule> = Object.create(null);
	@ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);
	searchText: any;
	displayedColumns: string[] = ['home', 'away', 'date', 'field', 'umpires', 'outcome'];
	dataSource = new MatTableDataSource<Schedule>();
	noData: Observable<boolean>;

	readonly formControl: FormGroup;

	public schedule$: Observable<Schedule[]>;
	public umpire$: Observable<Umpire[]>;
	public division$: Observable<Division[]>;

	public listOfUmpires: Umpire[];
	public listOfDivisions: Division[];

	public dateStart: Date;
	public dateEnd: Date;

	constructor(
		private formBuilder: FormBuilder,
		public dialog: MatDialog,
		public authenticationService: AuthenticationService,
		public http: HttpClient) {

		if (this.authenticationService.isAuthenticated) {
			this.displayedColumns = ['action', 'home', 'away', 'date', 'field', 'umpires', 'outcome'];
		}

		// pull in data
		this.division$ = this.http.get<Division[]>('/api/division').pipe(
			tap((divisions) => {
				this.listOfDivisions = divisions;
			})
		);

		this.umpire$ = this.http.get<Umpire[]>('/api/umpire').pipe(
			tap((umpires) => {
				this.listOfUmpires = umpires;
			}),
			shareReplay()
		);

		this.loadScheduleWithFilters();

		this.formControl = this.formBuilder.group({
			team: '',
			division: null,
			umpire: null,
			previousWeeks: false
		});

		this.formControl.valueChanges.subscribe(value => {
			if (value.team) {
				value = { ...value, team: value.team.trim().toLowerCase() };
			}

			// need to stringify because of type issue with filterPredicate
			this.dataSource.filter = JSON.stringify(value);
		});

	}

	loadScheduleWithFilters() {
		this.schedule$ = this.http.get<Schedule[]>('/api/schedule').pipe(tap((schedule: Schedule[]) => {
			this.dataSource.data = schedule;

			this.dataSource.filterPredicate = ((data: Schedule, filter: string): boolean => {
				let filterObject: { team: string, division: number | string, umpire: number | string, previousWeeks: boolean };
				filterObject = JSON.parse(filter);

				let teamSearch = true;
				let divisionSearch = true;
				let umpireSearch = true;
				let dateSearch = true;

				let curr = this.getMonday(new Date); // get current date

				let first = curr.getDate(); // First day is the day of the month - the day of the week
				let last = first + 6; // last day is the first day + 6

				let firstday = new Date(curr.setDate(first));
				let lastday = new Date(curr.setDate(last));

				firstday.setHours(0, 0, 0, 0);
				lastday.setHours(23, 59, 0, 0);

				if (filterObject.team || filterObject.division || filterObject.umpire) {
					teamSearch = !filterObject.team || data.home_team.name.toLowerCase().includes(filterObject.team) || data.away_team.name.toLowerCase().includes(filterObject.team);

					divisionSearch = !filterObject.division || data.home_team.division.id === filterObject.division || data.away_team.division.id === filterObject.division || filterObject.division == "All";

					umpireSearch = !filterObject.umpire || data.umpires.some(umpire => umpire.id === filterObject.umpire);

					if (!filterObject.previousWeeks) {
						dateSearch = Date.parse(data.game_date) >= firstday.getTime();
						this.dateStart = firstday;
						this.dateEnd = null;
					} else {
						this.dateStart = null;
						this.dateEnd = null;
					}
				} else if (filterObject.previousWeeks) {
					dateSearch = Date.parse(data.game_date) <= lastday.getTime();
					this.dateStart = null;
					this.dateEnd = lastday;
				} else {
					dateSearch = Date.parse(data.game_date) >= firstday.getTime() && Date.parse(data.game_date) <= lastday.getTime();
					this.dateStart = firstday;
					this.dateEnd = lastday;
				}

				return teamSearch && divisionSearch && umpireSearch && dateSearch;
			});

			this.dataSource.sort = this.sort;

			// trigger default filter
			this.dataSource.filter = JSON.stringify({});

			this.noData = this.dataSource.connect().pipe(map(data => data.length === 0));
		}));

		return this.schedule$;
	}

	loadSchedule() {
		this.schedule$ = this.http.get<Schedule[]>('/api/schedule').pipe(tap((schedule: Schedule[]) => {
			this.dataSource.data = schedule;
		}));
	}

	getDivisionName(divisionId: number | string): string {
		if (divisionId === "All") {
			return divisionId;
		}

		return this.listOfDivisions.find(division => division.id === divisionId) ?.name;
	}

	getUmpireName(umpireId: number): string {
		return this.listOfUmpires.find(umpire => umpire.id === umpireId) ?.name;
	}

	getAddress(field: Field) {
		return 'https://www.google.com/maps/dir/?api=1&destination='
			+ field.address + ' '
			+ field.city + ' '
			+ field.state + ' '
			+ field.zip;
	}

	inThePast(date: string): boolean {
		let firstday = this.getMonday(new Date); // get current date
		firstday.setHours(0, 0, 0, 0);

		return Date.parse(date) <= firstday.getTime();
	}

	getMonday(d: Date) {
		d = new Date(d);
		var day = d.getDay(),
			diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
		return new Date(d.setDate(diff));
	}

	ngOnInit(): void {
		// this.dataSource.sortingDataAccessor = (item, property) => {
		//     switch (property) {
		//         case 'team': return item.team.name;
		//
		//         default: return item[property] as any;
		//     }
		// };

	}

	ngAfterViewInit(): void {
		//
	}

	getFieldDisplay(fieldAlphaDisplay, fieldNumber) {
		if (fieldAlphaDisplay) {
			return String.fromCharCode(96 + parseInt(fieldNumber, 10)).toUpperCase();
		} else {
			return "#" + fieldNumber;
		}
	}

	searchTeamName(filterValue: string): void {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	searchDivision(filterValue: string): void {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	openScheduleGame(type, scheduleId): void {
		let data = {};

		data['type'] = type;
		data['scheduleId'] = scheduleId;

		const dialogRef = this.dialog.open(DialogScheduleGame, {
			width: '575px',
			data: data
		});

		dialogRef.afterClosed().subscribe((refreshData) => {
			if (refreshData) {
				this.loadSchedule();
			}
		});
	}
}
