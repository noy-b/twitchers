// Main streamer class
export class StreamerDetails {
    name: String;
    username: String;
    bio: String;
    creation: Creation;
    status: String;
    views: Views;
    logo: String;
    images: Images;
    player_url: String;
    chat_url: String;
    url: String;
    online: Online|Boolean;

    constructor(live, channel) {
        this.name = channel.name;
        this.username = channel.display_name;
        this.bio = channel.description || `No biography found for ${this.username}! :(`;
        this.creation = new Creation(channel.created_at);
        this.status = channel.status  || false;
        this.views = new Views(channel.views);
        this.images = new Images(channel.logo, channel.profile_banner);
        this.player_url = `https://player.twitch.tv/?channel=${this.name}&autoplay=false`;
        this.chat_url = `https://www.twitch.tv/${this.name}/chat`;
        this.url = `https://go.twitch.tv/${this.name}`;
        this.online = live.stream ? new Online(live.stream) : false;
    }
}
export class Creation {
    value: String;

    constructor(date) {
        this.value = new Date(date).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }
}
export class Views {
    value: String;

    constructor(views) {
        this.value = views.toLocaleString('en-US');
    }
}
export class Images {
    logo: String;
    profile: String|Boolean;

    constructor(profileLogo, profileBanner) {
        this.logo = profileLogo || 'https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_300x300.png';
        this.profile = profileBanner ?
            `url(${profileBanner}) center / cover no-repeat` :
            `url(https://web-cdn.ttvnw.net/images/xarth/bg_glitch_pattern.png) top / auto repeat`;
    }
}
// Online class
export class Online {
    game: Game;
    viewers: Number;
    uptime: String;

    constructor(live) {
        this.game = new Game(live.game, live.game_box);
        this.viewers = live.viewers;
        this.uptime = this.getUptime(new Date(), new Date(live.created_at));
    }
    private getUptime(now, then): String {
        const uptimeMs      = now - then;
        const uptimeSeconds = Math.floor(uptimeMs / 1000);
        const uptimeMinutes = Math.floor(uptimeSeconds / 60) % 60;
        const uptimeHours   = Math.floor(uptimeSeconds / 60 / 60);

        return `${uptimeHours}h:${uptimeMinutes < 10 ? '0' : ''}${uptimeMinutes}m`;
    }
}
// Game class (name\cover)
export class Game {
    name: String;
    cover: String;

    constructor(game, cover) {
        this.name = game;
        this.cover = cover || 'https://static-cdn.jtvnw.net/ttv-static/404_boxart.jpg';
    }
}
