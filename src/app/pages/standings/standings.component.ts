import { Component, OnInit, Inject, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { Team } from 'src/app/models/team.model';
import { Standings } from 'src/app/models/standings.model';

import { teams } from 'src/app/data/teams.data';

const standings_c_d: Standings[] = [
    {
        rank: 1,
        team: teams.find(element => element.abbreviation == 'GIA') as Team,
        won: 0,
        lost: 0,
        win_percentage: 0,
        games_behind: 0,
        games_played: 0
    },
    {
        rank: 2,
        team: teams.find(element => element.abbreviation == 'CAK') as Team,
        won: 0,
        lost: 0,
        win_percentage: 0,
        games_behind: 0,
        games_played: 0
    },
    {
        rank: 3,
        team: teams.find(element => element.abbreviation == 'H4I') as Team,
        won: 0,
        lost: 0,
        win_percentage: 0,
        games_behind: 0,
        games_played: 0
    },
    {
        rank: 4,
        team: teams.find(element => element.abbreviation == 'HHS') as Team,
        won: 0,
        lost: 0,
        win_percentage: 0,
        games_behind: 0,
        games_played: 1
    },
    {
        rank: 5,
        team: teams.find(element => element.abbreviation == 'TBS') as Team,
        won: 0,
        lost: 0,
        win_percentage: .85,
        games_behind: 0,
        games_played: 0
    },
    {
        rank: 6,
        team: teams.find(element => element.abbreviation == 'TKS') as Team,
        won: 0,
        lost: 1,
        win_percentage: 0,
        games_behind: 0,
        games_played: 0
    },
    {
        rank: 7,
        team: teams.find(element => element.abbreviation == 'PUB') as Team,
        won: 1,
        lost: 0,
        win_percentage: 0,
        games_behind: 0,
        games_played: 0
    },
    {
        rank: 8,
        team: teams.find(element => element.abbreviation == 'BRJ') as Team,
        won: 0,
        lost: 0,
        win_percentage: 0,
        games_behind: 0,
        games_played: 2
    }
];

const standings_e: Standings[] = [
    {
        rank: 1,
        team: teams.find(element => element.abbreviation == 'FAK') as Team,
        won: 0,
        lost: 0,
        win_percentage: 0,
        games_behind: 0,
        games_played: 0
    },
    {
        rank: 2,
        team: teams.find(element => element.abbreviation == 'HIT') as Team,
        won: 0,
        lost: 0,
        win_percentage: 0,
        games_behind: 0,
        games_played: 0
    },
    {
        rank: 3,
        team: teams.find(element => element.abbreviation == '518') as Team,
        won: 0,
        lost: 0,
        win_percentage: 0,
        games_behind: 0,
        games_played: 0
    },
    {
        rank: 4,
        team: teams.find(element => element.abbreviation == 'MIS') as Team,
        won: 0,
        lost: 0,
        win_percentage: 0,
        games_behind: 0,
        games_played: 1
    },
    {
        rank: 5,
        team: teams.find(element => element.abbreviation == 'TTB') as Team,
        won: 0,
        lost: 0,
        win_percentage: .85,
        games_behind: 0,
        games_played: 0
    },
    {
        rank: 6,
        team: teams.find(element => element.abbreviation == 'FVS') as Team,
        won: 0,
        lost: 1,
        win_percentage: 0,
        games_behind: 0,
        games_played: 0
    },
    {
        rank: 7,
        team: teams.find(element => element.abbreviation == 'BCS') as Team,
        won: 1,
        lost: 0,
        win_percentage: 0,
        games_behind: 0,
        games_played: 0
    }
];

@Component({
    selector: 'app-standings',
    templateUrl: './standings.component.html',
    styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit {

    @ViewChild(MatTable, { static: true }) table: MatTable<Standings> = Object.create(null);
    @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);
    searchText: any;
    displayedColumns: string[] = ['rank', 'team', 'won', 'lost', 'win_percentage', 'games_behind', 'games_played'];

    dataSource_divison_c_d = new MatTableDataSource<Standings>(standings_c_d);
    dataSource_divison_e = new MatTableDataSource<Standings>(standings_e);

    constructor() { }

    ngOnInit(): void {
        this.dataSource_divison_c_d.filterPredicate = (data: Standings, filter: string) => {
            return data.team.name.toLowerCase().includes(filter);
        };

        this.dataSource_divison_e.filterPredicate = (data: Standings, filter: string) => {
            return data.team.name.toLowerCase().includes(filter);
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
        this.dataSource_divison_c_d.sort = this.sort;
        this.dataSource_divison_e.sort = this.sort;
    }

    applyFilter(filterValue: string): void {
        this.dataSource_divison_c_d.filter = filterValue.trim().toLowerCase();
        this.dataSource_divison_e.filter = filterValue.trim().toLowerCase();
    }

}
