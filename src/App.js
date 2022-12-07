import { useEffect, useState } from 'react';
import './App.css';


function App() {
  const [users, setUsers] = useState({});
  const [displayUsers, setDisplayUsers] = useState([]);
  const handalSubmit = (e) =>{
    e.preventDefault();

  }
  const handalBlur = (e)=>{
    const field = e.target.name;
    const value = e.target.value;
    const newUser = {...users};
    newUser[field] = value;
    setUsers(newUser)
  }
  //get data
  useEffect(()=>{
    fetch("http://localhost:5000/users")
    .then(res => res.json())
    .then(data => setDisplayUsers(data))
    .catch(err => console.error(err))
  },[])
  useEffect(() => {
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(users),
    })
      .then((res) => res.json())
      .catch((data) => setUsers(data));
  }, [users]);
  const handalDelete =(users)=>{
    console.log(users._id);
    const agreed = window.confirm("Are you sure to delete ?");
    if(agreed){
      fetch(`http://localhost:5000/users/${users._id}`, {
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(data => {
        if(data.deletedCount){
          alert('Successfully Deleted')
          const remaning = displayUsers.filter(usr => usr._id !== users._id);
          setDisplayUsers(remaning)
        }
      })

    }
  }
  return (
    <div className="App">
      <h2>Add a user: </h2>
      <form onSubmit={handalSubmit}>
        <input
          onBlur={handalBlur}
          type="text"
          name="name"
          id=""
          placeholder="Enter Your Name"
          required
        />
        <br />
        <input
          onBlur={handalBlur}
          type="email"
          name="email"
          id=""
          placeholder="Enter Your Email"
          required
        />
        <br />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default App;
