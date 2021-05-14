import CardanoCliExecutor from './CardanoCliExecutor.js'
import Commands from './commands.js'

let cardanoCli = new CardanoCliExecutor();
//cardanoCli.execute(Commands.Commands.LIST_FILES);

let t = `curl -H 'project_id: yIiASEfGiDNeVjPhydXIjRX8Y5Mdw2PA' https://cardano-testnet.blockfrost.io/api/v0/txs/e13b1ec55e64d0807895ba81435e4275839dd57b5bb915d924b58eb3e6b1f390/metadata`;
cardanoCli.execute(t);
console.log(Commands)