import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Loader } from '../components/Loader'
import { PokemonContext } from '../context/PokemonContext'
import LogoError from '../assets/error.png'

export const PokemonPage = () => {
  const { getPokemonByID } = useContext(PokemonContext)

  const [loading, setLoading] = useState(true)
  const [pokemon, setPokemon] = useState({})
  const [pokemonStats, setPokemonStats] = useState({})

  const { id } = useParams()

  const fetchPokemon = async id => {
    const data = await getPokemonByID(id)
    const NewPokemonStats = {
      Hp: data.stats[0].base_stat,
      Attack: data.stats[1].base_stat,
      Defense: data.stats[2].base_stat,
      Special_Attack: data.stats[3].base_stat,
      Special_Defense: data.stats[4].base_stat,
      Speed: data.stats[5].base_stat
    }
    setPokemon(data)
    setPokemonStats(NewPokemonStats)
    setLoading(false)
  }

  useEffect(() => {
    fetchPokemon(id)
  }, [])

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

  const setWidth = (value) => {
    if (value > 100) return 100
    return value
  }

  return (
    <main className='container main-pokemon'>
      {loading
        ? (
          <Loader />
          )
        : (
          <>
            <div className='header-main-pokemon'>
              <span className='number-pokemon'>#{pokemon.id}</span>
              <div className='container-img-pokemon'>
                <img
                  src={getFirstImageUrl(pokemon.sprites)}
                  alt={`Pokemon ${pokemon?.name}`}
                />
              </div>

              <div className='container-info-pokemon'>
                <h1>{pokemon.name}</h1>
                <div className='card-types info-pokemon-type'>
                  {pokemon.types.map(type => (
                    <span key={type.type.name} className={`${type.type.name}`}>
                      {type.type.name}
                    </span>
                  ))}
                </div>
                <div className='info-pokemon'>
                  <div className='group-info'>
                    <p>Altura</p>
                    <span>{pokemon.height}</span>
                  </div>
                  <div className='group-info'>
                    <p>Peso</p>
                    <span>{pokemon.weight}KG</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='container-stats'>
              <h1>Estadísticas</h1>
              <div className='stats'>
                <div className='stat-group'>
                  <span>Hp</span>
                  <div className='progress-bar'>
                    <div
                      className='progress-bar-fill'
                      style={{
                        width: `${setWidth(pokemonStats.Hp)}%`,
                        animation: `progress-bar-fill ${pokemonStats.Hp / 100}s ease-in-out`,
                        background: pokemonStats.Hp > 100 ? 'linear-gradient(135deg, #f7df1e, #ffc516)' : 'var(--color-primary)'
                      }}
                    />
                  </div>
                  <span className='counter-stat'>
                    {pokemonStats.Hp}
                  </span>
                </div>
                <div className='stat-group'>
                  <span>Attack</span>
                  <div className='progress-bar'>
                    <div
                      className='progress-bar-fill'
                      style={{
                        width: `${setWidth(pokemonStats.Attack)}%`,
                        animation: `progress-bar-fill ${pokemonStats.Attack / 100}s ease-in-out`,
                        background: pokemonStats.Attack > 100 ? 'linear-gradient(135deg, #f7df1e, #ffc516)' : 'var(--color-primary)'
                      }}
                    />
                  </div>
                  <span className='counter-stat'>
                    {pokemonStats.Attack}
                  </span>
                </div>
                <div className='stat-group'>
                  <span>Defense</span>
                  <div className='progress-bar'>
                    <div
                      className='progress-bar-fill'
                      style={{
                        width: `${setWidth(pokemonStats.Defense)}%`,
                        animation: `progress-bar-fill ${pokemonStats.Defense / 100}s ease-in-out`,
                        background: pokemonStats.Defense > 100 ? 'linear-gradient(135deg, #f7df1e, #ffc516)' : 'var(--color-primary)'
                      }}
                    />
                  </div>
                  <span className='counter-stat'>
                    {pokemonStats.Defense}
                  </span>
                </div>
                <div className='stat-group'>
                  <span>Special Attack</span>
                  <div className='progress-bar'>
                    <div
                      className='progress-bar-fill'
                      style={{
                        width: `${setWidth(pokemonStats.Special_Attack)}%`,
                        animation: `progress-bar-fill ${pokemonStats.Special_Attack / 100}s ease-in-out`,
                        background: pokemonStats.Special_Attack > 100 ? 'linear-gradient(135deg, #f7df1e, #ffc516)' : 'var(--color-primary)'
                      }}
                    />
                  </div>
                  <span className='counter-stat'>
                    {pokemonStats.Special_Attack}
                  </span>
                </div>
                <div className='stat-group'>
                  <span>Special Defense</span>
                  <div className='progress-bar'>
                    <div
                      className='progress-bar-fill'
                      style={{
                        width: `${setWidth(pokemonStats.Special_Defense)}%`,
                        animation: `progress-bar-fill ${pokemonStats.Special_Defense / 100}s ease-in-out`,
                        background: pokemonStats.Special_Defense > 100 ? 'linear-gradient(135deg, #f7df1e, #ffc516)' : 'var(--color-primary)'
                      }}
                    />
                  </div>
                  <span className='counter-stat'>
                    {pokemonStats.Special_Defense}
                  </span>
                </div>
                <div className='stat-group'>
                  <span>Speed</span>
                  <div className='progress-bar'>
                    <div
                      className='progress-bar-fill'
                      style={{
                        width: `${setWidth(pokemonStats.Speed)}%`,
                        animation: `progress-bar-fill ${pokemonStats.Speed / 100}s ease-in-out`,
                        background: pokemonStats.Speed > 100 ? 'linear-gradient(135deg, #f7df1e, #ffc516)' : 'var(--color-primary)'
                      }}
                    />
                  </div>
                  <span className='counter-stat'>
                    {pokemonStats.Speed}
                  </span>
                </div>
              </div>
            </div>
          </>
          )}
    </main>
  )
}
