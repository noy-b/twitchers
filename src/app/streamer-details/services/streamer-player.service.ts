import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, Subscription } from 'rxjs/Rx';

// Service to create the Twitch player
@Injectable()
export class StreamerPlayerService {
    private options: Object = {
        width: '100%',
        height: '100%'
    };
    private twitchPlayer;
    public twitchPlayerReady: Subject<Boolean> = new BehaviorSubject<Boolean>(false);

    constructor() { }

    public createTwitchPlayer(streamerName: String) {
        this.twitchPlayer = new Twitch.Player('streamer-player', this.options);
        this.twitchPlayer.setChannel(streamerName);
        this.twitchPlayer.setMuted(false);
        this.twitchPlayer.setVolume(0.1);
    }
}
