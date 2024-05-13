import React from 'react';

const UserProfile = ( { userName, setUserName } ) => {
// setUserName for updating user name if edited in Profile
  return (
    <p>Username is : { userName } </p>
  );
};

export default UserProfile;