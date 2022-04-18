import { TaskContainer } from './components/Overview';
import uniqId from 'uniqid';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitTask = this.onSubmitTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.edit = this.edit.bind(this);
    this.confirm = this.confirm.bind(this);
    this.state = {
      task: { 
        text: '',
        id: uniqId(),
        index: 1,
        removeBtn: this.removeTask,
        editing: false,
        edit: this.edit,
        confirm: this.confirm,
       },
      tasks: []
    }
  }

  confirm(task) {
    const newText = [...document.getElementsByClassName('input-box')]
      .filter((x) => x.dataset.key === task.target.dataset.key)[0];
    const taskList = this.state.tasks.map((x) => {
      if (x.index === parseInt(task.target.dataset.key, 10)) {
        return {
          text: newText.value,
          id: x.id, 
          edit: x.edit,
          editing: false,
          confirm: x.confirm,
          index: x.index,
          removeBtn: this.removeTask,
        }
      }
      return x;
    })
    console.log(taskList);
    this.setState({
      tasks: taskList,
    })
  }

  edit(task) {
    const taskList = this.state.tasks.map((x) => {
      if (x.index === parseInt(task.target.dataset.key, 10)) {
        return {
          text: x.text,
          id: x.id, 
          edit: x.edit,
          editing: true,
          confirm: x.confirm,
          index: x.index,
          removeBtn: this.removeTask,
        }
      }
      return x;
    })

    this.setState({
      tasks: taskList,
    })
  }

  removeTask(task) {
    this.setState({
      tasks: this.state.tasks.filter((x) => !(x.index === parseInt(task.target.dataset.key, 10))),
    })
  }

  handleChange(input) {
    this.setState({
      task: {
        text: input.target.value,
        id: this.state.task.id,
        index: this.state.task.index,
        editing: false,
        edit: this.edit,
        confirm: this.confirm,
        removeBtn: this.removeTask,
      }
    })
  }

  onSubmitTask(btn) {
    btn.preventDefault()
    this.setState({
      tasks: this.state.tasks.concat(this.state.task),
      task: { 
        text: '', 
        id: uniqId(),
        index: this.state.task.index + 1,
        editing: false,
        edit: this.edit,
        confirm: this.confirm,
        removeBtn: this.removeTask,
      }
    })
    document.getElementById('input').value = '';
  }

  render() {
    const { tasks } = this.state;
    return (
      <div className='main-container'>
        <div className='submit-container'>
          <form onSubmit={this.onSubmitTask}>
            <label htmlFor='input'></label>
            <input type='text' id='input' onChange={this.handleChange}></input>
            <button className='button'>Submit</button>
          </form>
        </div>
        <div className='line'></div>
        <TaskContainer tasks={tasks}/>
      </div>
    )
  }
}

export {App};