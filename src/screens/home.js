import React from "react";
import '../style/home.css'
import Navbar from'../components/navbar'

function Home(){
    return(
        <>
            <Navbar />
            <div className='content-container'>
              <div className='image-container'></div>
              <div className='Info-container'>
                <div className='data-container-1'></div>
                <div className='data-container-2'></div>
              </div>
            </div>
        </>
    );
}

export default Home;