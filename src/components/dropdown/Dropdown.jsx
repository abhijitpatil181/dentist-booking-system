// Dropdown.js
import './dropdown.css';

const Dropdown = ({ options, label, selectedValue, onChange }) => {
  return (
    <div className="dropdown">
      <select
        value={selectedValue}
        onChange={e => {
          const selectedOption = options.find(option => option.value === e.target.value);
          onChange(selectedOption);
        }}
        className="dropdown-select"
        required={true}
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
