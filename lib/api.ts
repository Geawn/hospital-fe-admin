import type { Doctor } from "@/types/doctor"

// Mock data
const mockDoctors: Doctor[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@hospital.com",
    specialization: "Cardiology",
    contactNumber: "+1 (555) 123-4567",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@hospital.com",
    specialization: "Neurology",
    contactNumber: "+1 (555) 987-6543",
  },
  {
    id: "3",
    firstName: "Robert",
    lastName: "Johnson",
    email: "robert.johnson@hospital.com",
    specialization: "Pediatrics",
    contactNumber: "+1 (555) 456-7890",
  },
  {
    id: "4",
    firstName: "Emily",
    lastName: "Williams",
    email: "emily.williams@hospital.com",
    specialization: "Dermatology",
    contactNumber: "+1 (555) 789-0123",
  },
  {
    id: "5",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@hospital.com",
    specialization: "Orthopedics",
    contactNumber: "+1 (555) 234-5678",
  },
]

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// API functions
export async function fetchDoctors(page: number, limit: number): Promise<Doctor[]> {
  await delay(500)
  return [...mockDoctors]
}

export async function fetchDoctorById(id: string): Promise<Doctor> {
  await delay(500)
  const doctor = mockDoctors.find((d) => d.id === id)
  if (!doctor) {
    throw new Error("Doctor not found")
  }
  return { ...doctor }
}

export async function createDoctor(data: Omit<Doctor, "id">): Promise<Doctor> {
  await delay(500)
  const newDoctor: Doctor = {
    id: Math.random().toString(36).substring(2, 11),
    ...data,
  }
  mockDoctors.push(newDoctor)
  return newDoctor
}

export async function updateDoctor(id: string, data: Omit<Doctor, "id">): Promise<Doctor> {
  await delay(500)
  const index = mockDoctors.findIndex((d) => d.id === id)
  if (index === -1) {
    throw new Error("Doctor not found")
  }
  const updatedDoctor: Doctor = {
    id,
    ...data,
  }
  mockDoctors[index] = updatedDoctor
  return updatedDoctor
}

export async function deleteDoctor(id: string): Promise<void> {
  await delay(500)
  const index = mockDoctors.findIndex((d) => d.id === id)
  if (index === -1) {
    throw new Error("Doctor not found")
  }
  mockDoctors.splice(index, 1)
}
