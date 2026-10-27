import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Image as ImageIcon, 
  X, 
  Check, 
  Link as LinkIcon, 
  RefreshCw, 
  Smartphone, 
  AlertCircle 
} from 'lucide-react';
import { compressImageFile, formatBytes } from '../../utils/imageUtils';

export default function ImageUploadPicker({
  value = '',
  onChange,
  label = 'Product Photograph',
  sublabel = 'Select an image directly from your phone, laptop, or desktop',
  aspectRatio = 'square', // 'square' | 'banner' | 'compact'
  required = false
}) {
  const fileInputRef = useRef(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [fileMeta, setFileMeta] = useState(null);
  const [mode, setMode] = useState('device'); // 'device' | 'url'
  const [urlInput, setUrlInput] = useState(value && !value.startsWith('data:') ? value : '');
  const [isDragOver, setIsDragOver] = useState(false);

  const handleProcessFile = async (file) => {
    if (!file) return;
    setErrorMsg('');
    setIsCompressing(true);

    try {
      // Determine max dimension based on banner vs product
      const maxDim = aspectRatio === 'banner' ? 1400 : 1200;
      const result = await compressImageFile(file, {
        maxWidth: maxDim,
        maxHeight: maxDim,
        quality: 0.86
      });

      setFileMeta({
        name: file.name,
        originalSize: formatBytes(result.originalSize),
        compressedSize: formatBytes(result.compressedSize),
        dimensions: `${result.width}×${result.height}px`
      });

      onChange(result.dataUrl);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to process image file');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleProcessFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleProcessFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleApplyUrl = (val) => {
    setUrlInput(val);
    onChange(val.trim());
    setFileMeta(null);
  };

  const handleClearImage = () => {
    onChange('');
    setFileMeta(null);
    setUrlInput('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-xs font-bold text-[#111827] block">
            {label} {required && <span className="text-[#A30D20]">*</span>}
          </label>
          {sublabel && (
            <p className="text-[11px] text-[#64748B] mt-0.5 font-medium">{sublabel}</p>
          )}
        </div>

        {/* Mode Toggle: Device Upload vs URL */}
        <div className="flex items-center gap-1 p-0.5 bg-[#F5F6F8] rounded-lg border border-[#E5E7EB] text-[11px] font-semibold">
          <button
            type="button"
            onClick={() => setMode('device')}
            className={`px-2 py-0.5 rounded transition-colors cursor-pointer flex items-center gap-1 ${
              mode === 'device' 
                ? 'bg-white text-[#A30D20] shadow-2xs font-bold' 
                : 'text-[#64748B] hover:text-[#111827]'
            }`}
          >
            <Smartphone className="w-3 h-3" />
            <span>From Device</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-0.5 rounded transition-colors cursor-pointer flex items-center gap-1 ${
              mode === 'url' 
                ? 'bg-white text-[#A30D20] shadow-2xs font-bold' 
                : 'text-[#64748B] hover:text-[#111827]'
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            <span>Web URL</span>
          </button>
        </div>
      </div>

      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Mode A: Direct Device File Selection & Drag & Drop */}
      {mode === 'device' && (
        <div>
          {!value ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2.5 ${
                isDragOver 
                  ? 'border-[#A30D20] bg-red-50/50' 
                  : 'border-[#E5E7EB] hover:border-[#A30D20]/60 bg-[#F5F6F8]/60 hover:bg-white'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-white border border-[#E5E7EB] shadow-xs flex items-center justify-center text-[#A30D20]">
                {isCompressing ? (
                  <RefreshCw className="w-6 h-6 animate-spin text-[#A30D20]" />
                ) : (
                  <Upload className="w-6 h-6 stroke-[2.2]" />
                )}
              </div>

              <div>
                <p className="text-xs font-extrabold text-[#111827]">
                  {isCompressing ? 'Optimizing photo from your device…' : 'Tap to Choose Photo from Device'}
                </p>
                <p className="text-[11px] text-[#64748B] mt-0.5">
                  Directly upload from phone camera, photo gallery, or computer folders
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-[#E5E7EB] text-xs font-bold text-[#111827] shadow-2xs group-hover:border-[#A30D20]">
                <span>Browse Files</span>
              </div>
            </div>
          ) : (
            /* Selected Image Preview & Card Frame */
            <div className="bg-[#F5F6F8] border border-[#E5E7EB] rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4">
              {/* Card Thumbnail Display */}
              <div className={`rounded-xl bg-white border border-[#E5E7EB] overflow-hidden flex items-center justify-center shrink-0 shadow-xs ${
                aspectRatio === 'banner' ? 'w-full sm:w-48 h-28' : 'w-28 h-28'
              }`}>
                <img
                  src={value}
                  alt="Selected Preview"
                  className="w-full h-full object-contain p-1"
                />
              </div>

              {/* Image Info & Quick Controls */}
              <div className="flex-1 text-center sm:text-left space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#15803D]" />
                  <p className="text-xs font-extrabold text-[#111827]">
                    Photo Ready & Optimized
                  </p>
                </div>

                {fileMeta ? (
                  <p className="text-[11px] text-[#64748B]">
                    {fileMeta.name} • {fileMeta.dimensions} • {fileMeta.compressedSize} (optimized)
                  </p>
                ) : (
                  <p className="text-[11px] text-[#64748B]">
                    Live image attached for card display and catalog lookbooks.
                  </p>
                )}

                <div className="flex items-center justify-center sm:justify-start gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isCompressing}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-[#E5E7EB] text-xs font-bold text-[#111827] cursor-pointer shadow-2xs transition-colors"
                  >
                    <RefreshCw className={`w-3 h-3 ${isCompressing ? 'animate-spin' : ''}`} />
                    <span>Change Photo</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleClearImage}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white hover:bg-red-50 border border-[#E5E7EB] hover:border-red-200 text-xs font-bold text-[#64748B] hover:text-[#A30D20] cursor-pointer shadow-2xs transition-colors"
                  >
                    <X className="w-3 h-3" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mode B: Direct Web URL Input */}
      {mode === 'url' && (
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="https://images.unsplash.com/photo-..."
              value={urlInput}
              onChange={(e) => handleApplyUrl(e.target.value)}
              className="flex-1 px-3.5 py-2 bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl text-xs sm:text-sm text-[#111827] font-mono placeholder:text-[#64748B] focus:bg-white focus:outline-none focus:border-[#A30D20] focus:ring-1 focus:ring-[#A30D20]"
            />
            {value && (
              <button
                type="button"
                onClick={handleClearImage}
                className="px-3 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs font-bold text-[#64748B] hover:text-[#A30D20] cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Preview for URL */}
          {value && (
            <div className="bg-[#F5F6F8] border border-[#E5E7EB] rounded-xl p-3 flex items-center gap-3">
              <div className="w-16 h-16 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src={value}
                  alt="URL Preview"
                  className="w-full h-full object-contain p-1"
                  onError={() => setErrorMsg('Unable to load photo from provided URL')}
                />
              </div>
              <p className="text-xs text-[#64748B] truncate flex-1 font-mono">
                {value}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Error alert */}
      {errorMsg && (
        <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-[#A30D20] text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
}
