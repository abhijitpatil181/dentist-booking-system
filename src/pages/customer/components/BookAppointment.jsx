import { Dropdown } from "@/components";
import { useEffect } from "react";
import TimeSlot from "./components/TimeSlot";
import { Form } from "react-router-dom";



const BookAppointment=({date,dentistData,servicesData,selectedDentist,selectedService,totalPrice,selectedSlot,setSelectedDentist,setSelectedService,setSelectedSlot,setTotalPrice})=>{
 
  useEffect(()=>{
 
    if(selectedDentist.id && selectedService.id){     
      const serviceCost=servicesData.find(service=>service.serviceId===selectedService.id).priceOfService;
      const dentistCost=dentistData.find((dentist)=>dentist.username===selectedDentist.id).hourlyRate;
      const totalCost=(+serviceCost)+(+dentistCost)
      setTotalPrice(totalCost)
    }

  },[selectedDentist.id,selectedService.id])

  const dentistOptions = dentistData.map((dentist) => ({
  value: dentist.username,
  label: dentist.fullname,
  }));

  const serviceOption=servicesData.map((service)=>({value:service.serviceId,label:service.serviceName}))

  const handleSelectChange = (label,key,value) => {
   
    switch(label){
      case "dentist":
        setSelectedDentist({id:key,value:value});
        break;

      case "service":
        setSelectedService({id:key,value:value})
        break;

      default:
        console.log("not found")

    }
  };

  const onTimeSlotChange=(value)=>{
    
    setSelectedSlot(value);
  }

  return (
    <>
    
      <div style={{display:'flex',flexDirection:'column',justifyContent:"center",rowGap:'1rem'}}>   
          <p style={{fontSize:'1.3rem',fontWeight:400,textAlign:'center',borderBottom:'1px solid #D6CCCC',padding:'0.7rem 0'}}>{date}</p>    
          <div style={{display:'flex',flexDirection:'column',justifyContent:"center",rowGap:'1rem',padding:'0 1rem'}}>
             <Dropdown
          options={dentistOptions}
          label="Select Dentist"
          selectedValue={selectedDentist.value}
          onChange={(e)=>handleSelectChange("dentist",e.value,e.label)}
        />
         <Dropdown
          options={serviceOption}
          label="Select Service"
          selectedValue={selectedService.value}
          onChange={(e)=>handleSelectChange("service",e.value,e.label)}
        />
        <TimeSlot onTimeSlotChange={onTimeSlotChange} selectedSlot={selectedSlot}/>
        {selectedDentist.id && selectedService.id &&
        <p style={{fontSize:'1.2rem',fontWeight:600}}>Rs.{totalPrice}.00 <span style={{ fontSize: '0.8rem', color: '#888',fontWeight:400}}>Including GST</span></p>}

          </div>
       
      </div>
    </>
  )
}

export default BookAppointment;