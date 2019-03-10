let masterVolume = 0.6;

function audioUpdate() {
    setTimeout(function () {
        SM.update()
        audioUpdate();
    }, 60)
}

audioUpdate();

let audioPath = './assets/sound/'
createjs.Sound.initializeDefaultPlugins();
//createjs.Sound.on("fileload", this.loadHandler, this);

var queue = "";

document.addEventListener('DOMContentLoaded', function () {
    var queue = new createjs.LoadQueue();
    queue.installPlugin(createjs.Sound);
    queue.on("fileload", handleFileLoad);
    queue.on('progress', handleProgress);
    queue.on("complete", handleComplete);


    queue.loadManifest([
        { id: "map", src: audioPath + "map.mp3" },
        { id: "easy", src: audioPath + "easy.mp3" },
        { id: "medium", src: audioPath + "medium.mp3" },
        { id: "hard", src: audioPath + "hard.mp3" },
        { id: "boss1", src: audioPath + "boss1.mp3" },
        { id: "boss2", src: audioPath + "boss2.mp3" },
        { id: "endbattle", src: audioPath + "endbattle.mp3" },
        { id: "returnbonfire", src: audioPath + "returnbonfire.mp3" },

        { id: "hit", src: audioPath + "hit.wav" },
        { id: "kill", src: audioPath + "kill.wav" },
        { id: "shield", src: audioPath + "shield.wav" },
        { id: "heal", src: audioPath + "heal.wav" },
        { id: "special", src: audioPath + "special.wav" },
        { id: "endturn", src: audioPath + "endturn.wav" },
        { id: "discard", src: audioPath + "discard.wav" },
        { id: "nodamage", src: audioPath + "nodamage.wav" },
        { id: "death", src: audioPath + "death.wav" },
        { id: "levelup", src: audioPath + "levelup.wav" },
        { id: "bonfire", src: audioPath + "bonfire.wav" },
        { id: "enableweapon", src: audioPath + "readyweapon.wav" },
        { id: "disableweapon", src: audioPath + "disableweapon.wav" },

        { id: "character-sheet", src: "./assets/enemies/character-strip.png" },
        { id: "bonfire-sheet", src: "./assets/bonfire/bonfire-sheet.png" },
        { id: "icon-sheet", src: "./assets/icons/icon-sheet.png" },
        { id: "map-sprite-sheet", src: "./assets/maps/map-sprite-sheet.png" },
        { id: "map1", src: "./assets/maps/map1.png" },
        { id: "map2", src: "./assets/maps/map2.png" },
        { id: "map3", src: "./assets/maps/map3.png" },
        { id: "completed", src: "./assets/maps/completed.png" },
        { id: "title-screen", src: "./assets/icons/title.png" },
    ]);

});

function handleFileLoad(event) {
    console.log('loaded ' + event.item.id + " " + event.item.src + " " + event.item.type)
}

function handleProgress(event) {
    let progress = Math.round(event.loaded * 100);
    console.log(progress);
    let loadingBar = document.getElementById('load-bar-inner');
    loadingBar.style.width = progress + "%";
}

function handleComplete(event) {
    console.log('all loaded')

    let loading = document.getElementById('loading');
    let title = document.getElementById('title');

    title.classList.remove('hidden');
    loading.classList.add('hidden')
}



let musicList = ["map", "easy", "medium", "hard", "boss1", "boss2", "endbattle", "returnbonfire"]

function fadeOutAll(key) {
    musicList.forEach(song => {
        if (song !== key) {
            SM.stopMusic(song, 100)
            setTimeout(function () {
                SM.stopMusic(song, 100)
            }, 605)
        }
    })

}

function playMusic(key) {
    fadeOutAll(key);
    setTimeout(function () {
        var currentPlaying = SM.playMusic(key, -1, 1)
    }, 500)
}

function playSFX(key) {
    SM.playSound(key)
}

function soundControl() {

    let volume = createjs.Sound.muted;
    if (volume === false) {
        createjs.Sound.muted = true;
    }
    if (volume === true) {
        createjs.Sound.muted = false;
    }
    updateReadout();
}

var SM = (function () {
    var musics = {};
    /**
     * CreateJS Sound Manager
     * @returns {null}
     */
    function SM() {
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
    SM.playMusic = function (id, repeat, fadeIn) {
        if (musics[id] && musics[id].playing) {
            return;
        }
        repeat = repeat || 0;
        fadeIn = (!fadeIn) ? 0 : fadeIn;
        var instance = createjs.Sound.play(id);
        instance.volume = (fadeIn !== 0) ? 0 : masterVolume;
        var o = {
            instance: instance,
            playing: true,
            repeat: (repeat >= 0) ? repeat : 0,
            loop: (repeat === -1) ? true : false,
            fadeStep: 1000 / (60 * fadeIn),
            fadeType: "FADE_IN"
        };
        musics[id] = o;
        instance.addEventListener("complete", function () {
            SM.musicComplete(o);
        });
    };
    SM.update = function () {
        for (var id in musics) {
            var o = musics[id];
            if (o.playing) {
                if (o.fadeType === "FADE_IN") {
                    if (o.fadeStep === "NaN") {
                        o.fadeStep = 0;
                    }
                    o.instance.volume += o.fadeStep;
                    if (o.instance.volume >= masterVolume) {
                        o.instance.volume = masterVolume;
                    }
                } else {
                    if (o.fadeStep === "NaN") {
                        o.fadeStep = 0;
                    }
                    o.instance.volume -= o.fadeStep;
                    if (o.instance.volume <= 0) {
                        o.instance.volume = 0;
                        SM.stopMusic(id);
                    }
                }
            }
        }
    };
    SM.musicComplete = function (o) {
        o.playing = false;
        o.repeat -= 1;
        if (o.loop === true) {
            o.instance.play();
            o.playing = true;
        } else if (o.repeat > 0) {
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
    SM.stopMusic = function (id, fadeOut) {
        var o = musics[id];
        if (o !== undefined) {
            fadeOut = (!fadeOut) ? 0 : fadeOut;
            if (o && o.playing) {
                o.fadeType = "FADE_OUT";
                o.fadeStep = ((o.instance.volume * 1000) / (60 * fadeOut)).toFixed(2);

                if (o.instance.volume === 0) {
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
    SM.playSound = function (id) {
        createjs.Sound.play(id);
    };
    /**
     * Stop a sound
     * @param {String} id
     * @returns {void}
     */
    SM.stopSound = function (id) {
        createjs.Sound.stop(id);
    };
    /**
        * Stop playing all sounds
        * @param {type} fadeOut
        * @returns {void}
        */
    SM.stopAllMusics = function (fadeOut) {
        for (var id in musics) {
            SM.stopMusic(id, fadeOut);
        }
    };
    return SM;
})();