import * as cdk from '@aws-cdk/core';

/**
 * AWS Infrastructure
 */
export const region = 'us-east-1';

/**
 * Cardano Node config
 */
 export const cardanoNode: {[key: string]: string} = {
    'release': '1.26.2',
    'libsodiumCommit': '66f017f1',
    'cabalRelease': '3.4.0.0',
    'ghcRelease': '8.10.2',
    'port': '3001',
    'network': 'testnet',
    'autostart': 'true',
    'instanceType': 't3a.large',
    'snapshotId': 'snap-0126f90ab96e048c9',
    'dataVolumeSizeGb': '24'
}