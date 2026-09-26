const LocationMarker = ({ onClick }) => {
  return (
    <div
      className="location-marker"
      onClick={onClick}
      aria-label="Wildfire location"
      title="Wildfire location"
    />
  )
}

export default LocationMarker;