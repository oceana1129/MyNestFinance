import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const NavBar = ({defaultPage=true, signupPage=false, loginPage=false}) => {
    return (
        <header className="bg-base-200 border-b border-base-content border-blue-600">
            <div className="mx-auto max-w-6xl p-4 flex items-center justify-between">
                <Link to={"/"}>
                    <h1 className="text-3xl font-bold text-primary font-sans tracking-tighter">
                        MyNest
                    </h1> 
                </Link>
                {defaultPage &&
                    <div className="flex items-center gap-4">
                        <Link to={"/login"} className="btn btn-secondary btn-outline">
                            Log in
                        </Link>
                        <Link to={"/signup"} className="btn btn-primary">
                            Sign up
                        </Link>
                    </div> }
                    
                {signupPage &&
                    <div className="flex items-center gap-4">
                        <p>Already have an account?</p>
                        <Link to={"/login"} className="btn btn-primary">
                            Log in
                        </Link>
                    </div> }

                {loginPage &&
                    <div className="flex items-center gap-4">
                        <p>Need to sign up?</p>
                        <Link to={"/signup"} className="btn btn-primary">
                            Sign up
                        </Link>
                    </div> }
            </div>
        </header>
    );
}

export default NavBar