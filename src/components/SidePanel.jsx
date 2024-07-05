import React from 'react'
import './SidePanel.css'
export default function SidePanel({qoutes}) {
  return (
    <div className='sidepanel'>{qoutes.map(qoute=>{
      return <div className='singleQuote' key={qoute}>{qoute}</div>
    })}</div>
  )
}
