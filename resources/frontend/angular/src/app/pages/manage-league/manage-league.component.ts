import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Observable, of } from 'rxjs';
import { tap, shareReplay, filter } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';

import { DialogConfirm } from './modals/dialog-confirm.component';

import { League } from 'src/app/models/league.model';
import { Division } from 'src/app/models/division.model';
import { Season } from 'src/app/models/season.model';
import { Team } from 'src/app/models/team.model';

import { Sport } from 'src/app/models/enum/sport.enum';

import spacetime from 'spacetime';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';

export const MY_FORMATS = {
	parse: {
		dateInput: 'LL'
	},
	display: {
		dateInput: 'dddd MMMM Do',
		monthYearLabel: 'YYYY',
		dateA11yLabel: 'LL',
		monthYearA11yLabel: 'YYYY'
	}
};

export enum DeleteType {
	LEAGUE = 'league',
	DIVISION = 'division',
	SEASON = 'season'
}

@Component({
	selector: 'app-manage-league',
	templateUrl: './manage-league.component.html',
	styleUrls: ['./manage-league.component.scss'],
	providers: [
		{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
		{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
	],
})
export class ManageLeagueComponent implements OnInit {
	readonly spacetime = spacetime;
	readonly DeleteType = DeleteType;

	readonly leagueFormGroup: UntypedFormGroup;
	readonly divisionFormGroup: UntypedFormGroup;
	readonly seasonFormGroup: UntypedFormGroup;
	readonly teamFormGroup: UntypedFormGroup;

	public league$: Observable<League[]>;
	public division$: Observable<Division[]>;
	public season$: Observable<Season[]>;
	public team$: Observable<Team[]>;

	public sports = Object.values(Sport);

	public leagues: League[];
	public divisions: Division[];
	public seasons: Season[];
	public teams: Team[];

	public step = 0;

	public addLeague = false;
	public leagueErrors: string[];

	public addDivision = false;
	public divisionErrors: string[];

	public addSeason = false;
	public seasonErrors: string[];

	constructor(private formBuilder: UntypedFormBuilder,
		private dialog: MatDialog,
		private snackBar: MatSnackBar,
		private http: HttpClient,
		private changeDetectorRef: ChangeDetectorRef) {

		// pull in data
		this.fetchLeagues().subscribe();

		this.leagueFormGroup = this.formBuilder.group({
			league: '',
			name: ['', Validators.required],
			sport: ['', Validators.required],
		});

		this.divisionFormGroup = this.formBuilder.group({
			division: '',
			name: ['', Validators.required],
		});

		this.seasonFormGroup = this.formBuilder.group({
			season: '',
			active: [false, Validators.required],
			complete: [false, Validators.required],
			start_at: ['', Validators.required],
			number_of_games: ['', Validators.required],
			league_fee: ['', Validators.required],
			offical_fee_per_game: ['', Validators.required],
		});

		this.teamFormGroup = this.formBuilder.group({
			team: ''
		});
	}

	ngOnInit(): void {
		// Init to value defined aboev (toggle negates so we negate param)
		this.toggleLeagueFormType(!this.addLeague);
		this.toggleDivisionFormType(!this.addDivision);
		this.toggleSeasonFormType(!this.addSeason);

		this.leagueFormGroup.get("league").valueChanges
			.pipe(
				tap(() => {
					// reset other forms
					this.divisionFormGroup.get("division").setValue(null);
					this.seasonFormGroup.get("season").setValue(null);
					this.teamFormGroup.get("team").setValue(null);

					this.leagueFormGroup.get("name").setValue(null);
					this.leagueFormGroup.get("sport").setValue(null);
				}),
				filter(league_id => league_id !== null))
			.subscribe(league_id => {
				this.toggleLeagueForm(false);

				const league = this.leagues.find(league => league.id === league_id);
				this.leagueFormGroup.get('name').setValue(league.name);
				this.leagueFormGroup.get('sport').setValue(league.sport);

				this.fetchDivisions(league_id).subscribe();

				this.step = 1;

				this.changeDetectorRef.detectChanges();
			});

		this.divisionFormGroup.get("division").valueChanges
			.pipe(
				tap(() => {
					// reset other forms
					this.seasonFormGroup.get("season").setValue(null);
					this.teamFormGroup.get("team").setValue(null);

					this.divisionFormGroup.get("name").setValue(null);
				}),
				filter(division_id => division_id !== null))
			.subscribe(division_id => {
				this.toggleDivisionForm(false);

				const division = this.divisions.find(division => division.id === division_id);
				this.divisionFormGroup.get('name').setValue(division.name);

				this.fetchSeasons(division_id).subscribe();

				this.step = 2;

				this.changeDetectorRef.detectChanges();
			});

		this.seasonFormGroup.get("season").valueChanges
			.pipe(
				tap(() => {
					// reset other forms
					this.teamFormGroup.get("team").setValue(null);

					this.seasonFormGroup.get('active').setValue(false);
					this.seasonFormGroup.get('complete').setValue(false);
					this.seasonFormGroup.get('start_at').setValue(null);
					this.seasonFormGroup.get('number_of_games').setValue(null);
					this.seasonFormGroup.get('league_fee').setValue(null);
					this.seasonFormGroup.get('offical_fee_per_game').setValue(null);
				}),
				filter(season_id => season_id !== null))
			.subscribe(season_id => {
				this.toggleSeasonForm(false);

				const season = this.seasons.find(season => season.id === season_id);

				this.seasonFormGroup.get('active').setValue(season.active);
				this.seasonFormGroup.get('complete').setValue(season.complete);
				this.seasonFormGroup.get('start_at').setValue(season.start_at);
				this.seasonFormGroup.get('number_of_games').setValue(season.number_of_games);
				this.seasonFormGroup.get('league_fee').setValue(season.league_fee);
				this.seasonFormGroup.get('offical_fee_per_game').setValue(season.offical_fee_per_game);

				this.fetchTeams(season_id).subscribe();

				this.step = 3;

				this.changeDetectorRef.detectChanges();
			});
	}

	toggleLeagueFormType(addLeague: boolean) {
		this.leagueErrors = null;
		this.leagueFormGroup.get("league").setValue(null);

		this.addLeague = !addLeague;

		// league is required if we are editting
		this.leagueFormGroup.get("league").setValidators(this.addLeague ? null : [Validators.required]);
		this.leagueFormGroup.get("league").updateValueAndValidity();

		// disable enable forms
		this.toggleLeagueForm(!this.addLeague);

		this.changeDetectorRef.detectChanges();
	}

	toggleLeagueForm(disable: boolean) {
		if (disable) {
			this.leagueFormGroup.get("name").disable();
			this.leagueFormGroup.get("sport").disable();
		} else {
			this.leagueFormGroup.get("name").enable();
			this.leagueFormGroup.get("sport").enable();
		}
	}



	toggleDivisionFormType(addDivision: boolean) {
		this.divisionErrors = null;
		this.divisionFormGroup.get("division").setValue(null);

		this.addDivision = !addDivision;

		// division is required if we are editting
		this.divisionFormGroup.get("division").setValidators(this.addDivision ? null : [Validators.required]);
		this.divisionFormGroup.get("division").updateValueAndValidity();

		// disable enable forms
		this.toggleDivisionForm(!this.addDivision);

		this.changeDetectorRef.detectChanges();
	}

	toggleDivisionForm(disable: boolean) {
		if (disable) {
			this.divisionFormGroup.get("name").disable();
		} else {
			this.divisionFormGroup.get("name").enable();
		}
	}



	toggleSeasonFormType(addSeason: boolean) {
		this.seasonErrors = null;
		this.seasonFormGroup.get("season").setValue(null);

		this.addSeason = !addSeason;

		// season is required if we are editting
		this.seasonFormGroup.get("season").setValidators(this.addSeason ? null : [Validators.required]);
		this.seasonFormGroup.get("season").updateValueAndValidity();

		// disable enable forms
		this.toggleSeasonForm(!this.addSeason);

		this.changeDetectorRef.detectChanges();
	}

	toggleSeasonForm(disable: boolean) {
		if (disable) {
			this.seasonFormGroup.get('active').disable();
			this.seasonFormGroup.get('complete').disable();
			this.seasonFormGroup.get('start_at').disable();
			this.seasonFormGroup.get('number_of_games').disable();
			this.seasonFormGroup.get('league_fee').disable();
			this.seasonFormGroup.get('offical_fee_per_game').disable();
		} else {
			this.seasonFormGroup.get('active').enable();
			this.seasonFormGroup.get('complete').enable();
			this.seasonFormGroup.get('start_at').enable();
			this.seasonFormGroup.get('number_of_games').enable();
			this.seasonFormGroup.get('league_fee').enable();
			this.seasonFormGroup.get('offical_fee_per_game').enable();
		}
	}


	fetchLeagues() {
		// pull in data
		this.league$ = this.http.get<League[]>('/api/league');

		return this.league$.pipe(
			tap((leagues) => {
				this.leagues = leagues;
			})
		);
	}

	fetchDivisions(league_id) {
		const params = {
			params: {
				league: league_id
			}
		}

		// pull in data
		this.division$ = this.http.get<Division[]>('/api/division-by-league', params);

		return this.division$.pipe(
			shareReplay(),
			tap((divisions) => {
				this.divisions = divisions;
			})
		);
	}

	fetchSeasons(division_id) {
		const params = {
			params: {
				division: division_id
			}
		}

		this.season$ = this.http.get<Season[]>('/api/seasons-by-division', params);
		return this.season$.pipe(
			shareReplay(),
			tap((seasons) => {
				this.seasons = seasons;
			})
		);
	}

	fetchTeams(season_id) {
		const params = {
			params: {
				season: season_id
			}
		}

		this.team$ = this.http.get<Team[]>('/api/teams-by-season', params);
		return this.team$.pipe(
			shareReplay(),
			tap((teams) => {
				this.teams = teams;
			})
		);
	}

	deletePrompt(deleteType: DeleteType) {

		let data;
		if (deleteType === DeleteType.LEAGUE) {
			data = {
				'title': 'Delete League',
				'message': 'Are you sure you want to remove this League?'
			};
		} else if (deleteType === DeleteType.DIVISION) {
			data = {
				'title': 'Delete Division',
				'message': 'Are you sure you want to remove this Division?'
			};
		} else if (deleteType === DeleteType.SEASON) {
			data = {
				'title': 'Delete Season',
				'message': 'Are you sure you want to remove this Season?'
			};
		} else {
			this.snackBar.open('Something went wrong', 'Dismiss', {
				duration: 3000,
				horizontalPosition: "right",
				verticalPosition: "top",
			});
			return;
		}

		const dialogRef = this.dialog.open(DialogConfirm, {
			width: '475px',
			data: data
		});

		dialogRef.afterClosed().subscribe((deleteData) => {
			if (deleteData) {
				if (deleteType === DeleteType.LEAGUE) {
					this.deleteLeague();
				} else if (deleteType === DeleteType.DIVISION) {
					this.deleteDivision();
				} else if (deleteType === DeleteType.SEASON) {
					this.deleteSeason();
				}
			}
		});
	}

	deleteLeague() {
		let league: any = {
			league: this.leagueFormGroup.get('league').value
		}

		this.http.post<any>('/api/remove-league', league).subscribe(() => {
			this.snackBar.open('League has been removed', 'Dismiss', {
				duration: 3000,
				horizontalPosition: "right",
				verticalPosition: "top",
			});

			this.fetchLeagues().subscribe(() => {
				this.leagueFormGroup.get("league").setValue(null);
			});
		},
			errorMessage => {
				this.snackBar.open('Something went wrong, league was not removed', 'Dismiss', {
					duration: 3000,
					horizontalPosition: "right",
					verticalPosition: "top",
				});
			});
	}


	saveLeague() {
		let league: any = {
			league: this.leagueFormGroup.get('league').value,

			name: this.leagueFormGroup.get('name').value,
			sport: this.leagueFormGroup.get('sport').value,
		}

		if (this.addLeague) {
			// create new league
			this.http.post<any>('/api/add-league', league).subscribe((league_id) => {
				this.snackBar.open('League has been added', 'Dismiss', {
					duration: 3000,
					horizontalPosition: "right",
					verticalPosition: "top",
				});

				this.fetchLeagues().subscribe(() => {
					// Switch to Edit
					this.toggleLeagueFormType(this.addLeague);
					this.leagueFormGroup.get("league").setValue(league_id);
				});
			},
				errorMessage => {
					this.leagueErrors = Object.values(errorMessage.error.errors);
				});
		} else {
			// edit league
			this.http.post<any>('/api/edit-league', league).subscribe((league_id) => {
				this.snackBar.open('League has been updated', 'Dismiss', {
					duration: 3000,
					horizontalPosition: "right",
					verticalPosition: "top",
				});

				this.fetchLeagues().subscribe();
			},
				errorMessage => {
					this.leagueErrors = Object.values(errorMessage.error.errors);
				});
		}
	}

	deleteDivision() {
		let division: any = {
			division: this.divisionFormGroup.get('division').value
		}

		this.http.post<any>('/api/remove-division', division).subscribe(() => {
			this.snackBar.open('Division has been removed', 'Dismiss', {
				duration: 3000,
				horizontalPosition: "right",
				verticalPosition: "top",
			});

			this.fetchDivisions(this.leagueFormGroup.get('league').value).subscribe(() => {
				this.divisionFormGroup.get("division").setValue(null);
			});
		},
			errorMessage => {
				this.snackBar.open('Something went wrong, division was not removed', 'Dismiss', {
					duration: 3000,
					horizontalPosition: "right",
					verticalPosition: "top",
				});
			});
	}

	saveDivision() {
		let division: any = {
			division: this.divisionFormGroup.get('division').value,
			league: this.leagueFormGroup.get('league').value,

			name: this.divisionFormGroup.get('name').value
		}

		if (this.addDivision) {
			// create new division
			this.http.post<any>('/api/add-division', division).subscribe((division_id) => {
				this.snackBar.open('Division has been added', 'Dismiss', {
					duration: 3000,
					horizontalPosition: "right",
					verticalPosition: "top",
				});

				this.fetchDivisions(this.leagueFormGroup.get('league').value).subscribe(() => {
					// Switch to Edit
					this.toggleDivisionFormType(this.addDivision);
					this.divisionFormGroup.get("division").setValue(division_id);
				})
			},
				errorMessage => {
					this.divisionErrors = Object.values(errorMessage.error.errors);
				});
		} else {
			// edit division
			this.http.post<any>('/api/edit-division', division).subscribe((division_id) => {
				this.snackBar.open('Division has been updated', 'Dismiss', {
					duration: 3000,
					horizontalPosition: "right",
					verticalPosition: "top",
				});

				this.fetchDivisions(this.leagueFormGroup.get('league').value).subscribe();
			},
				errorMessage => {
					this.divisionErrors = Object.values(errorMessage.error.errors);
				});
		}
	}

	deleteSeason() {
		let season: any = {
			season: this.seasonFormGroup.get('season').value
		}

		this.http.post<any>('/api/remove-season', season).subscribe(() => {
			this.snackBar.open('Season has been removed', 'Dismiss', {
				duration: 3000,
				horizontalPosition: "right",
				verticalPosition: "top",
			});

			this.fetchSeasons(this.divisionFormGroup.get('division').value).subscribe(() => {
				this.seasonFormGroup.get("season").setValue(null);
			});
		},
			errorMessage => {
				this.snackBar.open('Something went wrong, season was not removed', 'Dismiss', {
					duration: 3000,
					horizontalPosition: "right",
					verticalPosition: "top",
				});
			});
	}

	saveSeason() {
		let season: any = {
			season: this.seasonFormGroup.get('season').value,
			division: this.divisionFormGroup.get('division').value,

			active: this.seasonFormGroup.get('active').value,
			complete: this.seasonFormGroup.get('complete').value,
			start_at: this.seasonFormGroup.get('start_at').value,
			number_of_games: this.seasonFormGroup.get('number_of_games').value,
			league_fee: this.seasonFormGroup.get('league_fee').value,
			offical_fee_per_game: this.seasonFormGroup.get('offical_fee_per_game').value
		}

		if (this.addSeason) {
			// create new season
			this.http.post<any>('/api/add-season', season).subscribe((season_id) => {
				this.snackBar.open('Season has been added', 'Dismiss', {
					duration: 3000,
					horizontalPosition: "right",
					verticalPosition: "top",
				});

				this.fetchSeasons(this.divisionFormGroup.get('division').value).subscribe(() => {
					// Switch to Edit
					this.toggleSeasonFormType(this.addSeason);
					this.seasonFormGroup.get("season").setValue(season_id);
				});
			},
				errorMessage => {
					this.seasonErrors = Object.values(errorMessage.error.errors);
				});
		} else {
			// edit season
			this.http.post<any>('/api/edit-season', season).subscribe((season_id) => {
				this.snackBar.open('Season has been updated', 'Dismiss', {
					duration: 3000,
					horizontalPosition: "right",
					verticalPosition: "top",
				});

				this.fetchSeasons(this.divisionFormGroup.get('division').value).subscribe();
			},
				errorMessage => {
					this.seasonErrors = Object.values(errorMessage.error.errors);
				});
		}
	}

	setStep(index: number) {
		if (this.step > index) {
			this.step = index + 1;
		} else {
			this.step = index;
		}
	}

	nextStep() {
		this.step++;
	}

	prevStep() {
		this.step--;
	}
}
