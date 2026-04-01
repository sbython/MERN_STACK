import {useState} from "react"
import {useNavigate} from "react-router-dom"

const login = async (email, password, navigater) =>{
    const url = "http://localhost:3000/api/login"
    try
    {
      const res = await fetch(url,{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
      })
      if(!res.ok)
          throw new Error(`Respond statud: ${res.status}`)
      const data = await res.json()
      if (data.token)
      {
        localStorage.setItem("token", data.token)
        navigater("/home")
      }
      else
        throw new Error("token did not set!!!")
    }
    catch (err)
    {
        console.log(`error in fetch data ${err}`)
    }
}

const Input  = () => {

  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  let navigiter = useNavigate()
  const handlEmail = (event) => {
    setEmail(event.target.value)
  }
  const handlPassword = (event) => {
    setPassword(event.target.value)
  }
  const inputHandler = (event) => {
    event.preventDefault();
    login(email, password, navigiter)
  }

  return (
    <form onSubmit={inputHandler} className="flex flex-col " >
      <input type="emial" name="email" placeholder="email"
        onChange= {handlEmail}
        className="border border-gray-300 rounded-md p-2 w-full
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        transition duration-150 ease-in-out"/>

      <input type="password" name="password" placeholder="password"
      onChange= {handlPassword}
      className="
        border border-gray-300 rounded-md p-2 w-full
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        transition duration-150 ease-in-out"/>
      <button type="submit"
        className="m-10 relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-heading rounded-base group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
      > submit</button>
    </form>
  )

}

export default Input
