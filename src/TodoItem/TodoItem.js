import React from 'react';
import PropTypes from 'prop-types';

function TodoItem(props) {
  let cls = ['block']

  if(props.item.completed === true) {
    cls.push('crossed')
  }
  return (
    <div className={cls.join(' ')}>
      <input id={props.item.id} type="checkbox" checked={props.item.completed} onChange={() => props.toggleCheckbox(props.item.id)}/>
      <label htmlFor={props.item.id}>{props.item.title}</label>
      <span onClick={() => props.deleteTodo(props.item.id)} className="close">
      <svg
        aria-hidden="true"
        focusable="false"
        className="Toggle__icon Toggle__icon--cross"
        width="13"
        height="13"
        viewBox="0 0 13 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.167 0L6.5 4.667L1.833 0L0 1.833L4.667 6.5L0 11.167L1.833 13L6.5 8.333L11.167 13L13 11.167L8.333 6.5L13 1.833L11.167 0Z"
        fill="currentcolor"/>
    </svg>
    </span>
    </div>
  )
}

TodoItem.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ),
  item: PropTypes.shape({
    completed: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }),
  getCurrentPageNumber: PropTypes.func,
  toggleCheckbox: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
}

export default TodoItem;
