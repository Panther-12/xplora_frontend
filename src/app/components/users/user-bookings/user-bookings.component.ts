import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../../../services/bookings.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatChipsModule, MatChip } from '@angular/material/chips';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatChipsModule],
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.scss']
})
export class UserBookingsComponent {
  bookings: any[] = [];
  displayedColumns: string[] = ['tour', 'destination', 'status', 'action'];

  constructor(private bookingsService: BookingsService) {
    this.loadBookings();
  }

  // ngOnInit(): void {
  //   this.loadBookings();
  // }

  loadBookings() {
    this.bookingsService.getBookings().subscribe(
      (data) => {
        this.bookings = data;
      },
      (error) => {
        console.log('Error fetching bookings:', error);
      }
    );
  }

  cancelBooking(bookingId: string) {
    this.bookingsService.updateBooking(bookingId, 'cancelled').subscribe(
      () => {
        this.bookings = this.bookings.filter(booking => booking.id !== bookingId);
      },
      (error) => {
        console.log('Error cancelling booking:', error);
      }
    );
  }
}
