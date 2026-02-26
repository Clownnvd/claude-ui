"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { authClient } from "@/lib/auth-client"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const { error: authError } = await authClient.signIn.email({
        email,
        password,
      })

      if (authError) {
        setError(authError.message || "Invalid email or password. Please try again.")
      } else {
        router.push("/dashboard")
      }
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleGoogleLogin() {
    setError("")
    setIsGoogleLoading(true)

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      })
    } catch {
      setError("Failed to sign in with Google. Please try again.")
      setIsGoogleLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#0F172A] mb-1">Welcome back</h1>
        <p className="text-sm text-[#64748B]">Sign in to your CViet account</p>
      </div>

      {/* Google OAuth button */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isGoogleLoading || isLoading}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-[#E2E8F0] rounded-lg text-sm font-medium text-[#0F172A] bg-white hover:bg-[#F8FAFC] transition-colors duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed min-h-[44px]"
      >
        {isGoogleLoading ? (
          <span className="w-4 h-4 border-2 border-[#0F172A] border-t-transparent rounded-full animate-spin" />
        ) : (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
            <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
          </svg>
        )}
        {isGoogleLoading ? "Signing in..." : "Continue with Google"}
      </button>

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-[#E2E8F0]" />
        <span className="text-xs text-[#94A3B8]">or continue with email</span>
        <div className="flex-1 h-px bg-[#E2E8F0]" />
      </div>

      <form onSubmit={handleEmailLogin} className="space-y-4">
        {/* Email field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#0F172A] mb-1.5">
            Email address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-3 text-sm border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-[#94A3B8] bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-colors duration-200 min-h-[44px]"
            />
          </div>
        </div>

        {/* Password field */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="password" className="block text-sm font-medium text-[#0F172A]">
              Password
            </label>
            <a
              href="/forgot-password"
              className="text-xs text-[#1B4FD8] hover:text-[#1640B0] transition-colors duration-200 cursor-pointer"
            >
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-11 py-3 text-sm border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-[#94A3B8] bg-white focus:outline-none focus:ring-2 focus:ring-[#1B4FD8] focus:border-transparent transition-colors duration-200 min-h-[44px]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B] transition-colors duration-200 cursor-pointer p-1"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading || isGoogleLoading}
          className="w-full bg-[#1B4FD8] hover:bg-[#1640B0] text-white text-sm font-medium py-3 rounded-lg transition-colors duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed min-h-[44px] flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </form>

      <p className="text-center text-sm text-[#64748B] mt-6">
        Don&apos;t have an account?{" "}
        <a
          href="/signup"
          className="text-[#1B4FD8] hover:text-[#1640B0] font-medium transition-colors duration-200 cursor-pointer"
        >
          Create one free
        </a>
      </p>
    </div>
  )
}
