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
    }
]