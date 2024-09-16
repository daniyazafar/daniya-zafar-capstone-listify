import { useNavigate } from 'react-router-dom';

import "../SignUp/SignUp.scss";

function SignUp () {
    const navigate = useNavigate();

    const handleSignInClick = () => {
        navigate('/home');
    }

    return (
        <>
        <div className="sign-up">
            <form action="" className="sign-up__form">
                <h1 className="sign-up__form--title">Let's get you started!</h1>
                <div className="sign-up__form--fields">
                    <div className='sign-up__form--fields-email'>
                        <label className='sign-up__form--fields-email--label' htmlFor="email">Email:</label>
                        <input className='sign-up__form--fields-email--field' type="email" name="email" id="email" />
                    </div>

                    <div className="sign-up__form--fields-password">
                        <label className="sign-up__form--fields-password--label" htmlFor="password">Password:</label>
                        <input className="sign-up__form--fields-password--field" type="password" name="password" id="password" />
                    </div>

                    <div className="sign-up__form--fields-password">
                        <label className="sign-up__form--fields-password--label" htmlFor="password">Confirm Password:</label>
                        <input className="sign-up__form--fields-password--field" type="password" name="password" id="password" />
                    </div>
                </div>
                <p onClick={handleSignInClick} className="sign-up__button">Sign Up</p>
            </form>
        </div>
        </>
    )
}

export default SignUp;