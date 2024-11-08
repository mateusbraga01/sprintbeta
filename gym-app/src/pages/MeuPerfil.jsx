import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const ClientePerfil = () => {
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtenha o token armazenado
        const response = await axios.get('http://localhost:5000/api/perfil', {
          headers: {
            'Authorization': `Bearer ${token}`, // Envie o token no cabeçalho
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Erro ao buscar perfil:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h2>Meu Perfil</h2>
      {user ? (
        <div>
          <p>Nome: {user.nome}</p>
          <p>Email: {user.email}</p>
          <p>Tag: {user.tag}</p>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default ClientePerfil;
