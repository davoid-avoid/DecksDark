function selectClassShow(){
    let title = document.getElementById('title')
    title.classList.add('hidden');

    let selector = document.getElementById('classSelect')
    selector.classList.remove('hidden');
    playSFX('levelup')
    playMusic('returnbonfire')
}

function closePopupAttack() {
    inAttack = false;
    player.currentAttack = {};
    player.currentAttackType = "";
    player.currentCardID = "";

    closePopup();
}

function updateReadout() {
    let lostDeckRed = pickHex([255, 0, 0],[255, 255, 255], (player.lostDeck.length/player.drawDeckSize))
    let readout = document.getElementById('readout');
    let discardCount = document.getElementById('discard-count');
    let lostCount = document.getElementById('lost-count');

    discardCount.innerHTML = player.discardDeck.length;
    
    if (lostCount) {
        lostCount.innerHTML = player.lostDeck.length + ' / ' + player.drawDeckSize;
        lostCount.style = 'color: rgb(' + lostDeckRed.join() + ')';
    }

    let blockRead = ""
    if (player.block > 0) {
        blockRead = "<center><span><span class='icon icon-defend' style='float: none; display: inline-block; top: 4px; position: relative;'></span>" + player.block + "</span></center>"
    }
    let playerBlock = document.getElementById('player-block');
    if (playerBlock){
        playerBlock.innerHTML = "";
        playerBlock.innerHTML += blockRead;
    }

    let attackRead = ""
    if (Object.keys(player.currentAttack).length > 0) {
        attackRead = "<center><span><span class='icon icon-attack' style='float: none; display: inline-block; top: 4px; position: relative;'></span>" + player.currentAttack.damage + "</span><span class='icon icon-" + player.currentAttackType + "' style='float: none; display: inline-block; top: 4px; margin-left: 8px; position: relative;'></span></center>"
    }
    let playerAttack = document.getElementById('player-attack');
    if (playerAttack){
        playerAttack.innerHTML = "";
        playerAttack.innerHTML += attackRead;
    }

    let volume = createjs.Sound.muted;
    let volumeButton = ""
    if (volume === false){
        volumeButton = '<p class="readout-button"  onClick="soundControl()"><span class="icon icon-sound-on" id="sound-control"></span>On</p><br><br>'
    } else {
        volumeButton = '<p class="readout-button"  onClick="soundControl()"><span class="icon icon-sound-off" id="sound-control"></span>Off</p><br><br>'
    }

    readout.innerHTML = '<p class="readout-button" onClick="popupDeck(\'treasure\')"><span class="icon icon-treasure"></span>' + player.treasure.cards.length + '<br><br><span class="icon icon-souls"></span><span id="heldSouls">' + player.treasure.souls + ' </span></p>' + volumeButton;

    let powerButton = document.getElementById('specialPower');

    if (player.power === true){
        powerButton.classList.remove('disabled-button');
        powerButton.innerHTML = "Special Power: " + player.specPower;
    } else {
        powerButton.classList.add('disabled-button');
        powerButton.innerHTML = "Rest at Bonfire to Regain Special Power";
    }
}

function pickHex(color1, color2, weight) {
    var w1 = weight;
    var w2 = 1 - w1;
    var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
        Math.round(color1[1] * w1 + color2[1] * w2),
        Math.round(color1[2] * w1 + color2[2] * w2)];
    return rgb;
}

function popupDeck(targetDeck){
    let popUpContainer = document.getElementById('modal-container');
    popUpContainer.classList.remove('hidden');
    let popUp = document.getElementById('modal-content');
    popUp.innerHTML = "";

    let deckType = "";
    if (targetDeck === "drawDeck"){
        deckType = "Draw Deck (random order)";
    } else if (targetDeck === "discardDeck"){
        deckType = "Discard Deck";
    } else if (targetDeck === "lostDeck"){
        deckType = "Lost Cards"
    } else if (targetDeck === "treasure"){
        deckType = "Held Treasure"
    }

    let drawClone = [];
    if (targetDeck === 'drawDeck'){
        drawClone = player.drawDeck.slice();
        shuffle(drawClone)
        console.log(drawClone)
    }

    popUp.innerHTML += "<h2>" + deckType + "</h2>"
    popUp.innerHTML += "<div id='card-row' class='popup-row'></div>";

    if (targetDeck !== 'drawDeck' && targetDeck !== 'treasure'){
        console.log(player[targetDeck]);
        player[targetDeck].forEach((card, index) => {
            renderCardPopup(card, 'card-row')
        })
    } else if (targetDeck !== 'treasure') {
        drawClone.forEach((card, index) => {
            renderCardPopup(card, 'card-row')
        })
    } else {
        if (player.treasure.cards.length > 0){
            player.treasure.cards.forEach((card, index) => {
                renderCardPopup(card, 'card-row')
            })
        } else {
            popUp.innerHTML += "<p>No Treasure Currently Held</p>";
        }

        if (player.stashDeck.length > 0){
            popUp.innerHTML += "<h2>Current Stash (Rest at Bonfire to Exchange or Add)</h2>"
            popUp.innerHTML += "<div id='card-row2' class='popup-row'></div>";
            player.stashDeck.forEach((card, index) => {
                renderCardPopup(card, 'card-row2')
            })
        }

        popUp.innerHTML += "<p>Currently held souls: <b>" + player.treasure.souls + "</b><span class='icon icon-souls-inv icon-p'></span></p>";
        popUp.innerHTML += "<p>Cost to level up: <b>" + levelCost + "</b><span class='icon icon-souls-inv icon-p'></span></p>";
        
    }

    popUp.innerHTML += "<br><br><div id='popupok' class='popup-button' onClick='closePopup()'>OK</div>";
}

function renderCardPopup(card, row) {
    console.log(row)
    let cardRow = document.getElementById(row);
    let cardAbilities = ""
    let typingSpan = getTypeSpan(card.type);
    card.abilities.forEach(ability => {
        let cost = getStamina(ability.cost);
        if (ability.type !== 'special'){
            cardAbilities += "<div class='ability-row'>" + "<span class='icon icon-" + ability.useage + "'></span><span class='icon icon-" + ability.type + "'></span>" + ability.damage + "<br><br>" + cost + "<br></div>"
        } else {
            cardAbilities += "<div class='ability-row'>" + "<span class='icon icon-" + ability.useage + "'></span>" + ability.text + "<br><br>" + cost + "<br></div>"
        }
    })

    let newCard = "<div id='card" + card.deckID + "wrapper' class='card-wrapper'><div id='card" + card.deckID + "popup' class='card-popup'><h2 class='card-title'>" + card.name + "</h2><h3>" + typingSpan + "</h3>" + cardAbilities + "</div></div>"
    cardRow.innerHTML += newCard;
}


function closePopup() {
    let popUpContainer = document.getElementById('modal-container');
    popUpContainer.classList.add('hidden');
    let popUp = document.getElementById('modal-content');
    popUp.innerHTML = "";
}

function drawStamina() {
    battleStats = document.getElementById('battle-stats');
    battleStats.innerHTML = "";

    //STR
    let strAmount = "";
    for (s = 0; s < player.stats.strength; s++) {
        if (s < player.currentStats.strength) {
            strAmount += "<div class='strengthstat stat'></div>"
        } else {
            strAmount += "<div class='spentStat stat'></div>"
        }
    }

    let STR = "<div class='playerStat'>Strength<br>" + strAmount + "</div><br>"
    battleStats.innerHTML += STR;

    //DEX
    let dexAmount = "";
    for (d = 0; d < player.stats.dexterity; d++) {
        if (d < player.currentStats.dexterity) {
            dexAmount += "<div class='dexteritystat stat'></div>"
        } else {
            dexAmount += "<div class='spentStat stat'></div>"
        }
    }

    let DEX = "<div class='playerStat'>Dexterity<br>" + dexAmount + "</div><br>"
    battleStats.innerHTML += DEX;

    //MAG
    let magAmount = "";
    for (m = 0; m < player.stats.magic; m++) {
        if (m < player.currentStats.magic) {
            magAmount += "<div class='magicstat stat'></div>"
        } else {
            magAmount += "<div class='spentStat stat'></div>"
        }
    }

    let MAG = "<div class='playerStat'>Magic<br>" + magAmount + "</div><br>"
    battleStats.innerHTML += MAG;

    //FAI
    let faiAmount = "";
    for (f = 0; f < player.stats.faith; f++) {
        if (f < player.currentStats.faith) {
            faiAmount += "<div class='faithstat stat'></div>"
        } else {
            faiAmount += "<div class='spentStat stat'></div>"
        }
    }

    let FAI = "<div class='playerStat'>Faith<br>" + faiAmount + "</div><br>"
    battleStats.innerHTML += FAI;
    
    let CARDS = '<div class="readout-button playerStat" onClick="popupDeck(\'drawDeck\')"><span class="icon icon-drawdeck"></span>' + parseInt(player.drawDeck.length) + ' / ' + player.deckSize + '</div>'
    battleStats.innerHTML += CARDS;
}


