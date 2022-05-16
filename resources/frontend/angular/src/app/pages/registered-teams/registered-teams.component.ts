import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../authentication/authentication.service';
import { RegisteredTeam } from 'src/app/models/registered-team.model';
import { map, tap } from 'rxjs/operators';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {Observable} from 'rxjs';
import {Field} from '../../models/field.model';
import {MatSort} from '@angular/material/sort';

@Component({
	selector: 'app-registered-teams',
	templateUrl: './registered-teams.component.html',
	styleUrls: ['./registered-teams.component.scss']
})
export class RegisteredTeamsComponent implements AfterViewInit {
  @ViewChild(MatTable, {static: true}) table: MatTable<Field> = Object.create(null);
  @ViewChild(MatSort, {static: true}) sort: MatSort = Object.create(null);

  displayedColumns: string[];
  dataSource = new MatTableDataSource<RegisteredTeam>();
  noData: Observable<boolean>;

  public registeredTeam$: Observable<RegisteredTeam[]>;

  constructor(public http: HttpClient,
              public authenticationService: AuthenticationService) {

    this.displayedColumns = ['name', 'captain', 'division', 'registered'];

    this.loadRegisteredTeams();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadRegisteredTeams(): void {
    this.registeredTeam$ = this.http.get<RegisteredTeam[]>('/api/registered-teams').pipe(tap((RegisteredTeams: RegisteredTeam[]) => {
      this.dataSource.data = RegisteredTeams;
      this.noData = this.dataSource.connect().pipe(map(data => data.length === 0));

      this.dataSource.filterPredicate = (data: RegisteredTeam, filter: string) => {
        return data.team_name.toLowerCase().includes(filter);
      };
    }));
  }
}
