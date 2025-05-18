import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useRef } from 'react';
import Parse from 'parse/dist/parse.min.js'; // Using Parse from Back4Apps (old frontend functionality)
import styles from '../styles/dashboard.module.css';

import CreerFacture from './CreerFacture';
import InsertionCharges from './InsertionCharges';

// NouveauxProjet modal remains inline as an exception.
function NouveauxProjet() {
  const [fileName, setFileName] = useState('');
  const [location, setLocation] = useState('');
  const [totalTTC, setTotalTTC] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  // Error state as string for displaying error messages.
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [formTitleVisible, setFormTitleVisible] = useState(true);

  // Reference for the main-content container (for animations: shake, success-pulse)
  const mainContentRef = useRef(null);

  const handleOptionClick = (value) => {
    setSelectedMarket(value);
    setErrors((prev) => ({ ...prev, marketType: '' }));
  };

  // Handle form submission and send data to backend via Parse.Cloud.run.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent duplicate submissions

    setErrors({});
    setSuccess(false);
    setError('');

    const currentErrors = {};
    if (!fileName.trim()) currentErrors.fileName = 'Champ obligatoire';
    if (!location.trim()) currentErrors.location = 'Champ obligatoire';
    if (!totalTTC.trim()) {
      currentErrors.totalTTC = 'Champ obligatoire';
    } else if (isNaN(totalTTC) || parseFloat(totalTTC) <= 0) {
      currentErrors.totalTTC = 'Montant invalide';
    }
    if (!selectedMarket) currentErrors.marketType = 'Sélectionnez un type de marché';

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      setError('Vérifiez les champs obligatoires');
      setFormTitleVisible(false);
      if (mainContentRef.current) {
        mainContentRef.current.classList.add('shake');
        setTimeout(() => {
          mainContentRef.current.classList.remove('shake');
        }, 500);
      }
      return;
    }

    setFormTitleVisible(false);
    setLoading(true);
    
    try {
      const result = await Parse.Cloud.run('createProjectFile', {
        fileName: fileName.trim(),
        location: location.trim(),
        totalTTC: parseFloat(totalTTC),
        marketType: selectedMarket
      });
      
      if (result.success) {
        setSuccess(true);
        setError('');
        if (mainContentRef.current) {
          mainContentRef.current.classList.add('success-pulse');
          setTimeout(() => {
            mainContentRef.current.classList.remove('success-pulse');
          }, 3000);
        }
        setTimeout(() => {
          setFileName('');
          setLocation('');
          setTotalTTC('');
          setSelectedMarket('');
          setSuccess(false);
          setFormTitleVisible(true);
        }, 3000);
      } else {
        setError(result.error || 'Erreur lors de la soumission');
        if (mainContentRef.current) {
          mainContentRef.current.classList.add('shake');
          setTimeout(() => {
            mainContentRef.current.classList.remove('shake');
          }, 500);
        }
      }
    } catch (err) {
      setError(err.message || 'Erreur inconnue');
      if (mainContentRef.current) {
        mainContentRef.current.classList.add('shake');
        setTimeout(() => {
          mainContentRef.current.classList.remove('shake');
        }, 500);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="container">

      <div className="main-content" ref={mainContentRef}>
        <div className="loading" style={{ display: loading ? 'flex' : 'none' }}>
          <div className="loading-content">
            <div className="loading-spinner"></div>
            <div className="loading-text">Création du projet en cours...</div>
          </div>
        </div>

        <div className="title-container">
          <h1 id="formTitle" style={{ display: formTitleVisible ? 'block' : 'none' }}>
            Création d'un nouveau projet
          </h1>
          <div
            className="alert alert-success"
            id="successAlert"
            style={{ display: success ? 'flex' : 'none' }}
          >
            <i className="fas fa-check-circle alert-icon"></i>
            <span>Projet créé avec succès! Redirection vers le tableau de bord...</span>
          </div>
          <div
            className="alert alert-danger"
            id="errorAlert"
            style={{ display: error ? 'flex' : 'none' }}
          >
            <i className="fas fa-exclamation-circle alert-icon"></i>
            <span>{error}</span>
          </div>
        </div>

        <form id="projectForm" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fileName">Nom du fichier</label>
              <input
                type="text"
                id="fileName"
                name="fileName"
                placeholder="Entrez le nom du fichier"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                required
              />
              {errors.fileName && <div className="error-message">{errors.fileName}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="location">Lieu d'exécution</label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Lieu d'exécution du projet"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
              {errors.location && <div className="error-message">{errors.location}</div>}
            </div>
          </div>

          <div className="form-group full-width">
            <label>Type de marché</label>
            <div className="market-options">
              <button
                type="button"
                className={`option-button ${selectedMarket === 'prive' ? 'selected' : ''}`}
                onClick={() => handleOptionClick('prive')}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path>
                </svg>
                Marché Privé
              </button>
              <button
                type="button"
                className={`option-button ${selectedMarket === 'public' ? 'selected' : ''}`}
                onClick={() => handleOptionClick('public')}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path>
                </svg>
                Marché Public
              </button>
              <button
                type="button"
                className={`option-button ${selectedMarket === 'bon' ? 'selected' : ''}`}
                onClick={() => handleOptionClick('bon')}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                </svg>
                Bon de Commande
              </button>
            </div>
            {errors.marketType && <div className="error-message">{errors.marketType}</div>}
          </div>

          <div className="actions-row">
            <div className="form-group half-width">
              <label htmlFor="totalTTC">Total TTC</label>
              <div className="input-with-suffix">
                <input
                  type="number"
                  id="totalTTC"
                  name="totalTTC"
                  placeholder="Montant total TTC"
                  step="0.01"
                  value={totalTTC}
                  onChange={(e) => setTotalTTC(e.target.value)}
                  required
                />
                <span className="input-suffix">DHS</span>
              </div>
              {errors.totalTTC && <div className="error-message">{errors.totalTTC}</div>}
            </div>
            <div
              className="form-group half-width"
              style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}
            >
              <button
                type="submit"
                className="submit-btn"
                id="submitBtn"
                disabled={loading}
              >
                <i className="fas fa-save"></i>
                Créer le projet
              </button>
            </div>
          </div>
        </form>
      </div>

      <style jsx>{`
        :global(:root) {
          --primary: #5cb85c;
          --primary-dark: #4cae4c;
          --primary-light: rgba(92, 184, 92, 0.1);
          --light: #ffffff;
          --dark: #333333;
          --light-gray: #f8f9fa;
          --border: #e0e0e0;
          --danger: #d9534f;
          --danger-light: rgba(217, 83, 79, 0.1);
          --text-muted: #6c757d;
        }
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body {
          font-family: 'Segoe UI', 'Roboto', sans-serif;
          background-color: var(--light-gray);
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          color: var(--dark);
          font-size: 14px;
          line-height: 1.4;
          overflow: hidden;
        }
        .container {
          background-color: var(--light);
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          width: 850px;
          height: 420px;
          position: relative;
          overflow: hidden;
          display: flex;
        }
        .sidebar {
          width: 250px;
          background: linear-gradient(to bottom, #5cb85c, #449d44);
          color: white;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .sidebar-title {
          font-size: 1.8rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        .sidebar-text {
          opacity: 0.9;
          font-size: 0.9rem;
          line-height: 1.6;
        }
        .sidebar-footer {
          font-size: 0.8rem;
          opacity: 0.7;
        }
        .main-content {
          flex: 1;
          padding: 2rem;
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .title-container {
          position: relative;
          height: 60px;
          margin-bottom: 1.5rem;
        }
        h1 {
          color: var(--dark);
          font-weight: 600;
          font-size: 1.5rem;
        }
        .alert {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          padding: 0.9rem 1rem;
          border-radius: 4px;
          display: none;
          animation: slideDown 0.4s ease-out;
          align-items: center;
          font-size: 0.9rem;
        }
        .alert-success {
          background-color: var(--primary-light);
          border-left: 4px solid var(--primary);
          color: var(--primary-dark);
        }
        .alert-danger {
          background-color: var(--danger-light);
          border-left: 4px solid var(--danger);
          color: var(--danger);
        }
        .alert-icon {
          margin-right: 10px;
        }
        .error-message {
          color: var(--danger);
          font-size: 0.8rem;
          margin-top: 0.3rem;
          display: none;
        }
        .form-group.error .error-message {
          display: block;
          animation: fadeIn 0.3s;
        }
        .form-group.error input {
          border-color: var(--danger);
        }
        .form-row {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .form-group {
          margin-bottom: 1.2rem;
          position: relative;
          flex: 1;
        }
        .form-group.full-width {
          width: 100%;
        }
        .form-group.half-width {
          flex: 0 0 calc(50% - 0.5rem);
        }
        label {
          display: block;
          margin-bottom: 0.4rem;
          color: var(--dark);
          font-weight: 500;
          font-size: 0.9rem;
        }
        input[type='text'],
        input[type='number'] {
          width: 100%;
          padding: 0.7rem 0.8rem;
          border: 1px solid var(--border);
          border-radius: 4px;
          font-size: 0.9rem;
          transition: all 0.2s;
          background-color: var(--light);
        }
        input[type='text']:focus,
        input[type='number']:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(92, 184, 92, 0.15);
          outline: none;
        }
        .input-with-suffix {
          position: relative;
        }
        .input-suffix {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          pointer-events: none;
          font-weight: 500;
          font-size: 0.9rem;
        }
        .market-options {
          display: flex;
          gap: 0.8rem;
          margin-bottom: 0.5rem;
        }
        .option-button {
          flex: 1;
          padding: 0.8rem 0.5rem;
          background-color: var(--light);
          color: var(--dark);
          border: 1px solid var(--border);
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 0.85rem;
          font-weight: 500;
        }
        .option-button:hover {
          background-color: var(--light-gray);
          border-color: #ccc;
        }
        .option-button.selected {
          background-color: var(--primary-light);
          color: var(--primary-dark);
          border-color: var(--primary);
        }
        .option-button svg {
          width: 20px;
          height: 20px;
          margin-bottom: 6px;
          fill: currentColor;
        }
        .option-button.selected svg {
          fill: var(--primary-dark);
        }
        .actions-row {
          display: flex;
          align-items: flex-end;
          margin-top: 0.5rem;
        }
        .submit-btn {
          background-color: var(--primary);
          color: var(--light);
          border: none;
          border-radius: 4px;
          padding: 0.7rem 2rem;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          height: 42px;
        }
        .submit-btn:hover {
          background-color: var(--primary-dark);
        }
        .submit-btn:disabled {
          opacity: 0.5;
          pointer-events: none;
        }
        .submit-btn i {
          margin-right: 8px;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes slideDown {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
        .success-pulse {
          animation: pulse 1s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default function Dashboard() {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState('dashboard');
  const [modalOpen, setModalOpen] = useState(null);

  const handleNavClick = (item, path) => {
    setActiveNav(item);
    router.push(path);
  };

  const openModal = (type) => setModalOpen(type);
  const closeModal = () => setModalOpen(null);

  return (
    <>
      <Head>
        <title>LeafBooks - La comptabilité simplifiée</title>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          rel="stylesheet"
        />
      </Head>

      {/* Global Dashboard Styles */}
      <style jsx global>{`
        html, body, #__next {
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          min-height: 100vh !important;
        }
        #__next > div {
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          min-height: 100vh !important;
        }
        .${styles.dashboardContainer},
        .${styles.mainContentWrapper},
        .${styles.mainContent} {
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          max-width: 100% !important;
        }
        .${styles.mainContentWrapper} {
          padding-left: 30px !important;
          padding-right: 30px !important;
        }
      `}</style>

      {/* Modal Overlay Styles */}
      <style jsx global>{`
        .modalOverlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.5s ease, visibility 0.5s ease;
          z-index: 1000;
        }
        .modalOverlay.open {
          opacity: 1;
          visibility: visible;
        }
        .modalContent {
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
          position: relative;
          animation: modalOpen 0.5s ease-out;
        }
      `}</style>

      <div className={styles.dashboardContainer}>

        <div className={styles.mainContentWrapper}>
          <main className={styles.mainContent}>
            <div className={styles.header}>
              <div className={styles.searchBar}>
                <button>🔍</button>
                <input type="text" placeholder="Rechercher projets, factures, clients..." />
              </div>
              <div className={styles.userProfile}>
                <div className={styles.userAvatar}>C</div>
                <span>Comptable</span>
              </div>
            </div>
            <div className={styles.welcomeSection}>
              <h2>Bienvenue, Comptable !</h2>
              <p>Voici un aperçu rapide de votre situation financière aujourd'hui.</p>
            </div>
            <div className={styles.quickActions}>
              <div className={styles.actionCard} onClick={() => openModal('nouveauxProjet')}>
                <i>➕</i>
                <span>Nouveaux Projet</span>
              </div>
              <div className={styles.actionCard} onClick={() => openModal('creerFacture')}>
                <i>📄</i>
                <span>Créer Facture</span>
              </div>
              <div className={styles.actionCard} onClick={() => openModal('insererCharges')}>
                <i>💵</i>
                <span>INSERER DES CHARGES</span>
              </div>
            </div>
            <div className={styles.dashboardStats}>
              <div className={styles.statCard}>
                <h3>Revenu Total</h3>
                <div className={styles.value}>24 850,00 €</div>
                <div className={styles.info}>
                  <span>Ce mois-ci</span>
                  <span className={styles.income}>+15,2%</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <h3>Dépenses Totales</h3>
                <div className={styles.value}>12 350,00 €</div>
                <div className={styles.info}>
                  <span>Ce mois-ci</span>
                  <span className={styles.expense}>+5,8%</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <h3>Profit Net</h3>
                <div className={styles.value}>12 500,00 €</div>
                <div className={styles.info}>
                  <span>Ce mois-ci</span>
                  <span className={styles.income}>+9,3%</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <h3>Factures en attente</h3>
                <div className={styles.value}>8 320,00 €</div>
                <div className={styles.info}>
                  <span>5 factures</span>
                  <span>À payer bientôt</span>
                </div>
              </div>
            </div>
            <div className={styles.recentTransactions}>
              <h3>Transactions récentes</h3>
              <ul className={styles.transactionList}>
                <li className={styles.transactionItem}>
                  <div className={styles.transactionInfo}>
                    <span className={styles.transactionTitle}>Projet de design web</span>
                    <span className={styles.transactionDate}>15 mars 2025</span>
                  </div>
                  <span className={styles.income}>+1 500,00 €</span>
                </li>
                <li className={styles.transactionItem}>
                  <div className={styles.transactionInfo}>
                    <span className={styles.transactionTitle}>Fournitures de bureau</span>
                    <span className={styles.transactionDate}>12 mars 2025</span>
                  </div>
                  <span className={styles.expense}>-235,45 €</span>
                </li>
                <li className={styles.transactionItem}>
                  <div className={styles.transactionInfo}>
                    <span className={styles.transactionTitle}>Services de consultation</span>
                    <span className={styles.transactionDate}>10 mars 2025</span>
                  </div>
                  <span className={styles.income}>+2 000,00 €</span>
                </li>
                <li className={styles.transactionItem}>
                  <div className={styles.transactionInfo}>
                    <span className={styles.transactionTitle}>Abonnement logiciel</span>
                    <span className={styles.transactionDate}>05 mars 2025</span>
                  </div>
                  <span className={styles.expense}>-99,99 €</span>
                </li>
              </ul>
            </div>
          </main>
        </div>
      </div>

      {modalOpen && (
        <div className={`modalOverlay ${modalOpen ? 'open' : ''}`} onClick={closeModal}>
          <div
            className="modalContent"
            onClick={(e) => e.stopPropagation()}
            style={
              modalOpen === 'insererCharges'
                ? { width: 742, height: 577 }  // { "width": 742, "height": 577, "unit": "pixels" }
                : { width: 850, height: 420 }
            }
          >
            {modalOpen === 'nouveauxProjet' && <NouveauxProjet />}
            {modalOpen === 'creerFacture' && <CreerFacture />}
            {modalOpen === 'insererCharges' && <InsertionCharges />}
          </div>
        </div>
      )}
    </>
  );
}
