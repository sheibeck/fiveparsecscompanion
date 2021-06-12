// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { World, CrewMember, Crew } = initSchema(schema);

export {
  World,
  CrewMember,
  Crew
};