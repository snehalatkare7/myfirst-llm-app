"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Sparkles, Loader2, MessageCircle } from "lucide-react"

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

  const getSentimentStyles = (s: string) => {
    switch (s) {
      case "positive":
        return {
          gradient: "from-emerald-500/20 via-teal-500/10 to-cyan-500/20 dark:from-emerald-500/25 dark:via-teal-500/15 dark:to-cyan-500/25",
          border: "border-emerald-400/40 dark:border-emerald-400/50",
          text: "text-emerald-700 dark:text-emerald-300",
          badge: "bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 border-emerald-400/30",
          emoji: "😊",
          label: "This text expresses positive emotions",
        }
      case "negative":
        return {
          gradient: "from-rose-500/20 via-red-500/10 to-amber-500/20 dark:from-rose-500/25 dark:via-red-500/15 dark:to-amber-500/25",
          border: "border-rose-400/40 dark:border-rose-400/50",
          text: "text-rose-700 dark:text-rose-300",
          badge: "bg-rose-500/20 text-rose-800 dark:text-rose-200 border-rose-400/30",
          emoji: "😔",
          label: "This text expresses negative emotions",
        }
      default:
        return {
          gradient: "from-slate-500/15 via-indigo-500/10 to-violet-500/15 dark:from-slate-400/20 dark:via-indigo-500/15 dark:to-violet-500/20",
          border: "border-slate-400/40 dark:border-slate-400/50",
          text: "text-slate-700 dark:text-slate-300",
          badge: "bg-slate-500/20 text-slate-800 dark:text-slate-200 border-slate-400/30",
          emoji: "😐",
          label: "This text has a neutral tone",
        }
    }
  }

  const resultStyles = sentiment ? getSentimentStyles(sentiment) : null

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/30 to-violet-50/50 dark:from-slate-950 dark:via-indigo-950/40 dark:to-violet-950/30">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />
      {/* Soft orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-indigo-300/20 dark:bg-indigo-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-violet-300/20 dark:bg-violet-500/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:px-8">
        <header className="text-center mb-10">
          <div className="hero-icon-float inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25 mb-6">
            <MessageCircle className="w-10 h-10" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-3 text-balance">
            Sentiment Analysis
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 text-balance max-w-md mx-auto">
            Analyze the emotional tone of any text with AI-powered sentiment detection
          </p>
        </header>

        <div className="glass-card rounded-2xl p-6 sm:p-8 shadow-xl border border-white/60 dark:border-white/10">
          <div className="space-y-5">
            <div>
              <label htmlFor="text-input" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Enter your text
              </label>
              <Textarea
                id="text-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text here to analyze its sentiment..."
                className="min-h-[140px] resize-none text-base rounded-xl border-slate-200 dark:border-slate-700 focus-visible:ring-2 focus-visible:ring-indigo-500/50"
                disabled={loading}
              />
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-400/30 text-rose-800 dark:text-rose-200 text-sm font-medium">
                {error}
              </div>
            )}

            <Button
              onClick={analyzeSentiment}
              disabled={loading || !text.trim()}
              className="w-full h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all duration-200"
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

            {sentiment && resultStyles && (
              <div
                className={`sentiment-result-in mt-6 p-6 rounded-2xl bg-gradient-to-br ${resultStyles.gradient} border ${resultStyles.border}`}
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Analysis Result
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-5xl" role="img" aria-label={sentiment}>
                    {resultStyles.emoji}
                  </span>
                  <div className="flex-1">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-bold capitalize border ${resultStyles.badge}`}
                    >
                      {sentiment}
                    </span>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{resultStyles.label}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-500">
          Powered by FastAPI sentiment analysis engine
        </p>
      </div>
    </div>
  )
}
