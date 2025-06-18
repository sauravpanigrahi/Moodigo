import React from 'react';
import DisplayContent from '../components/display';
import FeaturedProduct from '../components/Featured';
import Policy from '../components/Policy';
import Contact from '../components/contact';
import Footer from '../components/footer';
const Home = () => {
    return ( 
        <>
        <div className=" home">
            <div className="display">
             <DisplayContent/> 
             <FeaturedProduct/> 
             <Policy/> 
             <Contact/>
             <Footer/>
            
            </div>
        </div>
        </>
     );
}
 
export default Home;