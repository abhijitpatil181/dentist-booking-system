import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components';

const roles = ['Admin', 'Dentist', 'Customer'];

const SelectUser = () => {
  // const [selectedRole, setSelectedRole] = useState('Admin');
  const { role: selectedRole } = useParams();
  const navigate = useNavigate();

  const handleClick = role => {
    navigate(`/login/${role.toLowerCase()}`);
  };

  return (
    <>
      <h3 style={{ fontSize: '1.3rem', fontWeight: 450 }}>Login As</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: '1rem' }}>
        {roles.map((role, index) => (
          <div key={role}>
            <Button
              onClick={() => handleClick(role)}
              style={{
                width: '10rem',
                fontSize: '1rem',
                border: 'none',
                backgroundColor:
                  selectedRole && selectedRole === role.toLowerCase() ? '#81c784' : 'rgba(0, 0, 0, 0.12)',
                borderRadius: '0.5rem',
                padding: '0.5rem 1rem',
              }}
              className="custom-class"
              buttonType={'button'}
            >
              {role}
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};

export default SelectUser;
