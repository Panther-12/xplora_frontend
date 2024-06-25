import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule, RouterLink, MatToolbarModule, MatIconModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm = {
    name: '',
    email: '',
    password: '',
    role: 'user' // Default role is 'user'
  };

  constructor(private authService: AuthService, private router: Router, private notificationService: NotificationService) {}

  register() {
    if (this.registerForm.name && this.registerForm.email && this.registerForm.password) {
      this.authService.register(this.registerForm).subscribe(
        response => {
          // Handle successful registration response
          this.router.navigate(['/login']); // Redirect to login after successful registration
          this.notificationService.notify('Registration successful!', 'success');
        },
        error => {
          // Handle error response
          this.notificationService.notify('Registration failed', 'error');
        }
      );
    } else {
      // Handle form validation error
      this.notificationService.notify('Please fill in all required fields', 'warning');
    }
  }
}