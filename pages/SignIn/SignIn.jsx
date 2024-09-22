import { useNavigate } from 'react-router-dom';
import "./SignIn.scss";

function SignIn () {
    const navigate = useNavigate();

    const handleSignInClick = () => {
        navigate('/lists');
    }

    const handleSignUpClick = () => {
        navigate('/signup');
    }


    return (
        <>
        <div className="signin-signup">
            <form action="" className="sign-in__form">
                <h1 className="sign-in__form--title">Sign In</h1>
                <div className="sign-in__form--fields">
                    <div className='sign-in__form--fields-email'>
                        <label className='sign-in__form--fields-email--label' htmlFor="email">Email:</label>
                        <input className='sign-in__form--fields-email--field' type="email" name="email" id="email" />
                    </div>

                    <div className="sign-in__form--fields-password">
                        <label className="sign-in__form--fields-password--label" htmlFor="password">Password:</label>
                        <input className="sign-in__form--fields-password--field" type="password" name="password" id="password" />
                    </div>
                </div>
                <p onClick={handleSignInClick} className="sign-in__button">Sign In</p>
            </form>
            <div className="sign-up">
                <p className="sign-up__or">
                    <span className="sign-up__or-divider">
                    OR
                    </span>
                    </p>
                <h2 onClick={handleSignUpClick} className="sign-up__button">Sign Up</h2>
            </div>
        </div>
        </>
    )
}

export default SignIn;