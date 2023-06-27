import React, { useEffect, useRef, useState } from 'react'
import useFetch from '../hooks/useFetch'
import { useSelector } from 'react-redux'
import PokeContainer from '../components/Pokedex/PokeContainer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import logo from '../assets/img/logo.png'

const Pokedex = () => {

  

    const [selectValue, setSelectValue] = useState('all-pokemons')

    const trainerName = useSelector(states => states.trainerName)

    let url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'

    const [pokemons, getAllPokemons, hasError, setPokemons ] = useFetch(url)

    const urlTypes = 'https://pokeapi.co/api/v2/type'

    const [types, getAllTypes ] = useFetch(urlTypes)

    useEffect(() => {

      if(selectValue === 'all-pokemons') {
        getAllPokemons()
      } else {
        axios.get(selectValue)
        .then (res => {
          const data = {
            results: res.data.pokemon.map(pokeInfo => pokeInfo.pokemon)
          }
          setPokemons(data)
        })
        .catch(err => console.log(err))
      }
    
    }, [selectValue])
    


    useEffect(() => {
        
        getAllTypes()
      
    }, [])

    const searchPokemon = useRef()

    const navigate = useNavigate()

    const handleSubmit = e => {
      e.preventDefault()
      const inputValue = searchPokemon.current.value.trim().toLowerCase()
      navigate(`/pokedex/${inputValue}`)
    }

    
    const handleChangeType = e => {
      setSelectValue(e.target.value)

    }

  return (
    <div className='poke_app'>
        
        <header className='rectangle_red list'>
          <div className='rectangle_black list'></div>

          <div className='circle list'></div>

          <img className="img_logo_poke" src={logo} alt="logo" />


        </header>
        <aside className='aside_container'>
          
        <p className='title_welcome'>Welcome 👋😃 <span className='name_trainer'>{trainerName}</span>! You cand find your favourite Pokemon.</p>
        <form className='form_container_list' onSubmit={handleSubmit} >
          
          <input className="input_form_list" ref={searchPokemon} type="text" placeholder="Search pokemon by name"></input>
          <button className='btn_form'>Search</button>

        <select className='select_type' onChange={handleChangeType}>
    <option value='all-pokemons'>All Pokemons</option>
    {
      types?.results.map(typeInfo => (
        <option 
          value={typeInfo.url} 
          key={typeInfo.url}
        >
          {typeInfo.name}
        </option>
      ))
    }
  </select>
        </form>
        </aside>
        <div className='card_container'>
        <PokeContainer pokemons={pokemons?.results}/>
        </div>
    </div>
  )
}

export default Pokedex