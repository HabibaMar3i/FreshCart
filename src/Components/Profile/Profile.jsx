import React, { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

function Profile() {
    const { userData } = useContext(UserContext);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            {userData ? (
                                <>
                                    <h2 className="mb-4 text-main fw-bolder">Profile</h2>
                                    <p><strong className='text-main'>Name:</strong> {userData.name}</p>
                                    <p><strong className='text-main'>Email:</strong> {userData.email}</p>
                                </>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
