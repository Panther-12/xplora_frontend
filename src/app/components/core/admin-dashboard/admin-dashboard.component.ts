import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TourService } from '../../../services/tour.service';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatList} from '@angular/material/list';
import {MatListItem} from '@angular/material/list';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { NotificationService } from '../../../services/notification.service';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [MatCard, MatCardHeader,MatCardContent,MatCardTitle,MatFormField,MatLabel, CommonModule, FormsModule, MatList, MatListItem, MatIcon, MatInput, MatButtonModule, MatIconModule, MatIconButton, AdminSidebarComponent, RouterOutlet],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  tours: any[] = [];
  tour: any = {};

  constructor(private tourService: TourService, private snackBar: MatSnackBar, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.fetchTours();
  }

  fetchTours(): void {
    this.tourService.getAllTours().subscribe(
      (data: any) => {
        this.tours = data;
      },
      error => {
        this.notificationService.notify('Error fetching tours', 'error');
      }
    );
  }

  onSubmit(): void {
    this.tourService.createTour(this.tour).subscribe(
      (data: any) => {
        this.notificationService.notify('Tour created successfully', 'success');
        this.fetchTours();
        this.resetForm();
      },
      error => {
        this.notificationService.notify('Error creating tour', 'error');
      }
    );
  }

  deleteTour(tourId: string): void {
    this.tourService.deleteTour(tourId).subscribe(
      () => {
        this.notificationService.notify('Tour deleted successfully', 'success');
        this.fetchTours();
      },
      error => {
        this.notificationService.notify('Error deleting tour', 'error');
      }
    );
  }

  resetForm(): void {
    this.tour = {};
  }
}
