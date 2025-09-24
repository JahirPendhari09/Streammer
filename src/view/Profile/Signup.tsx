import React, { useState } from "react"
import { initSingupVal } from "./static"


export const Signup = () => {
  const [formVal, setFormVal] = useState(initSingupVal)

  const handleSubmit = () => {}
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target

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
              <label> Enter First Name</label>
              <input 
                type="string" 
                name= "firstName"
                placeholder="Enter your first name here.." 
                value={formVal.firstName}
                onChange={handleChange}
              />
            </div>
            <div> 
              <label> Enter Last name</label>
              <input 
                type="strung" 
                name= "lastName"
                placeholder="Enter your last name here.." 
                value={formVal.lastName}
                onChange={handleChange}
              />
            </div>
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
