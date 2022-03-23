import axios from "axios";
import { useEffect, useState } from "react";
import Weather from "./Weather";

const Country = ({ country }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const url = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`;

    axios
      .get(url)
      .then(response => {
        setWeather(response.data);
      })
  }, [country.capital]);

  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h3>languages:</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt={country.name} width="150" />
      <Weather weather={weather} />
    </div>  
  );
}

export default Country;