//arquivi de configuração de rotas

export const api = "http://localhost:5000/api"

export const requestConfig = (method, data, token = null) => {
    let config = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
    };

    if (data) {
        config.body = JSON.stringify(data);
    }

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
};