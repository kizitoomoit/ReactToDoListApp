import './App.css';
import { useState, useEffect } from "react";
import { Task } from "./Task";
import calendar from './images/calendar.png';
import calendarblue from './images/calendarblue.png';
import clock from './images/clock.png';
import { FaBeer } from "react-icons/fa";

function App() {

const [todoList, setTodoList] = useState([]);
const [newTask, setNewTask] = useState("");
const [dateState, setDateState] = useState(new Date());

useEffect(() => {
  setInterval(() => setDateState(new Date()), 30000);
}, []);


  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleKeyDown = (event)  => {
    if (event.keyCode === 13){
      addTask();
      
    }
  }
  const addTask = () => {
    
    const task = {
      // check if the id is 0 and change it to 1 else - 1 from the current id
      id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
      taskName: newTask,
      completed: false,
    };
    //checks and prevents the app from adding empty todo list to the array
    setTodoList(task.taskName !== ""? [...todoList, task] : todoList);
    }

    const deleteTask = (id) => {
      //use array.filter to delete a task if it is matched
      const newTodoList = todoList.filter((task) => task.id !== id);
      setTodoList(newTodoList)
    }

    const completeTask = (id) => {
      setTodoList(
        todoList.map((task) => {
        if (task.id === id) {
          return {...task, completed: true};

        } else {
          return task;
        }
      })
      );
    };

  return (
  <div className="App">
    <div className="addTask">
      <input placeholder="Write your task here..." onKeyDown={handleKeyDown} onChange={handleChange} />
      
      <button onClick={addTask}>Add Task</button>
    </div>

    <div className="clockncalendar">
    <div className="time">

      <div>
      <h6>
        <img src={calendar} alt="Calendar" />
      </h6>
      </div>

      <div>
      <h1>{dateState.toLocaleDateString('en-GB',{
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })}
        </h1>

      </div>
    </div> 

     <div className="time">
      <div>
      <h6>
      <img src={clock} alt="clock icon"/>
      </h6>
      </div>

      <div>
      <h1> {dateState.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        seconds: 'numeric',
        hour12: true,

      })}</h1>
      </div>
      </div> 



    </div>

    <div className="list">
      <div>
        {todoList.map((task) => {
          return ( 
          <Task 
          taskName={task.taskName}  
          id={task.id} 
          completed={task.completed} 
          deleteTask={deleteTask} 
          completeTask={completeTask}/> 
          );
        })}
      </div>

    </div>
    </div>
  );
}

export default App;
