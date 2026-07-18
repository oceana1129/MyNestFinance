import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import Button from "../actions/Button";

const HomeNavBar = ({defaultPage=true, signupPage=false, loginPage=false, onboarding=false}) => {
    return (
        <header className="bg-white bg-opacity-70 border-b border-white">
            <div className="mx-auto max-w-6xl p-4 flex items-center justify-between">
                <Link to={"/"}>
                    <h1 className="text-3xl font-bold text-slate-800 font-sans tracking-tighter  font-serif truncate">
                        MyNest
                    </h1> 
                </Link>
                {defaultPage &&
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" text="Log in" to={"/login"} />
                        <Button text="Sign up" to={"/signup"} />
                    </div> }
                    
                {signupPage &&
                    <div className="flex items-center gap-4">
                        <p>Already have an account?</p>
                        <Button text="Log in" to={"/login"} />
                    </div> }

                {loginPage &&
                    <div className="flex items-center gap-4">
                        <p>Need to sign up?</p>
                        <Button text="Sign up" to={"/signup"} />
                    </div> }
                {onboarding &&
                    <div className="flex items-center">
                        <Button variant="ghost" text="Skip setup" 
                            iconRight={ArrowRight}
                            to={"/dashboard"}/>
                    </div> }
            </div>
        </header>
    );
}

export default HomeNavBar