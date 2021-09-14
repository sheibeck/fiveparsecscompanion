<template>
    <div>
        <div v-if="activeStep" class="col" id="activeStep">
            <div class="card">
                <h6>{{activeStep.stepDetails.title}}</h6>
                <template v-for="(input, index) in activeStep.inputs" :index="index">
                    <div class="card-body" v-if="input.inputType == inputTypes.Roll" :key="index">
                      <i class="fas fa-dice pe-auto d-print-none fa-2x" @click="activeStep.processInput(input, $event)"></i> {{input.text}}
                    </div>
                    <div class="card-body" v-if="input.inputType == inputTypes.TableResult"  :key="index+1">
                      <i class="fas fa-dice pe-auto d-print-none fa-2x" @click="activeStep.processInput(input, $event)"></i> {{input.text}}
                    </div>   
                    <div class="card-body" v-if="input.inputType == inputTypes.Input" :key="index">
                      <div class="input-group input-group-sm">
                        <span class="input-group-text" id="rivals-addon">{{input.text}}</span>
                        <input type="number" class="form-control" placeholder="0" :aria-label="input.text" 
                            min="0" v-model.number="input.value" />
                      </div>
                    </div>
                    <div class="card-body" v-if="input.inputType == inputTypes.YesNo" :key="index">
                      <div class="input-group input-group-sm">
                        <div class="input-group-text">
                            <input class="form-check-input mt-0" type="checkbox" value="" :aria-label="input.text" 
                            v-model="input.value" />
                        </div>
                        <span class="input-group-text" id="savvy-addon">{{input.text}}</span>
                      </div>
                    </div>
                    <div class="card-body" v-if="input.inputType == inputTypes.Label" :key="index">
                      <div class="input-group input-group-sm">
                        <label v-html="input.text"></label>
                      </div>
                    </div>                    
                </template>
                <hr />
                <div class="card-body" v-html="activeStep.results">
                </div>
                <div class="card-footer" v-html="activeStep.breakdown">
                    
                </div>
            </div>
        </div>  
        <div v-else id="activeStep">
            <div class="card">
            <h6>Select a step.</h6>
            </div>
        </div>  
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { CampaignStepResult, StepInputType }  from '../js/fiveParsecs';

export default Vue.extend({
  name: "StepDetails",
  props: {
    activeStep: Object as () => { details: CampaignStepResult|null },
  },
  data() {
      return {
        inputTypes: StepInputType,
      }
  }
})
</script>

<style scoped>
  label {
    font-weight: 700;
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