import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCard, MatCardContent, MatCardTitle, MatCardHeader, BaseChartDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
   // Dummy data for charts
   tourTypeLabels: string[] = ['Wildlife', 'Adventure', 'Cultural'];
   tourTypeData: any[] = [{data: [30, 50, 20] ,label: 'Tours'}]; // Example percentages
 
   bookingLabels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
   bookingData: any[] = [
     { data: [10, 15, 20, 18, 25, 30], label: 'Bookings' }
   ];
 
   ratingLabels: string[] = ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'];
   ratingData: any[] = [
     { data: [5, 10, 15, 25, 45], label: 'Ratings' }
   ];
 
   chartOptions: any = {
     responsive: true
   };
 
   constructor() { }
 
   ngOnInit(): void {
   }OnInit(): void {
  }
}
