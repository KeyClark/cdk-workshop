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
            partitionKey: {
                name: 'path',
                type: dynamodb.AttributeType.STRING
            }
        });
        this.table = table;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGl0Y291bnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhpdGNvdW50ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQXFDO0FBQ3JDLDhDQUE4QztBQUM5QyxrREFBa0Q7QUFPbEQsTUFBYSxVQUFXLFNBQVEsR0FBRyxDQUFDLFNBQVM7SUFRekM7OztNQUdFO0lBQ0YsWUFBWSxLQUFvQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUNoRSxxRkFBcUY7UUFDckYsNEZBQTRGO1FBQzVGLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsTUFBTSxLQUFLLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUU7WUFDM0MsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxNQUFNO2dCQUNaLElBQUksRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU07YUFDdEM7U0FDSixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtRQUVsQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLEVBQUU7WUFDMUQsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxPQUFPLEVBQUUsb0JBQW9CO1lBQzdCLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDckMsV0FBVyxFQUFFO2dCQUNULHNEQUFzRDtnQkFDdEQsc0JBQXNCO2dCQUN0Qix3QkFBd0IsRUFBRSxLQUFLLENBQUMsVUFBVSxDQUFDLFlBQVk7Z0JBQ3ZELGVBQWUsRUFBRSxLQUFLLENBQUMsU0FBUzthQUNuQztTQUNKLENBQUMsQ0FBQztRQUVILDREQUE0RDtRQUM1RCxLQUFLLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXZDLHNFQUFzRTtRQUN0RSxLQUFLLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDL0MsQ0FBQztDQUNKO0FBNUNELGdDQTRDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tICdAYXdzLWNkay9hd3MtbGFtYmRhJztcbmltcG9ydCAqIGFzIGR5bmFtb2RiIGZyb20gJ0Bhd3MtY2RrL2F3cy1keW5hbW9kYic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSGl0Q291bnRlclByb3BzIHtcbiAgICAvLyB0aGUgZnVuY3Rpb24gZm9yIHdoaWNoIHdlIGFudCB0byBjb3VudCB1cmwgaGl0c1xuICAgIGRvd25zdHJlYW06IGxhbWJkYS5JRnVuY3Rpb247XG59XG5cbmV4cG9ydCBjbGFzcyBIaXRDb3VudGVyIGV4dGVuZHMgY2RrLkNvbnN0cnVjdCB7XG4gICAgLy8gYWxsb3dzIGFjY2Vzc2luZyB0aGUgY291bnRlciBmdW5jdGlvblxuICAgIC8vIGNyZWF0ZXMgYSBoYW5kbGVyIHZhcmlhYmxlIHRoYXQgY24gb25seSBiZSBhY2Nlc3NlZCBleHRlcm5hbGx5IGFzIHJlYWRvbmx5XG4gICAgcHVibGljIHJlYWRvbmx5IGhhbmRsZXI6IGxhbWJkYS5GdW5jdGlvbjtcblxuICAgIC8vIHRoZSBoaXQgY291bnRlciB0YWJsZVxuICAgIHB1YmxpYyByZWFkb25seSB0YWJsZTogZHluYW1vZGIuVGFibGU7XG5cbiAgICAvKlxuICAgICAgICAtIENvbnN0cnVjdG9yIGlzIGEgbWV0aG9kIHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlIGNsYXNzIGlzIGNyZWF0ZWRcbiAgICAgICAgLSBDb25zdHJ1Y3RvciBhcmd1bWVudHMgZGVmaW5lIHRoZSBhcmd1bWVudHMgb2YgdGhlIEhpdENvdW50ZXIgY2xhc3NcbiAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogSGl0Q291bnRlclByb3BzKSB7XG4gICAgICAgIC8vIGluaXRpYWxpemVzIHRoZSBiYXNlIGNsYXNzIGFuZCBwYXNzZXMgdXAgdGhlIGFyZ3VtZW50cyByZWNpZXZlZCBieSB0aGUgY29uc3RydWN0b3JcbiAgICAgICAgLy8gbWV0aG9kcyBmcm9tIHRoZSBiYXNlIGNsYXNzIGNhbiBiZSBhY2Nlc3NlZCB2aWEgYHN1cGVyLk1ldGhvZCgpYCwgaW4gdGhpcyBjYXNlIG5vdCBuZWVkZWRcbiAgICAgICAgc3VwZXIoc2NvcGUsIGlkKTtcblxuICAgICAgICBjb25zdCB0YWJsZSA9IG5ldyBkeW5hbW9kYi5UYWJsZSh0aGlzLCAnSGl0cycsIHtcbiAgICAgICAgICAgIHBhcnRpdGlvbktleToge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdwYXRoJyxcbiAgICAgICAgICAgICAgICB0eXBlOiBkeW5hbW9kYi5BdHRyaWJ1dGVUeXBlLlNUUklOR1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnRhYmxlID0gdGFibGVcbiAgICBcbiAgICAgICAgdGhpcy5oYW5kbGVyID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCAnSGl0Q291bnRlckhhbmRsZXInLCB7XG4gICAgICAgICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTRfWCxcbiAgICAgICAgICAgIGhhbmRsZXI6ICdoaXRjb3VudGVyLmhhbmRsZXInLFxuICAgICAgICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KCdsYW1iZGEnKSxcbiAgICAgICAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgICAgICAgICAgLy8gdmFsdWVzIHRoYXQgb25seXQgcmVzb2x2ZSB3aGVuIHdlIGRlcGxveSBvdXIgc3RhY2suXG4gICAgICAgICAgICAgICAgLy8gXCJsYXRlLWJvdW5kXCIgdmFsdWVzXG4gICAgICAgICAgICAgICAgRE9XTlNUUkVBTV9GVU5DVElPTl9OQU1FOiBwcm9wcy5kb3duc3RyZWFtLmZ1bmN0aW9uTmFtZSxcbiAgICAgICAgICAgICAgICBISVRTX1RBQkxFX05BTUU6IHRhYmxlLnRhYmxlTmFtZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBncmFudCB0aGUgbGFtYmRhIHJvbGUgcmVhZC93cml0ZSBwZXJtaXNzaW9ucyB0byBvdXIgdGFibGVcbiAgICAgICAgdGFibGUuZ3JhbnRSZWFkV3JpdGVEYXRhKHRoaXMuaGFuZGxlcik7XG5cbiAgICAgICAgLy8gZ3JhbnQgdGhlIGxhbWJkYSByb2xlIGludm9rZSBwZXJtaXNzaW9ucyB0byB0aGUgZG93bnN0cmVhbSBmdW5jdGlvblxuICAgICAgICBwcm9wcy5kb3duc3RyZWFtLmdyYW50SW52b2tlKHRoaXMuaGFuZGxlcik7XG4gICAgfVxufSJdfQ==