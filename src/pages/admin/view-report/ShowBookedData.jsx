import "./showBookedData.css"

const ShowBookedData=({data})=>{
  return (
    <>
    <div >
      <table className="booked-table" >
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Services Requested</th>
            <th>Date</th>
           
          </tr>
        </thead>
        <tbody>
          {data.map((report,index) => (
            <tr key={index}>
              <td>{report.patientName}</td>
              <td>{report.serviceName}</td>
              <td>{report.bookingDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
       
    </>
  )
}

export default ShowBookedData;