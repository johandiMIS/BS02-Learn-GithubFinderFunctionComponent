import React, { Component } from 'react'
import PropTypes from 'prop-types'
export class Search extends Component {
  state={
    text:''
  }

  onSubmit= (e) =>{
    e.preventDefault();
    if(this.state.text===''){
        this.props.setAlert('Please Enter Something', 'light')
    }
    else{
        this.props.searchUsers(this.state.text)
    }
  }

  textOnChange = (e)=>{
    this.setState({[e.target.name]:e.target.value})
  }

  render() {
    const { clearUsers, showClear} = this.props
    const {text} = this.state
    return (
      <form onSubmit={this.onSubmit} className='form '>
        <input 
            type='text' 
            name='text' 
            placeholder='Search Users...'
            value={text}
            onChange={this.textOnChange}
        />
        <input type='submit' value='Search' className='btn btn-dark btn-block'/>
        {showClear && 
            <button 
            className='btn btn-light btn-block'
            onClick={clearUsers}
        >
            Clear
        </button>}
      </form>
    )
  }
}
Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
}
export default Search