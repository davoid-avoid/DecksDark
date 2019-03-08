let masterVolume = 0.6;

let musicTracks = {
    "map": new Howl({
        src: ['./assets/sound/map.mp3'],
        autoplay: false,
        loop: true,
        volume: masterVolume,
        buffer: true
    }),
    "easy": new Howl({
        src: ['./assets/sound/easy.mp3'],
        autoplay: false,
        loop: true,
        volume: masterVolume,
        buffer: true
    }),
    "medium": new Howl({
        src: ['./assets/sound/medium.mp3'],
        autoplay: false,
        loop: true,
        volume: masterVolume,
        buffer: true
    }),
    "hard": new Howl({
        src: ['./assets/sound/hard.mp3'],
        autoplay: false,
        loop: true,
        volume: masterVolume,
        buffer: true
    }),
    "boss1": new Howl({
        src: ['./assets/sound/boss1.mp3'],
        autoplay: false,
        loop: true,
        volume: masterVolume,
        buffer: true
    }),
    "boss2": new Howl({
        src: ['./assets/sound/boss2.mp3'],
        autoplay: false,
        loop: true,
        volume: masterVolume,
        buffer: true
    }),
    "endbattle": new Howl({
        src: ['./assets/sound/endbattle.mp3'],
        autoplay: false,
        loop: true,
        volume: masterVolume,
        buffer: true
    }),
    "returnbonfire": new Howl({
        src: ['./assets/sound/returnbonfire.mp3'],
        autoplay: false,
        loop: true,
        volume: masterVolume,
        buffer: true
    }),

    //sfx

    "hit": new Howl({
        src: ['./assets/sound/hit.wav'],
        autoplay: false,
        loop: false,
        volume: masterVolume,
        buffer: true
    }),
    "kill": new Howl({
        src: ['./assets/sound/kill.wav'],
        autoplay: false,
        loop: false,
        volume: masterVolume,
        buffer: true
    }),
    "shield": new Howl({
        src: ['./assets/sound/shield.wav'],
        autoplay: false,
        loop: false,
        volume: masterVolume,
        buffer: true
    }),
    "heal": new Howl({
        src: ['./assets/sound/heal.wav'],
        autoplay: false,
        loop: false,
        volume: masterVolume,
        buffer: true
    }),
    "special": new Howl({
        src: ['./assets/sound/special.wav'],
        autoplay: false,
        loop: false,
        volume: masterVolume,
        buffer: true
    }),
    "endturn": new Howl({
        src: ['./assets/sound/endturn.wav'],
        autoplay: false,
        loop: false,
        volume: masterVolume,
        buffer: true
    }),
    "discard": new Howl({
        src: ['./assets/sound/discard.wav'],
        autoplay: false,
        loop: false,
        volume: masterVolume,
        buffer: true
    }),
    "nodamage": new Howl({
        src: ['./assets/sound/nodamage.wav'],
        autoplay: false,
        loop: false,
        volume: masterVolume,
        buffer: true
    }),
    "death": new Howl({
        src: ['./assets/sound/death.wav'],
        autoplay: false,
        loop: false,
        volume: masterVolume,
        buffer: true
    }),
    "levelup": new Howl({
        src: ['./assets/sound/levelup.wav'],
        autoplay: false,
        loop: false,
        volume: masterVolume,
        buffer: true
    }),
    "bonfire": new Howl({
        src: ['./assets/sound/bonfire.wav'],
        autoplay: false,
        loop: false,
        volume: masterVolume,
        buffer: true
    }),
}

let musicList = ["map", "easy", "medium", "hard", "boss1", "boss2", "endbattle", "returnbonfire"]

function fadeOutAll(key) {
    musicList.forEach(song => {
        if (song !== key) {
            console.log(song + " fading")
            musicTracks[song].fade(masterVolume, 0, 1000);
            setTimeout(function(){
                musicTracks[song].stop();
            }, 1005)
        } else {

            musicTracks[song].volume(masterVolume);
        }
    })

}

function playMusic(key) {
    console.log(key)
    fadeOutAll(key);
    setTimeout(function(){
        console.log('playing ' + key)
        musicTracks[key].play()
    }, 1005)
}

function playSFX(key){
    musicTracks[key].play();
}