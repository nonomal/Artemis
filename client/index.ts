import type { GlobalConf, oneTimeDataType } from "./src/type"
import { startTimer } from "./src/dataUpdater"
import { transmitter } from "./src/socket"

const env = process.env
const args = require('minimist')(process.argv)

export const GlobalConfiguration: GlobalConf = {
    remote: env.REMOTE || args.r || args.remote || 'ws://127.0.0.0:9702',
    key: env.KEY || args.k || args.key || 'oATqKPjF72wau8MdJPhV',
    name: env.NAME || args.n || args.name || 'Infra',
    updInterval: env.UPI || args.u || args.updateinterval || 1.2,
    verbose: args.v || args.verbose || false
}

const IPandLoc = await (await fetch('https://api.country.is/')).json()


export const oneTimeData: oneTimeDataType = {
    countryCode: IPandLoc.country
}


await startTimer()
transmitter()
