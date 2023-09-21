"use client";

import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

export default function Home() {
  const [items, setItems] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    nome: '',
    mensagem: '',
  });

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

  const handleDelete = async (itemId: any) => {
    try {
      // Remova o item da lista local
      const updatedItems = items.filter((item: any) => item.id !== itemId);
      setItems(updatedItems);

      // Envie a solicitação para a rota /api/destroy com o ID do item a ser excluído
      const response = await fetch(`/api/destroy/${itemId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Atualize a lista de itens após a exclusão bem-sucedida
        // Não é necessário fazer uma nova solicitação GET aqui,
        // pois você já removeu o item localmente.
      }
    } catch (error) {
      console.error('Erro ao excluir item:', error);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Gere um ID aleatório usando uuidv4
    const id = uuid();

    // Adicione o ID aos dados do formulário
    const itemData = {
      id,
      ...formData,
    };

    try {
      // Envie os dados do formulário para a rota /api/create
      const response = await fetch('/api/create', {
        method: 'POST',
        body: JSON.stringify(itemData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Atualize a lista de itens após o envio bem-sucedido
        setItems([...items, itemData]);
        setFormData({
          nome: '',
          mensagem: '',
        });
      }
    } catch (error) {
      console.error('Erro ao criar novo item:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-4">
      <div className="w-full max-w-xl">
        <h1 className="text-black text-3xl font-semibold mb-2">Criar Novo Item</h1>
        <p className="text-gray-600 mb-6">Preencha o formulário abaixo:</p>

        <form className="bg-white shadow-lg rounded-lg p-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nome" className="block text-gray-600 font-semibold mb-2">
              Nome:
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              maxLength={255}
              value={formData.nome}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="mensagem" className="block text-gray-600 font-semibold mb-2">
              Mensagem:
            </label>
            <textarea
              id="mensagem"
              name="mensagem"
              maxLength={1024}
              value={formData.mensagem}
              onChange={handleChange}
              required
              rows={4}
              className="w-full border border-gray-300 rounded-lg p-2"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>

      <div className="w-full max-w-xl mt-8">
        <h1 className="text-black text-3xl font-semibold mb-2">Lista de Itens</h1>
        <p className="text-gray-600">Aqui estão os itens disponíveis:</p>

        {items.length > 0 ? (
          <ul className="bg-white shadow-lg rounded-lg p-4 mt-2">
            {items.map((item: any) => (
              <li key={item.id} className="mb-4 flex justify-between items-center">
                <div className='max-w-sm'>
                  <h2 className="text-lg font-semibold">{item.nome}</h2>
                  <p className="text-gray-600 whitespace-pre-line break-words">{item.mensagem}</p>
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
          <p className="text-gray-600 mt-2">Nenhum item foi criado ainda.</p>
        )}
      </div>
    </div>
  );
}
