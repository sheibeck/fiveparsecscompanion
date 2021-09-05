import { Steps, SubSteps } from "../js/fiveParsecsEnums";
import { FPFHTables } from "./tables";

class ResultItem {
    roll: number;
    result: string;
    
    constructor(roll: number, result: string) {
        this.roll = roll;
        this.result = result;
    }    
}

export class FiveParsecs {  
    private tables: FPFHTables;
    private fleeInvasionResults: Array<ResultItem> = [
        new ResultItem(1, "Invasion! Assign equipment and proceed to Battle!"),
        new ResultItem(8, "You safely get off-world.")
    ]

    constructor() {        
        this.tables = new FPFHTables();
    }

    public processStep(step: Steps, substep: SubSteps): string {
        let result = "No Result";
        switch(step) {
            case Steps.Travel:
                result = this.processTravelStep(substep);
                break;
            default:
                result = `${step} not implemented`;
                break;
        }
        
        return result;
    }

    private processTravelStep(substep: SubSteps): string {
        let result = "No Result";
        switch(substep) {
            case SubSteps.TravelFleeInvasion: {
                const roll = this.tables.Roll("2d6");
                result = this.findResult(roll, this.fleeInvasionResults);
                result += ` (Rolled ${roll})`;
                break;
            }
            case SubSteps.TravelNewWorldArrival:
                result = `Travel ${substep} not implemented`;
                break;
            case SubSteps.TravelTravel:
                result = `Travel ${substep} not implemented`;
                break;
        }

        return result;
    }

    private findResult(roll: number, possibleResults: Array<ResultItem>) : string {
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