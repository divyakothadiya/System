import React, {useState} from 'react';
import {UserDetailsForm} from './userDetailsForm';
import {ReadOnlyDetails} from './readOnlyDetails';

const UserComponent = () => {
    const [userDetails, setUserDetails] = useState(null);

    const handleFormSubmit = (data) => {
      setUserDetails(data);
    };
  
    return (
      <div>
        {!userDetails ? (
          <UserDetailsForm onSubmit={handleFormSubmit} />
        ) : (
          <ReadOnlyDetails details={userDetails} />
        )}
      </div>
    );
}

export default UserComponent