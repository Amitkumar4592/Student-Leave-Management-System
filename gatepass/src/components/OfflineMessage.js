import React from 'react';

const OfflineMessage = ({ isOnline }) => {
  return (
    <div>
      {!isOnline && (
        <div style={{ backgroundColor: 'red', color: 'white', padding: '10px' }}>
          You are currently offline. Please check your internet connection.
        </div>
      )}
    </div>
  );
};

export default OfflineMessage;