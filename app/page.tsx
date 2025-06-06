import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-6xl font-bold font-poppins bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent leading-tight">
                  Book Your Perfect Court at MLRIT
                </h1>
                <p className="text-2xl text-green-100 font-light leading-relaxed">
                  Experience world-class sports facilities right at your campus. Reserve basketball, tennis, badminton,
                  and cricket courts with our seamless booking system.
                </p>
                <p className="text-lg text-green-200">
                  Join thousands of students who stay active, compete with friends, and make the most of their college
                  experience through sports.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/booking">
                  <Button
                    size="lg"
                    className="bg-white text-green-700 hover:bg-green-50 font-semibold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    Start Booking Now
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-green-700 font-semibold px-8 py-4 text-lg rounded-xl transition-all"
                  >
                    View My Bookings
                  </Button>
                </Link>
              </div>
            </div>

            {/* Illustration Space */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 h-96 flex items-center justify-center border border-white/20">
                <div className="text-center space-y-4">
                  <div className="text-6xl">🏟️</div>
                  <p className="text-white/80 font-medium">Sports Illustration Space</p>
                  <p className="text-white/60 text-sm">Add your custom illustration here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Active Students", color: "text-green-600" },
              { number: "7", label: "Premium Courts", color: "text-blue-600" },
              { number: "16", label: "Hours Daily", color: "text-purple-600" },
              { number: "98%", label: "Satisfaction Rate", color: "text-orange-600" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-5xl font-bold font-poppins ${stat.color} mb-2`}>{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - keep existing but update styling */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold font-poppins text-gray-900 mb-6">
              Why Choose <span className="text-green-600">MLRIT Courts?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Experience premium sports facilities with cutting-edge technology, professional maintenance, and a
              community of passionate athletes. Our booking system makes it effortless to secure your game time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow border-green-200">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-green-800">Easy Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Book your favorite court in just a few clicks. Simple and hassle-free process.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-green-200">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-green-800">Flexible Timing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Available from 6 AM to 10 PM. Choose the time that works best for you.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-green-200">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-green-800">Prime Location</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Located right in the heart of MLRIT campus for easy access.</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow border-green-200">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-green-800">Group Friendly</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Perfect for solo practice or group games with friends and classmates.</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Available Courts - update with illustration spaces */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold font-poppins text-gray-900 mb-6">
              Premium <span className="text-green-600">Sports Facilities</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              State-of-the-art courts designed for optimal performance, safety, and enjoyment. Each facility is
              maintained to professional standards with modern equipment and amenities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Basketball",
                color: "#f97316",
                description:
                  "Full-size courts with professional hoops, LED lighting, and premium flooring for the ultimate basketball experience.",
                features: ["Professional Hoops", "LED Lighting", "Premium Flooring"],
              },
              {
                name: "Tennis",
                color: "#22c55e",
                description:
                  "Regulation tennis courts with high-quality surfaces, nets, and surrounding amenities for competitive play.",
                features: ["Regulation Size", "Quality Surface", "Professional Nets"],
              },
              {
                name: "Badminton",
                color: "#3b82f6",
                description:
                  "Indoor badminton courts with proper ventilation, lighting, and equipment storage facilities.",
                features: ["Indoor Courts", "Proper Ventilation", "Equipment Storage"],
              },
              {
                name: "Cricket",
                color: "#ef4444",
                description:
                  "Spacious cricket ground with well-maintained pitch, boundary markers, and spectator seating.",
                features: ["Well-maintained Pitch", "Boundary Markers", "Spectator Seating"],
              },
            ].map((sport, index) => (
              <Card
                key={index}
                className="hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
              >
                <CardHeader className="text-center pb-4">
                  {/* Illustration Space */}
                  <div className="w-24 h-24 mx-auto mb-4 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <div className="text-2xl mb-1" style={{ color: sport.color }}>
                        🎨
                      </div>
                      <div className="text-xs text-gray-500">Illustration</div>
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-poppins font-bold" style={{ color: sport.color }}>
                    {sport.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-gray-600 leading-relaxed">{sport.description}</p>
                  <div className="space-y-2">
                    {sport.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center justify-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: sport.color }}></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Link href="/booking">
                    <Button
                      className="w-full font-semibold rounded-xl py-3 transition-all hover:scale-105"
                      style={{ backgroundColor: sport.color }}
                    >
                      Book {sport.name} Court
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
