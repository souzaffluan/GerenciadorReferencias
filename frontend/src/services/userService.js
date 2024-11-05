import {api, requestConfig} from '../utils/config'

//pegar detalkhes de usuario
const profile = async(data, token) =>{
    const config = requestConfig("GET", data, token)

    try{

        const res = await fetch(api + "/users/profile", config)
        .then((res)=> res.json())
        .catch((err) => err)

        return res;
    }catch(error){
        console.log(error)
    }
}

// Atualizar usuário
const updateProfile = async (data, token) => {
    const config = requestConfig("PUT", data, token, true);

    try {
        const res = await fetch(api + "/users", config);
        const jsonResponse = await res.json();

        // Retornar a resposta ou lançar erro se existir
        if (!res.ok) throw new Error(jsonResponse.errors || 'Erro ao atualizar perfil');
        console.log(res)

        return jsonResponse;
    } catch (error) {
        console.error("Erro no serviço de atualização de perfil:", error);
        return { errors: [error.message] }; // Retorna o erro em formato esperado pelo slice
    }
};

const userService =  {
    profile,
    updateProfile
}

export default userService;