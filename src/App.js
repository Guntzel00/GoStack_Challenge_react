import React, { useState, useEffect } from 'react';
import './styles.css';
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: 'New Repo',
      url: 'http://github.com/new_repo',
      techs: ['React', 'Angular', 'Python'],
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);

      setRepositories(
        repositories.filter((repository) => repository.id !== id)
      );
    } catch (err) {
      alert("Error, we cpuldn't delete your repo, please try again.");
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          return (
            <li className="repo" key={repository.id}>
              <h3 className="repo--title">{repository.title}</h3>
              <p className="repo--url">
                {' '}
                <span>Url:</span>{' '}
                <a target="_blank" href={repository.url}>
                  {repository.url}
                </a>
              </p>
              <div className="repo--techs">
                {repository.techs.map((tech) => (
                  <p className="repo--tech" key={tech}>
                    {tech}
                  </p>
                ))}
              </div>
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
