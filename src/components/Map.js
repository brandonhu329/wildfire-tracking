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
  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: 'AIzaSyDReWRyzloepWSdcWDZbhcWTN_iEmFHWSI'
        }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {eventData.map((event, index) => {
          const geometry = event.geometry && event.geometry[0]

          if (!geometry || !geometry.coordinates || geometry.coordinates.length < 2) {
            return null
          }

          const [lng, lat] = geometry.coordinates

          return (
            <LocationMarker
              key={`${event.id || 'event'}-${index}`}
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