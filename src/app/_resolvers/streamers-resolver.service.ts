import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Streamer } from '../_models/streamers';
import { StreamersService } from '../_services/streamers.service';

@Injectable()
export class StreamersResolver implements Resolve<Streamer[]> {

  private data;

  constructor(
      private streamersService: StreamersService,
      private router: Router
    ) {}

  private getNewData(): Observable<Streamer[]> {
    return this.streamersService.getStreamers().map(res => this.data = res);
  }
  private getOldData(): Observable<Streamer[]> {
    this.data = this.streamersService.streamersList.getValue();
    return this.data;
  }
  // Return the users only if not already available.
  // Otherwise, return an observable of the pre-existing data.
  resolve(): Observable<Streamer[]> {
    return (this.router.url !== '/') && this.data ? this.getOldData() : this.getNewData();
  }
}
