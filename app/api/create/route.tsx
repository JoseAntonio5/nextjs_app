import { NextResponse } from "next/server";
import { getData, addData } from "@/utils/dataStore";

export async function POST(request: Request) {
    const { id, nome, mensagem } = await request.json();

    // Verifique se o array já possui 50 itens ou mais
    if (getData().length >= 50) {
        return new Response("O limite de 50 itens já foi atingido.", { status: 400 });
    }

    // Adicione os dados ao array
    addData({ id, nome, mensagem });

    console.log(id, nome, mensagem);

    try {
        return new Response("Criado com sucesso!", { status: 201 });
    } catch (error) {
        return new Response("Erro ao criar novo item.", { status: 500 });
    }
}