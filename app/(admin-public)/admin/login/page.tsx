'use client'

import { useActionState } from 'react'
import { login } from '../../../(admin-app)/admin/actions/auth'

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined)

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-navy">Admin Login</h1>
          <p className="text-slate-400 text-sm mt-1">C.S.I St. Andrew&apos;s Church</p>
        </div>
        <form action={action} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          {state?.error && (
            <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">{state.error}</p>
          )}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
            <input
              name="username"
              type="text"
              required
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cerulean"
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="w-full bg-cerulean text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-navy transition-colors disabled:opacity-50"
          >
            {pending ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
