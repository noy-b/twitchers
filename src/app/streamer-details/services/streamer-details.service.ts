import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, BehaviorSubject, Subject, Subscription } from 'rxjs/Rx';

import { StreamerDetails } from '../models/streamer-details';
import { SpinnerService } from '../../spinner/services/spinner.service';

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

    public streamerDetails = <BehaviorSubject<StreamerDetails>> new BehaviorSubject(null);

    constructor(
        private http: HttpClient
    ) { }
    // Gets info about one streamer
    // 1. The first request is used to transform the username in ID
    // 2. Then we create the two other requests made in parallel thanks to forkJoin and merged by switchMap
    // 3. The stream request will also get the box-art for the game if it's online
    // 4. The results are cast in the StreamerDetails class
    public getStreamerDetails(streamer: String): Observable<any> {
        return this.http.get(this.urlUser + streamer, { headers: this.httpHeaders })
        .switchMap((data: any) => {
            const stream  = this.http.get(this.urlStream + data.users[0]._id, { headers: this.httpHeaders })
                            .switchMap((live: any) => {
                                if (live.stream) {
                                    return this.http.get(this.urlCover + live.stream.game, { headers: this.httpHeaders })
                                    .map((cover: any) => {
                                        live.stream.game_box = cover.games[0].box.medium;
                                        return live;
                                    });
                                } else { return Observable.of(live); }
                            });
            const channel = this.http.get(this.urlChannel + data.users[0]._id, { headers: this.httpHeaders });

            return Observable.forkJoin([ stream, channel ]);
        }).map((data: any[]) => {
            const newData = new StreamerDetails(data[0], data[1]);
            this.streamerDetails.next(newData);
            return newData;
        });
    }
}
