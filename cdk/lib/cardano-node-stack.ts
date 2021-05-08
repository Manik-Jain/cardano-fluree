import cdk = require('@aws-cdk/core');
import ec2 = require('@aws-cdk/aws-ec2');
import iam = require('@aws-cdk/aws-iam');
import s3 = require('@aws-cdk/aws-s3');

import * as bootstrap from './cardano-node-bootstrap';

export interface CardanoNodeStackProps extends cdk.StackProps {
    vpc: ec2.Vpc;
    binariesBucketName: string;
    config: { [key: string]: string };
};

export class CardanoNodeStack extends cdk.Stack {

    constructor(scope: cdk.Construct, id: string, props: CardanoNodeStackProps) {

        super(scope, id, props);

        /** 
         * Instance Role Policy
        */

        const instanceRolePolicy = new iam.ManagedPolicy(this, 'InstanceRolePolicy', {
            statements: [
                new iam.PolicyStatement({
                    effect: iam.Effect.ALLOW,
                    resources: [
                        '*'
                    ],
                    actions: [
                        's3:GetObject'
                    ]
                })
            ]
        });

        /** 
         * Instance Role
        */
        const instanceRole = new iam.Role(this, 'InstanceRole', {
            assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
            managedPolicies: [
                iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'),
                instanceRolePolicy
            ]
        });


        /**
         * Security Group
         */

        const sg = new ec2.SecurityGroup(this, 'SG', {
            vpc: props.vpc,
            allowAllOutbound: true
        });

        /**
         * Bootstrap Script (User Data)
         */

        const userData = ec2.UserData.forLinux();
        userData.addCommands(
            ...bootstrap.attachDataDrive(),
            ...bootstrap.buildLibsodium(props.config['libsodiumCommit']),
            ...bootstrap.downloadCompiledCardanoBinaries(props.binariesBucketName, props.config['release'], props.config['snapshotId']),
            ...bootstrap.downloadConfiguration(props.config['network'], props.config['snapshotId']),
            ...bootstrap.createCardanoUser(),
            ...bootstrap.createStartupScript(props.config['network'], +props.config['port']),
            ...bootstrap.installGLiveView(props.config['network']),
            ...bootstrap.startNode(props.config['autostart'] == 'true')
        );

        /**
         * Cardano Node Ec2 instance
         */

        const cardanoNode = new ec2.Instance(this, 'CardanoNode', {
            vpc: props.vpc,
            vpcSubnets: {
                subnets: [props.vpc.publicSubnets[0]]
            },
            instanceType: new ec2.InstanceType(props.config['instanceType']),
            machineImage: new ec2.AmazonLinuxImage({
                generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
                cpuType: ec2.AmazonLinuxCpuType.X86_64
            }),
            blockDevices: [{
                deviceName: '/dev/sdb',
                volume: props.config['snapshotId']
                    ? { ebsDevice: { snapshotId: props.config['snapshotId'] } }
                    : ec2.BlockDeviceVolume.ebs(+props.config['dataVolumeSizeGb'])
            }],
            role: instanceRole,
            userData: userData,
            securityGroup: sg
        });

        cdk.Tags.of(cardanoNode).add('configuration', 'cardano-node');

    }
}