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
                    let rollOverride: number|null = null;
                    if (input.notation instanceof DiceRollTableResult) {
                        dice = (input.notation as DiceRollTableResult).dice;
                        const roll = this.rpgTable.Roll(dice);
                        
                        let bonus = 0;
                        if (input.dependentInputs) {
                            const stepInputs = this.inputs ?? [];
                            input.dependentInputs.forEach(item => {
                                const depInput: any = stepInputs[item.index];
                                let depInputValue: any = depInput?.value;
                                //Dependent object can be a RandomTableEntry from rpg-table-randomizer library
                                if (item instanceof DependentInputBonus) {
                                    if (item.metadata) {
                                        const meta = item.metadata.split("|");
                                        const data = JSON.parse(depInputValue[0].desc);
                                        switch(meta[0]) {
                                            case "minroll": {
                                                    const minRoll = parseInt(data.rolls[meta[1]]);
                                                    if (roll < minRoll) {                                                        
                                                        rollOverride = 0;
                                                    }
                                                }
                                                break;
                                        }
                                    }
                                    else {
                                        depInputValue = typeof(depInputValue) === "object" ? depInputValue[0].result : depInputValue;
                                    }
                                }
                                
                                // DependentInputComparison don't give bonuses
                                if (!(item instanceof DependentInputComparison)) {
                                    //see if the dependent item needs to match something before applying the value
                                    if (item.match) {                                   
                                        if (depInputValue === item.match) {
                                            bonus += item?.value ? item.value : 0;
                                        }
                                    }
                                    else {
                                        //see if the dependent item has a value override                                
                                        if (typeof(item.value) === "number" && depInputValue) {
                                            bonus += item.value;
                                        } else {
                                            bonus += depInputValue ? parseInt(depInputValue) : 0;
                                        }
                                    }
                                }
                            });
                        }

                        const total = (typeof(rollOverride) === "number" ? rollOverride : roll) + bonus;
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
                    if (input.notation && typeof(input.notation) == "string") {
                        const tableSelector = input.notation?.split("|");
                        const tableResult = this.rpgTable.GetFullTableResult(tableSelector[0], tableSelector.length > 1 ? tableSelector[1] : null);
                        this.vueInstance.$set(input, "value", tableResult);
                    }
                    else {
                        console.error(`TableResult notation must be a string!`);
                    }
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
                    if (input.value !== "undefined" && input.value !== null && input.value !== "") {
                        results += `<strong>${input.text}:</strong>`;
                        if (input.inputType == StepInputType.Roll) {                
                            if (input.notation instanceof DiceRollTableResult) {
                                let rollResult: number = 0;                                                    
                                //if we have a DependentInputComparison then we want to see if the roll >= the input
                                //if it is not then return roll that will retrieve the fail item in the DiceRollTableResult
                                // otherwise return roll that will retrieve the success item in the DiceRollTableResult
                                // There is only success and failure accounted for here as of now.
                                // Comparison input currently nees to be in the first slot and there can be only 1
                                if (input.dependentInputs && input.dependentInputs.length > 0 && input.dependentInputs[0] instanceof DependentInputComparison) {
                                    const compareInput = input.dependentInputs[0];
                                    const stepInputs = this.inputs ?? [];
                                    const depInput: any = stepInputs[input.dependentInputs[0].index];
                                    const depInputValue: number = depInput?.value === "" ? 0 : parseInt(depInput?.value);

                                    switch(compareInput.comparison) {
                                        case ComparisonType.LessThanOrEqual: {
                                                if (parseInt(input.value) <= depInputValue) {
                                                    rollResult = 2
                                                }
                                                else {
                                                    rollResult = 1;
                                                }
                                            }
                                            break;
                                            case ComparisonType.GreaterThanOrEqual: {
                                                if (parseInt(input.value) >= depInputValue) {
                                                    rollResult = 2
                                                }
                                                else {
                                                    rollResult = 1;
                                                }
                                            }
                                            break;
                                    }
                                    
                                }
                                else {
                                    rollResult = parseInt(input.value);
                                    if (input.autoFailOnOne && input.roll == 1) {
                                        rollResult = 1;
                                    }
                                }

                                results += " " + this.findResult(rollResult, (input.notation as DiceRollTableResult)?.possibleResults);

                                //roll of "" means we just want information and we aren't "really" rolling
                                if (input.roll) {
                                    results += ` (Rolled ${input.roll}`;
                                    const bonus = parseInt(input.value) - input.roll;                                                             
                                    results += `. Bonus ${bonus}`;                                   
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
                    results += `${input.text}`;
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
    Label = 6,
}

class StepInputItem {
    inputType: StepInputType;
    text: string; 
    notation: string|DiceRollTableResult|MultipleDiceRolls|null;
    target: number|null;
    dependentInputs: Array<IDependentInput>|null;
    value: string = "";
    roll: number = 0; //an original dice roll   
    autoFailOnOne: boolean = false;

    constructor(inputType: StepInputType, text: string, notation?: string|DiceRollTableResult|MultipleDiceRolls|null, 
        target?: number|null, dependentInputs?: Array<IDependentInput>|null, autoFailOnOne?: boolean) {
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


enum ComparisonType {
    GreaterThanOrEqual,
    LessThanOrEqual,    
}

interface IDependentInput {
    index: number; //index number of the StepInputItem for this Step
    value: number|null; //how much of a bonus is this dependent input worth
    match: string|null; //only apply the value if the the dependent value matches this
    metadata: string|null; //expects json string in RandomTableEntry to contain
    comparison: ComparisonType|null; //
}

//use this when you want another input to add a bonus to the roll
class DependentInputBonus implements IDependentInput {
    index: number; //index number of the StepInputItem for this Step
    value: number|null; //how much of a bonus is this dependent input worth
    match: string|null; //only apply the value if the the dependent value matches this
    metadata: string|null; //expects json string in RandomTableEntry to contain
    comparison: ComparisonType|null = null;

    constructor( index: number, value?: number|null, match?: string|null, metadata?: string|null) {
        this.index = index;
        this.value = value ?? null;
        this.match = match ?? null;
        this.metadata = metadata ?? null;
    }
}

//use this when you want a roll to match the value of another input
class DependentInputComparison implements IDependentInput {    
    index: number; //index number of the StepInputItem for this Step
    value: number|null = null; //unused
    match: string|null = null; //unused
    metadata: string|null = null; //unused
    comparison: ComparisonType;

    constructor( index: number, comparison: ComparisonType)
    {
        this.index = index;
        this.comparison = comparison;
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
            new StepInputItem(StepInputType.Label, "Determine world trais. Roll an extra trait if this a Wild Galaxy."),
            new StepInputItem(StepInputType.TableResult, "World trait", "newworldtraits"),            
            new StepInputItem(StepInputType.TableResult, "Extra trait", "newworldtraits"),
            new StepInputItem(StepInputType.Label, "Determine license requirements and cost (if any)."),
            new StepInputItem(StepInputType.Roll, "License?", new DiceRollTableResult("1d6", [
                new ResultItem(1, "No license required."),
                new ResultItem(5, "A license is required.")
            ])),
            new StepInputItem(StepInputType.Roll, "License cost", new DiceRollTableResult("1d6", [
                new ResultItem(1, "License costs 1 credit."),
                new ResultItem(2, "License costs 2 credits."),
                new ResultItem(3, "License costs 3 credits."),
                new ResultItem(4, "License costs 4 credits."),
                new ResultItem(5, "License costs 5 credits."),
                new ResultItem(6, "License costs 6 credits."),
            ])),
            new StepInputItem(StepInputType.Label, "Dismiss all patrons that are not persistent")
        ],       
        "70"
    ),
    new CampaignStep(
        "1. Upkeep/Ship Repairs",
        Step.World,
        SubStep.UpkeepRepairs,        
        [
            new StepInputItem(StepInputType.Label, "Pay upkeep, ship debt, ship repairs and medical costs.")
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
            ]), null, [new DependentInputBonus(0),new DependentInputBonus(1),new DependentInputBonus(2),new DependentInputBonus(3),new DependentInputBonus(4,2)])
        ],      
        "77"      
    ),
    new CampaignStep(
        "2. Crew Task - Train",
        Step.World,
        SubStep.AssignCrewTasksTrain,
        [
            new StepInputItem(StepInputType.Label, "Crew member gains 1 xp.")   
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
            ]), null, [new DependentInputBonus(0),new DependentInputBonus(1,1)])
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
            ]), null, [new DependentInputBonus(0),new DependentInputBonus(1)])
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
            ]), null, [new DependentInputBonus(0),new DependentInputBonus(1,1),new DependentInputBonus(2,1),new DependentInputBonus(3,1),new DependentInputBonus(4,1),new DependentInputBonus(5)],
            true)
        ],      
        "78"
    ),
    new CampaignStep(
        "2. Crew Task - Decoy",
        Step.World,
        SubStep.AssignCrewTasksDecoy,
        [
            new StepInputItem(StepInputType.Label, "Add 1 per crew member performing this task to the Total Decoys box in the Choose Battle step below.")
        ],      
        "78"
    ),
    new CampaignStep(
        "3. Job Offers",
        Step.World,
        SubStep.JobOffers,
        [
            new StepInputItem(StepInputType.Label, "Perform each of the following rolls in order. If you re-roll, be sure to roll again on each lower dice roll as some rolls are dependent on rolls above them."),
            new StepInputItem(StepInputType.TableResult, "Patron", "patron"),            
            new StepInputItem(StepInputType.Roll, "Danger Pay", new DiceRollTableResult("1d10", 
            [
                new ResultItem(4, "+1 credit."),
                new ResultItem(8, "+2 credits."),
                new ResultItem(9, "+3 credits."),
                new ResultItem(10, "+3 credits, roll x2 & pick higher for mission pay.")
            ]), null, [new DependentInputBonus(1,1,"Corporation")]),
            new StepInputItem(StepInputType.Roll, "Time Frame", new DiceRollTableResult("1d10", 
            [
                new ResultItem(5, "This campaign turn."),
                new ResultItem(7, "This or next campaign turn."),
                new ResultItem(9, "This or following 2 campaign turns."),
                new ResultItem(10, "Any time.")
            ]), null, [new DependentInputBonus(1,1,"Secretive Group")]),
            new StepInputItem(StepInputType.Roll, "Benefit", new DiceRollTableResult("1d10", 
            [
                new ResultItem(0, "None."),
                new ResultItem(2, "Fringe Benefit"),
                new ResultItem(4, "Connections"),
                new ResultItem(5, "Company Store"),
                new ResultItem(6, "Health Insurance"),
                new ResultItem(7, "Security Team"),
                new ResultItem(9, "Persistent"),
                new ResultItem(10, "Negotiable"),                
            ]), null, [new DependentInputBonus(1,0,null,"minroll|0")]),
            new StepInputItem(StepInputType.Roll, "Hazard", new DiceRollTableResult("1d10", 
            [
                new ResultItem(0, "None."),
                new ResultItem(2, "Dangerous Job"),
                new ResultItem(4, "Hot Job"),
                new ResultItem(5, "VIP"),
                new ResultItem(6, "Veteran Opposition"),
                new ResultItem(7, "Low Priority"),
                new ResultItem(10, "Private Transport"),                             
            ]), null, [new DependentInputBonus(1,0,null,"minroll|1")]),
            new StepInputItem(StepInputType.Roll, "Condition", new DiceRollTableResult("1d10", 
            [
                new ResultItem(0, "None."),
                new ResultItem(1, "Vengeful"),
                new ResultItem(3, "Demanding"),
                new ResultItem(4, "Small Squad"),
                new ResultItem(5, "Full Squad"),
                new ResultItem(6, "Clean"),
                new ResultItem(8, "Busy"),
                new ResultItem(9, "Onetime Contract"),
                new ResultItem(10, "Reputation Required"),                
            ]), null, [new DependentInputBonus(1,0,null,"minroll|2")]),
        ],      
        "78"
    ),
    new CampaignStep(
        "4. Assign Equipment",
        Step.World,
        SubStep.AssignEquipment,        
        [
            new StepInputItem(StepInputType.Roll, "Assign Equipment", new DiceRollTableResult("", 
            [
                new ResultItem(1, "Assign equipment to your crew (Pg.85)"),
            ]))
        ],      
        "85"
    ),
    new CampaignStep(
        "5. Resolve Rumors",
        Step.World,
        SubStep.ResolveRumors,
        [
            new StepInputItem(StepInputType.Input, "Total Rumors"),            
            new StepInputItem(StepInputType.Roll, "Resolve Rumors", new DiceRollTableResult("1d6", 
            [
                new ResultItem(1, "No quest found"),
                new ResultItem(2, "Quest found!"),                
            ]), null, [new DependentInputComparison(0, ComparisonType.LessThanOrEqual)])
        ],      
        "85"
    ),
    new CampaignStep(
        "6. Choose Battle - Check For Rivals",
        Step.World,
        SubStep.ChooseBattle,
        [
            new StepInputItem(StepInputType.Input, "Total Rivals"),
            new StepInputItem(StepInputType.Input, "Total Decoys"),            
            new StepInputItem(StepInputType.Roll, "Check for rivals", new DiceRollTableResult("1d6", 
            [
                new ResultItem(1, "No rivals have found you."),
                new ResultItem(2, "A rival has tracked you down!"),                
            ]), null, [new DependentInputComparison(0, ComparisonType.LessThanOrEqual), new DependentInputBonus(1)])
        ],      
        "85"
    ),
    new CampaignStep(
        "1. Resolve Rival Status",
        Step.PostBattle,
        SubStep.ResolveRivalStatus,
        [
            new StepInputItem(StepInputType.Label, "Did you fight a non-rival?"),
            new StepInputItem(StepInputType.Roll, "Determine if you gain a new rival", new DiceRollTableResult("1d6", 
            [
                new ResultItem(1, "This enemy is now your rival!"),
                new ResultItem(2, "Business is business. You do not gain a rival."),
            ])),
            new StepInputItem(StepInputType.Label, "Did you fight an existing rival?"),
            new StepInputItem(StepInputType.YesNo, "Tracked rival down?"),
            new StepInputItem(StepInputType.YesNo, "Killed a unique individual?"),            
            new StepInputItem(StepInputType.Roll, "Determine rival status", new DiceRollTableResult("1d6", 
            [
                new ResultItem(1, "They still hate you."),
                new ResultItem(4, "Rival has had enough. Remove them from your rival list!"),
            ]), null, [new DependentInputBonus(3,1), new DependentInputBonus(4,1)])
        ],      
        "119"
    ),
    new CampaignStep(
        "2. Resolve Patron Status",
        Step.PostBattle,
        SubStep.ResolvePatronStatus,
        [
            new StepInputItem(StepInputType.Label, "If you succeeded in Patron mission you may add the Patron to your list of contacts unless the job was a One-time contract."),            
        ],      
        "119"
    ),
    new CampaignStep(
        "3. Determine Quest Progress",
        Step.PostBattle,
        SubStep.DetermineQuestProgress,
        [
            new StepInputItem(StepInputType.Label, "Did you fight a battle that was part of quest?"),
            new StepInputItem(StepInputType.Input, "Total Rumors"),
            new StepInputItem(StepInputType.YesNo, "Did you lose the battle?"),
            new StepInputItem(StepInputType.Roll, "Determine quest progress", new DiceRollTableResult("1d6", 
            [
                new ResultItem(1, "A dead end. The quest continues."),
                new ResultItem(4, "A step closer. Gain a quest rumor."),
                new ResultItem(7, "At the conclusion of a quest!"),
            ]), null, [new DependentInputBonus(1), new DependentInputBonus(2,-2)]),
            new StepInputItem(StepInputType.Label, "Was the total modified quest progress roll >= 4+ ?"),
            new StepInputItem(StepInputType.Roll, "Determine travel requirements", new DiceRollTableResult("1d6",
            [
                new ResultItem(1, "You do not need to travel to progress."),
                new ResultItem(5, "You must travel to a new world to progress on this quest."),
            ]))
        ],      
        "120"
    ),
    new CampaignStep(
        "4. Get Paid",
        Step.PostBattle,
        SubStep.GetPaid,
        [
            new StepInputItem(StepInputType.YesNo, "Is difficulty set to easy?"),
            new StepInputItem(StepInputType.Roll, "Determine pay", new DiceRollTableResult("1d6", 
            [
                new ResultItem(1, "Gain credits equal to dice roll."),                
            ]), null, [new DependentInputBonus(0,1)]),
            new StepInputItem(StepInputType.Info, "<p class='mt-2'>If this was <u>not a rival mission</u> and you <u>won your objective</u>, treat dice rolls of 1 - 2 as a 3.</p>"),
            new StepInputItem(StepInputType.Info, "<p>If this <u>was patron job</u>, add the pay bonus to the danger pay.</p>"),
        ],      
        "120"
    ),
    new CampaignStep(
        "5. Battlefield Finds",
        Step.PostBattle,
        SubStep.BattlefieldFinds,
        [
            new StepInputItem(StepInputType.Label, "Held the field in a non-Invasion battle?"),
            new StepInputItem(StepInputType.TableResult, "Battlefield Finds", "battlefieldfinds"),
        ],
        "120"
    ),
    new CampaignStep(
        "6. Check for Invasion",
        Step.PostBattle,
        SubStep.CheckForInvasion,
        [
            new StepInputItem(StepInputType.Label, "Enemy you faught was an invasion threat?"),
            new StepInputItem(StepInputType.YesNo, "Acquired invasion evidence in previous step?"),
            new StepInputItem(StepInputType.YesNo, "Held the field?"),
            new StepInputItem(StepInputType.YesNo, "Difficulty is Harcore?"),
            new StepInputItem(StepInputType.YesNo, "Difficulty is Insanity?"),
            new StepInputItem(StepInputType.Roll, "Check for invasion", new DiceRollTableResult("2d6", 
            [
                new ResultItem(1, "No invasion."),
                new ResultItem(9, "World is about to be invaded!"),                
            ]), null, [new DependentInputBonus(1,1), new DependentInputBonus(2,-1), new DependentInputBonus(3,2), new DependentInputBonus(3,3)]),
        ],      
        "121"
    ),
    new CampaignStep(
        "7. Gather the Loot",
        Step.PostBattle,
        SubStep.GatherTheLoot,
        [
            new StepInputItem(StepInputType.Label, "If this was a non-invastion battle, roll 1x (3x if final quest stage) pg 131"),
            new StepInputItem(StepInputType.TableResult, "Gather Loot", "loottable"),
        ],      
        "121"
    ),
    new CampaignStep(
        "8. Determine Injuries & Recovery",
        Step.PostBattle,
        SubStep.DetermineInjuriesAndRecovery,
        [            
            new StepInputItem(StepInputType.TableResult, "Determine Injury", "injurytable"),
            new StepInputItem(StepInputType.TableResult, "Determine Bot Injury", "injurytable|botinjury"),
        ],      
        "121"
    ),
    new CampaignStep(
        "9. Experience & Upgrades",
        Step.PostBattle,
        SubStep.ExperienceAndUpgrades,
        [            
            new StepInputItem(StepInputType.Label, "See Page 123"),
        ],      
        "123"
    ),
    new CampaignStep(
        "10. Advanced Training",
        Step.PostBattle,
        SubStep.AdvancedTraining,
        [            
            new StepInputItem(StepInputType.Label, "See Pages 124-125"),
        ],      
        "124"
    ),
    new CampaignStep(
        "11. Purchase & Sell Items",
        Step.PostBattle,
        SubStep.PurchaseItems,
        [            
            new StepInputItem(StepInputType.Label, "You may pay <u>3 credits</u> to roll on <u>one</u> of the follow tables (pg.28-29)."),
            new StepInputItem(StepInputType.TableResult, "Military Weapon", "militaryweapon"),
            new StepInputItem(StepInputType.TableResult, "Gear Table", "geartable"),
            new StepInputItem(StepInputType.TableResult, "Gadget Table", "gadgettable"),
        ],      
        "125"
    ),
    new CampaignStep(
        "12. Campaign Event",
        Step.PostBattle,
        SubStep.CampaignEvent,
        [            
            new StepInputItem(StepInputType.Label, "Roll d100 and consult the table on pages 126-128"),
        ],      
        "125"
    ),
    new CampaignStep(
        "13. Character Event",
        Step.PostBattle,
        SubStep.CharacterEvent,
        [            
            new StepInputItem(StepInputType.Label, "Roll d100 and consult the table on pages 128-130"),
        ],      
        "126"
    ),
    new CampaignStep(
        "14. Galactice War Progress",
        Step.PostBattle,
        SubStep.GalacticWarProgress,
        [            
            new StepInputItem(StepInputType.Label, "Roll once for each planet you are tracking that was previously invaded."),
            new StepInputItem(StepInputType.Roll, "Galactic War Progress", new DiceRollTableResult("2d6", 
            [
                new ResultItem(4, "Lost to Unity."),
                new ResultItem(7, "Contested."),
                new ResultItem(9, "Making Ground."),
                new ResultItem(12, "Unity Victorious."),
            ])),
        ],      
        "126"
    ),
]
