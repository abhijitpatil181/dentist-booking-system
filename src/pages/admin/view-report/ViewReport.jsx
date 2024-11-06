import useFirestoreCollection from "@/hooks/useFirestoreCollection";
import { reportData } from "@/mock/dashboard.mock";
import { transformData } from "@/utils/helper";
import React, { useEffect, useState } from "react";
import { Dialog } from "@/components";
import ShowBookedData from "./ShowBookedData";

const ViewReport = () => {
  const [selectedFilter, setSelectedFilter] = useState("weekly");
  const {data}=useFirestoreCollection('bookings');
  const {data:servicesData}=useFirestoreCollection('services');
  const [bookingReportData,setBookingReportData]=useState([]);
  const [open,setOpen]=useState(false)
  const [serviceData,setServiceData]=useState([])

  useEffect(()=>{
    if(selectedFilter && data.length>0 && servicesData.length>0){
      const modifiedData=transformData(data,servicesData,selectedFilter);
      setBookingReportData(modifiedData)
      
    }

  },[selectedFilter,data,servicesData])

  // Style generator for buttons
  const getButtonStyle = (filter) => ({
    padding: "0.5rem 1rem",
    width: "14rem",
    fontSize: "1.2rem",
    color: "#000000",
    backgroundColor: selectedFilter === filter ? "#E0D0D0" : "white",
    border: selectedFilter === filter ? "none" : "1px solid black",
    cursor: "pointer"
  });

  const onViewClick=(reportId)=>{
    const bookedData=bookingReportData.find((reportsData)=>reportsData.reportId===reportId)?.bookings;
   
    setServiceData(bookedData)
    setOpen(true);
  }

  console.log("setOpen",setOpen)

  return (
    <div style={{paddingTop:'2rem'}}>
      <div style={{ display: "flex" }}>
        {["weekly", "monthly"].map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            style={getButtonStyle(filter)}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>
      <div >
      <table className="appointment-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Dentist Name</th>
            <th>No. of Bookings</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookingReportData.map((report) => (
            <tr key={report.reportId}>
              <td>{report.date}</td>
              <td>{report.dentistName}</td>
              <td>{report.numberOfBooking}</td>
              <td><button style={{padding:'0.5rem',backgroundColor:'#F5F1F1',border:'none',borderRadius:'5px',cursor:'pointer'}} 
              onClick={()=>onViewClick(report.reportId)}>View</button></td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {
      open && 
      <Dialog
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Patient List"
        content={<ShowBookedData data={serviceData}/>} 
        confirmText=""
        onConfirm={()=>console.log()}
        height="50vh"
        width='15vw'
      />
    }
    </div>
  );
};

export default ViewReport;
