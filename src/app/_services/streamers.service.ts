import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, BehaviorSubject, Subject, Subscription } from 'rxjs/Rx';

import { Streamer } from '../_models/streamers';
import { SpinnerService } from '../_services/spinner.service';

// Service to get all the streams and infos
@Injectable()
export class StreamersService {
    private streamersArr = ['RockLeeSmile', 'cretetion', 'DanzNewz', 'ladymeowss',
                           'freecodecamp', 'storbeck', 'habathcx', 'Cryaotic',
                           'RobotCaleb', 'noobs2ninjas', 'Northernlion', 'vihart',
                           'GamesDoneQuick', 'LilyPichu', 'sp00nerism', 'Cirno_TV',
                            'riotgames', 'esl_csgo', 'imaqtpie', 'gosu', 'michaelvhenderson'];
    private streamersIds: Array<Number> = [];

    private urlUsers     = `https://api.twitch.tv/v5/users?login=${this.streamersArr.join(',')}`;
    private urlStreams   = `https://api.twitch.tv/v5/streams?channel=`;
    private apiKey       = `xdjosvpjf9brwzbkpo37r4ztjogo57`;
    private httpHeaders  = new HttpHeaders()
                            .set('Client-ID', `${this.apiKey}`)
                            .set('Accept', 'application/vnd.twitchtv.v5+json');

    public timerSub: Subscription;
    public streamersList = <BehaviorSubject<Streamer[]>> new BehaviorSubject(null);

    constructor(
        private http: HttpClient,
        private spinnerService: SpinnerService
    ) { }
    // 1. The first request gets all the users and creates an array of channel IDs
    // 2. .switchMap merges the previous call with the next one
    // 3. The next request gets stream info (if any)
    // 4. Results are cast to the Streamer class
    public getStreamers(): Observable<Streamer[]> {
        // Show loading spinner
        this.spinnerService.isLoading(true);

        return this.http.get(this.urlUsers, { headers: this.httpHeaders })
        .retryWhen(errors => errors.delay(3000).take(10))
        .switchMap((userArr: any[]) => {
            if (this.streamersIds.length !== this.streamersArr.length) {
                userArr['users'].map((user: any) => {
                    this.streamersIds.push(user._id);
                });
            }
            return this.http.get(this.urlStreams + this.streamersIds.join(','), { headers: this.httpHeaders })
            .retryWhen(errors => errors.delay(3000).take(10))
            .map((liveArr: any[]) => {
                return userArr['users'].map((user: any) => {
                        liveArr['streams'].map((live: any) => {
                            if (live.channel._id === Number(user._id)) {
                                user.online     = true;
                                user.gamename   = live.game;
                                user.viewers    = live.viewers;
                                user.uptime     = live.created_at;
                            }
                        });
                    return new Streamer(user);
                });
            });
        }).map((data: any[]) => {
            // Update Behaviour Subject's data
            this.streamersList.next(data);
            // Hide loading spinner
            this.spinnerService.isLoading(false);
            // Sort streamers for online status, number of viewers and alphabetically
            return data.sort((a, b) => b.status.value - a.status.value || b.viewers - a.viewers || a.name.localeCompare(b.name));
        });
    }
    // Refresh streamers' list manually
    public refreshStreamersList() {
        this.pollStreamers(0);
    }
    // Polling of streamers' list
    public pollStreamers(interval: number) {
        // Avoid multiple requests. If one is going, abort all others.
        if (this.timerSub) {
            this.timerSub.unsubscribe();
        }
        this.timerSub = Observable.timer(interval, interval).switchMap(() => this.getStreamers()).subscribe();
    }
    // Errors Handling
    private handleError(error: any): Observable<any> {
        console.error('An error occurred', error);
        return Observable.throw(error.message || error);
    }
}
