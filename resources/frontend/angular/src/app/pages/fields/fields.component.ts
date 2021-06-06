import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Field } from 'src/app/models/field.model';

@Component({
	selector: 'app-fields',
	templateUrl: './fields.component.html',
	styleUrls: ['./fields.component.scss']
})
export class FieldsComponent {

	@ViewChild(MatTable, { static: true }) table: MatTable<Field> = Object.create(null);
	@ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);

	searchText: any;
	displayedColumns: string[] = ['name', 'address', 'ground-rules', 'information'];
	dataSource = new MatTableDataSource<Field>();
	noData;

	public field$: Observable<Field[]>;


	constructor(public http: HttpClient) {
		this.field$ = this.http.get<Field[]>('/api/field').pipe(tap((field: Field[]) => {
			this.dataSource.data = field;
			this.noData = this.dataSource.connect().pipe(map(data => data.length === 0));
		}));

		this.field$.subscribe(() => { },
			(errorResponse) => { console.log(errorResponse); },
			() => {
				this.dataSource.filterPredicate = (data: Field, filter: string) => {
					return data.name.toLowerCase().includes(filter);
				};
			});;
	}

	getAddress(field: Field) {
		return 'https://www.google.com/maps/dir/?api=1&destination='
			+ field.address + ' '
			+ field.city + ' '
			+ field.state + ' '
			+ field.zip;
	}

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
	}

	applyFilter(filterValue: string): void {
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

}
