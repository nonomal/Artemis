import { hread, secondsToTime } from "toolbx"
import { serverInStore } from "../../../server/src/type"
export const ServerCard = (props: {
    currentTS: number
    data: serverInStore
}) => {
    
    const Huptime = secondsToTime(props.currentTS - props.data.uptime)

    const CPUusage = Math.round(props.data.cpu * 100) / 100

    const memUsage = Math.round(props.data.mem.onboard.used / props.data.mem.onboard.total * 10000) / 100
    const HmemTotal = hread(props.data.mem.onboard.total)
    const HmemUsed = hread(props.data.mem.onboard.used)

    const swapUsage = Math.round(props.data.mem.swap.used / props.data.mem.swap.total * 10000) / 100
    const HswapTotal = hread(props.data.mem.swap.total)
    const HswapUsed = hread(props.data.mem.swap.used)

    const HnetworkRX = hread(props.data.network.total.down, true)
    const HnetworkTX = hread(props.data.network.total.up, true)
    const HCnetworkRX = hread(props.data.network.current.down * 8, true, 0, false)
    const HCnetworkTX = hread(props.data.network.current.up * 8, true, 0, false)

    const stoUsage = Math.round(props.data.storage.used / props.data.storage.total * 10000) / 100
    const HstoTotal = hread(props.data.storage.total)
    const HstoUsed = hread(props.data.storage.used)


    return (
        <article id={props.data.name} className="medium-width no-margin">
            <div className="row">
                <div>
                    <img className="large" src={`/client/${props.data.location}.svg`} /><br />
                    <div className={`chip responsive no-margin ${props.currentTS - props.data.timestamp > 60 ? 'red' : 'green'}`}><i>{props.currentTS - props.data.timestamp > 60 ? 'close' : 'verified'}</i></div>
                </div>
                <div className="max">
                    <h5>{props.data.name}</h5>
                    <i>snowing_heavy</i><br /><span>Load: {props.data.loadAVG}</span><br />
                    <i>restart_alt</i><br /><span>Uptime: {Huptime.num} {Huptime.unit}</span>
                </div>
                <div className="max">
                    <span><i>bar_chart</i> NW Tot: </span><br />
                    <span>{HnetworkTX.num}{HnetworkTX.unit}↑</span><br />
                    <span>{HnetworkRX.num}{HnetworkRX.unit}↓</span><br />
                    <span><i>settings_ethernet</i> NW RT: </span><br />
                    <span>{HCnetworkTX.num}{HCnetworkTX.unit}ps↑</span><br />
                    <span>{HCnetworkRX.num}{HCnetworkRX.unit}ps↓</span><br />
                </div>
            </div>
            <div className="space"></div>
            <div className="nav">
                <div className="chip responsive no-margin">
                    <span>CPU: {CPUusage} %</span>
                    <progress className={`max ${props.data.cpu > 80 ? 'red' : ''}`} value={props.data.cpu} max="100"></progress>
                </div>
                <div className="small-space"></div>
                <div className="chip responsive no-margin">
                    <span>Mem: {memUsage} % | {HmemUsed.num}{HmemUsed.unit} / {HmemTotal.num}{HmemTotal.unit}</span>
                    <progress className={`max ${memUsage > 80 ? 'red' : ''}`} value={memUsage} max="100"></progress>
                </div>
                <div className="small-space"></div>
                <div className="chip responsive no-margin">
                    <span>Swap: {swapUsage} % | {HswapUsed.num}{HswapUsed.unit} / {HswapTotal.num}{HswapTotal.unit}</span>
                    <progress className={`max ${swapUsage > 80 ? 'red' : ''}`} value={swapUsage} max="100"></progress>
                </div>
                <div className="small-space"></div>
                <div className="chip responsive no-margin">
                    <span>Storage: {stoUsage} % | {HstoUsed.num}{HstoUsed.unit} / {HstoTotal.num}{HstoTotal.unit}</span>
                    <progress className={`max ${stoUsage > 80 ? 'red' : ''}`} value={stoUsage} max="100"></progress>
                </div>
            </div>
        </article>
    )

}