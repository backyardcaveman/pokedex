import { RiScalesLine } from 'react-icons/ri'
import { VscSymbolRuler } from 'react-icons/vsc'
import { FiType } from 'react-icons/fi'

const Pokemon = ({
  pokemonData,
  cardColor,
  pokemonName,
  pokemonId,
  pokemon,
  pokemonHeight,
  pokemonWeight,
  pokemonType,
  hasType2,
  pokemonType2
}) => {

  const actualType = pokemonType.charAt(0).toUpperCase() + pokemonType.slice(1); 
  const actualType2 = pokemonType2.charAt(0).toUpperCase() + pokemonType2.slice(1)

  return (
    <div className="App">
      {pokemonData.map(() => {
        return (
          <div className="container" style={{ backgroundColor: cardColor }}>
            <div>
              <h3>{pokemonName.toUpperCase()}</h3>
            </div>
            <div className="background">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                alt={pokemon}
              />
            </div>
            <div className="divTable">
              <div className="pokenumber">
                <div className="divTableCell">
                  #{pokemonId.toString().padStart(3, 0)}
                </div>
              </div>
              <div className="info">
              <div className="row">
                <div className="icon-text"><VscSymbolRuler/></div>
                <div className="power-bottom-text">
                  {Math.round(pokemonHeight * 3.9)}"
                </div>
              </div>
              <div className="row">
                <div className="icon-text"><RiScalesLine/> </div>
                <div className="power-bottom-text">
                  {Math.round(pokemonWeight / 3.9)} lb
                </div>
              </div>
              <div className="row">
                <div className="icon-text"><FiType/></div>
                <div className="power-bottom-text">{actualType}</div>
              </div>
              {hasType2 && (
                <div className="row">
                  <div className="icon-text"><FiType/></div>
                  <div className="power-bottom-text">{actualType2}</div>
                </div>
              )}
              </div>
              
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Pokemon;