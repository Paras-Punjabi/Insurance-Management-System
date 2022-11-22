import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { useEffect,useState } from 'react';
import { SERVER_URL } from './config';
import LogedInHome from './components/LogedInHome';
import NewPolicy from './components/NewPolicy';
import YourPolicies from './components/YourPolicies';
import Statements from './components/Statements';
import Agents from './components/Agents';

function App() {
  const [data,setData] = useState([]);

  useEffect(()=>{
    fetch(`${SERVER_URL}/api/customer/all`,{
      method:"GET"
    }).then(d=>{return d.json()}).then(s=>{
      setData(s.result);
      console.log(s.result);
    })
  },[])

  return (
    <BrowserRouter>
      <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/about' element={<About/>} />
          <Route exact path='/contact' element={<Contact/>} />
          <Route exact path='/signup' element={<SignUp/>} />
          <Route exact path='/login' element={<Login/>} />
          {
            data && data.map((item,idx)=>{
              return (
                <>
                <Route key={idx} exact path={`/user/${item.email}`} element={<LogedInHome data={item}/>} />

                <Route key={idx} exact path={`/user/${item.email}/new`} element={<NewPolicy data={item}/>} />

                <Route key={idx} exact path={`/user/${item.email}/policies`} element={<YourPolicies data={item}/>} />
                <Route key={idx} exact path={`/user/${item.email}/statements`} element={<Statements data={item}/>} />
                <Route key={idx} exact path={`/user/${item.email}/agents`} element={<Agents data={item}/>} />
                </>
              
              )
            })
          }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
