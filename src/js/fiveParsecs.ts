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
                        const roll = this.rpgTable.Roll(dice);
                        
                        let bonus = 0;
                        if (input.dependentInputs) {
                            const stepInputs = this.inputs ?? [];
                            input.dependentInputs.forEach(item => {
                                const depInputValue = stepInputs[item.index]?.value;
                                if (item.value && depInputValue) {
                                    bonus += item.value;
                                } else {
                                    bonus +=  depInputValue ? parseInt(depInputValue) : 0;
                                }
                            });
                        }

                        const total = roll + bonus;
                        this.vueInstance.$set(input, "roll", roll);
                        this.vueInstance.$set(input, "value", total);
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
                                results += ` (Rolled ${input.roll}`;
                                if (input.dependentInputs) {                                    
                                    results += `. Total ${input.value}`;
                                }                                
                                results += `.)<br />`
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
    dependentInputs: Array<DependentInput>|null;
    value: string = "";
    roll: string = ""; //an original dice roll   

    constructor(inputType: StepInputType, text: string, notation?: string|DiceRollTableResult|MultipleDiceRolls|null, 
        target?: number|null, dependentInputs?: Array<DependentInput>|null) {
        this.inputType = inputType;
        this.notation = notation ?? null;
        this.target = target ?? null;
        this.text = text;
        this.dependentInputs = dependentInputs ?? null;
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

export class FiveParsecsStep {
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
    possibleResults: Array<ResultItem>;    

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

class DependentInput {
    index: number;
    value: number|null;

    constructor( index: number, value?: number|null) {
        this.index = index;
        this.value = value ?? null;
    }
}

export const FiveParsecsSteps: Array<FiveParsecsStep> = [
    new FiveParsecsStep(
        "1. Flee Invasion",
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
        "2. Decide to Travel",
        Step.Travel,
        SubStep.DecideToTravel,
        [
            new StepInputItem(StepInputType.TableResult, "Starship Travel Event", "starshiptravelevent")
        ],        
        "70"
    ),
    new FiveParsecsStep(
        "3. New World Arrival",
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
        "1. Upkeep/Ship Repairs",
        Step.World,
        SubStep.UpkeepRepairs,        
        [
            new StepInputItem(StepInputType.Info, "Pay upkeep, ship debt, ship repairs and medical costs")
        ],      
        "76"
    ),
    new FiveParsecsStep(
        "2. Crew Task - Find Patron",
        Step.World,
        SubStep.AssignCrewTasks,        
        [
            new StepInputItem(StepInputType.Input, "Patrons"),
            new StepInputItem(StepInputType.Input, "Credits"),
            new StepInputItem(StepInputType.Input, "Contacts"),
            new StepInputItem(StepInputType.Input, "Crew"),
            new StepInputItem(StepInputType.YesNo, "Corporate State?"),
            new StepInputItem(StepInputType.Roll, "Find Patron", new DiceRollTableResult("1d6", 
            [
                new ResultItem(1, "No patrons found."),
                new ResultItem(5, "Found 1 patron."),
                new ResultItem(6, "Found 2 patrons!")
            ]), null, [new DependentInput(0),new DependentInput(1),new DependentInput(2),new DependentInput(3),new DependentInput(4,2)])
        ],      
        "77"      
    ),
]