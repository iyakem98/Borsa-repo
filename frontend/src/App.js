import './bootstrap.min.css'
//import ColorSchemesExample from './components/Navv/Navv';
import Nav1 from './components/Navv/Nav1';
import HomeScreen from './screen/HomeScreen';
import LoginScreen from './screen/LoginScreen';
import { Toast, ToastContainer } from 'react-bootstrap';
import MessageScreen from './screen/MessageScreen';
import 'react-toastify/dist/ReactToastify.css'
import RegisterScreen from './screen/RegisterScreen';
import TravelerScreen from './screen/TravelerScreen';
import ConsumerScreen from './screen/ConsumerScreen';
import ProfileScreen from './screen/ProfileScreen';
import AboutScreen from './screen/AboutScreen';
import ToTry from './components/ToTry/ToTry'
import './index.css'
import ChatScreen from './screen/ChatScreen';
import ContactScreen from './screen/ContactScreen';
import Footer from './components/Footer/Footer';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import FeedbackModal from './components/Feedback/FeedbackModal';



function App() {
  return (
    <div className="app">
     <Router>
       <Nav1/>
       <Routes>
         <Route path = "/" element= {<HomeScreen/>}/>
         <Route path = "/login" element= {<LoginScreen/>}/>
         <Route path = "/register" element= {<RegisterScreen/>}/>
         <Route path = "/messages" element= {<MessageScreen/>}/>
         <Route path = "/travelers" element= {<TravelerScreen/>}/>
         <Route path = "/consumers" element= {<ConsumerScreen/>}/>
         <Route path = "/profile" element = {<ProfileScreen/>}/>
         <Route path = "/about" element = {<AboutScreen/>}/>
         <Route path = "/t" element = {<ToTry/>}/>
         <Route path = "/chat" element = {<ChatScreen/>}/>
         <Route path = "/feedback" element = {<FeedbackModal traveler = "Tim Greg"/>} />
         <Route path = "/contact" element = {<ContactScreen/>}/>
       </Routes>
       <Footer/>
     </Router>
     <ToastContainer/>
    </div>
  );
}

export default App;
