import { MessageCircleIcon } from "lucide-react";
// My project imports Link from "react-router"
import { Link } from "react-router";

function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-10 p-4">
      <div className="container mx-auto max-w-6xl flex justify-between items-center">
        {/* Logo/Brand Name */}
        <Link to="/" className="flex items-center gap-2">
          <MessageCircleIcon className="size-8 text-cyan-400" />
          <span className="text-2xl font-bold text-slate-200">
            SocketSpace
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex gap-4">
          <Link to="/login" className="auth-link"> {/* */}
            Login
          </Link>
          <Link to="/signup" className="auth-btn"> {/* */}
            Sign Up Free
          </Link>
        </nav>
      </div>
    </header>
  );
}
export default Header;