"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CricketGame() {
  const [score, setScore] = useState(0)
  const [ballsLeft, setBallsLeft] = useState(6)
  const [gameOver, setGameOver] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [ballPosition, setBallPosition] = useState(50)
  const [batPosition, setBatPosition] = useState(50)
  const [isSwinging, setIsSwinging] = useState(false)
  const [ballSpeed, setBallSpeed] = useState(2)

  const resetGame = () => {
    setScore(0)
    setBallsLeft(6)
    setGameOver(false)
    setGameStarted(false)
    setBallPosition(50)
    setBatPosition(50)
    setIsSwinging(false)
    setBallSpeed(2)
  }

  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
  }

  const swing = useCallback(() => {
    if (!gameStarted || gameOver || isSwinging) return

    setIsSwinging(true)

    // Check if bat hits ball (within 10% range)
    const hitRange = 10
    const distance = Math.abs(ballPosition - batPosition)

    if (distance <= hitRange) {
      // Hit! Add random score between 1-6
      const runs = Math.floor(Math.random() * 6) + 1
      setScore((prev) => prev + runs)
    }

    setBallsLeft((prev) => prev - 1)

    setTimeout(() => {
      setIsSwinging(false)
      // Reset ball position for next ball
      setBallPosition(Math.random() * 80 + 10)
      setBallSpeed((prev) => prev + 0.2) // Increase difficulty
    }, 500)
  }, [gameStarted, gameOver, isSwinging, ballPosition, batPosition])

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault()
        swing()
      } else if (e.code === "ArrowLeft") {
        setBatPosition((prev) => Math.max(10, prev - 10))
      } else if (e.code === "ArrowRight") {
        setBatPosition((prev) => Math.min(90, prev + 10))
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [swing])

  // Game over check
  useEffect(() => {
    if (ballsLeft <= 0) {
      setGameOver(true)
      setGameStarted(false)
    }
  }, [ballsLeft])

  // Ball animation
  useEffect(() => {
    if (!gameStarted || gameOver) return

    const interval = setInterval(() => {
      setBallPosition((prev) => {
        const newPos = prev + (Math.random() - 0.5) * ballSpeed
        return Math.max(10, Math.min(90, newPos))
      })
    }, 100)

    return () => clearInterval(interval)
  }, [gameStarted, gameOver, ballSpeed])

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-green-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-green-800">🏏 MLRIT Cricket Challenge</CardTitle>
          <p className="text-gray-600">Use arrow keys to move, spacebar to swing!</p>
        </CardHeader>
        <CardContent>
          {/* Game Stats */}
          <div className="flex justify-between mb-6 text-lg font-semibold">
            <div className="text-green-600">Score: {score}</div>
            <div className="text-blue-600">Balls Left: {ballsLeft}</div>
          </div>

          {/* Game Field */}
          <div className="relative bg-green-400 h-64 rounded-lg mb-6 overflow-hidden">
            {/* Cricket Pitch */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-green-600 to-green-400">
              {/* Wickets */}
              <div className="absolute left-1/2 transform -translate-x-1/2 bottom-2">
                <div className="flex gap-1">
                  <div className="w-1 h-8 bg-yellow-600"></div>
                  <div className="w-1 h-8 bg-yellow-600"></div>
                  <div className="w-1 h-8 bg-yellow-600"></div>
                </div>
              </div>
            </div>

            {/* Ball */}
            {gameStarted && (
              <div
                className="absolute w-4 h-4 bg-red-600 rounded-full transition-all duration-100"
                style={{
                  left: `${ballPosition}%`,
                  top: "40%",
                  transform: "translateX(-50%)",
                }}
              />
            )}

            {/* Bat */}
            <div
              className={`absolute w-8 h-2 bg-yellow-800 rounded transition-all duration-200 ${
                isSwinging ? "rotate-45" : ""
              }`}
              style={{
                left: `${batPosition}%`,
                bottom: "20px",
                transform: `translateX(-50%) ${isSwinging ? "rotate(45deg)" : ""}`,
              }}
            />

            {/* Batsman */}
            <div
              className="absolute bottom-4"
              style={{
                left: `${batPosition}%`,
                transform: "translateX(-50%)",
              }}
            >
              <svg width="20" height="30" viewBox="0 0 20 30">
                <circle cx="10" cy="5" r="3" fill="#fbbf24" />
                <rect x="7" y="8" width="6" height="12" fill="#22c55e" rx="1" />
                <rect x="8" y="20" width="4" height="8" fill="#1f2937" rx="1" />
                <line x1="5" y1="12" x2="2" y2="18" stroke="#fbbf24" strokeWidth="1" />
                <line x1="15" y1="12" x2="18" y2="18" stroke="#fbbf24" strokeWidth="1" />
              </svg>
            </div>

            {/* Crowd */}
            <div className="absolute top-2 left-2 text-xs">🏟️ MLRIT Stadium</div>
            <div className="absolute top-2 right-2 text-xs">👥 Crowd cheering!</div>
          </div>

          {/* Controls */}
          <div className="text-center space-y-4">
            {!gameStarted && !gameOver && (
              <Button onClick={startGame} className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">
                Start Game
              </Button>
            )}

            {gameStarted && (
              <div className="space-y-2">
                <div className="flex justify-center gap-4">
                  <Button onClick={() => setBatPosition((prev) => Math.max(10, prev - 10))} variant="outline">
                    ← Move Left
                  </Button>
                  <Button onClick={swing} className="bg-red-600 hover:bg-red-700" disabled={isSwinging}>
                    🏏 Swing!
                  </Button>
                  <Button onClick={() => setBatPosition((prev) => Math.min(90, prev + 10))} variant="outline">
                    Move Right →
                  </Button>
                </div>
                <p className="text-sm text-gray-600">Or use arrow keys and spacebar</p>
              </div>
            )}

            {gameOver && (
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Game Over!</h3>
                  <p className="text-lg">
                    Final Score: <span className="font-bold text-green-600">{score}</span>
                  </p>
                  <p className="text-gray-600">
                    {score >= 20 ? "Excellent batting! 🏆" : score >= 10 ? "Good effort! 👏" : "Keep practicing! 💪"}
                  </p>
                </div>
                <Button onClick={resetGame} className="bg-green-600 hover:bg-green-700">
                  Play Again
                </Button>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">How to Play:</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Use arrow keys or buttons to move your batsman</li>
              <li>• Press spacebar or the swing button to hit the ball</li>
              <li>• Time your swing when the ball is near your bat</li>
              <li>• Score as many runs as possible in 6 balls!</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
