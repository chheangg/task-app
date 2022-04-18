/* eslint-disable no-useless-constructor */
import React from 'react';

function Utility(props) {
  const {task, editTask} = props;
  return (
  <div className='utility'>
    {task.editing ? <button className='confirm' onClick={task.confirm} data-key={task.index}>O
    </button> : <button className='edit' onClick={editTask} data-key={task.index}>O</button>}
    <button className='delete' onClick={task.removeBtn} data-key={task.index}>X</button>
  </div>
  )
}

class TaskBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {task} = this.props;
    return (
        <div data-key={task.index} className='task-box'>
          {task.editing ? <input data-key={task.index} className='input-box' defaultValue={task.text} /> : <p data-key={task.index} className='text'>{task.index}. {task.text}</p>} 
          <Utility editTask={task.edit} task={task}/>
        </div>
    )
  }
}

class TaskContainer extends React.Component {
  constructor(props) {
    super(props);
    this.listRender = this.listRender.bind(this);
  }

  listRender(arr) {
    let boxes = arr.map((box) => {
      return <TaskBox key={box.index} task={box}/>
    })
    return boxes;
  }

  render() {
    return (
      <div className='task-container'>
        <h1>Tasks:</h1>
        <div className='task-list'>
          {this.listRender(this.props.tasks)}
        </div>
      </div>
    )
  }
}

export { TaskContainer };
