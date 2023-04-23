import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';

import spacetime from 'spacetime';
import { FormActionList } from 'src/app/models/enum/form-action.enum';
import { FieldLocation } from 'src/app/models/field-location.model';

@Component({
  selector: 'dialog-field-location',
  templateUrl: 'dialog-field-location.html',
  styleUrls: ['./dialog-field-location.scss']
})
export class DialogFieldLocation {
  readonly spacetime = spacetime;

  readonly formControl: FormGroup;

  public dialogTitle: string;
  public errors: string[];

  public fieldLocation$: Observable<FieldLocation>;

  public isLoading = true;

  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<DialogFieldLocation>,
              private http: HttpClient,
              @Inject(MAT_DIALOG_DATA) public injectedData: any) {

    this.formControl = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
    });

    if (this.injectedData.type === FormActionList.remove) {
      this.dialogTitle = 'Remove';
    } else if (this.injectedData.type === FormActionList.edit) {
      this.dialogTitle = 'Update';
    } else {
      this.dialogTitle = 'Add';
    }

    if (this.injectedData.type === FormActionList.remove || this.injectedData.type === FormActionList.edit) {
      const params = {
        params: {
          fieldLocation: this.injectedData.fieldLocationId
        }
      };

      this.fieldLocation$ = this.http.get<FieldLocation>('/api/field-location', params);

      this.fieldLocation$.subscribe((fieldLocation: FieldLocation) => {
        this.formControl.get('name').setValue(fieldLocation.name);
        this.formControl.get('address').setValue(fieldLocation.address);
        this.formControl.get('state').setValue(fieldLocation.state);
        this.formControl.get('city').setValue(fieldLocation.city);
        this.formControl.get('zip').setValue(fieldLocation.zip);

        this.isLoading = false;
      });

    } else {
      this.fieldLocation$ = of(null);
      this.fieldLocation$.subscribe(() => {
        this.isLoading = false;
      });
    }
  }

  removeFieldLocation(): void {
    const fieldLocation: any = {
      fieldLocation: this.injectedData.fieldLocationId
    };

    this.http.post<any>('/api/remove-field-location', fieldLocation).subscribe(() => {
        this.snackBar.open('Field location has been removed', 'Dismiss', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });

        this.dialogRef.close(true);
      },
      errorMessage => {
        if (errorMessage?.error?.errors?.server) {
          this.snackBar.open(`${errorMessage?.error?.errors?.server.toString()}, field location was not removed`, 'Dismiss', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        } else {
          this.snackBar.open('Something went wrong, field location was not removed', 'Dismiss', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
      });
  }

  addFieldLocation(): void {
    if (this.formControl.valid) {
      let fieldLocation: any = {
        name: this.formControl.get('name').value,
        address: this.formControl.get('address').value,
        state: this.formControl.get('state').value,
        city: this.formControl.get('city').value,
        zip: this.formControl.get('zip').value,
      };

      if (this.injectedData.fieldLocationId) {
        fieldLocation = {
          ...fieldLocation,
          fieldLocation: this.injectedData.fieldLocationId
        };

        // editing a field locations
        this.http.post<any>('/api/edit-field-location', fieldLocation).subscribe(() => {
            this.snackBar.open('Field location has been edited', 'Dismiss', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });

            this.dialogRef.close(true);
          },
          errorMessage => {
            this.errors = Object.values(errorMessage.error.errors);
          });
      } else {
        this.http.post<any>('/api/add-field-location', fieldLocation).subscribe(() => {
            this.snackBar.open('Field location has been added', 'Dismiss', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });

            this.dialogRef.close(true);
          },
          errorMessage => {
            this.errors = Object.values(errorMessage.error.errors);
          });
      }
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
