import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import { Schedule } from 'src/app/models/schedule.model';
import { Team } from 'src/app/models/team.model';
import { Field } from 'src/app/models/field.model';
import { Umpire } from 'src/app/models/umpire.model';

import { teams } from 'src/app/Data/teams.data';
import { fields } from 'src/app/Data/fields.data';
import { umpires } from 'src/app/Data/umpires.data';

const schedule: Schedule[] = [
    {
        home: teams.find(element => element.abbreviation == 'MIS') as Team,
        away: teams.find(element => element.abbreviation == 'HIT') as Team,
        date: new Date('April 25, 2021 10:30:00 AM'),
        field: fields.find(element => element.name == 'Feura Bush') as Field,
        umpires: [umpires.find(element => element.name == 'Grapeville Insurance') as Umpire],
        home_score: 8,
        away_score: 16,
    },
    {
        home: teams.find(element => element.abbreviation == 'TKS') as Team,
        away: teams.find(element => element.abbreviation == 'GIA') as Team,
        date: new Date('April 25, 2021 12:00:00 PM'),
        field: fields.find(element => element.name == 'Feura Bush') as Field,
        umpires: [umpires.find(element => element.name == 'Grapeville Insurance') as Umpire],
        delayed: true
    },
    {
        home: teams.find(element => element.abbreviation == 'FVS') as Team,
        away: teams.find(element => element.abbreviation == 'FAK') as Team,
        date: new Date('April 25, 2021 01:30:00 PM'),
        field: fields.find(element => element.name == 'Feura Bush') as Field,
        umpires: [umpires.find(element => element.name == 'Grapeville Insurance') as Umpire],
        home_score: 3,
        away_score: 15,
    },
    {
        home: teams.find(element => element.abbreviation == 'TBS') as Team,
        away: teams.find(element => element.abbreviation == 'HHS') as Team,
        date: new Date('April 25, 2021 01:30:00 PM'),
        field: fields.find(element => element.name == 'Mullens Park') as Field,
        umpires: [umpires.find(element => element.name == 'Grapeville Insurance') as Umpire],
        home_score: 4,
        away_score: 12,
    },
    {
        home: teams.find(element => element.abbreviation == 'H4I') as Team,
        away: teams.find(element => element.abbreviation == 'CAK') as Team,
        date: new Date('April 25, 2021 03:00:00 PM'),
        field: fields.find(element => element.name == 'Mullens Park') as Field,
        umpires: [umpires.find(element => element.name == 'Grapeville Insurance') as Umpire],
        home_score: 9,
        away_score: 6,
    },
    {
        home: teams.find(element => element.abbreviation == 'BCS') as Team,
        away: teams.find(element => element.abbreviation == '518') as Team,
        date: new Date('April 25, 2021 04:30:00 PM'),
        field: fields.find(element => element.name == 'Mullens Park') as Field,
        umpires: [umpires.find(element => element.name == 'Grapeville Insurance') as Umpire],
        home_score: 0,
        away_score: 0,
    },
    {
        home: teams.find(element => element.abbreviation == 'BRJ') as Team,
        away: teams.find(element => element.abbreviation == 'PUB') as Team,
        date: new Date('April 25, 2021 06:00:00 PM'),
        field: fields.find(element => element.name == 'Mullens Park') as Field,
        umpires: [umpires.find(element => element.name == 'Grapeville Insurance') as Umpire],
        home_score: 0,
        away_score: 0,
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
    displayedColumns: string[] = ['status', 'home', 'away', 'date', 'field', 'umpires', 'outcome'];
    dataSource = new MatTableDataSource<Schedule>(schedule);
    noData = this.dataSource.connect().pipe(map(data => data.length === 0));

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
