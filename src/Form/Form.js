import React from 'react';
import PropTypes from 'prop-types';

function AddTodo(props) {
  return (
    <form onSubmit={props.submitForm}>
      <textarea onChange={props.changeInput}></textarea>
      <button className="form-submit btn btn-success" type="submit">Добавить запись</button>
    </form>
  );
}

AddTodo.propTypes = {
  submitForm: PropTypes.func.isRequired,
  changeInput: PropTypes.func.isRequired,
}

export default AddTodo;
