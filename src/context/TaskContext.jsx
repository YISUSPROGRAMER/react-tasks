import { createContext, useState, useEffect } from "react";
import { tasks as data } from "../tasks";

export const TaskContext = createContext();

export function TaskContextProvider(props) {
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    setTasks(data);
  }, []);

  function createTask(task) {
    const generatedId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 0;
    const newTask = {
      title: task.title,
      id: generatedId,
      description: task.description,
    };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <TaskContext.Provider value={{ tasks, setTasks, createTask, deleteTask }}>
      {props.children}
    </TaskContext.Provider>
  );
}
