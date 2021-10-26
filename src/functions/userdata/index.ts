import { createpetschema, getpetschema } from './schema';
import { handlerPath } from '@libs/handlerResolver';

export const createpets = {
  handler: `${handlerPath(__dirname)}/handler.pets`,
  events: [
    {
      http: {
        method: 'post',
        path: 'pets',
        request: {
          schema: {
            'application/json': createpetschema
          }
        }
      }
    }
  ],

}

export const getpets = {
  handler: `${handlerPath(__dirname)}/handler.getpetsbyid`,
  events: [
    {
      http: {
        method: 'get',
        path: 'pets/{id}',
        request: {
          schema: {
            'application/json': getpetschema
          }
        }
      }
    }
  ],

}


export const deletepets = {
  handler: `${handlerPath(__dirname)}/handler.deletepet`,
  events: [
    {
      http: {
        method: 'delete',
        path: 'pets/{id}',
        request: {

        }
      }
    }
  ],

}

export const getallpet = {
  handler: `${handlerPath(__dirname)}/handler.getallpet`,
  events: [
    {
      http: {
        method: 'get',
        path: 'pets',
      }
    }
  ],

}





