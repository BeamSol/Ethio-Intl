import React from 'react';
import { useEthioIntl } from '../../index';

export default function ProductsPage() {
  const { tNamespace } = useEthioIntl();

  return (
    <div>
      <h1>{tNamespace('products', 'title')}</h1>
      <button style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', marginBottom: '20px' }}>
        {tNamespace('products', 'addProduct')}
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
          <h3>ማሽን</h3>
          <p style={{ color: '#666', margin: '10px 0' }}>እንጨት ማሽን መሳሪያ</p>
          <p style={{ fontWeight: 'bold', color: '#007bff' }}>ብር 2,500</p>
          <span style={{ background: '#28a745', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
            {tNamespace('products', 'status')}: ንቁ
          </span>
        </div>

        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
          <h3>ኮምፒውተር</h3>
          <p style={{ color: '#666', margin: '10px 0' }}>ላፕቶፕ ኮምፒውተር</p>
          <p style={{ fontWeight: 'bold', color: '#007bff' }}>ብር 45,000</p>
          <span style={{ background: '#28a745', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
            {tNamespace('products', 'status')}: ንቁ
          </span>
        </div>

        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
          <h3>መጽሔት</h3>
          <p style={{ color: '#666', margin: '10px 0' }}>አማርኛ መጽሔት</p>
          <p style={{ fontWeight: 'bold', color: '#007bff' }}>ብር 150</p>
          <span style={{ background: '#ffc107', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
            {tNamespace('products', 'status')}: ያልተለመደ
          </span>
        </div>
      </div>
    </div>
  );
}
