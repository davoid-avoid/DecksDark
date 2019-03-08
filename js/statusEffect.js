
let status = {
    "attackBuff": 0,
    "defenseBuff": 0,
    "attackBuffAmt": 2,
    "defendBuffAmt": 4,
    "enemyAttackBuff": false,
    "enemyShieldBuff": false
}


function enactSpecial(name){
    console.log(name)
    if (name === 'Green Blossom'){
        resetStamina();
    }
    if (name === 'Hateful Ring'){
        gainAttackBuff();
        status.attackBuff++;
    }
    if (name === 'Divine Protection'){
        gainDefenseBuff();
        status.defenseBuff++;
    }
    if (name === 'Garlic Bread'){
        garlicAttack();
    }
}

function resetStatus(){
    if (status.attackBuff > 0){
        for (i = status.attackBuff; i > 0; i--){
            loseAttackBuff();
        }
        status.attackBuff = 0;
    }
    if (status.defenseBuff > 0){
        for (j = status.defenseBuff; j > 0; j--){
            loseDefenseBuff();
        }
        status.defenseBuff = 0;
    }
}

function gainAttackBuff(){
    
    player.drawDeck.forEach(card => {
        card.abilities.forEach(ability => {
            if (ability.type === 'attack'){
                ability.damage += status.attackBuffAmt;
            }
        })
    })

    player.hand.forEach(card => {
        card.abilities.forEach(ability => {
            if (ability.type === 'attack'){
                ability.damage += status.attackBuffAmt;
            }
        })
    })

    player.discardDeck.forEach(card => {
        card.abilities.forEach(ability => {
            if (ability.type === 'attack'){
                ability.damage += status.attackBuffAmt;
            }
        })
    })

    player.lostDeck.forEach(card => {
        card.abilities.forEach(ability => {
            if (ability.type === 'attack'){
                ability.damage += status.attackBuffAmt;
            }
        })
    })

    let handEl = document.getElementById('cardHand');
    handEl.innerHTML = "";
    player.hand.forEach(card => {
        renderCardNoFlip(card)
    })
}

function loseAttackBuff(){
    player.drawDeck.forEach(card => {
        card.abilities.forEach(ability => {
            if (ability.type === 'attack'){
                ability.damage -= status.attackBuffAmt;
            }
        })
    })

    player.hand.forEach(card => {
        card.abilities.forEach(ability => {
            if (ability.type === 'attack'){
                ability.damage -= status.attackBuffAmt;
            }
        })
    })

    player.discardDeck.forEach(card => {
        card.abilities.forEach(ability => {
            if (ability.type === 'attack'){
                ability.damage -= status.attackBuffAmt;
            }
        })
    })

    player.lostDeck.forEach(card => {
        card.abilities.forEach(ability => {
            if (ability.type === 'attack'){
                ability.damage -= status.attackBuffAmt;
            }
        })
    })

    let handEl = document.getElementById('cardHand');
    handEl.innerHTML = "";
    player.hand.forEach(card => {
        renderCardNoFlip(card)
    })
}

function garlicAttack(){

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
            "damage": 3
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
            if (dead === enemy.enemyID){
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

    if (currentEnemies.length === 0) {
        playSFX('kill')
        endOfBattle();
    } else {
        playSFX('hit')
    }
}

function gainDefenseBuff(){
    player.drawDeck.forEach(card => {
        card.abilities.forEach(ability => {
            if (ability.type === 'defend'){
                ability.damage += status.defendBuffAmt;
            }
        })
    })

    player.hand.forEach(card => {
        card.abilities.forEach(ability => {
            if (ability.type === 'defend'){
                ability.damage += status.defendBuffAmt;
            }
        })
    })

    player.discardDeck.forEach(card => {
        card.abilities.forEach(ability => {
            if (ability.type === 'defend'){
                ability.damage += status.defendBuffAmt;
            }
        })
    })

    player.lostDeck.forEach(card => {
        card.abilities.forEach(ability => {
            if (ability.type === 'defend'){
                ability.damage += status.defendBuffAmt;
            }
        })
    })

    let handEl = document.getElementById('cardHand');
    handEl.innerHTML = "";
    player.hand.forEach(card => {
        renderCardNoFlip(card)
    })
}

function loseDefenseBuff(){
    player.drawDeck.forEach(card => {
        card.abilities.forEach(ability => {
            if (ability.type === 'defend'){
                ability.damage -= status.defendBuffAmt;
            }
        })
    })

    player.hand.forEach(card => {
        card.abilities.forEach(ability => {
            if (ability.type === 'defend'){
                ability.damage -= status.defendBuffAmt;
            }
        })
    })

    player.discardDeck.forEach(card => {
        card.abilities.forEach(ability => {
            if (ability.type === 'defend'){
                ability.damage -= status.defendBuffAmt;
            }
        })
    })

    player.lostDeck.forEach(card => {
        card.abilities.forEach(ability => {
            if (ability.type === 'defend'){
                ability.damage -= status.defendBuffAmt;
            }
        })
    })

    let handEl = document.getElementById('cardHand');
    handEl.innerHTML = "";
    player.hand.forEach(card => {
        renderCardNoFlip(card)
    })
}