import { Component, OnInit, OnDestroy } from '@angular/core';
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
    private streamerName = this.activeRoute.snapshot.params['streamersName'];

    constructor(
        private activeRoute: ActivatedRoute,
        private streamerDetails: StreamerDetailsService
    ) { }

    getDetails(): void {
       this.streamerInfos = this.streamerDetails.getStreamerDetails(this.streamerName);
    }

    ngOnInit(): void {
        this.getDetails();
        document.getElementsByTagName('body')[0].style['overflow'] = 'hidden';
    }
    ngOnDestroy(): void {

    }
}
