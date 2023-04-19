import React, { useState, useEffect, useRef } from 'react';
import Grid from '@mui/system/Unstable_Grid';

const Terminal = (props) => {
  // Create a div for each command/response in the current session
  const commandLog = [];

  // Format the response for line breaks and spacing
  // The <pre> tag here ensures proper spacing
  props.response.forEach((el) => {
    const paredResponse = el.response.split('\n').map(function (item) {
      return (
        <pre>
          <span>
            {item}
            {/* <br /> */}
          </span>
        </pre>
      );
    });

    commandLog.push(
      <div class='command-log'>
        <strong style={{ color: 'rgb(109, 233, 68)' }}>$ {el.command}</strong>
        <p>{paredResponse}</p>
      </div>
    );
  });

  return (
    <Grid xs={8} width='100%' height='60%' style={{
      border: '1px solid',
      borderRadius: '3px',
      background: '#0e0727',
      fontFamily: 'monospace',
      padding: '5px',
      overflow: 'scroll',
    }}>
      {commandLog}
    </Grid>
  );
};

export default Terminal;
