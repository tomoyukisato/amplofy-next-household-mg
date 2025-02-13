import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
import { storage } from './storage/resource';
import { sayHello } from './functions/say-hello/resource';
import { EventType } from 'aws-cdk-lib/aws-s3';
import { LambdaDestination } from 'aws-cdk-lib/aws-s3-notifications';
import * as iam from "aws-cdk-lib/aws-iam";
// import { BucketNotificationDestinationConfig } from "aws-cdk-lib/aws-s3-notifications";


const backend = defineBackend({
  auth,
  data,
  storage,
  sayHello
});
backend.storage.resources.bucket.addEventNotification(
	EventType.OBJECT_CREATED_PUT,
	new LambdaDestination(backend.sayHello.resources.lambda),
	{
		prefix: 'picture-submissions/',
	}
);