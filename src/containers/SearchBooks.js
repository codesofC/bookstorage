import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchedBooks } from '../redux/actions/actionFetch';
import { actionAddBook } from '../redux/actions/actionAddBook';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SearchBooks = () => {

  const [search, setSearch] = useState('');

  const notify = () => toast.success('Livre enregistré!');

  const resultFetch = useSelector(state => state.search)
  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(fetchedBooks(search));
  }

  const saveBook = (title, author) => {
    dispatch(actionAddBook({
      title,
      author
    }));

    notify()
  } 

  const displayResults = resultFetch.isLoading ? (
    <div className='d-flex justify-content-center'>
      <div className='spinner-border text-info' role='status'>
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  ) : ( resultFetch.error !== '' ? (
    <p>{resultFetch.error}</p>
  ) : (
    resultFetch.fetchedBooks.map(item => {
      return (
            <div className='card mb-2' key={item.id}>
              <div className='card-header'>
                <h5 className='nb-0'>
                  <button className='btn btn-link collapsed text-decoration-none'
                    data-toggle='collapse'
                    data-target={`#${item.id}`}
                    aria-expanded='false'
                  >
                    { item.volumeInfo.title }
                  </button>
                </h5>
              </div>
              <div id={item.id} className='collapse' data-parent='#accordion'>
                <div className='card-body'>
                  {
                    item.volumeInfo.hasOwnProperty('imageLinks') && 
                    <img 
                      src={item.volumeInfo.imageLinks.thumbnail}
                      alt=''
                    />
                  }

                    <br />

                    <h4 className='card-title'>Titre: { item.volumeInfo.title }</h4>
                    <h5 className='card-title'>Auteur(s): { item.volumeInfo.authors }</h5>
                    <p className='card-text'>Description: { item.volumeInfo.description}</p>
                    <a 
                      className='btn btn-outline-secondary text-decoration-none' 
                      target='_blank' 
                      rel='noopener noreferrer'
                      href={item.volumeInfo.previewLink}
                    >
                      Plus d'infos
                    </a>
                    <button 
                      className='btn btn-outline-secondary ml-3'
                      onClick={()=>saveBook(item.volumeInfo.title, item.volumeInfo.authors)}
                    >
                      Enregistrer
                    </button>
                </div>
                <ToastContainer
                  position="bottom-right"
                 />
              </div>
            </div>
      )
    })
  )
  )

  return (
    <main role='main'>
        <div className='jumbroton jumbroton-fluid'>
            <div className='container text-center'>
                <h1 className='display-4'>BOOKS</h1>
                <p>Indiquez le sujet de recherche sur Google Books API</p>

                <form 
                    className='form-inline d-flex justify-content-center'
                    onSubmit={handleSubmit}
                >
                    <div className='form-group'>
                        <input 
                            type='text'
                            className='form-control'
                            placeholder='(Ex: La drague pour les nuls)'
                            required
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div> 
                    <div className='form-group'>
                        <button className='ml-3 btn btn-outline-secondary'>Rechercher</button>
                    </div>
                </form>
            </div>
        </div>

        <div className='container' style={{minHeight: '200px'}}>
          <div id='accordion'>
            {
              displayResults
            }
          </div>
        </div>

      </main>
  )
}

export default SearchBooks