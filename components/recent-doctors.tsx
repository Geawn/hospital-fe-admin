"use client"

import { useEffect, useState } from "react"
import { fetchDoctors } from "@/lib/api"
import type { Doctor } from "@/types/doctor"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function RecentDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const data = await fetchDoctors(1, 5)
        setDoctors(data)
      } catch (error) {
        console.error("Failed to load recent doctors", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadDoctors()
  }, [])

  if (isLoading) {
    return <div>Loading recent doctors...</div>
  }

  if (doctors.length === 0) {
    return <div>No doctors found</div>
  }

  return (
    <div className="space-y-4">
      {doctors.map((doctor) => (
        <Link
          key={doctor.id}
          href={`/dashboard/doctors/${doctor.id}`}
          className="flex items-center gap-4 rounded-lg border p-3 transition-colors hover:bg-muted/50"
        >
          <Avatar>
            <AvatarFallback>
              {doctor.firstName.charAt(0)}
              {doctor.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="font-medium">
              {doctor.firstName} {doctor.lastName}
            </p>
            <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
