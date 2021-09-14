<template>
  <div>
    <h1>4. Post-Battle (Pg.119)</h1>

    <div class="row row-cols-1 row-cols-md-3 rows-cols-lg-4 g-4"> 
      <div class="col">
        <div class="card" v-for="(step, index) in steps" :key="index">
          <div class="card-header bg-light border-success">
            <h5><button type="button" class="btn btn-link" @click="setActiveStep(steps[index])">{{step.stepDetails.title}} (Pg.{{step.stepDetails.pageNumber}})</button></h5>
          </div>
        </div>      
      </div>

     <StepDetails :activeStep="activeStep" />
            
    </div>  
</div>
   
</template>

<script>
import { FPFHTables } from '../js/tables.js';
import { CampaignStepResult, StepInputType }  from '../js/fiveParsecs';
import { Step, SubStep } from "../js/fiveParsecsEnums";
import StepDetails from '@/components/StepDetails.vue';

export default {
  name: 'PostBattle',  
  components: { 
    StepDetails,   
  },
  mounted() {    
  }, 
  data() {
    return {
      activeStep: null,
      steps: [
        new CampaignStepResult(Step.PostBattle, SubStep.ResolveRivalStatus, this),
        new CampaignStepResult(Step.PostBattle, SubStep.ResolvePatronStatus, this),
        new CampaignStepResult(Step.PostBattle, SubStep.DetermineQuestProgress, this),
        new CampaignStepResult(Step.PostBattle, SubStep.GetPaid, this),
      ],
      stepInputType: StepInputType,    
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
      var activeStepElem = document.getElementById("activeStep");
      activeStepElem.scrollIntoView();     
    },
    resolveActiveStep() {
      this.activeStep.processStep(this);
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
