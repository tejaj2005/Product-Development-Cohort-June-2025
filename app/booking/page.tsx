"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, MapPin, ArrowRight, Check } from "lucide-react"
import { useRouter } from "next/navigation"

const courts = [
  {
    id: 1,
    name: "Basketball Court A",
    type: "Basketball",
    capacity: 10,
    price: 200,
    description: "Premium indoor basketball court with professional hoops and LED lighting",
    amenities: ["Professional Hoops", "LED Lighting", "Air Conditioning", "Sound System"],
  },
  {
    id: 2,
    name: "Basketball Court B",
    type: "Basketball",
    capacity: 10,
    price: 200,
    description: "Secondary basketball court perfect for practice sessions and casual games",
    amenities: ["Standard Hoops", "Good Lighting", "Ventilation", "Equipment Storage"],
  },
  {
    id: 3,
    name: "Tennis Court 1",
    type: "Tennis",
    capacity: 4,
    price: 150,
    description: "Regulation tennis court with high-quality surface and professional nets",
    amenities: ["Regulation Size", "Quality Surface", "Professional Nets", "Seating Area"],
  },
  {
    id: 4,
    name: "Tennis Court 2",
    type: "Tennis",
    capacity: 4,
    price: 150,
    description: "Well-maintained tennis court ideal for competitive matches",
    amenities: ["Standard Size", "Good Surface", "Quality Nets", "Lighting"],
  },
  {
    id: 5,
    name: "Badminton Court 1",
    type: "Badminton",
    capacity: 4,
    price: 100,
    description: "Indoor badminton court with proper ventilation and equipment storage",
    amenities: ["Indoor Court", "Proper Ventilation", "Equipment Storage", "Wooden Floor"],
  },
  {
    id: 6,
    name: "Badminton Court 2",
    type: "Badminton",
    capacity: 4,
    price: 100,
    description: "Secondary badminton court perfect for casual games and practice",
    amenities: ["Indoor Court", "Good Ventilation", "Basic Equipment", "Synthetic Floor"],
  },
  {
    id: 7,
    name: "Cricket Ground",
    type: "Cricket",
    capacity: 22,
    price: 500,
    description: "Full-size cricket ground with well-maintained pitch and spectator seating",
    amenities: ["Well-maintained Pitch", "Boundary Markers", "Spectator Seating", "Pavilion"],
  },
]

const timeSlots = [
  "06:00 - 07:00",
  "07:00 - 08:00",
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
  "18:00 - 19:00",
  "19:00 - 20:00",
  "20:00 - 21:00",
  "21:00 - 22:00",
]

const sportColors = {
  Basketball: "#f97316",
  Tennis: "#22c55e",
  Badminton: "#3b82f6",
  Cricket: "#ef4444",
}

export default function BookingPage() {
  const [step, setStep] = useState(1) // 1: Select Court, 2: Booking Details
  const [selectedCourt, setSelectedCourt] = useState<(typeof courts)[0] | null>(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [playerName, setPlayerName] = useState("")
  const [playerEmail, setPlayerEmail] = useState("")
  const [notes, setNotes] = useState("")
  const router = useRouter()

  const handleCourtSelection = (court: (typeof courts)[0]) => {
    setSelectedCourt(court)
    setStep(2)
  }

  const handleBooking = () => {
    if (!selectedCourt || !selectedDate || !selectedTime || !playerName || !playerEmail) {
      alert("Please fill in all required fields!")
      return
    }

    const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]")
    const newBooking = {
      id: Date.now(),
      court: selectedCourt,
      date: selectedDate,
      time: selectedTime,
      playerName,
      playerEmail,
      notes,
      status: "Confirmed",
      bookedAt: new Date().toISOString(),
    }

    existingBookings.push(newBooking)
    localStorage.setItem("bookings", JSON.stringify(existingBookings))

    alert("Booking confirmed successfully!")
    router.push("/profile")
  }

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold font-poppins text-gray-900 mb-4">
            Book Your <span className="text-green-600">Perfect Court</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our premium sports facilities and secure your game time in just a few clicks
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                step >= 1 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              {step > 1 ? <Check className="w-5 h-5" /> : "1"}
            </div>
            <span className={`font-medium ${step >= 1 ? "text-green-600" : "text-gray-500"}`}>Select Court</span>
            <ArrowRight className="w-5 h-5 text-gray-400" />
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                step >= 2 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              2
            </div>
            <span className={`font-medium ${step >= 2 ? "text-green-600" : "text-gray-500"}`}>Booking Details</span>
          </div>
        </div>

        {step === 1 ? (
          /* Court Selection */
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold font-poppins text-gray-900 mb-4">Choose Your Court</h2>
              <p className="text-gray-600">Select from our available sports facilities</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courts.map((court) => (
                <Card
                  key={court.id}
                  className="hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-green-300 bg-white/80 backdrop-blur-sm"
                  onClick={() => handleCourtSelection(court)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <Badge
                        className="text-white font-medium"
                        style={{ backgroundColor: sportColors[court.type as keyof typeof sportColors] }}
                      >
                        {court.type}
                      </Badge>
                      <div className="text-2xl font-bold text-green-600">₹{court.price}/hr</div>
                    </div>

                    {/* Illustration Space */}
                    <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 flex items-center justify-center border-2 border-dashed border-gray-300">
                      <div className="text-center">
                        <div
                          className="text-3xl mb-2"
                          style={{ color: sportColors[court.type as keyof typeof sportColors] }}
                        >
                          🎨
                        </div>
                        <div className="text-sm text-gray-500">{court.type} Illustration</div>
                      </div>
                    </div>

                    <CardTitle className="text-xl font-poppins font-bold text-gray-900">{court.name}</CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed">{court.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Users className="w-4 h-4 text-green-600" />
                        <span>Capacity: {court.capacity} players</span>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-900">Amenities:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {court.amenities.map((amenity, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: sportColors[court.type as keyof typeof sportColors] }}
                              ></div>
                              {amenity}
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button
                        className="w-full font-semibold rounded-xl py-3 transition-all hover:scale-105"
                        style={{ backgroundColor: sportColors[court.type as keyof typeof sportColors] }}
                      >
                        Select This Court
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          /* Booking Details */
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-green-800 text-2xl font-poppins">
                        <Calendar className="w-6 h-6" />
                        Booking Details
                      </CardTitle>
                      <CardDescription className="text-lg">
                        Complete your reservation for {selectedCourt?.name}
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="border-green-300 text-green-700 hover:bg-green-50"
                    >
                      Change Court
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="date" className="text-base font-semibold">
                        Date *
                      </Label>
                      <Input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="mt-2 h-12 text-base"
                      />
                    </div>

                    <div>
                      <Label htmlFor="time" className="text-base font-semibold">
                        Time Slot *
                      </Label>
                      <Select value={selectedTime} onValueChange={setSelectedTime}>
                        <SelectTrigger className="mt-2 h-12 text-base">
                          <SelectValue placeholder="Choose time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot} className="text-base">
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-base font-semibold">
                        Your Name *
                      </Label>
                      <Input
                        placeholder="Enter your full name"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        className="mt-2 h-12 text-base"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-base font-semibold">
                        Email *
                      </Label>
                      <Input
                        type="email"
                        placeholder="your.email@mlrit.ac.in"
                        value={playerEmail}
                        onChange={(e) => setPlayerEmail(e.target.value)}
                        className="mt-2 h-12 text-base"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes" className="text-base font-semibold">
                      Additional Notes
                    </Label>
                    <Textarea
                      placeholder="Any special requirements, number of players, or additional information..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="mt-2 min-h-[100px] text-base"
                    />
                  </div>

                  <Button
                    onClick={handleBooking}
                    className="w-full bg-green-600 hover:bg-green-700 font-semibold text-lg py-4 rounded-xl"
                    size="lg"
                  >
                    Confirm Booking - ₹{selectedCourt?.price}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary - Fixed Sticky */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                <Card className="bg-white/90 backdrop-blur-sm border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-800 text-xl font-poppins">Booking Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedCourt && (
                      <>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-green-600" />
                            <div>
                              <p className="font-semibold text-lg">{selectedCourt.name}</p>
                              <p className="text-sm text-gray-600">{selectedCourt.type} Court</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <Users className="w-5 h-5 text-green-600" />
                            <p>Capacity: {selectedCourt.capacity} players</p>
                          </div>

                          {selectedDate && (
                            <div className="flex items-center gap-3">
                              <Calendar className="w-5 h-5 text-green-600" />
                              <p>
                                {new Date(selectedDate).toLocaleDateString("en-US", {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </p>
                            </div>
                          )}

                          {selectedTime && (
                            <div className="flex items-center gap-3">
                              <Clock className="w-5 h-5 text-green-600" />
                              <p>{selectedTime}</p>
                            </div>
                          )}
                        </div>

                        <div className="border-t pt-4">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-lg">Total Cost:</span>
                            <span className="text-2xl font-bold text-green-600">₹{selectedCourt.price}</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">Per hour booking</p>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Court Preview */}
                <Card className="bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Court Preview</h3>
                    {/* Illustration Space */}
                    <div className="w-full h-40 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center border-2 border-dashed border-green-300">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🎨</div>
                        <div className="text-sm text-gray-600">Court Layout Illustration</div>
                        <div className="text-xs text-gray-500 mt-1">Add your custom court diagram</div>
                      </div>
                    </div>
                    <p className="text-center text-sm text-green-700 mt-4 font-medium">MLRIT Sports Complex</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
