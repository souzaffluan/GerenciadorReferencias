import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import {
  getUserReferencias,
  deleteReferencia,
} from "../../slices/referenciaSlice";
import "./Home.css";
import "../../../src/index.css";



const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  // Aqui, acessar o estado corretamente
  const { referencias, loading, error } = useSelector(
    (state) => state.referencias
  );

  useEffect(() => {
    dispatch(getUserReferencias());
  }, [dispatch]);

  if (loading) return <p key={"carregando"}>Carregando...</p>;
  if (error) return <p key={"erro"}>Erro: {error}</p>;

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
    <div className="referencias-list" key={"referencias-div-lista"}>
      {referencias &&
        referencias.map((referencia) => (
          <div
            className="referencia-item"
            key={referencia._id}
            onClick={() => handleEditRedirect(referencia._id)}
            style={{ cursor: "pointer" }}
          >
            <h2>{referencia.titulo}</h2>
            <p>Tipo: {referencia.tipo}</p>
            <p>Criada em:{new Date(referencia.createdAt).toLocaleString()}</p>
            <p>Modificada em:{new Date(referencia.updatedAt).toLocaleString()}</p>
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(referencia._id);
              }}
            >
              Excluir <FontAwesomeIcon icon={faTrash} style={{ marginLeft: "5px" }} />
            </button>
            <button
              className="copiar-btn"
              onClick={(e) => {
                e.stopPropagation();
                
              }}
            >
              Copiar <FontAwesomeIcon icon={faCopy} style={{ marginLeft: "5px" }} />
            </button>
          </div>
        ))}
    </div>
  );
};

export default Home;
