import { Component, OnInit, Inject, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { Field } from 'src/app/models/field.model';

import { fields } from 'src/app/data/fields.data';

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.scss']
})
export class FieldsComponent implements OnInit {

    @ViewChild(MatTable, { static: true }) table: MatTable<Field> = Object.create(null);
    @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);

    searchText: any;
    displayedColumns: string[] = ['name', 'address', 'notes', 'information'];
    dataSource = new MatTableDataSource<Field>(fields);

  constructor() { }

  ngOnInit(): void {
      this.dataSource.filterPredicate = (data: Field, filter: string) => {
          return data.name.toLowerCase().includes(filter);
      };
  }

  ngAfterViewInit(): void {
      this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string): void {
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
