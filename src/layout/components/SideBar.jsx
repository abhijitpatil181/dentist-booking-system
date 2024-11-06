import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import useLoginContext from '@/hooks/useLoginConext';

import './sideBar.css';

const menuOptions1 = [
  { label: 'dashboard', Name: 'Dashboard' },
  { label: 'add-service', Name: 'Add Service' },
  { label: 'view-report', Name: 'View Report' },
  { label: 'add-dentist', Name: 'Add Dentist' },
];

const SideBar = () => {
  const { user } = useParams();
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [menuOptions, setMenuOptions] = useState([
    { label: 'dashboard', Name: 'Dashboard' },
    { label: 'add-service', Name: 'Add Service' },
    { label: 'view-report', Name: 'View Report' },
    { label: 'add-dentist', Name: 'Add Dentist' },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    if (user && user !== 'admin') {
      setMenuOptions([{ label: 'dashboard', Name: 'Dashboard' }]);
    }
  }, [user]);

  // if(user!=='admin'){
  //   menuOptions=[{label:'dashboard',Name:'Dashboard'}]
  // }

  const onMenuClick = menuItem => {
    setSelectedTab(menuItem);
    navigate(`${menuItem}`);
  };

  return (
    <>
      <div className="sidebar-container" key={'sidebar'}>
        {menuOptions.map((menu, index) => (
          <React.Fragment key={index}>
            <h3
              className="menu-item"
              onClick={() => onMenuClick(menu.label)}
              style={{
                backgroundColor: selectedTab === menu.label ? '#D9D9D9' : 'transparent',
                padding: '0.5rem',
                borderRadius: '5px',
              }}
            >
              {menu.Name}
            </h3>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default SideBar;
