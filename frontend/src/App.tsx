import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {

  type Joke = {
    id: number;
    joke: string;
  }

  const [jokes, setJokes] = useState<Joke[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get<Joke[]>('/api/jokes')
      .then((response) => {
        setJokes(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <h1>
        Hello World!
      </h1>
      <p>Jokes Length: {jokes.length}</p>

      {isLoading ? <p>Loading...</p> : (
        jokes.map((joke) => (
          <li key={joke.id}>{joke.joke}</li>
        ))
      )
      }


    </>
  )
}

export default App
