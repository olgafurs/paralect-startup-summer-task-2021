import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './SearchBar.css';
import Vector from '../Vector.svg'
import Start_searching from '../start_searching.svg'
import User_Not_Found from '../user_not_found.svg'
import UserCard from './UserCard';
import Repositories from './Repositories';

class SearchBar extends React.PureComponent {

  constructor(props) {
    super(props);    
  }
  

  state = {
    dataReady: false,    
    username: "",
    dataUser: null,
    dataUserRepos: null,
    loader: null,
    UserNotFound: false,
    page: 1,   
  };

  fetchError = (errorMessage) => {    
    console.error();
    this.setState({
      UserNotFound: true,
      dataReady: false,    
      username: "",
      dataUser: null,
      dataUserRepos: null,
      loader: null,
    })
  };

  fetchUserSuccess = (loadedData) => {    
    this.setState({
      dataReady:true,
      dataUser: loadedData,
      loader: null,
      UserNotFound: false      
    });
  };

  fetchUserReposSuccess = (loadedData) => {    
    this.setState({      
      dataUserRepos: loadedData,
      loader: null  
    });
  };

  fetchUserReposSuccess2 = (loadedData) => {    
    this.setState({     
      dataUserRepos: [...this.state.dataUserRepos, ...loadedData],
      loader: null  
    });
  };

  
  inputText = (e) => {
    this.setState({ username: e.target.value  });
  };

 
  searchUser = (e) => {    
      if (e.key === "Enter") {
        this.setState({ loader:"Загрузка данных"});
        fetch(`https://api.github.com/users/${this.state.username}`)
        .then( response => { 
            if (!response.ok)
                throw new Error("fetch error " + response.status); 
            else
                return response.json(); 
        })
        .then( data => {
            this.fetchUserSuccess(data); 
        })
        .catch( error => {
            this.fetchError(error.message);
        });

        fetch(`https://api.github.com/users/${this.state.username}/repos?per_page=100`)
        .then( response => { 
            if (!response.ok)
                throw new Error("fetch error " + response.status); 
            else
                return response.json(); 
        })
        .then( data => {
            this.fetchUserReposSuccess(data); 
        })
        .catch( error => {
            this.fetchError(error.message);
        })
      
     }
  

  };

  loadUserRepos = (p) => {
    this.setState({ loader:"Загрузка данных"});    
    fetch(`https://api.github.com/users/${this.state.username}/repos?per_page=100&page=${p}`)
        .then( response => { 
            if (!response.ok)
                throw new Error("fetch error " + response.status); 
            else
                return response.json();
        })
        .then( data => {
            this.fetchUserReposSuccess2(data); 
        })
        .catch( error => {
            this.fetchError(error.message);
        })


  }

  render() {
     let user, repositories, list_repos; 
      
    if (this.state.dataUser !== null && this.state.dataUserRepos !== null ){
      user = <UserCard  key={this.state.dataUser.id} avatar={this.state.dataUser.avatar_url} name = {this.state.dataUser.name} login = {this.state.dataUser.login} followers = {this.state.dataUser.followers} following = {this.state.dataUser.following} html_url = {this.state.dataUser.html_url}/>
      repositories = <Repositories public_repos={this.state.dataUser.public_repos} list_repos = {this.state.dataUserRepos} cbloadUserRepos = {this.loadUserRepos} />
     
    }else {
      user =  null;
      repositories = null;
      list_repos= null;
      
    }
    

    return (
      <Fragment>
      <div className='SearchBar'>
        <div className='wrapper'>
        <img src={Vector} alt="logo" className = 'logo' />       
        <input type="text" className = 'searchInput'  onKeyPress = {this.searchUser} onChange = {this.inputText} value = {this.state.username}/>         
        </div>
      </div>

      <div className='Content'>
      {this.state.loader ? <div className="loader"></div> : null}
      {(this.state.dataUser === null && this.state.dataUserRepos === null && this.state.UserNotFound === false ) 
      ? <div className="StartPage">
        <img src={Start_searching} alt="Start_searching" className = 'StartSearchingIcon' /> 
        <p className = 'StartSearchingText'>Start with searching a GitHub user</p>
      </div> 
      : null}

      {(this.state.UserNotFound === true ) 
      ? <div className="UserNotFound">
        <img src={User_Not_Found} alt="User_Not_Found" className = 'UserNotFoundIcon' /> 
        <p className = 'UserNotFoundText'>User not found</p>
       </div> 
      : null}
      
      {user} 
      {repositories}
      </div>
      
      </Fragment>
     
      
    )
    ;

  }

}



export default SearchBar;