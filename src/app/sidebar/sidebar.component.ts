import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'] // optional
})
export class SidebarComponent {
  openMenu: string | null = null;

  constructor(private eRef: ElementRef, private router: Router) {}

  toggleMenu(menuName: string) {
    this.openMenu = this.openMenu === menuName ? null : menuName;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.openMenu = null;
    }
  }
}
