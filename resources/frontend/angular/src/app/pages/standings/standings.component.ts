import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Division } from 'src/app/models/division.model';

@Component({
	selector: 'app-standings',
	templateUrl: './standings.component.html',
	styleUrls: ['./standings.component.scss']
})
export class StandingsComponent {

	readonly formControl: FormGroup;

	public division$: Observable<Division[]>;
	public listOfDivisions: Division[];

	public divisionBadgeName: string;

	constructor(public http: HttpClient,
		private formBuilder: FormBuilder) {
		this.division$ = this.http.get<Division[]>('/api/division').pipe(
			tap((divisions) => {
				this.listOfDivisions = divisions;
			})
		);

		this.formControl = this.formBuilder.group({
			team: '',
			division: null,
			previousWeeks: false
		});

		this.formControl.get('division').valueChanges.subscribe(value => {
			this.divisionBadgeName = this.getDivisionName(value);

		});
	}

	getDivisionName(divisionId: number | string): string {
		if (divisionId === "All") {
			return divisionId;
		}

		return this.listOfDivisions.find(division => division.id === divisionId) ?.name;
	}
}
