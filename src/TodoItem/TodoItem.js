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
      <span onClick={() => props.deleteTodo(props.item.id)} className="close">Удалить заметку</span>
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
