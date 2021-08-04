import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable, of } from 'rxjs';
import { tap, shareReplay, filter } from 'rxjs/operators';

import { League } from 'src/app/models/league.model';
import { Division } from 'src/app/models/division.model';
import { Season } from 'src/app/models/season.model';
import { Team } from 'src/app/models/team.model';

import { Sport } from 'src/app/models/enum/sport.enum';

@Component({
	selector: 'app-manage-league',
	templateUrl: './manage-league.component.html',
	styleUrls: ['./manage-league.component.scss']
})
export class ManageLeagueComponent {
	readonly leagueFormGroup: FormGroup;
	readonly divisionFormGroup: FormGroup;
	readonly seasonFormGroup: FormGroup;
	readonly teamFormGroup: FormGroup;

	public league$: Observable<League[]>;
	public division$: Observable<Division[]>;
	public season$: Observable<Season[]>;
	public team$: Observable<Team[]>;

	public sports = Object.values(Sport);

	public leagues: League[];
	public divisions: Division[];
	public seasons: Season[];

	public step = 0;

	public addLeague = false;

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

		this.seasonFormGroup = this.formBuilder.group({
			season: '',
			start_at: '',
			active: '',
			number_of_games: '',
			league_fee: '',
			offical_fee_per_game: '',
		});

		this.teamFormGroup = this.formBuilder.group({
			team: ''
		});

		this.leagueFormGroup.get("league").valueChanges.subscribe(league_id => {
			const option = {
				params: {
					league: league_id
				}
			}

			// reset other forms
			this.divisionFormGroup.get("division").setValue(null);
			this.seasonFormGroup.get("season").setValue(null);
			this.teamFormGroup.get("team").setValue(null);

			const league = this.leagues.find(league => league.id === league_id);
			this.leagueFormGroup.get('name').setValue(league.name);
			this.leagueFormGroup.get('sport').setValue(league.sport);

			this.division$ = this.http.get<Division[]>('/api/division-by-league', option);
			this.division$.pipe(
				shareReplay(),
				tap((divisions) => {
					this.divisions = divisions;
				})
			).subscribe();
		});

		this.divisionFormGroup.get("division").valueChanges
			.pipe(filter(division_id => division_id !== null))
			.subscribe(division_id => {
				const option = {
					params: {
						division: division_id
					}
				}

				// reset other forms
				this.seasonFormGroup.get("season").setValue(null);
				this.teamFormGroup.get("team").setValue(null);

				const division = this.divisions.find(division => division.id === division_id);
				this.divisionFormGroup.get('name').setValue(division.name);

				this.season$ = this.http.get<Season[]>('/api/season-by-division', option);
				this.season$.pipe(
					shareReplay(),
					tap((divisions) => {
						this.seasons = divisions;
					})
				).subscribe();
			});

		this.seasonFormGroup.get("season").valueChanges
			.pipe(filter(season_id => season_id !== null))
			.subscribe(season_id => {

				// reset other forms
				this.teamFormGroup.get("team").setValue(null);

				const season = this.seasons.find(season => season.id === season_id);

				this.seasonFormGroup.get('start_at').setValue(season.start_at);
				this.seasonFormGroup.get('number_of_games').setValue(season.number_of_games);
				this.seasonFormGroup.get('league_fee').setValue(season.league_fee);
				this.seasonFormGroup.get('offical_fee_per_game').setValue(season.offical_fee_per_game);
			});
	}

	toggleLeagueFormType() {
		this.addLeague = !this.addLeague;
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
