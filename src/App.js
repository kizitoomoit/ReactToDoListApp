import './App.css';
import { useState, useEffect } from "react";
import { Task } from "./Task";
import calendarblue from './images/calendarblue.png';
import clock from './images/clock.png';

function App() {

const [todoList, setTodoList] = useState([]);
const [newTask, setNewTask] = useState("");
const [dateState, setDateState] = useState(new Date());
// state to store time
const [time, setTime] = useState(0);

//state to check stopwatch running or not
const [isRunning, setIstRunning] = useState(false);

useEffect(()=> {
  let intervalId;
  if(isRunning) {
    //Setting time from 0 to 1 every 10 milisecond using js setInterval method
    intervalId = setInterval(() => setTime(time + 1), 10);
  }
  return () => clearInterval(intervalId);
}, [isRunning, time]);

//Hour calculation
const hours = Math.floor(time / 3600000);

//Minutes calculation
const minutes = Math.floor((time % 3600000) / 6000);

// Seconds calculation
const seconds = Math.floor((time % 6000) / 100);

// Millisecons calculations
const milliseconds = time % 100;

// method to start and stop timer
const startAndStop = () => {
  setIstRunning(!isRunning);
};

// Method to reset timer back to 0
const reset = () => {
  setTime(0);
};

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

      <div className = "stopwatch-container">
          <h4>H : Min : Sec : Mill</h4>

        <p className ="stopwatch">
          {hours}:{minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}:
          {milliseconds.toString().padStart(2, "0")}
        </p>
        
      <div className ="stopwatch-buttons">
        <button className="stopwatch-button" onClick={startAndStop}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button className="stopwatch-button" onClick={reset}>Reset</button>
      </div>

      </div>
      

    <div className="clockncalendar">
    <div className="time">

      <div>
      <h6>
        <img src={calendarblue} alt="Calendar" />
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
