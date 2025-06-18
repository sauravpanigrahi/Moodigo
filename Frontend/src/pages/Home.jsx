import React from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import DisplayContent from '../components/display';
import FeaturedProduct from '../components/Featured';
import Policy from '../components/Policy';
import Contact from '../components/contact';
import Footer from '../components/footer';
import CTASection from '../components/transformation';

const Home = () => {
    const { darkMode } = useDarkMode();
    
    return ( 
        <>
        <div className={`home ${darkMode ? 'bg-dark text-white' : 'bg-light'}`}>
            <div className="display">
             <DisplayContent/> 
             <FeaturedProduct/> 
             <Policy/> 
             <CTASection/>
             {/* <Contact/> */}
             <Footer/>
            
            </div>
        </div>
        </>
     );
}
 
export default Home;
