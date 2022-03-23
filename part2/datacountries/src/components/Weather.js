const Weather = ({ weather }) => {
  if (!(weather.current)) return <div>loading...</div>;

  return (
    <div>
      <h3>Weather in {weather.location.name}</h3>
      <p>
        <b>temperature:</b> {weather.current.temperature} Celsius
      </p>
      <img src={weather.current.weather_icons[0]} alt={weather.current.description} width='100'/>
      <p>
        <b>Wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}
      </p>
    </div>
  );
}

export default Weather;