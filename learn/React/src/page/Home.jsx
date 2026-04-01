import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/Input'


const Home = () => { 
  const [email, setEmail] = useState("")
  const [username, setUser] = useState("")
  const navigater = useNavigate()
  const logout = () => {
      localStorage.removeItem("token")
      navigater("/login")
  }
  useEffect( ()=> {
    ( async ()=> {
      let token = localStorage.getItem("token")
      const url = "http://localhost:3000/api/me"
  
      try{
        const res = await fetch(url, {
          method: "GET",
          headers: {
             "Content-Type": "application/json",
              "authorization" : `Bearer ${token}`
           }
         
        })
        if(!res.ok)
          throw new Error (`fetch erro ${res.ok}`)
        const data = await res.json()
        setUser(data.username)
        setEmail(data.email)
      }
      catch (err){
        console.log(`${err}`)
      }

    })()
  }, [])


  return (
    <div>
        <h1>welcome to you acconent</h1>
          <p>email {email}</p>
          <p>username {username} </p>
      <button onClick={logout} className="text-fg-brand bg-neutral-primary border border-brand hover:bg-brand hover:text-white focus:ring-4 focus:ring-brand-subtle font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"> logout</button>
    </div>
  )
}

export default Home
