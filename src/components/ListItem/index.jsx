import { useState } from "react";
import coracaoVazio from '../../assets/images/coracao-vazio.png';
import coracaoVermelho from '../../assets/images/coracao-vermelho.png';
import axios from "axios";
import { Link } from "react-router-dom";
import "./ListItem.css"; 

function ListItem({ manga, id, cover_img, setMangaList }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleClick = () => {
    setIsFavorite(!isFavorite);
  }

  const handleDelete = async () => {
    await axios.delete(`http://localhost:3001/mangas/${id}`);
    const response = await axios.get('http://localhost:3001/mangas');
    setMangaList(response.data)
  }

  return (
    <li className="list-item-container">
      <div>
        <img src={cover_img} alt={manga} width={'100px'} height={'150px'} />
      </div>
      <div className="manga-title"> 
        {manga}
      </div>
      <button type="button" onClick={handleClick}>
        {isFavorite ? 'Desfavoritar' : 'Favoritar'}
      </button>
      <img src={isFavorite ? coracaoVermelho : coracaoVazio} width={'30px'} alt="Coracao"></img>
    </li>
  );
}

export default ListItem;