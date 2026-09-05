import React, { useState } from 'react';

// --- AuthModal Component ---
function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // إغلاق النافذة بنجاح دون إظهار أخطاء متوقعة
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md p-8 bg-[#120B24] border border-purple-500/30 rounded-2xl shadow-2xl font-sans text-white text-left">
        {/* زر الإغلاق */}
        <button 
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 text-purple-300 hover:text-white text-xl transition-colors"
        >
          ✕
        </button>

        {/* الهيدر */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30 text-xl">
            🐉
          </div>
          <div>
            <span className="text-[10px] tracking-widest font-semibold uppercase text-purple-400 block">
              YOUR REALM IS WAITING
            </span>
            <h3 className="text-xl font-bold text-white tracking-wide">
              {isSignUp ? 'Create Account' : 'Enter the Forge'}
            </h3>
          </div>
        </div>

        <p className="text-xs text-purple-200/70 mb-6 leading-relaxed">
          Use your email and password to save your realms, keep your sparks, and use the AI forge.
        </p>

        {/* النموذج بكسوة تصميمية واضحة ومتباينة */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-purple-200 mb-1.5">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="dragon@craft.ai"
              className="w-full px-4 py-3 bg-[#1A1033] border border-purple-500/30 rounded-xl text-white placeholder-purple-400/40 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-purple-200 mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-[#1A1033] border border-purple-500/30 rounded-xl text-white placeholder-purple-400/40 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-600/30 transition-all duration-200 text-sm mt-2"
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        {/* زر التنقل بين تسجيل الدخول وإنشاء حساب */}
        <div className="mt-6 text-center text-xs text-purple-300/70">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-purple-400 font-semibold hover:underline ml-1"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Simplified Gallery Section ---
function GallerySection({ onSelect }: { onSelect: (index: number) => void }) {
  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-400">05 / Gallery</p>
          <h2 className="mt-2 text-3xl font-bold text-white sm:text-5xl">
            Forged Signals
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item, index) => (
            <div 
              key={item}
              onClick={() => onSelect(index)}
              className="cursor-pointer p-6 rounded-2xl border border-purple-500/20 bg-[#10071f]/50 hover:border-purple-500/50 transition-all"
            >
              <div className="h-40 rounded-xl bg-gradient-to-br from-purple-900/40 to-indigo-900/40 flex items-center justify-center text-xl text-white font-medium">
                🐉 Realm {item}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- App Component ---
export default function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0518] text-white font-sans selection:bg-purple-500 selection:text-white">
      {/* Header / Navbar */}
      <header className="border-b border-purple-500/10 bg-[#0A0518]/80 backdrop-blur-md fixed top-0 w-full z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg">
            <span>🐉</span> DragonCraft AI
          </div>
          <button
            onClick={() => setIsAuthOpen(true)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-medium transition-all shadow-md shadow-purple-600/20"
          >
            Enter Forge
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        <section className="text-center py-20 px-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">
            Forge Your AI Realms
          </h1>
          <p className="mt-4 text-purple-200/70 max-w-xl mx-auto text-sm sm:text-base">
            Build, craft, and command your AI ecosystems with high precision.
          </p>
          <button
            onClick={() => setIsAuthOpen(true)}
            className="mt-8 px-8 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-600/30 transition-all"
          >
            Get Started
          </button>
        </section>

        <GallerySection onSelect={(i) => setIsAuthOpen(true)} />
      </main>

      {/* Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}
