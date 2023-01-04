import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const ProfileTabs = () => {
  return (
    <Tabs
    defaultActiveKey="profile"
    id="uncontrolled-tab-example"
    className="mb-3"
  >
    <Tab eventKey="profile" title="Account">
        
    </Tab>
    <Tab eventKey="settings" title="Settings">
    
    </Tab>
  </Tabs>
  )
}

export default ProfileTabs