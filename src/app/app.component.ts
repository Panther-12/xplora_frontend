import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastNotificationComponent } from './components/utils/toast-notification/toast-notification.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastNotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'xplora-tours-app';
}
