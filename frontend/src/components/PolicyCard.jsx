import React,{useEffect,useState} from 'react'
import Card from 'react-bootstrap/Card';

const PolicyCard = () => {
  const [data,setData] = useState([])
  useEffect(function(){
      // eslint-disable-next-line 
      fetch("http://localhost:8000/api/policy/fetch",{
        method:"GET",
        mode:"cors"
      }).then((d)=>{return d.json()}).then((s)=>{
        setData(s.result);
        console.log(s);
      })
  },[])
  return (
    <div className='my-5'>
      {data && data.length !== 0 && <hr />}
    {data && data.length !== 0 && <h1 className='text-center my-2'>Available Policies</h1>}
    <div className='d-flex mx-auto flex-row flex-wrap justify-content-center'>
      {data && data.map((item,idx)=>{
    return( <Card bg='dark' text='light' className='mx-4' key={idx} style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>
            {item.description}
          </Card.Text>
        </Card.Body>
      </Card>)
      })}
    </div>
    </div>
  )
}

export default PolicyCard