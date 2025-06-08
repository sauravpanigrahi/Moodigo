import Button from '@mui/material/Button';
import {  useNavigate } from 'react-router-dom'; 

const DisplayContent = () => {
    const navigate=useNavigate();

const handleButton = () => {
    navigate('/products')
}
const handleLearnMore = () => {
    navigate('/learnmore')
}

  return ( 
    <div>
      <div className="display-content d-flex flex-column justify-content-center align-items-center text-center px-3" 
        style={{
          borderBottom: "1px solid gray", 
          height: "91vh",
          backgroundImage: "url('/Background.png')",
          backgroundSize: "cover", // This ensures the background image covers the container
          backgroundPosition: "center", // Centers the image
        
        }}>
        
        {/* Heading */}
        <h1 className="fw-bold" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
          Discover This Season's Latest Trends
        </h1>

        {/* Paragraph */}
        <p className="mt-3" style={{ fontSize: "1.2rem", maxWidth: "700px" }}>
          Explore our curated collection of fashion-forward styles and statement accessories, 
          crafted to elevate your wardrobe and reflect your unique sense of style.
        </p>

        {/* Buttons */}
        <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
          <Button onClick={handleButton} variant="contained" size="medium">Shop Now</Button>
          <Button onClick={handleLearnMore} variant="contained" size="medium">Learn More</Button>
        </div>

      </div>
    </div>
  );
}
 
export default DisplayContent;
