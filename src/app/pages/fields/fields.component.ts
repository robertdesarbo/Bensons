import { Component, OnInit, Inject, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';

import { Field } from 'src/app/models/Field.model';

const fields: Field[] = [
    {
        name: "Albany JCC",
        address: "340 Whitehall Road",
        city: "Albany",
        state: "New York",
        zip: 12208,
        alcohol: false,
        private_property: true
    },
    {
        name: "Arbor Hill",
        address: "6 Lark Street",
        city: "Albany",
        state: "New York",
        zip: 12210,
        alcohol: true,
        private_property: false
    },
];
@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.scss']
})
export class FieldsComponent implements OnInit {

    @ViewChild(MatTable, { static: true }) table: MatTable<Field> = Object.create(null);
    searchText: any;
    displayedColumns: string[] = ['name', 'address', 'information', 'notes'];
    dataSource = new MatTableDataSource<Field>(fields);

  constructor() { }

  ngOnInit(): void {
      this.dataSource.filterPredicate = (data: Field, filter: string) => {
          return data.name.toLowerCase().includes(filter);
      };
  }

  ngAfterViewInit(): void {
  }

  applyFilter(filterValue: string): void {
      this.dataSource.filter = filterValue;
  }

}
