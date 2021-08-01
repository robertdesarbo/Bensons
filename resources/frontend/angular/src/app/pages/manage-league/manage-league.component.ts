import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

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
	public leagues: League[];
	public divisions: Division[];

	public step = 0;

	constructor(private formBuilder: FormBuilder,
		private http: HttpClient) {

		// pull in data
		this.league$ = this.http.get<League[]>('/api/league');
		this.league$.pipe(
			tap((leagues) => {
				this.leagues = leagues;
			})
		).subscribe();

		this.leagueFormGroup = this.formBuilder.group({
			league: '',
			name: '',
			sport: ''
		});

		this.divisionFormGroup = this.formBuilder.group({
			division: '',
			name: '',
		});

		this.leagueFormGroup.get("league").valueChanges.subscribe(league_id => {
			const option = {
				params: {
					league: league_id
				}
			}

			const league = this.leagues.find(league => league.id === league_id);
			this.leagueFormGroup.get('name').setValue(league.name);
			this.leagueFormGroup.get('sport').setValue(league.sport);

			this.division$ = this.http.get<Division[]>('/api/division-by-league', option);
			this.division$.pipe(
				tap((divisions) => {
					this.divisions = divisions;
				})
			).subscribe();
		});

		this.divisionFormGroup.get("division").valueChanges.subscribe(division_id => {
			const division = this.divisions.find(division => division.id === division_id);

			this.divisionFormGroup.get('name').setValue(division.name);
		});
	}


	setStep(index: number) {
		this.step = index;
	}

	nextStep() {
		this.step++;
	}

	prevStep() {
		this.step--;
	}
}
