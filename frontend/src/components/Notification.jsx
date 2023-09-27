import React, { useEffect } from 'react';

const Notification = ({ message }) => {
  useEffect(() => {
    // Code pour cacher la notification après un certain temps
  }, []);

  return (
    <div>
      {message}
    </div>
  );
};

export default Notification;
