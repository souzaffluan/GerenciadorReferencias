// src/services/referenceService.js
import { api, requestConfig } from '../utils/config';

// Criação de referência
const createReferencia = async (data, token) => {
    const config = requestConfig("POST", data, token, true);
  
    try {
      const res = await fetch(api + "/referencias/newreferencia", config);
      const jsonResponse = await res.json();
  
      // Verificar se a resposta foi bem-sucedida
      if (!res.ok) throw new Error(jsonResponse.message || 'Erro ao criar referência');
      return jsonResponse;
    } catch (error) {
      console.error("Erro no serviço de criação de referência:", error);
      return { errors: [error.message] }; // Retorna o erro em formato esperado pelo slice
    }
  };

// Pegar referências do usuário
const getUserReferencias = async (token) => {
    const config = requestConfig("GET", null, token);

    try {
        const res = await fetch(api + "/referencias/usereferencias", config);
        const jsonResponse = await res.json();

        // Retornar a resposta ou lançar erro se existir
        if (!res.ok) throw new Error(jsonResponse.error || 'Erro ao pegar referências');

        return jsonResponse;
    } catch (error) {
        console.error("Erro no serviço de pegar referências do usuário:", error);
        return { errors: [error.message] }; // Retorna o erro em formato esperado pelo slice
    }
};

// Deletar referência
const deleteReferencia = async (id, token) => {
    const config = requestConfig("DELETE", null, token);

    try {
        const res = await fetch(api + `/referencias/deletereferencia/${id}`, config);
        const jsonResponse = await res.json();

        // Retornar a resposta ou lançar erro se existir
        if (!res.ok) throw new Error(jsonResponse.error || 'Erro ao deletar referência');

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
        if (!res.ok) throw new Error(jsonResponse.message || 'Erro ao atualizar referência');

        return jsonResponse;
    } catch (error) {
        console.error("Erro no serviço de atualização de referência:", error);
        return { errors: [error.message] }; // Retorna o erro em formato esperado pelo slice
    }
};

// Exporta as funções do serviço
const referenciaService = {
    createReferencia,
    getUserReferencias,
    deleteReferencia,
    updateReferencia
};

export default referenciaService;