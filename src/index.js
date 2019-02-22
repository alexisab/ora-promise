const ora = require('ora')

module.exports = (message, pendingPromise) => {
    const spinner = ora(message).start()

    if (typeof pendingPromise === 'function') {
        pendingPromise = pendingPromise()
    }

    return new Promise(resolve => {
        pendingPromise
            .then(res => {
                spinner.succeed()
                resolve(res)
            })
            .catch(e => {
                spinner.fail()
                console.error(e)
                process.exit(1)
            })
    })
}
