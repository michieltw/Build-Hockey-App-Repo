import { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";
import { supabase } from "../utils/supabase";

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 md:px-0">
      <div className="absolute inset-0 texture-overlay pointer-events-none z-0"></div>
      <div className="w-full max-w-md z-10 flex flex-col gap-16">
        <div className="flex flex-col items-center justify-center">
          <img
            src="https://cdn.shopify.com/s/files/1/1038/7203/7203/files/scorekeeper.png?v=1786003535"
            alt="Blackout Hockey: Master the Game"
            className="w-full max-w-sm h-auto object-contain"
          />
        </div>

        <form
          onSubmit={handleLogin}
          className="bevel-container rounded-lg p-6 md:p-10 flex flex-col gap-6"
        >
          <h2 className="text-2xl font-bold text-center text-primary mb-2 tracking-wide font-headline">
            INLOGGEN
          </h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                placeholder="E-mailadres"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                placeholder="Wachtwoord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-4 flex items-center justify-center gap-2 bg-primary text-white p-3 rounded font-bold hover:bg-primary-dark transition-colors"
            >
              <LogIn className="h-5 w-5" /> Inloggen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
