import { Component } from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import { MatNavList } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar} from '@angular/material/toolbar'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarLinkComponent } from '../sidebar-link/sidebar-link.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [MatNavList, MatSidenav, MatSidenavContainer, MatSidenavContent, MatIcon, CommonModule, FormsModule, SidebarLinkComponent, MatToolbar],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss'
})
export class AdminSidebarComponent {
  constructor(private authService: AuthService) { }

  logout(): void {
    // This method should be implemented in the auth service
    this.authService.logout();
  }
}
