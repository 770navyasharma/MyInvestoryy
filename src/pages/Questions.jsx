import React from 'react'
import JoinCommunity from '../components/JoinCommunity'
import Quiz from '../components/DynamicQuiz'
import Navbar from '../components/Navbar'
const Questions = () => {
    const navLinks = [
        { title: 'Home', href: '/' },
      ];
  return (
  <div className='bg-black min-h-screen text-white'>
       <Navbar links={navLinks}/>
       <Quiz
        userName="Ayush"
    />
      <JoinCommunity/>
  </div>


  )
}

export default Questions;