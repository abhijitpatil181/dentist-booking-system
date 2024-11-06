import './spinner.css';

const Spinner = ({ message }) => {
  return (
    <div className="spinner-overlay">
      <div className="spinner"></div>
      <p className="spinner-message">{message}</p>
    </div>
  );
};

export default Spinner;
