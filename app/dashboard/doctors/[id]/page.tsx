"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchDoctorById, deleteDoctor } from "@/lib/api"
import type { Doctor } from "@/types/doctor"
import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function DoctorDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [isLoading, setIsLoading] = useState(true)

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

  const handleDelete = async () => {
    if (!doctor) return

    try {
      await deleteDoctor(doctor.id)
      toast({
        title: "Success",
        description: "Doctor deleted successfully",
      })
      router.push("/dashboard/doctors")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete doctor",
        variant: "destructive",
      })
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/doctors">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Doctor Details</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href={`/dashboard/doctors/${doctor.id}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the doctor&apos;s record from the system.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={handleDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Doctor&apos;s personal and contact details</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">First Name</h3>
            <p className="mt-1 text-lg">{doctor.firstName}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Last Name</h3>
            <p className="mt-1 text-lg">{doctor.lastName}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
            <p className="mt-1 text-lg">{doctor.email}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Contact Number</h3>
            <p className="mt-1 text-lg">{doctor.contactNumber}</p>
          </div>
          <div className="sm:col-span-2">
            <h3 className="text-sm font-medium text-muted-foreground">Specialization</h3>
            <p className="mt-1 text-lg">{doctor.specialization}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
