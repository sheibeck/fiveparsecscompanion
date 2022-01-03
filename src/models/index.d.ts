import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type WorldMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CrewMemberMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CrewMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class World {
  readonly id: string;
  readonly crewID?: string;
  readonly name: string;
  readonly licensing_required?: boolean;
  readonly license_obtained?: boolean;
  readonly invading_forces?: string;
  readonly war_progress?: string;
  readonly patrons_known?: string;
  readonly rivals_known?: string;
  readonly traits?: string;
  readonly notes?: string;
  readonly user: string;
  readonly current_location?: boolean;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<World, WorldMetaData>);
  static copyOf(source: World, mutator: (draft: MutableModel<World, WorldMetaData>) => MutableModel<World, WorldMetaData> | void): World;
}

export declare class CrewMember {
  readonly id: string;
  readonly user: string;
  readonly name: string;
  readonly species?: string;
  readonly reactions?: number;
  readonly speed?: number;
  readonly combat?: number;
  readonly toughness?: number;
  readonly savvy?: number;
  readonly luck?: number;
  readonly gear?: string;
  readonly notes?: string;
  readonly weapons?: string;
  readonly xp?: number;
  readonly kia?: boolean;
  readonly leader?: boolean;
  readonly crewID?: string;
  readonly background?: string;
  readonly motivation?: string;
  readonly class?: string;
  readonly sick_bay?: boolean;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<CrewMember, CrewMemberMetaData>);
  static copyOf(source: CrewMember, mutator: (draft: MutableModel<CrewMember, CrewMemberMetaData>) => MutableModel<CrewMember, CrewMemberMetaData> | void): CrewMember;
}

export declare class Crew {
  readonly id: string;
  readonly user: string;
  readonly name: string;
  readonly notes?: string;
  readonly story_points?: number;
  readonly stash?: string;
  readonly credits?: number;
  readonly patrons?: number;
  readonly rivals?: number;
  readonly ship_name?: string;
  readonly ship_hull_points?: number;
  readonly ship_debt?: number;
  readonly ship_traits?: string;
  readonly ship_upgrades?: string;
  readonly story_track?: string;
  readonly event?: number;
  readonly clock?: number;
  readonly quest_rumors?: number;
  readonly CrewMembers?: (CrewMember | null)[];
  readonly campaign_turn?: number;
  readonly campaign_difficulty?: string;
  readonly campaign_victory?: string;
  readonly Worlds?: (World | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Crew, CrewMetaData>);
  static copyOf(source: Crew, mutator: (draft: MutableModel<Crew, CrewMetaData>) => MutableModel<Crew, CrewMetaData> | void): Crew;
}