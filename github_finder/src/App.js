import React, { Component, Fragment } from 'react';
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import './App.css'
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
class App extends Component{
  state = {
    users:[],
    user:{},
    repos:[],
    loading:false,
    alert:null,
  }
  async componentDidMount(){
    this.setState({loading:true})
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({loading:false, users:res.data})
  }
  searchUsers = async (text)=>{
    this.setState({loading:true})  
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({loading:false, users:res.data.items})
  }
  clearUsers = async (e)=>{
    e.preventDefault()
    this.setState({loading:false, users:[]})
  }
  getUser = async (username)=>{
    this.setState({loading:true})
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({loading:false, user:res.data})
  }
  setAlert = (msg, type) => {
    this.setState({alert:{msg, type}})
    setTimeout(() => {
      this.setState({alert:null})
    }, 3000);
  }
  getUserRepos = async (username)=>{
    this.setState({loading:true})
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    console.log(res.data)
    this.setState({repos:res.data, loading:false})
  }

  render(){
    const {users, user, repos, loading, alert} = this.state
    return(
      <div className='App'>
        <Navbar/>
        <div className='container'>
          <Alert alert={alert}/>
          <Routes>
            <Route path='/' element={<Fragment>
              <Search 
                searchUsers={this.searchUsers} 
                clearUsers={this.clearUsers} 
                showClear={users.length > 0 ? true:false}
                setAlert={this.setAlert}
              />
              <Users loading={loading} users={users}/>
            </Fragment>}/>
            <Route path='/about' element={<Fragment>
              <About/>
            </Fragment>}/>
            <Route path='/user/:login' element={<Fragment>
              <User 
                getUser={this.getUser}
                getUserRepos={this.getUserRepos} 
                user={user}
                repos={repos} 
                loading={loading}
              />
            </Fragment>} />
          </Routes>
        </div>
      </div>
    )
  }
}

export default App;
