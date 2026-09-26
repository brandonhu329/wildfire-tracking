import { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'

const MAX_MARKERS = 1200
const MAX_PER_REGION = 200

const Map = ({
  eventData = [],
  center = {
    lat: 20,
    lng: 0
  },
  zoom = 2
}) => {
  const [selectedEvent, setSelectedEvent] = useState(null)

  const wildfireMarkers = Array.isArray(eventData)
    ? (() => {
        const regions = {
          northAmerica: [],
          southAmerica: [],
          europe: [],
          africa: [],
          asia: [],
          oceania: []
        }

        eventData.forEach((event) => {
          const categories = event?.categories || []
          const geometries = event?.geometries || []
          const latestGeometry = geometries[0]
          const coordinates = latestGeometry?.coordinates

          if (
            !categories.some((category) => category.id === 8) ||
            !Array.isArray(coordinates) ||
            coordinates.length < 2
          ) {
            return
          }

          const [lng, lat] = coordinates

          if (lat >= 25 && lng <= -30) {
            regions.northAmerica.push(event)
          } else if (lat <= 20 && lng <= -20) {
            regions.southAmerica.push(event)
          } else if (lat >= 35 && lng >= -15 && lng <= 45) {
            regions.europe.push(event)
          } else if (lat <= 35 && lat >= -35 && lng >= -20 && lng <= 55) {
            regions.africa.push(event)
          } else if (lat >= -10 && lng >= 40) {
            regions.asia.push(event)
          } else {
            regions.oceania.push(event)
          }
        })

        const distributed = Object.values(regions)
          .map((regionEvents) =>
            regionEvents
              .sort((a, b) => {
                const aDate = new Date(a?.geometries?.[0]?.date || 0).getTime()
                const bDate = new Date(b?.geometries?.[0]?.date || 0).getTime()
                return bDate - aDate
              })
              .slice(0, MAX_PER_REGION)
          )
          .flat()

        return distributed.slice(0, MAX_MARKERS)
      })()
    : []

  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: 'AIzaSyDReWRyzloepWSdcWDZbhcWTN_iEmFHWSI'
        }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {wildfireMarkers.map((event, index) => {
          const coordinates = event?.geometries?.[0]?.coordinates

          if (!Array.isArray(coordinates) || coordinates.length < 2) {
            return null
          }

          const [lng, lat] = coordinates

          return (
            <LocationMarker
              key={event.id || `${lat}-${lng}-${index}`}
              lat={lat}
              lng={lng}
              onClick={() => setSelectedEvent(event)}
            />
          )
        })}
      </GoogleMapReact>

      {selectedEvent && (
        <div className="info-box">
          <h3>Event Location Info</h3>
          <p>
            <strong>ID:</strong> {selectedEvent.id}
          </p>
          <p>
            <strong>Title:</strong> {selectedEvent.title}
          </p>
          {selectedEvent.description && (
            <p>{selectedEvent.description}</p>
          )}
        </div>
      )}
    </div>
  )
}

export default Map