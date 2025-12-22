import React from 'react';
import { useEthioIntl } from '../../index';

export default function UsersPage() {
  const { tNamespace } = useEthioIntl();

  return (
    <div>
      <h1>{tNamespace('users', 'title')}</h1>
      <button style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', marginBottom: '20px' }}>
        {tNamespace('users', 'addUser')}
      </button>

      <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f8f9fa' }}>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{tNamespace('users', 'name')}</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{tNamespace('users', 'email')}</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{tNamespace('users', 'role')}</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{tNamespace('users', 'status')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>አለም ተክለማሪያም</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>alem@example.com</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>አስተያየት</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>ንቁ</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
