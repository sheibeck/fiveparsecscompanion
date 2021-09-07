import { Step, SubStep } from "../js/fiveParsecsEnums";
import { FPFHTables } from "./tables";


export class FiveParsecsStepResult {    
    step: Step;
    subStep: SubStep;

    private rollResult: number = 0;
    private totalRollBonus: number = 0;
    private finalRollResult: number = 0;
    private tableResult: string = "";
    private rpgTable: FPFHTables = new FPFHTables();
    private results: string = "";
    private breakdown: string = "";
    private vueInstance: any;
    
    constructor(step: Step, subStep: SubStep, vueIntance: any) {
        this.step = step;
        this.subStep = subStep;
        this.vueInstance = vueIntance;            
    }

    public get stepDetails() {
        return FiveParsecsSteps.find( r => r.step === this.step && r.subStep === this.subStep);
    }

    public get inputs() {            
        const inputs = this.stepDetails?.stepInput;
        return inputs;
    }

    public processInput(input: StepInputItem, event: Event)
    {
        switch(input.inputType) {
            case StepInputType.Roll: {
                    let dice: string = "";
                    if (input.notation instanceof DiceRollTableResult) {
                        dice = (input.notation as DiceRollTableResult).dice;
                        this.vueInstance.$set(input, "value", this.rpgTable.Roll(dice));
                    }
                    else if (input.notation instanceof MultipleDiceRolls) {                        
                        const multi = (input.notation as MultipleDiceRolls);
                        multi.rollResults = [];  
                        const numRolls = this.inputs ? this.inputs[multi.inputIndexForRolls].value : 1;
                        for (let i = 0; i < numRolls; i++) {
                            multi.rollResults.push(this.rpgTable.Roll(multi.dice));
                        }
                        
                        this.vueInstance.$set(input, "value", numRolls);
                    }
                    else {
                        dice = input.notation as string; 
                        this.vueInstance.$set(input, "value", this.rpgTable.Roll(dice));
                    }                    
                }
                break;

            case StepInputType.TableResult: {
                    this.vueInstance.$set(input, "value", this.rpgTable.GetFullTableResult(input.notation));
                }
                break;
        }

        const elem = event.target as Element;
        if (elem.classList.contains("fa-dice")) {
            if (elem.classList.contains("roll")) {
                elem.classList.remove("roll");
            }
            else {
                elem.classList.add("roll");
            }
        }

        this.processStep();
    }

    public processStep(): void {      
        const stepDetails = FiveParsecsSteps.find( r => r.step === this.step && r.subStep === this.subStep);        
        let results = "";
        const inputs = stepDetails?.stepInput;
        inputs?.forEach( (input) => {
            switch(input.inputType) {
                case StepInputType.Roll: {
                    if (input.value) {
                        results += `<strong>${input.text}:</strong>`;
                        if (input.inputType == StepInputType.Roll) {                
                            if (input.notation instanceof DiceRollTableResult) {                    
                                results += " " + this.findResult(parseInt(input.value), (input.notation as DiceRollTableResult)?.possibleResults);
                                results += `<br />`
                            }
                            else if (input.notation instanceof MultipleDiceRolls) {
                                const multi = (input.notation as MultipleDiceRolls)
                                let itemCount = 0;
                                results += "<ul>";
                                input.notation.rollResults.forEach( (roll) => {
                                    itemCount++;
                                    const rollResult = this.findResult(roll, multi?.possibleResults);
                                    results += `<li>${rollResult.replace("#item#", itemCount.toString())} (Rolled ${roll})</li>`;
                                });
                                results += "</ul>";
                            }                    
                        }                             
                    }
                    break;
                }
                case StepInputType.Info:
                    results += `<strong>${input.text}.</strong>`;
                    break;                
                default:
                    if (input.value) {
                        results += `<strong>${input.text}:</strong> ${input.value}.<br />`;
                    }
            }                            
        });
        
        this.vueInstance.$set(this, 'results', results);        
        //this.getStepInputBreakdown();
    }

    private getStepInputBreakdown(): void {
        let results = "";
        const inputs = FiveParsecsSteps.find( r => r.step === this.step && r.subStep === this.subStep)?.stepInput;
        inputs?.forEach( (input) => {
            if (input.inputType == StepInputType.Roll) {
                results += `Rolled: ${this.rollResult}. Total Bonuses: ${this.totalRollBonus}. Final Result ${this.finalRollResult}.`;
            }          
        });        
        
        this.vueInstance.$set(this, 'breakdown', results);
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

export enum StepInputType {
    YesNo = 1,
    Roll = 2,
    Input = 3,
    TableResult = 4,
    Info = 5,
}

class StepInputItem {
    inputType: StepInputType;
    text: string; 
    notation: string|DiceRollTableResult|MultipleDiceRolls|null;
    target: number|null;
    dependentInputIndex: number|null;
    value: string = "";

    constructor(inputType: StepInputType, text: string, notation?: string|DiceRollTableResult|MultipleDiceRolls|null, 
        target?: number|null, dependentInputIndex?: number) {
        this.inputType = inputType;
        this.notation = notation ?? null;
        this.target = target ?? null;
        this.text = text;
        this.dependentInputIndex = dependentInputIndex ?? null;
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
    title: string;
    step: Step;
    subStep: SubStep;
    stepInput: Array<StepInputItem>;    
    pageNumber: string;

    constructor( title: string, step: Step, subStep: SubStep, stepInput: Array<StepInputItem>, pageNumber?: string) {
        this.title = title;
        this.step = step;
        this.subStep = subStep;
        this.stepInput = stepInput;        
        this.pageNumber = pageNumber ?? "";
    }
}

class DiceRollTableResult {
    dice: string;
    possibleResults: Array<ResultItem>

    constructor(dice: string, possibleResults: Array<ResultItem>) {
        this.dice = dice;
        this.possibleResults = possibleResults;
    }
}

class MultipleDiceRolls {
    dice: string;
    inputIndexForRolls: number = 1;
    rollResults: Array<number> = []
    target: number;    
    possibleResults: Array<ResultItem>

    constructor(dice: string, inputIndexForRolls: number, target: number, possibleResults: Array<ResultItem>) {
        this.dice = dice;        
        this.inputIndexForRolls = inputIndexForRolls;
        this.target = target;        
        this.possibleResults = possibleResults;
    }
}

export const FiveParsecsSteps: Array<FiveParsecsStep> = [
    new FiveParsecsStep(
        "Flee Invasion",
        Step.Travel,
        SubStep.FleeInvasion,        
        [
            new StepInputItem(StepInputType.Roll, "Flee invasion", new DiceRollTableResult("2d6", [
                new ResultItem(1, "Invasion! Assign equipment and proceed to Battle!"),
                new ResultItem(8, "You safely get off-world.")
            ]))
        ],      
        "69"      
    ),
    new FiveParsecsStep(
        "Decide to Travel",
        Step.Travel,
        SubStep.DecideToTravel,
        [
            new StepInputItem(StepInputType.TableResult, "Starship Travel Event", "starshiptravelevent")
        ],        
        "70"
    ),
    new FiveParsecsStep(
        "New World Arrival",
        Step.Travel,
        SubStep.NewWorldArrival,
        [
            new StepInputItem(StepInputType.Input, "Number of rivals"),
            new StepInputItem(StepInputType.Roll, "Determine if rivals follow", new MultipleDiceRolls("1d6", 0, 6, 
                [
                    new ResultItem(1, "Rival #item# did not follow you."),
                    new ResultItem(6, "Rival #item# followed you!")
                ])
            ),
            new StepInputItem(StepInputType.TableResult, "World trait", "newworldtraits"),
            new StepInputItem(StepInputType.TableResult, "(Wild Galaxy?) Extra trait", "newworldtraits"),
            new StepInputItem(StepInputType.Roll, "License?", new DiceRollTableResult("1d6", [
                new ResultItem(1, "No license required."),
                new ResultItem(5, "A license is required.")
            ])),
            new StepInputItem(StepInputType.Roll, "License cost (if required)", new DiceRollTableResult("1d6", [
                new ResultItem(1, "License costs 1 credit."),
                new ResultItem(2, "License costs 2 credits."),
                new ResultItem(3, "License costs 3 credits."),
                new ResultItem(4, "License costs 4 credits."),
                new ResultItem(5, "License costs 5 credits."),
                new ResultItem(6, "License costs 6 credits."),
            ])),
            new StepInputItem(StepInputType.Info, "Dismiss all patrons that are not persistent")
        ],       
        "70"
    ),
    new FiveParsecsStep(
        "Flee Invasion",
        Step.World,
        SubStep.AssignCrewTasks,        
        [
            new StepInputItem(StepInputType.Info, "Upkeep/Ship Repairs (1-6 Crew: 1 credit, 7+: +1 credit per member past 6)")
        ],      
        "76"      
    ),
]