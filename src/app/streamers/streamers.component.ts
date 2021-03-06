import { Component, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs/Rx';

import { Streamer } from '../_models/streamers';
import { StreamersService } from '../_services/streamers.service';

import { staggerFade } from '../_animations';


@Component({
  selector: 'tvrs-streamers',
  templateUrl: './streamers.component.html',
  styleUrls: ['./streamers.component.css'],
  animations: [ staggerFade ],
})
export class StreamersComponent implements OnInit, OnDestroy {
  @HostBinding('@staggerFade')

  private interval = 120000; // Polling interval (2 minutes. Twitch api caches api results for 1 to 3 minutes anyway)
  private streamers;
  private filter;

  private listSub: Subscription;

  constructor(
    private activeRoute: ActivatedRoute,
    private streamersService: StreamersService,
    private titleService: Title
  ) { }
  // Starts streamers list polling
  pollStreamers(): void {
    this.streamersService.pollStreamers(this.interval); // Kicks off the polling
    this.streamers = this.streamersService.streamersList;
  }
  // Filters channels based on URL param
  filterStreamers(): void {
    this.filter = this.activeRoute.paramMap
      .map(params => params.get('streamersStatus'));
  }

  // Hooks Life Cycle
  ngOnInit(): void {
    this.titleService.setTitle(`Twitch/ers - Hub`);
    this.pollStreamers();
    this.filterStreamers();
  }
  ngOnDestroy(): void {
    this.streamersService.timerSub.unsubscribe(); // Ends the polling
  }
}
