import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-update-booking-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './update-booking-dialog.component.html',
  styleUrls: ['./update-booking-dialog.component.scss'],
})
export class UpdateBookingDialogComponent {
  statusOptions: string[] = ['pending', 'confirmed', 'completed', 'cancelled'];
  status: string;

  constructor(
    public dialogRef: MatDialogRef<UpdateBookingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.status = data.booking.status;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close({ status: this.status });
  }
}
