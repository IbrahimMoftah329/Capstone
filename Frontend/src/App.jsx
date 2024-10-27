import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/Hero/Hero'
import Title from './Components/Title/Title'
import SignUp from './Components/SignUp/SignUp'
import Footer from './Components/Footer/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import About from './pages/AboutPage/About';
import Dashboard from './pages/DashboardPage/Dashboard';
import Carousel from './Components/Carousel/Carousel'
import TitleC from './Components/Title/TitleC'

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes> {/* Home Page */}
          <Route path="/" element={
            <>
              <Hero />
              <div className='container'>
              <TitleC />
              <Carousel />
              <br></br>
              <br></br>
              <SignedOut>
                <Title subtitle="Sign Up" title="Become a Mate" />
                <SignUp />
              </SignedOut>
              </div>
            </>
          } />
          {/* About Page */}
          <Route path="/about" element={<About />} />
          {/* Dashboard Page */}
          <Route path="/dashboard/*" element={<Dashboard />} />
          
        </Routes>
        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;