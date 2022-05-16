import {Component, AfterViewInit, Injectable, Inject} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DOCUMENT} from '@angular/common';

import {DialogRegisterTeam} from './modals/register-team-dialog.component';
import {DialogLookingForATeam} from './modals/looking-for-a-team-dialog.component';

import {HttpClient} from '@angular/common/http';

import {ReplaySubject, Observable, forkJoin} from 'rxjs';
import {shareReplay} from 'rxjs/operators';

import {LeagueStat} from 'src/app/models/league-stat.model';
import {League} from 'src/app/models/league.model';

import spacetime from 'spacetime';

@Component({
  selector: 'app-starter',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  readonly spacetime = spacetime;
  private _loadedLibraries: { [url: string]: ReplaySubject<any> } = {};
  stacked = false;

  public leagueStat$: Observable<LeagueStat[]>;
  public activeSeasons$: Observable<League[]>;

  constructor(public dialog: MatDialog, public http: HttpClient, @Inject(DOCUMENT) private readonly document: any) {
    this.leagueStat$ = this.http.get<LeagueStat[]>('/api/home/stats').pipe(
      shareReplay()
    );

    this.activeSeasons$ = this.http.get<League[]>('/api/active-seasons-by-league').pipe(
      shareReplay()
    );
  }

  ngAfterViewInit(): void {
    this.document.defaultView.twttr.widgets.load();
  }

  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(DialogRegisterTeam, {
      width: '375px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result) => {
      //
    });
  }

  openLookingForATeamDialog(): void {
    const dialogRef = this.dialog.open(DialogLookingForATeam);

    dialogRef.afterClosed().subscribe((result) => {
      //
    });
  }
}
