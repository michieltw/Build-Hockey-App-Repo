import React, { useState } from "react";
import { supabase } from "../utils/supabase";
import { UserRole } from "../types";
import LoginScreen from "./LoginScreen";

interface SplashScreenProps {
  onLogin: (
    role: UserRole,
    personId: string | null,
    username: string,
    email: string,
  ) => void;
  onContinueAsGuest: () => void;
}

export function SplashScreen({
  onLogin,
  onContinueAsGuest,
}: SplashScreenProps) {
  // We'll wrap the LoginScreen
  const handleSupabaseLogin = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      // Typically fetch the role/person from the DB. Defaulting to Admin for demo/transition.
      onLogin(
        "Admin",
        user.id,
        user.email?.split("@")[0] || "User",
        user.email || "",
      );
    }
  };

  return <LoginScreen onLogin={handleSupabaseLogin} />;
}
