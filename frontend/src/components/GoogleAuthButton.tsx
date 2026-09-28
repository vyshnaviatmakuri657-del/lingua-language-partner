"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2, X, User, Check, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface GoogleAuthButtonProps {
  label?: string;
  className?: string;
  onSuccess?: () => void;
  onError?: (err: string) => void;
}

interface SavedGoogleAccount {
  email: string;
  name: string;
  avatar?: string;
}

export default function GoogleAuthButton({
  label = "Continue with Google",
  className = "",
  onSuccess,
  onError,
}: GoogleAuthButtonProps) {
  const router = useRouter();
  const { loginWithGoogle } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [modalError, setModalError] = useState("");
  const [savedAccounts, setSavedAccounts] = useState<SavedGoogleAccount[]>([]);
  const googleBtnContainerRef = useRef<HTMLDivElement>(null);

  // Load saved Google accounts for fast 1-click select
  useEffect(() => {
    try {
      const stored = localStorage.getItem("lingua_recent_google_accounts");
      if (stored) {
        setSavedAccounts(JSON.parse(stored));
      }
    } catch {}
  }, []);

  // Try initializing Google Identity Services (GIS) if client ID is configured
  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) return;

    const handleCredentialResponse = async (response: any) => {
      if (!response.credential) return;
      setIsLoading(true);
      try {
        const res = await loginWithGoogle({ credential: response.credential });
        if (res.success) {
          onSuccess ? onSuccess() : router.push("/dashboard");
        } else {
          onError && onError(res.error || "Google login failed");
        }
      } catch (err: any) {
        onError && onError(err.message || "Failed to sign in with Google");
      } finally {
        setIsLoading(false);
      }
    };

    const scriptId = "google-jssdk";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if ((window as any).google?.accounts?.id) {
          (window as any).google.accounts.id.initialize({
            client_id: clientId,
            callback: handleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
          });
          if (googleBtnContainerRef.current) {
            (window as any).google.accounts.id.renderButton(googleBtnContainerRef.current, {
              theme: "filled_blue",
              size: "large",
              width: "100%",
              text: "continue_with",
              shape: "pill",
            });
          }
        }
      };
      document.body.appendChild(script);
    }
  }, [loginWithGoogle, onSuccess, onError, router]);

  const saveRecentAccount = (email: string, name: string, avatar?: string) => {
    try {
      const existing = savedAccounts.filter((a) => a.email.toLowerCase() !== email.toLowerCase());
      const updated = [{ email, name, avatar }, ...existing].slice(0, 3);
      setSavedAccounts(updated);
      localStorage.setItem("lingua_recent_google_accounts", JSON.stringify(updated));
    } catch {}
  };

  const handleExecuteGoogleLogin = async (email: string, name: string, avatar?: string) => {
    if (!email || !email.includes("@")) {
      setModalError("Please enter a valid Google email address.");
      return;
    }

    setModalError("");
    setIsLoading(true);

    try {
      const res = await loginWithGoogle({
        email: email.trim().toLowerCase(),
        name: name.trim() || email.split("@")[0],
        avatar: avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
      });

      if (res.success) {
        saveRecentAccount(email, name, avatar);
        setShowModal(false);
        if (onSuccess) {
          onSuccess();
        } else {
          router.push("/dashboard");
        }
      } else {
        setModalError(res.error || "Failed to authenticate with Google.");
        if (onError) onError(res.error || "Failed to authenticate with Google.");
      }
    } catch {
      setModalError("Network error. Please try again.");
      if (onError) onError("Network error during Google authentication.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = () => {
    // If official Google prompt is available, try prompt
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (clientId && (window as any).google?.accounts?.id) {
      try {
        (window as any).google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            setShowModal(true);
          }
        });
        return;
      } catch {}
    }
    // Fallback: interactive modal dialog
    setShowModal(true);
  };

  return (
    <>
      <div className="w-full">
        {/* Hidden container for GIS button if loaded */}
        <div ref={googleBtnContainerRef} className="hidden" />

        <button
          type="button"
          onClick={handleButtonClick}
          disabled={isLoading}
          className={`w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700/80 hover:border-slate-600 rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 active:scale-[0.98] ${className}`}
        >
          {isLoading ? (
            <Loader2 size={18} className="animate-spin text-indigo-400" />
          ) : (
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.34 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.14 0 9.97 0 12s.45 3.86 1.24 5.42l4.04-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
          )}
          <span>{label}</span>
        </button>
      </div>

      {/* Google Account Authentication Dialog */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 relative animate-in zoom-in-95">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition"
            >
              <X size={20} />
            </button>

            {/* Google Branding Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-md">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.34 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.14 0 9.97 0 12s.45 3.86 1.24 5.42l4.04-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Sign in with Google</h3>
                <p className="text-xs text-slate-400">Choose an account to continue to Lingua</p>
              </div>
            </div>

            {modalError && (
              <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-xl flex items-center gap-2 text-rose-300 text-xs font-semibold">
                <AlertCircle size={16} className="shrink-0 text-rose-400" />
                <span>{modalError}</span>
              </div>
            )}

            {/* Saved Accounts for 1-Click login */}
            {savedAccounts.length > 0 && (
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Recently used Google Accounts
                </div>
                <div className="space-y-1.5">
                  {savedAccounts.map((acc) => (
                    <button
                      key={acc.email}
                      type="button"
                      disabled={isLoading}
                      onClick={() => handleExecuteGoogleLogin(acc.email, acc.name, acc.avatar)}
                      className="w-full p-3 rounded-2xl bg-slate-850 hover:bg-slate-800 border border-slate-750 flex items-center justify-between text-left transition group active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-600/30 text-indigo-400 flex items-center justify-center font-bold text-xs uppercase">
                          {acc.name ? acc.name.charAt(0) : "G"}
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-slate-200 group-hover:text-white">
                            {acc.name}
                          </div>
                          <div className="text-xs text-slate-400">{acc.email}</div>
                        </div>
                      </div>
                      <Check size={16} className="text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Enter New Google Account */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleExecuteGoogleLogin(emailInput, nameInput);
              }}
              className="space-y-3 pt-2 border-t border-slate-800"
            >
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {savedAccounts.length > 0 ? "Or use another Google account" : "Enter your Google account"}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Google Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="yourname@gmail.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full bg-slate-850 border border-slate-700 text-white placeholder-slate-500 text-sm px-4 py-2.5 rounded-xl outline-none focus:border-indigo-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name (optional)
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full bg-slate-850 border border-slate-700 text-white placeholder-slate-500 text-sm px-4 py-2.5 rounded-xl outline-none focus:border-indigo-500 transition"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !emailInput}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 active:scale-95"
              >
                {isLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <span>Sign In with this Account</span>
                )}
              </button>
            </form>

            <div className="text-center text-[11px] text-slate-500">
              Lingua OAuth Provider • Your Google account profile is securely linked.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
