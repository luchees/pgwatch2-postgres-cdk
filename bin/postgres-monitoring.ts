#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { PostgresMonitoringStack } from '../lib/postgres-monitoring-stack';

const app = new cdk.App();
new PostgresMonitoringStack(app, 'PostgresMonitoringStack');
