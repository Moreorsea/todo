import React from 'react';
import PropTypes from 'prop-types';

function Pagination(props) {
  const pageLimit = props.pageLimit;
  const pageCounter = Math.ceil(props.data.length/pageLimit)
  let pageNumber = []

  for(let i = 1; i <= pageCounter; i++) {
    pageNumber.push(i)
  }

  return (
    <ul className="pagination">
      {
        pageNumber.map(item => {
          return <li key={item} id={item} onClick={() => {props.getCurrentPageNumber(item)}}>{item}</li>
        })
      }
    </ul>
  )
}

Pagination.propTypes = {
  pageLimit: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ),
  getCurrentPageNumber: PropTypes.func,
}

export default Pagination;
