import { Component } from '@angular/core';

import { StreamersService } from '../_services/streamers.service';

@Component({
  selector: 'tvrs-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private streamersService: StreamersService
  ) { }

  private navItems = [
    {
      anchor: 'All',
      text: 'All Streamers'
    },
    {
      anchor: 'Online',
      text: 'Currently Live'
    },
    {
      anchor: 'Offline',
      text: 'Currently Offline'
    }
  ];
  private navBrand = 'Twitch/ers';

  // Refreshes the streamers' list manually
  refreshStreamers(): void {
    this.streamersService.refreshStreamersList();
  }
}
