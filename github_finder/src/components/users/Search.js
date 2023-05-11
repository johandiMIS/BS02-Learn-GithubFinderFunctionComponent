import React, {useContext, useState} from 'react'
import GithubContext from '../../context/github/githubContext'
import AlertContext from '../../context/alert/alerContext'

const Search = () => {
  const githubContext = useContext(GithubContext)
  const alertContext = useContext(AlertContext)
  const {showAlert} = alertContext

  const [text, setText] = useState('')

  const onSubmit= (e) =>{
    e.preventDefault();
    if(text===''){
      showAlert('Please Enter Something', 'light')
    }
    else{
        githubContext.searchUsers(text)
        setText('')
    }
  }

  const textOnChange = (e)=>{
    setText(e.target.value)
  }

  return (
    <form onSubmit={onSubmit} className='form '>
      <input 
          type='text' 
          name='text' 
          placeholder='Search Users...'
          value={text}
          onChange={textOnChange}
      />
      <input type='submit' value='Search' className='btn btn-dark btn-block'/>
      {githubContext.users.length > 0 && 
          <button 
          className='btn btn-light btn-block'
          onClick={githubContext.clearUsers}
      >
          Clear
      </button>}
    </form>
  )
}


export default Search