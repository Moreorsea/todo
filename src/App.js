import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './App.css';
import TodoItem from './TodoItem/TodoItem';
import AddTodo from './Form/Form';
import Pagination from './Pagination/Pagination';
import Switch from './Switch/Switch';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      currentPageTodos: [],
      currentPage: 1,
      loading: false,
      pageLimit: 6,
      form: {
        text: ''
      },
      isDarkTheme: false,
      status: 'Идет загрузка...'
    }

    this.toggleCheckbox = this.toggleCheckbox.bind(this)
    this.getCurrentTodos = this.getCurrentTodos.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.changeInput = this.changeInput.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
    this.updateTodo = this.updateTodo.bind(this)
    this.getCurrentPageNumber = this.getCurrentPageNumber.bind(this)
    this.isFailed = this.isFailed.bind(this)
    this.isSuccess = this.isSuccess.bind(this)
    this.choiceTheme = this.choiceTheme.bind(this)
  }

  isFailed() {
    this.setState({
      status: 'Произошла ошибка. Пожалуйста, проверьте ваше интернет-соединение.'
    })
  }

  isSuccess() {
    this.setState({
      status: ''
    })
  }

  getCurrentTodos(startIndex) {
      let data = this.state.data.slice(0)
      let todosList = data.splice(startIndex, this.state.pageLimit)

      this.setState({
        currentPageTodos: todosList
      })
  }

  getCurrentPageNumber(id) {
    let pageLimit = this.state.pageLimit;
    let startIndex = (id - 1) * pageLimit;

    this.setState({
      currentPage: id
    })
    this.getCurrentTodos(startIndex)
  }

  componentDidMount() {
    this.setState({loading: true})
    return axios({
      method: "get",
      url: `https://dselyanina.pythonanywhere.com/api/todos/`,
    }).then(res => {
      let dataList = res.data.results

      this.setState({
          data: dataList,
          loading: false
      })
        this.getCurrentTodos(this.state.data, 0)
        this.isSuccess()
      }).catch(error => {
        this.isFailed(error)
      })
  }

  toggleCheckbox(id) {
    this.setState(prev => {
      let dataList = prev.data.map(item => {
        if(item.id === id) {

          item.completed = !item.completed
        }
        return item
      })

      return {
        data: dataList
      }
    })
  }

  updateTodo() {
    return axios({
      method: "get",
      url: `https://dselyanina.pythonanywhere.com/api/todos/`,
    }).then(res => {
      let dataList = res.data.results
      this.setState({
        data: dataList
      })
      this.getCurrentTodos(dataList, this.state.currentPage)
      this.isSuccess()
    }).catch(() => {
      this.isFailed()
    })
  }

  deleteTodo(id) {
    return axios({
      method: "delete",
      url: `https://dselyanina.pythonanywhere.com/api/todos/${id}/`,
    }).then(() => {
      this.updateTodo()
    }).catch(() => {
      this.isFailed()
    })
  }

  changeInput(e) {
    this.setState({
      form: {
        text: e.target.value
      }
    })
  }

  submitForm(e) {
    e.preventDefault()
    if(this.state.form.text === '') return;

    let el = {
      completed: false,
      title: this.state.form.text,
    }
    axios({
      method: "post",
      url: 'https://dselyanina.pythonanywhere.com/api/todos/',
      data: el
    }).then(res => {
      if(res.status === 201) {
        this.setState({
          form: {
            text: ''
          }
        })
        this.updateTodo()
      }
    }).catch(() => {
      this.isFailed()
    })

    e.target.reset()
  }

  choiceTheme() {
    this.setState({isDarkTheme: !this.state.isDarkTheme})
  }

  render() {
    return (
      <div className={'center ' + (this.state.isDarkTheme ? 'dark' : ' ')}>
        <div className="cetner-wrapper">
        <Switch isDarkTheme={this.state.isDarkTheme} choiceTheme={this.choiceTheme} />

        <AddTodo submitForm={this.submitForm} changeInput={this.changeInput} />
        {
          this.state.loading ? <p>{this.state.status}</p> : null
        }
        {
          this.state.currentPageTodos.map((item, index) => {
            return (
              <TodoItem key={index} item={item} toggleCheckbox={this.toggleCheckbox} deleteTodo={this.deleteTodo}/>
            )
          })
        }

        <Pagination
            data={this.state.data}
            getCurrentPageNumber={this.getCurrentPageNumber}
            pageLimit={this.state.pageLimit}
        />
        </div>
      </div>
    )
  }
}

App.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ),
  currentPageTodos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ),
  currentPage: PropTypes.number,
  loading: PropTypes.bool,
  pageLimit: PropTypes.number,
  form: PropTypes.shape({
    text: PropTypes.string
  }),
  status: PropTypes.string
}

export default App;
