import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'

const Map = ({
  eventData = [],
  center = {
    lat: 42.3265,
    lng: -122.8756
  },
  zoom = 6
}) => {
  const wildfireMarkers = Array.isArray(eventData)
    ? eventData.filter((event) => {
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