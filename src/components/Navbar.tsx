import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Utensils, LogOut, PlusCircle, Heart, Home } from 'lucide-react';

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 text-orange-600 font-bold text-xl">
              <Utensils className="w-6 h-6" />
              <span>FoodieDiary</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="border-transparent text-gray-500 hover:border-orange-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                <Home className="w-4 h-4 mr-1" />
                Dashboard
              </Link>
              <Link to="/favorites" className="border-transparent text-gray-500 hover:border-orange-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                <Heart className="w-4 h-4 mr-1" />
                Favorites
              </Link>
              <Link to="/add" className="border-transparent text-gray-500 hover:border-orange-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                <PlusCircle className="w-4 h-4 mr-1" />
                Add Food
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-4 hidden sm:block">{user.email}</span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-gray-500 bg-gray-50 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className="sm:hidden border-t border-gray-200">
        <div className="pt-2 pb-3 space-y-1 flex justify-around">
          <Link to="/" className="text-gray-500 hover:text-orange-600 flex flex-col items-center p-2">
            <Home className="w-5 h-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/favorites" className="text-gray-500 hover:text-orange-600 flex flex-col items-center p-2">
            <Heart className="w-5 h-5" />
            <span className="text-xs mt-1">Favs</span>
          </Link>
          <Link to="/add" className="text-gray-500 hover:text-orange-600 flex flex-col items-center p-2">
            <PlusCircle className="w-5 h-5" />
            <span className="text-xs mt-1">Add</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
