

var player = {
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
    "deckSize": 0,
    "drawDeckSize": 0,
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

function confirmSelectClass(selectedClass){

}

function createPlayerObject(selectedClass){
    player.class = selectedClass;
    player.drawDeck = [];
    player.dead = false;

    if (selectedClass === "random"){
        randomPlayerObject();
    } else {
        startingClasses.forEach((classtype, index) => {
            if (classtype.name === selectedClass){
                player.stats = copyObj(classtype.stats);
                player.currentStats = copyObj(classtype.stats);
                player.specPower = classtype.specPower;
                player.pow = classtype.pow;

                classtype.deck.forEach((card, indexCard) => {
                    itemCards.forEach((itemCard) => {
                        if (card === itemCard.name){
                            let cardGrab = copyObj(itemCard);
                            cardGrab.deckID = indexCard;
                            cardGrab.abilities = [];
                            itemCard.abilities.forEach(ability => {
                                cardGrab.abilities.push(copyObj(ability));
                            })
                            player.drawDeck.push(cardGrab);
                        }
                    })
                })
            }
        })
    }

    shuffle(player.drawDeck)

    console.log(player.drawDeck)

    let selector = document.getElementById('classSelect')
    selector.classList.add('hidden');

    player.deckSize = player.drawDeck.length;
    player.drawDeckSize = player.drawDeck.length;

    let powerButton = document.getElementById('specialPower');
    powerButton.innerHTML = "Special Power: " + player.specPower;

    //drawHand();
    drawStamina();
    //startBattle();
    createTreasureDeck();
    mapStart();
}

function randomPlayerObject(){
    let statDist = 5;
    let deckSize = 8;
    let drawDeckSize = 8;
    let statsArray = [0, 0, 0, 0];

    //create the player stats
    for (i = 0; i < statDist; i ++){
        var randomNumber = Math.floor(Math.random() * 4);
        statsArray[randomNumber]++;
    }

    player.stats = {
        "strength": statsArray[0],
        "dexterity": statsArray[1],
        "magic": statsArray[2],
        "faith": statsArray[3]
    }

    player.currentStats = {
        "strength": statsArray[0],
        "dexterity": statsArray[1],
        "magic": statsArray[2],
        "faith": statsArray[3]
    }

    //get the players deck
    for (j = 0; j < deckSize; j++){
        var randomNumberCard = Math.floor(Math.random() * itemCards.length);
        let cardGrab = copyObj(itemCards[randomNumberCard]);
        cardGrab.abilties = [];
        itemCards[randomNumberCard].abilities.forEach(ability => {
            cardGrab.abilties.push(copyObj(ability))
        })
        cardGrab.deckID = j;
        player.drawDeck.push(cardGrab)
    }

    //grab random power
    var randomNumberPow = Math.floor(Math.random() * startingClasses.length);
    player.power = true;
    player.specPower = startingClasses[randomNumberPow].specPower;
    player.pow = startingClasses[randomNumberPow].pow;

    console.log(player);

    let powerButton = document.getElementById('specialPower');
    powerButton.innerHTML = "Special Power: " + player.specPower;
}

function createTreasureDeck(){
    itemCards.forEach(card => {
        let itemTarget = copyObj(card);
        itemTarget.abilities = [];
        card.abilities.forEach(ability => {
            itemTarget.abilities.push(copyObj(ability))
        });
        treasureCards.push(itemTarget)
    })

    treasureCardList.forEach(card => {
        let treasureTarget = copyObj(card);
        treasureTarget.abilities = [];
        card.abilities.forEach(ability => {
            treasureTarget.abilities.push(copyObj(ability))
        });
        treasureCards.push(treasureTarget)
    })

    shuffle(treasureCards);
    console.log(treasureCards);

    
}

