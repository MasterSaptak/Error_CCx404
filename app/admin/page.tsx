"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, updateDoc, doc, query, orderBy } from "firebase/firestore";
import { Terminal, CheckCircle2, XCircle, Download, Clock, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

type Applicant = {
  id: string;
  fullName: string;
  alias: string;
  email: string;
  role: string;
  experienceYears: string;
  cvUrl: string;
  status: "pending" | "approved" | "rejected";
  createdAt: any;
};

export default function AdminDashboard() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const q = query(collection(db, "applicants"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data: Applicant[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Applicant);
      });
      setApplicants(data);
    } catch (err: any) {
      console.error("Error fetching applicants:", err);
      setError("Failed to load applicants. Check Firebase configuration.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: "approved" | "rejected") => {
    try {
      await updateDoc(doc(db, "applicants", id), {
        status: newStatus,
      });
      setApplicants((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber-black flex items-center justify-center text-cyber-blue font-mono">
        <span className="w-6 h-6 border-2 border-cyber-blue border-t-transparent rounded-full animate-spin mr-3"></span>
        Loading_Database...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-black text-white p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center mb-2">
              <ShieldAlert className="w-8 h-8 mr-3 text-neon-purple" />
              Admin_Terminal
            </h1>
            <p className="text-gray-400 font-mono text-sm">
              Manage Error_CCx404 community applications
            </p>
          </div>
          <Link
            href="/"
            className="mt-4 md:mt-0 px-4 py-2 border border-white/20 rounded hover:bg-white/5 transition-colors font-mono text-sm flex items-center"
          >
            <Terminal className="w-4 h-4 mr-2" />
            Exit_Terminal
          </Link>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg mb-8 font-mono">
            {error}
          </div>
        )}

        <div className="bg-cyber-black/50 border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 font-mono text-sm text-gray-400">
                  <th className="p-4">Applicant</th>
                  <th className="p-4">Role & Exp</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">CV</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applicants.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500 font-mono">
                      No applications found in the database.
                    </td>
                  </tr>
                ) : (
                  applicants.map((app, index) => (
                    <motion.tr
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      key={app.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="p-4">
                        <div className="font-bold text-white">{app.fullName}</div>
                        <div className="text-xs text-cyber-blue font-mono">@{app.alias}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">{app.role}</div>
                        <div className="text-xs text-gray-400">{app.experienceYears} exp</div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">{app.email}</div>
                      </td>
                      <td className="p-4">
                        {app.cvUrl ? (
                          <a
                            href={app.cvUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-xs text-neon-purple hover:text-purple-400 transition-colors"
                          >
                            <Download className="w-4 h-4 mr-1" /> Download
                          </a>
                        ) : (
                          <span className="text-xs text-gray-600 font-mono">No CV</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border ${
                            app.status === "approved"
                              ? "bg-terminal-green/10 text-terminal-green border-terminal-green/30"
                              : app.status === "rejected"
                              ? "bg-red-500/10 text-red-500 border-red-500/30"
                              : "bg-yellow-500/10 text-yellow-500 border-yellow-500/30"
                          }`}
                        >
                          {app.status === "approved" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                          {app.status === "rejected" && <XCircle className="w-3 h-3 mr-1" />}
                          {app.status === "pending" && <Clock className="w-3 h-3 mr-1" />}
                          {app.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => updateStatus(app.id, "approved")}
                            disabled={app.status === "approved"}
                            className="p-1.5 rounded bg-white/5 hover:bg-terminal-green/20 text-gray-400 hover:text-terminal-green transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Approve"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => updateStatus(app.id, "rejected")}
                            disabled={app.status === "rejected"}
                            className="p-1.5 rounded bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
