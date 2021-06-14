<template>
  <div>
    <h1>1. Travel (Pg.69)</h1>

    <div class="row row-cols-1 row-cols-md-3 rows-cols-lg-4 g-4"> 
      <div class="col">
        <div class="card">
          <div class="card-header bg-light border-success">
            <h5>Flee Invasion (Pg.69) <i class="fas fa-dice pe-auto d-print-none" @click="resolveFleeInvasion()"></i></h5>
          </div>
          <div class="card-body">            
            <p class="card-text">
              {{getFleeInvasionResult}}
            </p>
          </div>
        </div>
      </div>
    
      <div class="col">
        <div class="card">
          <div class="card-header bg-light border-success">
            <h5>Decide Whether To Travel (Pg.69) <i class="fas fa-dice pe-auto d-print-none" @click="resolveTravelEvent()"></i></h5>
          </div>
          <div class="card-body">                 
            <p class="card-text">
              {{getTravelEventResult}}
            </p>
          </div>
        </div>
      </div>
    
      <div class="col">
        <div class="card">         
          <div class="card-header bg-light border-success">
            <h5>New World Arrival (Pg.72) <i class="fas fa-dice pe-auto d-print-none" @click="resolveNewWorld()"></i></h5>
          </div>
          <div class="card-body">
            <div class="input-group mb-3 input-group-sm">
              <span class="input-group-text" id="rivals-addon">Number of Rivals</span>
              <input type="number" class="form-control" placeholder="0" aria-label="rivals" aria-describedby="rivals-addon" 
                min="0" v-model.number="newWorld.rivalNum" />
            </div>
            <p class="card-text" v-html="getNewWorldResult">              
            </p>
          </div>
        </div>
      </div>
    </div>      
</div>
   
</template>

<script>
import { FPFHTables } from '../js/tables.js';

export default {
  name: 'Travel',  
  components: {    
  },
  mounted() {
     
  }, 
  data() {
    return {
      fleeInvasion : {       
        roll: 0,
        hasRolled: false,
      },
      travelEvent : {
        hasRolled: false,
        result: "",
      },
      newWorld : {
        hasRolled: false,
        result: "",
        rivalNum: 0,
        rivalsRolls: [],
        licenseRoll: 0,
        licenseCredits: 0,
      },
    }
  },  
  tables: new FPFHTables(),
  computed : {    
    username: function() {
      return this.$store.state.user.username;
    },
    getFleeInvasionResult() {
      if (!this.fleeInvasion.hasRolled) {
        return "Waiting on roll..."
      }
      const roll = this.fleeInvasion.roll;     
      
      let result = `Rolled ${roll}: `;
      if (roll >= 8) {
        result += "You safely get off-world."; 
      }
      else {       
       result += "You have failed. Assign equipment and proceed to Battle!";
      }       
      return result;
    },
    getTravelEventResult() {
      if (!this.travelEvent.hasRolled) {
        return "Waiting on roll..."
      }      
      return `${this.travelEvent.result} (Pg.70)`;
    },
    getNewWorldResult() {
      if (!this.newWorld.hasRolled) {
        return "Waiting on roll..."
      }  

      let result = "<div class='d-flex flex-column mt-3'><h6>1. Check for rivals</h6>";
      let rivalRolls = this.newWorld.rivalsRolls;
      if (rivalRolls.length > 0) {      
        for(let i=0;i<rivalRolls.length;i++){
          result+= `<div>Rival ${i+1} ${rivalRolls[i] >= 6 ? 'followed you!' : 'did not follow you.'}</div>`;
        }
      } else {
        result+= "<div>You have no rivals. Lucky you!</div>";
      }
      result += "</div>"

      result += "<div class='d-flex flex-column mt-3'><h6>2. Dismiss Patrons</h6><div>Dismiss all patrons that are not persistent.</div></div>";

      result += "<div class='d-flex flex-column mt-3'><h6>3. Check for licensing</h6><div>";      
      result+= `<div>World ${this.newWorld.licenseRoll >= 5 ? 'requires a license which costs ' + this.newWorld.licenseCredits + ' credits.' : 'does not require a license.'}</div>`;
      result += "</div>"

      result += "<div class='d-flex flex-column mt-3'><h6>4. World Traits</h6><div>TBD</div></div>";

      return result;
    }
  },
  methods: { 
    rollDice(dice) {
      const roll = this.$options.tables.Roll(dice);      
      this.$root.showUserMsg(`Rolled ${dice}`);
      return roll;   
    }, 
    resolveFleeInvasion() {      
      const dice = `2d6`;

      const roll = this.rollDice(dice);
      this.fleeInvasion.roll = roll;
      this.fleeInvasion.hasRolled = true;
    },

    resolveTravelEvent() {      
      let result = this.$options.tables.GetFullTableResult("starshiptravelevent");            
      this.travelEvent.hasRolled = true;
      this.travelEvent.result = result[0].result;
    },
    resolveNewWorld() {
      const dice = `1d6`;
      if (this.newWorld.rivalNum > 0) {
        this.newWorld.rivalsRolls = [];
        for(let i=1;i<=this.newWorld.rivalNum;i++)
        {
          this.newWorld.rivalsRolls.push(this.rollDice(dice));        
        }
      }
      this.newWorld.licenseRoll = this.rollDice(dice);    
      this.newWorld.licenseCredits = this.rollDice(dice);

      this.newWorld.hasRolled = true;
    }

  }
}
</script>

<style scoped>
  label {
    font-weight: 700;
  }  

  .col { 
    page-break-inside: avoid;
  }
</style>
