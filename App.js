import { useState } from 'react';
import './App.css';
import axios from 'axios';
import Pokemon from './components/Pokemon';
import typeColors from './data/typeColors.json';
import ErrorModal from './components/ErrorModal';

function App() {
  const [pokemon, setPokemon] = useState('');
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState('');
  const [pokemonType2, setPokemonType2] = useState('');
  const [pokemonHeight, setPokemonHeight] = useState('');
  const [pokemonWeight, setPokemonWeight] = useState('');
  const [pokemonId, setPokemonId] = useState('');
  const [hasType2, setHasType2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validInput, setValidInput] = useState(false);
  const [cardColor, setCardColor] = useState('');

  const getPokemon = async () => {
    setIsLoading(true);
    const toArray = [];
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    const res = await axios.get(url);
    const objTypes = Object.keys(typeColors);
    const apiTypes = res.data.types.map(type => type.type.name);
    const type = objTypes.find(type => apiTypes.indexOf(type) > -1);
    const color = typeColors[type];

    toArray.push(res.data);
    setPokemonName(res.data.name);
    setPokemonType(res.data.types[0].type.name);
    if (res.data.types.length > 1) {
      setHasType2(true);
      setPokemonType2(res.data.types[1].type.name);
    } else {
      setHasType2(false);
    }
    setPokemonData(toArray);
    setPokemonHeight(res.data.height);
    setPokemonWeight(res.data.weight);
    setPokemonId(res.data.id);
    setCardColor(color);
    setIsLoading(false);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if(pokemon.length === 0) {
      setValidInput(true);
    } else if(pokemonName !== pokemon) {
      setValidInput(true);
    } else {
      setValidInput(false);
      setIsLoading(false);
    }
    getPokemon();
    setPokemon('');
  }

  const changeHandler = (e) => {
    setPokemon(e.target.value.toLowerCase());
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
      <div className='searchBar'>
        <input 
          type='text' 
          placeholder='search your fav pokemon' 
          value={pokemon} 
          onChange={changeHandler}
          >
        </input>
        <img 
         onClick={submitHandler}
         className='pokeball' 
         src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1200px-Pok%C3%A9_Ball_icon.svg.png' alt='pokebutton'
         />
      </div>
    </form>
    {isLoading && <div className='center'>
      <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1200px-Pok%C3%A9_Ball_icon.svg.png'/>
      </div>}
      
      {!isLoading && validInput && <Pokemon
      pokemonData={pokemonData}
      cardColor={cardColor}
      pokemonName={pokemonName}
      pokemonId={pokemonId}
      pokemon={pokemon}
      pokemonHeight={pokemonHeight}
      pokemonWeight={pokemonWeight}
      pokemonType={pokemonType}
      hasType2={hasType2}
      pokemonType2={pokemonType2}
      />}
      {isLoading && <ErrorModal/>}
    </div>
  )
}

export default App;
