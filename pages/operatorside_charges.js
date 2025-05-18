// pages/charges.js

import Head from 'next/head';
import { useState } from 'react';
import ResetAccountModal from '../components/ResetAccountModal';

export default function Charges() {
  // State for controlling modal visibility
  const [isResetAccountModalOpen, setIsResetAccountModalOpen] = useState(false);

  const openModal = (modalName, data) => {
    if (modalName === 'resetAccountModal') {
      setIsResetAccountModalOpen(true);
    } else {
      console.log(`Open modal: ${modalName}`, data);
    }
  };

  const handleCloseResetModal = () => {
    setIsResetAccountModalOpen(false);
  };

  const handleResetAccount = (accountId) => {
    console.log(`Account reset: ${accountId}`);
    // Here you would handle the actual account reset logic
  };

  return (
    <>
      <Head>
        <title>Système de Gestion des Comptes Bancaires et Trésorerie</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>

      {/* Shift entire interface to the right, without altering its original look */}
      <div className="charges-page" style={{ marginLeft: '15px' }}>
        <div className="container">
          <header>
            <div className="logo">
              <span className="material-icons logo-icon">account_balance</span>
              GESTION DES COMPTES BANCAIRES
            </div>

            <div className="system-status">
              <div className="status-indicator">
                <div className="status-dot" />
                <span>Système actif</span>
              </div>
              <div className="date-time" id="datetime" />
            </div>

            <div className="user-info">
              <div>
                <div>Admin System</div>
                <div className="user-role">Administrateur</div>
              </div>
              <div className="user-avatar">AS</div>

              <div className="notifications">
                <button className="btn-icon">
                  <span className="material-icons">notifications</span>
                </button>
                <div className="notification-badge">3</div>
              </div>
            </div>
          </header>

          <nav>
            <ul id="main-nav">
              <li className="nav-item active" data-tab="dashboard">
                <span className="material-icons nav-icon">dashboard</span> Tableau de Bord
              </li>
              <li className="nav-item" data-tab="transactions">
                <span className="material-icons nav-icon">sync_alt</span> Transactions
              </li>
              <li className="nav-item" data-tab="salary">
                <span className="material-icons nav-icon">payments</span> Salaires
              </li>
              <li className="nav-item" data-tab="reports">
                <span className="material-icons nav-icon">bar_chart</span> Rapports
              </li>
              <li className="nav-item" data-tab="settings">
                <span className="material-icons nav-icon">settings</span> Paramètres
              </li>
            </ul>
          </nav>

          <div className="dashboard">
            <div id="dashboard" className="tab-content active">
              {/* Ligne 1 : Actions et Trésorerie */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'stretch',
                  gap: '20px',
                  marginBottom: '20px',
                }}
              >
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', gap: '10px', flex: 1 }}>
                    <div
                      className="action-card"
                      onClick={() => openModal('transferModal')}
                      style={{ flex: 1 }}
                    >
                      <div className="action-icon">
                        <span className="material-icons">swap_horiz</span>
                      </div>
                      <div className="action-title">Transfert entre comptes</div>
                    </div>
                    <div
                      className="action-card"
                      onClick={() => openModal('addFundsModal')}
                      style={{ flex: 1 }}
                    >
                      <div className="action-icon">
                        <span className="material-icons">add_circle</span>
                      </div>
                      <div className="action-title">Ajouter des fonds</div>
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      className="action-card"
                      onClick={() => openModal('resetAccountModal')}
                      style={{ flex: 1 }}
                    >
                      <div className="action-icon">
                        <span className="material-icons">restart_alt</span>
                      </div>
                      <div className="action-title">Réinitialiser compte</div>
                    </div>
                  </div>
                </div>
                <div style={{ flex: 1, display: 'flex' }}>
                  <div className="account-card main" style={{ flex: 1 }}>
                    <div className="account-header">
                      <div className="account-title">
                        <span className="material-icons account-icon">account_balance</span>
                        COMPTE TRÉSORERIE
                      </div>
                      <div className="account-actions">
                        <button
                          className="btn-icon"
                          onClick={() => openModal('historyModal', 'treasury')}
                        >
                          <span className="material-icons">history</span>
                        </button>
                        <button
                          className="btn-icon"
                          onClick={() => openModal('detailsModal', 'treasury')}
                        >
                          <span className="material-icons">info</span>
                        </button>
                      </div>
                    </div>
                    <div className="amount">120,000.00 €</div>
                    <div className="account-details">
                      <div className="detail-item">
                        <span className="detail-label">NUMÉRO DE COMPTE</span>
                        <span className="detail-value">TR-230945781</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">DERNIÈRE OPÉRATION</span>
                        <span className="detail-value">05/05/2025</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">STATUT</span>
                        <span className="detail-value positive">Actif</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ligne 2 : Comptes opérationnels */}
              <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <div style={{ flex: 1 }}>
                  <div className="account-card operational">
                    <div className="account-header">
                      <div className="account-title">
                        <span className="material-icons">person</span> COMPTE HASSAN NEGUAZ
                      </div>
                    </div>
                    <div className="amount">38,450.00 €</div>
                    <div className="account-details">
                      <div className="detail-item">
                        <span className="detail-label">Montant justifié</span>
                        <span className="detail-value">38,450.00 €</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Montant restant</span>
                        <span className="detail-value positive">6,870.50 €</span>
                      </div>
                    </div>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div className="progress warning" style={{ width: '65%' }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div className="account-card operational">
                    <div className="account-header">
                      <div className="account-title">
                        <span className="material-icons">person</span> COMPTE MOHAMED KARRAD
                      </div>
                    </div>
                    <div className="amount">38,450.00 €</div>
                    <div className="account-details">
                      <div className="detail-item">
                        <span className="detail-label">Montant justifié</span>
                        <span className="detail-value">38,450.00 €</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Montant restant</span>
                        <span className="detail-value positive">6,870.50 €</span>
                      </div>
                    </div>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div className="progress warning" style={{ width: '65%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* … autres contenus inchangés … */}
            </div>
          </div>
        </div>
      </div>

      {/* Add ResetAccountModal component */}
      <ResetAccountModal 
        isOpen={isResetAccountModalOpen}
        onClose={handleCloseResetModal}
        onReset={handleResetAccount}
      />

<style jsx global>{`
  /* 1) Only inside our charges-page wrapper */
  .charges-page {
    /* CSS variables */
    --primary-color: #0b6e4f;
    --primary-light: #e4f0e8;
    --secondary-color: #009688;
    --accent-color: #4CAF50;
    --warning-color: #ff9800;
    --danger-color: #e53935;
    --success-color: #43a047;
    --text-color: #333;
    --text-light: #777;
    --border-color: #ddd;
    --bg-color: #f7f7f7;
    --white: #ffffff;
    --shadow: 0 2px 10px rgba(0,0,0,0.08);
    --radius: 10px;
  }

  /* 2) Resets & base styles scoped */
  .charges-page *,
  .charges-page *::before,
  .charges-page *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  /* page background & text */
  .charges-page {
    background-color: var(--bg-color);
    color: var(--text-color);
  }

  /* container */
  .charges-page .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0;
  }

  /* header */
  .charges-page header {
    background-color: var(--primary-color);
    color: var(--white);
    padding: 20px;
    border-radius: var(--radius) var(--radius) 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: var(--shadow);
  }
  .charges-page .logo {
    font-size: 24px;
    font-weight: bold;
    display: flex;
    align-items: center;
  }
  .charges-page .logo-icon {
    margin-right: 10px;
    font-size: 28px;
  }

    /* ─── make both the icon and the text inside header.logo white ─── */
  .charges-page header .logo,
  .charges-page header .logo-icon {
    color: var(--white) !important;
  }


  /* system-status */
  .charges-page .system-status {
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 14px;
  }
  .charges-page .status-indicator {
    display: flex;
    align-items: center;
  }
  .charges-page .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--success-color);
    margin-right: 5px;
  }
  .charges-page .date-time {
    font-size: 14px;
  }

  /* user-info / notifications */
  .charges-page .user-info {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  .charges-page .user-role {
    opacity: 0.8;
    font-size: 12px;
  }
  .charges-page .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--white);
    color: var(--primary-color);
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    margin-left: 15px;
  }
  .charges-page .notifications {
    position: relative;
    margin-left: 15px;
  }
  .charges-page .btn-icon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--primary-light);
    color: var(--primary-color);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .charges-page .btn-icon:hover {
    background-color: var(--primary-color);
    color: var(--white);
  }
  .charges-page .notification-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: var(--danger-color);
    color: var(--white);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    font-size: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* nav */
  .charges-page nav {
    background-color: var(--white);
    border-left: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  }
  .charges-page nav ul {
    display: flex;
    list-style: none;
  }
  .charges-page nav ul li {
    flex: 1;
    padding: 15px 20px;
    cursor: pointer;
    font-weight: 500;
    text-align: center;
    border-bottom: 3px solid transparent;
    transition: all 0.3s ease;
  }
  .charges-page nav ul li:hover {
    background-color: var(--primary-light);
    border-bottom: 3px solid var(--secondary-color);
  }
  .charges-page nav ul li.active {
    background-color: var(--primary-light);
    border-bottom: 3px solid var(--primary-color);
    color: var(--primary-color);
    font-weight: 600;
  }
  .charges-page .nav-icon {
    display: block;
    font-size: 20px;
    margin-bottom: 5px;
  }

  /* dashboard content wrapper */
  .charges-page .dashboard {
    background-color: var(--white);
    border: 1px solid var(--border-color);
    border-top: none;
    border-radius: 0 0 var(--radius) var(--radius);
    padding: 20px;
    box-shadow: var(--shadow);
  }

  /* action cards */
  .charges-page .action-card {
    background-color: var(--white);
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    padding: 15px;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .charges-page .action-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
  .charges-page .action-icon {
    background-color: var(--primary-light);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    color: var(--primary-color);
    font-size: 20px;
  }
  .charges-page .action-title {
    font-weight: 600;
    font-size: 14px;
    color: var(--text-color);
  }

  /* account cards */
  .charges-page .account-card {
    background-color: var(--white);
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    padding: 20px;
    position: relative;
  }
  .charges-page .account-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
  }
  .charges-page .account-card.main::before {
    background-color: var(--primary-color);
  }
  .charges-page .account-card.operational::before {
    background-color: var(--secondary-color);
  }
  .charges-page .account-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }
  .charges-page .account-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 600;
    color: var(--primary-color);
  }
  .charges-page .account-icon {
    font-size: 18px;
  }
  .charges-page .account-actions {
    display: flex;
    gap: 5px;
  }
  .charges-page .btn-icon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: var(--primary-light);
    color: var(--primary-color);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.3s;
  }
  .charges-page .btn-icon:hover {
    background-color: var(--primary-color);
    color: #fff;
  }

  /* amounts & details */
  .charges-page .amount {
    font-size: 26px;
    font-weight: 700;
    margin: 15px 0;
  }
  .charges-page .account-details {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid var(--border-color);
    padding-top: 15px;
    font-size: 14px;
  }
  .charges-page .detail-item {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .charges-page .detail-label {
    color: var(--text-light);
    font-size: 12px;
    margin-bottom: 5px;
  }
  .charges-page .detail-value {
    font-weight: 600;
  }
  .charges-page .detail-value.positive {
    color: var(--success-color);
  }

  /* progress bars */
  .charges-page .progress-container {
    margin-top: 15px;
  }
  .charges-page .progress-bar {
    background-color: #e0e0e0;
    height: 6px;
    border-radius: 3px;
  }
  .charges-page .progress {
    height: 100%;
    border-radius: 3px;
  }
  .charges-page .progress.warning {
    background-color: var(--warning-color);
  }
`}</style>

    </>
  );
}