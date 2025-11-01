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
    <div className="w-full min-h-screen text-slate-200 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900">
      <Header />

      {/* Hero Section */}
      <main className="container mx-auto max-w-6xl px-6 pt-32 pb-20 text-center z-10 relative">
        <span className="inline-block px-4 py-1 rounded-full text-sm bg-slate-800/50 border border-slate-700 mb-6">
          🚀 A Full-Stack Real-Time Chat App
        </span>

        <h1 className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-500 mb-6 leading-tight">
          Connect Instantly with SocketSpace
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-12">
          Experience seamless, real-time conversations powered by React,
          Node.js, and Socket.io — designed for speed, security, and simplicity.
        </p>

        {/* ✅ Buttons Layout */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full max-w-md mx-auto">
          <Link
            to="/signup"
            className="flex-1 w-full text-center px-8 py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-[1.02]"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="flex-1 w-full text-center px-8 py-3 text-lg font-semibold rounded-lg border border-cyan-500/60 text-cyan-400 hover:text-cyan-300 hover:border-cyan-400 transition-all duration-300 hover:scale-[1.02]"
          >
            Login
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-20 bg-slate-800/40 backdrop-blur-sm relative z-10 border-t border-slate-700/50">
        <div className="container mx-auto max-w-6xl px-6">
          <h2 className="text-4xl font-bold text-center mb-14 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500">
            Key Features
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-cyan-500/60 transition-all hover:shadow-cyan-500/20 hover:shadow-xl">
              <MessageCircleIcon className="size-10 text-cyan-400 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">
                Real-Time Messaging
              </h3>
              <p className="text-slate-400">
                Powered by Socket.io for instantaneous message delivery with zero lag.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-cyan-500/60 transition-all hover:shadow-cyan-500/20 hover:shadow-xl">
              <UsersIcon className="size-10 text-cyan-400 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Live Presence</h3>
              <p className="text-slate-400">
                Track who’s online or offline in real-time for smarter interactions.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-cyan-500/60 transition-all hover:shadow-cyan-500/20 hover:shadow-xl">
              <ImageIcon className="size-10 text-cyan-400 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Media Sharing</h3>
              <p className="text-slate-400">
                Effortless image uploads and sharing, powered by Cloudinary integration.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-cyan-500/60 transition-all hover:shadow-cyan-500/20 hover:shadow-xl">
              <ShieldCheckIcon className="size-10 text-cyan-400 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Secure Authentication</h3>
              <p className="text-slate-400">
                Robust, stateless login using JWT — ensuring privacy and data protection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center p-10 text-slate-500 border-t border-slate-700/50 relative z-10 space-y-3">
        <p>
          Made with <span className="text-pink-500">♥</span> by{" "}
          <a
            href="https://github.com/aryank354"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Aryan Kanojia
          </a>
        </p>
        <p className="text-sm">&copy; 2025 SocketSpace. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
