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
    private streamerInfos = this.streamerDetails.streamerDetails;
    private streamerName = this.activeRoute.snapshot.params['streamersName'];

    constructor(
        private activeRoute: ActivatedRoute,
        private streamerDetails: StreamerDetailsService,
        private titleService: Title
    ) { }
    // Body overflow hidden to avoid multiple scrollbars
    setOverflow(type: string): void {
        document.getElementsByTagName('body')[0].style['overflow'] = type;
    }
    // Set the page title
    setPageTitle(): void {
        this.titleService.setTitle(`Twitch/ers - ${this.streamerName}`);
    }

    // Hooks Life Cycle
    ngOnInit(): void {
        this.setPageTitle();
        this.setOverflow('hidden');
    }
    ngOnDestroy(): void {
        this.setOverflow('');
    }
}
