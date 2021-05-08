import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';

export interface CoreStackProps extends cdk.StackProps {
   // add future props here to pass to the stack
}

export class CoreStack extends cdk.Stack {
  
  public readonly vpc: ec2.Vpc;

  constructor(scope: cdk.Construct, id: string, props: CoreStackProps) {
    
    super(scope, id, props);

      /**
       * VPC
       * 
       * Setting default VPC with 2 private and 2 public subnets
       * 
       */

      this.vpc = new ec2.Vpc(this, 'VPC', {
        natGateways: 0
      });

  }
}
