/*This is the HomeScreen that users see first. It includes, among other things, description of services that the company offers and mini-tutorials
 on how to use the app */
import React from 'react'
import './HomeScreen.css'
import { Button, Image } from 'react-bootstrap'
import HomeIntro from '../components/Home/HomeIntro'
import Tutorial from '../components/Home/Tutorial'
import { useState } from 'react'

const HomeScreen = () => {

    const [lang, setLang] = useState(false)

    const onLang = (e) => {
        e.preventDefault()
        setLang(true)

       
        }
  return (
    <div className='hmsc'>
        <div className='hmschd'>
           <div className='hmshd1'>
            <div className='hmshdleft'>
               {/* <Image className='homeim1' src='https://9to5mac.com/wp-content/uploads/sites/6/2021/04/iPhone-12-purple-wallpaper.jpg?quality=82&strip=all'>

  </Image> */}
            </div>
            <div className='hmsdhright'>
                <h3 className='text-light'>Let's bring your stuff!</h3>

                {lang? (<Button className='homebutt1'>
                    እቃችሁን አምጡ
                    </Button>):(<Button style={{background: 'none', color: 'bwhite'}} className='homebutt1 bg-success' onClick={onLang} >
                        Bring your stuff
                    </Button>)}
                    

                    <Button style={{background: 'none'}} className='homebutt1 bg-dark'>
                        Make money!
                    </Button>

            </div>
           </div>
        </div>
       {/* <div className='hmsec'>
            <p>Get your first delivery free!</p>
  </div> 

        <div className='hmthird'>
            <p className='text-dark'>How does it work?</p>
        </div> 
*/}
    <HomeIntro/>
    <Tutorial/>
    </div>
  )
}

export default HomeScreen