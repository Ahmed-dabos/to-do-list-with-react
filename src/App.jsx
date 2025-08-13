import Header from "./components/Header";
import MainForm from "./components/MainForm";
import TasksList from "./components/TasksList";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
function App() {
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem("userId", userId);
    }
    setUserId(userId);
  }, []);

  useEffect(() => {
    if (!userId) return;
    const url = new URL(
      "https://689c588f58a27b18087dcde8.mockapi.io/api/v1/tasks"
    );
    url.searchParams.set("userId", userId);
    async function getData() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
        const data = await response.json();
        if (data.length !== 0) {
          setTasks(data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [userId]);

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
              userId: userId
            }),
          }
        );
        const data = await response.json();
        setTasks((prevTasks) => [...prevTasks, data]);
      }
      getData();
    }
  }

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
  return (
    <main>
      <Header />
      <MainForm handleForm={handleForm} />
      <TasksList tasks={tasks} onDelete={onDelete} onDone={toggleDone} />
    </main>
  );
}
export default App;
