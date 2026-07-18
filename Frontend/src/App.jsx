import React, { useState } from 'react';
import axios from 'axios';
import { Search, Loader2 } from 'lucide-react';
import Navbar from './components/Navbar';
import ResumeUpload from './components/ResumeUpload';
import AnalysisResults from './components/AnalysisResults';

function App() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!file || !jobDescription.strip()) {
      setError("Please upload a resume and provide a job description.");
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('job_description', jobDescription);

    try {
      const response = await axios.post('http://localhost:8000/api/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        setResults(response.data.data);
      } else {
        setError(response.data.error || "Analysis failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "Could not connect to the backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        <header className="space-y-4">
          <h2 className="text-4xl font-bold tracking-tight">Optimize your resume</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Upload your resume and paste the job description — we'll score your ATS match and show exactly what to improve.
          </p>
        </header>

        <section className="space-y-8">
          <ResumeUpload file={file} setFile={setFile} />

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Job Description
              </label>
              <span className="text-xs text-muted-foreground">
                {jobDescription.length} characters
              </span>
            </div>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste job description here..."
              className="w-full min-h-[200px] p-4 rounded-xl border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-y"
              style={{
                backgroundColor: 'hsl(var(--card))',
                color: 'hsl(var(--foreground))',
                borderColor: 'hsl(var(--border))',
              }}
            />
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={loading || !file || !jobDescription}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98]
              ${loading || !file || !jobDescription
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-primary/20'
              }`}
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Analyzing resume...
              </>
            ) : (
              <>
                <Search size={20} />
                Analyze resume
              </>
            )}
          </button>
        </section>

        {results && (
          <div className="pt-12 border-t">
            <div className="mb-8">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Analysis Results
              </h3>
            </div>
            <AnalysisResults data={results} />
          </div>
        )}
      </main>
    </div>
  );
}

// Helper polyfill for strip if not available
String.prototype.strip = function() { return this.trim(); };

export default App;
