import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import { Schedule } from 'src/app/models/schedule.model';

import { schedules } from 'src/app/data/schedules.data';

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
    dataSource = new MatTableDataSource<Schedule>(schedules);
    noData = this.dataSource.connect().pipe(map(data => data.length === 0));

    readonly formControl: FormGroup;

    public filteringByDate = true;

    constructor(private formBuilder: FormBuilder) {
        this.dataSource.filterPredicate = ((data: Schedule, filter: string) : boolean => {
            let filterObject: { team: string, division: string};
            filterObject = JSON.parse(filter);

            let teamSearch = true;
            let divisionSearch = true;
            let dateSearch = true;

            if(filterObject.team || filterObject.division) {
                teamSearch = !filterObject.team || data.home.name.toLowerCase().includes(filterObject.team) || data.away.name.toLowerCase().includes(filterObject.team);
                divisionSearch = !filterObject.division || data.home.division.name.toLowerCase().includes(filterObject.division) || data.away.division.name.toLowerCase().includes(filterObject.division) || filterObject.division == "all";

                this.filteringByDate = false;
            } else {
                let curr = this.getMonday(new Date); // get current date

                let first = curr.getDate(); // First day is the day of the month - the day of the week
                let last = first + 6; // last day is the first day + 6

                let firstday = new Date(curr.setDate(first));
                let lastday = new Date(curr.setDate(last));

                firstday.setHours(0,0,0,0);
                lastday.setHours(23,59,0,0);

                dateSearch = data.date.getTime() >= firstday.getTime() && data.date.getTime() <= lastday.getTime();

                this.filteringByDate = true;
            }


            return teamSearch && divisionSearch && dateSearch;
        })

        this.formControl = this.formBuilder.group({
            team: '',
            division: ''
        })

        this.formControl.valueChanges.subscribe(value => {
            value = {...value, team: value.team.trim().toLowerCase()};
            value = {...value, division: value.division.trim().toLowerCase()};

            // need to stringify because of type issue with filterPredicate
            this.dataSource.filter = JSON.stringify(value);
        });

        // trigger default filter
        this.dataSource.filter = JSON.stringify({});
    }

    getMonday(d) {
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

}
