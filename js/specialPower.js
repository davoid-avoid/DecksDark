function useSpecialPowerPrompt() {
    if (player.power === true) {
        let popUp = document.getElementById('modal-content')
        popUp.innerHTML = "";

        popUp.innerHTML += "<h3>Use Special Power?</h3><br>"

        popUp.innerHTML += "<p>Special Power: " + player.specPower + "</p><br>"

        popUp.innerHTML += "<h2>Power can be used once per bonfire</h2><br>"


        popUp.innerHTML += "<div id='popupok' class='popup-button' onClick='useSpecialPower()'>Yes</div><br><br>";

        popUp.innerHTML += "<div id='popupok' class='popup-button' onClick='closePopup()'>No</div>";

        let popUpContainer = document.getElementById('modal-container');
        popUpContainer.classList.remove('hidden');

    }
}


function useSpecialPower() {
    if (player.power === true) {
        player.power = false;
        let pow = player.pow;


        if (pow === 'block') {
            specialBlock();
        }


        if (pow === 'attack') {
            specialAttack();
        }


        if (pow === 'stamina') {
            specialStamina();
        }

        if (pow === 'heal') {
            specialHeal(2);
        }

        updateReadout();
        playSFX('special');

        if (currentEnemies.length !== 0) {
            let popUpContainer = document.getElementById('modal-container');
            popUpContainer.classList.add('hidden');
        }
    }
}

function specialBlock() {
    player.block += 7;
    updateReadout();
}

function specialAttack() {

    let deads = [];

    currentEnemies.forEach((enemy, index) => {
        inAttack = true;
        player.currentAttack = {
            "cost": {
                "strength": 0,
                "dexterity": 0,
                "magic": 0,
                "faith": 0
            },
            "type": "special",
            "damage": 1
        }

        currentEnemies[index].hp -= player.currentAttack.damage;
        let enemyEl = document.getElementById('enemy' + index);
        if (currentEnemies[index].hp > 0) {
            let healthbar = "<div class='enemyHP-outer'><div class='enemyHP-inner' style='width: " + ((currentEnemies[index].hp / currentEnemies[index].currHP) * 100) + "%'></div></div>"
            enemyEl.innerHTML = "";
            enemyEl.innerHTML = "<h2>" + currentEnemies[index].name + "</h2><br>" + healthbar + "<p><span class='icon icon-health'></span>" + currentEnemies[index].hp + "</p><p><span class='icon icon-defend'></span><span style='float: left'>" + currentEnemies[index].shield + " / </span><span class='icon icon-" + currentEnemies[index].weakness + "' style='margin-left: 5px'></span></p><br><p><span class='icon icon-attack'></span>" + currentEnemies[index].attack + "</p><br><div class='enemy-image enemy-image-" + currentEnemies[index].image + "'></div>";
            flashError('enemy' + index)
        } else {
            deads.push(currentEnemies[index].enemyID);
        }
    })

    deads.forEach(dead => {
        currentEnemies.forEach((enemy, index) => {
            if (dead === enemy.enemyID) {
                currentEnemies.splice(index, 1);
            }
        })
    })

    let enemiesEl = document.getElementById('enemies');
    enemiesEl.innerHTML = "";
    renderEnemies(currentEnemies)

    inAttack = false;
    player.currentAttack = {};
    player.currentAttackType = "";
    player.currentCardID = "";
    updateReadout();

    console.log('current enemies')
    console.log(currentEnemies)
    console.log(currentEnemies.length)

    if (currentEnemies.length === 0) {
        console.log('end of battle should fire')
        endOfBattle();
    }
}

function specialStamina() {
    if (player.currentStats.strength < player.stats.strength) {
        player.currentStats.strength++;
    }
    if (player.currentStats.dexterity < player.stats.dexterity) {
        player.currentStats.dexterity++;
    }
    if (player.currentStats.magic < player.stats.magic) {
        player.currentStats.magic++;
    }
    if (player.currentStats.faith < player.stats.faith) {
        player.currentStats.faith++;
    }

    drawStamina();
}

function specialHeal(amount) {
    if (amount > 0 && player.lostDeck.length > 0) {

        player.drawDeck.push(player.lostDeck[0])

        amount--;
        updateReadout()

        player.lostDeck.splice(0, 1);

        specialHeal(amount);
    }

    drawHand();
}