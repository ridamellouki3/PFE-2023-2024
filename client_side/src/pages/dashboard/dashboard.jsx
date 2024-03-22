import React from 'react'
import Client from './Client'
import Manager from './Manager'
import ServiceProvider from './ServiceProvider'

export default function dashboard() {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));


  return (
    <div>

           {currentUser.role =='Manager' &&(
            <Manager/>
        )}
        {currentUser.role =='Service Provider' &&(
            <ServiceProvider/>
        )}
        {currentUser.role =='Client' &&(
            <Client/>
        )}
        
    </div>
  )
}
