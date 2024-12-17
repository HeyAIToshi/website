import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Share2, ChevronRight } from 'lucide-react'

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

export default function Index() {
  const navigate = useNavigate()
  const [cakes, setCakes] = useState<Cake[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>("all")
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    fetchCakes()
  }, [])

  const fetchCakes = async () => {
    try {
      const { data, error } = await supabase
        .from('cakes')
        .select('*')
      
      if (error) throw error
      
      if (data) {
        setCakes(data)
        // Extract unique categories
        const uniqueCategories = [...new Set(data.map(cake => cake.category))]
        setCategories(uniqueCategories)
      }
    } catch (error) {
      console.error('Error fetching cakes:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredCakes = cakes.filter(cake => {
    const matchesSearch = cake.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cake.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || cake.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleShare = async (cake: Cake) => {
    try {
      await navigator.share({
        title: cake.name,
        text: cake.description,
        url: `${window.location.origin}/cake/${cake.id}`
      })
    } catch (error) {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/cake/${cake.id}`)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">Whiskers & Whisks Bakery</h1>
        <p className="text-xl text-gray-600">Purr-fectly Baked Just for You!</p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-8">
        <Input
          placeholder="Search cakes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
        <Select
          value={selectedCategory || undefined}
          onValueChange={setSelectedCategory}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Cakes Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCakes.map((cake) => (
            <div
              key={cake.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/cakes/${cake.image_url}`}
                  alt={cake.name}
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleShare(cake)
                    }}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{cake.name}</h3>
                <p className="text-gray-600 mb-4">{cake.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">${cake.price.toFixed(2)}</span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/cake/${cake.id}`)}
                    >
                      Details <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button onClick={(e) => {
                      e.stopPropagation()
                      // Handle order logic here
                    }}>Order</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredCakes.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">
            No cakes found matching your criteria
          </div>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchTerm('')
              setSelectedCategory('all')
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}