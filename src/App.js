// src/App.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from './tasksSlice';
import { Provider } from 'react-redux';
import store from './store';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.items);
  const taskStatus = useSelector((state) => state.tasks.status);
  const error = useSelector((state) => state.tasks.error);

  useEffect(() => {
    if (taskStatus === 'idle') {
      dispatch(fetchTasks());
    }
  }, [taskStatus, dispatch]);

  if (taskStatus === 'loading') {
    return <div>Загрузка...</div>;
  }

  if (taskStatus === 'failed') {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.title} {task.completed ? '(Выполнено)' : '(Не выполнено)'}
        </li>
      ))}
    </ul>
  );
};

const App = () => (
  <Provider store={store}>
    <TaskList />
  </Provider>
);

export default App;
