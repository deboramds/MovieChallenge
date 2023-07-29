import React, { useState, useContext } from "react";
import { AuthGoogleContext } from "../../contexts/authGoogle";
import { Navigate } from "react-router-dom";
import './login.css';

export const Login = () => {
  const { signInGoogle, signed, user } = useContext(AuthGoogleContext);

  async function loginGoogle() {
    await signInGoogle();
  }

  if (!signed) {
    return (
      <div className="container-init">
      <div className="container-left">
          <figure>

          </figure>
        </div>
   <div className="container-right">
      <div className="login-container">
        <div className="card">
          <figure className="logo">
          {/* <img src="Login/images/logo.jpg"></img> */}
            </figure>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Senha" /> 
          <button className="buttonEnter">Entrar</button>
          <div className="buttons-area">
          <button className="buttonGoogle" onClick={loginGoogle}>Login com o Google</button>
        </div>
      </div>
      </div>
   </div>
   </div>
    );
  } else {
    return <Navigate to="/home" />;
  }
};
