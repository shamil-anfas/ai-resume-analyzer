import React, { useRef } from 'react';
import { Check, Upload, X } from 'lucide-react';

const ResumeUpload = ({ file, setFile }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const clearFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-4">
      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
        Resume
      </label>
      <div 
        onClick={() => !file && fileInputRef.current.click()}
        className={`relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-all cursor-pointer
          ${file 
            ? 'border-green-500/50 bg-green-500/5 dark:bg-green-500/10' 
            : 'border-muted-foreground/20 hover:border-primary/50 bg-muted/30 hover:bg-muted/50'
          }`}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.docx"
          className="hidden"
        />
        
        {file ? (
          <div className="flex flex-col items-center gap-3 animate-in fade-in zoom-in duration-300">
            <div className="bg-green-500/20 p-3 rounded-full text-green-500">
              <Check size={32} />
            </div>
            <div className="text-center">
              <p className="text-green-600 dark:text-green-400 font-medium">{file.name} uploaded</p>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  clearFile();
                }}
                className="text-sm text-primary hover:underline mt-1"
              >
                Click to replace file
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="bg-muted p-3 rounded-full text-muted-foreground">
              <Upload size={32} />
            </div>
            <div className="text-center">
              <p className="font-medium">Upload your resume</p>
              <p className="text-sm text-muted-foreground mt-1">PDF or DOCX allowed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeUpload;
