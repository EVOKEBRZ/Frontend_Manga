import { useState, useEffect } from 'react';
import '../../App.css';
import ListItem from '../../components/ListItem';
import Loading from '../../components/Loading';
import axios from 'axios';

function Mangas() {
  const [mangaList, setMangaList] = useState([]);
  const [filteredMangaList, setFilteredMangaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const fetchMangaList = async () => {
      try {
        const response = await axios.get('http://localhost:3001/mangas');
        setMangaList(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Manga List', error);
      }
    };

    fetchMangaList();
  }, []);

  useEffect(() => {
    const filteredMangas = mangaList.filter((manga) =>
      manga.id.toString().includes(searchValue) ||
      manga.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredMangaList(filteredMangas);
  }, [searchValue, mangaList]);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleClearFilter = () => {
    setSearchValue('');
  };

  return (
    <>
      <h1>Mangas</h1>
      <div>
        <label htmlFor="search">Procure por ID ou Nome:</label>
        <input
          id="search"
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
        />
        <button onClick={handleClearFilter}>Limpar Busca</button>
      </div>
      <ul>
        {loading ? (
          <Loading />
        ) : (
          filteredMangaList.map((manga) => (
            <ListItem
              key={manga.id}
              manga={manga.title}
              genre={manga.genre}
              cover_img={manga.cover_img}
              setMangaList={setMangaList}
            />
          ))
        )}
      </ul>
    </>
  );
}

export default Mangas;