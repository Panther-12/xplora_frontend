import { Component, OnInit } from '@angular/core';
import { TourService } from '../../../services/tour.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatList,MatListItem } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatTable, MatTableModule }from '@angular/material/table';
import { NotificationService } from '../../../services/notification.service';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatFormField, MatLabel, MatInput, CommonModule, FormsModule, MatList, MatListItem, MatIcon, MatTable, MatTableModule, MatButtonModule],
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.scss'
})
export class ToursComponent implements OnInit{
  tourForm: any = {};
  tour = {
    name: '',
    destination: '',
    duration: 0,
    price: 0,
    tourType: ''
  };

  displayedColumns: string[] = ['name', 'destination', 'duration', 'price', 'actions'];
  tours = [];

  constructor(private tourService: TourService, private snackBar: MatSnackBar,private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadTours();
  }

  loadTours() {
    this.tourService.getAllTours().subscribe(
      (data: any) => {
        this.tours = data;
      },
      error => {
        this.notificationService.notify('Error loading tours', 'error');
      }
    );
  }

  createTour() {
    this.tourService.createTour(this.tourForm).subscribe(
      (data: any) => {
        this.snackBar.open('Tour created successfully', 'Close', { duration: 3000 });
        this.loadTours();
        this.resetForm();
      },
      error => {
        this.notificationService.notify('Error creating tour', 'error');
      }
    );
  }

  deleteTour(tourId: string) {
    this.tourService.deleteTour(tourId).subscribe(
      () => {
        this.snackBar.open('Tour deleted successfully', 'Close', { duration: 3000 });
        this.loadTours();
      },
      error => {
        this.notificationService.notify('Error deleting tour', 'error');
      }
    );
  }

  resetForm() {
    this.tourForm = {};
  }
}
