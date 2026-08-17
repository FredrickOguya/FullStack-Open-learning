import { useApolloClient, useQuery, useSubscription } from "@apollo/client/react"
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import { ALL_PERSONS, PERSON_ADDED } from "./queries"
import { useState } from "react"
import Notify from "./components/Notify"
import PhoneForm from "./components/PhoneForm"
import LoginForm from "./components/LoginForm"
import { addPersonToCache } from "../../utils/apolloCache"


const App = () => {
  const [token, setToken] = useState(localStorage.getItem('phonebook-user-token'))
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  useSubscription(PERSON_ADDED, {
    onData: ({ data }) => {
      const addedPerson = data.data.personAdded
      notify(`${addedPerson.name} added`)
      addPersonToCache(client.cache, addedPerson)
    },
  })

  const result = useQuery(ALL_PERSONS)


  if(result.loading) {
    return <div>loading...</div>
  }

  if(result.error){
    console.log(result.error)
    return <div>{result.error.message}</div>
  }

  const onLogout = ()  => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    },1000)
  }

  if(!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage}/>
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    )
  }

  return (
    <div>
      <Notify errorMessage={errorMessage}/>
      <button onClick={onLogout}>logout</button>
      <Persons persons={result.data.allPersons}/>
      <PersonForm setError={notify}/>
      <PhoneForm setError={notify} />
    </div>
  )
}

export default App