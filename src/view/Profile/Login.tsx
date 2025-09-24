import React, { useState } from "react"
import { initLoginVal } from "./static"

export const Login = () => {
  const [formVal, setFormVal] = useState(initLoginVal)

  const handleSubmit = () => { }
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value } = e.target

    setFormVal((prev) => {
      return {...prev, [name]: value}
    })
  }

  return (
    <div className="w-full bg-blue-300 h-full border-2">
      <div className="flex justify-center items-center ">
        <div className="w-[300px] h-[300px] border-2">
          <form onSubmit={handleSubmit}>
            <div> 
              <label> Enter Email</label>
              <input 
                type="email" 
                name= "email"
                placeholder="Enter your email here.." 
                value={formVal.email}
                onChange={handleChange}
              />
            </div>
            <div> 
              <label> Enter Password</label>
              <input 
                type="password" 
                name= "password"
                placeholder="Enter your password here.." 
                value={formVal.password}
                onChange={handleChange}
              />
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  )
}
