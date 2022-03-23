import { useEffect, useState } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import CountriesList from './components/CountriesList';

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        setCountries(response.data);
      })
  }, []);

  const onFilterChange = (filter) => {
    const fc = filter
      ? countries.filter((c) => c.name.toLowerCase().includes(filter.toLowerCase()))
      : null;
    setSelectedCountry(null);
    setFilteredCountries(fc);
  };

  const onClickShow = (event) => {
    event.preventDefault();
    const sc = [countries.find(c => c.name === event.target.id)];
    setSelectedCountry(sc);
  };

  return (
    <div>
      <Filter onChange={onFilterChange} />
      <CountriesList 
        countries={selectedCountry? selectedCountry:filteredCountries} 
        onClickShow={onClickShow}/>
    </div>
  );
}

export default App;
