// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Ship, Weapon, CrewMember, Crew } = initSchema(schema);

export {
  Ship,
  Weapon,
  CrewMember,
  Crew
};