import { Component, ChangeDetectorRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

import { Observable, merge } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Division } from 'src/app/models/division.model';
import { Season } from 'src/app/models/season.model';

@Component({
	selector: 'app-standings',
	templateUrl: './standings.component.html',
	styleUrls: ['./standings.component.scss']
})
export class StandingsComponent {

	readonly formControl: UntypedFormGroup;

	public searchHasResults = false;

	public division$: Observable<Division[]>;
	public season$: Observable<Season[]>;

	public listOfDivisions: Division[];

	public divisionBadgeName: string;

	constructor(public http: HttpClient,
		private formBuilder: UntypedFormBuilder,
		private changeDetector: ChangeDetectorRef) {
		this.division$ = this.http.get<Division[]>('/api/division').pipe(
			tap((divisions) => {
				this.listOfDivisions = divisions;
			})
		);

		this.season$ = this.http.get<Season[]>('/api/active-seasons');

		this.formControl = this.formBuilder.group({
			team: '',
			division: null,
			previousWeeks: false
		});

		this.formControl.get('division').valueChanges.subscribe(value => {
			this.divisionBadgeName = this.getDivisionName(value);
		});

		merge(
			this.formControl.get('team').valueChanges,
			this.formControl.get('division').valueChanges
		).subscribe(() => {
			this.searchHasResults = false;

			this.changeDetector.detectChanges();
		});

	}

	setSearchHasResults() {
		this.searchHasResults = true;

		this.changeDetector.detectChanges();
	}

	getDivisionName(divisionId: number | string): string {
		if (divisionId === "All") {
			return divisionId;
		}

		return this.listOfDivisions.find(division => division.id === divisionId) ?.name;
	}
}
