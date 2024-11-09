import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getReferenciaById,
  updateReferencia,
} from "../../slices/referenciaSlice";

const EditReferencia = () => {
    const referenciaDetails = useSelector((state) => state.referencias.referenciaDetails);
    const dispatch = useDispatch();
    const { id } = useParams(); // Pegando o ID da URL
    const { loading, error } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
      titulo: "",
      autor: {
        nome: "",
        sobrenome: "",
      },
      ano: "",
      tipo: "", // valor padrão
      editora: "",
      edicao: "",
      datapubli: "",
      nomeSite: "",
      url: "",
      disponivel: "",
      acesso: "",
      nomePodcast: "",
      entrevistado: "",
      entrevistador: "",
      local: {
        produtora: "",
        dataPod: "",
      },
      tituloRevista: "",
      localRevista: "",
      volume: "",
      numero: "",
      paginas: "",
    });

   

     // UseEffect para buscar e preencher os dados
     useEffect(() => {
        if (id) {
          dispatch(getReferenciaById(id)); // Buscar os dados da referência pelo ID
        }
      }, [id, dispatch]);

       // Caso os dados da referência estejam disponíveis
    console.log(referenciaDetails);
   

  
   // Preenche o formulário com os dados da referência
  useEffect(() => {
    if (referenciaDetails) {
      setFormData({
        titulo: referenciaDetails.titulo || "",
        autor: {
          nome: referenciaDetails.autor?.nome || "",
          sobrenome: referenciaDetails.autor?.sobrenome || "",
        },
        ano: referenciaDetails.ano || "",
        tipo: referenciaDetails.tipo || "",
        editora: referenciaDetails.editora || "",
        edicao: referenciaDetails.edicao || "",
        datapubli: referenciaDetails.datapubli || "",
        nomeSite: referenciaDetails.nomeSite || "",
        url: referenciaDetails.url || "",
        nomePodcast: referenciaDetails.nomePodcast || "",
        entrevistado: referenciaDetails.entrevistado || "",
        entrevistador: referenciaDetails.entrevistador || "",
        local: referenciaDetails.local || { produtora: "", dataPod: "" },
        tituloRevista: referenciaDetails.tituloRevista || "",
        localRevista: referenciaDetails.localRevista || "",
        volume: referenciaDetails.volume || "",
        numero: referenciaDetails.numero || "",
        paginas: referenciaDetails.paginas || "",
      });
    }
  }, [referenciaDetails]);
  
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name.startsWith('autor.')) {
        const field = name.split('.')[1]; // "nome" ou "sobrenome"
        setFormData((prevData) => ({
          ...prevData,
          autor: { ...prevData.autor, [field]: value },
        }));
      } else if (name.startsWith('local.')) {
        const field = name.split('.')[1]; // "produtora" ou "dataPod"
        setFormData((prevData) => ({
          ...prevData,
          local: { ...prevData.local, [field]: value },
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(updateReferencia(formData));
      // Resetando o formulário após a submissão
      setFormData({
        titulo: "",
        autor: {
          nome: "",
          sobrenome: "",
        },
        ano: "",
        tipo: "Livro",
        editora: "",
        edicao: "",
        datapubli: "",
        nomeSite: "",
        url: "",
        disponivel: "",
        acesso: "",
        nomePodcast: "",
        entrevistado: "",
        entrevistador: "",
        local: {
          produtora: "",
          dataPod: "",
        },
        tituloRevista: "",
        localRevista: "",
        volume: "",
        numero: "",
        paginas: "",
      });
    };
  
    return (
      <div id="criar-referencia">
        <form key={formData.tipo} onSubmit={handleSubmit}>
          <label>
            <span>Tipo de Referência</span>
            <input
              type="text"
              name="tipo"
              value={formData.tipo}
              readOnly
              disabled
              placeholder="Tipo de referência"
            />
          </label>
  
          <label>
            <span>Título</span>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Título da referência"
              required
            />
          </label>
  
          <label>
            <span>Nome do Autor</span>
            <input
              type="text"
              name="autor.nome"
              value={formData.autor.nome}
              onChange={handleChange}
              placeholder="Nome do autor"
              required
            />
          </label>
  
          <label>
            <span>Sobre Nome do Autor</span>
            <input
              type="text"
              name="autor.sobrenome"
              value={formData.autor.sobrenome}
              onChange={handleChange}
              placeholder="Sobrenome do autor"
              required
            />
          </label>
  
          <label>
            <span>Ano</span>
            <input
              type="number"
              name="ano"
              value={formData.ano}
              onChange={handleChange}
              placeholder="Ano de publicação"
              required
            />
          </label>
  
          {formData.tipo === "Livro" && (
            <>
              <label>
                <span>Editora</span>
                <input
                  type="text"
                  name="editora"
                  value={formData.editora}
                  onChange={handleChange}
                  placeholder="Nome da editora"
                />
              </label>
              <label>
                <span>Edição</span>
                <input
                  type="text"
                  name="edicao"
                  value={formData.edicao}
                  onChange={handleChange}
                  placeholder="Edição do livro"
                />
              </label>
              <label>
                <span>Data de Publicação</span>
                <input
                  type="date"
                  name="datapubli"
                  value={formData.datapubli}
                  onChange={handleChange}
                />
              </label>
            </>
          )}
  
          {formData.tipo === "Artigo" && (
            <>
              <label>
                <span>Nome do Site</span>
                <input
                  type="text"
                  name="nomeSite"
                  value={formData.nomeSite}
                  onChange={handleChange}
                  placeholder="Nome do site"
                />
              </label>
              <label>
                <span>URL</span>
                <input
                  type="text"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="URL do artigo"
                />
              </label>
              <label>
                <span>Disponível</span>
                <input
                  type="text"
                  name="disponivel"
                  value={formData.disponivel}
                  onChange={handleChange}
                  placeholder="Disponível desde"
                />
              </label>
              <label>
                <span>Acesso</span>
                <input
                  type="date"
                  name="acesso"
                  value={formData.acesso}
                  onChange={handleChange}
                />
              </label>
            </>
          )}
  
          {formData.tipo === "Podcast" && (
            <>
              <label>
                <span>Nome do Podcast</span>
                <input
                  type="text"
                  name="nomePodcast"
                  value={formData.nomePodcast}
                  onChange={handleChange}
                  placeholder="Nome do podcast"
                />
              </label>
              <label>
                <span>Entrevistado</span>
                <input
                  type="text"
                  name="entrevistado"
                  value={formData.entrevistado}
                  onChange={handleChange}
                  placeholder="Nome do entrevistado"
                />
              </label>
              <label>
                <span>Entrevistador</span>
                <input
                  type="text"
                  name="entrevistador"
                  value={formData.entrevistador}
                  onChange={handleChange}
                  placeholder="Nome do entrevistador"
                />
              </label>
              <label>
                <span>Produtora</span>
                <input
                  type="text"
                  name="local.produtora"
                  value={formData.local.produtora}
                  onChange={handleChange}
                  placeholder="Produtora"
                />
              </label>
              <label>
                <span>Data do Podcast</span>
                <input
                  type="date"
                  name="local.dataPod"
                  value={formData.local.dataPod}
                  onChange={handleChange}
                />
              </label>
            </>
          )}
  
          {formData.tipo === "Revista" && (
            <>
              <label>
                <span>Título da Revista</span>
                <input
                  type="text"
                  name="tituloRevista"
                  value={formData.tituloRevista}
                  onChange={handleChange}
                  placeholder="Título da revista"
                />
              </label>
              <label>
                <span>Local da Revista</span>
                <input
                  type="text"
                  name="localRevista"
                  value={formData.localRevista}
                  onChange={handleChange}
                  placeholder="Local de publicação"
                />
              </label>
              <label>
                <span>Volume</span>
                <input
                  type="number"
                  name="volume"
                  value={formData.volume}
                  onChange={handleChange}
                  placeholder="Volume"
                />
              </label>
              <label>
                <span>Número</span>
                <input
                  type="number"
                  name="numero"
                  value={formData.numero}
                  onChange={handleChange}
                  placeholder="Número da revista"
                />
              </label>
              <label>
                <span>Páginas</span>
                <input
                  type="text"
                  name="paginas"
                  value={formData.paginas}
                  onChange={handleChange}
                  placeholder="Páginas"
                />
              </label>
            </>
          )}
  
          <button type="submit" disabled={loading}>
            {loading ? "Atualizando..." : "Atualizar Referência"}
          </button>
        </form>
      </div>
    );
  };
export default EditReferencia;  
