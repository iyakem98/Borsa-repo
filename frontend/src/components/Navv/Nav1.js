import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ChatState } from '../../context/chatProvider'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { logout, reset } from '../../features/auth/authSlice'
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link, useNavigate} from 'react-router-dom'
import Logo1 from '../../data/Logos/logo1.png'
import './Nav1.css'
import { getSender, getSenderFull } from '../Chatting/ChatConfig/ChatLogics';

function Nav1() {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const {notification, setNotification } = ChatState();
  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

  

  return (
    <Navbar className='nav1' bg="white" expand="lg">
      <Container fluid>
     
        <Link to = '/' style={{  textDecoration: 'none' }} className='text-primary navbrand'>
        <img className ='navLogo' src = {Logo1}/>
        </Link>
      
        <Navbar.Toggle aria-controls="navbarScroll" />
        
            {user? (
              <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
               
              </Nav>

              <NavDropdown className='text-primary text-bold navdrop' title={user.firstName} id = 'username'>
                        
                        <NavDropdown.Item className='drnav' as={Link} to="/profile">Profile</NavDropdown.Item>
                     
                        <NavDropdown.Item className='drnav' onClick={onLogout}>Logout</NavDropdown.Item>
                    </NavDropdown>

              {user.isTraveler? (
                <Link to = '/consumers' style={{  textDecoration: 'none' }} className='text-dark nav1linker' href="#" disabled>
                Consumers
              </Link>
              ):
              (
              <Link to = '/travelers' style={{  textDecoration: 'none' }} className='text-dark nav1linker' href="#" disabled>
                  Travelers
                </Link>)}
              

                <Link to = '/about' style={{  textDecoration: 'none' }} className='text-dark nav1linker' href="#" disabled>
                  About
                </Link>
                
                {user?(

                  <Link to = '/chat' style={{  textDecoration: 'none' }} className='text-dark nav1linker'  disabled>
                  Messages 
                
                  <p>
                    {notification.length}
                  </p>

                  {/* <NavDropdown className='text-primary text-bold navdrop' title= 'Messages' id = 'username'>

                    {!notification.length? (
                         <NavDropdown.Item className='drnav'>No new messages</NavDropdown.Item>
                    ): (

                     <div>
                      {notification.map((notif) => (
                         <NavDropdown.Item key = {notif._id} className='drnav' as={Link}> New Message from {getSenderFull(user, notif.chat.users).firstName} </NavDropdown.Item>
                      ))}
                     </div>

                    )}
                        
                        
                      </NavDropdown>  }*/}
                  </Link>
                )
              
                
                :(


                <Nav.Link className='text-dark nav1linker' href="#" disabled>
                Services
              </Nav.Link>
                )}
    
                 <Link to = '/contact' style={{  textDecoration: 'none' }} className='text-dark nav1linker'  disabled>
                  Contact Us
                  </Link>
                
           </Navbar.Collapse>
              
            
            ):
            <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
           
          </Nav>
          <Link to = '/about' style={{  textDecoration: 'none' }} className='text-dark nav1linker' href="#" disabled>
              About
            </Link>


            <Nav.Link className='text-dark nav1linker' href="#" disabled>
              Services
            </Nav.Link>
            <Link to = '/contact' style={{  textDecoration: 'none' }} className='text-dark nav1linker'  disabled>
                  Contact Us
            </Link>
            <Link to = '/login'> 
            <Button variant = 'outline-primary'>Log in </Button>
           </Link>
         
           <Link to = '/register'>
            <Button className='bg-primary nav1butt'>Sign up</Button>
           </Link>
         

         


          
         
           {/* <Button variant="outline-secondary">Search</Button> */}
        </Navbar.Collapse>
            }
          
      </Container>
    </Navbar>
  );
}

export default Nav1;