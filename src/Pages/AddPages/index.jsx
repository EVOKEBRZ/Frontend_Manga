import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddPage = () => {
  const [pages, setPages] = useState([]);
  const [newPage, setNewPage] = useState({
    page_number: '',
    img: '',
    chapter_id: ''
  });
  const [editPage, setEditPage] = useState(null);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await axios.get('http://localhost:3001/pages');
      setPages(response.data);
    } catch (error) {
      console.error('Erro ao carregar Páginas');
    }
  };

  const handleInputChange = (e) => {
    setNewPage({
      ...newPage,
      [e.target.name]: e.target.value
    });
  };

  const handleCreatePage = async () => {
    try {
      await axios.post('http://localhost:3001/pages', newPage);
      setNewPage({
        page_number: '',
        img: '',
        chapter_id: ''
      });
      fetchPages();
    } catch (error) {
      console.error('Erro ao adicionar');
    }
  };

  const handleUpdatePage = async (id) => {
    try {
      await axios.put(`http://localhost:3001/pages/${id}`, editPage);
      setEditPage(null);
      fetchPages();
    } catch (error) {
      console.error('Erro ao atualizar');
    }
  };

  const handleDeletePage = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/pages/${id}`);
      fetchPages();
    } catch (error) {
      console.error('Erro ao Deletar');
    }
  };

  const setEditPageValues = (page) => {
    setEditPage(page);
  };

  return (
    <div>
      <h1>DB MANGA:</h1>
      <div>
        <h2>Adicionar, Editar ou Deletar Páginas</h2>
        <input
          type="number"
          name="page_number"
          placeholder="Page Number"
          value={newPage.page_number}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="img"
          placeholder="Image URL"
          value={newPage.img}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="chapter_id"
          placeholder="Chapter ID"
          value={newPage.chapter_id}
          onChange={handleInputChange}
        />
        <button onClick={handleCreatePage}>Create</button>
      </div>

      <div>
        <h2>Lista de Páginas</h2>
        {pages.map((page) => (
          <div key={page.id}>
            <p>Page Number: {page.page_number}</p>
            <p>Image: {page.img}</p>
            <p>Chapter ID: {page.chapter_id}</p>
            {editPage && editPage.id === page.id ? (
              <>
                <input
                  type="number"
                  name="page_number"
                  placeholder="Novo Número da Página"
                  value={editPage.page_number}
                  onChange={(e) =>
                    setEditPage({ ...editPage, page_number: e.target.value })
                  }
                />
                <input
                  type="text"
                  name="img"
                  placeholder="Nova URL da página"
                  value={editPage.img}
                  onChange={(e) =>
                    setEditPage({ ...editPage, img: e.target.value })
                  }
                />
                <input
                  type="text"
                  name="chapter_id"
                  placeholder="Novo ID de capítulo"
                  value={editPage.chapter_id}
                  onChange={(e) =>
                    setEditPage({ ...editPage, chapter_id: e.target.value })
                  }
                />
                <button onClick={() => handleUpdatePage(page.id)}>
                  Editar
                </button>
                <button onClick={() => setEditPage(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <button onClick={() => setEditPageValues(page)}>Atualizar</button>
                <button onClick={() => handleDeletePage(page.id)}>
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

export default AddPage;
