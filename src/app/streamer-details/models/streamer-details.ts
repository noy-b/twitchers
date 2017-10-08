// Main streamer class
export class StreamerDetails {
    name: String;
    username: String;
    bio: String;
    status: String;
    views: Number;
    logo: String;
    profile_banner: String;
    has_banner: Boolean;
    video_banner: String;
    url: String;
    online: Online|Boolean;

    constructor(live, channel) {
        this.name = channel.name;
        this.username = channel.display_name;
        this.bio = channel.description || `No biography found for ${this.username}! :(`;
        this.status = channel.status  || false;
        this.views = channel.views;
        this.logo = channel.logo || 'https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_300x300.png';
        this.profile_banner = channel.profile_banner || 'https://web-cdn.ttvnw.net/images/xarth/bg_glitch_pattern.png';
        this.has_banner = channel.profile_banner || false;
        this.video_banner = channel.video_banner || false;
        this.url = `https://go.twitch.tv/${this.name}`;
        this.online = live.stream ? new Online(live.stream) : false;
    }
}
// Online class
export class Online {
    game: Game;
    player_url: String;
    viewers: Number;
    uptime: String;

    constructor(live) {
        this.game = new Game(live.game, live.game_box);
        this.player_url = `http://player.twitch.tv/?channel=${live.channel.name}&muted=true`;
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
