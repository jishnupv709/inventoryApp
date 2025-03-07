import { Component, OnInit, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isDropdownOpen = false;
  isSearchExpanded = false;
  UserData: any=[];

  constructor(private eRef: ElementRef) {}

  ngOnInit(): void {
    const storedData = localStorage.getItem('userData');
    this.UserData = storedData ? JSON.parse(storedData) : null;    
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  expandSearch() {
    this.isSearchExpanded = true;
  }

  collapseSearch() {
    this.isSearchExpanded = false;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
      this.isSearchExpanded = false;
    }
  }


  showNotifications = false;

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }
}
