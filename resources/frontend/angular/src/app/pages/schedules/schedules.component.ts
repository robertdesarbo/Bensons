import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import { AuthenticationService } from 'src/app/authentication/authentication.service';

import { Schedule } from 'src/app/models/schedule.model';
import { Umpire } from 'src/app/models/umpire.model';
import { Field } from 'src/app/models/field.model';

import { schedules } from 'src/app/data/schedules.data';
import { umpires } from 'src/app/data/umpires.data';

import {DialogScheduleGame} from './modals/dialog-schedule-game.component';

@Component({
    selector: 'app-schedules',
    templateUrl: './schedules.component.html',
    styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit {

    @ViewChild(MatTable, { static: true }) table: MatTable<Schedule> = Object.create(null);
    @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);
    searchText: any;
    displayedColumns: string[] = [ 'home', 'away', 'date', 'field', 'umpires', 'outcome'];
    dataSource = new MatTableDataSource<Schedule>(schedules);
    noData = this.dataSource.connect().pipe(map(data => data.length === 0));

    readonly formControl: FormGroup;

    public defaultWeeklyView = true;
    public listOfumpires = umpires;

    constructor(private formBuilder: FormBuilder, public dialog: MatDialog, public authenticationService: AuthenticationService) {

        if(this.authenticationService.isAuthenticated)
        {
            this.displayedColumns = [ 'action', 'home', 'away', 'date', 'field', 'umpires', 'outcome'];
        }

        this.dataSource.filterPredicate = ((data: Schedule, filter: string) : boolean => {
            let filterObject: { team: string, division: string, umpire: string, previousWeeks: boolean};
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

            firstday.setHours(0,0,0,0);
            lastday.setHours(23,59,0,0);

            if(filterObject.team || filterObject.division || filterObject.umpire) {
                teamSearch = !filterObject.team || data.home.name.toLowerCase().includes(filterObject.team) || data.away.name.toLowerCase().includes(filterObject.team);

                divisionSearch = !filterObject.division || data.home.division.name.toLowerCase().includes(filterObject.division) || data.away.division.name.toLowerCase().includes(filterObject.division) || filterObject.division == "all";

                umpireSearch = !filterObject.umpire || data.umpires.some(umpire => umpire.name === filterObject.umpire);

                if(!filterObject.previousWeeks) {
                    dateSearch = data.date.getTime() >= firstday.getTime();
                }

                this.defaultWeeklyView = false;
            } else if(filterObject.previousWeeks) {
                dateSearch = data.date.getTime() <= lastday.getTime();
                this.defaultWeeklyView = false;
            } else {
                dateSearch = data.date.getTime() >= firstday.getTime() && data.date.getTime() <= lastday.getTime();

                this.defaultWeeklyView = true;
            }


            return teamSearch && divisionSearch && umpireSearch && dateSearch;
        })

        this.formControl = this.formBuilder.group({
            team: '',
            division: '',
            umpire: '',
            previousWeeks: false
        })

        this.formControl.valueChanges.subscribe(value => {
            if(value.team) {
                value = {...value, team: value.team.trim().toLowerCase()};
            }

            if(value.division) {
                value = {...value, division: value.division.trim().toLowerCase()};
            }

            // need to stringify because of type issue with filterPredicate
            this.dataSource.filter = JSON.stringify(value);
        });

        // trigger default filter
        this.dataSource.filter = JSON.stringify({});
    }

    getAddress(field: Field) {
        return 'https://www.google.com/maps/dir/?api=1&destination='
        + field.address + ' '
        + field.city + ' '
        + field.state + ' '
        + field.zip;
    }

    inThePast(date: Date): boolean {
        let firstday = this.getMonday(new Date); // get current date
        firstday.setHours(0,0,0,0);

        return date.getTime() <= firstday.getTime();
    }

    getMonday(d: Date) {
        d = new Date(d);
        var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
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
        this.dataSource.sort = this.sort;
    }

    searchTeamName(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    searchDivision(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    openScheduleGame(schedule, remove): void {

        let data = {};
        if(schedule) {
            data['schedule'] = schedule;
        }

        if(remove) {
            data['remove'] = remove;
        }

        const dialogRef = this.dialog.open(DialogScheduleGame, {
            width: '375px',
            data: data
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log('The dialog was closed');
        });
    }
}
