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
      <StepDetails :activeStep="activeStep" />
    </div>
</div>
   
</template>

<script lang="ts">
import Vue from 'vue';
import { CampaignStepResult, StepInputType }  from '../js/fiveParsecs';
import { Step, SubStep } from "../js/fiveParsecsEnums";
import StepDetails from '@/components/StepDetails.vue';

export default Vue.extend({
  name: "Travel",
  components: { 
    StepDetails,   
  },
  mounted() {   
  }, 
  data() {
    return {
      activeStep: null as CampaignStepResult|null,
      steps: [
        new CampaignStepResult(Step.Travel, SubStep.FleeInvasion, this),
        new CampaignStepResult(Step.Travel, SubStep.DecideToTravel, this),
        new CampaignStepResult(Step.Travel, SubStep.NewWorldArrival, this),    
      ] as Array<CampaignStepResult>,
      stepInputType: StepInputType
    }
  },    
  computed : {
    username: function() {
      return this.$store.state.user.username;
    },
  },
  methods: {       
    setActiveStep(step: CampaignStepResult|null) {
      this.activeStep = step;
      const activeStepElem: HTMLElement|null = document.getElementById("activeStep");
      activeStepElem?.scrollIntoView(); 
    },
    resolveActiveStep() {
      this.activeStep?.processStep();
    }
  }
})
</script>

<style scoped>
  label {
    font-weight: 700;
  }  

  .col { 
    page-break-inside: avoid;
  }
</style>
