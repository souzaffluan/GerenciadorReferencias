import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import referenciaService from "../services/referenciaService";

const initialState = {
  referencias: [], // Iniciando como um array vazio
  loading: false,
  error: null,
  success: false,
  message: null,
  referenciaDetails: null,
};

// Ação para criar uma referência
export const createReferencia = createAsyncThunk(
  "referencias/create",
  async (data, { rejectWithValue, getState }) => {
    const { token } = JSON.parse(localStorage.getItem("user")); // Obtém o token de autenticação
    console.log(localStorage.getItem("user"));
    console.log(token);
    try {
      await referenciaService.createReferencia(data, token);
      //return response; // Retorna a referência criada
    } catch (error) {
      return rejectWithValue(error.errors); // Se houver erro, retorna a mensagem de erro
    }
  }
);

// Ação para obter as referências do usuário
export const getUserReferencias = createAsyncThunk(
  "referencias/getUserReferencias",
  async (_, { rejectWithValue, getState }) => {
    const { token } = JSON.parse(localStorage.getItem("user"));

    try {
      const response = await referenciaService.getUserReferencias(token);
      return response.referencias; // Retorna a lista de referências
    } catch (error) {
      return rejectWithValue(error.errors); // Retorna erro se houver algum problema
    }
  }
);

// Ação para atualizar uma referência
export const updateReferencia = createAsyncThunk(
  "referencias/update",
  async ({ id, data }, { rejectWithValue, getState }) => {
    const { token } = JSON.parse(localStorage.getItem("user")); // Obtém o token de autenticação
    try {
      const response = await referenciaService.updateReferencia(
        id,
        data,
        token
      );
      return response; // Retorna a referência atualizada
    } catch (error) {
      return rejectWithValue(error.errors); // Retorna erro caso haja algum problema
    }
  }
);

// Ação para excluir uma referência
export const deleteReferencia = createAsyncThunk(
  "referencias/delete",
  async (id, { rejectWithValue }) => {
    try {
      // Obter o token do localStorage
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user.token) {
        throw new Error("Token de autenticação não encontrado");
      }

      // Passa o token para o service
      await referenciaService.deleteReferencia(id, user.token);

      return id; // Retorna o ID da referência excluída
    } catch (error) {
      console.error("Erro ao excluir referência:", error);
      return rejectWithValue(error.message || "Erro ao deletar referência");
    }
  }
);

//pegar referencia por id
// Ação para buscar uma referência por ID
export const getReferenciaById = createAsyncThunk(
  "referencias/getById",
  async (id, { rejectWithValue }) => {
    try {
      const { token } = JSON.parse(localStorage.getItem("user"));
      const data = await referenciaService.getReferenciaById(id, token);
      console.log("Dados da referência:", data);
      return data; // Retorna os dados da referência do backend
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const searchReferencias = createAsyncThunk(
  "referencias/search",
  async (autor, { rejectWithValue, getState }) => {
    const { token } =JSON.parse(localStorage.getItem("user"));

    try {
      const response = await referenciaService.searchReferenciasByAutor(autor, token);
      return response; // Retorna as referências encontradas
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const referenciaSlice = createSlice({
  name: "referencias",
  initialState, // Usando a variável inicial diretamente
  reducers: {
    resetReferenciaMessage: (state) => {
      state.message = null;
    },
  },


  extraReducers: (builder) => {
    // Criar referência
    builder.addCase(createReferencia.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createReferencia.fulfilled, (state, action) => {
      state.loading = true;
      state.referencias.push(action.payload); // Adiciona a referência criada à lista
      state.message = "Referência criada com sucesso!";
    });
    builder.addCase(createReferencia.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Exibe o erro
    });

    // Obter referências do usuário
    builder.addCase(getUserReferencias.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserReferencias.fulfilled, (state, action) => {
      state.loading = false;
      state.referencias = action.payload; // Atualiza a lista de referências
    });
    builder.addCase(getUserReferencias.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Exibe o erro
    });

    // Atualizar referência
    builder.addCase(updateReferencia.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateReferencia.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.referencias.findIndex(
        (ref) => ref._id === action.payload._id
      );
      if (index !== -1) {
        state.referencias[index] = action.payload; // Atualiza a referência na lista
      }
      state.message = "Referência atualizada com sucesso!";
    });
    builder.addCase(updateReferencia.rejected, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = action.payload; // Exibe o erro
    });

    // Excluir referência
    builder.addCase(deleteReferencia.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteReferencia.fulfilled, (state, action) => {
      state.loading = false;
      state.referencias = state.referencias.filter(
        (ref) => ref._id !== action.payload
      ); // Remove a referência excluída
      state.success = true;
      state.message = "Referência excluída com sucesso!";
    });
    builder.addCase(deleteReferencia.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Exibe o erro
    });
    builder.addCase(getReferenciaById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getReferenciaById.fulfilled, (state, action) => {
      state.loading = false;
      state.referenciaDetails = action.payload; // Atualiza com os dados da referência
    });
    builder.addCase(getReferenciaById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Exibe o erro, se houver
    });
    builder.addCase(searchReferencias.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchReferencias.fulfilled, (state, action) => {
      state.loading = false;
      state.referencias = action.payload; // Atualiza a lista de referências com o resultado da busca
    });
    builder.addCase(searchReferencias.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Ações exportadas
export const { resetReferenciaMessage } = referenciaSlice.actions;

// Exportando o slice
export default referenciaSlice.reducer;
