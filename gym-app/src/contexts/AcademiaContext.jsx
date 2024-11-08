// src/contexts/AcademiaContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

const AcademiaContext = createContext();

export function AcademiaProvider({ children }) {
  const [academias, setAcademias] = useState([]);

  const fetchAcademias = async () => {
    const response = await fetch('http://localhost:3001/academias');
    const data = await response.json();
    setAcademias(data);
  };

  const addAcademia = async (novaAcademia) => {
    const response = await fetch('http://localhost:3001/academias', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novaAcademia),
    });
    if (response.ok) {
      fetchAcademias(); // Atualiza a lista de academias
    }
  };

  const removeAcademia = (id) => {
    setAcademias((prevAcademias) =>
      prevAcademias.filter((academia) => academia.id !== id)
    );
  };

  useEffect(() => {
    fetchAcademias(); // Carrega academias no carregamento do contexto
  }, []);

  return (
    <AcademiaContext.Provider value={{ academias, addAcademia, removeAcademia }}>
      {children}
    </AcademiaContext.Provider>
  );
}

export const useAcademia = () => {
  return useContext(AcademiaContext);
};
