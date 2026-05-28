import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const NavBar = () => {
    return (
        <header className="bg-base-200 border-b border-base-content border-blue-600">
            <div className="mx-auto max-w-6xl p-4 flex items-center justify-between">
                <Link to={"/"}>
                    <h1 className="text-3xl font-bold text-primary font-sans tracking-tighter">
                        MyNest
                    </h1> 
                </Link>
                
                <div className="flex items-center gap-4">
                    <Link to={"/signup"} className="btn btn-secondary btn-outline">
                        <span>login</span>
                    </Link>
                    <Link to={"/signup"} className="btn btn-primary">
                        <span>sign up</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default NavBar