import { Component, ViewChild } from '@angular/core';

import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, shareReplay } from 'rxjs/operators';

import { FreeAgent } from 'src/app/models/free-agent.model';

@Component({
	selector: 'app-free-agents',
	templateUrl: './free-agents.component.html',
	styleUrls: ['./free-agents.component.scss']
})
export class FreeAgentsComponent {

	@ViewChild(MatTable, { static: true }) table: MatTable<FreeAgent> = Object.create(null);
	@ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);
	searchText: any;
	displayedColumns: string[] = ['name', 'phone', 'email', 'division'];
	dataSource = new MatTableDataSource<FreeAgent>();
	noData: Observable<boolean>;

	public freeAgent$: Observable<FreeAgent[]>;

	constructor(public http: HttpClient) {
		// pull in data
		this.freeAgent$ = this.http.get<FreeAgent[]>('/api/free-agent').pipe(tap((schedule: FreeAgent[]) => {
			this.dataSource.data = schedule;

			this.dataSource.sort = this.sort;

			this.noData = this.dataSource.connect().pipe(map(data => data.length === 0));
		}));
	}
}
