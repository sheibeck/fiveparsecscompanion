import { Step, SubStep } from "../js/fiveParsecsEnums";
import { FPFHTables } from "./tables";


export class FiveParsecsStepResult {
    step: Step;
    subStep: SubStep;
    stepProcessed: boolean = false;
    private rollResult: number = 0;
    private totalRollBonus: number = 0;
    private finalRollResult: number = 0;
    private tableResult: string = "";
    private rpgTable: FPFHTables = new FPFHTables();
    
    constructor(step: Step, subStep: SubStep) {
        this.step = step;
        this.subStep = subStep;
    }

    public getStepInput() {
        const inputs = FiveParsecsResultsTables.find( r => r.step === this.step && r.subStep === this.subStep)?.stepInput;
        inputs?.forEach( (input) => {
            input.inputType == StepInputType.Roll ? this.rollResult = this.rpgTable.Roll(input.text) : this.rollResult = 0;
            input.inputType == StepInputType.TableResult ? this.tableResult = this.rpgTable.GetFullTableResult(input.text) : this.tableResult = "";
        });
        return inputs;
    }

    public processStep(): string {          
        const stepDetails = FiveParsecsResultsTables.find( r => r.step === this.step && r.subStep === this.subStep);        
        let results = stepDetails?.pageNumber ? `(Pg.${stepDetails.pageNumber}) ` : "";
        const inputs = stepDetails?.stepInput;
        inputs?.forEach( (input) => {            
            if (input.inputType == StepInputType.Roll) {
                this.finalRollResult = this.rollResult + this.totalRollBonus;
                results += this.findResult(this.finalRollResult, stepDetails?.stepResults);  
            }           
            if (input.inputType == StepInputType.TableResult) {
                results += this.tableResult;
            }
        });                               
        this.stepProcessed = true;
        return results;
    }

    public getStepInputBreakdown(): string {
        let result = "";
        const inputs = FiveParsecsResultsTables.find( r => r.step === this.step && r.subStep === this.subStep)?.stepInput;
        inputs?.forEach( (input) => {
            if (input.inputType == StepInputType.Roll) {
                result += `Rolled: ${this.rollResult}. Total Bonuses: ${this.totalRollBonus}. Final Result ${this.finalRollResult}.`;
            }          
        });        
        return result;
    }

    private findResult(roll: Number, possibleResults?: Array<ResultItem>) : string {
        if (!possibleResults) return "Not implemented";
        
        let resultIndex = 0;
        for( let i=0; i < possibleResults.length; i++) {
            if (possibleResults[i].roll <= roll) {
                resultIndex = i;                
            }
            else {
                break;
            }
        }
        return possibleResults[resultIndex].result;
    }
}

enum StepInputType {
    YesNo,
    Roll,
    Input,
    TableResult
}

class StepInputItem {
    inputType: StepInputType;
    text: string; 
    pageNumber: string;
    bonus: number;    

    constructor(inputType: StepInputType, text: string, pageNumber?: string, bonus?: number) {
        this.inputType = inputType;
        this.text = text;
        this.pageNumber = pageNumber ?? "";
        this.bonus = bonus ?? 0;
    }
}

class ResultItem {
    roll: number;
    result: string;
    
    constructor(roll: number, result: string) {
        this.roll = roll;
        this.result = result;
    }    
}

class FiveParsecsStep {
    step: Step;
    subStep: SubStep;
    stepInput: Array<StepInputItem>;
    stepResults: Array<ResultItem>;
    pageNumber: string;

    constructor( step: Step, subStep: SubStep, stepInput: Array<StepInputItem>, stepResults: Array<ResultItem>, pageNumber?: string) {
        this.step = step;
        this.subStep = subStep;
        this.stepInput = stepInput;
        this.stepResults = stepResults;
        this.pageNumber = pageNumber ?? "";
    }
}

export const FiveParsecsResultsTables: Array<FiveParsecsStep> = [
    new FiveParsecsStep(
        Step.Travel,
        SubStep.FleeInvasion,        
        [
            new StepInputItem(StepInputType.Roll, "2d6")
        ],    
        [
            new ResultItem(1, "Invasion! Assign equipment and proceed to Battle!"),
            new ResultItem(8, "You safely get off-world.")
        ],
        "69"      
    ),
    new FiveParsecsStep(
        Step.Travel,
        SubStep.DecideToTravel,        
        [
            new StepInputItem(StepInputType.TableResult, "starshiptravelevent")
        ],    
        [
            new ResultItem(1, "Invasion! Assign equipment and proceed to Battle!"),
            new ResultItem(8, "You safely get off-world.")
        ],
        "70"
    )
]