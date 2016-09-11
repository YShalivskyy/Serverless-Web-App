console.log('Loading function');

var aws = require('dynamodb-doc');
var dynamo = new aws.DynamoDB();

/**
 * Provide an event that contains the following keys:
 *
 *   - operation: one of the operations in the switch statement below
 *   - tableName: required for operations that interact with DynamoDB
 *   - payload: a parameter to pass to the operation being performed
 */
exports.handler = function(event, context, callback) {
    console.log('Received event:', JSON.stringify(event, null, 2));
    console.log("Context received:\n", JSON.stringify(context));
    
    var tableName = "UserDataTable";
    var operation = event.operation;
    var payload;

    switch (operation) {
        case 'POST':
            payload = {
                TableName: tableName,
                Item: event.Item
            };
            dynamo.putItem(payload, function(err,data){
                if (err) {
                    console.log("PutItem error" + err);
                    context.fail("PutItem error" + err);
                }
                else {
                    console.log("PutItem success");
                    console.log(JSON.stringify(data, null, '  '));
                }
            });
            break;
        case 'SCAN':
            payload = {
                TableName: tableName
            };
            dynamo.scan(payload, function(err, data) {
                if (err) {
                    console.log("Scan error" + err);
                    context.fail("Scan error" + err);
                }
                else {
                    console.log("Scan success");
                    console.log(data);
                }
            });
            break;
        case 'read':
            dynamo.getItem(event.payload, callback);
            break;
        case 'update':
            dynamo.updateItem(event.payload, callback);
            break;
        case 'delete':
            dynamo.deleteItem(event.payload, callback);
            break;
        case 'echo':
            callback(null, "Success");
            break;
        case 'ping':
            callback(null, "pong");
            break;
        default:
            callback('Unknown operation: ${operation}');
    }
};