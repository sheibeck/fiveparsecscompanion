<template>
  <div>
    <h1>1. Travel (Pg.69)</h1>

    <div class="row row-cols-1 row-cols-md-3 rows-cols-lg-4 g-4"> 
      <div class="col">
        <div class="card" v-for="(step, index) in steps" :key="index">
          <div class="card-header bg-light border-success">
            <h5><button type="button" class="btn btn-link" @click="setActiveStep(steps[index])">{{step.stepDetails.title}} (Pg.{{step.stepDetails.pageNumber}})</button></h5>
          </div>
        </div>      
      </div>

      <div v-if="activeStep" class="col">
        <div class="card">
          <h6>{{activeStep.stepDetails.title}} Results</h6>
          <div class="card-body" v-for="(input, index) in activeStep.inputs" :key="index">
            <div v-if="input.inputType == 2">
              <i class="fas fa-dice pe-auto d-print-none fa-2x" @click="activeStep.processInput(input, $event)"></i> {{input.text}}
            </div>
            <div v-if="input.inputType == 4">
              <i class="fas fa-dice pe-auto d-print-none fa-2x" @click="activeStep.processInput(input, $event)"></i> {{input.text}}
            </div>   

            <div v-if="input.inputType == 3" class="input-group mb-3 input-group-sm">
              <span class="input-group-text" id="rivals-addon">{{input.text}}</span>
              <input type="number" class="form-control" placeholder="0" :aria-label="input.text" 
                min="0" v-model.number="input.value" />
            </div>
            <div v-if="input.inputType == 1" class="input-group mb-3 input-group-sm">
              <div class="input-group-text">
                <input class="form-check-input mt-0" type="checkbox" value="" :aria-label="input.text" 
                  v-model="input.value" />
              </div>
              <span class="input-group-text" id="savvy-addon">WildGalaxy</span>
            </div>
          </div>
          <div class="card-header">
            <i class="fas fa-sync-alt pe-auto d-print-none fa-2x" @click="resolveActiveStep"></i> Update Result
          </div>
          <div class="card-body" v-html="activeStep.results">
          </div>
          <div class="card-footer" v-html="activeStep.breakdown">
            
          </div>
        </div>
      </div>  
      <div v-else>
        <div class="card">
          <h6>Select a step.</h6>
        </div>
      </div>  
    </div>
</div>
   
</template>

<script>
import { FPFHTables } from '../js/tables.js';
import { FiveParsecsStepResult }  from '../js/fiveParsecs';
import { Step, SubStep } from "../js/fiveParsecsEnums";

export default {
  name: 'Travel',  
  components: {    
  },
  mounted() {   
  }, 
  data() {
    return {
      activeStep: null,
      steps: [
        new FiveParsecsStepResult(Step.Travel, SubStep.FleeInvasion, this),
        new FiveParsecsStepResult(Step.Travel, SubStep.DecideToTravel, this),
        new FiveParsecsStepResult(Step.Travel, SubStep.NewWorldArrival, this),    
      ]
    }
  },  
  tables: new FPFHTables(),
  computed : {    
    username: function() {
      return this.$store.state.user.username;
    },
  },
  methods: {       
    setActiveStep(step) {
      this.activeStep = step;
    },
    resolveActiveStep() {
      this.activeStep.processStep(this);
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

  
  .fa-dice {
    -moz-transition: all .5s linear;
    -webkit-transition: all .5s linear;
    transition: all .5s linear;
  }
  .fa-dice.roll {
      -moz-transform:rotate(360deg);
      -webkit-transform:rotate(360deg);
      transform:rotate(360deg);
  }
</style>
