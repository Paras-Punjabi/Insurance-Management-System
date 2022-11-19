import React,{useState} from 'react'
import Carousel from 'react-bootstrap/Carousel';
import {BASE_URL} from '../config.js'

const CarouselComponent = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    let imagesUrl = [`${BASE_URL}/front.jfif`,`${BASE_URL}/front3.jfif`,`${BASE_URL}/f4.jfif`,`${BASE_URL}/f5.jfif`,`${BASE_URL}/f6.jfif`,`${BASE_URL}/f7.jfif`,`${BASE_URL}/f8.jfif`]
    return (
        <>
        <Carousel  activeIndex={index} onSelect={handleSelect}>
        {imagesUrl.map((item,idx)=>{
            return(
            <Carousel.Item key={idx}>
            <img
              className="d-block images mx-auto"
              src={item}
              alt="First slide"
            />
        {/* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>)
    })}
    </Carousel>
    </>
  )
}

export default CarouselComponent