import React from 'react';
import PropTypes from 'prop-types';

import './Repositories.css';
import Repository from './Repository';
import Repository_List_Is_Empty from '../repository_list_is_empty.svg'

import ReactPaginate from 'react-paginate';


class Repositories extends React.PureComponent {

  static propTypes = {
    list_repos: PropTypes.array.isRequired,
    public_repos: PropTypes.number.isRequired,
    cbloadUserRepos: PropTypes.func.isRequired,   
  };

  

  state = {    
    pageCount: Math.ceil(this.props.list_repos.length / 4),
    offset: 0,
    currentPage: 0,
    githubpage:1
  }

  componentDidUpdate(prevProps) {    
    if (this.props.list_repos !== prevProps.list_repos) {
      this.setState({pageCount: Math.ceil(this.props.list_repos.length / 4)});
    }
  }
 

  handlePageClick = (e) => {   
    this.setState({currentPage: e.selected}); 

    if((e.selected + 1) === this.state.pageCount ){    
      
      this.props.cbloadUserRepos(this.state.githubpage + 1);
      this.setState({githubpage: this.state.githubpage + 1});
      
    }
  }

  render() {    
      
      if(this.props.list_repos.length === 0) {
        return (
          <div className='Repositories'>
            <div className='wrapper'>
            <img src={Repository_List_Is_Empty} alt="Repository_List_Is_Empty" className = 'EmptyRepositoryListIcon' /> 
            <p className = 'EmptyRepositoryListText'>Repository list is empty</p>
            
            </div>
          </div>
        )
        ;
      } else {
        let offset = this.state.currentPage * 4;
        let currentPageData = this.props.list_repos.slice(offset, offset + 4).map(r => <Repository key={r.id} reposname = {r.name} describe = {r.description} html_url = {r.html_url} />) 
      
        

        return (
          <div className='Repositories'>
            <div className='wrapper'>
              <h2 className='number'>Repositories ({this.props.public_repos})</h2>
    
              <div>
              {currentPageData}
              </div>

              <div className = 'Paginate'>
              <div className='NumberItems'>{offset+1}-{offset+currentPageData.length} of {this.props.list_repos.length} items</div>

              <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={'...'}               
                pageCount={this.state.pageCount}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                onPageChange={this.handlePageClick}
                containerClassName={'pagination'}                
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
              />

             </div>
            
            </div>
          </div>
        )
        ;

      }

  }

}



export default Repositories;

