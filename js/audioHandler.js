let masterVolume = 0.6;

function audioUpdate(){
setTimeout(function(){
    SM.update()
    audioUpdate();
}, 60)
}

audioUpdate();

let audioPath = './assets/sound/'
createjs.Sound.initializeDefaultPlugins();
createjs.Sound.on("fileload", this.loadHandler, this);

let musicTracks2 = [
createjs.Sound.registerSound(audioPath + "map.mp3", "map"),
createjs.Sound.registerSound(audioPath + "easy.mp3", "easy"),
createjs.Sound.registerSound(audioPath + "medium.mp3", "medium"),
createjs.Sound.registerSound(audioPath + "hard.mp3", "hard"),
createjs.Sound.registerSound(audioPath + "boss1.mp3", "boss1"),
createjs.Sound.registerSound(audioPath + "boss2.mp3", "boss2"),
createjs.Sound.registerSound(audioPath + "endbattle.mp3", "endbattle"),
createjs.Sound.registerSound(audioPath + "returnbonfire.mp3", "returnbonfire")
]

function loadHandler(event) {
    // This is fired for each sound that is registered.
    console.log('completed loading ' + event)  // play using id.  Could also use full sourcepath or event.src.
}

let musicTracks = {


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
    "enableweapon": new Howl({
        src: ['./assets/sound/readyweapon.wav'],
        autoplay: false,
        loop: false,
        volume: masterVolume,
        buffer: true
    }),
    "disableweapon": new Howl({
        src: ['./assets/sound/disableweapon.wav'],
        autoplay: false,
        loop: false,
        volume: masterVolume,
        buffer: true
    }),
}

let musicList = ["map", "easy", "medium", "hard", "boss1", "boss2", "endbattle", "returnbonfire"]

function fadeOutAll(key) {
    console.log(createjs.Sound)
    musicList.forEach(song => {
        if (song !== key) {
            console.log(song + " fading")
            //musicTracks[song].fade(masterVolume, 0, 1000);
            SM.stopMusic(song, 500)
        } else {

            //musicTracks[song].volume(masterVolume);
        }
    })

}

function fadeSong(endVol, time){

}

function playMusic(key) {
    console.log(key)
    fadeOutAll(key);
    setTimeout(function(){
        console.log('playing ' + key)
        var currentPlaying = SM.playMusic(key, -1, 1)
       // currentPlaying.volume = masterVolume;
    }, 1000)
}

function playSFX(key){
    musicTracks[key].play();
}

function soundControl(){

    let volume = createjs.Sound.muted;
    console.log(volume)
    if (volume === false){

        createjs.Sound.muted = true;
    }
    if (volume === true){

        createjs.Sound.muted = false;
    }
    updateReadout();
}

var SM = (function(){
    var musics = {};
    /**
     * CreateJS Sound Manager
     * @returns {null}
     */
    function SM(){
        throw new Error("This class can't be instantiated");
        return null;
    }
    
    /**
     * Play music. This is only for playing musics. Use SM.playSound to play sound effects
     * @static
     * @param {String} id
     * @param {Number} repeat Number of times to repeat,0-once,-1-loop @default 0
     * @param {Number} fadeIn Number of milliseconds to fade in
     * @returns {void}
     */
    SM.playMusic = function(id,repeat,fadeIn){
        if(musics[id] && musics[id].playing){
            return;
        }
        repeat = repeat||0;
        fadeIn = (!fadeIn)?0:fadeIn;
        var instance = createjs.Sound.play(id);
        instance.volume = (fadeIn!==0)?0:1;
        var o = {
            instance    : instance,
            playing     : true,
            repeat      : (repeat>=0)?repeat:0,
            loop        : (repeat===-1)?true:false,
            fadeStep    : 1000/(60*fadeIn),
            fadeType    : "FADE_IN"
        };
        musics[id] = o;
        console.log(musics)
        instance.addEventListener("complete",function(){
            SM.musicComplete(o);
        });
    };
    SM.update = function(){
        for(var id in musics){
            var o = musics[id];
            if(o.playing){
                if(o.fadeType === "FADE_IN"){
                    if (o.fadeStep === "NaN"){
                        o.fadeStep = 0;
                    }
                    o.instance.volume += o.fadeStep;
                    if(o.instance.volume >= 1){
                        o.instance.volume = 1;
                    }
                }else{
                    if (o.fadeStep === "NaN"){
                        o.fadeStep = 0;
                    }
                    o.instance.volume -= o.fadeStep;
                    if(o.instance.volume <= 0){
                        o.instance.volume = 0;
                        SM.stopMusic(id);
                    }
                }
            }
        }
    };
   SM.musicComplete = function(o){
        o.playing = false;
        o.repeat -= 1;
        if(o.loop===true){
            o.instance.play();
            o.playing = true;
        }else if(o.repeat>0){
            o.instance.play();
            o.playing = true;
        }
    };
    /**
     * Stop a playing music
     * @static
     * @param {String} id
     * @param {Number}  fadeOut Number of milliseconds to fadeOut
     * @returns {void}
     */
    SM.stopMusic = function(id,fadeOut){
        var o = musics[id];
        if (o !== undefined){
            fadeOut = (!fadeOut)?0:fadeOut;
            if(o && o.playing){
                o.fadeType = "FADE_OUT";
                o.fadeStep = ((o.instance.volume*1000)/(60*fadeOut)).toFixed(2);

                if (o.instance.volume === 0){
                    console.log('ended')
                    o.playing = false;
                }
            }
        }
    };
    /**
     * Play a sound. Use this only to play a sound effect. If it is music, use CSM.playMusic instead
     * @param {String} id
     * @returns {void}
     */
    SM.playSound = function(id){
        createjs.Sound.play(id);
    };
    /**
     * Stop a sound
     * @param {String} id
     * @returns {void}
     */
    SM.stopSound = function(id){
        createjs.Sound.stop(id);
    };
 /**
     * Stop playing all sounds
     * @param {type} fadeOut
     * @returns {void}
     */
    SM.stopAllMusics = function(fadeOut){
        for(var id in musics){
            SM.stopMusic(id,fadeOut);
        }
    };
    return SM;
})();