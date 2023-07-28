import React, { useContext, useEffect, useState } from 'react';
import { AuthGoogleContext } from '../../contexts/authGoogle';
import { getMoviesAndSeries } from '../../API/api';
import './home.css'; // Importe o arquivo CSS com as estilizações

export const Home = () => {
  const { user, signOutUser } = useContext(AuthGoogleContext);
  const [moviesAndSeries, setMoviesAndSeries] = useState([]);
  const [selectedPoster, setSelectedPoster] = useState(null); // Estado para controlar o poster clicado

  useEffect(() => {
    // Função para buscar os filmes e séries da API
    const fetchMoviesAndSeries = async () => {
      const data = await getMoviesAndSeries();
      setMoviesAndSeries(data);
    };

    fetchMoviesAndSeries();
  }, []);

  const handleSignOut = () => {
    signOutUser();
  };

  const handlePosterClick = (posterId) => {
    setSelectedPoster(posterId); // Define o ID do poster clicado no estado
  };

  return (
    <div>
      <button onClick={handleSignOut}>Sair</button>
      <h1>Bem-vindo {user.displayName}</h1>
      <div className="poster-container">
        {moviesAndSeries.map((item) => (
          <img
            key={item.id}
            src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
            alt={item.title || item.name}
            className={selectedPoster === item.id ? 'selected' : ''}
            onClick={() => handlePosterClick(item.id)}
          />
        ))}
      </div>
    </div>
  );
};
