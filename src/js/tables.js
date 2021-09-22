import Randomizer from 'rpg-table-randomizer/src/randomizer.js';
import RandomTable from 'rpg-table-randomizer/src/random_table.js';
import random_name from 'rpg-table-randomizer/src/random_name.js';
import names from './names.js';
import shipnames from './shipnames.js';
import worldnames from './worldnames.js';

import { travelTables } from './tablesTravel';
import { worldTables } from './tablesWorld';
import { battleTables } from './tablesBattle';
import { postBattleTables } from './tablesPostBattle';


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
         
        postBattleTables.forEach((table) =>  {
            this.tables[table.key] = table;
        });           
    }
     
    GetTableResult(key, subtable) {
        const table = new RandomTable(this.tables[key]);
        const result = subtable ? this.randomizer.getTableResult(table, subtable) : this.randomizer.getTableResult(table);        
        return result[result.length-1].result;
    }

    Roll(dice) {
        return this.randomizer.roll(dice);
    }

    GetFullTableResult(key, subtable) {        
        const table = new RandomTable(this.tables[key]);
        const result = subtable ? this.randomizer.getTableResult(table, subtable) : this.randomizer.getTableResult(table);
        return result;
    }

    RandomName() {
        random_name.setNameData(names);        
        return random_name.selectName();
    }

    RandomShipName() {
        random_name.setNameData(shipnames);
        return random_name.selectName("ship", "female", "fullname");
    }

    RandomWorldName() {
        random_name.setNameData(worldnames);
        const prefix = random_name.selectName("prefix", "male", "first");
        const part1 = random_name.selectName("world", "male", "first");
        let part2 = random_name.selectName("world", "female");
        part2 = part2.charAt(0).toLowerCase() + part2.slice(1);
        
        return `${prefix ? prefix + " " : ""}${part1}${part2}`;
    }
}

