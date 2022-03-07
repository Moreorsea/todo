import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';

function AddTodo(props) {
  return (
    <form onSubmit={props.submitForm}>
      <TextareaAutosize minRows={3} onChange={props.changeInput} name="text"></TextareaAutosize>
      <Button type="submit" variant="contained" color="success">Добавить запись</Button>
    </form>
  );
}

AddTodo.propTypes = {
  submitForm: PropTypes.func.isRequired,
  changeInput: PropTypes.func.isRequired,
}

export default AddTodo;
