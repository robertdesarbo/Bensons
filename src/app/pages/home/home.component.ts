import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';

import { teams } from 'src/app/Data/teams.data';
import { fields } from 'src/app/Data/fields.data';
// import { players } from 'src/app/Data/players.data';

@Component({
    selector: 'app-starter',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
    stacked = false;

    total_teams = teams.length;
    total_fields = teams.length;
    total_players = 0;

    ngAfterViewInit() {}
}
