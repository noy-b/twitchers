import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, Subscription, BehaviorSubject } from 'rxjs/Rx';

import { StreamerDetails } from '../_models/streamer-details';
import { SpinnerService } from '../_services/spinner.service';

// Service to get all the streams and infos
@Injectable()
export class StreamerDetailsService {

    private urlUser       = `https://api.twitch.tv/v5/users/?login=`;
    private urlStream     = `https://api.twitch.tv/v5/streams/`;
    private urlChannel    = `https://api.twitch.tv/v5/channels/`;
    private urlCover      = `https://api.twitch.tv/v5/search/games?query=`;
    private apiKey        = `xdjosvpjf9brwzbkpo37r4ztjogo57`;
    private httpHeaders   = new HttpHeaders()
                            .set('Client-ID', `${this.apiKey}`)
                            .set('Accept', 'application/vnd.twitchtv.v5+json');

    public timerSub: Subscription;
    public streamerInfos = <BehaviorSubject<StreamerDetails>> new BehaviorSubject(null);

    constructor(
        private http: HttpClient,
        private spinnerService: SpinnerService
    ) { }
    // Gets info about one streamer
    // 1. The first request is used to transform the username in ID
    // 2. Then we create the two other requests made in parallel thanks to forkJoin and merged by switchMap
    // 3. The stream request will also get the box-art for the game if it's online
    // 4. The results are cast in the StreamerDetails class
    public getStreamerDetails(streamer: String): Observable<any> {
        const formattedStreamer = streamer.toLowerCase().replace(/ /g, '');
        return this.http.get(this.urlUser + formattedStreamer, { headers: this.httpHeaders })
        .switchMap((data: any) => {
            // Show loading spinner
            this.spinnerService.isLoading(true);
            const stream  = this.http.get(this.urlStream + data.users[0]._id, { headers: this.httpHeaders })
                            .switchMap((live: any) => {
                                if (live.stream) {
                                    const encodedGame = encodeURIComponent(live.stream.game);
                                    return this.http.get(this.urlCover + encodedGame, { headers: this.httpHeaders })
                                    .map((cover: any) => {
                                        live.stream.game_box = cover.games[0].box.large;
                                        return live;
                                    });
                                } else { return Observable.of(live); }
                            });
            const channel = this.http.get(this.urlChannel + data.users[0]._id, { headers: this.httpHeaders });

            return Observable.forkJoin([ stream, channel ]);
        }).map((data: any[]) => {
            // Cast results to StreamerDetails class
            const newData = new StreamerDetails(data[0], data[1]);
            // Update Behaviour Subject's data
            this.streamerInfos.next(newData);
            // Hide loading spinner
            this.spinnerService.isLoading(false);
            return newData;
        }).retryWhen(errors => errors.delay(5000).take(10));
    }
    // Polling of streamer's infos
    public pollStreamer(interval: number, name: string) {
        this.timerSub = Observable.timer(0, interval).switchMap(() => this.getStreamerDetails(name)).subscribe();
    }
}
