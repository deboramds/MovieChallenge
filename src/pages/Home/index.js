import { useContext } from 'react';
import { AuthGoogleContext } from '../../contexts/authGoogle';

export const Home = () => {
    const { user, signeOut } = useContext(AuthGoogleContext);
    console.log(user);  
    return ( 
    <div>
        <button onClick={() => signeOut()}>Sair</button>
        <h1>Bem-vindo {user.displayName}</h1>
     </div>
    );
};
