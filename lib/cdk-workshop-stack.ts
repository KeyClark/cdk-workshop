import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';
import { HitCounter } from './hitcounter';

export class CdkWorkshopStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // defines an AWS Lambda resource
    const hello = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_14_X, // execution enviornment
      code: lambda.Code.fromAsset('lambda'), // code loaded from "lambda" directory
      handler: 'hello.handler' // file is "hello", fundtion is handler
    });

    // new object of HitCounter with a Lambda function from above being passed into the props
    const helloWithCounter = new HitCounter(this, 'HelloHitCounter', {
      downstream: hello
    })

    // defines an API Gateway REST API resource backed by our "hello" function
    new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: helloWithCounter.handler
    });
  }
}
