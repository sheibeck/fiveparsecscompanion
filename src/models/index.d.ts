import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Ship {
  readonly id: string;
  readonly name?: string;
  readonly hull_points?: number;
  readonly debt?: number;
  readonly traits?: string;
  readonly upgrade?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Ship>);
  static copyOf(source: Ship, mutator: (draft: MutableModel<Ship>) => MutableModel<Ship> | void): Ship;
}

export declare class Weapon {
  readonly id: string;
  readonly name?: number;
  readonly range?: number;
  readonly shots?: number;
  readonly damage?: number;
  readonly trait?: string;
  readonly mods?: string;
  readonly crewmemberID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Weapon>);
  static copyOf(source: Weapon, mutator: (draft: MutableModel<Weapon>) => MutableModel<Weapon> | void): Weapon;
}

export declare class CrewMember {
  readonly id: string;
  readonly name?: string;
  readonly species?: string;
  readonly reactions?: number;
  readonly speed?: number;
  readonly combat?: number;
  readonly toughness?: string;
  readonly savvy?: number;
  readonly luck?: number;
  readonly x?: number;
  readonly notes?: string;
  readonly gear?: string;
  readonly crewID?: string;
  readonly Weapons?: (Weapon | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<CrewMember>);
  static copyOf(source: CrewMember, mutator: (draft: MutableModel<CrewMember>) => MutableModel<CrewMember> | void): CrewMember;
}

export declare class Crew {
  readonly id: string;
  readonly story_points?: number;
  readonly notes?: string;
  readonly stash?: string;
  readonly equipment?: string;
  readonly credit?: number;
  readonly patrons?: number;
  readonly rivals?: number;
  readonly story_track?: string;
  readonly event?: number;
  readonly clock?: number;
  readonly rumors?: number;
  readonly CrewMembers?: (CrewMember | null)[];
  readonly name?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Crew>);
  static copyOf(source: Crew, mutator: (draft: MutableModel<Crew>) => MutableModel<Crew> | void): Crew;
}