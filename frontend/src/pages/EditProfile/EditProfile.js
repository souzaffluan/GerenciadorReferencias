import './EditProfile.css'

//hooks
import { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'

//redux
import {profile, resetMessage, updateProfile} from '../../slices/userSlice'

//componentes
import Message from '../../components/Message'

//registrar um usuario
const EditProfile = () =>{
    const dispatch = useDispatch();
    const { user, message, error, loading } = useSelector((state) => state.user);

    // States
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    // Carregar dados do usuário
    useEffect(() => {
        console.log(user);
        dispatch(profile());
    }, [dispatch]);

    // Carregar o formulário com os dados do usuário
    useEffect(() => {
        if (user) {
            setNome(user.nome || "");
            setEmail(user.email || "");
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Montar objeto com os dados do usuário
        const userData = {
            nome,
            
        };
        

        if (senha) {
            userData.senha = senha;
        }

        // Construir FormData
        const formData = new FormData();
        Object.keys(userData).forEach((key) => formData.append(key, userData[key]));

        console.log(...formData);

        // Enviar atualização de perfil
        await dispatch(updateProfile(formData));
        console.log(typeof nome, typeof email, typeof senha);

        // Resetar mensagem após 2 segundos
        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);
    };

    return (
        <div key={user.id}id="edit-profile">
            <h2>Editar seus dados</h2>
            <p className="subtitle">Edite informações de login.</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome"
                    onChange={(e) => setNome(e.target.value)}
                    value={typeof nome === 'string' ? nome : ''}
                />
                <input
                    type="email"
                    placeholder="Email"
                    disabled
                    value={typeof email === 'string' ? email : ''}
                />
                <label>
                    <span>Quer alterar sua senha</span>
                    <input
                        type="password"
                        placeholder="Digite sua nova senha"
                        onChange={(e) => setSenha(e.target.value)}
                        value={typeof senha === 'string' ? senha : ''}
                    />
                </label>
                {!loading && <input type="submit" value="Atualizar" />}
                {loading && <input type="submit" value="Aguarde..." />}
                {error && <Message msg={error} type="error" />}
                {message && <Message msg={message} type="success" />}
            </form>
        </div>
    );
};

    

export default EditProfile;