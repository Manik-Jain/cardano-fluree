import CardanoCliExecutor from './CardanoCliExecutor.js'
import Commands from './commands.js'

let cardanoCli = new CardanoCliExecutor();
cardanoCli.execute(Commands.Commands.LIST_FILES);
console.log(Commands)