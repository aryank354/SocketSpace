// Your project imports Link from "react-router"
import { Link } from "react-router";
import Header from "../components/Header";
import {
  MessageCircleIcon,
  UsersIcon,
  ImageIcon,
  ShieldCheckIcon,
} from "lucide-react";

function HomePage() {
  return (
    <div className="w-full min-h-screen text-slate-200">
      <Header />

      {/* Hero Section */}
      <main className="container mx-auto max-w-6xl px-6 pt-32 pb-16 text-center z-10 relative">
        <span className="auth-badge mb-4">A Full-Stack Real-Time Chat App</span>
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 mb-6">
          Connect Instantly with SocketSpace
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10">
          A high-performance chat application built with React, Node.js, and
          Socket.io for a seamless, real-time messaging experience.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/signup" className="auth-btn w-auto px-8 py-3 text-lg">
            Get Started
          </Link>
          <Link to="/login" className="auth-link px-8 py-3 text-lg">
            Login
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-16 bg-slate-800/50 backdrop-blur-sm relative z-10">
        <div className="container mx-auto max-w-6xl px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
              <MessageCircleIcon className="size-10 text-cyan-400 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Real-Time Messaging</h3>
              <p className="text-slate-400">
                Leverages Socket.io for instantaneous message delivery.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
              <UsersIcon className="size-10 text-cyan-400 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Online/Offline Presence</h3>
              <p className="text-slate-400">
                Dynamically displays user online status in real-time.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
              <ImageIcon className="size-10 text-cyan-400 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Image Uploads</h3>
              <p className="text-slate-400">
                Seamless image sharing integrated with Cloudinary.
              </p>
            </div>
            {/* Feature 4 */}
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
              <ShieldCheckIcon className="size-10 text-cyan-400 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Secure Authentication</h3>
              <p className="text-slate-400">
                Stateless authentication system using JSON Web Tokens (JWT).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center p-8 text-slate-500 relative z-10 space-y-2">
        <p>
          Made with &hearts; by{" "}
          <a
            href="https://github.com/aryank354"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Aryan Kanojia
          </a>
        </p>
        <p>&copy; 2025 SocketSpace. All rights reserved.</p>
      </footer>
    </div>
  );
}
export default HomePage;