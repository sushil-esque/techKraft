import Header from "../components/Header";
import PropertyCard from "../components/PropertyCard";
import { Loader2 } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getFavorites, toggleFavorite } from "@/api/favorites";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { getAllProperties } from "@/api/properties";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Property } from "@/types";

function Dashboard() {
  const queryClient = useQueryClient();
  const { data: favorites, isLoading } = useQuery<Property[]>({
    queryKey: ["favorites"],
    queryFn: getFavorites,
  });
  const { data: properties, isLoading: isPropertisLoading } = useQuery<
    Property[]
  >({
    queryKey: ["properties"],
    queryFn: getAllProperties,
  });


  interface ToggleFavoriteResponse {
    favorite: {
      action: string;
    };
  }
  const {
    mutate: toggleFavoritemutate,
    isPending: isPendingToggleFavorite,
    variables: pendingId,
  } = useMutation({
    mutationFn: toggleFavorite,
    onSuccess: (data: ToggleFavoriteResponse) => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      toast.success(data.favorite.action);
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const handleToggleFavorite = async (propertyId: number) => {
    toggleFavoritemutate(propertyId);
  };

  const [activeTab, setActiveTab] = useState<"All" | "fav">("All");
  return (
    <>
      <Header />

      <div className="container mx-auto px-6 py-8 ">
        <section className="mt-7">
          {isLoading || isPropertisLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
          ) : (
            <>
              <div className="flex gap-2 mb-4">
                <Button
                  className="rounded-2xl p-4 cursor-pointer"
                  onClick={() => setActiveTab("All")}
                  variant={activeTab === "All" ? "default" : "outline"}
                >
                  All Properties
                  <Badge variant={"secondary"} className="border-gray-300">
                    {properties?.length}
                  </Badge>
                </Button>
                <Button
                  className="rounded-2xl p-4 cursor-pointer"
                  variant={activeTab === "fav" ? "default" : "outline"}
                  onClick={() => setActiveTab("fav")}
                >
                  My favorites
                  <Badge variant={"secondary"} className="border-gray-300">
                    {favorites?.length}
                  </Badge>
                </Button>
              </div>

              {activeTab === "All" ? (
                properties && properties.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {properties?.map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        onToggleFavorite={handleToggleFavorite}
                        isPendingToggleFavorite={
                          isPendingToggleFavorite && pendingId === property.id
                        }
                      />
                    ))}
                  </div>
                ) : (
                  <div className=" p-16 text-center">
                    <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"></div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      No properties yet
                    </h3>
                  </div>
                )
              ) : favorites && favorites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {favorites?.map((favorite) => (
                    <PropertyCard
                      key={favorite.id}
                      property={favorite}
                      onToggleFavorite={handleToggleFavorite}
                      isPendingToggleFavorite={
                        isPendingToggleFavorite && pendingId === favorite.id
                      }
                    />
                  ))}
                </div>
              ) : (
                <div className="  p-16 text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    No favourites yet
                  </h3>
                  <p className="text-gray-500 max-w-sm mx-auto mb-6">
                    You haven't saved any properties yet.
                  </p>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </>
  );
}

export default Dashboard;
