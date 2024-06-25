import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../services/notification.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  loginForm = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  login() {
    if (this.loginForm.email && this.loginForm.password) {
      this.authService.login(this.loginForm).subscribe(
        response => {
          // Handle successful login response
          localStorage.setItem('token', response.token);
          localStorage.setItem('userid', response.userid);
          localStorage.setItem('isLoggedIn', '1');
          if (response.isAdmin){
            localStorage.setItem('isAdmin', response.isAdmin);
            this.router.navigate(['/admin']); // Redirect to admin dashboard after successful login
            this.notificationService.notify('Admin Login successful!', 'success');
          }
          else{
            this.router.navigate(['/userd']); // Redirect to dashboard after successful login
            this.notificationService.notify('User Login successful!', 'success');
          }
        },
        error => {
          // Handle error response
          console.error('Login failed', error);
          this.notificationService.notify('Login failed. Please try again.', 'error');
        }
      );
    } else {
      // Handle form validation error
      this.notificationService.notify('Please fill in all required fields', 'warning');
    }
  }
}
