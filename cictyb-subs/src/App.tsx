import SubscriberList from './components/SubscriberList'
import { Analytics } from "@vercel/analytics/react"
import './styles/index.css'

function App() {
  return (
    <>
      <SubscriberList />
      <Analytics />
    </>
  )
}

export default App