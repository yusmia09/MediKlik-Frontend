import React, { useState } from 'react'
import { LayoutGroup } from 'framer-motion'

const Card = (props) => {
    const[expanded, setExpanded] = useState(false)

  return (
    <LayoutGroup>
        {
        expanded? (
            'Expanded'
        ):
        <CompactCard param = {props}/>
        }
    </LayoutGroup>
  )
}

//CompactCard
function CompactCard ({param, setExpanded}){
    const Png = param.png;
    return (
        <div className="CompactCard">
            <div className="radialBar">
                Chart
            </div>
            <div className="detail">
                <Png/>
                <span>${param.value}</span>
                <span>Last 24 hours</span>
            </div>
        </div>
    )
}

export default Card
