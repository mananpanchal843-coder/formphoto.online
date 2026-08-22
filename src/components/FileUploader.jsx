import React, { useState, useRef, useCallback } from 'react';
import './FileUploader.css';

const FileUploader = ({ 
  onFileSelect, 
  accept = 'image/*', 
  maxSizeMB = 5, 
  label = 'Upload Photo' 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const processFile = useCallback((file) => {
    setError(null);
    if (!file) return;

    if (!file.type.match(accept.replace('*', '.*'))) {
      setError(`Invalid file type. Please upload ${accept}`);
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB`);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    
    if (onFileSelect) {
      onFileSelect(file);
    }
  }, [accept, maxSizeMB, onFileSelect]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  }, [processFile]);

  const handleFileInput = useCallback((e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  }, [processFile]);

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const removeFile = (e) => {
    e.stopPropagation();
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onFileSelect) {
      onFileSelect(null);
    }
  };

  return (
    <div className="file-uploader-wrapper">
      <div 
        className={`file-drop-zone ${isDragging ? 'dragging' : ''} ${preview ? 'has-file' : ''}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileInput} 
          accept={accept} 
          className="file-input-hidden"
        />
        
        {preview ? (
          <div className="file-preview-container">
            <img src={preview} alt="Preview" className="file-preview-image" />
            <div className="file-preview-overlay">
              <button className="remove-file-btn" onClick={removeFile} aria-label="Remove file">
                ✕
              </button>
            </div>
          </div>
        ) : (
          <div className="file-upload-prompt">
            <div className="upload-icon">⬆️</div>
            <p className="upload-label">{label}</p>
            <p className="upload-subtext">Drag & drop or click to browse</p>
            <p className="upload-limits">Max size: {maxSizeMB}MB • Formats: {accept.split('/')[1]?.toUpperCase()}</p>
          </div>
        )}
      </div>
      
      {error && <p className="file-error-message">{error}</p>}
    </div>
  );
};

export default FileUploader;
