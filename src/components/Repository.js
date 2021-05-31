import React from 'react';
import PropTypes from 'prop-types';

import './Repository.css';


class Repository extends React.PureComponent {

  static propTypes = {  
    reposname: PropTypes.string.isRequired,
    describe:PropTypes.string,
    html_url:PropTypes.string.isRequired,   
  };

  

  render() {
    return (
      <div className='Repository'>
        <div className='wrapper'>          
          <a href={this.props.html_url} className='name' target='_blank'>{this.props.reposname}</a>
          <p className='describe'>{this.props.describe}</p>
        </div>
      </div>
    )
    ;

  }

}



export default Repository;