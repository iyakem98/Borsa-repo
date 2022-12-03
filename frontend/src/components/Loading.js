/* This is a loading components, it is basically a spinner that comes on the screen 
when a page is loading. It can be applied to any page that loads components from the backend
especially using redux. */

import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => {
  return (
      <Spinner
        animation='border'
        role = 'status'
        style = {{
            width: '100px',
            height: '100px',
            margin: 'auto',
            display: 'block',
        }}
      >
      </Spinner>
  );
};

export default Loading;
