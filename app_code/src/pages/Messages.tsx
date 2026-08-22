import { useState, useEffect } from "react";
import { fetchTableData, insertTableData } from "../services/api";

export function Messages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);

  // Minimal form fields
  const [recipientId, setRecipientId] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const loadMessages = async () => {
    try {
      setLoading(true);
      const data = await fetchTableData("messages");
      setMessages(data || []);
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await insertTableData("messages", {
        // We use a mock sender ID of 1 since we don't have a real user session ID in state yet
        sender_id: 1,
        recipient_id: recipientId,
        subject: subject,
        body: body,
        is_read: false,
      });
      setFormOpen(false);
      loadMessages();
      setRecipientId(""); setSubject(""); setBody("");
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Messages</h1>
        <button
          onClick={() => setFormOpen(!formOpen)}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
        >
          {formOpen ? "Close Form" : "Compose Message"}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
          {error}
        </div>
      )}

      {formOpen && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Compose New Message</h2>
          <form onSubmit={handleCreate} className="space-y-4 max-w-xl">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Recipient User ID</label>
              <input required type="number" value={recipientId} onChange={(e) => setRecipientId(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Subject</label>
              <input required type="text" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Message Body</label>
              <textarea required rows={4} value={body} onChange={(e) => setBody(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg" />
            </div>
            <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium">Send Message</button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No messages found.</div>
        ) : (
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-900 border-b border-slate-200 font-semibold">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Sender ID</th>
                <th className="p-4">Recipient ID</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr key={m.id} className={`border-b border-slate-100 last:border-0 hover:bg-slate-50 ${!m.is_read ? 'bg-indigo-50/30' : ''}`}>
                  <td className="p-4 tabular-nums">{m.id}</td>
                  <td className="p-4 tabular-nums">{m.sender_id}</td>
                  <td className="p-4 tabular-nums">{m.recipient_id}</td>
                  <td className={`p-4 ${!m.is_read ? 'font-bold text-slate-900' : ''}`}>{m.subject}</td>
                  <td className="p-4">
                    {m.is_read ? (
                       <span className="text-slate-400">Read</span>
                    ) : (
                       <span className="text-indigo-600 font-medium">Unread</span>
                    )}
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
