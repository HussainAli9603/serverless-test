import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
// import { Handler } from 'aws-lambda';
const Responses = require('../../common/API_Responses');

import Dynamo from "../../common/Dynamo"

import { createpetschema, getpetschema, deletepetschema } from './schema';

const createPets: ValidatedEventAPIGatewayProxyEvent<typeof createpetschema> = async (event) => {
  let id = await Math.floor(100000 + Math.random() * 109000);
  let idd = id.toString()
  const name = event.body.name;
  const tags = event.body.tags;
  const tableName = 'usersTables';

  const newUser = await Dynamo.write(idd, name, tags, tableName).catch(err => {
    console.log('error in dynamo write', err);
    return null;
  });
  console.log(newUser)

  if (!newUser) {
    return Responses._400({ code: -1140996, message: 'esse magna' });
  }
  return formatJSONResponse(newUser)

}
export const pets = middyfy(createPets);

// ------------------------------- Get Pet ById  --------------------------------------------
const getpets: ValidatedEventAPIGatewayProxyEvent<typeof getpetschema> = async (event) => {

  if (!event.pathParameters || !event.pathParameters.id) {
    // failed without an ID
    return Responses._400({ code: -1140996, message: 'esse magna' });
  }

  let id = event.pathParameters.id;
  let idd = id.toString()

  const tableName = 'usersTables';
  // "1"
  const pets = await Dynamo.get(idd, tableName).catch(err => {
    console.log('error in Dynamo Get', err);
    return null;
  });
  if (!pets) {
    return Responses._400({ code: -1140996, message: 'esse magna' });
  }
  return Responses._200(pets);

}
export const getpetsbyid = middyfy(getpets);


// ------------------------------- Delete Pets Data  --------------------------------------------
const deletepets: ValidatedEventAPIGatewayProxyEvent<typeof deletepetschema> = async (event) => {
  if (!event.pathParameters || !event.pathParameters.id) {
    return Responses._400({ code: -1140996, message: 'esse magna' });
  }
  let id = event.pathParameters.id;
  let idd = id.toString()
  const tableName = 'usersTables';

  const pets = await Dynamo.deletedata(idd, tableName).catch(err => {
    console.log('error in Dynamo Get', err);
    return null;
  });

  return Responses._200(pets);

}
export const deletepet = middyfy(deletepets);


// ------------------------------- Get All Pets  --------------------------------------------
const getallpets: ValidatedEventAPIGatewayProxyEvent<typeof getpetschema> = async (event) => {

  let data = event.queryStringParameters;
  const tags = data.tags;
  const limit = data.limit;
  const tableName = 'usersTables';

  const pets = await Dynamo.getsearch(tags, limit, tableName).catch(err => {
    console.log('error in Dynamo Get', err);
    return null;
  });
  if (!pets) {
    return Responses._400({ code: -1140996, message: 'esse magna' });
  }
  // return Responses._200(pets);
  return formatJSONResponse({
    Pet: pets,
  });

}
export const getallpet = middyfy(getallpets);
