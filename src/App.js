import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/useHttp';

function App() {
  const [tasks, setTasks] = useState([]);
  const url = 'https://react-http-33244-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json';

  
  const {isLoading, error, sendRequest: fetchTasks} = useHttp();

  useEffect(() => {
	const transformTask = (task) => {
		const loadedTasks = [];
	
		for (const taskKey in task){
		  loadedTasks.push({id: taskKey, text: task[taskKey].text});
		}
		setTasks(loadedTasks)
	  };

    fetchTasks({url:url},
		transformTask);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
