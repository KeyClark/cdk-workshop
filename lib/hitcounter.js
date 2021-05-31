"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HitCounter = void 0;
const cdk = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
const dynamodb = require("@aws-cdk/aws-dynamodb");
class HitCounter extends cdk.Construct {
    /*
        - Constructor is a method that is called when the class is created
        - Constructor arguments define the arguments of the HitCounter class
    */
    constructor(scope, id, props) {
        // initializes the base class and passes up the arguments recieved by the constructor
        // methods from the base class can be accessed via `super.Method()`, in this case not needed
        super(scope, id);
        const table = new dynamodb.Table(this, 'Hits', {
            partitionKey: { name: 'path', type: dynamodb.AttributeType.STRING }
        });
        this.handler = new lambda.Function(this, 'HitCounterHandler', {
            runtime: lambda.Runtime.NODEJS_14_X,
            handler: 'hitcounter.handler',
            code: lambda.Code.fromAsset('lambda'),
            environment: {
                // values that onlyt resolve when we deploy our stack.
                // "late-bound" values
                DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
                HITS_TABLE_NAME: table.tableName
            }
        });
        // grant the lambda role read/write permissions to our table
        table.grantReadWriteData(this.handler);
        // grant the lambda role invoke permissions to the downstream function
        props.downstream.grantInvoke(this.handler);
    }
}
exports.HitCounter = HitCounter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGl0Y291bnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhpdGNvdW50ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQXFDO0FBQ3JDLDhDQUE4QztBQUM5QyxrREFBa0Q7QUFPbEQsTUFBYSxVQUFXLFNBQVEsR0FBRyxDQUFDLFNBQVM7SUFLekM7OztNQUdFO0lBQ0YsWUFBWSxLQUFvQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUNoRSxxRkFBcUY7UUFDckYsNEZBQTRGO1FBQzVGLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsTUFBTSxLQUFLLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUU7WUFDM0MsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUU7U0FDdEUsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLG1CQUFtQixFQUFFO1lBQzFELE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsT0FBTyxFQUFFLG9CQUFvQjtZQUM3QixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1lBQ3JDLFdBQVcsRUFBRTtnQkFDVCxzREFBc0Q7Z0JBQ3RELHNCQUFzQjtnQkFDdEIsd0JBQXdCLEVBQUUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxZQUFZO2dCQUN2RCxlQUFlLEVBQUUsS0FBSyxDQUFDLFNBQVM7YUFDbkM7U0FDSixDQUFDLENBQUM7UUFFSCw0REFBNEQ7UUFDNUQsS0FBSyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV2QyxzRUFBc0U7UUFDdEUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9DLENBQUM7Q0FDSjtBQXBDRCxnQ0FvQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSAnQGF3cy1jZGsvYXdzLWxhbWJkYSc7XG5pbXBvcnQgKiBhcyBkeW5hbW9kYiBmcm9tICdAYXdzLWNkay9hd3MtZHluYW1vZGInO1xuXG5leHBvcnQgaW50ZXJmYWNlIEhpdENvdW50ZXJQcm9wcyB7XG4gICAgLy8gdGhlIGZ1bmN0aW9uIGZvciB3aGljaCB3ZSBhbnQgdG8gY291bnQgdXJsIGhpdHNcbiAgICBkb3duc3RyZWFtOiBsYW1iZGEuSUZ1bmN0aW9uO1xufVxuXG5leHBvcnQgY2xhc3MgSGl0Q291bnRlciBleHRlbmRzIGNkay5Db25zdHJ1Y3Qge1xuICAgIC8vIGFsbG93cyBhY2Nlc3NpbmcgdGhlIGNvdW50ZXIgZnVuY3Rpb25cbiAgICAvLyBjcmVhdGVzIGEgaGFuZGxlciB2YXJpYWJsZSB0aGF0IGNuIG9ubHkgYmUgYWNjZXNzZWQgZXh0ZXJuYWxseSBhcyByZWFkb25seVxuICAgIHB1YmxpYyByZWFkb25seSBoYW5kbGVyOiBsYW1iZGEuRnVuY3Rpb25cblxuICAgIC8qXG4gICAgICAgIC0gQ29uc3RydWN0b3IgaXMgYSBtZXRob2QgdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgY2xhc3MgaXMgY3JlYXRlZFxuICAgICAgICAtIENvbnN0cnVjdG9yIGFyZ3VtZW50cyBkZWZpbmUgdGhlIGFyZ3VtZW50cyBvZiB0aGUgSGl0Q291bnRlciBjbGFzc1xuICAgICovXG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBIaXRDb3VudGVyUHJvcHMpIHtcbiAgICAgICAgLy8gaW5pdGlhbGl6ZXMgdGhlIGJhc2UgY2xhc3MgYW5kIHBhc3NlcyB1cCB0aGUgYXJndW1lbnRzIHJlY2lldmVkIGJ5IHRoZSBjb25zdHJ1Y3RvclxuICAgICAgICAvLyBtZXRob2RzIGZyb20gdGhlIGJhc2UgY2xhc3MgY2FuIGJlIGFjY2Vzc2VkIHZpYSBgc3VwZXIuTWV0aG9kKClgLCBpbiB0aGlzIGNhc2Ugbm90IG5lZWRlZFxuICAgICAgICBzdXBlcihzY29wZSwgaWQpO1xuXG4gICAgICAgIGNvbnN0IHRhYmxlID0gbmV3IGR5bmFtb2RiLlRhYmxlKHRoaXMsICdIaXRzJywge1xuICAgICAgICAgICAgcGFydGl0aW9uS2V5OiB7IG5hbWU6ICdwYXRoJywgdHlwZTogZHluYW1vZGIuQXR0cmlidXRlVHlwZS5TVFJJTkcgfVxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgdGhpcy5oYW5kbGVyID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCAnSGl0Q291bnRlckhhbmRsZXInLCB7XG4gICAgICAgICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTRfWCxcbiAgICAgICAgICAgIGhhbmRsZXI6ICdoaXRjb3VudGVyLmhhbmRsZXInLFxuICAgICAgICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KCdsYW1iZGEnKSxcbiAgICAgICAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgICAgICAgICAgLy8gdmFsdWVzIHRoYXQgb25seXQgcmVzb2x2ZSB3aGVuIHdlIGRlcGxveSBvdXIgc3RhY2suXG4gICAgICAgICAgICAgICAgLy8gXCJsYXRlLWJvdW5kXCIgdmFsdWVzXG4gICAgICAgICAgICAgICAgRE9XTlNUUkVBTV9GVU5DVElPTl9OQU1FOiBwcm9wcy5kb3duc3RyZWFtLmZ1bmN0aW9uTmFtZSxcbiAgICAgICAgICAgICAgICBISVRTX1RBQkxFX05BTUU6IHRhYmxlLnRhYmxlTmFtZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBncmFudCB0aGUgbGFtYmRhIHJvbGUgcmVhZC93cml0ZSBwZXJtaXNzaW9ucyB0byBvdXIgdGFibGVcbiAgICAgICAgdGFibGUuZ3JhbnRSZWFkV3JpdGVEYXRhKHRoaXMuaGFuZGxlcik7XG5cbiAgICAgICAgLy8gZ3JhbnQgdGhlIGxhbWJkYSByb2xlIGludm9rZSBwZXJtaXNzaW9ucyB0byB0aGUgZG93bnN0cmVhbSBmdW5jdGlvblxuICAgICAgICBwcm9wcy5kb3duc3RyZWFtLmdyYW50SW52b2tlKHRoaXMuaGFuZGxlcik7XG4gICAgfVxufSJdfQ==