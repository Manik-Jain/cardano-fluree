# Fluree Sidechain on Cardano AWS Infrastructure

## Prerequisites 
_Note: This instructions have been tested on MacOs Catalina v10.15.7_

Check if Node is already installed:
```
$ node -v
$ npm -v
```
if not:
```
$ brew install node
```
If brew is not installed:
```
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

#### AWS CDK
Check if AWS CDK is already installed:
```
$ cdk --version
```
If not:
```
$ npm install -g aws-cdk
```

#### AWS CLI
Check if AWS CLI is already installed: 
```
$ aws --version
```
If not:
```
$ curl https://awscli.amazonaws.com/AWSCLIV2.pkg -o /tmp/AWSCLIV2.pkg
$ sudo installer -pkg /tmp/AWSCLIV2.pkg -target /
$ rm /tmp/AWSCLIV2.pkg
```

#### JQ
Check if JQ is installed:
```
$ jq --version
```
If, not:
```
$ brew install jq
```

#### Session Manager Plugin
You need this for being able to connect to resources launched in private subnets

```
$ curl https://s3.amazonaws.com/session-manager-downloads/plugin/latest/mac/sessionmanager-bundle.zip -o /tmp/sessionmanager-bundle.zip
$ unzip /tmp/sessionmanager-bundle.zip -d /tmp
$ sudo /tmp/sessionmanager-bundle/install -i /usr/local/sessionmanagerplugin -b /usr/local/bin/session-manager-plugin
$ rm -rf /tmp/sessionmanager*
```

#### Configure AWS profile

Configure AWS profile, by following the steps in this command. User `us-east-1` for region and `json` for the output format, unless you prefer something else. 

```
$ aws configure --profile <your-profile-name>
```
Give some cool name to your AWS profile

_Note: Though it's possible to create an AWS profile without specifying the profile name, it's not recommended, since you might have more than one AWS account and it's better always knowing which one is set as a default_

Set your AWS profile as default in your shell config
```
$ echo "export AWS_PROFILE=<your-profile-name>" >> ~/.zshrc
$ source ~/.zshrc
```
If your shell is not ZSH, then use `.bash_profile` for Bash, or whatever it is for something else you might have.

## Launching the cardano node stack

### Launch cardano node
```
$ cdk deploy CardanoNodeStack
```

### Connect to the cardano node instance
```
$ bin/connect cardano-node
$ sudo su cardano
$ cd /cardano
```
If you just launched the stack and can't connect, wait for a few minutes and try again

### Check cardano-node process status
```
$ sudo systemctl status cardano-node
```

### Restart cardano-node
```
$ sudo systemctl restart cardano-node
```

### Monitor cardano-node sync status
```
$ cd /cardano/glive-view
$ ./gLiveView.sh

```

### View cardano-node process log
```
$ journalctl --unit=cardano-node --follow
```

### Terminate cardano node instance
```
$ cdk destroy CardanoNodeStack
```
