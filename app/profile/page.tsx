"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Trash2, User } from "lucide-react"
import Link from "next/link"

interface Booking {
  id: number
  court: {
    name: string
    type: string
    price: number
  }
  date: string
  time: string
  playerName: string
  playerEmail: string
  notes: string
  status: string
  bookedAt: string
}

export default function ProfilePage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingBookings: 0,
    totalSpent: 0,
  })

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("bookings") || "[]")
    setBookings(savedBookings)

    // Calculate stats
    const now = new Date()
    const upcoming = savedBookings.filter((booking: Booking) => new Date(booking.date) >= now)
    const totalSpent = savedBookings.reduce((sum: number, booking: Booking) => sum + booking.court.price, 0)

    setStats({
      totalBookings: savedBookings.length,
      upcomingBookings: upcoming.length,
      totalSpent,
    })
  }, [])

  const cancelBooking = (bookingId: number) => {
    const updatedBookings = bookings.filter((booking) => booking.id !== bookingId)
    setBookings(updatedBookings)
    localStorage.setItem("bookings", JSON.stringify(updatedBookings))

    // Update stats
    const now = new Date()
    const upcoming = updatedBookings.filter((booking) => new Date(booking.date) >= now)
    const totalSpent = updatedBookings.reduce((sum, booking) => sum + booking.court.price, 0)

    setStats({
      totalBookings: updatedBookings.length,
      upcomingBookings: upcoming.length,
      totalSpent,
    })
  }

  const getStatusColor = (date: string) => {
    const bookingDate = new Date(date)
    const now = new Date()

    if (bookingDate < now) {
      return "bg-gray-500"
    } else if (bookingDate.toDateString() === now.toDateString()) {
      return "bg-green-500"
    } else {
      return "bg-blue-500"
    }
  }

  const getStatusText = (date: string) => {
    const bookingDate = new Date(date)
    const now = new Date()

    if (bookingDate < now) {
      return "Completed"
    } else if (bookingDate.toDateString() === now.toDateString()) {
      return "Today"
    } else {
      return "Upcoming"
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Profile</h1>
          <p className="text-xl text-gray-600">Manage your court bookings and view your activity</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center border-green-200 bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="text-4xl font-bold font-poppins text-green-600">{stats.totalBookings}</CardTitle>
              <CardDescription className="text-lg font-medium">Total Bookings</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="text-4xl font-bold font-poppins text-blue-600">{stats.upcomingBookings}</CardTitle>
              <CardDescription className="text-lg font-medium">Upcoming Bookings</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="text-4xl font-bold font-poppins text-purple-600">₹{stats.totalSpent}</CardTitle>
              <CardDescription className="text-lg font-medium">Total Spent</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Profile Illustration */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold font-poppins text-green-800">Welcome Back, Sports Champion! 🏆</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Keep track of all your court bookings, manage your schedule, and never miss a game. Your active
                lifestyle starts here at MLRIT Sports Complex.
              </p>

              {/* Illustration Space */}
              <div className="w-full max-w-md mx-auto h-48 bg-white/50 rounded-2xl flex items-center justify-center border-2 border-dashed border-green-300 mt-6">
                <div className="text-center">
                  <div className="text-5xl mb-3">🎨</div>
                  <div className="text-lg font-medium text-gray-700">Player Profile Illustration</div>
                  <div className="text-sm text-gray-500 mt-1">Add your custom sports player illustration</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bookings Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
          <Link href="/booking">
            <Button className="bg-green-600 hover:bg-green-700">Book New Court</Button>
          </Link>
        </div>

        {bookings.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
              <p className="text-gray-600 mb-6">Start by booking your first court!</p>
              <Link href="/booking">
                <Button className="bg-green-600 hover:bg-green-700">Book Your First Court</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-green-800">{booking.court.name}</CardTitle>
                      <CardDescription>{booking.court.type} Court</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(booking.date)}>{getStatusText(booking.date)}</Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => cancelBooking(booking.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-green-600" />
                      <span>{new Date(booking.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-green-600" />
                      <span>{booking.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-600" />
                      <span>₹{booking.court.price}</span>
                    </div>
                  </div>
                  {booking.notes && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{booking.notes}</p>
                    </div>
                  )}
                  <div className="mt-4 text-xs text-gray-500">
                    Booked on {new Date(booking.bookedAt).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
