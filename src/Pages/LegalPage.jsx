import { Link } from 'react-router-dom'

const termsSections = [
  {
    title: '1. Acceptance of Terms',
    body:
      'By creating an account and using GameHub, you agree to these Terms of Service. If you do not agree, please do not use the platform.',
  },
  {
    title: '2. Account Responsibilities',
    body:
      'You are responsible for keeping your account credentials secure and for all activity that happens under your account.',
  },
  {
    title: '3. Purchases and Content',
    body:
      'GameHub provides access to game listings and purchase flows for convenience. All transactions are subject to the applicable store and payment policies.',
  },
  {
    title: '4. Limitations',
    body:
      'You may not misuse the service, attempt unauthorized access, or distribute harmful content through the platform.',
  },
]

const privacySections = [
  {
    title: '1. Information We Collect',
    body:
      'We collect account details such as your name, email, and authentication data, along with browsing behavior needed to improve your experience.',
  },
  {
    title: '2. How We Use Information',
    body:
      'Your information helps us manage your account, process purchases, personalize recommendations, and communicate important updates.',
  },
  {
    title: '3. Data Sharing',
    body:
      'We do not sell your personal data. We may share limited information with service providers that help operate the site securely and reliably.',
  },
  {
    title: '4. Your Choices',
    body:
      'You can review, update, or request deletion of your account details by contacting support through the site.',
  },
]

export default function LegalPage({ type = 'terms' }) {
  const isPrivacy = type === 'privacy'
  const title = isPrivacy ? 'Privacy Policy' : 'Terms of Service'
  const sections = isPrivacy ? privacySections : termsSections

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-800 bg-slate-900/95 p-8 shadow-2xl shadow-black/30 sm:p-10">
        <Link to="/register" className="mb-6 inline-flex items-center text-sm font-medium text-cyan-400 hover:text-cyan-300">
          ← Back to register
        </Link>

        <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        <p className="mb-8 text-sm text-slate-400">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="space-y-6">
          {sections.map((section) => (
            <section key={section.title} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
              <h2 className="mb-2 text-lg font-semibold text-white">{section.title}</h2>
              <p className="leading-7 text-slate-300">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
