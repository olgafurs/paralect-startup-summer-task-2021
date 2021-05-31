import React from 'react';
import PropTypes from 'prop-types';

import './UserCard.css';
import icon_follower from '../group_24px.svg'
import icon_following from '../person_24px.svg'

class UserCard extends React.PureComponent {

  static propTypes = {    
    // key: PropTypes.number.isRequired,
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string,
    login: PropTypes.string.isRequired,
    followers: PropTypes.number.isRequired,
    following: PropTypes.number.isRequired,
    html_url: PropTypes.string.isRequired,
   
  };

  

  render() {   
    
    return (
      <div className='UserCard'>
        <div className='wrapper'>
        <img src = {this.props.avatar} alt={this.props.avatar} className='avatar' />
        {
          this.props.name 
          ? <a href={this.props.html_url} className='name' target="_blank" >{this.props.name}</a>
          : <a href={this.props.html_url} className='name' target="_blank" >no name</a>
        }
        <p className = 'login'>{this.props.login}</p>
        <div className='followersFollowing'>
        <p className = 'followers'> <img src={icon_follower} alt={icon_follower}></img> {this.props.followers > 1000 ? Math.ceil(this.props.followers/1000) + 'k ' :  this.props.followers } followers</p>
        <p className = 'following'> <img src={icon_following} alt={icon_following}></img> {this.props.following > 1000 ? Math.ceil(this.props.following/1000) + 'k ' :  this.props.following } following</p>

        </div>

       
        </div>
      </div>
    )
    ;

  }

}



export default UserCard;