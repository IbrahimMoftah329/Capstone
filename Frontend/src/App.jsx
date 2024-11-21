import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/Hero/Hero'
import Title from './Components/Title/Title'
import SignUp from './Components/SignUp/SignUp'
import Footer from './Components/Footer/Footer'
import AboutTitle from './Components/AboutTitle/AboutTitle'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import About from './pages/AboutPage/About';
import Dashboard from './pages/DashboardPage/Dashboard';
import Quiz from './pages/QuizPage/Quiz';
import Results from './pages/QuizPage/Results';
import Carousel from './Components/Carousel/Carousel'
import TitleC from './Components/Title/TitleC'
import SearchResults from './pages/SearchResultsPage/SearchResults';

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
          <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unknown routes */}
          {/* Quiz and Results Pages */}
          <Route path="/quiz/:quizId" element={<Quiz />} />
          <Route path="/results/:attemptId" element={<Results />} />
          {/* Search Results Page */}
          <Route path="/searchresults" element={<SearchResults />} />
        </Routes>
        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;