import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../../services/user-profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatCardModule, MatInputModule, MatButtonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userProfileForm: FormGroup = new FormGroup({});
  user: any = {};

  constructor(private userProfileService: UserProfileService, private fb: FormBuilder) {
    this.userProfileForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userProfileService.getUserProfile().subscribe(
      (data) => {
        this.user = data;
        this.userProfileForm.patchValue(data);
      },
      (error) => {
        console.log('Error fetching user profile:', error);
      }
    );
  }

  updateUserProfile(): void {
    if (this.userProfileForm.valid) {
      this.userProfileService.updateUserProfile(this.userProfileForm.value).subscribe(
        (response) => {
          console.log('User profile updated successfully:', response);
        },
        (error) => {
          console.log('Error updating user profile:', error);
        }
      );
    }
  }
}
