import { useState, useEffect } from 'react'
import Map from './components/Map'

function App() {
  const [eventData, setEventData] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch(
        'https://eonet.gsfc.nasa.gov/api/v2.1/events'
      )

      const data = await res.json()

      console.log('NASA response:', data)

      setEventData(data.events)
    }

    fetchEvents()
  }, [])

  console.log('eventData:', eventData)

  return (
    <div>
      <Map />
    </div>
  )
}

export default App