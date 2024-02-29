function ForgetPassword() {
    return <>
        <form>
            <div className="container d-flex-column justify-content-center align-items-center position-absolute top-50 start-50 translate-middle">
                <label for="VerificationCode" className="h3 p-2 m-2 ms-0">Verification Code</label>
                <input type="text" className="form-control p-2 m-2" id="VerificationCode" placeholder="Enter the Verification Code sent to you here...." />
                <button type="submit" className="btn bg-main text-white m-2">Confirm identity</button>
            </div>
        </form>
    </>
}

export default ForgetPassword;