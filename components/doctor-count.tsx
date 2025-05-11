"use client"

import { useEffect, useState } from "react"
import { fetchDoctors } from "@/lib/api"

export function DoctorCount() {
  const [count, setCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadCount = async () => {
      try {
        const doctors = await fetchDoctors(1, 100)
        setCount(doctors.length)
      } catch (error) {
        console.error("Failed to load doctor count", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadCount()
  }, [])

  if (isLoading) {
    return <div className="text-3xl font-bold">...</div>
  }

  return <div className="text-3xl font-bold">{count}</div>
}
