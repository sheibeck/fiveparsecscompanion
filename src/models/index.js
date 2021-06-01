// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { CrewMember, Crew } = initSchema(schema);

export {
  CrewMember,
  Crew
};