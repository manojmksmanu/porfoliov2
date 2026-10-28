'use client';

import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { 
  ArrowLeft, Upload, Download, RefreshCw, Sparkles, FolderDown, 
  Layers, CheckCircle2, ShieldCheck, ZoomIn, Sliders, Check, FileCheck, Eye, Trash2
} from 'lucide-react';
import JSZip from 'jszip';

interface BatchItem {
  file: File;
  relativePath: string;
  origSize: number;
  convertedBlob: Blob | null;
  convertedSize: number;
  status: 'pending' | 'converting' | 'done' | 'error';
}

export default function ImageConverterPage() {
  // State
  const [targetFormat, setTargetFormat] = useState<'webp' | 'avif' | 'jpeg' | 'png' | 'bmp'>('webp');
  const [quality, setQuality] = useState(80);
  const [scale, setScale] = useState(1);
  const [filter, setFilter] = useState<'none' | 'grayscale' | 'sharpen' | 'sepia' | 'invert'>('none');
  const [activeTab, setActiveTab] = useState<'dual' | 'split' | 'loupe'>('split');
  const [splitPos, setSplitPos] = useState(50);
  const [isDraggingSplit, setIsDraggingSplit] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // Zoom Loupe State
  const [loupePos, setLoupePos] = useState({ x: 50, y: 50 });
  const [showLoupe, setShowLoupe] = useState(false);

  // File state
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string>('/images/project_streaming.jpg');
  const [convertedUrl, setConvertedUrl] = useState<string>('/images/project_streaming.jpg');
  const [origSize, setOrigSize] = useState<number>(1024 * 1024 * 1.25);
  const [convertedSize, setConvertedSize] = useState<number>(1024 * 315);
  const [dimensions, setDimensions] = useState({ w: 1200, h: 800 });

  // Batch Folder state
  const [batchMode, setBatchMode] = useState(false);
  const [batchFiles, setBatchFiles] = useState<BatchItem[]>([]);
  const [batchFolderName, setBatchFolderName] = useState('My_Images_Folder');
  const [batchProgress, setBatchProgress] = useState(0);
  const [batchZipBlob, setBatchZipBlob] = useState<Blob | null>(null);
  const [isBatchProcessing, setIsBatchProcessing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const splitStageRef = useRef<HTMLDivElement>(null);
  const loupeStageRef = useRef<HTMLDivElement>(null);

  // Trigger conversion whenever settings change
  useEffect(() => {
    convertCurrentImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetFormat, quality, scale, filter]);

  const convertCurrentImage = () => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const targetW = Math.max(1, Math.round(img.naturalWidth * scale));
      const targetH = Math.max(1, Math.round(img.naturalHeight * scale));
      setDimensions({ w: targetW, h: targetH });

      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      if (filter === 'grayscale') ctx.filter = 'grayscale(100%)';
      else if (filter === 'sharpen') ctx.filter = 'contrast(135%) saturate(120%)';
      else if (filter === 'sepia') ctx.filter = 'sepia(100%)';
      else if (filter === 'invert') ctx.filter = 'invert(100%)';

      ctx.drawImage(img, 0, 0, targetW, targetH);

      const mime = targetFormat === 'jpeg' ? 'image/jpeg' : targetFormat === 'png' ? 'image/png' : targetFormat === 'avif' ? 'image/avif' : 'image/webp';
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setConvertedUrl(url);
          setConvertedSize(blob.size);
        }
      }, mime, quality / 100);
    };
    img.src = originalUrl;
  };

  const handleSingleFile = (file: File) => {
    setBatchMode(false);
    setCurrentFile(file);
    setOrigSize(file.size);
    const url = URL.createObjectURL(file);
    setOriginalUrl(url);
    setTimeout(convertCurrentImage, 50);
  };

  // Folder batch conversion with complete tree preservation
  const handleFolderUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const fileList = Array.from(e.target.files).filter((f) => f.type.startsWith('image/') || /\.(jpe?g|png|webp|avif|bmp|gif)$/i.test(f.name));
    if (fileList.length === 0) return alert('No image files found in folder.');

    setBatchMode(true);
    setIsBatchProcessing(true);
    setBatchZipBlob(null);

    const firstRel = fileList[0].webkitRelativePath || fileList[0].name;
    const rootName = firstRel.includes('/') ? firstRel.split('/')[0] : 'Images_Folder';
    setBatchFolderName(rootName);

    const items: BatchItem[] = fileList.map((f) => ({
      file: f,
      relativePath: f.webkitRelativePath || f.name,
      origSize: f.size,
      convertedBlob: null,
      convertedSize: 0,
      status: 'pending',
    }));

    setBatchFiles(items);
    await runBatch(items, rootName);
  };

  const runBatch = async (items: BatchItem[], rootName: string) => {
    const zip = new JSZip();
    let completed = 0;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      item.status = 'converting';
      setBatchFiles([...items]);

      try {
        const blob = await new Promise<Blob>((resolve, reject) => {
          const img = new Image();
          const u = URL.createObjectURL(item.file);
          img.onload = () => {
            URL.revokeObjectURL(u);
            const c = document.createElement('canvas');
            c.width = Math.max(1, Math.round(img.naturalWidth * scale));
            c.height = Math.max(1, Math.round(img.naturalHeight * scale));
            const ctx = c.getContext('2d');
            if (filter === 'grayscale') ctx!.filter = 'grayscale(100%)';
            else if (filter === 'sharpen') ctx!.filter = 'contrast(135%) saturate(120%)';
            else if (filter === 'sepia') ctx!.filter = 'sepia(100%)';
            else if (filter === 'invert') ctx!.filter = 'invert(100%)';

            ctx?.drawImage(img, 0, 0, c.width, c.height);
            const mime = targetFormat === 'jpeg' ? 'image/jpeg' : targetFormat === 'png' ? 'image/png' : targetFormat === 'avif' ? 'image/avif' : 'image/webp';
            c.toBlob((b) => resolve(b || item.file), mime, quality / 100);
          };
          img.onerror = () => reject(new Error('Image failed to decode'));
          img.src = u;
        });

        item.convertedBlob = blob;
        item.convertedSize = blob.size;
        item.status = 'done';

        const ext = targetFormat === 'jpeg' ? 'jpg' : targetFormat;
        const targetPath = item.relativePath.replace(/\.[^/.]+$/, '') + '.' + ext;
        zip.file(`${rootName}_${ext.toUpperCase()}/${targetPath}`, blob);
      } catch {
        item.status = 'error';
      }

      completed++;
      setBatchProgress(Math.round((completed / items.length) * 100));
      setBatchFiles([...items]);
    }

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    setBatchZipBlob(zipBlob);
    setIsBatchProcessing(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (e.dataTransfer.files.length === 1) {
        handleSingleFile(e.dataTransfer.files[0]);
      } else {
        // Multiple files drop
        const fileList = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'));
        if (fileList.length === 0) return;
        setBatchMode(true);
        const rootName = 'Dropped_Batch_Images';
        setBatchFolderName(rootName);
        const items: BatchItem[] = fileList.map((f) => ({
          file: f,
          relativePath: f.name,
          origSize: f.size,
          convertedBlob: null,
          convertedSize: 0,
          status: 'pending',
        }));
        setBatchFiles(items);
        runBatch(items, rootName);
      }
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const savedPct = origSize > 0 ? (((origSize - convertedSize) / origSize) * 100).toFixed(1) : '0';

  // Apply Quick Optimization Presets
  const applyPreset = (preset: 'web' | 'fidelity' | 'avif' | 'png' | 'thumb') => {
    if (preset === 'web') {
      setTargetFormat('webp');
      setQuality(75);
      setScale(1);
    } else if (preset === 'fidelity') {
      setTargetFormat('webp');
      setQuality(92);
      setScale(1);
    } else if (preset === 'avif') {
      setTargetFormat('avif');
      setQuality(80);
      setScale(1);
    } else if (preset === 'png') {
      setTargetFormat('png');
      setQuality(100);
      setScale(1);
    } else if (preset === 'thumb') {
      setTargetFormat('webp');
      setQuality(70);
      setScale(0.5);
    }
  };

  return (
    <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '24px 24px 80px' }}>
      <Navbar />

      <main style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Header Breadcrumbs & Title */}
        <div>
          <Link href="/tools" style={{ color: 'var(--text-dim)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', marginBottom: 16 }}>
            <ArrowLeft size={14} /> Back to Tools Hub
          </Link>
          <div className="section-label">Media &amp; Batch Compression Studio</div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 12 }}>
            Next-Gen <span style={{ color: 'var(--accent-emerald)' }}>Image &amp; Complete Folder</span> Studio
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '800px', lineHeight: 1.6 }}>
            Convert individual images or entire folder trees with exact preserved naming. Compare quality in real-time with dual previews, split slider, and zoom loupe. 100% in-browser Canvas 2D engine.
          </p>
        </div>

        {/* Hidden inputs */}
        <input type="file" ref={fileInputRef} accept="image/*" style={{ display: 'none' }} onChange={(e) => e.target.files?.[0] && handleSingleFile(e.target.files[0])} />
        {/* @ts-expect-error webkitdirectory is standard in HTML5 browsers */}
        <input type="file" ref={folderInputRef} webkitdirectory="" directory="" multiple style={{ display: 'none' }} onChange={handleFolderUpload} />

        {/* Master Controls Studio Card */}
        <div className="controls-card" style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-glass-bright)',
          borderRadius: '16px',
          padding: '28px',
          boxShadow: 'var(--shadow-card)',
        }}>
          {/* Format Selector Row */}
          <div className="control-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
            <div>
              <span className="control-title" style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Target Output Format:
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginLeft: 8, fontFamily: 'JetBrains Mono' }}>
                (WebP &amp; AVIF provide up to 80% compression savings)
              </span>
            </div>

            <div className="format-pills" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {(['webp', 'avif', 'jpeg', 'png', 'bmp'] as const).map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  className={`format-btn ${targetFormat === fmt ? 'active' : ''}`}
                  onClick={() => setTargetFormat(fmt)}
                  style={{
                    background: targetFormat === fmt ? 'var(--pill-active-bg)' : 'var(--bg-input)',
                    color: targetFormat === fmt ? 'var(--pill-active-text)' : 'var(--text-secondary)',
                    border: '1px solid ' + (targetFormat === fmt ? 'var(--accent-emerald)' : 'var(--border-glass)'),
                    padding: '8px 18px',
                    borderRadius: '8px',
                    fontWeight: 800,
                    fontSize: '0.86rem',
                    fontFamily: 'JetBrains Mono, monospace',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {fmt.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '24px', padding: '12px 16px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <span style={{ fontSize: '0.75rem', fontFamily: 'JetBrains Mono', color: 'var(--text-dim)', textTransform: 'uppercase', marginRight: 4 }}>
              ⚡ Quick Presets:
            </span>
            <button
              type="button"
              onClick={() => applyPreset('web')}
              style={{
                background: targetFormat === 'webp' && quality === 75 ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                color: '#34d399',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.76rem',
                cursor: 'pointer',
                fontFamily: 'JetBrains Mono',
              }}
            >
              🚀 Web Ultra-Light (WebP 75%)
            </button>

            <button
              type="button"
              onClick={() => applyPreset('fidelity')}
              style={{
                background: targetFormat === 'webp' && quality === 92 ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                color: '#38bdf8',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.76rem',
                cursor: 'pointer',
                fontFamily: 'JetBrains Mono',
              }}
            >
              💎 High Fidelity (WebP 92%)
            </button>

            <button
              type="button"
              onClick={() => applyPreset('avif')}
              style={{
                background: targetFormat === 'avif' ? 'rgba(168, 85, 247, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                color: '#c084fc',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.76rem',
                cursor: 'pointer',
                fontFamily: 'JetBrains Mono',
              }}
            >
              ⚡ Next-Gen AVIF (80%)
            </button>

            <button
              type="button"
              onClick={() => applyPreset('png')}
              style={{
                background: targetFormat === 'png' ? 'rgba(251, 191, 36, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                color: '#fbbf24',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.76rem',
                cursor: 'pointer',
                fontFamily: 'JetBrains Mono',
              }}
            >
              🖼️ Lossless PNG
            </button>

            <button
              type="button"
              onClick={() => applyPreset('thumb')}
              style={{
                background: scale === 0.5 ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'var(--text-secondary)',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.76rem',
                cursor: 'pointer',
                fontFamily: 'JetBrains Mono',
              }}
            >
              📱 Thumbnail (50% scale)
            </button>
          </div>

          {/* Sliders Grid */}
          <div className="settings-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '24px' }}>
            {/* Compression Quality Slider */}
            <div className="slider-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="slider-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="control-title" style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Compression Quality
                </span>
                <span className="slider-value-badge" style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: 'var(--accent-emerald)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  fontFamily: 'JetBrains Mono',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                }}>
                  {quality}%
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-emerald)', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'JetBrains Mono' }}>
                <span>Max Compression (Smallest Size)</span>
                <span>Lossless Quality</span>
              </div>
            </div>

            {/* Resolution Scaler */}
            <div className="extras-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span className="control-title" style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Output Resolution Scaler:
              </span>
              <select
                className="select-custom"
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                style={{
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-glass)',
                  color: 'var(--text-primary)',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  fontSize: '0.88rem',
                  outline: 'none',
                }}
              >
                <option value={1}>100% Original Resolution ({dimensions.w} × {dimensions.h} px)</option>
                <option value={0.75}>75% Scale ({Math.round(dimensions.w * 0.75)} × {Math.round(dimensions.h * 0.75)} px)</option>
                <option value={0.5}>50% Scale ({Math.round(dimensions.w * 0.5)} × {Math.round(dimensions.h * 0.5)} px)</option>
                <option value={0.25}>25% Thumbnail ({Math.round(dimensions.w * 0.25)} × {Math.round(dimensions.h * 0.25)} px)</option>
              </select>
            </div>

            {/* Filter Effects */}
            <div className="extras-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span className="control-title" style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Color / Enhancement Filter:
              </span>
              <select
                className="select-custom"
                value={filter}
                onChange={(e) => setFilter(e.target.value as typeof filter)}
                style={{
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-glass)',
                  color: 'var(--text-primary)',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  fontSize: '0.88rem',
                  outline: 'none',
                }}
              >
                <option value="none">Normal (No Filter)</option>
                <option value="grayscale">Grayscale (Black &amp; White)</option>
                <option value="sharpen">Sharpen &amp; High Contrast</option>
                <option value="sepia">Warm Sepia</option>
                <option value="invert">Inverted Colors</option>
              </select>
            </div>
          </div>

          {/* Action Row & Drag and Drop Target */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            style={{
              border: isDragOver ? '2px dashed var(--accent-emerald)' : '2px dashed rgba(255, 255, 255, 0.12)',
              background: isDragOver ? 'rgba(16, 185, 129, 0.08)' : 'rgba(0, 0, 0, 0.2)',
              borderRadius: '12px',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              transition: 'all 0.15s ease',
            }}
          >
            <div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.94rem' }}>
                📁 Drag &amp; Drop Images or Whole Folder Here
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: 2 }}>
                Supports WebP, AVIF, PNG, JPEG, BMP &bull; Nested directories preserved for ZIP export
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-primary"
                onClick={() => fileInputRef.current?.click()}
                style={{ padding: '10px 20px', fontSize: '0.88rem' }}
              >
                <Upload size={16} /> Choose Image File
              </button>

              <button
                type="button"
                className="btn-secondary"
                onClick={() => folderInputRef.current?.click()}
                style={{ borderColor: 'var(--border-accent)', color: 'var(--accent-emerald)', padding: '10px 20px', fontSize: '0.88rem' }}
              >
                <FolderDown size={16} /> Upload Entire Folder
              </button>
            </div>
          </div>
        </div>

        {/* Batch Folder Mode Banner & File Queue */}
        {batchMode && (
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-accent)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            boxShadow: 'var(--shadow-card)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="pulse-dot"></span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    📁 Batch Folder: {batchFolderName}
                  </h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: 4 }}>
                  {batchFiles.length} images processed with target format <strong style={{ color: 'var(--accent-emerald)' }}>{targetFormat.toUpperCase()}</strong> ({quality}% quality)
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontFamily: 'JetBrains Mono', color: '#34d399', fontWeight: 800, fontSize: '1.1rem' }}>
                  {batchProgress}% Completed
                </span>
                {batchZipBlob && (
                  <a
                    href={URL.createObjectURL(batchZipBlob)}
                    download={`${batchFolderName}_${targetFormat.toUpperCase()}.zip`}
                    className="btn-primary"
                    style={{ display: 'inline-flex', padding: '10px 20px', fontSize: '0.9rem' }}
                  >
                    <Download size={16} /> Download Converted Folder (.ZIP) ({formatBytes(batchZipBlob.size)})
                  </a>
                )}
              </div>
            </div>

            {/* Progress bar */}
            <div className="progress-bar-bg" style={{ marginBottom: 20, height: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 999, overflow: 'hidden' }}>
              <div
                className="progress-bar-fill"
                style={{
                  width: `${batchProgress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--accent-emerald), #38bdf8)',
                  transition: 'width 0.2s ease',
                }}
              />
            </div>

            {/* Files Queue Table */}
            <div style={{
              maxHeight: '320px',
              overflowY: 'auto',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.06)',
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', fontFamily: 'JetBrains Mono, monospace' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', color: 'var(--text-dim)', textAlign: 'left' }}>
                    <th style={{ padding: '10px 14px' }}>Relative Path</th>
                    <th style={{ padding: '10px 14px' }}>Original</th>
                    <th style={{ padding: '10px 14px' }}>Converted</th>
                    <th style={{ padding: '10px 14px' }}>Savings</th>
                    <th style={{ padding: '10px 14px' }}>Status</th>
                    <th style={{ padding: '10px 14px', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {batchFiles.map((item, idx) => {
                    const saved = item.origSize > 0 && item.convertedSize > 0 
                      ? (((item.origSize - item.convertedSize) / item.origSize) * 100).toFixed(1)
                      : null;
                    return (
                      <tr key={idx} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                        <td style={{ padding: '10px 14px', color: 'var(--text-primary)' }}>{item.relativePath}</td>
                        <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>{formatBytes(item.origSize)}</td>
                        <td style={{ padding: '10px 14px', color: item.convertedSize ? 'var(--accent-emerald)' : 'var(--text-dim)' }}>
                          {item.convertedSize ? formatBytes(item.convertedSize) : '—'}
                        </td>
                        <td style={{ padding: '10px 14px' }}>
                          {saved ? (
                            <span style={{ color: Number(saved) > 0 ? '#34d399' : '#fbbf24', fontWeight: 700 }}>
                              {Number(saved) > 0 ? `-${saved}%` : `+${Math.abs(Number(saved))}%`}
                            </span>
                          ) : '—'}
                        </td>
                        <td style={{ padding: '10px 14px' }}>
                          {item.status === 'done' && <span style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: 4 }}><Check size={14} /> Done</span>}
                          {item.status === 'converting' && <span style={{ color: '#38bdf8' }}>Converting...</span>}
                          {item.status === 'pending' && <span style={{ color: 'var(--text-dim)' }}>Queued</span>}
                          {item.status === 'error' && <span style={{ color: '#ef4444' }}>Error</span>}
                        </td>
                        <td style={{ padding: '10px 14px', textAlign: 'right' }}>
                          {item.convertedBlob && (
                            <a
                              href={URL.createObjectURL(item.convertedBlob)}
                              download={item.relativePath.replace(/\.[^/.]+$/, '') + '.' + (targetFormat === 'jpeg' ? 'jpg' : targetFormat)}
                              style={{ color: 'var(--accent-emerald)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                            >
                              <Download size={13} /> Single
                            </a>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => setBatchMode(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', fontSize: '0.82rem' }}
              >
                ← Return to Single Image Comparison View
              </button>
            </div>
          </div>
        )}

        {/* Single Mode Visual Comparison Studio ("Dono Preview + Split Slider + Zoom Loupe") */}
        {!batchMode && (
          <div>
            {/* View Mode Switcher & Telemetry Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                <span className="savings-tag" style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  color: '#34d399',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  fontFamily: 'JetBrains Mono',
                }}>
                  ⚡ {Number(savedPct) > 0 ? `-${savedPct}% Smaller` : `+${Math.abs(Number(savedPct))}% Size`}
                </span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', fontFamily: 'JetBrains Mono' }}>
                  {formatBytes(origSize)} ➔ <strong style={{ color: 'var(--text-primary)' }}>{formatBytes(convertedSize)}</strong>
                </span>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.82rem' }}>
                  ({dimensions.w} × {dimensions.h} px)
                </span>
              </div>

              {/* Preview Mode Switcher */}
              <div className="view-mode-tabs" style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.05)', padding: '4px', borderRadius: '8px', gap: '4px' }}>
                <button
                  type="button"
                  className={`tab-btn ${activeTab === 'split' ? 'active' : ''}`}
                  onClick={() => setActiveTab('split')}
                  style={{
                    background: activeTab === 'split' ? 'var(--accent-emerald)' : 'transparent',
                    color: activeTab === 'split' ? '#070a12' : 'var(--text-secondary)',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: '6px',
                    fontWeight: 700,
                    fontSize: '0.84rem',
                    cursor: 'pointer',
                  }}
                >
                  ↔ Interactive Split Slider
                </button>

                <button
                  type="button"
                  className={`tab-btn ${activeTab === 'dual' ? 'active' : ''}`}
                  onClick={() => setActiveTab('dual')}
                  style={{
                    background: activeTab === 'dual' ? 'var(--accent-emerald)' : 'transparent',
                    color: activeTab === 'dual' ? '#070a12' : 'var(--text-secondary)',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: '6px',
                    fontWeight: 700,
                    fontSize: '0.84rem',
                    cursor: 'pointer',
                  }}
                >
                  ☷ Side-by-Side Dual View
                </button>

                <button
                  type="button"
                  className={`tab-btn ${activeTab === 'loupe' ? 'active' : ''}`}
                  onClick={() => setActiveTab('loupe')}
                  style={{
                    background: activeTab === 'loupe' ? 'var(--accent-emerald)' : 'transparent',
                    color: activeTab === 'loupe' ? '#070a12' : 'var(--text-secondary)',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: '6px',
                    fontWeight: 700,
                    fontSize: '0.84rem',
                    cursor: 'pointer',
                  }}
                >
                  🔍 Zoom Loupe (3x)
                </button>
              </div>
            </div>

            {/* View 1: Interactive Split Slider */}
            {activeTab === 'split' && (
              <div
                ref={splitStageRef}
                className="split-stage"
                onMouseDown={() => setIsDraggingSplit(true)}
                onMouseUp={() => setIsDraggingSplit(false)}
                onTouchStart={() => setIsDraggingSplit(true)}
                onTouchEnd={() => setIsDraggingSplit(false)}
                onTouchMove={(e) => {
                  if (!isDraggingSplit || !splitStageRef.current) return;
                  const rect = splitStageRef.current.getBoundingClientRect();
                  const touch = e.touches[0];
                  const pct = Math.max(0, Math.min(100, ((touch.clientX - rect.left) / rect.width) * 100));
                  setSplitPos(pct);
                }}
                onMouseMove={(e) => {
                  if (!isDraggingSplit || !splitStageRef.current) return;
                  const rect = splitStageRef.current.getBoundingClientRect();
                  const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                  setSplitPos(pct);
                }}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '520px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: isDraggingSplit ? 'ew-resize' : 'default',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  boxShadow: '0 20px 50px -15px rgba(0, 0, 0, 0.8)',
                  userSelect: 'none',
                }}
              >
                {/* Badges */}
                <span className="split-badge badge-original" style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  background: 'rgba(0, 0, 0, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  fontFamily: 'JetBrains Mono',
                  zIndex: 10,
                }}>
                  ORIGINAL ({formatBytes(origSize)})
                </span>

                <span className="split-badge badge-converted" style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(16, 185, 129, 0.9)',
                  color: '#070a12',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  fontFamily: 'JetBrains Mono',
                  zIndex: 10,
                }}>
                  OPTIMIZED {targetFormat.toUpperCase()} ({formatBytes(convertedSize)})
                </span>

                {/* Base Image (Converted) */}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#080d19' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={convertedUrl} alt="Converted" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>

                {/* Overlay Image (Original) clipped to split slider */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    clipPath: `polygon(0 0, ${splitPos}% 0, ${splitPos}% 100%, 0 100%)`,
                    background: '#080d19',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={originalUrl} alt="Original" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>

                {/* Vertical Divider Line with Grab Handle */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: `${splitPos}%`,
                    width: '3px',
                    background: '#10b981',
                    transform: 'translateX(-50%)',
                    zIndex: 20,
                    boxShadow: '0 0 15px rgba(16, 185, 129, 0.8)',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: '#10b981',
                      color: '#070a12',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '1rem',
                      boxShadow: '0 0 20px rgba(0, 0, 0, 0.8)',
                      cursor: 'ew-resize',
                    }}
                  >
                    ↔
                  </div>
                </div>
              </div>
            )}

            {/* View 2: Side by Side Dual */}
            {activeTab === 'dual' && (
              <div className="dual-preview-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '24px' }}>
                <div className="preview-card" style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                }}>
                  <div className="preview-card-header" style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-glass)' }}>
                    <span className="card-title" style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Original Source</span>
                    <span style={{ fontSize: '0.72rem', background: 'var(--bg-input)', padding: '2px 8px', borderRadius: '4px', fontFamily: 'JetBrains Mono', color: 'var(--text-secondary)' }}>ORIGINAL</span>
                  </div>
                  <div className="image-viewport" style={{ height: '360px', background: 'var(--bg-input)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={originalUrl} alt="Original source" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  </div>
                  <div className="card-footer" style={{ padding: '12px 18px', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-glass)' }}>
                    <div>Size: <strong style={{ color: 'var(--text-primary)' }}>{formatBytes(origSize)}</strong></div>
                    <div>{dimensions.w} × {dimensions.h} px</div>
                  </div>
                </div>

                <div className="preview-card converted-card" style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-accent)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                }}>
                  <div className="preview-card-header" style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-glass)' }}>
                    <span className="card-title" style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Optimized {targetFormat.toUpperCase()}</span>
                    <span style={{ fontSize: '0.72rem', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--accent-emerald)', padding: '2px 8px', borderRadius: '4px', fontFamily: 'JetBrains Mono', fontWeight: 700 }}>
                      {targetFormat.toUpperCase()}
                    </span>
                  </div>
                  <div className="image-viewport" style={{ height: '360px', background: 'var(--bg-input)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={convertedUrl} alt="Converted result" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  </div>
                  <div className="card-footer" style={{ padding: '12px 18px', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-glass)' }}>
                    <div style={{ color: 'var(--accent-emerald)', fontWeight: 800 }}>Size: {formatBytes(convertedSize)}</div>
                    <div>Saved: -{formatBytes(Math.max(0, origSize - convertedSize))} ({savedPct}%)</div>
                  </div>
                </div>
              </div>
            )}

            {/* View 3: Zoom Loupe (3x pixel inspection) */}
            {activeTab === 'loupe' && (
              <div
                ref={loupeStageRef}
                onMouseEnter={() => setShowLoupe(true)}
                onMouseLeave={() => setShowLoupe(false)}
                onMouseMove={(e) => {
                  if (!loupeStageRef.current) return;
                  const rect = loupeStageRef.current.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  setLoupePos({ x, y });
                }}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '520px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  background: '#070a14',
                  cursor: 'crosshair',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={convertedUrl} alt="Loupe view" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />

                {/* Loupe hint */}
                <div style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(0,0,0,0.8)', padding: '6px 12px', borderRadius: '6px', fontSize: '0.78rem', color: '#fff', fontFamily: 'JetBrains Mono' }}>
                  Hover over image to inspect pixel clarity at 3x magnification
                </div>

                {/* Floating Magnifier Circle */}
                {showLoupe && (
                  <div
                    style={{
                      position: 'absolute',
                      top: `${loupePos.y}%`,
                      left: `${loupePos.x}%`,
                      transform: 'translate(-50%, -50%)',
                      width: '180px',
                      height: '180px',
                      borderRadius: '50%',
                      border: '3px solid var(--accent-emerald)',
                      boxShadow: '0 0 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(16, 185, 129, 0.4)',
                      backgroundImage: `url(${convertedUrl})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '300%',
                      backgroundPosition: `${loupePos.x}% ${loupePos.y}%`,
                      pointerEvents: 'none',
                    }}
                  />
                )}
              </div>
            )}

            {/* Single Download Action */}
            <div style={{ marginTop: 24, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a
                href={convertedUrl}
                download={`converted_q${quality}.${targetFormat === 'jpeg' ? 'jpg' : targetFormat}`}
                className="btn-primary"
                style={{ padding: '12px 30px', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: 8 }}
              >
                <Download size={18} /> Download Single {targetFormat.toUpperCase()} ({formatBytes(convertedSize)})
              </a>

              <button
                type="button"
                className="btn-secondary"
                onClick={() => folderInputRef.current?.click()}
                style={{ padding: '12px 24px', fontSize: '0.95rem', borderColor: 'var(--border-accent)', color: '#34d399' }}
              >
                <FolderDown size={18} /> Convert Entire Folder Instead ➔
              </button>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
