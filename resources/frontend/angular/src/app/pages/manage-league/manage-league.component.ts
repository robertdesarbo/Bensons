import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable, of } from 'rxjs';

import { Team } from 'src/app/models/team.model';
import { League } from 'src/app/models/league.model';
import { Division } from 'src/app/models/division.model';
import { Sport } from 'src/app/models/enum/sport.enum';

@Component({
	selector: 'app-manage-league',
	templateUrl: './manage-league.component.html',
	styleUrls: ['./manage-league.component.scss']
})
export class ManageLeagueComponent {
	readonly leagueFormGroup: FormGroup;
	readonly divisionFormGroup: FormGroup;
	readonly teamFormGroup: FormGroup;

	public team$: Observable<Team>;
	public division$: Observable<Division[]>;
	public league$: Observable<League[]>;

	public sports = Object.values(Sport);

	constructor(private formBuilder: FormBuilder,
		private http: HttpClient) {

		// pull in data
		this.league$ = this.http.get<League[]>('/api/league');

		this.leagueFormGroup = this.formBuilder.group({
			league: '',
			sport: ''
		});

		this.leagueFormGroup.get("league").valueChanges.subscribe(league => {
			const option = {
				params: {
					league: league
				}
			}

			// this.leagueFormGroup.get('division').setValue(null);
			this.division$ = this.http.get<Division[]>('/api/division-by-league', option);
		});
	}

	public updateLeague() {

	}
}
