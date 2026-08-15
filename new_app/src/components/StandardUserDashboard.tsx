import React, { useState } from "react";
import { AppDatabase, Person } from "../types";
import {
  Megaphone,
  Heart,
  Send,
  Trash2,
  Image,
  PlusCircle,
  XCircle,
} from "lucide-react";

interface StandardUserDashboardProps {
  db: AppDatabase;
  onUpdateDb: (updatedDb: AppDatabase) => void;
}

export default function StandardUserDashboard({
  db,
  onUpdateDb,
}: StandardUserDashboardProps) {
  // Voorlopige mock functionaliteit ter vervanging van de locale storage
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Player Dashboard</h1>
      <p>Hier komen speler specifieke statistieken te staan.</p>
    </div>
  );
}
