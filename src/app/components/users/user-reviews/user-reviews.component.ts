import { Component, Inject, Input, OnInit } from '@angular/core';
import { ReviewsService } from '../../../services/reviews.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-user-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatDialogModule, MatTableModule, MatButtonModule, MatIconModule, MatInputModule],
  templateUrl: './user-reviews.component.html',
  styleUrls: ['./user-reviews.component.scss']
})
export class ReviewComponent implements OnInit {
  @Input()
  tourId: string = '';
  reviews: any[] = [];
  reviewForm: FormGroup = new FormGroup({});
  displayedColumns: string[] = ['user','rating', 'comment'];

  constructor(
    private reviewsService: ReviewsService, 
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private notificationService: NotificationService
  ) {
    this.reviewForm = this.fb.group({
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  ngOnInit(): void {
    this.tourId = this.route.snapshot.paramMap.get('id') as string;
    this.loadReviews();
  }

  loadReviews() {
    this.reviewsService.getReviews(this.tourId).subscribe(
      (data) => {
        this.reviews = data;
      },
      (error) => {
        this.notificationService.notify('Error fetching reviews:', 'error');
      }
    );
  }

  openReviewForm(): void {
    const dialogRef = this.dialog.open(ReviewFormDialog, {
      width: '400px',
      data: { tourId: this.tourId, reviewForm: this.reviewForm }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'submitted') {
        this.loadReviews();
      }
    });
  }

  getStars(rating: number): string[] {
    return Array(rating).fill('star');
  }
}

@Component({
  selector: 'review-form-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatDialogModule, MatTableModule, MatButtonModule, MatIconModule, MatInputModule],
  template: `
  <h1 mat-dialog-title>Submit Your Review</h1>
  <div mat-dialog-content>
    <form [formGroup]="data.reviewForm" (ngSubmit)="submitReview()">
      <div>
        <label for="rating">Rating:</label>
        <input id="rating" formControlName="rating" type="number" min="1" max="5" matInput>
        <div *ngIf="data.reviewForm.controls['rating'].invalid && (data.reviewForm.controls['rating'].dirty || data.reviewForm.controls['rating'].touched)">
          <small class="error" *ngIf="data.reviewForm.controls['rating'].errors?.['required']">Rating is required.</small>
          <small class="error" *ngIf="data.reviewForm.controls['rating'].errors?.['min']">Minimum rating is 1.</small>
          <small class="error" *ngIf="data.reviewForm.controls['rating'].errors?.['max']">Maximum rating is 5.</small>
        </div>
      </div>

      <div>
        <label for="comment">Comment:</label>
        <textarea id="comment" formControlName="comment" matInput></textarea>
        <div *ngIf="data.reviewForm.controls['comment'].invalid && (data.reviewForm.controls['comment'].dirty || data.reviewForm.controls['comment'].touched)">
          <small class="error" *ngIf="data.reviewForm.controls['comment']?.errors?.['required']">Comment is required.</small>
          <small class="error" *ngIf="data.reviewForm.controls['comment'].errors?.['maxlength']">Comment cannot exceed 500 characters.</small>
        </div>
      </div>
      <div mat-dialog-actions>
        <button mat-button (click)="onNoClick()">Cancel</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="data.reviewForm.invalid">Submit</button>
      </div>
    </form>
  </div>
  `,
})
export class ReviewFormDialog {

  constructor(
    public dialogRef: MatDialogRef<ReviewFormDialog>,private reviewsService: ReviewsService,
    @Inject(MAT_DIALOG_DATA) public data: { tourId: string, reviewForm: FormGroup }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitReview(): void {
    if (this.data.reviewForm.valid) {
      const reviewData = {
        tourId: this.data.tourId,
        ...this.data.reviewForm.value
      };

      // Assuming ReviewService is provided in a higher scope
      // Make sure to inject ReviewService in this component if needed
      this.reviewsService.createReview(reviewData.tourId, reviewData.rating, reviewData.comment).subscribe(response => {
        this.dialogRef.close('submitted');
      });
    }
  }
}
