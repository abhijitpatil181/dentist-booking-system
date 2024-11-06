import TextField from '../textfield/TextField';

const AppointmentDetails = ({ bookedData }) => {
  return (
    <>
      <div style={{ padding: '1rem 1rem' }}>
        <TextField label="Patient Name" value={bookedData?.patientName} onChange={() => {}} required={true} />
        <TextField label="Service Name" value={bookedData?.serviceName} onChange={() => {}} required={true} />
      </div>
    </>
  );
};

export default AppointmentDetails;
