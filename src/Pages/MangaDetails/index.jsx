import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Axios } from "axios";

function MangaDetails(){
    const [loading, setLoading] = useState(true);
    const [manga, setManga] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchManga = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/mangas/${id}`);
            setManga(response.data);
            console.log(response.data)
            setLoading(false);
          } catch (error) {
            console.error('Error fetching Manga List:', error);
          }
        };
        
        fetchManga();
      }, []);

    return (
        <>
        {Loading ? <Loading/> : 
        <>
        <h2>{manga.title}</h2>
        <h2>{manga.genre}</h2>
        <h2>{manga.cover_img}</h2>
        </>}
        </>
    )
    
}
export default MangaDetails;