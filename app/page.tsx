import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Hospital } from "lucide-react"

export default function Home() {
  async function handleLogin(formData: FormData) {
    "use server"
    const role = formData.get("role") as string

    // Store the selected role in cookies or session
    // This is a mock implementation
    if (role) {
      redirect("/dashboard")
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="bg-blue-100 p-3 rounded-full">
            <Hospital className="h-10 w-10 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Hospital Management System</CardTitle>
          <CardDescription className="text-center">Select your role to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleLogin} className="space-y-4">
            <RadioGroup defaultValue="admin" name="role" className="space-y-3">
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="admin" id="admin" />
                <Label htmlFor="admin" className="font-medium">
                  Administrator
                </Label>
              </div>
              <div className="flex items-center space-x-2 border p-3 rounded-md opacity-50">
                <RadioGroupItem value="doctor" id="doctor" disabled />
                <Label htmlFor="doctor" className="font-medium">
                  Doctor
                </Label>
              </div>
              <div className="flex items-center space-x-2 border p-3 rounded-md opacity-50">
                <RadioGroupItem value="nurse" id="nurse" disabled />
                <Label htmlFor="nurse" className="font-medium">
                  Nurse
                </Label>
              </div>
              <div className="flex items-center space-x-2 border p-3 rounded-md opacity-50">
                <RadioGroupItem value="receptionist" id="receptionist" disabled />
                <Label htmlFor="receptionist" className="font-medium">
                  Receptionist
                </Label>
              </div>
            </RadioGroup>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
