import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Button } from "@/components/ui/button"
import { Share2 } from 'lucide-react'
import { toast } from 'sonner'

interface Cake {
  id: number
  name: string
  description: string
  price: number
  category: string
  image_url: string
  ingredients?: string[]
  allergens?: string[]
  nutrition_info?: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
  preparation_time?: number
  serving_size?: string
  storage_instructions?: string
}

export default function CakeDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [cake, setCake] = useState<Cake | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCake()
  }, [id])

  const fetchCake = async () => {
    try {
      const { data, error } = await supabase
        .from('cakes')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) throw error
      
      if (data) {
        setCake(data)
      }
    } catch (error) {
      console.error('Error fetching cake:', error)
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          text: `Check out this amazing ${cake?.name} from Cake Shop!\n`,
          url: window.location.href
        })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        toast.success("Link copied to clipboard!")
      }
    } catch (error) {
      console.error('Error sharing:', error)
      // Only show error if it's not just user canceling the share dialog
      if (error instanceof Error && error.name !== 'AbortError') {
        toast.error("Failed to share. Link copied to clipboard instead.")
      }
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (!cake) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Cake not found</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Button variant="outline" onClick={() => navigate('/')}>
            ← Back to Menu
          </Button>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/cakes/${cake.image_url}`}
              alt={cake.name}
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{cake.name}</h1>
              <p className="text-xl text-gray-600 mb-4">{cake.description}</p>
              <div className="text-3xl font-bold text-primary mb-6">
                ₹{cake.price.toFixed(2)}
              </div>
              <Button size="lg" className="w-full">
                Order Now
              </Button>
            </div>

            {cake.ingredients && (
              <div>
                <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
                <ul className="list-disc list-inside text-gray-600">
                  {cake.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            )}

            {cake.allergens && (
              <div>
                <h2 className="text-2xl font-semibold mb-2">Allergens</h2>
                <div className="flex flex-wrap gap-2">
                  {cake.allergens.map((allergen, index) => (
                    <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full">
                      {allergen}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {cake.nutrition_info && (
              <div>
                <h2 className="text-2xl font-semibold mb-2">Nutrition Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Calories</div>
                    <div className="text-lg font-semibold">{cake.nutrition_info.calories}kcal</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Protein</div>
                    <div className="text-lg font-semibold">{cake.nutrition_info.protein}g</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Carbs</div>
                    <div className="text-lg font-semibold">{cake.nutrition_info.carbs}g</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">Fat</div>
                    <div className="text-lg font-semibold">{cake.nutrition_info.fat}g</div>
                  </div>
                </div>
              </div>
            )}

            {cake.preparation_time && (
              <div>
                <h2 className="text-2xl font-semibold mb-2">Preparation Time</h2>
                <p className="text-gray-600">{cake.preparation_time} minutes</p>
              </div>
            )}

            {cake.serving_size && (
              <div>
                <h2 className="text-2xl font-semibold mb-2">Serving Size</h2>
                <p className="text-gray-600">{cake.serving_size}</p>
              </div>
            )}

            {cake.storage_instructions && (
              <div>
                <h2 className="text-2xl font-semibold mb-2">Storage Instructions</h2>
                <p className="text-gray-600">{cake.storage_instructions}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 