function TasksList(props) {
    const tasksListItems = props.tasks.map(task => {
        return (
            <div key={task.id} className={task.completed? "task done" : "task"} >
                <span>{task.title}</span>
                <div>
                <button onClick={() => props.onDone(task.id,task.completed)} className="done">{task.completed? "undone" : "done"}</button>
                <button onClick={() =>props.onDelete(task.id)}className="delete">delete</button>
                </div>
            </div>
        )
    })
    return(
        <section className="tasks-container">
            {tasksListItems}
        </section>
    )
}
export default TasksList


