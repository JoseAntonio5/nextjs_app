"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { v4 as uuid } from 'uuid';

export default function Criar() {
  const [formData, setFormData] = useState({
    nome: '',
    mensagem: '',
  });

  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData)
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
  
    // Envie os dados do formulário para a rota /api/create
    const response = await fetch('/api/create', {
      method: 'POST',
      body: JSON.stringify(itemData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      // Redirecione de volta para a página inicial após o envio bem-sucedido
      router.push('/');
    }
  };  

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold mb-2 text-black">Criar Novo Item</h1>
      <p className="text-gray-600 mb-6">Preencha o formulário abaixo:</p>

      <form className="bg-white shadow-lg rounded-lg p-4 w-80" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nome" className="block text-gray-600 font-semibold mb-2">
            Nome:
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
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
            value={formData.mensagem}
            onChange={handleChange}
            required
            rows={4}
            className="w-full border border-gray-300 rounded-lg p-2"
          ></textarea>
        </div>
        <div className="flex justify-between">
            <Link href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">
                Voltar para a Home
            </Link>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
