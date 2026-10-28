'use client';

import React, { useState, useRef } from 'react';
import JSZip from 'jszip';
import { 
  Image as ImageIcon, Upload, Download, FolderDown, 
  Check, CheckCircle2, Sliders, Layers, Sparkles, RefreshCw
} from 'lucide-react';

interface BatchFileItem {
  name: string;
  relativePath: string;
  origSize: number;
  convertedSize?: number;
  status: 'pending' | 'converting' | 'done' | 'error';
  convertedBlob?: Blob;
}

export default function ImageConverterTool() {
  const [targetFormat, setTargetFormat] = useState<'webp' | 'avif' | 'jpeg' | 'png'>('webp');
  const [quality, setQuality] = useState(85);
  const [scale, setScale] = useState(1);
  const [previewSrc, setPreviewSrc] = useState<string>('/images/project_streaming.jpg');
  const [fileName, setFileName] = useState('project_streaming.jpg');
  const [origSize, setOrigSize] = useState(480000);
  const [convertedSize, setConvertedSize] = useState(115000);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [converting, setConverting] = useState(false);
  const [batchMode, setBatchMode] = useState(false);
  const [batchFiles, setBatchFiles] = useState<BatchFileItem[]>([]);
  const [batchFolderName, setBatchFolderName] = useState('');
  const [sliderPos, setSliderPos] = useState(50);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const splitRef = useRef<HTMLDivElement>(null);

  const formatBytes = (bytes: number) => {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const handleSingleFile = (file: File) => {
    setBatchMode(false);
    setFileName(file.name);
    setOrigSize(file.size);
    const url = URL.createObjectURL(file);
    setPreviewSrc(url);
    processImageConversion(url, file.name);
  };

  const processImageConversion = (src: string, originalName: string) => {
    setConverting(true);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const w = Math.round(img.naturalWidth * scale);
      const h = Math.round(img.naturalHeight * scale);
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setConverting(false);
        return;
      }

      ctx.drawImage(img, 0, 0, w, h);
      const mime = targetFormat === 'jpeg' ? 'image/jpeg' : targetFormat === 'png' ? 'image/png' : targetFormat === 'avif' ? 'image/avif' : 'image/webp';
      
      canvas.toBlob((blob) => {
        setConverting(false);
        if (blob) {
          setConvertedSize(blob.size);
          const dlUrl = URL.createObjectURL(blob);
          setConvertedUrl(dlUrl);
        }
      }, mime, quality / 100);
    };
    img.src = src;
  };

  // Re-run conversion when format/quality/scale changes
  const applySettings = (fmt: typeof targetFormat, q: number, s: number) => {
    setTargetFormat(fmt);
    setQuality(q);
    setScale(s);
    if (!batchMode && previewSrc) {
      processImageConversion(previewSrc, fileName);
    }
  };

  // Folder Batch Upload
  const handleFolderUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setBatchMode(true);
    const fileList: File[] = Array.from(files).filter((f) => 
      /\.(jpe?g|png|webp|avif|bmp|gif)$/i.test(f.name)
    );

    if (fileList.length === 0) {
      alert('No supported image files found in the selected directory.');
      return;
    }

    const firstPath = fileList[0].webkitRelativePath || fileList[0].name;
    const folderName = firstPath.includes('/') ? firstPath.split('/')[0] : 'Images';
    setBatchFolderName(folderName);

    const items: BatchFileItem[] = fileList.map((f) => ({
      name: f.name,
      relativePath: f.webkitRelativePath || f.name,
      origSize: f.size,
      status: 'pending',
    }));

    setBatchFiles(items);
    setConverting(true);

    const updated = [...items];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      updated[i].status = 'converting';
      setBatchFiles([...updated]);

      try {
        const convertedBlob = await convertFileToBlob(file, targetFormat, quality / 100, scale);
        updated[i].status = 'done';
        updated[i].convertedBlob = convertedBlob;
        updated[i].convertedSize = convertedBlob.size;
      } catch {
        updated[i].status = 'error';
      }
      setBatchFiles([...updated]);
    }
    setConverting(false);
  };

  const convertFileToBlob = (file: File, format: string, q: number, s: number): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        const w = Math.round(img.naturalWidth * s);
        const h = Math.round(img.naturalHeight * s);
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('Canvas context failure'));

        ctx.drawImage(img, 0, 0, w, h);
        const mime = format === 'jpeg' ? 'image/jpeg' : format === 'png' ? 'image/png' : format === 'avif' ? 'image/avif' : 'image/webp';
        canvas.toBlob((b) => {
          if (b) resolve(b);
          else reject(new Error('Conversion failed'));
        }, mime, q);
      };
      img.onerror = reject;
      img.src = url;
    });
  };

  const handleDownloadSingle = () => {
    if (!convertedUrl) return;
    const a = document.createElement('a');
    a.href = convertedUrl;
    const base = fileName.replace(/\.[^.]+$/, '');
    a.download = `${base}_optimized.${targetFormat === 'jpeg' ? 'jpg' : targetFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadZip = async () => {
    const zip = new JSZip();
    batchFiles.forEach((item) => {
      if (item.convertedBlob) {
        const ext = targetFormat === 'jpeg' ? 'jpg' : targetFormat;
        const outPath = item.relativePath.replace(/\.[^/.]+$/, '') + '.' + ext;
        zip.file(outPath, item.convertedBlob);
      }
    });

    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${batchFolderName}_converted_${targetFormat}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const savedPct = origSize > 0 && convertedSize > 0 
    ? (((origSize - convertedSize) / origSize) * 100).toFixed(1) 
    : '0.0';

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-glass-bright)',
      borderRadius: '16px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      color: 'var(--text-primary)',
      boxShadow: 'var(--shadow-card)',
    }}>
      {/* Hidden file inputs */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => e.target.files?.[0] && handleSingleFile(e.target.files[0])}
      />
      <input
        type="file"
        ref={folderInputRef}
        {...({ webkitdirectory: '', directory: '' } as Record<string, string>)}
        multiple
        style={{ display: 'none' }}
        onChange={handleFolderUpload}
      />

      {/* Top Header Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'var(--bg-input)',
            border: '1px solid var(--border-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-emerald)',
          }}>
            <ImageIcon size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Batch &amp; Folder Image Converter
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>
              WebP &bull; AVIF &bull; PNG &bull; JPEG &bull; Preserve directory tree &amp; ZIP export
            </p>
          </div>
        </div>

        {/* Upload Action Buttons */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border-glass)',
              color: 'var(--text-primary)',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Upload size={14} style={{ color: 'var(--accent-emerald)' }} />
            <span>Select Image</span>
          </button>

          <button
            type="button"
            onClick={() => folderInputRef.current?.click()}
            style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border-accent)',
              color: 'var(--accent-emerald)',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <FolderDown size={14} />
            <span>Upload Whole Folder</span>
          </button>
        </div>
      </div>

      {/* Format & Compression Controls Bar */}
      <div style={{
        background: 'var(--bg-input)',
        border: '1px solid var(--border-glass)',
        borderRadius: '12px',
        padding: '16px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        alignItems: 'center',
      }}>
        {/* Format Selector */}
        <div>
          <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: 6, textTransform: 'uppercase' }}>
            Output Format
          </label>
          <div style={{ display: 'flex', gap: 4 }}>
            {(['webp', 'avif', 'png', 'jpeg'] as const).map((fmt) => (
              <button
                key={fmt}
                type="button"
                onClick={() => applySettings(fmt, quality, scale)}
                style={{
                  flex: 1,
                  background: targetFormat === fmt ? 'var(--pill-active-bg)' : 'var(--bg-card)',
                  color: targetFormat === fmt ? 'var(--pill-active-text)' : 'var(--text-secondary)',
                  border: '1px solid ' + (targetFormat === fmt ? 'var(--accent-emerald)' : 'var(--border-glass)'),
                  padding: '6px 8px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  fontFamily: 'JetBrains Mono, monospace',
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                }}
              >
                {fmt.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Quality Slider */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: 6, textTransform: 'uppercase' }}>
            <span>Quality</span>
            <span style={{ color: 'var(--accent-emerald)', fontFamily: 'JetBrains Mono' }}>{quality}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={quality}
            onChange={(e) => applySettings(targetFormat, Number(e.target.value), scale)}
            style={{ width: '100%', accentColor: 'var(--accent-emerald)', cursor: 'pointer' }}
          />
        </div>

        {/* Scale Selector */}
        <div>
          <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: 6, textTransform: 'uppercase' }}>
            Resolution Scaler
          </label>
          <select
            value={scale}
            onChange={(e) => applySettings(targetFormat, quality, Number(e.target.value))}
            style={{
              width: '100%',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-glass)',
              color: 'var(--text-primary)',
              padding: '6px 10px',
              borderRadius: '6px',
              fontSize: '0.8rem',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value={1}>100% Original Resolution</option>
            <option value={0.75}>75% Downscale</option>
            <option value={0.5}>50% Mobile Half-Size</option>
            <option value={0.25}>25% Thumbnail</option>
          </select>
        </div>
      </div>

      {/* =========================================
         VIEW 1: SINGLE IMAGE SPLIT PREVIEW
         ========================================= */}
      {!batchMode && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Comparison Stats Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
            padding: '10px 14px',
            background: 'var(--bg-input)',
            borderRadius: '10px',
            border: '1px solid var(--border-glass)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', fontSize: '0.84rem', fontFamily: 'JetBrains Mono' }}>
              <span style={{ color: 'var(--text-secondary)' }}>
                {fileName}: {formatBytes(origSize)} ➔ <strong style={{ color: 'var(--accent-emerald)' }}>{formatBytes(convertedSize)}</strong>
              </span>
              <span style={{
                background: 'rgba(16, 185, 129, 0.15)',
                color: 'var(--accent-emerald)',
                padding: '2px 8px',
                borderRadius: '6px',
                fontWeight: 800,
                fontSize: '0.78rem',
              }}>
                {Number(savedPct) > 0 ? `-${savedPct}% Reduction` : `${savedPct}%`}
              </span>
            </div>

            <button
              type="button"
              onClick={handleDownloadSingle}
              disabled={converting || !convertedUrl}
              style={{
                background: 'var(--accent-emerald)',
                color: '#fff',
                border: 'none',
                padding: '8px 18px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <Download size={14} />
              <span>Download {targetFormat.toUpperCase()}</span>
            </button>
          </div>

          {/* Interactive Split-Comparison Screen */}
          <div
            ref={splitRef}
            onMouseMove={(e) => {
              if (!splitRef.current) return;
              const rect = splitRef.current.getBoundingClientRect();
              const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
              setSliderPos((x / rect.width) * 100);
            }}
            style={{
              position: 'relative',
              height: '340px',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid var(--border-glass)',
              background: 'var(--bg-input)',
              userSelect: 'none',
              cursor: 'ew-resize',
            }}
          >
            {/* Converted Image (Base Layer) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={convertedUrl || previewSrc}
              alt="Optimized"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />

            {/* Original Image (Clipped Layer) */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${sliderPos}%`,
              height: '100%',
              overflow: 'hidden',
              borderRight: '2px solid var(--accent-emerald)',
              boxShadow: '2px 0 10px rgba(0,0,0,0.3)',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewSrc}
                alt="Original"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: splitRef.current ? `${splitRef.current.clientWidth}px` : '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* Split Drag Divider Indicator */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: `${sliderPos}%`,
              transform: 'translate(-50%, -50%)',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'var(--accent-emerald)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
              fontSize: '0.7rem',
              fontWeight: 800,
              pointerEvents: 'none',
            }}>
              ⇄
            </div>

            {/* Labels */}
            <span style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '3px 8px', borderRadius: 4, fontSize: '0.72rem', fontFamily: 'JetBrains Mono' }}>
              ORIGINAL ({formatBytes(origSize)})
            </span>
            <span style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '3px 8px', borderRadius: 4, fontSize: '0.72rem', fontFamily: 'JetBrains Mono' }}>
              OPTIMIZED {targetFormat.toUpperCase()} ({formatBytes(convertedSize)})
            </span>
          </div>
        </div>
      )}

      {/* =========================================
         VIEW 2: FOLDER BATCH PROCESSING TABLE
         ========================================= */}
      {batchMode && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px',
            background: 'var(--bg-input)',
            borderRadius: '10px',
            border: '1px solid var(--border-glass)',
            flexWrap: 'wrap',
            gap: 12,
          }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                📁 Folder: {batchFolderName} ({batchFiles.length} files)
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                Targeting {targetFormat.toUpperCase()} &bull; {quality}% quality &bull; Preserving nested structure
              </div>
            </div>

            <button
              type="button"
              onClick={handleDownloadZip}
              disabled={converting || batchFiles.filter((b) => b.status === 'done').length === 0}
              style={{
                background: 'var(--accent-emerald)',
                color: '#fff',
                border: 'none',
                padding: '8px 18px',
                borderRadius: '8px',
                fontSize: '0.84rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <FolderDown size={14} />
              <span>Download Converted ZIP Archive</span>
            </button>
          </div>

          {/* Files Table */}
          <div style={{
            maxHeight: '260px',
            overflowY: 'auto',
            border: '1px solid var(--border-glass)',
            borderRadius: '10px',
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', fontFamily: 'JetBrains Mono' }}>
              <thead>
                <tr style={{ background: 'var(--bg-input)', borderBottom: '1px solid var(--border-glass)', textAlign: 'left', color: 'var(--text-dim)' }}>
                  <th style={{ padding: '8px 12px' }}>Relative Path</th>
                  <th style={{ padding: '8px 12px' }}>Original</th>
                  <th style={{ padding: '8px 12px' }}>Optimized</th>
                  <th style={{ padding: '8px 12px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {batchFiles.map((file, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--text-primary)' }}>
                    <td style={{ padding: '8px 12px' }}>{file.relativePath}</td>
                    <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>{formatBytes(file.origSize)}</td>
                    <td style={{ padding: '8px 12px', color: 'var(--accent-emerald)' }}>
                      {file.convertedSize ? formatBytes(file.convertedSize) : '—'}
                    </td>
                    <td style={{ padding: '8px 12px' }}>
                      {file.status === 'done' && <span style={{ color: 'var(--accent-emerald)', display: 'inline-flex', alignItems: 'center', gap: 4 }}><Check size={12} /> Done</span>}
                      {file.status === 'converting' && <span style={{ color: 'var(--accent-cyan)' }}>Processing...</span>}
                      {file.status === 'pending' && <span style={{ color: 'var(--text-dim)' }}>Queued</span>}
                      {file.status === 'error' && <span style={{ color: '#ef4444' }}>Error</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            type="button"
            onClick={() => setBatchMode(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-dim)',
              fontSize: '0.78rem',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            ← Return to Single Image Mode
          </button>
        </div>
      )}
    </div>
  );
}
