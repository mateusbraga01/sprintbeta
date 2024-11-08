// src/pages/Gerente/ManterAcademia.jsx
import React, { useState, useEffect } from 'react';
import { useAcademia } from '../../contexts/AcademiaContext';

function ManterAcademia() {
  const { academias, addAcademia, removeAcademia } = useAcademia(); // Use o hook corretamente
  const [novaAcademia, setNovaAcademia] = useState({
    nome: '',
    endereco: '',
    tipo: '',
    preco: '',
    horario: '',
    imagem: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovaAcademia({ ...novaAcademia, [name]: value });
  };

  const handleAddAcademia = async () => {
    try {
      const response = await fetch('http://localhost:5000/academias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaAcademia),
      });

      if (response.ok) {
        const newAcademia = await response.json();
        setAcademias((prevAcademias) => [...prevAcademias, newAcademia]); // Atualiza o estado local
        setNovaAcademia({
          nome: '',
          endereco: '',
          tipo: '',
          preco: '',
          horario: '',
          imagem: ''
        });
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.error}`);
      }
    } catch (error) {
      alert(`Erro ao adicionar academia: ${error.message}`);
    }
  };

  const handleRemoveAcademia = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/academias/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAcademias((prevAcademias) => prevAcademias.filter((academia) => academia.id !== id));
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.error}`);
      }
    } catch (error) {
      alert(`Erro ao excluir academia: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Manter Academia</h1>
      </header>
      <div className="academia-form">
        <input
          type="text"
          name="nome"
          placeholder="Nome da Academia"
          value={novaAcademia.nome}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="endereco"
          placeholder="Endereço"
          value={novaAcademia.endereco}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="tipo"
          placeholder="Tipo (ex: Crossfit, Musculação)"
          value={novaAcademia.tipo}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="preco"
          placeholder="Preço (ex: R$ 150/mês)"
          value={novaAcademia.preco}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="horario"
          placeholder="Horário (ex: 6h - 22h)"
          value={novaAcademia.horario}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="imagem"
          placeholder="URL da Imagem"
          value={novaAcademia.imagem}
          onChange={handleChange}
          required
        />
        <button onClick={handleAddAcademia}>Adicionar Academia</button>
      </div>

      <div className="academias-list">
        <h2>Academias Cadastradas</h2>
        {academias.length > 0 ? (
          <ul>
            {academias.map((academia) => (
              <li key={academia.id}>
                <img src={academia.imagem} alt={academia.nome} className="academia-img" />
                <div>
                  <h3>{academia.nome}</h3>
                  <p>Endereço: {academia.endereco}</p>
                  <p>Tipo: {academia.tipo}</p>
                  <p>Preço: {academia.preco}</p>
                  <p>Horário: {academia.horario}</p>
                  <button onClick={() => handleRemoveAcademia(academia.id)}>Excluir</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma academia cadastrada.</p>
        )}
      </div>
    </div>
  );
}

export default ManterAcademia;
