import React, { useState } from 'react';
import './CreateReferenceForm.css'
import { useDispatch, useSelector } from 'react-redux';
import { createReferencia } from '../../slices/referenciaSlice';

const CreateReferenceForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    titulo: '',
    autor: {
      nome: '',
      sobrenome: '',
    },
    ano: '',
    tipo: 'Livro', // valor padrão
    // Campos adicionais específicos
    editora: '',
    edicao: '',
    datapubli: '',
    nomeSite: '',
    url: '',
    disponivel: '',
    acesso: '',
    nomePodcast: '',
    entrevistado: '',
    entrevistador: '',
    local: {
      produtora: '',
      dataPod: '',
    },
    tituloRevista: '',
    localRevista: '',
    volume: '',
    numero: '',
    paginas: '',
  });

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
    dispatch(createReferencia(formData));
    // Resetando o formulário após a submissão
    setFormData({
      titulo: '',
      autor: {
        nome: '',
        sobrenome: '',
      },
      ano: '',
      tipo: 'Livro',
      editora: '',
      edicao: '',
      datapubli: '',
      nomeSite: '',
      url: '',
      disponivel: '',
      acesso: '',
      nomePodcast: '',
      entrevistado: '',
      entrevistador: '',
      local: {
        produtora: '',
        dataPod: '',
      },
      tituloRevista: '',
      localRevista: '',
      volume: '',
      numero: '',
      paginas: '',
    });
  };

  return (
    <div id="criar-referencia">
    <form key={formData.tipo} onSubmit={handleSubmit}>
      <label>
        <span>Tipo de Referência</span>
        <select id='tipo-ref' name="tipo" value={formData.tipo} onChange={handleChange}>
          <option value="Livro">Livro</option>
          <option value="Artigo">Artigo</option>
          <option value="Podcast">Podcast</option>
          <option value="Revista">Revista</option>
        </select>
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

      {formData.tipo === 'Livro' && (
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

      {formData.tipo === 'Artigo' && (
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

      {formData.tipo === 'Podcast' && (
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
              placeholder="Nome da produtora"
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
          <label>
            <span>URL</span>
            <input
              type="text"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="URL do podcast"
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

      {formData.tipo === 'Revista' && (
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
            <span>Local</span>
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
              placeholder="Volume da revista"
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

      <input type="submit" value="Criar Referência" />
    </form>
    </div>
  );
};

export default CreateReferenceForm;
