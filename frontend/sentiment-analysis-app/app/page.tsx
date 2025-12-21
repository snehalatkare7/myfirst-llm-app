"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, Loader2 } from "lucide-react"

export default function SentimentAnalyzer() {
  const [text, setText] = useState("")
  const [sentiment, setSentiment] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const analyzeSentiment = async () => {
    if (!text.trim()) {
      setError("Please enter some text to analyze")
      return
    }

    setLoading(true)
    setError(null)
    setSentiment(null)

    try {
      const response = await fetch("http://localhost:8000/sentiment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze sentiment")
      }

      const data = await response.json()
      setSentiment(data.sentiment)
    } catch (err) {
      setError("Failed to connect to the sentiment API. Make sure the backend is running.")
    } finally {
      setLoading(false)
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-success"
      case "negative":
        return "text-error"
      default:
        return "text-neutral"
    }
  }

  const getSentimentEmoji = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "😊"
      case "negative":
        return "😔"
      default:
        return "😐"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-3 text-balance">Sentiment Analysis</h1>
          <p className="text-lg text-muted-foreground text-balance">
            Analyze the emotional tone of any text with AI-powered sentiment detection
          </p>
        </div>

        <Card className="p-6 sm:p-8 shadow-xl border-2">
          <div className="space-y-6">
            <div>
              <label htmlFor="text-input" className="block text-sm font-semibold text-foreground mb-3">
                Enter your text
              </label>
              <Textarea
                id="text-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text here to analyze its sentiment..."
                className="min-h-[160px] resize-none text-base"
                disabled={loading}
              />
            </div>

            {error && (
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-destructive font-medium">{error}</p>
              </div>
            )}

            <Button
              onClick={analyzeSentiment}
              disabled={loading || !text.trim()}
              className="w-full h-12 text-base font-semibold"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Analyze Sentiment
                </>
              )}
            </Button>

            {sentiment && (
              <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-accent/50 to-accent/20 border-2 border-accent">
                <p className="text-sm font-semibold text-muted-foreground mb-2">Analysis Result</p>
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{getSentimentEmoji(sentiment)}</span>
                  <div>
                    <p className={`text-3xl font-bold capitalize ${getSentimentColor(sentiment)}`}>{sentiment}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {sentiment === "positive" && "This text expresses positive emotions"}
                      {sentiment === "negative" && "This text expresses negative emotions"}
                      {sentiment === "neutral" && "This text has a neutral tone"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">Powered by FastAPI sentiment analysis engine</p>
        </div>
      </div>
    </div>
  )
}
