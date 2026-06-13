import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-12 sm:py-20">
      <div className="flex flex-col items-center justify-center min-h-screen">
        {/* Header Section */}
        <div className="mb-12 text-center animate-fade-in">
          <div className="inline-block mb-4">
            <div className="h-16 w-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">V</span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 tracking-tight">
            Join Our Community
          </h1>
          <p className="text-slate-300 text-lg max-w-md mx-auto">
            Create your account and start making a difference today
          </p>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl bg-opacity-95">
            <div className="p-8 sm:p-10">
              <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm">
              Already have an account?{" "}
              <a
                href="/sign-in"
                className="text-blue-400 font-semibold hover:text-blue-300 transition-colors duration-200"
              >
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
