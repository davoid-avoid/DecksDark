let mapList = [
    {
        "name": "map1",
        "rests": 5,
        "locations": [
            {
                "name": "bonfire",
                "difficulty": "bonfire",
                "dependencies": [],
                "x": 295,
                "y": 248
            },
            {
                "name": "1-1",
                "difficulty": "easy",
                "dependencies": [],
                "x": 408,
                "y": 78
            },
            {
                "name": "1-2",
                "difficulty": "hard",
                "dependencies": ["1-1"],
                "x": 555,
                "y": 41
            },
            {
                "name": "2-1",
                "difficulty": "medium",
                "dependencies": [],
                "x": 475,
                "y": 315
            },
            {
                "name": "2-2",
                "difficulty": "easy",
                "dependencies": ["2-1", "4-2"],
                "x": 296,
                "y": 432
            },
            {
                "name": "3-1",
                "difficulty": "medium",
                "dependencies": [],
                "x": 190,
                "y": 55
            },
            {
                "name": "3-2",
                "difficulty": "medium",
                "dependencies": ["3-1"],
                "x": 26,
                "y": 57
            },
            {
                "name": "4-1",
                "difficulty": "easy",
                "dependencies": [],
                "x": 152,
                "y": 290
            },
            {
                "name": "4-2",
                "difficulty": "hard",
                "dependencies": ["4-1", "2-2"],
                "x": 45,
                "y": 428
            },
            {
                "name": "boss 1",
                "difficulty": "boss",
                "dependencies": ["1-2", "2-1"],
                "x": 606,
                "y": 250
            },
            {
                "name": "boss 2",
                "difficulty": "boss",
                "dependencies": ["3-2", "4-2"],
                "x": 10,
                "y": 243
            },
        ]
    },
    {
        "name": "map2",
        "rests": 6,
        "locations": [
            {
                "name": "bonfire",
                "difficulty": "bonfire",
                "dependencies": [],
                "x": 324,
                "y": 52
            },
            {
                "name": "1-1",
                "difficulty": "easy",
                "dependencies": [],
                "x": 412,
                "y": 218
            },
            {
                "name": "1-2",
                "difficulty": "hard",
                "dependencies": ["1-1"],
                "x": 562,
                "y": 48
            },
            {
                "name": "2-1",
                "difficulty": "easy",
                "dependencies": ["1-1", "3-2"],
                "x": 413,
                "y": 382
            },
            {
                "name": "2-2",
                "difficulty": "easy",
                "dependencies": ["2-1"],
                "x": 564,
                "y": 427
            },
            {
                "name": "3-1",
                "difficulty": "hard",
                "dependencies": [],
                "x": 246,
                "y": 220
            },
            {
                "name": "3-2",
                "difficulty": "medium",
                "dependencies": ["3-1", "2-1"],
                "x": 219,
                "y": 412
            },
            {
                "name": "4-1",
                "difficulty": "medium",
                "dependencies": [],
                "x": 95,
                "y": 50
            },
            {
                "name": "4-2",
                "difficulty": "medium",
                "dependencies": ["4-1"],
                "x": 55,
                "y": 227
            },
            {
                "name": "boss 1",
                "difficulty": "boss",
                "dependencies": ["1-2", "2-2"],
                "x": 569,
                "y": 229
            },
            {
                "name": "boss 2",
                "difficulty": "boss",
                "dependencies": ["3-2", "4-2"],
                "x": 54,
                "y": 411
            },

        ]
    }
]

//to do: create list of possible node contents next, then build the function to assign them to a node when clicked

let roomsList = {
    "easy": [
        {
            "content": ["easy", "easy", "easy"],
            "souls": 4,
            "treasure": 1,
            "reveal": "3 easy enemies"
        },
        {
            "content": ["easy", "easy"],
            "souls": 2,
            "treasure": 0,
            "reveal": "2 easy enemies"
        },
        {
            "content": ["easy", "easy"],
            "souls": 3,
            "treasure": 0,
            "reveal": "2 easy enemies"
        },
        {
            "content": ["easy", "easy"],
            "souls": 2,
            "treasure": 1,
            "reveal": "1 easy, 1 medium enemy"
        },
        {
            "content": ["easy", "medium"],
            "souls": 3,
            "treasure": 1,
            "reveal": "1 easy, 1 medium enemy"
        },
        {
            "content": ["medium"],
            "souls": 3,
            "treasure": 0,
            "reveal": "1 medium enemy"
        },
        {
            "content": ["medium"],
            "souls": 2,
            "treasure": 1,
            "reveal": "1 medium enemy"
        }
    ],
    "medium": [
        {
            "content": ["easy", "easy", "medium"],
            "souls": 3,
            "treasure": 1,
            "reveal": "2 easy, 1 medium enemy"
        },
        {
            "content": ["medium", "medium"],
            "souls": 3,
            "treasure": 1,
            "reveal": "2 medium enemies"
        },
        {
            "content": ["easy", "medium", "medium"],
            "souls": 3,
            "treasure": 1,
            "reveal": "1 easy, 2 medium enemies"
        },
        {
            "content": ["medium", "medium"],
            "souls": 4,
            "treasure": 0,
            "reveal": "2 medium enemies"
        },
        {
            "content": ["medium", "medium"],
            "souls": 2,
            "treasure": 1,
            "reveal": "2 medium enemies"
        },
        {
            "content": ["medium", "medium", "medium"],
            "souls": 4,
            "treasure": 1,
            "reveal": "3 medium enemies"
        }
    ],
    "hard": [
        {
            "content": ["hard"],
            "souls": 5,
            "treasure": 1,
            "reveal": "1 hard enemy"
        },
        {
            "content": ["medium", "hard"],
            "souls": 7,
            "treasure": 1,
            "reveal": "1 medium, 1 hard enemy"
        },
        {
            "content": ["hard", "hard"],
            "souls": 9,
            "treasure": 1,
            "reveal": "2 hard enemies"
        },
        {
            "content": ["hard", "medium", "medium"],
            "souls": 10,
            "treasure": 1,
            "reveal": "1 hard, 2 medium enemies"
        }
    ],
    "boss1": [
        {
            "content": ['boss1'],
            "souls": 7,
            "treasure": 1,
            "reveal": ""
        }
    ],
    "boss2": [
        {
            "content": ['boss2'],
            "souls": 7,
            "treasure": 1,
            "reveal": ""
        }
    ], 
    "test": [
        {
            "content": ["test", "test", "test"],
            "souls": 100,
            "treasure": 30,
            "reveal": "testing room"
        }
    ]
}
