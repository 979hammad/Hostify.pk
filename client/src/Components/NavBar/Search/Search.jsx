import SearchIcon from '@mui/icons-material/Search';
import "./Search.css";

const Search = () => {
  return (
    <div className='navSearchMain'>
     <div className='navSearch'>
        <input  className='navSearchInput' placeholder='Search here ...'/>
        <SearchIcon id="navSearchIcon"/>
     </div>

    </div>
  )
}

export default Search