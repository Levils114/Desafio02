import React, {useState, useEffect} from "react";
import api from './services/api.js';
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
        title: `Novo Repositório`,
        url: "http://github.com/numseimeo", 
        techs: "nodejs, reactjs, react native"
    });

    const repositore = response.data;

    setRepositories([...repositories, repositore]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
        repositore => repositore.id !== id
      ));
  }


  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositore => (
            <li key={repositore.id}>{repositore.title}

            <button onClick={() => handleRemoveRepository(repositore.id)}>Remover</button>
            </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
