import './App.css'
import { useEffect, useState } from 'react'
import userdefault from './userdefault.jpg'

function App() {
  const [user, setUser] = useState()
  const [searchUser, setSearchUser] = useState()
  const [searchedUser, setSearchedUser] = useState()

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setSearchedUser(searchUser)
  }

  useEffect(() => {
    fetch(`https://api.github.com/users/${searchedUser}`)
      .then((res) => res.json())
      .then((json) => setUser(json))
  }, [searchedUser])

  let userIMG
  if (searchedUser === undefined || searchedUser === '') {
    userIMG = userdefault
  } else {
    userIMG = user.avatar_url
  }

  return (
    <>
      {user && (
        <div className='App'>
          <div>
            <form onSubmit={handleFormSubmit}>
              <input
                type='text'
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                placeholder='User Name in Github'
              />
              <button type='submit'>Pesquisar</button>
            </form>

            <h1>O usuário que você digitou é: </h1>

            <h2>{user.name}</h2>

            <img src={userIMG} alt='' />
            <p>Mora em: {user.location}</p>
            <p>Bio: {user.bio}</p>

            <a href={user.html_url} target='_blank' rel='noreferrer'>
              Link para o perfil
            </a>
          </div>
        </div>
      )}
    </>
  )
}

export default App
