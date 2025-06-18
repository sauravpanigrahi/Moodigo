import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import '../App.css'
// import BasicButtons from '../components/AccountIcon'
import { Navigate, useNavigate } from 'react-router-dom';
import AccountMenu from '../components/Account'

const Navbar = ({cartCount}) => {
  const navigate=useNavigate();
  const handlecart=()=>{
    navigate('/cartdetails')

  }
  
  
    return (
        <nav className="navbar navbar-expand-lg  bg-body-tertiary border-bottom sticky-top ">
  <div className="container-fluid">
    
  <a className="navbar-brand d-flex align-items-center" href="/">
  <img
    src="/logo.png"
    alt="Logo"
    style={{ width: "auto", height: "40px", objectFit: "contain" }}
    className="d-inline-block align-text-top ms-5"
  />
  <span className="ms-2 fw-bold fs-5">MoodiGo</span>
</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
     
    </div>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav ms-auto gap-2 " >
      {/* <BasicButtons /> */}
      <AccountMenu/>
        <IconButton onClick={handlecart} >
              <Badge  badgeContent={cartCount}  color="primary" overlap="circular" >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
        
      
      </div>
    </div>
  </div>
</nav>
    );
}
 
export default Navbar;