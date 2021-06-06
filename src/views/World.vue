<template>
  <div>
    <h1>2. World (P.76)</h1>

    <div class="row row-cols-1 row-cols-md-3 rows-cols-lg-4 g-4"> 
           
      <div class="col">
        <div class="card">
          <div class="card-header bg-light border-success">
            <h5>1. Upkeep/Ship Repairs</h5>
          </div>
          <div class="card-body">            
            <p class="card-text">
              <ul class="list-group">
                <li class="d-flex list-group-item bg-light">
                  <div class="col-4">                    
                    <label class="">1-6 Crew</label>
                  </div>
                  <div class="col">            
                    1 credit
                  </div>
                </li>
                <li class="d-flex list-group-item">
                  <div class="col-4">                    
                    <label class="">7+ Crew</label>
                  </div>
                  <div class="col">            
                    +1 credit per member past 6
                  </div>
                </li>
              </ul>
            </p>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card">
          <div class="card-header bg-light border-success">
            <h5>2. Assign Crew Tasks</h5>
          </div>
          <div class="card-body">   
            <p class="card-text">
              <ul class="list-group">
                <li class="d-flex list-group-item bg-light">
                  <div class="col-5 d-flex flex-column">
                    <div>
                      <i class="fas fa-dice me-1 mt-1 d-print-none" @click="findPatron()"></i>
                      <label class="">Find Patron:</label>
                    </div>
                    <small>(Pg.77)</small>
                  </div>
                  <div class="col d-flex flex-column">
                    <div class="input-group mb-3 input-group-sm">
                      <span class="input-group-text" id="crew-addon">Crew looking</span>
                      <input type="number" class="form-control" placeholder="0" aria-label="Crew looking" aria-describedby="crew-addon" 
                        min="0" v-model.number="crewTasks.find(t => t.task === 'patron').numCrew" />
                    </div>                                
                    <div class="input-group mb-3 input-group-sm">
                      <span class="input-group-text" id="contacts-addon">Enter Contacts</span>
                      <input type="number" class="form-control" placeholder="0" aria-label="Contacts" aria-describedby="contacts-addon" 
                        min="0" v-model.number="crewTasks.find(t => t.task === 'patron').contacts" />
                    </div>
                    <div class="input-group mb-3 input-group-sm">
                      <span class="input-group-text" id="credits-addon">Spend Credits</span>
                      <input type="number" class="form-control" placeholder="0" aria-label="Contacts" aria-describedby="credits-addon" 
                        min="0" v-model.number="crewTasks.find(t => t.task === 'patron').credits" />
                    </div>
                    <label>{{getFindPatronResult}}</label>
                  </div>
                </li>
                <li class="d-flex list-group-item bg-light">
                  <div class="col-5 d-flex flex-column">
                    <div>                     
                      <label class="">Train</label>                      
                    </div>
                    <small>(Pg.77)</small>
                  </div>
                  <div class="col d-flex flex-column"> 
                    Earn 1 XP 
                  </div>
                </li>
                <li class="d-flex list-group-item bg-light">
                  <div class="col-5 d-flex flex-column">
                    <div>
                      <i class="fas fa-dice me-1 mt-1 d-print-none" @click="findTrade()"></i>
                      <label class="">Trade</label>
                    </div>
                    <small>(Pg.78, 79)</small>
                  </div>
                  <div class="col d-flex flex-column">
                    <div class="input-group mb-3 input-group-sm">
                      <span class="input-group-text" id="trade-addon">Total rolls</span>
                      <input type="number" class="form-control" placeholder="0" aria-label="Trade rolls" aria-describedby="trade-addon" 
                        min="0" v-model.number="crewTasks.find(t => t.task === 'trade').rolls" />
                    </div>
                    <label v-if="!crewTasks.find(t => t.task === 'trade').hasRolled">Waiting on roll ...</label>
                    <ul v-else>
                      <li v-for="(item, idx) in crewTasks.find(t => t.task === 'trade').items" :key="idx">
                        {{item}}
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="d-flex list-group-item bg-light">
                  <div class="col-5 d-flex flex-column">
                    <div>
                      <i class="fas fa-dice me-1 mt-1 d-print-none" @click="findRecruit()"></i>
                      <label class="">Recruit</label>
                    </div>
                    <small>(Pg.78)</small>
                  </div>
                  <div class="col d-flex flex-column">
                     <div class="input-group mb-3 input-group-sm">
                      <span class="input-group-text" id="crew-addon">Crew looking</span>
                      <input type="number" class="form-control" placeholder="0" aria-label="Crew looking" aria-describedby="crew-addon" 
                        min="0" v-model.number="crewTasks.find(t => t.task === 'recruit').numCrew" />
                    </div>
                    <label>{{getRecruitResult}}</label>
                  </div>
                </li>
                <li class="d-flex list-group-item bg-light">
                 <div class="col-5 d-flex flex-column">
                    <div>
                      <i class="fas fa-dice me-1 mt-1 d-print-none" @click="findExploration()"></i>
                      <label class="">Explore</label>
                    </div>
                    <small>(Pg.78, 80)</small>
                  </div>
                  <div class="col d-flex flex-column">
                    <div class="input-group mb-3 input-group-sm">
                      <span class="input-group-text" id="explore-addon">Total rolls</span>
                      <input type="number" class="form-control" placeholder="0" aria-label="Explore rolls" aria-describedby="explore-addon" 
                        min="0" v-model.number="crewTasks.find(t => t.task === 'explore').rolls" />
                    </div>
                    <label v-if="!crewTasks.find(t => t.task === 'explore').hasRolled">Waiting on roll ...</label>
                    <ul v-else>
                      <li v-for="(item, idx) in crewTasks.find(t => t.task === 'explore').items" :key="idx">
                        {{item}}
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="d-flex list-group-item bg-light">
                  <div class="col-5 d-flex flex-column">
                    <div>
                      <i class="fas fa-dice me-1 mt-1 d-print-none" @click="trackRival()"></i>
                      <label class="">Track</label>
                    </div>
                    <small>(Pg.78)</small>                 
                  </div>
                  <div class="col d-flex flex-column">                                
                    <div class="input-group mb-3 input-group-sm">
                      <span class="input-group-text" id="crew-addon">Crew looking</span>
                      <input type="number" class="form-control" placeholder="0" aria-label="Crew looking" aria-describedby="crew-addon" 
                        min="0" v-model.number="crewTasks.find(t => t.task === 'track').numCrew" />
                    </div>
                    <div class="input-group mb-3 input-group-sm">
                      <span class="input-group-text" id="credits-addon">Spend Credits</span>
                      <input type="number" class="form-control" placeholder="0" aria-label="Credits" aria-describedby="credits-addon" 
                        min="0" v-model.number="crewTasks.find(t => t.task === 'track').credits" />
                    </div>
                    <label>{{getTrackResults}}</label>
                  </div>                 
                </li>
                <li class="d-flex list-group-item bg-light">
                  <div class="col-5 d-flex flex-column">
                    <div>
                      <i class="fas fa-dice me-1 mt-1 d-print-none"></i>
                      <label class="">Repair</label>
                    </div>
                    <small>(Pg.78)</small>                  
                  </div>
                  <div class="col d-flex flex-column">
                    TBD
                  </div>
                </li>
                <li class="d-flex list-group-item bg-light">
                  <div class="col-5 d-flex flex-column">
                    <div>                      
                      <label class="">Decoy</label>
                    </div>
                    <small>(Pg.78)</small>                    
                  </div>
                  <div class="col d-flex flex-column">
                    <div class="input-group mb-3 input-group-sm">
                      <span class="input-group-text" id="decoy-addon">Total decoys</span>
                      <input type="number" class="form-control" placeholder="0" aria-label="Decoys" aria-describedby="decoy-addon" 
                        min="0" v-model.number="crewTasks.find(t => t.task === 'decoy').number" />
                    </div>
                  </div>
                </li>
              </ul>
            </p>         
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card">
          <div class="card-header bg-light border-success">
            <h5>3. Job Offers <i class="fas fa-dice pe-auto d-print-none" @click="findJob()"></i></h5>
          </div>
          <div class="card-body">            
            <p class="card-text">
              <label v-if="jobOffer.length == 0">Waiting on roll ...</label>
              <ul v-else class="list-group">
                <li v-for="(step, idx) in jobOffer" :key="idx" class="d-flex list-group-item" :class="{'bg-light': idx%2 == 0}">
                  <div class="col-4">
                    <i class="fas fa-dice me-1 mt-1 d-print-none" @click="rerollTable(step.id)"></i>
                    <label class="">{{step.label}}:</label>
                  </div>
                  <div class="col">            
                    <span class="">{{step.result.result}}</span>                  
                    <span v-if="step.result.desc" class="mb-1 fst-italic"> ({{step.result.desc}})</span>
                  </div>
                </li>
              </ul>
            </p>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card">
          <div class="card-header bg-light border-success">
            <h5>4. Assign Equipment</h5>
          </div>
          <div class="card-body">
            Assign equipment to your crew (Pg.85)            
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card">
          <div class="card-header bg-light border-success">
            <h5>5. Resolve Rumors</h5>
          </div>
          <div class="card-body">            
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card">
          <div class="card-header bg-light border-success">
            <h5>6. Choose Battle</h5>
          </div>
          <div class="card-body">            
          </div>
        </div>
      </div>


    </div>  
</div>
   
</template>

<script>
import { FPFHTables } from '../js/tables.js';

export default {
  name: 'World',  
  components: {    
  },
  mounted() {    
  }, 
  data() {
    return {
      jobOffer: [],
      crewTasks: [
        {label: "Patron", task: "patron", numCrew: 0, contacts: 0, credits: 0, roll: 0, hasRolled: false },
        {label: "Train", task: "train" },
        {label: "Trade", task: "trade", items: [], rolls: 0, hasRolled: false },
        {label: "Recruit", task: "recruit", roll: 0, numCrew: 0, hasRolled: false },
        {label: "Explore", task: "explore", items: [], rolls: 0, hasRolled: false },
        {label: "Track", task: "track", roll: 0, numCrew: 0, credits: 0, hasRolled: false },
        {label: "Repair", task: "repair" },
        {label: "Decoy", task: "decoy", number: 0 },
      ]
    }
  },  
  tables: new FPFHTables(),
  computed : {    
    username: function() {
      return this.$store.state.user.username;
    },
    getFindPatronResult() {
      if (!this.crewTasks.find(t => t.task === 'patron').hasRolled) {
        return "Waiting on roll..."
      }

      const roll = this.crewTasks.find(t => t.task === 'patron').roll;
      const credits = this.crewTasks.find(t => t.task === 'patron').credits;
      const contacts = this.crewTasks.find(t => t.task === 'patron').contacts;
      const crew = this.crewTasks.find(t => t.task === 'patron').numCrew;
      const finalResult = roll + contacts + credits;

      let result = `Rolled ${roll} (+ ${crew} crew + ${contacts} contacts + ${credits} credits): `;
      if (finalResult >= 6) {
        result += "Found 2 Patrons.";
      }
      else if (finalResult >= 5) {
        result += "Found a Patron.";
      }
      else {
        result += "Failed!";
      } 
      return result;
    },
    getRecruitResult() {
      if (!this.crewTasks.find(t => t.task === 'recruit').hasRolled) {
        return "Waiting on roll..."
      }

      const roll = this.crewTasks.find(t => t.task === 'recruit').roll;
      const crew = this.crewTasks.find(t => t.task === 'recruit').numCrew;
      const finalResult = roll + crew;

      let result = `Rolled ${roll} (+${crew} crew): `;
      if (finalResult >= 6) {
        result += "Recruitment successful!";
      }     
      else {
        result += "Failed!";
      } 
      return result;
    },
    getTrackResults() {
      if (!this.crewTasks.find(t => t.task === 'track').hasRolled) {
        return "Waiting on roll..."
      }

      const roll = this.crewTasks.find(t => t.task === 'track').roll;
      const numCrew = this.crewTasks.find(t => t.task === 'track').numCrew;
      const credits = this.crewTasks.find(t => t.task === 'track').credits;
      const finalResult = roll + numCrew + credits;

      let result = `Rolled ${roll} (+ ${numCrew} crew + ${credits} credits): `;
      if (finalResult >= 6) {
        result += "Found a Rival.";
      }      
      else {
        result += "Failed!";
      } 
      return result;
    },
  },
  methods: {            
    rerollTableTable(table) {
      const roll = this.$options.tables.GetFullTableResult(table);
      let jobLine = this.jobOffer.find( o => o.id === table);     
      jobLine.result = roll[0];

      this.$root.showUserMsg(`Re-rolled ${table}`);
    },
    rollDice(dice) {
      const roll = this.$options.tables.Roll(dice);      
      this.$root.showUserMsg(`Rolled ${dice}`);
      return roll;   
    },
    findJob() {   
      this.jobOffer = [];

      let result = this.$options.tables.GetFullTableResult("patron");      
      this.jobOffer.push({ id: "patron", label: "Patron", result: result[0] });
      
      result = this.$options.tables.GetFullTableResult("dangerpay");
      this.jobOffer.push({ id: "dangerpay", label: "Danger Pay", result: result[0] });
      
      result = this.$options.tables.GetFullTableResult("timeframe");
      this.jobOffer.push({ id: "timeframe", label: "Time Frame", result: result[0] });

      result = this.$options.tables.GetFullTableResult("benefit");
      this.jobOffer.push({ id: "benefit", label: "Benefit", result: result[0] });
      
      result = this.$options.tables.GetFullTableResult("hazard");
      this.jobOffer.push({ id: "hazard", label: "Hazard", result: result[0] });
      
      result = this.$options.tables.GetFullTableResult("condition");
      this.jobOffer.push({ id: "condition", label: "Condition", result: result[0] });

      this.$root.showUserMsg(`Created job offer`);
    },
    findPatron() {
      let patron = this.crewTasks.find(t => t.task === 'patron');
      if (patron.numCrew == 0) {
        return;
      }

      const dice = `1d6`;

      const roll = this.rollDice(dice);
      patron.roll = roll;
      patron.hasRolled = true;
    },
    findTrade() {
      let trade = this.crewTasks.find(t => t.task === 'trade');
      let numRolls = trade.rolls;

      if (numRolls > 0) {
        let items = [];
        for(var i = 0; i < numRolls; i++) {
          let result = this.$options.tables.GetTableResult("traderesult");
          items.push(result);
        }
        trade.items = items;
        trade.hasRolled = true;
      }
    },
    findRecruit() {      
      let recruit = this.crewTasks.find(t => t.task === 'recruit');
      if (recruit.numCrew == 0) {
        return;
      }

      const dice = `1d6`;

      const roll = this.rollDice(dice);
      recruit.roll = roll;
      recruit.hasRolled = true;
    },
    findExploration() {
      let explore = this.crewTasks.find(t => t.task === 'explore');
      let numRolls = explore.rolls;

      if (numRolls > 0) {
        let items = [];
        for(var i = 0; i < numRolls; i++) {
          let result = this.$options.tables.GetTableResult("exploration");
          items.push(result);
        }
        explore.items = items;
        explore.hasRolled = true;
      }
    },
    trackRival() {
      let track = this.crewTasks.find(t => t.task === 'track');
      if (track.numCrew == 0) {
        return;
      }

      const dice = `1d6`;

      const roll = this.rollDice(dice);
      track.roll = roll;
      track.hasRolled = true;
    },
    
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

  input[type=number] {
    text-align: center;
  }  
</style>
