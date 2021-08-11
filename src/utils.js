function pad(num) {
    return `0${num}`.slice(-2);
}

export function mmss(durationAsSeconds) {
    const durationAsMinutes = Math.floor(durationAsSeconds / 60);
    const seconds = Math.floor(durationAsSeconds) % 60;
    const minutes = durationAsMinutes % 60;
    const formattedMins = minutes > 99 ? minutes : pad(minutes);
    return `${formattedMins}:${pad(seconds)}`;
}

export function getPersistedTimestamp(){
    const persisted = window.localStorage.getItem('ts');
    const [start] = JSON.parse(persisted);
    return Number(start);
}
