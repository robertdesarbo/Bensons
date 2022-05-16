import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';

import spacetime from 'spacetime';
import { FormActionList } from 'src/app/models/enum/form-action.enum';
import { Field } from 'src/app/models/field.model';

@Component({
  selector: 'dialog-field',
  templateUrl: 'dialog-field.html',
  styleUrls: ['./dialog-field.scss']
})
export class DialogField {
  readonly spacetime = spacetime;

  readonly formControl: FormGroup;

  public dialogTitle: string;
  public errors: string[];

  public field$: Observable<Field>;

  public isLoading = true;

  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<DialogField>,
              private http: HttpClient,
              @Inject(MAT_DIALOG_DATA) public injectedData: any) {

    this.formControl = this.formBuilder.group({
      name: ['', Validators.required],
      number: [''],
      sport: ['', Validators.required],
      active: [true, Validators.required],
      lights: [false, Validators.required],
      ground_rules: [''],
      alcohol: [false, Validators.required],
      private_property: [false, Validators.required],
      pets: [false, Validators.required],
      smoking: [false, Validators.required],
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
          field: this.injectedData.fieldId
        }
      };

      this.field$ = this.http.get<Field>('/api/field', params);

      this.field$.subscribe((field: Field) => {
        this.formControl.get('name').setValue(field.name);
        this.formControl.get('number').setValue(field.number);
        this.formControl.get('sport').setValue(field.sport);
        this.formControl.get('active').setValue(field.active);
        this.formControl.get('lights').setValue(field.lights);
        this.formControl.get('ground_rules').setValue(field.ground_rules);
        this.formControl.get('alcohol').setValue(field.alcohol);
        this.formControl.get('private_property').setValue(field.private_property);
        this.formControl.get('pets').setValue(field.pets);
        this.formControl.get('smoking').setValue(field.smoking);

        this.isLoading = false;
      });

    } else {
      this.field$ = of(null);
      this.field$.subscribe(() => {
        this.isLoading = false;
      });
    }
  }

  removeField(): void {
    const field: any = {
      field: this.injectedData.fieldId
    };

    this.http.post<any>('/api/remove-field', field).subscribe(() => {
        this.snackBar.open('Field has been removed', 'Dismiss', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });

        this.dialogRef.close(true);
      },
      errorMessage => {
        this.snackBar.open('Something went wrong, field was not removed', 'Dismiss', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      });
  }

  addField(): void {
    if (this.formControl.valid) {
      let field: any = {
        field_location_id: this.injectedData.fieldLocationId,
        name: this.formControl.get('name').value,
        number: this.formControl.get('number').value,
        sport: this.formControl.get('sport').value,
        active: this.formControl.get('active').value,
        lights: this.formControl.get('lights').value,
        ground_rules: this.formControl.get('ground_rules').value,
        alcohol: this.formControl.get('alcohol').value,
        private_property: this.formControl.get('private_property').value,
        pets: this.formControl.get('pets').value,
        smoking: this.formControl.get('smoking').value,
      };

      if (this.injectedData.fieldId) {
        field = {
          ...field,
          field: this.injectedData.fieldId
        };

        // editing a field
        this.http.post<any>('/api/edit-field', field).subscribe(() => {
            this.snackBar.open('Field has been edited', 'Dismiss', {
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
        this.http.post<any>('/api/add-field', field).subscribe(() => {
            this.snackBar.open('Field has been added', 'Dismiss', {
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
