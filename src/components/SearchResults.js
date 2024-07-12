import React from 'react'
import { useSearchProvider } from '../context/searchContext'
const SearchResults = () => {
  const childStyle = {
    height: '260px',
    objectPosition: 'center',
  };
  const [values, setValues] = useSearchProvider();
  return (
    <>
      <div className='header'>
        <h3>Search Results</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }} className='body'>
        {values.results.map((item) => {
          return (
            <div class="card" style={{ width: '18rem',margin:'20px' }}>
              <img class="card-img-top" style={childStyle} src={`https://e-commerse-backend-yeft.onrender.com/api/v1/products/get-particular-photo/0/${item._id}`} alt="Card image cap" />
              <div class="card-body">
                <h5 class="card-title">{item.name}</h5>
                <p class="card-text">{item.description}</p>
                <a href="#" class="btn btn-primary">Buy Now</a>
              </div>
            </div>
          )
        })}


      </div>
    </>
  )
}

export default SearchResults