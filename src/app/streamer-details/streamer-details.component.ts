import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { StreamerDetailsService } from './services/streamer-details.service';

import { } from '../animations';

@Component({
    selector: 'tvrs-streamer-details',
    templateUrl: './streamer-details.component.html',
    styleUrls: ['./streamer-details.component.css']
})
export class StreamerDetailsComponent implements OnInit, OnDestroy {
    private streamerInfos;
    private isSticky: Boolean;

    @HostListener('scroll', ['$event'])
    onScroll(e): void {
        const st = e.srcElement.scrollTop;
        console.log(st);
        if (st >= 150) {
            this.isSticky = true;
        } else {
            this.isSticky = false;
        }
    }

    constructor(
        private activeRoute: ActivatedRoute,
        private streamerDetails: StreamerDetailsService
    ) { }

    getDetails(): void {
        this.activeRoute.paramMap
            .map(params => params.get('streamersName')).subscribe(streamer => {
                this.streamerInfos = this.streamerDetails.getStreamerDetails(streamer);
            });
    }

    ngOnInit(): void {
        this.getDetails();
        document.getElementsByTagName('body')[0].style['overflow'] = 'hidden';
    }
    ngOnDestroy(): void {

    }
}
