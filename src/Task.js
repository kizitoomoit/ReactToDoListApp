export const Task = (props) => {
    return (
        <div className="task" 
             style={{ backgroundColor: props.completed ? "green" : "white", color: props.complted ? "white" : "black"}}>

            <h1 style={{color: props.completed ? "white" : "black"}}>{props.taskName}</h1>
            <div className="taskbtns">

            <button  className="completebtn" onClick={() => props.completeTask(props.id)}>{props.completed ? "Completed" : "Complete"}</button>
            <button  className="deletebtn" onClick={() => props.deleteTask(props.id)}> X </button>

            </div>
        </div>
    );
};