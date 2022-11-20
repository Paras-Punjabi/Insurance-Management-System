import React, { useEffect } from 'react'
import { NAME } from '../config'
import Footer from './Footer'
import NavbarComponent from './NavbarComponent'
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

const About = () => {
  useEffect(() => {
    document.title = `${NAME} - About`
  }, [])
  return (
    <>
      <NavbarComponent />
      <div className="about mx-auto my-3" >
        <Card className="text-center">
          <Card.Body>
            <Card.Title>ABOUT</Card.Title>
            <Card.Text>
              The main objective of the Project on the Insurance Management System is to manage the details of Insurance . Policy, CustomerPolicy, Assured Date, Issue, Issue. It manages all the information about Insurance,Customer,Issue,Insurance. The project is totally build an application program to reduce the manual work for managing the Insurance, Policy, Customer, Customer Policy. It tracks all the details about the Customer Policy, Assured Date, Issue.
            </Card.Text>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Functionalitis Provided by Insurance Management System are :</Accordion.Header>
                <Accordion.Body className='d-flex flex-column justify-content-start align-items-start'>
                  <li>Provides the searching facilities based on various factors. Such as Insurance, Customer Policy, Assured date, Issue.</li>
                  <li>Insurance Management System also manage the Customer details online for Assured Date details, Issue details, Insurance.</li>
                  <li>It tracks all the information of the Policy, Customer, Assured Date etc</li>
                  <li>Manage the information of the Policy</li>
                  <li>Shows the information and description of the Insurance, Customer Policy.</li>
                  <li>To increase the efficiency of the managing the Insurance, Policy</li>
                  <li>It Deals with monitoring the information and transactions of the Assured date.</li>
                  <li>Manage the information of the Insurance</li>
                  <li>Editing, Adding, and Updating of Records is improved which result in proper resource management of Insurance data.</li>
                  <li>Manage the information of the Assured Date.</li>
                  <li>Integration of all records of issue.</li>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Report of the Insurance Management System</Accordion.Header>
                <Accordion.Body className='d-flex flex-column justify-content-start align-items-start'>
                <li>It generates the report on Insurance, Policy, Customer.</li>
                <li>Provide filter reports on Customer Policy, Assured Date, Issue.</li>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card.Body>
        </Card>
      </div>
      <Footer />
    </>
  )
}

export default About