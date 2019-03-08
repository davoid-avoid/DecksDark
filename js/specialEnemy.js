function specialBossAttack(enemy) {


    let attack = enemy.cardList[enemy.moveNum];

    if (attack.special.type === 'summon-random') {
        for (i = 0; i < attack.special.amount; i++) {
            if (currentEnemies.length < 3) {
                var randomNumber = Math.floor(Math.random() * enemiesList[attack.special.summon[i]].length);
                let enemyInstance = copyObj(enemiesList[attack.special.summon[i]][randomNumber])
                enemyInstance.currHP = enemyInstance.hp;
                enemyInstance.enemyType = 'normal';
                enemyInstance.enemyID = currentEnemies.length;
                currentEnemies.push(enemyInstance)
            }
        }
        renderEnemies(currentEnemies);
    }

    if (attack.special.type === "heal") {

        enemy.hp += attack.special.amount;

        if (enemy.hp > enemy.currHP) {
            enemy.hp = enemy.currHP;
        }

        renderEnemies(currentEnemies);
    }

}

function specialEnemyAttack(enemy) {

    let attack = enemy.special;
    console.log(attack)

    if (attack.type === 'buff-attack') {
        currentEnemies.forEach(enemyTar => {
            if (enemyTar.enemyType === 'normal') {
                if (!isNaN(enemyTar.attack)) {
                    enemyTar.attack += attack.amount;
                }
            } else if (enemyTar.enemyType === 'boss'){
                let bossNum = enemyTar.moveNum + 1;
                if (bossNum > enemyTar.cardList.length + 1){
                    bossNum = 0
                }
                if (!isNaN(enemyTar.cardList[bossNum].attack)) {
                    enemyTar.cardList[bossNum].attack += attack.amount;
                }
            }
        })
        if (enemy.name === "Attack Mage") {
            enemy.attack = 10;
            enemy.name = "Mage";
            enemy.image = "novice-mage"
        }
        renderEnemies(currentEnemies);
    }

    if (attack.type === 'buff-shield') {
        currentEnemies.forEach(enemyTar => {
            if (enemyTar.enemyType === 'normal') {
                if (!isNaN(enemyTar.shield)) {
                    enemyTar.shield += attack.amount;
                }
            } else if (enemyTar.enemyType === 'boss') {
                let bossNum = enemyTar.moveNum + 1;
                if (bossNum > enemyTar.cardList.length + 1){
                    bossNum = 0
                }
                if (!isNaN(enemyTar.cardList[bossNum].shield)) {
                    enemyTar.cardList[bossNum].shield += attack.amount;
                }
            }
        })
        if (enemy.name === "Shield Mage") {
            enemy.attack = 10;
            enemy.name = "Mage";
            enemy.image = "novice-mage"
        }
        renderEnemies(currentEnemies);
    }

    if (attack.type === 'heal-enemies') {
        currentEnemies.forEach(enemyTar => {
            if (enemyTar.enemyType === 'normal') {
                if (enemyTar.hp < enemy.currHP) {
                    enemyTar.hp += attack.amount;
                    if (enemyTar.hp > enemyTar.currHP) {
                        enemyTar.hp = enemyTar.currHP;
                    }
                }
            } else if (enemyTar.enemyType === 'boss') {
                if (enemyTar.hp < enemyTar.currHP) {
                    enemyTar.hp += attack.amount;
                    if (enemyTar.hp > enemyTar.currHP) {
                        enemyTar.hp = enemyTar.currHP;
                    }
                }
            }
        })
        if (enemy.name === "Healing Mage") {
            enemy.attack = 10;
            enemy.name = "Mage";
            enemy.image = "novice-mage"
        }
        renderEnemies(currentEnemies);
    }

}
