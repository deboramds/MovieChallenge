import React, { useContext, useEffect, useState } from 'react';
import { AuthGoogleContext } from '../../contexts/authGoogle';
import { getMoviesAndSeries } from '../../API/api';
import './home.css';

export const Home = () => {
    const { user, signOutUser } = useContext(AuthGoogleContext);
    const [moviesAndSeries, setMoviesAndSeries] = useState([]);

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
                    />
                ))}
            </div>
        </div>
    );
};
