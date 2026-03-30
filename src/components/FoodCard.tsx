import React from 'react';
import { FoodEntry } from '../lib/supabase';
import { MapPin, Star, ThumbsUp, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export default function FoodCard({ food }: { food: FoodEntry; key?: React.Key }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      {food.photo_url ? (
        <div className="h-48 w-full bg-gray-200 relative">
          <img 
            src={food.photo_url} 
            alt={food.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <div className="h-48 w-full bg-orange-50 flex items-center justify-center">
          <span className="text-orange-300 font-medium">No photo</span>
        </div>
      )}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{food.name}</h3>
        
        <div className="space-y-2 text-sm text-gray-600">
          {food.location && (
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-gray-400" />
              <span className="truncate">{food.location}</span>
            </div>
          )}
          
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
            <span>{format(new Date(food.created_at), 'MMM d, yyyy')}</span>
          </div>

          <div className="pt-3 flex items-center justify-between border-t border-gray-50 mt-3">
            <div className="flex items-center" title="Quality Rating">
              <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
              <span className="font-medium">{food.quality_rating}/5</span>
            </div>
            <div className="flex items-center" title="Preference Rating">
              <ThumbsUp className="w-4 h-4 mr-1 text-orange-500" />
              <span className="font-medium">{food.preference_rating}/5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
