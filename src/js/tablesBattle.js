export const battleTables = [
    {
        key: 'deploymentconditions',
        title: 'Deployment Conditions',
        sequence: ["default", "rival", "quest"],
        tables: {
            default: [
                { "label": "None", "weight": 40 },
                { "label": "Small encounter", "weight": 5 },
                { "label": "Poor visibility", "weight": 5 },
                { "label": "Brief engagement", "weight": 5 },
                { "label": "Toxic environment", "weight": 5 },
                { "label": "Surprise encounter", "weight": 5 },
                { "label": "Delayed", "weight": 10 },
                { "label": "Slippery ground", "weight": 5 },
                { "label": "Bitter struggle", "weight": 5 },
                { "label": "Caught off guard", "weight": 5 },
                { "label": "Gloomy", "weight": 10 },
            ],
            rival: [
                { "label": "None", "weight": 10 },
                { "label": "Small encounter", "weight": 5 },
                { "label": "Poor visibility", "weight": 5 },
                { "label": "Brief engagement", "weight": 5 },
                { "label": "Toxic environment", "weight": 5 },
                { "label": "Surprise encounter", "weight": 15 },
                { "label": "Delayed", "weight": 5 },
                { "label": "Slippery ground", "weight": 10 },
                { "label": "Bitter struggle", "weight": 15 },
                { "label": "Caught off guard", "weight": 15 },
                { "label": "Gloomy", "weight": 10 },
            ],
            quest: [
                { "label": "None", "weight": 5 },
                { "label": "Small encounter", "weight": 5 },
                { "label": "Poor visibility", "weight": 15 },
                { "label": "Brief engagement", "weight": 5 },
                { "label": "Toxic environment", "weight": 10 },
                { "label": "Surprise encounter", "weight": 10 },
                { "label": "Delayed", "weight": 10 },
                { "label": "Slippery ground", "weight": 5 },
                { "label": "Bitter struggle", "weight": 15 },
                { "label": "Caught off guard", "weight": 10 },
                { "label": "Gloomy", "weight": 10 },
            ],

        }
    },
    {
        key: 'notablesights',
        title: 'Notable Sights',
        sequence: ["default", "rival", "quest"],
        tables: {
            default: [
                { "label": "Nothing special", "weight": 20 },
                { "label": "Documentation", "weight": 10 },
                { "label": "Priority target", "weight": 10 },
                { "label": "Loot cache", "weight": 10 },
                { "label": "Shiny bits", "weight": 10 },
                { "label": "Really shiny bits", "weight": 10 },
                { "label": "Person of interest", "weight": 10 },
                { "label": "Peculiar item", "weight": 10 },
                { "label": "Curious Item", "weight": 10 },
            ],
            rival: [
                { "label": "Nothing special", "weight": 40 },
                { "label": "Documentation", "weight": 10 },
                { "label": "Priority target", "weight": 10 },
                { "label": "Loot cache", "weight": 10 },
                { "label": "Shiny bits", "weight": 5 },
                { "label": "Really shiny bits", "weight": 5 },
                { "label": "Person of interest", "weight": 10 },
                { "label": "Peculiar item", "weight": 5 },
                { "label": "Curious Item", "weight": 5 },
            ],
            quest: [
                { "label": "Nothing special", "weight": 10 },
                { "label": "Documentation", "weight": 15 },
                { "label": "Priority target", "weight": 10 },
                { "label": "Loot cache", "weight": 15 },
                { "label": "Shiny bits", "weight": 5 },
                { "label": "Really shiny bits", "weight": 10 },
                { "label": "Person of interest", "weight": 15 },
                { "label": "Peculiar item", "weight": 10 },
                { "label": "Curious Item", "weight": 10 },
            ],

        }
    },
    {
        key: 'missionobjective',
        title: 'Mission Objective',
        sequence: ["patron", "opportunity", "quest"],
        tables: {
            patron: [
                { "label": "Deliver", "weight": 2 },
                { "label": "Eliminate", "weight": 1 },
                { "label": "Move Through", "weight": 2 },
                { "label": "Secure", "weight": 2 },
                { "label": "Protect", "weight": 1 },
                { "label": "Fight Off", "weight": 2 },
            ],
            opportunity: [
                { "label": "Move Through", "weight": 2 },
                { "label": "Deliver", "weight": 2 },
                { "label": "Access", "weight": 2 },
                { "label": "Patrol", "weight": 2 },            
                { "label": "Fight Off", "weight": 2 },
            ],
            quest: [
                { "label": "Move Through", "weight": 2 },
                { "label": "Search", "weight": 2 },
                { "label": "Defend", "weight": 2 },
                { "label": "Acquire", "weight": 2 },            
                { "label": "Fight Off", "weight": 2 },
            ],

        }
    },
    {
        key: 'enemyencountercategory',
        title: 'Enemy Encounter Category',
        sequence: ["patron", "opportunity", "quest", "unknownrival"],
        tables: {
            patron: [
                { "label": "Criminal Elements", "subtable": "criminalelements", "weight": 25 },
                { "label": "Hired Muscle", "subtable": "criminalelements", "weight": 25 },
                { "label": "Interested Parties", "subtable": "criminalelements", "weight": 25 },
                { "label": "Roving Threats", "subtable": "criminalelements", "weight": 25 },
            ],
            opportunity: [
                { "label": "Criminal Elements", "subtable": "criminalelements", "weight": 30 },
                { "label": "Hired Muscle", "subtable": "criminalelements", "weight": 30 },
                { "label": "Interested Parties", "subtable": "criminalelements", "weight": 20 },
                { "label": "Roving Threats", "subtable": "criminalelements", "weight": 20 },
            ],
            quest: [
                { "label": "Criminal Elements", "subtable": "criminalelements", "weight": 15 },
                { "label": "Hired Muscle", "subtable": "criminalelements", "weight": 25 },
                { "label": "Interested Parties", "subtable": "criminalelements", "weight": 30 },
                { "label": "Roving Threats", "subtable": "criminalelements", "weight": 30 },
            ],
            unknownrival: [
                { "label": "Criminal Elements", "subtable": "criminalelements", "weight": 50 },
                { "label": "Hired Muscle", "subtable": "criminalelements", "weight": 30 },
                { "label": "Interested Parties", "subtable": "criminalelements", "weight": 20 },               
            ],
            criminalelements: [                
                { "label": "Gangers", "description": "{ \"numbers\": 2 }", "weight": 10 },
                { "label": "Punks", "description": "{ \"numbers\": 3 }", "weight": 9 },
                { "label": "Raiders", "description": "{ \"numbers\": 1 }", "weight": 8 },
                { "label": "Cultists", "description": "{ \"numbers\": 2 }", "weight": 7 },
                { "label": "Psychos", "description": "{ \"numbers\": 2 }", "weight": 9 },
                { "label": "Brat Gang", "description": "{ \"numbers\": 2 }", "weight": 5 },
                { "label": "Gene Renegade", "description": "{ \"numbers\": 1 }", "weight": 3 },
                { "label": "Anarchists", "description": "{ \"numbers\": 2 }", "weight": 6 },
                { "label": "Pirates", "description": "{ \"numbers\": 2 }", "weight": 7 },
                { "label": "K'Erin Outlaws", "description": "{ \"numbers\": 1 }", "weight": 7 },
                { "label": "Skulker Brigands", "description": "{ \"numbers\": 3 }", "weight": 8 },
                { "label": "Tech Gangers", "description": "{ \"numbers\": 1 }", "weight": 4 },
                { "label": "Starport Scum", "description": "{ \"numbers\": 3 }", "weight": 7 },
                { "label": "Hulker Gang", "description": "{ \"numbers\": 0 }", "weight": 4 },
                { "label": "Gun Slingers", "description": "{ \"numbers\": 1 }", "weight": 6 },
            ]

        }
    },
    
]