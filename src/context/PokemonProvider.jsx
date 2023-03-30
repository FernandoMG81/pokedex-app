import React, { useEffect, useState } from 'react'
import { useForm } from '../hook/useForm'
import { PokemonContext } from './PokemonContext'

export const PokemonProvider = ({ children }) => {
  const [allPokemons, setAllPokemons] = useState([])
  const [globalPokemons, setGlobalPokemons] = useState([])
  const [offset, setOffset] = useState(0)

  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState(false)

  const { valueSearch, onInputChange, onResetForm } = useForm({
    valueSearch: ''
  })

  // Obtener hasta 50 pokemones
  const getAllPokemons = async (limit = 50) => {
    const baseURL = 'https://pokeapi.co/api/v2/'
    const res = await fetch(`${baseURL}pokemon?limit=${limit}&offset=${offset}`)
    const data = await res.json()

    const promises = data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url)
      const data = await res.json()
      return data
    })

    const results = await Promise.all(promises)

    setAllPokemons([...allPokemons, ...results])
  }

  // Obtener todo el listado de pokemones

  const getGlobalPokemons = async () => {
    setLoading(true)
    const baseURL = 'https://pokeapi.co/api/v2/'
    const res = await fetch(`${baseURL}pokemon?limit=10000&offset=0`)
    const data = await res.json()

    const results = []
    for (const pokemon of data.results) {
      const res = await fetch(pokemon.url)
      const data = await res.json()
      results.push(data)
    }

    setGlobalPokemons(results)
    setLoading(false)
  }

  // Obtener un pokemon por ID

  const getPokemonByID = async (id) => {
    const baseURL = 'https://pokeapi.co/api/v2/'
    const res = await fetch(`${baseURL}pokemon/${id}`)
    const data = await res.json()
    return data
  }

  useEffect(() => {
    getAllPokemons()
  }, [offset])

  useEffect(() => {
    getGlobalPokemons()
  }, [])

  const onClickLoadMore = () => {
    setOffset(prevState => prevState + 50)
  }

  // Filter Function + State
  const [typeSelected, setTypeSelected] = useState({
    grass: false,
    normal: false,
    fighting: false,
    flying: false,
    poison: false,
    ground: false,
    rock: false,
    bug: false,
    ghost: false,
    steel: false,
    fire: false,
    water: false,
    electric: false,
    psychic: false,
    ice: false,
    dragon: false,
    dark: false,
    fairy: false,
    unknow: false,
    shadow: false
  })

  const [filteredPokemons, setfilteredPokemons] = useState([])

  const handleCheckbox = e => {
    setTypeSelected({
      ...typeSelected,
      [e.target.name]: e.target.checked
    })

    if (e.target.checked) {
      const filteredResults = globalPokemons.filter(pokemon =>
        pokemon.types
          .map(type => type.type.name)
          .includes(e.target.name)
      )
      const newFilteredPokemons = [
        ...filteredPokemons,
        ...filteredResults.filter(pokemon => !filteredPokemons.some(p => p.id === pokemon.id))
      ].sort((a, b) => a.id - b.id)
      console.log(newFilteredPokemons)
      setfilteredPokemons(newFilteredPokemons)
    } else {
      const filteredResults = filteredPokemons.filter(
        pokemon =>
          !pokemon.types
            .map(type => type.type.name)
            .includes(e.target.name)
      )
      console.log(filteredResults)

      setfilteredPokemons([...filteredResults])
    }
  }

  return (
    <PokemonContext.Provider value={{
      valueSearch,
      onInputChange,
      onResetForm,
      allPokemons,
      globalPokemons,
      getPokemonByID,
      onClickLoadMore,
      loading,
      setLoading,
      active,
      setActive,
      handleCheckbox,
      filteredPokemons
    }}
    >
      {children}
    </PokemonContext.Provider>
  )
}
