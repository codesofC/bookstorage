import React, { useState } from 'react'
import { connect } from 'react-redux';
import {actionAddBook} from '../redux/actions/actionAddBook'
import {actionDeleteBook} from '../redux/actions/actionDeleteBook'
import {deleteAllBooks} from '../redux/actions/actionDeleteAllBooks'
import FlipMove from 'react-flip-move';

const AddBook = ({libraryData, addBook, deleteBook, deleteAllBooks}) => {

    const [newBook, setNewBook] = useState({
        title: '',
        author: ''
    });

    const handleSubmit = e => {
        e.preventDefault();
        addBook(newBook);

        setNewBook({
            title: '',
            author: ''
        });
    }

    const displayBooks = libraryData.length > 0 ? 
    <FlipMove>
        {
            libraryData.map(item => {
                return (<li key={item.id} className='list-group-item list-group-item-light d-flex justify-content-between'>
                    <span><strong>Titre: </strong> {item.title} </span>
                    <span><strong>Auteur: </strong> {item.author} </span>
                    <span className='btn btn-danger' onClick={()=>deleteBook(item.id)}>x</span>
                </li>)
            })
        }
    </FlipMove>
     : (
        <p className='text-center'>
            Pas de livres enregistres
        </p>
    );

    const deleteBtn = libraryData.length > 0 && (
        <button 
            className='btn btn-danger mt-4 mb-5'
            onClick={deleteAllBooks}
        >
            Effacer tous les livres
        </button>
    )

  return (
    <main role='main'>
        <div className='jumbroton jumbroton-fluid'>
            <div className='container text-center'>
                <h1 className='display-4'>BOOKS</h1>
                <p>Ajouter un livre dans votre bibliotheque</p>

                <form 
                    className='form-inline d-flex justify-content-center'
                    onSubmit={handleSubmit}
                >
                    <div className='form-group'>
                        <input 
                            type='text'
                            className='form-control'
                            placeholder='Titre'
                            required
                            value={newBook.title}
                            onChange={e => setNewBook({...newBook, title: e.target.value})}
                        />
                    </div>
                    <div className='form-group'>
                        <input 
                            type='text'
                            className='form-control ml-3'
                            placeholder='Auteur'
                            required
                            value={newBook.author}
                            onChange={e => setNewBook({...newBook, author: e.target.value})}
                        />
                    </div>
                    <div className='form-group'>
                        <button className='ml-3 btn btn-outline-secondary'>Ajouter</button>
                    </div>
                </form>
            </div>
        </div>

        <div className='container mt-3' style={{minHeight: '200px'}}>
            <div className='row'>
                <div className='col-md-12'>
                    <ul className='list-group'>
                        {displayBooks}
                    </ul>
                    <div className='d-flex justify-content-center'>
                        {deleteBtn}
                    </div>
                </div>       
            </div>
        </div>
    </main>
  )
}

const mapStateToProps = state => {
    return {
        libraryData: state.library
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addBook: data => dispatch(actionAddBook(data)),
        deleteBook: id => dispatch(actionDeleteBook(id)),
        deleteAllBooks: () => dispatch(deleteAllBooks())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBook)