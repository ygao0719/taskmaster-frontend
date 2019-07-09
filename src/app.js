import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './app.scss';
import mockData from './mock.json';


// console.log(mockData);
const API = 'http://taskmaster.us-west-2.elasticbeanstalk.com/tasks';

function Tasks(){
    const [task, setTask] = useState([]);
    
    const _getTask = () =>{
      // setTask(mockData)
      fetch ( API , {
        mode:'cors',
      })
      .then(data => data.json())
      .then(tasksfromAPI => setTask(tasksfromAPI))
      .catch(console.error);
    };

   useEffect(_getTask,[]);

   return(
     <ul>
       {task.map( (oneTask) => 
          <li key={oneTask.id}>

            <details>
              <summary>
                <span>{oneTask.title}</span>
                <span>{oneTask.status}</span>
                <span>{oneTask.assignee}</span>
                
                <form action={API+"/"+oneTask.id +"/images" } method="post" encType="multipart/form-data">
                  <label >
                    <input type="file" name="file" />
                  </label>
                  <button>Submit the form</button>
                </form>
              
              </summary>
              {oneTask.description}
              <img src={oneTask.pic} />
            </details>
          </li>
      
       )}
     </ul>
   );
     
}
function App() {
  return (
    <>
        <header> Task Master </header>
        <main> 
          <Tasks/>
        </main>
        <footer>&copy; 2019 Yuan </footer>
    </>
  );
}

export default App;
