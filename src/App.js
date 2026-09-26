import { useState, useEffect } from 'react'
import Map from './components/Map'

function App() {
  const [eventData, setEventData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(
          'https://eonet.gsfc.nasa.gov/api/v2.1/events'
        )

        const data = await res.json()
        setEventData(data.events || [])
      } catch (error) {
        console.error('Error fetching wildfire data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  return (
    <div>
      {loading ? <h1>Loading...</h1> : <Map eventData={eventData} />}
    </div>
  )
}

export default App