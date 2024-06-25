import { Component } from '@angular/core';
import { BookingsService } from '../../../services/bookings.service';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateBookingDialogComponent } from '../../utils/update-booking-dialog/update-booking-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [   CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,MatDialogModule, UpdateBookingDialogComponent],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss'
})
export class BookingsComponent {
  bookings: any[] = [];
  tourId: string = '';

  displayedColumns: string[] = ['tourName', 'destination', 'duration', 'price', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(private bookingsService: BookingsService, private dialog: MatDialog) {}

  ngOnInit() {
    this.bookingsService.getAllBookings().subscribe((bookings) => {
      this.dataSource.data = bookings;
    });
  }

  loadAllBookings(){
    this.bookingsService.getAllBookings().subscribe((bookings) => {
      this.dataSource.data = bookings;
    });
  }

  openUpdateDialog(booking: any) {
    const dialogRef = this.dialog.open(UpdateBookingDialogComponent, {
      width: '300px',
      data: { booking }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookingsService.updateBooking(booking.id, result.status).subscribe(() => {
          // Update the table data after the update
          this.ngOnInit();
        });
      }
    });
  }

  createBooking(): void {
    this.bookingsService.createBooking(this.tourId).subscribe(
      () => {
        console.log('Booking created successfully.');
        this.loadAllBookings(); // Refresh bookings after creating new one
      },
      (error) => {
        console.error('Error creating booking:', error);
      }
    );
  }
}
