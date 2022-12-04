import { SimpleBackground } from "../../components/backgrounds/background";
import { SignUpForm } from "../../components/login-body/signupform";
import { TopNavBar } from "../../components/top-nav-bar/topbar";
import './stylesheet/loginpage.css'

export function SignUpPage() {
    return (
        <div>
            <SimpleBackground />
            <div id="loginPageContainer">
                <TopNavBar /> 
                <SignUpForm />
            </div>
        </div>
    )
}