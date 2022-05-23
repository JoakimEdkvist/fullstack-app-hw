import TopLosers from './TopLosers'
import TopWinners from './TopWinners'
import '../styles/Statistics.css'

const Statistics = () => {
  return (
    <div className="Statistics">
      <div>
        <h2 className="winners">Topp 5 Vinnare</h2>
        <TopWinners />
      </div>
      <div>
        <h2 className="losers">Topp 5 Förlorare</h2>
        <TopLosers />
      </div>
    </div>
  )
}
export default Statistics
