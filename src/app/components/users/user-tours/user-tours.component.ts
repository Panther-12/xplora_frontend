import { Component } from '@angular/core';
import { TourService } from '../../../services/tour.service';
import { BookingsService } from '../../../services/bookings.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../services/notification.service';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-tours',
  standalone: true,
  imports: [RouterLink, CommonModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatSelectModule, FormsModule],
  templateUrl: './user-tours.component.html',
  styleUrl: './user-tours.component.scss'
})
export class UserToursComponent {
  tours: any[] = [];
  filteredTours: any[] = [];
  tourTypes: string[] = [];

  constructor(private toursService: TourService, private bookingsService: BookingsService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loadTours();
  }

  loadTours() {
    this.toursService.getAllTours().subscribe(
      (data) => {
        this.tours = data;
        this.filteredTours = data;
        this.tourTypes = Array.from(new Set(data.map((tour: { tourType: string; }) => tour.tourType.toLowerCase())));
        console.log(`filteredtours: ${this.filteredTours} tourTypes: ${this.tourTypes}`)
        this.notificationService.notify('Tours loaded successfully.', 'success')
      },
      (error) => {
        this.notificationService.notify('Error fetching tours:', 'error');
      }
    );
  }

  onSearch(query: string) {
    this.filteredTours = this.tours.filter(tour => tour.name.toLowerCase().includes(query.toLowerCase()));
  }

  onFilter(type: string) {
    this.filteredTours = this.tours.filter(tour => tour.tourType.toLowerCase() === type);
  }

  bookTour(tourId: string) {
    this.bookingsService.createBooking(tourId).subscribe(
      () => {
        this.notificationService.notify('Tour booked successfully.', 'success');
        // Optionally, you can navigate to the user bookings page or refresh the tour list
      },
      (error) => {
        this.notificationService.notify('Error booking tour:', 'error');
      }
    );
  }

  getRandomImage(): string {
    const images = [
      'https://via.placeholder.com/300x200?text=Tour+Image+1',
      'https://via.placeholder.com/300x200?text=Tour+Image+2',
      'https://via.placeholder.com/300x200?text=Tour+Image+3',
      'https://via.placeholder.com/300x200?text=Tour+Image+4',
      'https://via.placeholder.com/300x200?text=Tour+Image+5'
    ];
    return images[Math.floor(Math.random() * images.length)];
  }
}
