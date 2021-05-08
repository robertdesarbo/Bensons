import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { Schedule } from 'src/app/models/Schedule.model';
import { Team } from 'src/app/models/Team.model';
import { Field } from 'src/app/models/Field.model';
import { Umpire } from 'src/app/models/Umpire.model';

import { teams } from 'src/app/Data/teams.data';
import { fields } from 'src/app/Data/fields.data';
import { umpires } from 'src/app/Data/umpires.data';

const schedule: Schedule[] = [
    {
        home: teams.find(element => element.abbreviation == 'GIA') as Team,
        away: teams.find(element => element.abbreviation == 'GIA') as Team,
        date: new Date('December 17, 1995 03:24:00'),
        field: fields.find(element => element.name == 'Albany JCC') as Field,
        umpires: [umpires.find(element => element.name == 'Grapeville Insurance') as Umpire],
    },
];

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit {


        @ViewChild(MatTable, { static: true }) table: MatTable<Schedule> = Object.create(null);
        @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);
        searchText: any;
        displayedColumns: string[] = ['home', 'away', 'date', 'field', 'umpires'];
        dataSource = new MatTableDataSource<Schedule>(schedule);

        constructor() { }

        ngOnInit(): void {
            this.dataSource.filterPredicate = (data: Schedule, filter: string) => {
                return data.home.name.toLowerCase().includes(filter) || data.away.name.toLowerCase().includes(filter);
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
            this.dataSource.sort = this.sort;
        }

        applyFilter(filterValue: string): void {
            this.dataSource.filter = filterValue.trim().toLowerCase();
        }

}
