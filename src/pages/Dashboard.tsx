import React, { useEffect, useState } from 'react';
import { supabase, FoodEntry } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import FoodCard from '../components/FoodCard';
import { UtensilsCrossed, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const [foods, setFoods] = useState<FoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [recommendation, setRecommendation] = useState<FoodEntry | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchFoods = async () => {
      const { data, error } = await supabase
        .from('foods')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching foods:', error);
      } else {
        setFoods(data || []);
      }
      setLoading(false);
    };

    fetchFoods();
  }, [user]);

  const handleRecommend = () => {
    const highlyRated = foods.filter(f => f.preference_rating >= 4);
    if (highlyRated.length > 0) {
      const randomFood = highlyRated[Math.floor(Math.random() * highlyRated.length)];
      setRecommendation(randomFood);
    } else {
      alert("You need to rate some meals 4 or 5 stars first to get recommendations!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Food Diary</h1>
        <div className="flex space-x-4">
          <button 
            onClick={handleRecommend}
            className="bg-orange-100 hover:bg-orange-200 text-orange-700 px-4 py-2 rounded-md font-medium transition-colors flex items-center"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Recommend Meal
          </button>
          <Link 
            to="/add" 
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            Log Meal
          </Link>
        </div>
      </div>

      {recommendation && (
        <div className="mb-8 p-6 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl shadow-md text-white">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Sparkles className="w-5 h-5 mr-2" />
            We recommend you eat this again!
          </h2>
          <div className="bg-white text-gray-900 rounded-lg p-4 max-w-sm">
            <FoodCard food={recommendation} />
          </div>
          <button 
            onClick={() => setRecommendation(null)}
            className="mt-4 text-sm underline hover:text-orange-100"
          >
            Dismiss
          </button>
        </div>
      )}

      {foods.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
          <UtensilsCrossed className="mx-auto h-16 w-16 text-gray-300" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No meals logged yet</h3>
          <p className="mt-2 text-gray-500">Get started by adding your first meal to your diary.</p>
          <div className="mt-6">
            <Link
              to="/add"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
            >
              Add your first meal
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {foods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      )}
    </div>
  );
}
