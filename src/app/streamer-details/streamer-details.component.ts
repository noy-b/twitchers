import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { Title } from '@angular/platform-browser';
import { StreamerDetailsService } from './services/streamer-details.service';

import { routeFadeIn, routeSequenceAnim } from '../_animations';

@Component({
    selector: 'tvrs-streamer-details',
    templateUrl: './streamer-details.component.html',
    styleUrls: ['./streamer-details.component.css'],
    animations: [ routeFadeIn, routeSequenceAnim ]
})
export class StreamerDetailsComponent implements OnInit, OnDestroy {
    @HostBinding('@routeFadeIn')

    private streamerDetailsSub: Subscription;
    private streamerInfos;
    private streamerName = this.activeRoute.snapshot.params['streamersName'];

    constructor(
        private activeRoute: ActivatedRoute,
        private streamerDetails: StreamerDetailsService,
        private titleService: Title
    ) { }

    // Get streamers details and set page title
    getDetails(): void {
        this.streamerDetailsSub =
        this.streamerDetails.getStreamerDetails(this.streamerName).subscribe((streamer) => {
           this.streamerInfos = streamer;
           this.titleService.setTitle(`Twitch/ers - ${ this.streamerInfos.username }`);
          });
    }

    ngOnInit(): void {
        this.getDetails();
        document.getElementsByTagName('body')[0].style['overflow'] = 'hidden';
    }
    ngOnDestroy(): void {
        this.streamerDetailsSub.unsubscribe();
    }
}
