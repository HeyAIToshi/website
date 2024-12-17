import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useSearchParams } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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

export default function AdminIndex() {
  const [searchParams] = useSearchParams()
  const isAuthorized = searchParams.get('password') === 'anam'
  const [cakes, setCakes] = useState<Cake[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedCake, setSelectedCake] = useState<Cake | null>(null)
  const [formData, setFormData] = useState<Partial<Cake>>({
    name: '',
    description: '',
    price: 0,
    category: '',
    ingredients: [],
    allergens: [],
    nutrition_info: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    },
    preparation_time: 0,
    serving_size: '',
    storage_instructions: ''
  })

  if (!isAuthorized) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
          <p className="text-gray-600">You do not have permission to access this page.</p>
        </div>
      </div>
    )
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
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
      }
    } catch (error) {
      console.error('Error fetching cakes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data, error } = selectedCake
        ? await supabase
            .from('cakes')
            .update(formData)
            .eq('id', selectedCake.id)
        : await supabase
            .from('cakes')
            .insert([formData])

      if (error) throw error

      setIsDialogOpen(false)
      fetchCakes()
    } catch (error) {
      console.error('Error saving cake:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this cake?')) {
      try {
        const { error } = await supabase
          .from('cakes')
          .delete()
          .eq('id', id)

        if (error) throw error

        fetchCakes()
      } catch (error) {
        console.error('Error deleting cake:', error)
      }
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
      const { error: uploadError } = await supabase.storage
        .from('cakes')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      setFormData(prev => ({
        ...prev,
        image_url: fileName
      }))
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Cake Management</h1>
        <Button onClick={() => {
          setSelectedCake(null)
          setFormData({
            name: '',
            description: '',
            price: 0,
            category: '',
            ingredients: [],
            allergens: [],
            nutrition_info: {
              calories: 0,
              protein: 0,
              carbs: 0,
              fat: 0
            },
            preparation_time: 0,
            serving_size: '',
            storage_instructions: ''
          })
          setIsDialogOpen(true)
        }}>
          Add New Cake
        </Button>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cakes.map((cake) => (
              <TableRow key={cake.id}>
                <TableCell>
                  <img
                    src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/cakes/${cake.image_url}`}
                    alt={cake.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </TableCell>
                <TableCell>{cake.name}</TableCell>
                <TableCell>{cake.category}</TableCell>
                <TableCell>${cake.price.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedCake(cake)
                        setFormData(cake)
                        setIsDialogOpen(true)
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(cake.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedCake ? 'Edit Cake' : 'Add New Cake'}</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-sm">Name</label>
                    <Input
                      value={formData.name}
                      onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm">Category</label>
                    <Input
                      value={formData.category}
                      onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm">Price</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={e => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                      required
                    />
                  </div>

                  <div className="col-span-3 space-y-1">
                    <label className="text-sm">Image</label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      required={!selectedCake}
                    />
                  </div>

                  <div className="col-span-3 space-y-1">
                    <label className="text-sm">Description</label>
                    <Textarea
                      value={formData.description}
                      onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      required
                      className="h-20"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm">Ingredients</label>
                    <Input
                      value={formData.ingredients?.join(', ')}
                      onChange={e => setFormData(prev => ({ ...prev, ingredients: e.target.value.split(',').map(i => i.trim()) }))}
                      placeholder="Comma-separated"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm">Allergens</label>
                    <Input
                      value={formData.allergens?.join(', ')}
                      onChange={e => setFormData(prev => ({ ...prev, allergens: e.target.value.split(',').map(i => i.trim()) }))}
                      placeholder="Comma-separated"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm">Preparation Time (min)</label>
                    <Input
                      type="number"
                      value={formData.preparation_time}
                      onChange={e => setFormData(prev => ({ ...prev, preparation_time: parseInt(e.target.value) }))}
                    />
                  </div>

                  <div className="col-span-3 grid grid-cols-4 gap-3">
                    <div className="space-y-1">
                      <label className="text-sm">Calories</label>
                      <Input
                        type="number"
                        value={formData.nutrition_info?.calories}
                        onChange={e => setFormData(prev => ({
                          ...prev,
                          nutrition_info: {
                            ...prev.nutrition_info,
                            calories: parseInt(e.target.value)
                          }
                        }))}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm">Protein (g)</label>
                      <Input
                        type="number"
                        value={formData.nutrition_info?.protein}
                        onChange={e => setFormData(prev => ({
                          ...prev,
                          nutrition_info: {
                            ...prev.nutrition_info,
                            protein: parseInt(e.target.value)
                          }
                        }))}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm">Carbs (g)</label>
                      <Input
                        type="number"
                        value={formData.nutrition_info?.carbs}
                        onChange={e => setFormData(prev => ({
                          ...prev,
                          nutrition_info: {
                            ...prev.nutrition_info,
                            carbs: parseInt(e.target.value)
                          }
                        }))}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm">Fat (g)</label>
                      <Input
                        type="number"
                        value={formData.nutrition_info?.fat}
                        onChange={e => setFormData(prev => ({
                          ...prev,
                          nutrition_info: {
                            ...prev.nutrition_info,
                            fat: parseInt(e.target.value)
                          }
                        }))}
                      />
                    </div>
                  </div>

                  <div className="col-span-2 space-y-1">
                    <label className="text-sm">Serving Size</label>
                    <Input
                      value={formData.serving_size}
                      onChange={e => setFormData(prev => ({ ...prev, serving_size: e.target.value }))}
                    />
                  </div>

                  <div className="col-span-3 space-y-1">
                    <label className="text-sm">Storage Instructions</label>
                    <Textarea
                      value={formData.storage_instructions}
                      onChange={e => setFormData(prev => ({ ...prev, storage_instructions: e.target.value }))}
                      className="h-20"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {selectedCake ? 'Update' : 'Create'} Cake
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
} 