import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar-link',
  standalone: true,
  imports: [MatIcon, RouterLink],
  templateUrl: './sidebar-link.component.html',
  styleUrl: './sidebar-link.component.scss'
})
export class SidebarLinkComponent {
  @Input()
  icon!: string;
  @Input()
  label!: string;
  @Input()
  route!: string;

  constructor() {}

  closeSidenav() {
    // Optionally close sidenav logic can be added here
  }
}
