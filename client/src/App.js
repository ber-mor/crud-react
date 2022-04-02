import './App.css';
import { useState } from "react";
import { useEffect } from "react";
import Axios from 'axios';

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [employeeList, setEmployeeList] = useState([])
  const [newWage, setNewWage] = useState(0)

  useEffect(()=>{
    getEmployees()
  })

  const addEmployee = () =>{
    const URL = "http://localhost:3001/new"
    const body = {
      name: name, 
      age: age, 
      country: country,
      position: position,
      wage: wage
    }
    Axios.post(URL, body)
    .then(() => {
      getEmployees()
    })
    .catch(error => {console.log(error)})
  };

  const getEmployees = () =>{
    const URL = "http://localhost:3001/get"
    Axios.get(URL)
    .then(response => {setEmployeeList(response.data)})
    .catch(error => {console.log(error)})
  }

  const updateEmployeeWage = (id) =>{
    const URL = "http://localhost:3001/update"
    Axios.put(URL, {wage: newWage, id: id})
    .then(response => {
      alert('updated')
      setEmployeeList(employeeList.map((val)=>
        val.id === id ? {...val, wage: newWage} : val
      ))
    })
    .catch(error => {throw error})
  }

  const deleteEmployee = (id) => {
    const URL = `http://localhost:3001/delete/${id}`
    Axios.delete(URL).then(response=>{
      setEmployeeList(employeeList.filter((val)=>{
        return id !== val.id
      }))
    })
  }
  
  return (
    <div className="App">
      <div className="form">
        <label>Name: </label>
        <input type="text" onChange={(event => setName(event.target.value))}/>
        <label >Age: </label>
        <input type="number" onChange={(event => setAge(event.target.value))}/>
        <label >Country: </label>
        <input type="text" onChange={(event => setCountry(event.target.value))}/>
        <label >Position: </label>
        <input type="text" onChange={(event => setPosition(event.target.value))}/>
        <label >Wage: </label>
        <input type="number" onChange={(event => setWage(event.target.value))}/>
        <button onClick={addEmployee}>Add to Database</button>
        {/* <button onClick={getEmployees}>Show Data</button> */}
      </div>
           
      <div className="table-container">
        <table className="employees-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Country</th>
              <th>Position</th>
              <th>Wage</th>
            </tr>
          </thead>
          <tbody>
          { 
            employeeList.map((val,key)=>{ return <tr key={val.id}>
                <td>{val.name}</td>
                <td>{val.age}</td>
                <td>{val.country}</td>
                <td>{val.position}</td>
                <td>{val.wage}</td>
                <td className="edit">
                  <input onChange={(event => setNewWage(event.target.value))} className="table-input" type="number" />
                  <button onClick={() => updateEmployeeWage(val.id)}>Update Wage</button>
                  <button onClick={() => deleteEmployee(val.id)}>Delete</button>
                </td>
              </tr>
            })
          }
          </tbody>
        </table>          
      </div>
    </div>
  );
}

export default App;
