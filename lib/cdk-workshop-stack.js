"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdkWorkshopStack = void 0;
const cdk = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
const apigw = require("@aws-cdk/aws-apigateway");
const hitcounter_1 = require("./hitcounter");
const cdk_dynamo_table_viewer_1 = require("cdk-dynamo-table-viewer");
class CdkWorkshopStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // defines an AWS Lambda resource
        const hello = new lambda.Function(this, 'HelloHandler', {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'hello.handler' // file is "hello", fundtion is handler
        });
        // new object of HitCounter with a Lambda function from above being passed into the props
        const helloWithCounter = new hitcounter_1.HitCounter(this, 'HelloHitCounter', {
            downstream: hello
        });
        // defines an API Gateway REST API resource backed by our "hello" function
        new apigw.LambdaRestApi(this, 'Endpoint', {
            handler: helloWithCounter.handler
        });
        // Add cdk-dynamo-table-viewer to render contents of dynamodb in browswer.
        new cdk_dynamo_table_viewer_1.TableViewer(this, 'ViewHitCounter', {
            title: 'Hello Hits',
            table: helloWithCounter.table,
            sortBy: '-hits'
        });
    }
}
exports.CdkWorkshopStack = CdkWorkshopStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLXdvcmtzaG9wLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLXdvcmtzaG9wLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFxQztBQUNyQyw4Q0FBOEM7QUFDOUMsaURBQWlEO0FBQ2pELDZDQUEwQztBQUMxQyxxRUFBcUQ7QUFFckQsTUFBYSxnQkFBaUIsU0FBUSxHQUFHLENBQUMsS0FBSztJQUM3QyxZQUFZLEtBQWMsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDNUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsaUNBQWlDO1FBQ2pDLE1BQU0sS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQ3RELE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztZQUNyQyxPQUFPLEVBQUUsZUFBZSxDQUFDLHVDQUF1QztTQUNqRSxDQUFDLENBQUM7UUFFSCx5RkFBeUY7UUFDekYsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLHVCQUFVLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFO1lBQy9ELFVBQVUsRUFBRSxLQUFLO1NBQ2xCLENBQUMsQ0FBQTtRQUVGLDBFQUEwRTtRQUMxRSxJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUN4QyxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsT0FBTztTQUNsQyxDQUFDLENBQUM7UUFFSCwwRUFBMEU7UUFDMUUsSUFBSSxxQ0FBVyxDQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRTtZQUN0QyxLQUFLLEVBQUUsWUFBWTtZQUNuQixLQUFLLEVBQUUsZ0JBQWdCLENBQUMsS0FBSztZQUM3QixNQUFNLEVBQUUsT0FBTztTQUNoQixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUE1QkQsNENBNEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gJ0Bhd3MtY2RrL2F3cy1sYW1iZGEnO1xuaW1wb3J0ICogYXMgYXBpZ3cgZnJvbSAnQGF3cy1jZGsvYXdzLWFwaWdhdGV3YXknO1xuaW1wb3J0IHsgSGl0Q291bnRlciB9IGZyb20gJy4vaGl0Y291bnRlcic7XG5pbXBvcnQgeyBUYWJsZVZpZXdlciB9IGZyb20gJ2Nkay1keW5hbW8tdGFibGUtdmlld2VyJ1xuXG5leHBvcnQgY2xhc3MgQ2RrV29ya3Nob3BTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQXBwLCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICAvLyBkZWZpbmVzIGFuIEFXUyBMYW1iZGEgcmVzb3VyY2VcbiAgICBjb25zdCBoZWxsbyA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgJ0hlbGxvSGFuZGxlcicsIHtcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xNF9YLCAvLyBleGVjdXRpb24gZW52aW9ybm1lbnRcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldCgnbGFtYmRhJyksIC8vIGNvZGUgbG9hZGVkIGZyb20gXCJsYW1iZGFcIiBkaXJlY3RvcnlcbiAgICAgIGhhbmRsZXI6ICdoZWxsby5oYW5kbGVyJyAvLyBmaWxlIGlzIFwiaGVsbG9cIiwgZnVuZHRpb24gaXMgaGFuZGxlclxuICAgIH0pO1xuXG4gICAgLy8gbmV3IG9iamVjdCBvZiBIaXRDb3VudGVyIHdpdGggYSBMYW1iZGEgZnVuY3Rpb24gZnJvbSBhYm92ZSBiZWluZyBwYXNzZWQgaW50byB0aGUgcHJvcHNcbiAgICBjb25zdCBoZWxsb1dpdGhDb3VudGVyID0gbmV3IEhpdENvdW50ZXIodGhpcywgJ0hlbGxvSGl0Q291bnRlcicsIHtcbiAgICAgIGRvd25zdHJlYW06IGhlbGxvXG4gICAgfSlcblxuICAgIC8vIGRlZmluZXMgYW4gQVBJIEdhdGV3YXkgUkVTVCBBUEkgcmVzb3VyY2UgYmFja2VkIGJ5IG91ciBcImhlbGxvXCIgZnVuY3Rpb25cbiAgICBuZXcgYXBpZ3cuTGFtYmRhUmVzdEFwaSh0aGlzLCAnRW5kcG9pbnQnLCB7XG4gICAgICBoYW5kbGVyOiBoZWxsb1dpdGhDb3VudGVyLmhhbmRsZXJcbiAgICB9KTtcblxuICAgIC8vIEFkZCBjZGstZHluYW1vLXRhYmxlLXZpZXdlciB0byByZW5kZXIgY29udGVudHMgb2YgZHluYW1vZGIgaW4gYnJvd3N3ZXIuXG4gICAgbmV3IFRhYmxlVmlld2VyKHRoaXMsICdWaWV3SGl0Q291bnRlcicsIHtcbiAgICAgIHRpdGxlOiAnSGVsbG8gSGl0cycsXG4gICAgICB0YWJsZTogaGVsbG9XaXRoQ291bnRlci50YWJsZSxcbiAgICAgIHNvcnRCeTogJy1oaXRzJ1xuICAgIH0pO1xuICB9XG59XG4iXX0=