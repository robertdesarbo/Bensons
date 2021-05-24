import { Component, AfterViewInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {DialogRegisterTeam} from './modals/register-team-dialog.component';
import { DialogLookingForATeam } from './modals/looking-for-a-team-dialog.component';

import { teams } from 'src/app/data/teams.data';
import { fields } from 'src/app/data/fields.data';

@Component({
    selector: 'app-starter',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
    stacked = false;

    total_teams = teams.length;
    total_locations = fields.length;
    total_players = 0;

    constructor(public dialog: MatDialog) {}

    ngAfterViewInit() {}

    openRegisterDialog(): void {
        const dialogRef = this.dialog.open(DialogRegisterTeam, {
            width: '375px',
            data: {}
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log('The dialog was closed');
        });
    }

    openLookingForATeamDialog(): void {
        const dialogRef = this.dialog.open(DialogLookingForATeam, {
            width: '375px',
            data: {}
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log('The dialog was closed');
        });
    }
}
