import React, { useState, useContext } from "react";
import { AuthGoogleContext } from "../../contexts/authGoogle";
import { Navigate } from "react-router-dom";
import './login.css';


export const Login = () => {
  const { signInGoogle, signed, user } = useContext(AuthGoogleContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode chamar uma função para fazer a autenticação com o e-mail e senha
    // Por exemplo: signInWithEmail(email, password);
  };

  if (signed) {
    return <Navigate to="/home" />;
  }

  return (
    <div>
      <button onClick={signInGoogle}>Logar com o Google</button>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};


