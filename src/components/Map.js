import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'

const MAX_MARKERS = 200

const Map = ({
  eventData = [],
  center = {
    lat: 42.3265,
    lng: -122.8756
  },
  zoom = 6
}) => {
  const wildfireMarkers = Array.isArray(eventData)
    ? eventData
        .filter((event) => {
          const categories = event?.categories || []
          const geometries = event?.geometries || []
          const latestGeometry = geometries[0]
          const coordinates = latestGeometry?.coordinates

          return (
            categories.some((category) => category.id === 8) &&
            Array.isArray(coordinates) &&
            coordinates.length >= 2
          )
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
          const [lng, lat] = event.geometries[0].coordinates

          return (
            <LocationMarker
              key={event.id || `${lat}-${lng}-${index}`}
              lat={lat}
              lng={lng}
              onClick={() => console.log(event.title)}
            />
          )
        })}
      </GoogleMapReact>
    </div>
  )
}

export default Map