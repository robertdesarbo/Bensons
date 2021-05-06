import { Component, OnInit, Inject, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';

import { Team } from 'src/app/models/Team.model';
import { Standings } from 'src/app/models/Standings.model';

const standings: Standings[] = [
    {
        rank: 1,
        team: Team.from({ name: 'Grapeville Insurance', abbreviation: 'GIA'}),
        won: 0,
        lost: 0,
        win_percentage: 0,
        games_behind: 0,
        games_played: 0
    },
    {
        rank: 2,
        team: Team.from({ name: 'Cake Eaters', abbreviation: 'CAK'}),
        won: 0,
        lost: 0,
        win_percentage: 0,
        games_behind: 0,
        games_played: 0
    },
    {
        rank: 3,
        team: Team.from({ name: 'Habitat 4 Instanity', abbreviation: 'H4I'}),
        won: 0,
        lost: 0,
        win_percentage: 0,
        games_behind: 0,
        games_played: 0
    },
    {
        rank: 4,
        team: Team.from({ name: 'Heavy Hitters', abbreviation: 'HHS'}),
        won: 0,
        lost: 0,
        win_percentage: 0,
        games_behind: 0,
        games_played: 0
    },
    {
        rank: 5,
        team: Team.from({ name: 'The Big Sticks', abbreviation: 'TBS'}),
        won: 0,
        lost: 0,
        win_percentage: 0,
        games_behind: 0,
        games_played: 0
    },
    {
        rank: 6,
        team: Team.from({ name: 'Takeover Sun', abbreviation: 'TKS'}),
        won: 0,
        lost: 0,
        win_percentage: 0,
        games_behind: 0,
        games_played: 0
    },
    {
        rank: 7,
        team: Team.from({ name: 'The Pubbers', abbreviation: 'PUB'}),
        won: 0,
        lost: 0,
        win_percentage: 0,
        games_behind: 0,
        games_played: 0
    },
    {
        rank: 8,
        team: Team.from({ name: 'Brew Jays', abbreviation: 'BRJ'}),
        won: 0,
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
    searchText: any;
    displayedColumns: string[] = ['rank', 'team', 'won', 'lost', 'win percentage', 'games behind', 'games played'];
    dataSource = new MatTableDataSource<Standings>(standings);

    constructor() { }

    ngOnInit(): void {
        this.dataSource.filterPredicate = (data: Standings, filter: string) => {
            return data.team.name.toLowerCase().includes(filter);
        };
    }

    ngAfterViewInit(): void {
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue;
    }

}
