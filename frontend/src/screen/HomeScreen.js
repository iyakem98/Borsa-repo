import React from 'react'
import './HomeScreen.css'
import { Button, Image } from 'react-bootstrap'
import { useState } from 'react'

const HomeScreen = () => {

    const [lang, setLang] = useState(false)

    const onLang = (e) => {
        e.preventDefault()
        setLang(true)

       
        }
  return (
    <div className='hmsc'>
        <div className='hmschd  bg-secondary'>
           <div className='hmshd1'>
            <div className='hmshdleft'>
                <Image className='homeim1' src='https://9to5mac.com/wp-content/uploads/sites/6/2021/04/iPhone-12-purple-wallpaper.jpg?quality=82&strip=all'>

                </Image>
            </div>
            <div className='hmsdhright'>
                <h1 className='text-dark'>Let's bring your stuff!</h1>

                {lang? (<Button className='homebutt1'>
                    እቃችሁን አምጡ
                    </Button>):(<Button className='homebutt1' onClick={onLang} >
                        Bring your stuff
                    </Button>)}
                    

                    <Button className='homebutt1'>
                        Make money!
                    </Button>

            </div>
           </div>
        </div>
        <div className='hmsec bg-primary'>
            <p>Get your first delivery free!</p>
        </div>

        <div className='hmthird'>
            <h1 className='text-dark'>How does it work?</h1>
        </div>
    </div>
  )
}

export default HomeScreen