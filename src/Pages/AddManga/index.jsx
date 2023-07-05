import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./AddManga.css"; 

const AddManga = () => {
  const [mangas, setMangas] = useState([]);
  const [newManga, setNewManga] = useState({
    title: '',
    genre: '',
    cover_img: ''
  });
  const [editManga, setEditManga] = useState({
    id: null,
    title: '',
    genre: '',
    cover_img: ''
  });

  useEffect(() => {
    fetchMangas();
  }, []);

  const fetchMangas = async () => {
    try {
      const response = await axios.get('http://localhost:3001/mangas');
      setMangas(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setNewManga({
      ...newManga,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateManga = async () => {
    try {
      await axios.post('http://localhost:3001/mangas', newManga);
      setNewManga({
        title: '',
        genre: '',
        cover_img: ''
      });
      fetchMangas();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateManga = async (id) => {
    try {
      await axios.put(`http://localhost:3001/mangas/${id}`, editManga);
      setEditManga({
        id: null,
        title: '',
        genre: '',
        cover_img: ''
      });
      fetchMangas();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteManga = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/mangas/${id}`);
      fetchMangas();
    } catch (error) {
      console.error(error);
    }
  };

  const setEditMangaValues = (manga) => {
    setEditManga({
      id: manga.id,
      title: manga.title,
      genre: manga.genre,
      cover_img: manga.cover_img
    });
  };

  return (
    <div>
      <h1>DB MANGA:</h1>
      <div>
        <h2>Adicionar, Editar ou Excluir Manga</h2>
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={newManga.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="genre"
          placeholder="Gênero"
          value={newManga.genre}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="cover_img"
          placeholder="URL Imagem de Capa"
          value={newManga.cover_img}
          onChange={handleInputChange}
        />
        <button onClick={handleCreateManga}>Adicionar</button>
      </div>

      <div>
        <h2>Lista de Mangas</h2>
        {mangas.map((manga) => (
          <div key={manga.id}>
            <p>Título: {manga.title}</p>
            <p>Gênero: {manga.genre}</p>
            <img src={manga.cover_img} alt={manga.title} width={'100px'} height={'150px'} />
            {editManga.id === manga.id ? (
              <>
                <input
                  type="text"
                  name="title"
                  placeholder="Novo Título"
                  value={editManga.title}
                  onChange={(e) =>
                    setEditManga({ ...editManga, title: e.target.value })
                  }
                />
                <input
                  type="text"
                  name="genre"
                  placeholder="Novo Gênero"
                  value={editManga.genre}
                  onChange={(e) =>
                    setEditManga({ ...editManga, genre: e.target.value })
                  }
                />
                <input
                  type="text"
                  name="cover_img"
                  placeholder="Nova Imagem de Capa"
                  value={editManga.cover_img}
                  onChange={(e) =>
                    setEditManga({ ...editManga, cover_img: e.target.value })
                  }
                />
                <button onClick={() => handleUpdateManga(manga.id)}>
                  Editar
                </button>
                <button onClick={() => setEditMangaValues({})}>Cancelar</button>
              </>
            ) : (
              <>
                <button onClick={() => setEditMangaValues(manga)}>
                  Atualizar
                </button>
                <button onClick={() => handleDeleteManga(manga.id)}>
                  Deletar
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddManga;