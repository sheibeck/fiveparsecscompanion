import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Crew {
  readonly id: string;
  readonly story_points?: number;
  readonly notes?: string;
  readonly stash?: string;  
  readonly credits?: number;
  readonly patrons?: number;
  readonly rivals?: number;
  readonly story_track?: string;
  readonly event?: number;
  readonly clock?: number;
  readonly rumors?: number;
  readonly name?: string;
  readonly pk: string;
  readonly sk: string;
  readonly record_type?: string;
  readonly user: string;
  readonly species?: string;
  readonly reaction?: number;
  readonly speed?: number;
  readonly combat?: number;
  readonly toughness?: number;
  readonly savvy?: number;
  readonly luck?: number;
  readonly xp?: number;
  readonly gear?: string;
  readonly hull_points?: number;
  readonly debt?: number;
  readonly traits?: string;
  readonly upgrades?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Crew>);
  static copyOf(source: Crew, mutator: (draft: MutableModel<Crew>) => MutableModel<Crew> | void): Crew;
}