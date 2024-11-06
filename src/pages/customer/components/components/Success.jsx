import { Success_Svg } from "@/assets";
import { Button } from "@/components";
import { useNavigate } from "react-router-dom";

const Success=()=>{
  const navigate=useNavigate();

  const onClick=(e)=>{
    e.preventDefault();
    navigate('/customer/dashboard')
  }

  return (
    <>
    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center', height:'100%',width:'100%',rowGap:'1rem'}}>
    
        <img src={Success_Svg} alt="success"/>
      <p style={{fontSize:'1.5rem'}}>Payment Successful</p>
      <Button 
      style={{
            width: '10rem',
            fontSize: '1rem',
            border: 'none',
            borderRadius: '0.5rem',
            backgroundColor:'#EBEBEB',
            padding: '0.5rem 1rem',
          }}
        className="custom-class"
        buttonType={'submit'}
        onClick={onClick}
        >
        View Bookings
      </Button>
   
    
    </div>

    </>
  )
}

export default Success;