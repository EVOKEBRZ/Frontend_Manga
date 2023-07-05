import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddChapter.css';

const AddChapter = () => {
  const [chapters, setChapters] = useState([]);
  const [newChapter, setNewChapter] = useState({
    title: '',
    chapter_number: '',
    id_manga: '',
  });
  const [editChapter, setEditChapter] = useState(null);

  useEffect(() => {
    fetchChapters();
  }, []);

  const fetchChapters = async () => {
    try {
      const response = await axios.get('http://localhost:3001/chapters');
      setChapters(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setNewChapter({
      ...newChapter,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateChapter = async () => {
    try {
      await axios.post('http://localhost:3001/chapters', newChapter);
      setNewChapter({
        title: '',
        chapter_number: '',
        id_manga: ''
      });
      fetchChapters();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateChapter = async (id) => {
    try {
      await axios.put(`http://localhost:3001/chapters/${id}`, editChapter);
      setEditChapter(null);
      fetchChapters();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteChapter = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/chapters/${id}`);
      fetchChapters();
    } catch (error) {
      console.error(error);
    }
  };

  const setEditChapterValues = (chapter) => {
    setEditChapter(chapter);
  };

  const cancelEdit = () => {
    setEditChapter(null);
  };

  return (
    <div>
      <h1>Add Chapter</h1>

      <div>
        <h2>Create Chapter</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newChapter.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="chapter_number"
          placeholder="Chapter Number"
          value={newChapter.chapter_number}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="id_manga"
          placeholder="Manga ID"
          value={newChapter.id_manga}
          onChange={handleInputChange}
        />
        <button onClick={handleCreateChapter}>Adicionar</button>
      </div>

      <div>
        <h2>Lista de Capitulos</h2>
        {chapters.map((chapter) => (
          <div key={chapter.id}>
            <p>Title: {chapter.title}</p>
            <p>Chapter Number: {chapter.chapter_number}</p>
            <p>Manga ID: {chapter.id_manga}</p>
            {editChapter && editChapter.id === chapter.id ? (
              <>
                <input
                  type="text"
                  name="title"
                  placeholder="Novo Título"
                  value={editChapter.title}
                  onChange={(e) => setEditChapter({ ...editChapter, title: e.target.value })}
                />
                <input                
                  type="text"
                  name="chapter_number"
                  placeholder="Novo Número de Capítulo"
                  value={editChapter.chapter_number}
                  onChange={(e) => setEditChapter({ ...editChapter, chapter_number: e.target.value })}
                />
                <input
                  type="text"
                  name="id_manga"
                  placeholder="Novo Manga ID"
                  value={editChapter.id_manga}
                  onChange={(e) => setEditChapter({ ...editChapter, id_manga: e.target.value })}
                />
                <button onClick={() => handleUpdateChapter(chapter.id)}>Atualizar</button>
                <button onClick={cancelEdit}>Cancelar</button>
              </>
            ) : (
              <>
                <button onClick={() => setEditChapterValues(chapter)}>Editar</button>
                <button onClick={() => handleDeleteChapter(chapter.id)}>Deletar</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddChapter;
