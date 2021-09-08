import { Step, SubStep } from "../js/fiveParsecsEnums";
import { FPFHTables } from "./tables";


export class CampaignStepResult {    
    step: Step;
    subStep: SubStep;

    private rollResult: number = 0;
    private totalRollBonus: number = 0;
    private finalRollResult: number = 0;
    //private tableResult: string = "";
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
                                let rollResult = parseInt(input.value);
                                if (input.autoFailOnOne && input.roll == "1") {
                                    rollResult = 1;
                                }
                                results += " " + this.findResult(rollResult, (input.notation as DiceRollTableResult)?.possibleResults);

                                //roll of "" means we just want information and we aren't "really" rolling
                                if (input.roll) {
                                    results += ` (Rolled ${input.roll}`;
                                    if (input.dependentInputs) {                                    
                                        results += `. Total ${input.value}`;
                                    }                                
                                    results += `.)`;
                                }
                                results += `<br />`;
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
    autoFailOnOne: boolean = false;

    constructor(inputType: StepInputType, text: string, notation?: string|DiceRollTableResult|MultipleDiceRolls|null, 
        target?: number|null, dependentInputs?: Array<DependentInput>|null, autoFailOnOne?: boolean) {
        this.inputType = inputType;
        this.notation = notation ?? null;
        this.target = target ?? null;
        this.text = text;
        this.dependentInputs = dependentInputs ?? null;
        this.autoFailOnOne = autoFailOnOne ?? false;
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

export class CampaignStep {
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
    index: number; //index number of the StepInputItem for this Step
    value: number|null;

    constructor( index: number, value?: number|null) {
        this.index = index;
        this.value = value ?? null;
    }
}

export const FiveParsecsSteps: Array<CampaignStep> = [
    new CampaignStep(
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
    new CampaignStep(
        "2. Decide to Travel",
        Step.Travel,
        SubStep.DecideToTravel,
        [
            new StepInputItem(StepInputType.TableResult, "Starship Travel Event", "starshiptravelevent")
        ],        
        "70"
    ),
    new CampaignStep(
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
    new CampaignStep(
        "1. Upkeep/Ship Repairs",
        Step.World,
        SubStep.UpkeepRepairs,        
        [
            new StepInputItem(StepInputType.Roll, "Upkeep/Repair", new DiceRollTableResult("", 
            [
                new ResultItem(1, "Pay upkeep, ship debt, ship repairs and medical costs."),
            ]))            
        ],      
        "76"
    ),
    new CampaignStep(
        "2. Crew Task - Find Patron",
        Step.World,
        SubStep.AssignCrewTasksFindPatron,        
        [
            new StepInputItem(StepInputType.Input, "Crew Looking"),
            new StepInputItem(StepInputType.Input, "Patrons"),
            new StepInputItem(StepInputType.Input, "Credits"),
            new StepInputItem(StepInputType.Input, "Contacts"),            
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
    new CampaignStep(
        "2. Crew Task - Train",
        Step.World,
        SubStep.AssignCrewTasksTrain,
        [
            new StepInputItem(StepInputType.Roll, "Train", new DiceRollTableResult("", 
            [
                new ResultItem(1, "Gain 1 xp."),
            ]))       
        ],      
        "77"      
    ),
    new CampaignStep(
        "2. Crew Task - Trade",
        Step.World,
        SubStep.AssignCrewTasksTrade,
        [
            new StepInputItem(StepInputType.TableResult, "Trade", "traderesult")         
        ],
        "78,79"      
    ),
    new CampaignStep(
        "2. Crew Task - Recruit",
        Step.World,
        SubStep.AssignCrewTasksRecruit,
        [
            new StepInputItem(StepInputType.Input, "Crew Looking"),
            new StepInputItem(StepInputType.YesNo, "Easy Recruiting?"),
            new StepInputItem(StepInputType.Roll, "Recruit", new DiceRollTableResult("1d6", 
            [
                new ResultItem(1, "No recruits found."),                
                new ResultItem(6, "Found a recruit!")
            ]), null, [new DependentInput(0),new DependentInput(1,1)])
        ],      
        "78"
    ),
    new CampaignStep(
        "2. Crew Task - Explore",
        Step.World,
        SubStep.AssignCrewTasksExplore,
        [
            new StepInputItem(StepInputType.TableResult, "Explore", "exploration")         
        ],
        "78,80"      
    ),
    new CampaignStep(
        "2. Crew Task - Track",
        Step.World,
        SubStep.AssignCrewTasksTrack,        
        [            
            new StepInputItem(StepInputType.Input, "Crew Looking"),
            new StepInputItem(StepInputType.Input, "Credits"),            
            new StepInputItem(StepInputType.Roll, "Track Rival", new DiceRollTableResult("1d6", 
            [
                new ResultItem(1, "No rivals found."),                
                new ResultItem(6, "Found a rival!")
            ]), null, [new DependentInput(0),new DependentInput(1)])
        ],      
        "77"      
    ),
    new CampaignStep(
        "2. Crew Task - Repair",
        Step.World,
        SubStep.AssignCrewTasksRepair,
        [
            new StepInputItem(StepInputType.Input, "Savvy skill"),
            new StepInputItem(StepInputType.YesNo, "Is Engineer?"),
            new StepInputItem(StepInputType.YesNo, "Repair bot?"),
            new StepInputItem(StepInputType.YesNo, "Technical knowledge?"),
            new StepInputItem(StepInputType.YesNo, "Spare parts?"),
            new StepInputItem(StepInputType.Input, "Credits"),            
            new StepInputItem(StepInputType.Roll, "Repair", new DiceRollTableResult("1d6", 
            [
                new ResultItem(1, "Item destroyed!"),
                new ResultItem(2, "Repair failed."),
                new ResultItem(6, "Item successfully repaired!")
            ]), null, [new DependentInput(0),new DependentInput(1,1),new DependentInput(2,1),new DependentInput(3,1),new DependentInput(4,1),new DependentInput(5)],
            true)
        ],      
        "78"      
    ),
    new CampaignStep(
        "2. Crew Task - Decoy",
        Step.World,
        SubStep.AssignCrewTasksDecoy,
        [
            new StepInputItem(StepInputType.Roll, "Decoy", new DiceRollTableResult("", 
            [
                new ResultItem(1, "See choose battle step."),
            ]))    
        ],      
        "78"
    ),
]
