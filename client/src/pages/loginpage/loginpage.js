import { SimpleBackground } from "../../components/backgrounds/background";
import { LoginForm } from "../../components/login-body/loginform";
import { TopNavBar } from "../../components/top-nav-bar/topbar";
import './stylesheet/loginpage.css'

export function LoginPage() {
    return (
        <div>
            <SimpleBackground />
            <div id="loginPageContainer">
                <TopNavBar /> 
                <LoginForm />
            </div>
        </div>
    )
}