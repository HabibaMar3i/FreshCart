import React from 'react';

function Footer() {
    return (
        <div className="bg-main-light p-4 mt-auto">
            <div className="container p-2">
                <div className="row">
                    <h3 className='fw-sembold'>Get the FreshCart app</h3>
                    <p>We will send you a link, open it on your phone to download the app.</p>
                    <div className="col-md-10">
                        <input className="form-control mb-2" placeholder="Email..." />
                    </div>
                    <div className="col-md-2">
                        <button className="AppButton text-white px-4 py-2">Share App Link</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
