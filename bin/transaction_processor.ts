#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { TransactionProcessorStack } from '../lib/transaction_processor-stack';

const app = new cdk.App();
new TransactionProcessorStack(app, 'TransactionProcessorStack');
