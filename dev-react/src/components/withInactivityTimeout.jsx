import React, { useState, useEffect } from 'react';

const withInactivityTimeout = (WrappedComponent) => {
  return (props) => {
    const [lastActivityTime, setLastActivityTime] = useState(Date.now());

    // Update last activity time whenever there's user interaction
    const updateActivityTime = () => {
      setLastActivityTime(Date.now());
    };

    useEffect(() => {
      // Set initial last activity time
      setLastActivityTime(Date.now());

      // Set up event listeners to update activity time
      window.addEventListener('mousemove', updateActivityTime);
      window.addEventListener('keydown', updateActivityTime);

      // Cleanup event listeners on component unmount
      return () => {
        window.removeEventListener('mousemove', updateActivityTime);
        window.removeEventListener('keydown', updateActivityTime);
      };
    }, []);

    // Check for inactivity and clear localStorage if necessary
    useEffect(() => {
      const checkInactivity = () => {
        const currentTime = Date.now();
        const inactiveTime = currentTime - lastActivityTime;
        const expirationTime = 10 * 60 * 1000; // 10 minutes in milliseconds

        if (inactiveTime >= expirationTime) {
          // Clear localStorage
          localStorage.clear();
          window.location.href = "/users";
        }
      };

      const intervalId = setInterval(checkInactivity, 1000); // Check every second

      return () => clearInterval(intervalId);
    }, [lastActivityTime]);

    return <WrappedComponent {...props} />;
  };
};

export default withInactivityTimeout;
