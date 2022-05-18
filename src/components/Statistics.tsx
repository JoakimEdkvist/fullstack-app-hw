import TopLosers from './TopLosers'
import TopWinners from './TopWinners'
import '../styles/Statistics.css'

const Statistics = () => {
  return (
    <div className="Statistics">
      <div>
        <h2 className="winners">Top 5 Winners</h2>
        <TopWinners />
      </div>
      <div>
        <h2 className="losers">Top 5 Losers</h2>
        <TopLosers />
      </div>
    </div>
  )
}
export default Statistics
