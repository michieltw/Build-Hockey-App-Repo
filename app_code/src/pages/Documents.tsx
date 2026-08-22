import { useState, useEffect } from "react";
import { fetchTableData, insertTableData } from "../services/api";

export function Documents() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);

  // Minimal form fields
  const [organizationId, setOrganizationId] = useState("");
  const [title, setTitle] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const loadDocuments = async () => {
    try {
      setLoading(true);
      const data = await fetchTableData("documents");
      setDocuments(data || []);
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await insertTableData("documents", {
        organization_id: organizationId,
        title: title,
        document_type: documentType,
        file_url: fileUrl,
      });
      setFormOpen(false);
      loadDocuments();
      setOrganizationId(""); setTitle(""); setDocumentType(""); setFileUrl("");
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Documents Library</h1>
        <button
          onClick={() => setFormOpen(!formOpen)}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
        >
          {formOpen ? "Close Form" : "Upload Document"}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
          {error}
        </div>
      )}

      {formOpen && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">New Document Entry</h2>
          <form onSubmit={handleCreate} className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Organization ID</label>
              <input required type="number" value={organizationId} onChange={(e) => setOrganizationId(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Document Title</label>
              <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Type</label>
              <select required value={documentType} onChange={(e) => setDocumentType(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg">
                <option value="">Select Type</option>
                <option value="waiver">Waiver Form</option>
                <option value="contract">Contract</option>
                <option value="rulebook">Rulebook</option>
                <option value="medical">Medical Release</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">File URL (Google Drive etc.)</label>
              <input required type="url" value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg" />
            </div>
            <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium">Save Document Link</button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading documents...</div>
        ) : documents.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No documents found.</div>
        ) : (
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-900 border-b border-slate-200 font-semibold">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Title</th>
                <th className="p-4">Type</th>
                <th className="p-4">Link</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((d) => (
                <tr key={d.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  <td className="p-4 tabular-nums">{d.id}</td>
                  <td className="p-4 font-medium text-slate-900">{d.title}</td>
                  <td className="p-4 capitalize">{d.document_type}</td>
                  <td className="p-4">
                    <a href={d.file_url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 underline">
                      View File
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
