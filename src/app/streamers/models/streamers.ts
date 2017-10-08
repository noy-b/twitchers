// Main streamer class
export class Streamer {
    id: Number;
    name: String;
    username: String;
    logo: String;
    status: Status;
    game: String|Boolean;
    url: String;
    viewers: String;
    uptime: String|Boolean;

    constructor(obj) {
        this.id = Number(obj._id);
        this.name = obj.name;
        this.username = obj.display_name;
        this.logo = obj.logo || 'https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_300x300.png';
        this.status = new Status(obj.online);
        this.game = obj.gamename || false;
        this.url = `https://go.twitch.tv/${obj.name}`;
        this.viewers = obj.viewers || '0';
        this.uptime = obj.uptime ? this.getUptime(new Date(), new Date(obj.uptime)) : false;
    }

    getUptime(now, then): String {
        const uptimeMs      = now - then;
        const uptimeSeconds = Math.floor(uptimeMs / 1000);
        const uptimeMinutes = Math.floor(uptimeSeconds / 60) % 60;
        const uptimeHours   = Math.floor(uptimeSeconds / 60 / 60);

        return `${uptimeHours}h:${uptimeMinutes < 10 ? '0' : ''}${uptimeMinutes}m`;
    }
}
// Status class (online\offline)
export class Status {
    value: Number;
    text: String;

    constructor(online) {
        this.value = online ? 1 : 0;
        this.text  = online ? 'online' : 'offline';
    }
}
