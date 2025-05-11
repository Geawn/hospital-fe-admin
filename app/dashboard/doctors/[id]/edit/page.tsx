"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { fetchDoctorById, updateDoctor } from "@/lib/api"
import type { Doctor } from "@/types/doctor"
import { ArrowLeft } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { z } from "zod"

const doctorSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  specialization: z.string().min(1, "Specialization is required"),
  contactNumber: z.string().min(1, "Contact number is required"),
})

export default function EditDoctorPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const loadDoctor = async () => {
      if (typeof params.id !== "string") return

      setIsLoading(true)
      try {
        const data = await fetchDoctorById(params.id)
        setDoctor(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load doctor details",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadDoctor()
  }, [params.id, toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (!doctor) return

    setDoctor({
      ...doctor,
      [name]: value,
    })

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!doctor) return

    try {
      // Validate form
      const validatedData = doctorSchema.parse(doctor)

      setIsSaving(true)
      await updateDoctor(doctor.id, validatedData)
      toast({
        title: "Success",
        description: "Doctor updated successfully",
      })
      router.push(`/dashboard/doctors/${doctor.id}`)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message
          }
        })
        setErrors(fieldErrors)
      } else {
        toast({
          title: "Error",
          description: "Failed to update doctor",
          variant: "destructive",
        })
      }
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading...</p>
      </div>
    )
  }

  if (!doctor) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p>Doctor not found</p>
        <Button asChild>
          <Link href="/dashboard/doctors">Back to Doctors</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/dashboard/doctors/${doctor.id}`}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Edit Doctor</h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Doctor Information</CardTitle>
            <CardDescription>Update the doctor&apos;s information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" value={doctor.firstName} onChange={handleChange} required />
                {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" value={doctor.lastName} onChange={handleChange} required />
                {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={doctor.email} onChange={handleChange} required />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Input
                id="specialization"
                name="specialization"
                value={doctor.specialization}
                onChange={handleChange}
                required
              />
              {errors.specialization && <p className="text-sm text-red-500">{errors.specialization}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input
                id="contactNumber"
                name="contactNumber"
                value={doctor.contactNumber}
                onChange={handleChange}
                required
              />
              {errors.contactNumber && <p className="text-sm text-red-500">{errors.contactNumber}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href={`/dashboard/doctors/${doctor.id}`}>Cancel</Link>
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
