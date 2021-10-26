export const createpetschema = {
  type: "object",
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    tags: { type: 'string' },
  },
  required: ["name", "tags"]
} as const;

export const getpetschema = {
  type: "object",
  properties: {
    id: { type: 'string' }
  },
  required: ['id']
} as const;


export const deletepetschema = {
  type: "object",
  properties: {
    id: { type: 'string' }
  },
  required: ['id']
} as const;



