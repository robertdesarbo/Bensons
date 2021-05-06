import { Component, OnInit, Inject, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';


export interface Team {
    Name: string;
    league: string;
    division: string;
}

export interface Standings {
    Rank: number;
    Team: Team;
    Won: number;
    Lost: number;
    WinPercentage: number;
    GamesBehind: number;
    GamesPlayed: number;
}

const Standings = [
    {
        Rank: 1,
        Team: Team,
        Won: 0,
        Lost: 0,
        WinPercentage: 0,
        GamesBehind: 0,
        GamesPlayed: 0
    }
];

@Component({
    selector: 'app-standings',
    templateUrl: './standings.component.html',
    styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit {

    @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
    searchText: any;
    displayedColumns: string[] = ['#', 'name', 'email', 'mobile', 'date of joining', 'salary', 'projects', 'action'];
    dataSource = new MatTableDataSource(employees);
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

    constructor() { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
