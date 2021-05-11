const Commands = {
    'LIST_FILES' : 'ls -lrt',
    'DEPLOY_CARDANO' : 'cd ../cdk && cdk deploy CardanoNodeStack'
}

Object.freeze(Commands);

export default {
    Commands
}