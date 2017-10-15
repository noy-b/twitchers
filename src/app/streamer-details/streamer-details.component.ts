import { StreamerPlayerService } from './services/streamer-player.service';
import { Component, OnInit, HostBinding, AfterViewInit } from '@angular/core';
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
export class StreamerDetailsComponent implements OnInit, AfterViewInit {
    @HostBinding('@routeFadeIn')

    private streamerDetailsSub: Subscription;
    private streamerInfos;
    private streamerName = this.activeRoute.snapshot.params['streamersName'];
    private streamerPlayerReady = this.streamerPlayer.twitchPlayerReady;

    constructor(
        private activeRoute: ActivatedRoute,
        private streamerDetails: StreamerDetailsService,
        private streamerPlayer: StreamerPlayerService,
        private titleService: Title
    ) {
        this.streamerInfos = this.streamerDetails.streamerDetails;
    }
    // Body overflow hidden to avoid multiple scrollbars
    setOverflow(): void {
        document.getElementsByTagName('body')[0].style['overflow'] = 'hidden';
    }
    getPlayer(): void {
        this.streamerPlayer.createTwitchPlayer(this.streamerName.toLowerCase().replace(/ /g, ''));
    }
    setPageTitle(): void {
        this.titleService.setTitle(`Twitch/ers - ${ this.streamerName }`);
    }
    ngOnInit(): void {
        this.setPageTitle();
        this.setOverflow();
    }
    ngAfterViewInit(): void {
        this.getPlayer();
    }
}
