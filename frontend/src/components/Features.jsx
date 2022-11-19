import React from 'react'
import data from './FeatureData.js'
import Accordion from 'react-bootstrap/Accordion';

const Features = () => {
  return (
    <div className='my-5'>
    <hr/>
    <div className='features'>
    <h1 className='text-center text-monospace'>About Insurance</h1>
    <Accordion defaultActiveKey="0">
        {data.map((item,idx)=>{
            return <Accordion.Item className='my-3' key={idx}>
            <Accordion.Header>{item.title}</Accordion.Header>
            <Accordion.Body>
             {item.description}
            </Accordion.Body>
          </Accordion.Item>
        })}
    </Accordion>
    </div>
    </div>
  )
}

export default Features