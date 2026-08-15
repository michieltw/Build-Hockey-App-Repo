import React, { useState } from "react";
import { AppDatabase } from "../types";

interface DashboardProps {
  db: AppDatabase;
  onUpdateDb: (updatedDb: AppDatabase) => void;
}

export default function Dashboard({ db, onUpdateDb }: DashboardProps) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Main Dashboard</h1>
      <p>Hier komen algemene social en club overzichten te staan.</p>
    </div>
  );
}
