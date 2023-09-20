import { getData } from "@/utils/dataStore";

export async function GET() {
  try {
    const data = getData();
    console.log(data);
    return new Response(JSON.stringify(data), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    return new Response("Erro ao recuperar os dados.", { status: 500 });
  }
}