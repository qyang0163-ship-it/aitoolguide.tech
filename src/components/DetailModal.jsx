import { useState, useEffect } from 'react';

export default function DetailModal({ chip, isOpen, onClose }) {
  if (!isOpen || !chip) return null;

  const originalSpecs = {
    model: chip.originalEquivalent,
    core: 'ARM Cortex-M3',
    freq: '72MHz',
    flash: '64KB',
    sram: '20KB',
    gpio: '37',
    voltage: '2.0V-3.6V',
    package: 'LQFP48',
    temp: '-40°C to 85°C',
  };

  const substituteSpecs = {
    model: chip.name,
    core: 'ARM Cortex-M3',
    freq: '96MHz',
    flash: '128KB',
    sram: '32KB',
    gpio: '37',
    voltage: '1.8V-3.6V',
    package: 'LQFP48',
    temp: '-40°C to 105°C',
  };

  const differences = [
    { item: '主频', original: '72MHz', substitute: '96MHz', status: 'upgrade', note: '提升 33%' },
    { item: 'Flash', original: '64KB', substitute: '128KB', status: 'upgrade', note: '翻倍' },
    { item: 'SRAM', original: '20KB', substitute: '32KB', status: 'upgrade', note: '提升 60%' },
    { item: '工作温度', original: '-40~85°C', substitute: '-40~105°C', status: 'upgrade', note: '工业级' },
    { item: '引脚兼容', original: 'LQFP48', substitute: 'LQFP48', status: 'same', note: '100% 兼容' },
    { item: '寄存器映射', original: '标准', substitute: '标准+扩展', status: 'warning', note: '需适配' },
  ];

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(20px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={onClose}>
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        border: '1px solid #334155', borderRadius: '20px',
        width: '90%', maxWidth: '1000px', maxHeight: '90vh',
        overflow: 'auto', padding: '32px',
      }} onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ color: '#22d3ee', fontSize: '20px', fontWeight: 'bold' }}>
            替代方案深度对比分析
          </h2>
          <button onClick={onClose} style={{
            background: 'transparent', border: '1px solid #475569',
            color: '#94a3b8', padding: '8px 16px', borderRadius: '8px',
            cursor: 'pointer', fontSize: '12px',
          }}>CLOSE [ESC]</button>
        </div>

        {/* Three Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '24px', marginBottom: '24px' }}>
          
          {/* Original */}
          <div style={{ background: 'rgba(244, 63, 94, 0.05)', border: '1px solid rgba(244, 63, 94, 0.2)', borderRadius: '12px', padding: '20px' }}>
            <div style={{ color: '#f43f5e', fontSize: '12px', marginBottom: '8px', letterSpacing: '0.1em' }}>ORIGINAL</div>
            <div style={{ color: '#e2e8f0', fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>{originalSpecs.model}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {Object.entries(originalSpecs).slice(1).map(([key, value]) => (
                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ color: '#64748b' }}>{key.toUpperCase()}</span>
                  <span style={{ color: '#94a3b8' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* VS Badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #22d3ee, #a78bfa)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '14px', fontWeight: 'bold', color: '#020617',
            }}>VS</div>
          </div>

          {/* Substitute */}
          <div style={{ background: 'rgba(34, 211, 238, 0.05)', border: '1px solid rgba(34, 211, 238, 0.2)', borderRadius: '12px', padding: '20px' }}>
            <div style={{ color: '#22d3ee', fontSize: '12px', marginBottom: '8px', letterSpacing: '0.1em' }}>SUBSTITUTE</div>
            <div style={{ color: '#e2e8f0', fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>{substituteSpecs.model}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {Object.entries(substituteSpecs).slice(1).map(([key, value]) => (
                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ color: '#64748b' }}>{key.toUpperCase()}</span>
                  <span style={{ color: '#22d3ee' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Difference Analysis */}
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
          <div style={{ color: '#a78bfa', fontSize: '12px', marginBottom: '16px', letterSpacing: '0.1em' }}>DIFFERENCE ANALYSIS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {differences.map((diff, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '100px 1fr 1fr 80px 120px', gap: '16px', alignItems: 'center', padding: '8px 0', borderBottom: i < differences.length - 1 ? '1px solid #1e293b' : 'none' }}>
                <span style={{ color: '#64748b', fontSize: '12px' }}>{diff.item}</span>
                <span style={{ color: '#f43f5e', fontSize: '12px' }}>{diff.original}</span>
                <span style={{ color: '#22d3ee', fontSize: '12px' }}>{diff.substitute}</span>
                <span style={{
                  fontSize: '10px', padding: '2px 8px', borderRadius: '4px',
                  background: diff.status === 'upgrade' ? 'rgba(34, 211, 238, 0.1)' : diff.status === 'same' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(251, 191, 36, 0.1)',
                  color: diff.status === 'upgrade' ? '#22d3ee' : diff.status === 'same' ? '#22c55e' : '#fbbf24',
                  border: `1px solid ${diff.status === 'upgrade' ? 'rgba(34, 211, 238, 0.3)' : diff.status === 'same' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(251, 191, 36, 0.3)'}`,
                }}>{diff.status === 'upgrade' ? '提升' : diff.status === 'same' ? '相同' : '注意'}</span>
                <span style={{ color: '#94a3b8', fontSize: '11px' }}>{diff.note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '16px', fontSize: '11px', color: '#64748b' }}>
            <span>数据来源: 厂商规格书</span>
            <span>更新: 2026-05-10</span>
          </div>
          <button style={{
            background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
            color: '#020617', fontWeight: 'bold',
            padding: '12px 32px', borderRadius: '8px',
            border: 'none', cursor: 'pointer', fontSize: '12px',
            letterSpacing: '0.05em',
          }}>
            [VIP] 下载技术手册
          </button>
        </div>
      </div>
    </div>
  );
}
