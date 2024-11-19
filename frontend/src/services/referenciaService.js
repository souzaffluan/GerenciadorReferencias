// src/services/referenceService.js
import { api, requestConfig } from "../utils/config";

// Criação de referência
const createReferencia = async (data, token) => {
  const config = requestConfig("POST", data, token, true);

  try {
    const res = await fetch(api + "/referencias/newreferencia", config);
    const jsonResponse = await res.json();

    // Verificar se a resposta foi bem-sucedida
    if (!res.ok)
      throw new Error(jsonResponse.message || "Erro ao criar referência");
    return jsonResponse;
  } catch (error) {
    console.error("Erro no serviço de criação de referência:", error);
    return { errors: [error.message] }; // Retorna o erro em formato esperado pelo slice
  }
};

// Pegar referências do usuário
const getUserReferencias = async (token) => {
  console.log(localStorage.getItem("token")); // Acessa o token do localStorage

  if (!token) {
    console.error("Token não encontrado no localStorage");
    throw new Error("Token não encontrado");
  }
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/referencias/usereferencias", config);
    const jsonResponse = await res.json();

    // Retornar a resposta ou lançar erro se existir
    if (!res.ok)
      throw new Error(jsonResponse.error || "Erro ao pegar referências");

    return jsonResponse;
  } catch (error) {
    console.error("Erro no serviço de pegar referências do usuário:", error);
    return { errors: [error.message] }; // Retorna o erro em formato esperado pelo slice
  }
};

// Deletar referência
const deleteReferencia = async (id, token) => {
  const config = requestConfig("DELETE", null, token);
  console.log("Config de requisição:", config); // Verifique o config

  try {
    const res = await fetch(
      api + `/referencias/deletereferencia/${id}`,
      config
    );
    const jsonResponse = await res.json();

    // Retornar a resposta ou lançar erro se existir
    if (!res.ok)
      throw new Error(jsonResponse.error || "Erro ao deletar referência");

    return jsonResponse;
  } catch (error) {
    console.error("Erro no serviço de deletar referência:", error);
    return { errors: [error.message] }; // Retorna o erro em formato esperado pelo slice
  }
};

// Atualizar referência
const updateReferencia = async (id, data, token) => {
  const config = requestConfig("PUT", data, token, true);

  try {
    const res = await fetch(api + `/referencias/${id}`, config);
    const jsonResponse = await res.json();

    // Retornar a resposta ou lançar erro se existir
    if (!res.ok)
      throw new Error(jsonResponse.message || "Erro ao atualizar referência");

    return jsonResponse;
  } catch (error) {
    console.error("Erro no serviço de atualização de referência:", error);
    return { errors: [error.message] }; // Retorna o erro em formato esperado pelo slice
  }
};

//buscar referencia por id
// Função para buscar uma referência específica pelo ID
// referenciaService.js
const getReferenciaById = async (id, token) => {
  console.log(localStorage.getItem("token")); // Acessa o token do localStorage

  if (!token) {
    console.error("Token não encontrado no localStorage");
    throw new Error("Token não encontrado");
  }

  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(`${api}/referencias/getref/${id}`, config); // URL para pegar a referência específica pelo ID
    const jsonResponse = await res.json();

    // Retornar a resposta ou lançar erro se existir
    if (!res.ok)
      throw new Error(jsonResponse.error || "Erro ao pegar referência");

    return jsonResponse; // Retorna os dados da referência encontrada
  } catch (error) {
    console.error("Erro no serviço de pegar referência por ID:", error);
    return { errors: [error.message] }; // Retorna o erro em formato esperado pelo slice
  }
};

const searchReferenciasByAutor = async (autor, token) => {
    if (!token) {
        console.error("Token não encontrado no localStorage");
        throw new Error("Token não encontrado");
    }

    try {
        // Adiciona o termo da busca como query string na URL
        const res = await fetch(`${api}/referencias/search?autor=${encodeURIComponent(autor)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho
            },
        });

        const jsonResponse = await res.json();

        // Verifica a resposta da API
        if (!res.ok) throw new Error(jsonResponse.error || "Erro ao buscar referências");

        return jsonResponse.referencias; // Supondo que as referências estão nessa chave
    } catch (error) {
        console.error("Erro no serviço de busca por autor:", error);
        throw error;
    }
};
// Exporta as funções do serviço
const referenciaService = {
  createReferencia,
  getUserReferencias,
  deleteReferencia,
  updateReferencia,
  getReferenciaById,
  searchReferenciasByAutor,
};

export default referenciaService;
