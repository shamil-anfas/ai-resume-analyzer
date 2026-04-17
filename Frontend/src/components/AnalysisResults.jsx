import React from 'react';
import { Check, X, AlertCircle } from 'lucide-react';

const CircularProgress = ({ score }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg className="circular-progress w-24 h-24">
        <circle
          className="stroke-muted"
          r={radius}
          cx="48"
          cy="48"
        />
        <circle
          className="stroke-primary transition-all duration-1000 ease-out"
          r={radius}
          cx="48"
          cy="48"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">{score}</span>
        <span className="text-[10px] uppercase font-bold text-muted-foreground leading-none">ATS score</span>
      </div>
    </div>
  );
};

const KeywordBadge = ({ text, type }) => (
  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${
    type === 'matched' 
      ? 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20' 
      : 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20'
  }`}>
    {text}
  </span>
);

const AnalysisResults = ({ data }) => {
  const { ats_score, matched_keywords, missing_keywords, suggestions, summary } = data;

  const getScoreColor = () => {
    if (ats_score >= 80) return "text-green-500";
    if (ats_score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreMessage = () => {
    if (ats_score >= 80) return "Strong match — ready to apply!";
    if (ats_score >= 60) return "Good match — a few gaps to address";
    return "Weak match — needs significant work";
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="p-6 rounded-2xl border bg-card/50 backdrop-blur">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <CircularProgress score={ats_score} />
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">{getScoreMessage()}</h3>
            <p className="text-muted-foreground leading-relaxed">{summary}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border bg-card/50 space-y-4">
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
            <Check size={20} />
            <h4 className="font-bold">Matched keywords</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {matched_keywords.map((kw, i) => (
              <KeywordBadge key={i} text={kw} type="matched" />
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl border bg-card/50 space-y-4">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <X size={20} />
            <h4 className="font-bold">Missing keywords</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {missing_keywords.map((kw, i) => (
              <KeywordBadge key={i} text={kw} type="missing" />
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl border bg-card/50 space-y-6">
        <div className="flex items-center gap-2 text-muted-foreground">
          <AlertCircle size={20} />
          <h4 className="font-bold uppercase text-xs tracking-widest">Suggestions to improve</h4>
        </div>
        <ul className="space-y-4">
          {suggestions.map((suggestion, i) => (
            <li key={i} className="flex gap-4">
              <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <p className="text-foreground/80">{suggestion}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AnalysisResults;
