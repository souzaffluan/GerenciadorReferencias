import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserReferencias, deleteReferencia } from "../../slices/referenciaSlice";
import './Home.css'
import '../../../src/index.css'
import { Link, useNavigate } from "react-router-dom";
import Message from "../../components/Message";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Aqui, acessar o estado corretamente
  const { referencias, loading, error } = useSelector((state) => state.referencias);


  useEffect(() => {
      dispatch(getUserReferencias());
  }, [dispatch]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  const handleDelete = async (id) => {
    try {
      // Dispara a ação do Redux para deletar a referência
      await dispatch(deleteReferencia(id));
      // Aqui você pode adicionar alguma lógica de sucesso, como uma notificação ou redirecionamento
    } catch (error) {
      // Lidar com erros, se necessário
      console.error("Erro ao excluir referência:", error);
    }
  };
  const handleEditRedirect = (id) => {
    navigate(`/edit-referencia/${id}`); // Rota de edição da referência
  };

  return (
      <div className="referencias-list">
          {referencias && referencias.map((referencia) => (
              <div className="referencia-item" key={referencia._id} onClick={() => handleEditRedirect(referencia._id)} style={{cursor: "pointer"}}>
                  <h2>{referencia.titulo}</h2>
                  <p>Tipo: {referencia.tipo}</p>
                  <p>Criada em:{new Date(referencia.createdAt).toLocaleString()}</p>
                  <p>Criada em:{new Date(referencia.updatedAt).toLocaleString()}</p>
                  <button className="delete-btn" onClick={() => handleDelete(referencia._id)}>Excluir</button>
                  
                  
                  {/* Botões de editar e deletar */}
              </div>
          ))}
      </div>
  );

};

export default Home;