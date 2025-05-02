import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className="w-screen min-h-screen bg-blue-100 pt-10">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-mono font-bold text-gray-800">
          Get Started
        </h1>

        <h4 className="mt-4 md:mt-8 text-lg md:text-2xl font-mono text-gray-700">
          Create Tasks. Track Progress.
        </h4>

        <div className="mt-10 flex justify-center">
          <img
            className="w-full max-w-md rounded-xl"
            src="/walcome.webp"
            alt="Welcome illustration"
          />
        </div>

        <Link to="/auth">
          <button className="mt-10 bg-orange-500 hover:bg-orange-600 text-white text-xl md:text-2xl font-semibold px-8 py-3 rounded-xl shadow transition">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  )
}

export default HomePage
