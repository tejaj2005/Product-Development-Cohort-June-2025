"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Trophy, Calendar, User } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()

  // Don't show navbar on game page
  if (pathname === "/game") {
    return null
  }

  return (
    <nav className="bg-white shadow-lg border-b-4 border-green-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-green-800">MLRIT Courts</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button
                variant={pathname === "/" ? "default" : "ghost"}
                className={pathname === "/" ? "bg-green-600 hover:bg-green-700" : "hover:bg-green-100"}
              >
                Home
              </Button>
            </Link>
            <Link href="/booking">
              <Button
                variant={pathname === "/booking" ? "default" : "ghost"}
                className={pathname === "/booking" ? "bg-green-600 hover:bg-green-700" : "hover:bg-green-100"}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Court
              </Button>
            </Link>
            <Link href="/profile">
              <Button
                variant={pathname === "/profile" ? "default" : "ghost"}
                className={pathname === "/profile" ? "bg-green-600 hover:bg-green-700" : "hover:bg-green-100"}
              >
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
