import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'dialog-confirm-dialog',
	templateUrl: 'dialog-confirm.html',
	styleUrls: ['./dialog-confirm.scss']
})
export class DialogConfirm {
	constructor(
		private dialogRef: MatDialogRef<DialogConfirm>,
		@Inject(MAT_DIALOG_DATA) public injectedData: any) {
	}

	cancel(): void {
		this.dialogRef.close(false);
	}

	confirm(): void {
		this.dialogRef.close(true);
	}
}
