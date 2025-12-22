import React from 'react';
import { useEthioIntl } from '../../index';

export default function DashboardPage() {
  const { tNamespace } = useEthioIntl();

  return (
    <div>
      <h1>{tNamespace('dashboard', 'title')}</h1>
      <p>{tNamespace('dashboard', 'welcome', { name: 'User' })}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '20px' }}>
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h3>{tNamespace('dashboard', 'stats.totalUsers')}</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>1,234</p>
        </div>

        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h3>{tNamespace('dashboard', 'stats.revenue')}</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>$45,678</p>
        </div>
      </div>
    </div>
  );
}
