import { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'

const MAX_MARKERS = 2000

const Map = ({
  eventData = [],
  center = {
    lat: 39.5,
    lng: -98.35
  },
  zoom = 4
}) => {
  const [selectedEvent, setSelectedEvent] = useState(null)

  const wildfireMarkers = Array.isArray(eventData)
    ? eventData
        .filter((event) => {
          const categories = event?.categories || []
          const geometries = event?.geometries || []
          const latestGeometry = geometries[0]
          const coordinates = latestGeometry?.coordinates

          if (
            !categories.some((category) => category.id === 8) ||
            !Array.isArray(coordinates) ||
            coordinates.length < 2
          ) {
            return false
          }

          const [lng, lat] = coordinates

          return lat >= 24 && lat <= 50 && lng >= -125 && lng <= -66
        })
        .sort((a, b) => {
          const aDate = new Date(a?.geometries?.[0]?.date || 0).getTime()
          const bDate = new Date(b?.geometries?.[0]?.date || 0).getTime()
          return bDate - aDate
        })
        .slice(0, MAX_MARKERS)
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