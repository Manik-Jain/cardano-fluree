import cmd from 'node-cmd';

export default class CardanoCliExecutor {

    async executeSync(command) {
        let process = cmd.runSync(command, (err, data, stderr) => {
            if(err) {
                console.error(err)
            }
            console.log(data)
        })
        console.log(`Process executed with PID : ${process.pid}`)
        return process
    }

    async execute(command) {
        let process = cmd.run(command, (err, data, stderr) => {
            if(err) {
                console.error(err)
            }
            console.log(data)
        })
        console.log(`Process executed with PID : ${process.pid}`)
        return process
    }
}