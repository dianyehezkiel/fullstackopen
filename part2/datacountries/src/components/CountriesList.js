import Country from "./Country";

const CountriesList = ({countries, onClickShow}) => {
  if (countries === null) {
    return (<div></div>);
  } else if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    );
  } else if (countries.length === 1) {
    return (
      <Country country={countries[0]} />
    );
  } else {
    return (
      <div>
        {countries.map(country => {
          return (
            <div key={country.name}>
              {country.name}
              <button id={country.name} onClick={onClickShow}>Show</button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default CountriesList;