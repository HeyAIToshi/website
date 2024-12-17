import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export default function Admin() {
  const [loading, setLoading] = useState(false)
  const [cakeData, setCakeData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null as File | null
  })
  const { toast } = useToast()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCakeData({ ...cakeData, image: e.target.files[0] })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!cakeData.image) throw new Error('Please select an image')

      // Upload image to Supabase Storage
      const fileExt = cakeData.image.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const { data: imageData, error: uploadError } = await supabase.storage
        .from('cakes')
        .upload(fileName, cakeData.image)

      if (uploadError) throw uploadError

      // Insert cake data into the database
      const { error: insertError } = await supabase
        .from('cakes')
        .insert([
          {
            name: cakeData.name,
            description: cakeData.description,
            price: parseFloat(cakeData.price),
            category: cakeData.category,
            image_url: imageData?.path
          }
        ])

      if (insertError) throw insertError

      toast({
        title: "Success!",
        description: "Cake added successfully",
      })

      // Reset form
      setCakeData({
        name: '',
        description: '',
        price: '',
        category: '',
        image: null
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Admin Panel</h1>
      
      <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Cake Name</Label>
          <Input
            id="name"
            value={cakeData.name}
            onChange={(e) => setCakeData({ ...cakeData, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={cakeData.description}
            onChange={(e) => setCakeData({ ...cakeData, description: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={cakeData.price}
            onChange={(e) => setCakeData({ ...cakeData, price: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={cakeData.category}
            onChange={(e) => setCakeData({ ...cakeData, category: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Cake Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Cake'}
        </Button>
      </form>
    </div>
  )
} 