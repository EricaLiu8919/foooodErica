import React, { useEffect, useState } from 'react';
import { supabase, FoodEntry } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import FoodCard from '../components/FoodCard';
import { Heart } from 'lucide-react';

export default function Favorites() {
  const { user } = useAuth();
  const [foods, setFoods] = useState<FoodEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchFavorites = async () => {
      const { data, error } = await supabase
        .from('foods')
        .select('*')
        .eq('user_id', user.id)
        .gte('preference_rating', 4) // Only show foods rated 4 or 5
        .order('preference_rating', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching favorites:', error);
      } else {
        setFoods(data || []);
      }
      setLoading(false);
    };

    fetchFavorites();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center mb-8">
        <Heart className="w-8 h-8 text-orange-500 mr-3 fill-current" />
        <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
      </div>

      {foods.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
          <Heart className="mx-auto h-16 w-16 text-gray-300" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No favorites yet</h3>
          <p className="mt-2 text-gray-500">Log some meals and rate them 4 or 5 stars to see them here.</p>
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
