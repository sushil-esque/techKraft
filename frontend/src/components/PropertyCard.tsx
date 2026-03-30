import { Heart, MapPin, Loader2 } from "lucide-react";
import type { Property } from "@/types";


interface PropertyCardProps {
  property: Property;
  onToggleFavorite: (id: number) => void;
  isPendingToggleFavorite: boolean;
}

function PropertyCard({ property, onToggleFavorite, isPendingToggleFavorite }: PropertyCardProps) {
  return (
    <div className="bg-white relative p-4 rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(property.id);
        }}
        disabled={isPendingToggleFavorite}
        className={`absolute top-4 right-4 p-2 rounded-full shadow-sm transition-all duration-300 z-10 ${
          isPendingToggleFavorite
            ? "bg-gray-100 cursor-wait opacity-70"
            : property.isFavorite
            ? "bg-red-50 text-black"
            : "bg-white/90 text-gray-400  hover:bg-white"
        } hover:scale-110 active:scale-95 disabled:pointer-events-none`}
      >
        {isPendingToggleFavorite ? (
          <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
        ) : (
          <Heart
            className={`w-5 h-5 transition-transform duration-300 ${
              property.isFavorite ? "fill-current scale-110" : "group-hover:scale-110"
            }`}
          />
        )}
      </button>
      <div>
        <div className="font-semibold mb-2">{property.title}</div>
        <div className="text-gray-600 mb-2">{property.description}</div>
        <div className=" border-t">
          <div className="flex justify-between mt-2">
            <div className="flex items-center">
              <MapPin size={20} /> {property.location}
            </div>
            <div>Rs {property.price}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
