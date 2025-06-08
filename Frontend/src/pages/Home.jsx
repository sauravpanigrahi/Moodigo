import React from 'react';
import DisplayContent from '../components/display';
import FeaturedProduct from '../components/Featured';
import Policy from '../components/Policy';

const Home = () => {
    return ( 
        <>
        <div className=" home">
            <div className="display">
             <DisplayContent/> 
             <FeaturedProduct/> 
             <Policy/> 
            
            </div>
        </div>
        </>
     );
}
 
export default Home;