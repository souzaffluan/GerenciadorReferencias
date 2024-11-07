import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import referenciaService from "../services/referenciaService";

const initialState = {
  referencias: [],
  loading: false,
  error: null,
  success: false,
  message: null
};

// Ação para criar uma referência
export const createReferencia = createAsyncThunk(
  "referencias/create",
  async (data, { rejectWithValue, getState }) => {
    const { token } = JSON.parse(localStorage.getItem('user')); // Obtém o token de autenticação
    console.log(localStorage.getItem('user'))
    console.log(token)
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
    const { token } = JSON.parse(localStorage.getItem('user'));
    
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
    const { token } = getState().auth; // Obtém o token de autenticação
    try {
      const response = await referenciaService.updateReferencia(id, data, token);
      return response; // Retorna a referência atualizada
    } catch (error) {
      return rejectWithValue(error.errors); // Retorna erro caso haja algum problema
    }
  }
);

// Ação para excluir uma referência
export const deleteReferencia = createAsyncThunk(
  "referencias/delete",
  async (id, { rejectWithValue, getState }) => {
    try {
      // Acesse o token de autenticação do localStorage
      const {token} = JSON.parse(localStorage.getItem('user'));
      console.log(token)
      if (!token || !token.token) {
        throw new Error('Token de autenticação não encontrado');
      }
      await referenciaService.deleteReferencia(id, token);
      console.log(id)
      return id; // Retorna o ID da referência excluída
    } catch (error) {
      return rejectWithValue(error.errors); // Retorna erro se houver algum problema
    }
  }
);

const referenciaSlice = createSlice({
  name: "referencias",
  initialState, // Usando a variável inicial diretamente
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = "";
    },
  },
  

  extraReducers: (builder) => {
    // Criar referência
    builder.addCase(createReferencia.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createReferencia.fulfilled, (state, action) => {
      state.loading = false;
      state.referencias.push(action.payload); // Adiciona a referência criada à lista
      state.successMessage = "Referência criada com sucesso!";
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
      state.successMessage = "Referência atualizada com sucesso!";
    });
    builder.addCase(updateReferencia.rejected, (state, action) => {
      state.loading = false;
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
      state.successMessage = "Referência excluída com sucesso!";
    });
    builder.addCase(deleteReferencia.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Exibe o erro
    });
  },
});

// Ações exportadas
export const { clearMessages } = referenciaSlice.actions;

// Exportando o slice
export default referenciaSlice.reducer;
