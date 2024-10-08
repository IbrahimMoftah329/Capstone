import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/Hero/Hero'
import AboutUs from './Components/About Us/AboutUs'
import AboutUs2 from './Components/AboutUs2/AboutUs2'
import Title from './Components/Title/Title'
import SignUp from './Components/SignUp/SignUp'
import Footer from './Components/Footer/Footer'
import AboutTitle from './Components/AboutTitle/AboutTitle'

const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />
        <div className='container'>
          <AboutTitle />
          <AboutUs />
          <AboutUs2 />
          <Title subtitle = "Sign Up" title = "Become a Mate" />
          <SignUp />
          <Footer />

        </div>
    </div>
  )
}

export default App