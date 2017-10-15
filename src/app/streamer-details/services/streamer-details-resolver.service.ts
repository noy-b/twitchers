import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { StreamerDetails } from '../models/streamer-details';
import { StreamerDetailsService } from './streamer-details.service';

@Injectable()
export class StreamerDetailsResolver implements Resolve<StreamerDetails[]> {

  private data;

  constructor(
      private streamerDetailsService: StreamerDetailsService,
      private router: Router
    ) {}

  private getNewData(name: String): Observable<StreamerDetails[]> {
    return this.streamerDetailsService.getStreamerDetails(name).map(res => this.data = res);
  }
  private getOldData(): Observable<StreamerDetails[]> {
    this.data = this.streamerDetailsService.streamerDetails.getValue();
    return this.data;
  }
  // Return the streamer details only if not already available (and if the name isn't the same).
  // Otherwise, return the pre-existing BehaviourSubject.
  resolve(route: ActivatedRouteSnapshot): Observable<StreamerDetails[]> {
    const name = route.paramMap.get('streamersName').toLowerCase().replace(/ /g, '');
    return this.data && (name === this.data.name) ? this.getOldData() : this.getNewData(name);
  }
}
