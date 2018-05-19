import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class HelloComponent extends React.Component{
  render(){
    return (
      <div>hello world</div>
    )
  }
 }

 ReactDOM.render(
   <HelloComponent/>,document.getElementById('root')
 )