import { Component, OnInit, HostBinding, OnDestroy, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { Title } from '@angular/platform-browser';
import { StreamerDetailsService } from '../_services/streamer-details.service';

import { detailsParentAnim, detailsChildrenAnim } from '../_animations';

@Component({
    selector: 'tvrs-streamer-details',
    templateUrl: './streamer-details.component.html',
    styleUrls: ['./streamer-details.component.css'],
    animations: [detailsParentAnim, detailsChildrenAnim]
})
export class StreamerDetailsComponent implements OnInit, OnDestroy {
    // Route animation
    @HostBinding('@detailsParentAnim')

    private interval = 60000; // Polling interval (1 minute)
    private streamerDetailsSub: Subscription;
    private streamerInfos;
    private streamerName = this.activeRoute.snapshot.params['streamerName'];

    // Clicking outside of the streamer's details component or pressing the ESC key will close it
    @ViewChild('parentDiv') parentDiv;
    @HostListener('document:click', ['$event'])
    clickOutside(e) {
        if (this.parentDiv && !this.parentDiv.nativeElement.contains(e.target)) {
            this.closeDetails();
        }
    }
    @HostListener('document:keyup', ['$event'])
    escPressed(e: KeyboardEvent) {
        if (e.key === 'Escape') {
            this.closeDetails();
        }
    }

    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private streamerDetails: StreamerDetailsService,
        private titleService: Title
    ) { }
    // Set the page title
    setPageTitle(title: string): void {
        this.titleService.setTitle(title);
    }
    // Close details modal
    closeDetails(): void {
        // Previous URL - Remove parentheses, text inside them and last slash
        const url = this.router.url.replace(/ *\([^)]*\) */g, '').slice(0, -1);
        this.router.navigate([url, { outlets: { details: null } }]);
    }
    // Starts streamer's polling
    pollStreamer(): void {
        this.streamerDetails.streamerInfos.next(null);
        this.streamerDetails.pollStreamer(this.interval, this.streamerName); // Kicks off the polling
        this.streamerInfos = this.streamerDetails.streamerInfos;
    }

    // Hooks Life Cycle
    ngOnInit(): void {
        this.pollStreamer();
        this.setPageTitle(`Twitch/ers - ${this.streamerName}`);
    }
    ngOnDestroy(): void {
        this.streamerDetails.timerSub.unsubscribe(); // Ends the polling
        this.setPageTitle(`Twitch/ers - Hub`);
    }
}
