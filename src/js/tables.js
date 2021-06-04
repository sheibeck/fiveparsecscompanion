import Randomizer from 'rpg-table-randomizer/src/randomizer.js';
import RandomTable from 'rpg-table-randomizer/src/random_table.js';
import random_name from 'rpg-table-randomizer/src/random_name.js';
import names from 'rpg-table-randomizer/sample/names.js';

export class FPFHTables {
    constructor() {
        this.init();
    }

    randomizer = new Randomizer({});    
    tables = {};

    init() {
        this.randomizer.setTableKeyLookup(function(key) {
            return this.tables[key] || null;
        });

        random_name.setNameData(names);
        random_name.setRandomizer(this.randomizer);

        const crewTypeTable = {
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
        };
        this.tables[crewTypeTable.key] = crewTypeTable;

        const backgroundTable = {
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
        };
        this.tables[backgroundTable.key] = backgroundTable;
    }
     
    Roll(key) {        
        const table = new RandomTable(this.tables[key]);
        const result = this.randomizer.getTableResult(table);        
        return result[result.length-1].result;
    }

    RandomName() {
        return random_name.selectName();
    }
}
