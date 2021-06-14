import Randomizer from 'rpg-table-randomizer/src/randomizer.js';
import RandomTable from 'rpg-table-randomizer/src/random_table.js';
import random_name from 'rpg-table-randomizer/src/random_name.js';
import names from 'rpg-table-randomizer/sample/names.js';

import { travelTables } from './tablesTravel';
import { worldTables } from './tablesWorld';
import { battleTables } from './tablesBattle';


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

        travelTables.forEach((table) =>  {
            this.tables[table.key] = table;
        });

        worldTables.forEach((table) =>  {
            this.tables[table.key] = table;
        });

        battleTables.forEach((table) =>  {
            this.tables[table.key] = table;
        });            
    }
     
    GetTableResult(key) {        
        const table = new RandomTable(this.tables[key]);
        const result = this.randomizer.getTableResult(table);        
        return result[result.length-1].result;
    }

    Roll(dice) {
        return this.randomizer.roll(dice);
    }

    GetFullTableResult(key) {        
        const table = new RandomTable(this.tables[key]);
        const result = this.randomizer.getTableResult(table);        
        return result;
    }

    RandomName() {
        return random_name.selectName();
    }
}

