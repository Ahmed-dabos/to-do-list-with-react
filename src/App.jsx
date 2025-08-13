import Header from "./components/Header";
import MainForm from "./components/MainForm";
import TasksList from "./components/TasksList";
import { useState, useEffect } from "react";
function App() {
  const [tasks, setTasks] = useState([]);

  function toggleDone(id, completed) {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        } else {
          return task;
        }
      })
    );
    fetch(`https://689c588f58a27b18087dcde8.mockapi.io/api/v1/tasks/${id}`, {
      method: "put",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ completed: !completed }),
    });
  }
  function onDelete(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    fetch(`https://689c588f58a27b18087dcde8.mockapi.io/api/v1/tasks/${id}`, {
      method: "Delete",
    });
  }
  function handleForm(formData) {
    const taskData = formData.get("add-task");
    if (taskData) {
      async function getData() {
        const response = await fetch(
          "https://689c588f58a27b18087dcde8.mockapi.io/api/v1/tasks",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              title: taskData,
              completed: false,
            }),
          }
        );
        const data = await response.json();
        setTasks((prevTasks) => [...prevTasks, data]);
      }
      getData();
    }
  }

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "https://689c588f58a27b18087dcde8.mockapi.io/api/v1/tasks"
      );
      const data = await response.json();
      if (data.length !== 0) {
        setTasks(data);
      }
    }
    getData();
  }, []);

  return (
    <main>
      <Header />
      <MainForm handleForm={handleForm} />
      <TasksList tasks={tasks} onDelete={onDelete} onDone={toggleDone} />
    </main>
  );
}
export default App;
