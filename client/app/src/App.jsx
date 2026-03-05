import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [books, setBooks] = useState([])
  const [title, setTitle] = useState("")
  const [realised_year, setRealised_year] = useState(0)
  const [change, setChange] = useState("")

  ///for GET request 
  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/");
      const data = await response.json();
      setBooks(data)
      console.log(data)
    }
    catch (err) {
      console.log(err)
    }

  }

  ///for POST request
  const addBook = async ()=> {
    const bookData = {
      title : title,
      realised_year: realised_year
    }
    try {
    const response = await fetch("http://127.0.0.1:8000/api/books/create/" , {
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(bookData)
      });
      const data = await response.json()
      setBooks((prev)=> [...prev,data])
    }catch (err ){
      console.log(err)
    }
    
  }

  // FOR PUT request

  const updateTitle = async (pk , realised_year)=> {
    const bookData = {
      title : change,
      realised_year: realised_year
    }
    try {
    const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}/`, {
        method:"PUT",
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(bookData)
      });
      const data = await response.json()
      setBooks((prev)=>
        prev.map((book) => {
          if (book.id == pk){
            return data
          }
          else{
            return book
          }
        })
      )
    }catch (err ){
      console.log(err)
    }
    
  }
  const deleteItem = async(pk)=>{
    try {
    const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}/`, {
        method:"DELETE",        
      }
    );
    setBooks((prev) => prev.filter((items)=> items.id !== pk))
  }
  catch (err ){
      console.log(err)
    }};
  return (
    <>
      <h1>book store</h1>
      <input type="text" 
      placeholder='title of the book' 
      onChange={(e) =>setTitle(e.target.value)}
      />

      <input type="number" 
      placeholder='realise year' 
      onChange={(e) =>setRealised_year(Number(e.target.value))}
      />
      <button onClick={addBook}>sumite</button>

      {books.map((items) =>
         <div key={items.id}>
          title of the book :- {items.title} <br />
          realised year : {items.realised_year}

          <input type="text"
          placeholder='New title'
          onChange={(e)=>setChange(e.target.value)}
          />
          {/* FOR PUT USE ONLY FUNCITON , WHEN U PASS ARGUMENT TRY TO USE FUNCTION(AROW) */}
          <button onClick={() => updateTitle(items.id, items.realised_year)}> change </button>
          <button onClick={()=> deleteItem(items.id)}>delete</button>
        </div>

      )
      }
    </>
  )
}

export default App
