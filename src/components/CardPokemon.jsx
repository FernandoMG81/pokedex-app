import React from 'react'
import { Link } from 'react-router-dom'
import LogoError from '../assets/error.png'

export const CardPokemon = ({ pokemon }) => {
  const getFirstImageUrl = (sprites) => {
    if (sprites && sprites.other && sprites.other.dream_world) {
      const dreamWorld = sprites.other.dream_world
      if (dreamWorld.front_default) {
        return dreamWorld.front_default
      }
    }

    if (sprites && sprites.other && sprites.other['official-artwork']) {
      const officialArtwork = sprites.other['official-artwork']
      if (officialArtwork.front_default) {
        return officialArtwork.front_default
      }
    }

    if (sprites && sprites.front_default) {
      return sprites.front_default
    }

    return LogoError
  }

  return (
    <Link to={`/pokemon/${pokemon.id}`} className='card-pokemon'>
      <div className='card-img'>
        <img
          src={getFirstImageUrl(pokemon.sprites)}
          alt={`Pokemon ${pokemon.name}`}
        />
      </div>
      <div className='card-info'>
        <span className='pokemon-id'>N° {pokemon.id}</span>
        <h3>{pokemon.name}</h3>
        <div className='card-types'>
          {pokemon.types.map(type => (
            <span key={type.type.name} className={type.type.name}>
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
