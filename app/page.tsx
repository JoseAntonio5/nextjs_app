"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Faça uma solicitação GET para a rota /api/data
    fetch('/api/data')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Erro ao buscar os dados');
        }
      })
      .then((data) => {
        // Atualize o estado com os dados recebidos
        setItems(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDelete = (itemId: any) => {
    try {
      // Remova o item da lista local
      const updatedItems = items.filter((item: any) => item.id !== itemId);
      setItems(updatedItems);
    } catch (error) {
      console.error('Erro ao excluir item:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-black text-3xl font-semibold mb-2">Lista de Itens</h1>
      <p className="text-gray-600 mb-6">Aqui estão os itens disponíveis:</p>

      {items.length > 0 ? (
        <ul className="bg-white shadow-lg rounded-lg p-4 w-80">
          {items.map((item: any) => (
            <li key={item.id} className="mb-4 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{item.nome}</h2>
                <p className="text-gray-600">{item.mensagem}</p>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg scale-75"
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">Nenhum item foi criado ainda.</p>
      )}

      <Link href="/criar" className="mt-4 bg-blue-500 hover.bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">
        Criar Novo Item
      </Link>
    </div>
  );
}