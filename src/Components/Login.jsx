import React, { useState,useEffect } from "react";
import Navbar from "./Navbar";
import "./Login.css"

function Login() {
  const [contact, setContact] = useState({
    fName: "",
    lName: "",
    email: "",
    password:""
  });
  

  useEffect(()=>{
    fetch('/app').then(response=>{
      if(response.ok)
      {
        return response.json()
      }
    }).then(data=>console.log(data))
  },[])

  /*
  const handleformsumbit= ()=>{
    fetch("/app/create",{
      method:'POST',
      body: JSON.stringify(
        {
          firstname:contact.fName,
          lastname:contact.lName,
          email:contact.email,
          password:contact.password
        }
      ),
      headers:{
        "content-type":"application/json"
      }
      
    }).then(response=>response.json())
     .then(message=>console.log(message))
  }
  */
   
  const handleformsumbit = async()=>{
        
      const response= await fetch("/app/create" ,{
        method:'POST',
        body: JSON.stringify(
          {
            firstname:contact.fName,
            lastname:contact.lName,
            email:contact.email,
            password:contact.password
          }
        ),
        headers:{
          "content-type":"application/json"
        }
      });

      const data= await response.json();
      console.log(data['201']);
      
      if(response.ok)
      {
        console.log("response worked");
      }

  }

  function handleChange(event) {
    const { name, value } = event.target;

    setContact(prevValue => {
      if (name === "fName") {
        return {
          fName: value,
          lName: prevValue.lName,
          email: prevValue.email,
          password :prevValue.password
        };
      } else if (name === "lName") {
        return {
          fName: prevValue.fName,
          lName: value,
          email: prevValue.email,
          password :prevValue.password
        };
      } else if (name === "email") {
        return {
          fName: prevValue.fName,
          lName: prevValue.lName,
          email: value,
          password :prevValue.password
        }
      }
        else if(name==="password")
        {
          return{
          fName: prevValue.fName,
          lName: prevValue.lName,
          email: prevValue.email,
          password :value
        }
      };
    });
  }

  return (
    <div>
      <Navbar/>
      <div className="container3">
      <p className="loginh1"><span>LOGIN</span></p>
      <h1>
        Hello {contact.fName} {contact.lName}
      </h1>
      <p>{contact.email}</p>
      <form onSubmit={handleformsumbit}>
        <input
          onChange={handleChange}
          value={contact.fName}
          name="fName"
          placeholder="First Name"
        />
        <input
          onChange={handleChange}
          value={contact.lName}
          name="lName"
          placeholder="Last Name"
        />
        <input
          onChange={handleChange}
          value={contact.email}
          name="email"
          placeholder="Email"
        />
        <input
          onChange={handleChange}
          value={contact.password}
          name="password"
          placeholder="Enter password"
        />
        <button style={{backgroundColor :"#black"}}>Submit</button>
      </form>
    </div>
    </div>
  );
}

export default Login;
