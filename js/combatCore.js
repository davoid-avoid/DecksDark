let practiceEnemies = ['easy', 'easy', 'easy']
let currentEnemies = [];

let inAttack = false;
let currentLoc = {};

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function copyObj(src) {
    return Object.assign({}, src);
}

function getMapRoom(name) {
    map.locations.forEach(loc => {
        if (loc.name === name) {
            currentLoc = loc;
        }
    })
}

function startBattle(roomName) {
    getMapRoom(roomName);

    let mapScreen = document.getElementById('map-screen');
    mapScreen.classList.add('hidden')

    closePopup();

    let tableau = document.getElementById('tableau');
    tableau.classList.remove('hidden')
    let enemies = document.getElementById('enemies');
    enemies.classList.remove('hidden')
    let generalUI = document.getElementById('ui-elements');
    generalUI.classList.remove('hidden')
    let battleUI = document.getElementById('battle-ui');
    battleUI.classList.remove('hidden')

    if (currentLoc.difficulty !== 'boss1' & currentLoc.difficulty !== 'boss2') {
        currentEnemies = getEnemies(currentLoc.room.content);
    } else {

        //prepare boss

        currentEnemies = [];
        currentLoc.room.boss.forEach((boss, index) => {
            currentEnemies.push(currentLoc.room.boss[index])
            shuffle(currentEnemies[index].cardList);
            currentEnemies[index].moveNum = 0;
            currentEnemies[index].hp = currentEnemies[index].maxHP;
            currentEnemies[index].currHP = currentEnemies[index].hp;
            currentEnemies[index].enemyType = 'boss'
            currentEnemies[index].enemyID = index;
            getBossMove();
        })
    }
    renderEnemies(currentEnemies);
    drawHand();
    renderPlayer();
    updateReadout();

    playMusic(currentLoc.difficulty)
}

function getBossMove() {
    currentEnemies.forEach((enemy, index) => {
        if (enemy.enemyType === 'boss') {
            currentEnemies[index].attack = currentEnemies[index].cardList[currentEnemies[index].moveNum].attack;
            currentEnemies[index].shield = currentEnemies[index].cardList[currentEnemies[index].moveNum].shield;
            currentEnemies[index].weakness = currentEnemies[index].cardList[currentEnemies[index].moveNum].weakness;
        }
    })

}

function renderPlayer() {
    let characterEl = document.getElementById('battle-character')
    characterCard = "<div class='enemies'><div id='battle-stats'></div><div id='player-attack'></div><div id='player-block'></div><div class='character-image character-image-" + player.class + "'><div class='readout-button lost' onClick='popupDeck(\"lostDeck\")'><span class='icon icon-lost'></span><span id='lost-count'>" + player.lostDeck.length + " / " + player.drawDeckSize + "</span></div></div>"
    characterEl.innerHTML = "";
    characterEl.innerHTML += characterCard;
    drawStamina();
}

function getEnemies(difficultyArray) {
    let enemiesReturn = [];

    difficultyArray.forEach((enemy, index) => {
        var randomNumber = Math.floor(Math.random() * enemiesList[enemy].length);
        let enemyInstance = copyObj(enemiesList[enemy][randomNumber])
        enemyInstance.currHP = enemyInstance.hp;
        enemyInstance.enemyType = 'normal';
        enemyInstance.enemyID = index;
        enemiesReturn.push(enemyInstance)
    })

    return enemiesReturn;
}

function renderEnemies(enemies) {
    let enemiesEl = document.getElementById('enemies');
    enemiesEl.innerHTML = "";

    enemies.forEach((enemy, index) => {
        let healthbar = "<div class='enemyHP-outer'><div class='enemyHP-inner' style='width: " + ((enemy.hp / enemy.currHP) * 100) + "%'></div></div>"
        let newEnemy = "<div onClick='attackEnemy(" + JSON.stringify(enemy) + ", " + index + ")' id='enemy" + index + "' class='card flipped enemies'><h2>" + enemy.name + "</h2><br>" + healthbar + "<p><span class='icon icon-health'></span>" + enemy.hp + "</p><p><span class='icon icon-defend'></span><span style='float: left'>" + enemy.shield + " </span><span class='icon icon-" + enemy.weakness + "' style='margin-left: 5px'></span></p><br><p><span class='icon icon-attack'></span>" + enemy.attack + "</p><br><div class='enemy-image enemy-image-" + enemy.image + "'></div></div>";
        enemiesEl.innerHTML += newEnemy;

        setTimeout(function () {
            let enemyEl = document.getElementById("enemy" + index);
            enemyEl.classList.remove('flipped');
        }, 1)
    })
}

function drawHand() {
    for (i = player.hand.length; i < player.handSize; i++) {
        if (player.drawDeck.length > 0) {
            player.hand.push(player.drawDeck[0]);
            player.drawDeck.splice(0, 1);
        }
    }
    let handEl = document.getElementById('cardHand');
    handEl.innerHTML = "";
    player.hand.forEach(card => {
        renderCard(card)
    })
}

function renderCard(card) {
    let handEl = document.getElementById('cardHand');
    let cardAbilities = ""
    let typing = getType(card.type);
    let typingSpan = getTypeSpan(card.type);
    card.abilities.forEach(ability => {
        let cost = getStamina(ability.cost);
        if (ability.type !== 'special') {
            cardAbilities += "<div class='ability' onClick='useAbility(" + JSON.stringify(ability) + ", " + card.deckID + ", " + JSON.stringify(typing) + ", " + JSON.stringify(card.name) + ", this)'>" + " <span class='icon icon-" + ability.useage + "'></span> <span class='icon icon-" + ability.type + "'></span> " + ability.damage + "<br><br>" + cost + "<br></div>"
        } else {
            cardAbilities += "<div class='ability' onClick='useAbility(" + JSON.stringify(ability) + ", " + card.deckID + ", " + JSON.stringify(typing) + ", " + JSON.stringify(card.name) + ")'>" + " <span class='icon icon-" + ability.useage + "'></span>" + ability.text + "<br><br>" + cost + "<br></div>"
        }
    })

    let newCard = "<div id='card" + card.deckID + "' class='card flipped'><h2 class='card-title'>" + card.name + "</h2><h3>" + typingSpan + "</h3>" + cardAbilities + "<div class='discard ability' onClick='discardCard(" + card.deckID + ", \"board\")'><span class='icon icon-discard'></span></div></div>"
    handEl.innerHTML += newCard;

    setTimeout(function () {
        let cardEl = document.getElementById("card" + card.deckID);
        cardEl.classList.remove('flipped');
    }, 1)

}

function renderCardNoFlip(card) {
    let handEl = document.getElementById('cardHand');
    let cardAbilities = ""
    let typing = getType(card.type);
    let typingSpan = getTypeSpan(card.type);
    card.abilities.forEach(ability => {
        let cost = getStamina(ability.cost);
        if (ability.type !== 'special') {
            cardAbilities += "<div class='ability' onClick='useAbility(" + JSON.stringify(ability) + ", " + card.deckID + ", " + JSON.stringify(typing) + ", " + JSON.stringify(card.name) + ", this)'>" + " <span class='icon icon-" + ability.useage + "'></span> <span class='icon icon-" + ability.type + "'></span> " + ability.damage + "<br><br>" + cost + "<br></div>"
        } else {
            cardAbilities += "<div class='ability' onClick='useAbility(" + JSON.stringify(ability) + ", " + card.deckID + ", " + JSON.stringify(typing) + ", " + JSON.stringify(card.name) + ", this)'>" + " <span class='icon icon-" + ability.useage + "'></span>" + ability.text + "<br><br>" + cost + "<br></div>"
        }
    })

    let newCard = "<div id='card" + card.deckID + "' class='card'><h2 class='card-title'>" + card.name + "</h2><h3>" + typingSpan + "</h3>" + cardAbilities + "<div class='discard ability' onClick='discardCard(" + card.deckID + ")'><span class='icon icon-discard'></span></div></div>"
    handEl.innerHTML += newCard;
}

function renderCardDiscard(card) {
    let cardRow = document.getElementById('card-row');
    let cardAbilities = ""
    let typing = getType(card.type);
    let typingSpan = getTypeSpan(card.type);
    card.abilities.forEach(ability => {
        let cost = getStamina(ability.cost);
        if (ability.type !== 'special') {
            cardAbilities += "<div class='ability-row'>" + "<span class='icon icon-" + ability.useage + "'></span> <span class='icon icon-" + ability.type + "'></span> " + ability.damage + "<br><br>" + cost + "<br></div>"
        } else {
            cardAbilities += "<div class='ability-row'>" + "<span class='icon icon-" + ability.useage + "'></span>" + ability.text + "<br><br>" + cost + "<br></div>"
        }
    })

    let newCard = "<div id='card" + card.deckID + "popup' class='card-popup' onClick='loseCardDiscard(" + card.deckID + ")'><h2 class='card-title'>" + card.name + "</h2><h3>" + typingSpan + "</h3>" + cardAbilities + "</div>"
    cardRow.innerHTML += newCard;
}

function renderCardDamage(card) {
    let cardRow = document.getElementById('card-row');
    let cardAbilities = ""
    let typingSpan = getTypeSpan(card.type);
    card.abilities.forEach(ability => {
        let cost = getStamina(ability.cost);
        if (ability.type !== 'special') {
            cardAbilities += "<div class='ability-row'>" + " <span class='icon icon-" + ability.useage + "'></span> <span class='icon icon-" + ability.type + "'></span> " + ability.damage + "<br><br>" + cost + "<br></div>"
        } else {
            cardAbilities += "<div class='ability-row'>" + " <span class='icon icon-" + ability.useage + "'></span>" + ability.text + "<br><br>" + cost + "<br></div>"
        }
    })

    let newCard = "<div id='card" + card.deckID + "popup' class='card-popup' onClick='discardDamageCard(" + card.deckID + ")'><h2 class='card-title'>" + card.name + "</h2><h3>" + typingSpan + "</h3>" + cardAbilities + "</div>"
    cardRow.innerHTML += newCard;
}

function getStamina(stat) {
    let UI = "<div class='stat-row'>";
    for (s = 0; s < stat.strength; s++) {
        UI += "<div class='strengthstat stat'></div>"
    }
    for (d = 0; d < stat.dexterity; d++) {
        UI += "<div class='dexteritystat stat'></div>"
    }
    for (m = 0; m < stat.magic; m++) {
        UI += "<div class='magicstat stat'></div>"
    }
    for (f = 0; f < stat.faith; f++) {
        UI += "<div class='faithstat stat'></div>"
    }

    UI += "</div>"

    return UI;
}

function getType(type) {
    if (type !== "defend") {
        return type;
    } else {
        return "<br>";
    }
}

function getTypeSpan(type) {
    if (type !== "defend") {
        return "<span class='icon icon-" + type + " icon-topcorner'></span><br>";
    } else {
        return "<br>";
    }
}

function useAbility(ability, cardID, type, name, selection) {
    if (!inAttack) {
        let canPay = checkCost(ability.cost)

        if (canPay) {
            if (ability.type === 'attack') {
                selection.classList.add('selected-ability')
                enemies.childNodes.forEach(enemy => {
                    enemy.classList.add('target-enemy')
                })
            }
            enactAbility(ability, type, cardID, name);
        } else {
            playSFX('discard');
            flashError("battle-stats");
        }
    } else if (ability.type === 'attack' && selection.classList.contains('selected-ability')) {
        selection.classList.remove('selected-ability');
        inAttack = false;
        player.currentAttack = {};
        player.currentAttackType = null;
        player.currentCardID = null;
        enemies.childNodes.forEach(enemy => {
            enemy.classList.remove('target-enemy')
        })
        playSFX('disableweapon')
        updateReadout()
    } else {
        playSFX('discard')
        flashError('card' + player.currentCardID)
        flashError('player-attack')
    }
}

function checkCost(cost) {
    let canPay = true;

    if (player.currentStats.strength < cost.strength) {
        canPay = false;
    }
    if (player.currentStats.dexterity < cost.dexterity) {
        canPay = false;
    }
    if (player.currentStats.magic < cost.magic) {
        canPay = false;
    }
    if (player.currentStats.faith < cost.faith) {
        canPay = false;
    }

    return canPay;
}

function reduceStamina(cost) {
    if (cost !== undefined) {
        player.currentStats.strength -= cost.strength;
        player.currentStats.dexterity -= cost.dexterity;
        player.currentStats.magic -= cost.magic;
        player.currentStats.faith -= cost.faith;
    }
}

function flashError(target) {
    let el = document.getElementById(target);
    el.classList.add('error')

    setTimeout(function () {
        el.classList.remove('error')
    }, 300)
}

function discardDamageCard(id) {
    let cardEl = document.getElementById('card' + id);
    cardEl.remove();
    player.hand.forEach((card, index) => {
        if (card.deckID === id) {
            player.discardDeck.push(player.hand[index]);
            player.hand.splice(index, 1);
        }
    })

    player.currentDamage--;
    playSFX('hit')
    if (player.currentDamage > 0) {
        discardCardDamage();
        updateReadout();
    } else {
        closePopup();
        drawHand();
        updateReadout();
    }
}

function discardDamageDrawDeck() {
    let popUp = document.getElementById('modal-content')
    popUp.innerHTML = "";
    popUp.innerHTML += "<h2>Discarding the following card from draw deck</h2>"

    if (player.currentDamage > 0) {
        popUp.innerHTML += "<br><br><h3>" + (player.currentDamage - 1) + " damage remains</h3><br><br>"
    } else {
        popUp.innerHTML += "<br><br><h3>0 damage remains</h3><br><br>"
    }

    popUp.innerHTML += "<div id='card-row' class='popup-row'></div>";
    let cardRow = document.getElementById('card-row');


    let cardAbilities = ""
    let card = player.drawDeck[0];
    let typing = getType(card.type);
    let typingSpan = getTypeSpan(card.type);
    card.abilities.forEach(ability => {
        let cost = getStamina(ability.cost);
        if (ability.type !== 'special') {
            cardAbilities += "<div class='ability-row'>" + "<span class='icon icon-" + ability.useage + "'></span><span class='icon icon-" + ability.type + "'></span>" + ability.damage + "<br><br>" + cost + "<br></div>"
        } else {
            cardAbilities += "<div class='ability-row'>" + "<span class='icon icon-" + ability.useage + "'></span>" + ability.text + "<br><br>" + cost + "<br></div>"
        }
    })


    let newCard = "<div id='card" + card.deckID + "popup' class='card-popup'><h2 class='card-title'>" + card.name + "</h2><h3>" + typingSpan + "</h3>" + cardAbilities + "</div>"
    cardRow.innerHTML += newCard;

    popUp.innerHTML += "<br><br><div id='popupok' class='popup-button' onClick='drawDeckOK()'>OK</div>";

    playSFX('hit')

}

function drawDeckOK() {
    player.discardDeck.push(player.drawDeck[0])
    player.drawDeck.splice(0, 1);
    player.currentDamage--;
    if (player.currentDamage > 0) {
        discardCardDamage();
        updateReadout();
    } else {
        closePopup();
        drawHand();
        updateReadout();
    }
}

function discardCard(id, source) {
    if (source !== 'board') {
        let cardEl = document.getElementById('card' + id);
        cardEl.remove();
        player.hand.forEach((card, index) => {
            if (card.deckID === id) {
                player.discardDeck.push(player.hand[index]);
                player.hand.splice(index, 1);
            }
        })
        if (source === 'board') {
            playSFX('discard');
        }
        drawCard();
        updateReadout();
    } else {
        if (!inAttack) {
            let cardEl = document.getElementById('card' + id);
            cardEl.remove();
            player.hand.forEach((card, index) => {
                if (card.deckID === id) {
                    player.discardDeck.push(player.hand[index]);
                    player.hand.splice(index, 1);
                }
            })
            if (source === 'board') {
                playSFX('discard');
            }
            drawCard();
            updateReadout();
        } else {
            playSFX('discard')
            flashError('card' + player.currentCardID)
            flashError('player-attack')
        }
    }
}

function loseCard(id, source) {
    let cardEl = document.getElementById('card' + id);
    if (cardEl !== null) {
        cardEl.remove();
    }

    if (source !== "discard") {
        player.hand.forEach((card, index) => {
            if (card.deckID === id) {
                player.lostDeck.push(player.hand[index]);
                player.hand.splice(index, 1);
            }
        })
        drawCard();
    } else {
        player.discardDeck.forEach((card, index) => {
            if (card.deckID === id) {
                player.lostDeck.push(player.discardDeck[index]);
                player.discardDeck.splice(index, 1);
            }
        })
    }

    if (player.lostDeck.length === player.drawDeckSize) {
        if (map.rests > 0) {
            death();
            resetStamina();
        } else {
            map.rests = -1;
            gameOver();
        }
    }
}

function drawCard() {
    if (player.drawDeck.length > 0) {
        for (i = player.hand.length; i < player.handSize; i++) {
            if (player.drawDeck.length > 0) {
                player.hand.push(player.drawDeck[0]);
                player.drawDeck.splice(0, 1);
            }
        }
        let handEl = document.getElementById('cardHand');
        renderCard(player.hand[player.hand.length - 1]);
    }
}

function endTurnPrompt() {
    if (!inAttack) {
        let popUp = document.getElementById('modal-content')
        popUp.innerHTML = "";

        popUp.innerHTML += "<h3>End Turn?</h3><br>"


        popUp.innerHTML += "<div id='popupok' class='popup-button' onClick='endTurn()'>Yes</div><br><br>";

        popUp.innerHTML += "<div id='popupok' class='popup-button' onClick='closePopup()'>No</div>";

        let popUpContainer = document.getElementById('modal-container');
        popUpContainer.classList.remove('hidden');
        playSFX('endturn');
    } else {
        playSFX('discard')
        flashError('card' + player.currentCardID)
        flashError('player-attack')
    }
}

function endTurn() {

    resetStatus();

    if (!inAttack) {
        resetStamina();
        console.log('made it to the end turn')
        enemyAttack();
    }

    if (currentLoc.difficulty === 'boss1' || currentLoc.difficulty === 'boss2') {
        currentEnemies.forEach((enemy) => {
            if (enemy.enemyType === 'boss') {
                enemy.moveNum++;
                if (enemy.moveNum > enemy.cardList.length - 1) {
                    enemy.moveNum = 0;
                }
            }
        })
        getBossMove();
        renderEnemies(currentEnemies);
    }

}

function resetStamina() {
    player.currentStats.strength = player.stats.strength;
    player.currentStats.dexterity = player.stats.dexterity;
    player.currentStats.magic = player.stats.magic;
    player.currentStats.faith = player.stats.faith;

    drawStamina();
}

function claimDiscard() {
    if (!inAttack) {
        if (player.discardDeck.length > 0) {
            let popUp = document.getElementById('modal-content')
            popUp.innerHTML = "";
            popUp.innerHTML += "<h2>Select A Card to Lose from Discard</h2>"
            popUp.innerHTML += "<div id='card-row' class='popup-row'></div>";
            let cardRow = document.getElementById('card-row');
            player.discardDeck.forEach(card => {
                renderCardDiscard(card)
            })
            if (player.currentDamage === 0) {
                popUp.innerHTML += "<br><br><div id='popupok' class='popup-button' onClick='closePopup()'>Cancel</div>";
            }
            let popUpContainer = document.getElementById('modal-container');
            popUpContainer.classList.remove('hidden');
        } else {
            if (player.lostDeck.length === player.drawDeckSize) {
                if (map.rests > 0) {
                    death();
                    resetStamina();
                } else {
                    gameOver();
                }
            }
        }
        updateReadout()
    } else {
        playSFX('discard')
        flashError('card' + player.currentCardID)
        flashError('player-attack')
    }
}

function loseCardDiscard(cardID) {
    if (player.discardDeck.length > 1 || player.hand.length > 1) {
        if (player.discardDeck.length > 0) {
            loseCard(cardID, "discard");
            closePopup();
            moveDiscardToDraw();
            updateReadout();
            playSFX('hit');
            if (player.currentDamage > 0) {
                discardCardDamage();
            }
        }
    } else {
        if (map.rests > 0) {
            death();
            resetStamina();
        } else {
            gameOver();
        }
    }
}

function moveDiscardToDraw() {
    shuffle(player.discardDeck);
    player.discardDeck.forEach((card, index) => {
        player.drawDeck.push(player.discardDeck[index]);
    })

    shuffle(player.drawDeck);

    player.discardDeck = [];

    drawHand();
}

function enemyAttack() {
    let totalDamage = 0;
    
    currentEnemies.forEach(enemy => {
        console.log(enemy)
        if (!isNaN(enemy.attack)) {
            totalDamage += enemy.attack
        }
    })
    
    currentEnemies.forEach(enemy => {
        console.log(enemy)
        if (!isNaN(enemy.attack)) {

        } else {
            if (enemy.enemyType === 'boss') {
                specialBossAttack(enemy);
            } else {
                specialEnemyAttack(enemy);
            }
        }
    })

    let finalDamage = (totalDamage - player.block);
    
    if (finalDamage < 0) {
        finalDamage = 0;
    }
    let blockNum = player.block
    player.block = 0;
    player.currentDamage = finalDamage;

    if (player.currentDamage > 0) {
        playSFX('hit')
        discardCardDamage(totalDamage, finalDamage, blockNum);
    } else {
        displayNoDamage(totalDamage, blockNum);
    }

    updateReadout()
}

function displayNoDamage(totalDamage, blockNum) {
    let popUp = document.getElementById('modal-content')
    popUp.innerHTML = "";
    popUp.innerHTML += "<h2>Enemies attack for " + totalDamage + ", which is completely blocked with a block value of " + blockNum + "</h2><br><br>"
    popUp.innerHTML += "<div id='cancelAttack' class='popup-button' onClick='closePopup()'>Ok</div>"

    let popUpContainer = document.getElementById('modal-container');
    popUpContainer.classList.remove('hidden');

    playSFX('nodamage');
}

function dropCard(ability, cardID) {
    if (ability.useage === "discard") {
        discardCard(cardID);
    } else {
        loseCard(cardID);
    }
}

function enactAbility(ability, type, cardID, name) {
    if (ability.type === "defend") {
        player.block += ability.damage;
        dropCard(ability, cardID);
        reduceStamina(ability.cost);
        drawStamina();
        playSFX('shield');
    }
    if (ability.type === "attack") {
        inAttack = true;
        player.currentAttack = ability;
        player.currentAttackType = type;
        player.currentCardID = cardID;
        playSFX('enableweapon')
    }
    if (ability.type === "heal") {
        heal(ability.damage)
        dropCard(ability, cardID);
        reduceStamina(ability.cost);
        drawStamina();
        drawHand();

    }

    if (ability.type === "special") {
        dropCard(ability, cardID);
        reduceStamina(ability.cost);
        enactSpecial(name);
        drawStamina();
    }
    updateReadout()
}

function heal(healAmount) {
    if (healAmount > 0 && player.discardDeck.length > 0) {

        player.drawDeck.push(player.discardDeck[0])

        healAmount--;
        updateReadout()

        player.discardDeck.splice(0, 1);

        heal(healAmount);
        playSFX('heal');
    }
}

function discardCardDamage(totalDamage, finalDamage, blockNum) {
    console.log(finalDamage)
    if (player.hand.length > 0 || player.drawDeck.length > 0) {
        let popUp = document.getElementById('modal-content')
        popUp.innerHTML = ""

        if (totalDamage !== undefined) {
            popUp.innerHTML += "<h3>Enemies would hit for " + totalDamage + ", with player block of " + blockNum + ", this becomes " + finalDamage + "</h3><br><br>"
        }

        popUp.innerHTML += "<h2>Select A Card to Discard for " + player.currentDamage + " remaining damage</h2><br><br>"
        popUp.innerHTML += "<div id='card-row' class='popup-row'></div>";
        let cardRow = document.getElementById('card-row');

        player.hand.forEach(card => {
            renderCardDamage(card)
        })

        popUp.innerHTML += "<div id='card-row2' class='popup-row' style='width: 100%'></div>";
        let cardRow2 = document.getElementById('card-row2');

        if (player.drawDeck.length > 0) {
            let drawDeck = "<div id='carddrawdeckpopup' class='card-popup' style='margin: 0 auto; float: none' onClick='discardDamageDrawDeck()'><h2>Random from top of drawdeck</h2><h3>" + player.drawDeck.length + " cards remain in drawdeck<h3></div>"
            cardRow2.innerHTML += drawDeck;
        }

        let popUpContainer = document.getElementById('modal-container');
        popUpContainer.classList.remove('hidden');
    } else {
        claimDiscard();
    }
}

function attackEnemy(enemy, id) {
    if (inAttack) {
        let calcDamage = player.currentAttack.damage - enemy.shield;
        if (player.currentAttackType !== enemy.weakness) {

            if (calcDamage <= 0) {
                calcDamage = 0
                playSFX('nodamage');
            }
            currentEnemies[id].hp -= calcDamage;
        } else {
            currentEnemies[id].hp -= player.currentAttack.damage;
            calcDamage = player.currentAttack.damage;
        }

        let enemyEl = document.getElementById('enemy' + id);

        if (currentEnemies[id].hp > 0) {
            let healthbar = "<div class='enemyHP-outer'><div class='enemyHP-inner' style='width: " + ((currentEnemies[id].hp / currentEnemies[id].currHP) * 100) + "%'></div></div>"
            enemyEl.innerHTML = "";
            enemyEl.innerHTML = "<h2>" + currentEnemies[id].name + "</h2><br>" + healthbar + "<p><span class='icon icon-health'></span>" + currentEnemies[id].hp + "</p><p><span class='icon icon-defend'></span><span style='float: left'>" + currentEnemies[id].shield + " / </span><span class='icon icon-" + currentEnemies[id].weakness + "' style='margin-left: 5px'></span></p><br><p><span class='icon icon-attack'></span>" + currentEnemies[id].attack + "</p><br><div class='enemy-image enemy-image-" + currentEnemies[id].image + "'></div>";
            if (calcDamage !== 0) {
                flashError('enemy' + id)
                playSFX('hit');
            }
        } else {
            currentEnemies.splice(id, 1);
            let enemiesEl = document.getElementById('enemies');
            enemiesEl.innerHTML = "";
            renderEnemies(currentEnemies)
            playSFX('kill');
        }
    }

    dropCard(player.currentAttack, player.currentCardID);
    reduceStamina(player.currentAttack.cost);
    drawStamina();

    inAttack = false;
    player.currentAttack = {};
    player.currentAttackType = "";
    player.currentCardID = "";
    updateReadout();
    enemies.childNodes.forEach(enemy => {
        enemy.classList.remove('target-enemy')
    })

    if (currentEnemies.length === 0) {
        endOfBattle();
    }

}

function endOfBattle() {
    if (player.dead === false) {
        playMusic("endbattle")
        resetStatus();
        resetStamina();
        returnHand();
        setRoomToComplete(currentLoc);
        if (currentLoc.difficulty === 'boss1' || currentLoc.difficulty === 'boss2') {

            map.bossesCompleted++;
            if (map.bossesCompleted === 2) {
                winGame();
            } else {
                if (map.rests > 0) {
                    gainBossRewards(currentLoc);
                } else {
                    showTreasureGained();
                }
            }
        } else {
            if (map.rests > 0) {
                gainRewards(currentLoc);
            } else {
                if (map.rests > -1) {
                    showTreasureGained();
                }
            }
        }

        currentLoc = {};
    }
}

function returnHand() {
    player.hand.forEach(card => {
        player.drawDeck.unshift(card);
    })
    player.hand = [];
}

function gainRewards(loc) {
    shuffle(treasureCards);
    for (i = 0; i < loc.room.treasure; i++) {
        let treasureCopy = copyObj(treasureCards[i])
        treasureCopy.abilities = [];
        treasureCards[i].abilities.forEach(ability => {
            treasureCopy.abilities.push(copyObj(ability))
        })
        player.treasure.cards.push(treasureCopy)
    }
    player.treasure.souls += loc.room.souls;
    showTreasureGained();

}

function gainBossRewards(loc) {
    shuffle(bossTreasureCards);
    for (i = 0; i < loc.room.treasure; i++) {
        let treasureCopy = copyObj(bossTreasureCards[i])
        treasureCopy.abilities = [];
        bossTreasureCards[i].abilities.forEach(ability => {
            treasureCopy.abilities.push(copyObj(ability))
        })
        player.treasure.cards.push(treasureCopy)
    }
    player.treasure.souls += loc.room.souls;
    showTreasureGained();
}

function showTreasureGained() {

    let popUp = document.getElementById('modal-content')
    popUp.innerHTML = ""
    if (map.rests > 0) {
        popUp.innerHTML += "<h2>Current Treasure and Rewards</h2>"
        popUp.innerHTML += "<div id='card-row' class='popup-row'></div>";
        player.treasure.cards.forEach((card, index) => {
            renderCardPopup(card, 'card-row')
        })
        popUp.innerHTML += "<p>Currently held souls: " + player.treasure.souls + "</p>";
    } else {
        popUp.innerHTML += "<h2>Bonfire has gone out. No more treasure or souls awarded.</h2>"
    }
    popUp.innerHTML += "<div id='popupok' class='popup-button' onClick='returnToMap()'>OK</div>";

    let popUpContainer = document.getElementById('modal-container');
    popUpContainer.classList.remove('hidden');
    player.block = 0;
    updateReadout();
}

function gameOver() {
    resetStatus();
    alert('you died!')
    closePopup();
    fadeOutAll("")
    playSFX('death')

    let tableau = document.getElementById('tableau');
    tableau.classList.add('hidden')
    let enemies = document.getElementById('enemies');
    enemies.classList.add('hidden')
    let generalUI = document.getElementById('ui-elements');
    generalUI.classList.add('hidden')
    let battleUI = document.getElementById('battle-ui');
    battleUI.classList.add('hidden')

    let selector = document.getElementById('classSelect')
    selector.classList.remove('hidden');

    let map = document.getElementById('map-screen');
    let mapInner = document.getElementById('map');
    mapInner.innerHTML = "";
    map.classList.add('hidden');

    player = {
        "class": "",
        "hand": [],
        "drawDeck": [],
        "discardDeck": [],
        "lostDeck": [],
        "stashDeck": [],
        "stats": {},
        "currentStats": {},
        "power": true,
        "handSize": 3,
        "deckSize": 8,
        "drawDeckSize": 8,
        "block": 0,
        "currentAttack": {},
        "currentAttackType": "",
        "currentCardID": "",
        "currentLocation": "bonfire",
        "treasure": {
            "cards": [],
            "souls": 0
        },
        "dead": false,
        "currentDamage": 0
    }

    map = {};

    map.rests = -1;

    currentEnemies = [];
}

function winGame() {
    resetStatus();
    alert('Congratulations! You have defeated both bosses!')
    closePopup();
    fadeOutAll("")
    let tableau = document.getElementById('tableau');
    tableau.classList.add('hidden')
    let enemies = document.getElementById('enemies');
    enemies.classList.add('hidden')
    let generalUI = document.getElementById('ui-elements');
    generalUI.classList.add('hidden')
    let battleUI = document.getElementById('battle-ui');
    battleUI.classList.add('hidden')

    let selector = document.getElementById('classSelect')
    selector.classList.remove('hidden');

    let map = document.getElementById('map-screen');
    let mapInner = document.getElementById('map');
    mapInner.innerHTML = "";
    map.classList.add('hidden');

    player = {
        "class": "",
        "hand": [],
        "drawDeck": [],
        "discardDeck": [],
        "lostDeck": [],
        "stashDeck": [],
        "stats": {},
        "currentStats": {},
        "power": true,
        "handSize": 3,
        "deckSize": 8,
        "drawDeckSize": 8,
        "block": 0,
        "currentAttack": {},
        "currentAttackType": "",
        "currentCardID": "",
        "currentLocation": "bonfire",
        "treasure": {
            "cards": [],
            "souls": 0
        },
        "dead": false,
        "currentDamage": 0
    }

    map = {};

    currentEnemies = [];
}

function death() {
    resetStatus();
    player.dead = true;

    resetDrawDeck();
    resetCompleted();
    fadeOutAll("")
    playSFX('death')


    map.rests--;

    player.block = 0;
    player.power = true;

    player.treasure = {
        "cards": [],
        "souls": 0
    }
    player.currentLocation = "bonfire";
    updateReadout();

    let popUp = document.getElementById('modal-content')
    popUp.innerHTML = ""
    popUp.innerHTML += "<h2>You Died!</h2>"
    popUp.innerHTML += "<p>All treasure and souls lost. All lost cards regained. All rooms reset. Returning to bonfire. Rests remaining: " + map.rests + "</p>";
    popUp.innerHTML += "<div id='popupok' class='popup-button' onClick='returnToMap()'>OK</div>";

    let popUpContainer = document.getElementById('modal-container');
    popUpContainer.classList.remove('hidden');

    setTimeout(function () {
        resetStamina();
    }, 5)

}
