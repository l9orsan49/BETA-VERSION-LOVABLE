// pages/CreerFacture.js
import { useState, useRef } from 'react';
import Parse from 'parse/dist/parse.min.js';

const CreerFacture = () => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [client, setClient] = useState('');
  const [totalHT, setTotalHT] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    // basic validation
    if (!invoiceNumber.trim() || !client.trim() || !totalHT.trim()) {
      setMessage('Veuillez remplir tous les champs obligatoires');
      formRef.current.classList.add('shake');
      setTimeout(() => formRef.current.classList.remove('shake'), 500);
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      const result = await Parse.Cloud.run('createInvoice', {
        invoiceNumber: invoiceNumber.trim(),
        client: client.trim(),
        totalHT: parseFloat(totalHT)
      });

      if (result.success) {
        setMessage('Facture créée avec succès !');
        formRef.current.classList.add('success-pulse');
        setTimeout(() => formRef.current.classList.remove('success-pulse'), 3000);
        // reset
        setInvoiceNumber('');
        setClient('');
        setTotalHT('');
      } else {
        setMessage(result.error || 'Erreur lors de la création');
      }
    } catch (err) {
      setMessage(err.message || 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={formRef} style={{ padding: '2rem', height: '100%', boxSizing: 'border-box' }}>
      <h2 style={{ marginBottom: '1rem' }}>Créer une nouvelle facture</h2>
      {message && (
        <div
          style={{
            marginBottom: '1rem',
            color: message.includes('succès') ? 'green' : 'red',
            fontWeight: 500
          }}
        >
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '0.3rem' }}>N° de facture</label>
            <input
              type="text"
              value={invoiceNumber}
              onChange={e => setInvoiceNumber(e.target.value)}
              style={{ width: '100%', padding: '0.7rem', borderRadius: '4px', border: '1px solid #ddd' }}
              required
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '0.3rem' }}>Client</label>
            <input
              type="text"
              value={client}
              onChange={e => setClient(e.target.value)}
              style={{ width: '100%', padding: '0.7rem', borderRadius: '4px', border: '1px solid #ddd' }}
              required
            />
          </div>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.3rem' }}>Montant HT (DHS)</label>
          <input
            type="number"
            step="0.01"
            value={totalHT}
            onChange={e => setTotalHT(e.target.value)}
            style={{ width: '100%', padding: '0.7rem', borderRadius: '4px', border: '1px solid #ddd' }}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 'auto',
            backgroundColor: '#5cb85c',
            color: '#fff',
            padding: '0.8rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 500
          }}
        >
          {loading ? 'Création…' : 'Créer la facture'}
        </button>
      </form>
    </div>
  );
};

export default CreerFacture;
