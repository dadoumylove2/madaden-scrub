import { redirect } from "next/navigation"
import { getCurrentUser, isAdmin } from "@/lib/auth"
import { AdminDashboard } from "@/components/admin-dashboard"
import { AdminAccessDenied } from "@/components/admin-access-denied"

export default async function DashboardPage() {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      redirect("/sign-in")
    }

    const admin = await isAdmin()
    
    if (!admin) {
      return <AdminAccessDenied />
    }

    return <AdminDashboard />
  } catch (error) {
    console.error("Dashboard error:", error)
    redirect("/sign-in")
  }
}
