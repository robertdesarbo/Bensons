import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {animate, state, style, transition, trigger} from '@angular/animations';

import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

import { Field } from 'src/app/models/field.model';
import { FieldLocation } from 'src/app/models/field-location.model';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { FormAction } from 'src/app/models/enum/form-action.enum';
import { DialogFieldLocation } from './modals/dialog-field-location.component';
import { DialogField } from './modals/dialog-field.component';
import { FormActionList } from 'src/app/models/enum/form-action.enum';

@Component({
  selector: 'app-fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class FieldsComponent implements AfterViewInit {
  @ViewChild(MatTable, {static: true}) table: MatTable<Field> = Object.create(null);
  @ViewChild(MatSort, {static: true}) sort: MatSort = Object.create(null);

  searchText: any;
  displayedColumns: string[];
  expandedFieldElement: Field | null;

  dataSource = new MatTableDataSource<FieldLocation>();
  noData: Observable<boolean>;

  public FormActionList = FormActionList;

  public fieldLocation$: Observable<FieldLocation[]>;
  public field$: Observable<Field[]>;

  constructor(public http: HttpClient,
              public dialog: MatDialog,
              public authenticationService: AuthenticationService) {

    this.displayedColumns = ['name', 'address', 'number-of-fields', 'icon'];

    if (authenticationService.isAuthenticated) {
      this.displayedColumns.unshift('action');
    }

    this.loadFieldLocation();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getAddress(fieldLocation: FieldLocation): string {
    return 'https://www.google.com/maps/dir/?api=1&destination='
      + fieldLocation.address + ' '
      + fieldLocation.city + ' '
      + fieldLocation.state + ' '
      + fieldLocation.zip;
  }

  loadFieldLocation(): void {
    this.fieldLocation$ = this.http.get<FieldLocation[]>('/api/field-location').pipe(tap((fieldLocation: FieldLocation[]) => {
      this.dataSource.data = fieldLocation;
      this.noData = this.dataSource.connect().pipe(map(data => data.length === 0));

      this.dataSource.filterPredicate = (data: FieldLocation, filter: string) => {
        return data.name.toLowerCase().includes(filter);
      };
    }));
  }

  openFieldLocation(type: FormAction, fieldLocationId?: number): void {
    const data = {
      type,
      fieldLocationId
    };

    const dialogRef = this.dialog.open(DialogFieldLocation, {
      width: '575px',
      data
    });

    dialogRef.afterClosed().subscribe((refreshData) => {
      if (refreshData) {
        this.loadFieldLocation();
      }
    });
  }

  openField(type: FormAction, fieldLocationId: number, fieldId?: number): void {
    const data = {
      type,
      fieldLocationId,
      fieldId
    };

    const dialogRef = this.dialog.open(DialogField, {
      width: '575px',
      data
    });

    dialogRef.afterClosed().subscribe((refreshData) => {
      if (refreshData) {
        this.loadFieldLocation();
      }
    });
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
