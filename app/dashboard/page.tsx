import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DoctorCount } from "@/components/doctor-count"
import { RecentDoctors } from "@/components/recent-doctors"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { UserPlus } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <Link href="/dashboard/doctors/new">
          <Button className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Add Doctor
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Doctors</CardTitle>
            <CardDescription>Current active doctors</CardDescription>
          </CardHeader>
          <CardContent>
            <DoctorCount />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Recently Added Doctors</CardTitle>
            <CardDescription>New doctors added to the system</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentDoctors />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
