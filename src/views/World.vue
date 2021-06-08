<template>
  <div>
    <h1>2. World (Pg.76)</h1>

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
          <div class="accordion" id="accordianTasks">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingPatron">
                <button class="accordion-button collapsed" type="headingPatron" data-bs-toggle="collapse" data-bs-target="#collapsePatron" aria-expanded="false" aria-controls="collapsePatron">                  
                  Find Patron (Pg.77)
                </button>
              </h2>
              <div id="collapsePatron" class="accordion-collapse collapse" aria-labelledby="headingPatron" data-bs-parent="#accordianTasks">
                <div class="accordion-body">
                  <div class="col d-flex flex-column">
                    <div class="mb-3 text-center">
                      <i class="fas fa-dice me-1 mt-1 d-print-none fa-2x" @click="findPatron()"></i>
                    </div>
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
                </div>
              </div>
            </div>

            <div class="accordion-item">
                <h2 class="accordion-header" id="headingTrain">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTrain" aria-expanded="false" aria-controls="collapseTrain">                  
                  Train (Pg.77)
                </button>
              </h2>
              <div id="collapseTrain" class="accordion-collapse collapse" aria-labelledby="headingTrain" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <div class="col d-flex flex-column">
                    Earn 1 XP
                  </div>
                </div>
              </div>
            </div>

            <div class="accordion-item">
                <h2 class="accordion-header" id="headingTrade">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTrade" aria-expanded="false" aria-controls="collapseTrade">                  
                  Trade (Pg.78, 79)
                </button>
              </h2>
              <div id="collapseTrade" class="accordion-collapse collapse" aria-labelledby="headingTrade" data-bs-parent="#accordianTasks">
                <div class="accordion-body">
                   <div class="mb-3 text-center">
                      <i class="fas fa-dice me-1 mt-1 d-print-none fa-2x" @click="findTrade()"></i>
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
                </div>
              </div>
            </div>

            <div class="accordion-item">
                <h2 class="accordion-header" id="headingRecruit">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseRecruit" aria-expanded="false" aria-controls="collapseRecruit">                  
                  Recruit (Pg.78)
                </button>
              </h2>
              <div id="collapseRecruit" class="accordion-collapse collapse" aria-labelledby="headingRecruit" data-bs-parent="#accordianTasks">
                <div class="accordion-body">
                  <div class="mb-3 text-center">
                    <i class="fas fa-dice me-1 mt-1 d-print-none fa-2x" @click="findRecruit()"></i>
                  </div>
                  <div class="col d-flex flex-column">
                    <div class="input-group mb-3 input-group-sm">
                      <span class="input-group-text" id="crew-addon">Crew looking</span>
                      <input type="number" class="form-control" placeholder="0" aria-label="Crew looking" aria-describedby="crew-addon" 
                        min="0" v-model.number="crewTasks.find(t => t.task === 'recruit').numCrew" />
                    </div>
                    <label>{{getRecruitResult}}</label>
                  </div>
                </div>
              </div>
            </div>

            <div class="accordion-item">
                <h2 class="accordion-header" id="headingExplore">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExplore" aria-expanded="false" aria-controls="collapseExplore">                  
                  Explore (Pg.78, 80)
                </button>
              </h2>
              <div id="collapseExplore" class="accordion-collapse collapse" aria-labelledby="headingExplore" data-bs-parent="#accordianTasks">
                <div class="accordion-body">
                  <div class="mb-3 text-center">
                    <i class="fas fa-dice me-1 mt-1 d-print-none fa-2x" @click="findExploration()"></i>
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
                </div>
              </div>
            </div>

            <div class="accordion-item">
                <h2 class="accordion-header" id="headingTrack">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTrack" aria-expanded="false" aria-controls="collapseTrack">                  
                  Track (Pg.78, 80)
                </button>
              </h2>
              <div id="collapseTrack" class="accordion-collapse collapse" aria-labelledby="headingTrack" data-bs-parent="#accordianTasks">
                <div class="accordion-body">
                  <div class="mb-3 text-center">
                    <i class="fas fa-dice me-1 mt-1 d-print-none fa-2x" @click="trackRival()"></i>
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
                </div>
              </div>
            </div>

            <div class="accordion-item">
                <h2 class="accordion-header" id="headingRepair">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseRepair" aria-expanded="false" aria-controls="collapseRepair">                  
                  Repair (Pg.78)
                </button>
              </h2>
              <div id="collapseRepair" class="accordion-collapse collapse" aria-labelledby="headingRepair" data-bs-parent="#accordianTasks">
                <div class="accordion-body">
                  <div class="mb-3 text-center">
                    <i class="fas fa-dice me-1 mt-1 d-print-none fa-2x" @click="repairItem()"></i>
                  </div>
                  <div class="col d-flex flex-column">
                    <div class="input-group mb-3 input-group-sm">
                      <span class="input-group-text" id="savvy-addon">Savvy</span>
                      <input type="number" class="form-control" placeholder="0" aria-label="savvy" aria-describedby="savvy-addon" 
                        min="0" v-model.number="crewTasks.find(t => t.task === 'repair').savvy" />
                    </div>
                    <div class="input-group mb-3">
                      <div class="input-group-text">
                        <input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" 
                          v-model="crewTasks.find(t => t.task === 'repair').isEngineer" />
                      </div>
                      <span class="input-group-text" id="savvy-addon">Is Engineer?</span>
                    </div>
                    <div class="input-group mb-3 input-group-sm">
                      <span class="input-group-text" id="credits-addon">Spend Credits</span>
                      <input type="number" class="form-control" placeholder="0" aria-label="Credits" aria-describedby="credits-addon" 
                        min="0" v-model.number="crewTasks.find(t => t.task === 'repair').credits" />
                    </div>
                    <label>{{getRepairResults}}</label>
                  </div>
                </div>
              </div>
            </div>

            <div class="accordion-item">
                <h2 class="accordion-header" id="headingDecoy">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDecoy" aria-expanded="false" aria-controls="collapseDecoy">                  
                  Decoy (Pg.78)
                </button>
              </h2>
              <div id="collapseDecoy" class="accordion-collapse collapse" aria-labelledby="headingDecoy" data-bs-parent="#accordianTasks">
                <div class="accordion-body">                  
                  <div class="col d-flex flex-column">                   
                    <div class="">
                      See <strong>Choose Battle</strong> step
                    </div>
                  </div>
                </div>
              </div>
            </div>

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
            <h5>
              5. Resolve Rumors
              <i class="fas fa-dice pe-auto d-print-none" @click="resolveAnyRumors()"></i>
            </h5>
          </div>
          <div class="card-body">

            <div class="input-group mb-3 input-group-sm">
              <span class="input-group-text" id="savvy-addon">Total Rumors (Pg.85)</span>
              <input type="number" class="form-control" placeholder="0" aria-label="savvy" aria-describedby="savvy-addon" 
                min="0" v-model.number="resolveRumors.totalRumors" />
            </div>           
            <label>{{getResolveRumorsResults}}</label>

          </div>
        </div>
      </div>

      <div class="col">
        <div class="card">
          <div class="card-header bg-light border-success">
            <h5>6. Choose Battle</h5>
          </div>
         
          <div class="accordion" id="accordianBattle">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingCheckRivals">
                <button class="accordion-button collapsed" type="headingRivals" data-bs-toggle="collapse" data-bs-target="#collapseRivals" aria-expanded="false" aria-controls="collapseRivals">                  
                  Check for Rivals (Pg.85)
                </button>
              </h2>
              <div id="collapseRivals" class="accordion-collapse collapse" aria-labelledby="headingRivals" data-bs-parent="#accordianBattle">
                <div class="accordion-body">
                  <div class="col d-flex flex-column">
                    <div class="mb-3 text-center">
                      <i class="fas fa-dice me-1 mt-1 d-print-none fa-2x" @click="checkForRivals()"></i>
                    </div>
                    <div class="input-group mb-3 input-group-sm">
                      <span class="input-group-text" id="decoy-addon">Total decoys</span>
                      <input type="number" class="form-control" placeholder="0" aria-label="Decoys" aria-describedby="decoy-addon" 
                        min="0" v-model.number="checkRivals.totalDecoys" />                      
                    </div>

                    <div class="input-group mb-3 input-group-sm">
                      <span class="input-group-text" id="totalrivals-addon">Total rivals</span>
                      <input type="number" class="form-control" placeholder="0" aria-label="Total Rivals" aria-describedby="totalrivals-addon" 
                        min="0" v-model.number="checkRivals.totalRivals" />                      
                    </div>

                    <label>{{getCheckForRivalsResults}}</label>
                  </div>
                </div>
              </div>
            </div>
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
        {label: "Repair", task: "repair", roll: 0, savvy: 0, isEngineer: false, credits: 0, hasRolled: false },
        {label: "Decoy", task: "decoy", number: 0 },
      ],
      resolveRumors : {
        totalRumors: 0,
        roll: 0,
        hasRolled: false,
      },
      checkRivals : {
        totalRivals: 0,
        totalDecoys: 0,
        roll: 0,
        hasRolled: false,
      }
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
    getRepairResults() {
      const repair = this.crewTasks.find(t => t.task === 'repair');
      if (!repair.hasRolled) {
        return "Waiting on roll..."
      }
      const roll = repair.roll;
      const credits = repair.credits;
      const isEngineer = repair.isEngineer ? 1 : 0;      
      const savvy = repair.savvy;
      const finalResult = roll + savvy + isEngineer + credits;

      let result = `Rolled ${roll} (+ ${savvy} savvy + ${isEngineer} engineer + ${credits} credits): `;
      if (roll == 1) {
        result = "Rolled natural 1. Item destroyed!"; 
      }
      else {
        if (finalResult >= 6) {
          result += "Repair successful!";
        }        
        else {
          result += "Failed!";
        } 
      }
      return result;
    },
    getResolveRumorsResults() {     
      if (!this.resolveRumors.hasRolled) {
        return "Waiting on roll..."
      }
      const roll = this.resolveRumors.roll;     
      
      let result = `Rolled ${roll}: `;
      if (roll <= this.resolveRumors.totalRumors) {
        result += "Quest Found!"; 
      }
      else {       
       result += "No quest found.";
      }       
      return result;
    },
    getCheckForRivalsResults() {     
      if (!this.checkRivals.hasRolled) {
        return "Waiting on roll..."
      }
      const roll = this.checkRivals.roll;
      const decoys = this.checkRivals.totalDecoys;
      const finalResult = roll + decoys;
      
      let result = `Rolled ${roll} (+ ${decoys} decoys): `;
      if (finalResult <= this.checkRivals.totalRivals) {
        result += "A rival has tracked you down!"; 
      }
      else {       
       result += "No rivals have found you.";
      }       
      return result;
    },
  },
  methods: {
    rerollTable(table) {
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
    repairItem() {
      let repair = this.crewTasks.find(t => t.task === 'repair');
      const dice = `1d6`;

      const roll = this.rollDice(dice);
      repair.roll = roll;
      repair.hasRolled = true;
    },
    resolveAnyRumors() {      
      const dice = `1d6`;

      const roll = this.rollDice(dice);
      this.resolveRumors.roll = roll;
      this.resolveRumors.hasRolled = true;
    },
    checkForRivals() {
      const dice = `1d6`;

      const roll = this.rollDice(dice);
      this.checkRivals.roll = roll;
      this.checkRivals.hasRolled = true;
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
