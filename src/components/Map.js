import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'

const Map = ({
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
        <LocationMarker
          lat={center.lat}
          lng={center.lng}
        />
      </GoogleMapReact>
    </div>
  )
}

export default Map