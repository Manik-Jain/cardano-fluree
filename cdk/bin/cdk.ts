#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CoreStack } from '../lib/core-stack';
import { CardanoNodeStack } from '../lib/cardano-node-stack';
import * as config from './config';

const app = new cdk.App();

const coreStack = new CoreStack(app, 'CoreStack', {
  env: {
    region: config.region 
  },
});

const cardanoNodeStack = new CardanoNodeStack(app, 'CardanoNodeStack', {
  env: {
    region: config.region 
  },
  vpc: coreStack.vpc,
  binariesBucketName: `cardano-binaries-${app.account}`,
  config: config.cardanoNode
});
