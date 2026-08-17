import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
      <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-2">{title}</h2>
      <p className="text-slate-500">This module is under construction.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<PlaceholderPage title="Dashboard Overview" />} />
          <Route path="organizations" element={<PlaceholderPage title="Organizations" />} />
          <Route path="teams" element={<PlaceholderPage title="Teams" />} />
          <Route path="persons" element={<PlaceholderPage title="Persons" />} />
          <Route path="seasons" element={<PlaceholderPage title="Seasons" />} />
          <Route path="settings" element={<PlaceholderPage title="Settings" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
