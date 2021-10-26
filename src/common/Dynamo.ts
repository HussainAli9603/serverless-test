const AWS = require('aws-sdk');

// let options = {};
// if (process.env.IS_OFFLINE) {
let options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
};
// }

const documentClient = new AWS.DynamoDB.DocumentClient(options);

const Dynamo = {
    async write(id, name, tags, TableName) {
        console.log(id)
        const params = {
            TableName,
            Item: {
                id,
                "name": name,
                "tags": tags,
            }
        };
        const res = await documentClient.put(params).promise();

        if (!res) {
            throw Error(`There was an error in table ${TableName}`);
        }

        return params
    },
    // -------------------------------Get Data----------------------------------
    async get(id, TableName) {
        const params = {
            TableName,
            Key: {
                id,
            },
        };

        const data = await documentClient.get(params).promise();

        if (!data || !data.Item) {
            throw Error(`There was an error fetching the data for ID of ${id} from ${TableName}`);
        }

        return data;
    },
    // -------------------------------DELETE Data----------------------------------
    async deletedata(id, TableName) {
        const params = {
            TableName,
            Key: {
                id,
            },
        };
        const data = await documentClient.delete(params).promise();
        console.log(data)

        // return data;
    },

    // -------------------------------Get Pets Data----------------------------------
    async getsearch(Tags, Limit, TableName) {
        const params = {
            TableName,
            FilterExpression: 'tags = :anything',
            ExpressionAttributeValues: { ':anything': Tags },
            Limit: Limit

        };

        const data = await documentClient.scan(params).promise();

        return data.Items;
    },



};
export default Dynamo
// module.exports = Dynamo;




