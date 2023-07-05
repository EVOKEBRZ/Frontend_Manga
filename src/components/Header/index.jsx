import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    
  return (

    <div className="header-container">
      <nav className="header-nav">
        <div className="header-column">
          <Link to="/" className="header-link">Home</Link>
        </div>
        <div className="header-column">
          <Link to="/mangas" className="header-link">Mangas</Link>
          <Link to="/mangas/add" className="header-link">Adicionar Manga</Link>
          <Link to="/chapters/add" className="header-link">Adicionar Capitulo</Link>
          <Link to="/pages/add" className="header-link">Adicionar Página</Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;