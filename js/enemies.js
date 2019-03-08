let enemiesList = {
    "easy": [
        {
            "name": "Skeleton",
            "hp": 3,
            "shield": 1,
            "weakness": "bash",
            "attack": 1,
            "image": 'skeleton'
        },
        {
            "name": "Goblin",
            "hp": 2,
            "shield": 1,
            "weakness": "slice",
            "attack": 2,
            "image": 'goblin'
        },
        {
            "name": "Slime",
            "hp": 2,
            "shield": 1,
            "weakness": "magic",
            "attack": 2,
            "image": 'slime'
        },
        {
            "name": "Hollow",
            "hp": 3,
            "shield": 1,
            "weakness": "precise",
            "attack": 3,
            "image": 'hollow'
        },
        {
            "name": "Novice Zealot",
            "hp": 3,
            "shield": 0,
            "weakness": "",
            "attack": 2,
            "image": 'novice-zealot'
        },
        {
            "name": "Novice Mage",
            "hp": 2,
            "shield": 0,
            "weakness": "",
            "attack": 7,
            "image": 'novice-mage'
        },
        {
            "name": "Novice Knight",
            "hp": 4,
            "shield": 0,
            "weakness": "",
            "attack": 3,
            "image": 'novice-knight'
        },
        {
            "name": "Novice Rogue",
            "hp": 3,
            "shield": 0,
            "weakness": "",
            "attack": 3,
            "image": 'novice-rogue'
        },
    ],
    "medium": [
        {
            "name": "Skeletal Knight",
            "hp": 4,
            "shield": 1,
            "weakness": "bash",
            "attack": 2,
            "image": 'skeletal-knight'
        },
        {
            "name": "Orc",
            "hp": 4,
            "shield": 1,
            "weakness": "slice",
            "attack": 4,
            "image": 'orc'
        },
        {
            "name": "Ghost",
            "hp": 4,
            "shield": 1,
            "weakness": "magic",
            "attack": 3,
            "image": 'ghost'
        },
        {
            "name": "Hollow Knight",
            "hp": 4,
            "shield": 1,
            "weakness": "precise",
            "attack": 3,
            "image": 'hollow-knight'
        },
        {
            "name": "Drowned Warrior",
            "hp": 4,
            "shield": 1,
            "weakness": "slice",
            "attack": 3,
            "image": 'drowned-warrior'
        },
        {
            "name": "Demonic Tree",
            "hp": 7,
            "shield": 0,
            "weakness": "",
            "attack": 5,
            "image": 'demonic-tree'
        },
        {
            "name": "Undead Mage",
            "hp": 2,
            "shield": 2,
            "weakness": "magic",
            "attack": 10,
            "image": 'undead-mage'
        },
        {
            "name": "Attack Mage",
            "hp": 3,
            "shield": 1,
            "weakness": "",
            "attack": "Enemy Attack +2",
            "special": {
                "type": "buff-attack",
                "amount": 2
            },
            "image": 'attack-mage'
        },
        {
            "name": "Shield Mage",
            "hp": 4,
            "shield": 0,
            "weakness": "",
            "attack": "Enemy Shield +1",
            "special": {
                "type": "buff-shield",
                "amount": 1
            },
            "image": 'shield-mage'
        },
        {
            "name": "Healing Mage",
            "hp": 3,
            "shield": 1,
            "weakness": "",
            "attack": "Enemies +4 hp",
            "special": {
                "type": "heal-enemies",
                "amount": 4
            },
            "image": 'healing-mage'
        }
    ],
    "hard": [
        {
            "name": "Unseen Horror",
            "hp": 8,
            "shield": 3,
            "weakness": "bash",
            "attack": 6,
            "image": 'unseen-horror'
        },
        {
            "name": "Necrotic Mass",
            "hp": 6,
            "shield": 3,
            "weakness": "slice",
            "attack": 8,
            "image": 'necrotic-mass'
        },
        {
            "name": "Forgotten Soul",
            "hp": 3,
            "shield": 4,
            "weakness": "magic",
            "attack": 7,
            "image": 'forgotten-soul'
        },
        {
            "name": "Drake",
            "hp": 17,
            "shield": 0,
            "weakness": "",
            "attack": 9,
            "image": 'drake'
        },
        {
            "name": "Unspoken",
            "hp": 7,
            "shield": 2,
            "weakness": "slice",
            "attack": 7,
            "image": 'unspoken'
        },
        {
            "name": "Capra Demon",
            "hp": 5,
            "shield": 2,
            "weakness": "precise",
            "attack": 8,
            "image": 'capra-demon'
        },
        {
            "name": "Missingno",
            "hp": 8,
            "shield": 1,
            "weakness": "bash",
            "attack": 7,
            "image": 'missingno'
        },
        {
            "name": "Horror",
            "hp": 12,
            "shield": 2,
            "weakness": "precise",
            "attack": 7,
            "image": 'horror'
        },
    ],

    "gravelord": [
        {
            "name": "Gravelord Follower",
            "hp": 1,
            "shield": 0,
            "weakness": "",
            "attack": 3,
            "image": 'gravelord-follower'
        },
    ],


    "test": [
        {
            "name": "Attack Mage",
            "hp": 3,
            "shield": 0,
            "weakness": "",
            "attack": "Enemy Attack +2",
            "special": {
                "type": "buff-attack",
                "amount": 2
            },
            "image": 'attack-mage'
        },
        {
            "name": "Shield Mage",
            "hp": 3,
            "shield": 0,
            "weakness": "",
            "attack": "Enemy Shield +1",
            "special": {
                "type": "buff-shield",
                "amount": 1
            },
            "image": 'shield-mage'
        },
        {
            "name": "Healing Mage",
            "hp": 5,
            "shield": 1,
            "weakness": "",
            "attack": "Enemies +4 hp",
            "special": {
                "type": "heal-enemies",
                "amount": 4
            },
            "image": 'healing-mage'
        },
    ]
}

let bossList = {
    "boss1": [
        [
            {
                "name": "Lord of Blessings",
                "hp": 18,
                "maxHP": 18,
                "image": 'blessed-lord',
                "cardList": [
                    {
                        "shield": 1,
                        "weakness": "precise",
                        "attack": 8,
                    },
                    {
                        "shield": 1,
                        "weakness": "magic",
                        "attack": 7,
                    },
                    {
                        "shield": 1,
                        "weakness": "bash",
                        "attack": 7,
                    },
                    {
                        "shield": 1,
                        "weakness": "slice",
                        "attack": 6,
                    },
                    {
                        "shield": 3,
                        "weakness": "",
                        "attack": 5,
                    },
                    {
                        "shield": 0,
                        "weakness": "",
                        "attack": 10,
                    },
                    {
                        "shield": 2,
                        "weakness": "",
                        "attack": "Summoning",
                        "special": {
                            "type": "summon-random",
                            "amount": 1,
                            "summon": ["easy"]
                        }
                    },
                    {
                        "shield": 1,
                        "weakness": "",
                        "attack": "Summoning",
                        "special": {
                            "type": "summon-random",
                            "amount": 1,
                            "summon": ["medium"]
                        }
                    }
                ]
            },
        ],
        [
            {
                "name": "Pardonner Lavender",
                "hp": 20,
                "maxHP": 20,
                "image": 'pardonner-lavender',
                "cardList": [
                    {
                        "shield": 2,
                        "weakness": "precise",
                        "attack": 7,
                    },
                    {
                        "shield": 2,
                        "weakness": "magic",
                        "attack": 7,
                    },
                    {
                        "shield": 2,
                        "weakness": "bash",
                        "attack": 6,
                    },
                    {
                        "shield": 2,
                        "weakness": "slice",
                        "attack": 6,
                    },
                    {
                        "shield": 3,
                        "weakness": "",
                        "attack": 4,
                    },
                    {
                        "shield": 0,
                        "weakness": "",
                        "attack": 8,
                    },
                    {
                        "shield": 0,
                        "weakness": "",
                        "attack": "Heal Self (8)",
                        "special": {
                            "type": "heal",
                            "amount": 8
                        }
                    },
                    {
                        "shield": 2,
                        "weakness": "",
                        "attack": "Heal Self (5)",
                        "special": {
                            "type": "heal",
                            "amount": 5
                        }
                    }
                ]
            }
        ],
        [
            {
                "name": "Gravelord",
                "hp": 24,
                "maxHP": 24,
                "image": 'gravelord',
                "cardList": [
                    {
                        "shield": 2,
                        "weakness": "precise",
                        "attack": 4,
                    },
                    {
                        "shield": 2,
                        "weakness": "magic",
                        "attack": 3,
                    },
                    {
                        "shield": 2,
                        "weakness": "bash",
                        "attack": 4,
                    },
                    {
                        "shield": 2,
                        "weakness": "slice",
                        "attack": 3,
                    },
                    {
                        "shield": 2,
                        "weakness": "slice",
                        "attack": "Summoning",
                        "special": {
                            "type": "summon-random",
                            "amount": 1,
                            "summon": ["gravelord"]
                        }
                    },
                    {
                        "shield": 2,
                        "weakness": "bash",
                        "attack": "Summoning",
                        "special": {
                            "type": "summon-random",
                            "amount": 1,
                            "summon": ["gravelord"]
                        }
                    },
                    {
                        "shield": 2,
                        "weakness": "magic",
                        "attack": "Summoning",
                        "special": {
                            "type": "summon-random",
                            "amount": 1,
                            "summon": ["gravelord"]
                        }
                    },
                    {
                        "shield": 2,
                        "weakness": "precise",
                        "attack": "Summoning",
                        "special": {
                            "type": "summon-random",
                            "amount": 1,
                            "summon": ["gravelord"]
                        }
                    }
                ]
            }
        ]
    ],
    "boss2": [
        [
            {
                "name": "Voice of the Infinite",
                "hp": 50,
                "maxHP": 50,
                "image": 'voice-infinite',
                "cardList": [
                    {
                        "shield": 3,
                        "weakness": "precise",
                        "attack": 8,
                    },
                    {
                        "shield": 3,
                        "weakness": "magic",
                        "attack": 8,
                    },
                    {
                        "shield": 3,
                        "weakness": "bash",
                        "attack": 7,
                    },
                    {
                        "shield": 3,
                        "weakness": "slice",
                        "attack": 7,
                    },
                    {
                        "shield": 4,
                        "weakness": "",
                        "attack": 10,
                    },
                    {
                        "shield": 2,
                        "weakness": "",
                        "attack": 14,
                    },
                    {
                        "shield": 1,
                        "weakness": "",
                        "attack": "Summoning",
                        "special": {
                            "type": "summon-random",
                            "amount": 1,
                            "summon": ["medium"]
                        }
                    },
                    {
                        "shield": 3,
                        "weakness": "",
                        "attack": "Heal Self (7)",
                        "special": {
                            "type": "heal",
                            "amount": 7
                        }
                    },
                    {
                        "shield": 5,
                        "weakness": "",
                        "attack": "Heal Self (4)",
                        "special": {
                            "type": "heal",
                            "amount": 4
                        }
                    }
                ]
            },
        ],
        [
            {
                "name": "Threads of Fate",
                "hp": 48,
                "maxHP": 48,
                "image": 'threads-fate',
                "cardList": [
                    {
                        "shield": 3,
                        "weakness": "precise",
                        "attack": 6,
                    },
                    {
                        "shield": 3,
                        "weakness": "magic",
                        "attack": 7,
                    },
                    {
                        "shield": 3,
                        "weakness": "bash",
                        "attack": 6,
                    },
                    {
                        "shield": 3,
                        "weakness": "slice",
                        "attack": 6,
                    },
                    {
                        "shield": 5,
                        "weakness": "",
                        "attack": 5,
                    },
                    {
                        "shield": 2,
                        "weakness": "",
                        "attack": 14,
                    },
                    {
                        "shield": 2,
                        "weakness": "",
                        "attack": "Summoning",
                        "special": {
                            "type": "summon-random",
                            "amount": 1,
                            "summon": ["hard"]
                        }
                    },
                    {
                        "shield": 1,
                        "weakness": "",
                        "attack": "Summoning",
                        "special": {
                            "type": "summon-random",
                            "amount": 1,
                            "summon": ["hard"]
                        }
                    }
                ]
            }
        ],
        [
            {
                "name": "Dragonslayer",
                "hp": 26,
                "maxHP": 26,
                "image": 'dragonslayer',
                "cardList": [
                    {
                        "shield": 2,
                        "weakness": "precise",
                        "attack": 6,
                    },
                    {
                        "shield": 2,
                        "weakness": "magic",
                        "attack": 6,
                    },
                    {
                        "shield": 2,
                        "weakness": "bash",
                        "attack": 5,
                    },
                    {
                        "shield": 2,
                        "weakness": "slice",
                        "attack": 5,
                    },
                    {
                        "shield": 0,
                        "weakness": "",
                        "attack": 5,
                    },
                    {
                        "shield": 2,
                        "weakness": "",
                        "attack": "Heal Self (8)",
                        "special": {
                            "type": "heal",
                            "amount": 8
                        }
                    },
                    {
                        "shield": 2,
                        "weakness": "",
                        "attack": "Heal Self (5)",
                        "special": {
                            "type": "heal",
                            "amount": 5
                        }
                    },
                    {
                        "shield": 4,
                        "weakness": "",
                        "attack": "Heal Self (8)",
                        "special": {
                            "type": "heal",
                            "amount": 8
                        }
                    },
                ]
            },
            {
                "name": "Royal Wizard",
                "hp": 28,
                "maxHP": 28,
                "image": 'royal-wizard',
                "cardList": [
                    {
                        "shield": 2,
                        "weakness": "precise",
                        "attack": 8,
                    },
                    {
                        "shield": 2,
                        "weakness": "magic",
                        "attack": 8,
                    },
                    {
                        "shield": 2,
                        "weakness": "bash",
                        "attack": 7,
                    },
                    {
                        "shield": 2,
                        "weakness": "slice",
                        "attack": 7,
                    },
                    {
                        "shield": 0,
                        "weakness": "",
                        "attack": 12,
                    },
                    {
                        "shield": 2,
                        "weakness": "",
                        "attack": "Summoning",
                        "special": {
                            "type": "summon-random",
                            "amount": 1,
                            "summon": ["hard"]
                        }
                    },
                    {
                        "shield": 3,
                        "weakness": "",
                        "attack": "Summoning",
                        "special": {
                            "type": "summon-random",
                            "amount": 1,
                            "summon": ["medium"]
                        }
                    }
                ]
            }
        ]
    ]
}