export const worldTables = [
    {
        key: 'crewtype',
        title: 'Crew Type',
        tables: {
            default: [
                { "label": "Human", "weight": 60 },
                { "label": "Primary Alien", "subtable": "alien_types", "weight": 20 },
                { "label": "Bot", "weight": 10 },
                { "label": "Strange Character", "subtable": "strange_types", "weight": 10 }
            ],
            alien_types: [
                { "label": "Engineer", "weight": 20 },
                { "label": "K'Erin", "weight": 20 },
                { "label": "Soulless", "weight": 15 },
                { "label": "Precursor", "weight": 15 },
                { "label": "Feral", "weight": 20 },
                { "label": "Swift", "weight": 10 },
            ],
            strange_types: [
                { "label": "De-converted", "weight": 2 },
                { "label": "Unity Agent", "weight": 6 },
                { "label": "Mysterious Past", "weight": 9 },
                { "label": "Hakshan", "weight": 5 },
                { "label": "Stalker", "weight": 4 },
                { "label": "Hulker", "weight": 7 },
                { "label": "Hopeful Rookie", "weight": 7 },
                { "label": "Genetic Uplift", "weight": 6 },
                { "label": "Mutant", "weight": 6 },
                { "label": "Assault Bot", "weight": 5 },
                { "label": "Manipulator", "weight": 4 },
                { "label": "Primitive", "weight": 5 },
                { "label": "Feeler", "weight": 6 },
                { "label": "Emo-Surpressed", "weight": 6 },
                { "label": "Minor Alient", "weight": 6 },
                { "label": "Traveler", "weight": 2 },
                { "label": "Empath", "weight": 6 },
                { "label": "Bio-upgrade", "weight": 7 },
            ]
        }
    },

    {
        key: 'background',
        title: 'Background',
        tables: {
            default: [
                { "label": "Peaceful, High-Tech Colony", "weight": 4 },
                { "label": "Giant, Overcrowded, Dystopian City", "weight": 5 },
                { "label": "Low-Tech Colony", "weight": 4 },
                { "label": "Mining Colony", "weight": 4 },
                { "label": "Military Brat", "weight": 4 },
                { "label": "Space Station", "weight": 4 },
                { "label": "Military Outpost", "weight": 4 },
                { "label": "Drifter", "weight": 5 },
                { "label": "Lower Megacity Class", "weight": 5 },
                { "label": "Wealthy Merchant Family", "weight": 3 },
                { "label": "Frontier Gang", "weight": 4 },
                { "label": "Religious Cult", "weight": 3 },
                { "label": "War-Torn Hell-Hole", "weight": 3 },
                { "label": "Tech Guild", "weight": 3 },
                { "label": "Subjugated Colony on Alien World", "weight": 4 },
                { "label": "Long-Term Space Mission", "weight": 5 },
                { "label": "Research Outpost", "weight": 4 },
                { "label": "Primitive/Regressed World", "weight": 4 },
                { "label": "Orphan Utility Program", "weight": 4 },
                { "label": "Isolationist Enclave", "weight": 5 },
                { "label": "Comfortable Megacity Class", "weight": 4 },
                { "label": "Industrial World", "weight": 5 },
                { "label": "Bureaucrat", "weight": 4 },
                { "label": "Wasteland Nomads", "weight": 4 },
                { "label": "Alien Culture", "weight": 3 },                    
            ]
        }
    },

    {
        key: 'motivation',
        title: 'Motivations',
        tables: {
            default: [
                { "label": "Wealth", "weight": 8 },
                { "label": "Fame", "weight": 6 },
                { "label": "Glory", "weight": 5 },
                { "label": "Survival", "weight": 7 },
                { "label": "Escape", "weight": 6 },
                { "label": "Adventure", "weight": 7 },
                { "label": "Truth", "weight": 5 },
                { "label": "Technology", "weight": 5 },
                { "label": "Discovery", "weight": 7 },
                { "label": "Loyalty", "weight": 7 },
                { "label": "Revenge", "weight": 6 },
                { "label": "Romance", "weight": 5 },
                { "label": "Faith", "weight": 5 },
                { "label": "Political", "weight": 5 },
                { "label": "Power", "weight": 6 },
                { "label": "Order", "weight": 5 },
                { "label": "Freedom", "weight": 5 },                
            ]
        }
    },

    {
        key: 'class',
        title: 'Class',
        tables: {
            default: [
                { "label": "Working Class", "weight": 5 },
                { "label": "Technician", "weight": 4 },
                { "label": "Scientist", "weight": 4 },
                { "label": "Hacker", "weight": 4 },
                { "label": "Soldier", "weight": 5 },
                { "label": "Mercenary", "weight": 5 },
                { "label": "Agitator", "weight": 5 },
                { "label": "Primitive", "weight": 4 },
                { "label": "Artist", "weight": 4 },
                { "label": "Trader", "weight": 5 },
                { "label": "Starship Crew", "weight": 5 },
                { "label": "Petty Criminal", "weight": 4 },
                { "label": "Ganger", "weight": 5 },
                { "label": "Scoundrel", "weight": 4 },
                { "label": "Enforcer", "weight": 4 },
                { "label": "Special Agent", "weight": 4 },
                { "label": "Troubleshooter", "weight": 4 },
                { "label": "Bounty Hunter", "weight": 4 },
                { "label": "Nomad", "weight": 5 },
                { "label": "Explorer", "weight": 4 },
                { "label": "Punk", "weight": 4 },
                { "label": "Scavenger", "weight": 4 },
            ]
        }
    },

    {
        key: 'patron',
        title: 'Patron',           
        tables: {
            default: [
                { "label": "Corporation", "weight": 2, "description": "{ \"desc\": \"+1 to the roll on the Danger Pay Table\", \"rolls\": [8,8,5] }" },
                { "label": "Local Government", "weight": 2, "description": "{ \"desc\": \"\", \"rolls\": [8,8,8] }" },
                { "label": "Sector Government", "weight": 1, "description": "{ \"desc\": \"\", \"rolls\": [8,8,8] }" },
                { "label": "Wealthy Individual", "weight": 2, "description": "{ \"desc\": \"\", \"rolls\": [5,8,8] }" },
                { "label": "Private Organization", "weight": 2, "description": "{ \"desc\": \"\", \"rolls\": [8,8,8] }" },
                { "label": "Secretive Group", "weight": 1, "description": "{ \"desc\": \"+1 to the roll on the Time Frame Table\", \"rolls\": [8,8,8] }" }
            ]
        }
    },

    {
        key: 'dangerpay',
        title: 'Danger Pay',           
        tables: {
            default: [                  
                { "label": "+1 credit", "weight": 4 },
                { "label": "+2 credits", "weight": 4 },
                { "label": "+3 credits", "weight": 1 },
                { "label": "+3 credits, roll x2 & pick higher for mission pay", "weight": 1 },
            ]
        }
    },
    {
        key: 'timeframe',
        title: 'Time Frame',           
        tables: {                
            default: [
                { "label": "This campaign turn", "weight": 5 },
                { "label": "This or next campaign turn", "weight": 2 },
                { "label": "This or following 2 campaign turns", "weight": 2 },
                { "label": "Any time", "weight": 1 },
            ]               
        }
    },
    {
        key: 'benefit',
        title: 'Benefit',
        tables: {
            default: [
                { "label": "Fringe Benefit", "weight": 2, "description": "Roll on the LootTable (p.131)" },
                { "label": "Connections", "weight": 2, "description": "Gain a rumor" },
                { "label": "Company Store", "weight": 1, "description": "Roll on the Trade Table (p.79)" },
                { "label": "Health Insurance", "weight": 1, "description": "Mark down 2 campaign turns of injury recovery, assigned as you see fit." },
                { "label": "Security Team", "weight": 1, "description": "Reduce enemy force numbers by 1." },
                { "label": "Persistent", "weight": 2, "description": "Patron remains available if you travel." },
                { "label": "Negotiable", "weight": 1, "description": "If you accept this job, you may reroll the Danger Pay roll and pick the better of the two rolls." },
            ]               
        }
    },
    {
        key: 'hazard',
        title: 'Hazard',
        tables: {
            default: [
                { "label": "Dangerous Job", "weight": 2, "description": "Increase enemy force numbers by +1." },
                { "label": "Hot Job", "weight": 2, "description": "After the job, you will earn an enemy on 1-2 instead of the normal roll of a 1." },
                { "label": "VIP", "weight": 1, "description": "A random enemy will have +1 Toughness and a final Combat Skill of +2 (regardless of current value)" },
                { "label": "Veteran Opposition", "weight": 1, "description": "Enemy is -1 to panic range." },
                { "label": "Low Priority", "weight": 1, "description": "Reduce enemy force numbers by 1." },
                { "label": "Private Transport", "weight": 3, "description": "If you have Rivals, they cannot track you this campaign turn." },                    
            ]               
        }
    },
    {
        key: 'condition',
        title: 'Condition',
        tables: {
            default: [
                { "label": "Vengeful", "weight": 1, "description": "If the mission fails, the Patron becomes a Rival." },
                { "label": "Demanding", "weight": 2, "description": "Danger pay is only on success." },
                { "label": "Small Squad", "weight": 1, "description": "You cannot deploy more than 4 crew." },
                { "label": "Full Squad", "weight": 1, "description": "You must have 6 available crew." },
                { "label": "Clean", "weight": 1, "description": "You cannot ever have made law enforcement Rivals" },
                { "label": "Busy", "weight": 2, "description": "If the mission succeeds, the Patron offers a new job next campaign turn." },
                { "label": "Onetime Contract", "weight": 1, "description": "This Patron cannot be retained as contact." },
                { "label": "Reputation Required", "weight": 1, "description": "You must have completed a prior Patron job on this world." },
            ]               
        }
    },
    {
        key: 'traderesult',
        title: 'Trade Result',
        tables: {
            default: [
                { "label": "A personal weapon", "weight": 3 },
                { "label": "Sell some cargo", "weight": 3 },
                { "label": "Find something useful", "weight": 3 },
                { "label": "Quality food and booze", "weight": 2 },
                { "label": "Instruction book", "weight": 3 },
                { "label": "Bits of scrap", "weight": 4 },
                { "label": "Medical pack", "weight": 4 },
                { "label": "Worthless trinket", "weight": 2 },
                { "label": "Local maps", "weight": 2 },
                { "label": "Luxury trinket", "weight": 2 },
                { "label": "Basic supplies", "weight": 2 },
                { "label": "Contraband", "weight": 4 },
                { "label": "Gun Upgrade Kit", "weight": 3 },
                { "label": "Useless trinket", "weight": 2 },
                { "label": "Trade goods", "weight": 5 },
                { "label": "Something interesting", "weight": 4 },
                { "label": "Fuel", "weight": 3 },
                { "label": "Spare parts", "weight": 2 },
                { "label": "Tourist garbage", "weight": 2 },
                { "label": "Don't usually see these for sale", "weight": 1 },
                { "label": "Ordinance", "weight": 3 },
                { "label": "Basic firearms", "weight": 3 },
                { "label": "Odd device", "weight": 1 },
                { "label": "Military fuel cell", "weight": 2 },
                { "label": "Hot tip", "weight": 4 },
                { "label": "Insider information", "weight": 2 },
                { "label": "Army surplus", "weight": 4 },
                { "label": "A chance to unload some stuff", "weight": 3 },
                { "label": "A lot of blinking lights", "weight": 3 },
                { "label": "Gently used", "weight": 5 },
                { "label": "Pre-owned", "weight": 5 },
                { "label": "Medical reserves", "weight": 4 },
                { "label": "Starship repair parts", "weight": 5 }
            ]               
        }
    },
    {
        key: 'exploration',
        title: 'Exploration',
        tables: {
            default: [
                { "label": "I know a good deal when I see one", "weight": 3 },
                { "label": "Meet a Patron", "weight": 3 },
                { "label": "Must've been something I ate", "weight": 2 },
                { "label": "Meet someone interesting", "weight": 3 },
                { "label": "Had a nice chat", "weight": 4 },
                { "label": "See the sights, enjoy the view", "weight": 3 },
                { "label": "Make a new friend", "weight": 3 },
                { "label": "Time to relax", "weight": 3 },
                { "label": "Possible bargain", "weight": 4 },
                { "label": "Alien merchant", "weight": 3 },
                { "label": "Got yourself noticed", "weight": 3 },
                { "label": "You hear a tip", "weight": 3 },
                { "label": "Completely Lost", "weight": 3 },
                { "label": "Someone want a package delivered", "weight": 4 },
                { "label": "A tech fanatic offers to help out", "weight": 3 },
                { "label": "Got a few drinks", "weight": 3 },
                { "label": "I don't have a gambling problem!", "weight": 3 },
                { "label": "Overheard someone talk", "weight": 4 },
                { "label": "Pick a fight", "weight": 3 },
                { "label": "Found a trainer", "weight": 4 },
                { "label": "Information broker", "weight": 4 },
                { "label": "Arms dealer", "weight": 3 },
                { "label": "Promising lead", "weight": 4 },
                { "label": "Just needs a little love", "weight": 4 },
                { "label": "Get in a bad fight", "weight": 3 },
                { "label": "Offered a small job", "weight": 4 },
                { "label": "Offered a reward", "weight": 4 },
                { "label": "You make a useful contact", "weight": 4 },
                { "label": "Who left this lying around?", "weight": 2 },
                { "label": "This place is rahter nice, really", "weight": 4 },
            ]               
        }
    }
]