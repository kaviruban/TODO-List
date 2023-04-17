import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");

  const [tasks, setTasks] = useState([]);

  function HandleClick(event) {
    setInput(event.target.value);

    console.log(event.target.value);
  }

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskName, setEditingTaskName] = useState("");

  const addTask = () => {
    setTasks([...tasks, { id: Date.now(), name: input }]);
    setInput("");
  };

  const updateTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingTaskId ? { ...task, name: editingTaskName } : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
    setEditingTaskName("");
  };

  return (
    <div className="Add-Button">
      <>
        <h1 className="Header">TO DO LIST APP</h1>
      </>

      <div className="Box">
        <div className="Box1">
          <input
            className="input-box"
            value={editingTaskId !== null ? editingTaskName : input}
            type="text"
            placeholder="Add a task"
            onChange={(e) =>
              editingTaskId !== null
                ? setEditingTaskName(e.target.value)
                : setInput(e.target.value)
            }
          />

          <button
            className="Add-task-Button"
            onClick={editingTaskId !== null ? updateTask : addTask}
          >
            {editingTaskId !== null ? "Save" : "Add"}
            
          </button>
        </div>
        <div className="Box2">
          
          {tasks.map((task) => (
            <div key={task.id}>
              {editingTaskId === task.id ? (
                <input
                  value={editingTaskName}
                  onChange={(e) => setEditingTaskName(e.target.value)}
                />
              ) : (
                <h2>{task.name}</h2>
              )}
                <button
                  className="delete-button"
                  onClick={() =>
                    setTasks(tasks.filter((a) => a.id !== task.id))
                  }
                >
                  Delete
                </button>

                {editingTaskId === task.id ? (
                  <button className="update-button" onClick={() => updateTask()}>
                    Save
                  </button>
                ) : (
                  <button
                    className="update-button"
                    onClick={() => {
                      setEditingTaskId(task.id);
                      setEditingTaskName(task.name);
                    }}
                  >
                    Edit
                  </button>
              )}
              </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;