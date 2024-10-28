//arquivi de configuração de rotas

export const api = "http://localhost:5000/api"

export const requestConfig = (method, data, token = null)=>{
    let config

    config = {
        method,
        body: data,
        headers: {}
    }

    if(method === "DELETE" || data ===null){
        config = {
            method,
            headers: {}
        };
    }else{
        config = {
            method,
            body: JSON.stringify(data),
            headers:{
                "Content-type": "application/json"
            }
        }
    }

    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
}