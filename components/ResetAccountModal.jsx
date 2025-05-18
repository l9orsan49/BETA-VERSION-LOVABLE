import { useState, useEffect } from 'react';

const ResetAccountModal = ({ isOpen, onClose, onReset }) => {
  const [step, setStep] = useState(1); // 1 = select account, 2 = confirm
  const [selectedAccount, setSelectedAccount] = useState('hassan');

  // Reset step when modal is opened
  useEffect(() => {
    if (isOpen) {
      setStep(1);
    }
  }, [isOpen]);

  // Account data
  const accounts = {
    'hassan': {
      name: 'COMPTE HASSAN NEGUAZ',
      justified: '38,450.00 €',
      unjustified: '6,870.50 €'
    },
    'mohamed': {
      name: 'COMPTE MOHAMED KARRAD',
      justified: '38,450.00 €',
      unjustified: '6,870.50 €'
    }
  };

  const handleContinue = () => {
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSelectAccount = (account) => {
    setSelectedAccount(account);
  };

  const handleConfirmReset = () => {
    onReset(selectedAccount);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      {step === 1 && (
        <div className="modal" id="resetAccountSelectModal">
          <div className="modal-header">
            <h3>
              <span className="modal-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                  <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                </svg>
              </span>
              Réinitialiser un compte
            </h3>
            <button className="close-btn" onClick={onClose}>&times;</button>
          </div>
          <div className="modal-body">
            <p>Veuillez sélectionner le compte opérateur à réinitialiser :</p>
            
            <div 
              className={`account-option ${selectedAccount === 'hassan' ? 'selected' : ''}`} 
              onClick={() => handleSelectAccount('hassan')}
            >
              <div className="account-info">
                <div className="account-name">COMPTE HASSAN NEGUAZ</div>
                <div className="account-status">
                  <div className="account-status-item">
                    <div>Montant justifié</div>
                    <div className="account-status-value">38,450.00 €</div>
                  </div>
                  <div className="account-status-item">
                    <div>Montant non justifié</div>
                    <div className="account-status-value text-danger">6,870.50 €</div>
                  </div>
                </div>
              </div>
              <div className="account-radio"></div>
            </div>
            
            <div 
              className={`account-option ${selectedAccount === 'mohamed' ? 'selected' : ''}`}
              onClick={() => handleSelectAccount('mohamed')}
            >
              <div className="account-info">
                <div className="account-name">COMPTE MOHAMED KARRAD</div>
                <div className="account-status">
                  <div className="account-status-item">
                    <div>Montant justifié</div>
                    <div className="account-status-value">38,450.00 €</div>
                  </div>
                  <div className="account-status-item">
                    <div>Montant non justifié</div>
                    <div className="account-status-value text-danger">6,870.50 €</div>
                  </div>
                </div>
              </div>
              <div className="account-radio"></div>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="modal" id="resetAccountConfirmModal">
          <div className="modal-header">
            <h3>
              <span className="modal-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
                </svg>
              </span>
              Confirmation de réinitialisation
            </h3>
            <button className="close-btn" onClick={onClose}>&times;</button>
          </div>
          <div className="modal-body">
            <div className="account-info-detailed">
              <div className="account-name">
                {accounts[selectedAccount].name}
              </div>
              <div className="account-details">
                <div>
                  <div>Montant justifié</div>
                  <div className="amount">{accounts[selectedAccount].justified}</div>
                </div>
                <div>
                  <div>Montant restant non justifié</div>
                  <div className="amount text-danger">{accounts[selectedAccount].unjustified}</div>
                </div>
              </div>
            </div>
          
            <div className="alert alert-warning">
              <span className="alert-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                </svg>
              </span>
              <div>
                <p style={{ marginTop: 0 }}><strong>Attention !</strong></p>
                <p style={{ marginBottom: 0 }}>
                  Vous êtes sur le point de réinitialiser le compte <strong>{accounts[selectedAccount].name.replace('COMPTE ', '')}</strong>. 
                  Le solde non justifié restant de <strong className="text-danger">{accounts[selectedAccount].unjustified}</strong> sera considéré comme une exclusion de salaire pour cet opérateur.
                </p>
              </div>
            </div>
            <p>Cette action ne peut pas être annulée. Êtes-vous sûr de vouloir continuer ?</p>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Modal styles */
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1050;
        }
        
        .modal {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          width: 550px;
          max-width: 95%;
          position: relative;
          animation: fadeInUp 0.3s ease-out;
          z-index: 1051;
        }
        
        .modal-header {
          background-color: #0b6e4f;
          color: white;
          padding: 16px 24px;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .modal-header h3 {
          margin: 0;
          font-weight: 500;
          font-size: 18px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .modal-icon {
          width: 22px;
          height: 22px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        
        .close-btn {
          background: none;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
          opacity: 0.8;
          transition: opacity 0.2s;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
        
        .close-btn:hover {
          opacity: 1;
          background-color: rgba(255, 255, 255, 0.1);
        }
        
        .modal-body {
          padding: 24px;
        }
        
        .btn {
          padding: 10px 18px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          position: relative;
          z-index: 2;
          opacity: 1;
          visibility: visible;
        }
        
        .btn-primary {
          background-color: #0b6e4f;
          color: white;
        }
        
        .btn-primary:hover {
          background-color: #095e42;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .btn-secondary {
          background-color: #f8f9fa;
          color: #6c757d;
          border: 1px solid #ced4da;
        }
        
        .btn-secondary:hover {
          background-color: #e9ecef;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        
        .btn-danger {
          background-color: #e53935;
          color: white;
        }
        
        .btn-danger:hover {
          background-color: #c82333;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .account-option {
          border: 1px solid #ddd;
          border-radius: 6px;
          padding: 16px;
          margin-bottom: 16px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .account-option:hover {
          border-color: #0b6e4f;
          background-color: #e4f0e8;
        }
        
        .account-option:last-child {
          margin-bottom: 0;
        }
        
        .account-option.selected {
          border: 2px solid #0b6e4f;
          background-color: #e4f0e8;
        }
        
        .account-info {
          flex: 1;
        }
        
        .account-name {
          font-weight: 600;
          margin-bottom: 8px;
          color: #0b6e4f;
          font-size: 16px;
        }
        
        .account-status {
          display: flex;
          gap: 24px;
          font-size: 14px;
          color: #777;
        }
        
        .account-status-item {
          display: flex;
          flex-direction: column;
        }
        
        .account-status-value {
          font-weight: 600;
          margin-top: 2px;
          font-size: 16px;
        }
        
        .account-radio {
          width: 22px;
          height: 22px;
          border: 2px solid #0b6e4f;
          border-radius: 50%;
          position: relative;
          margin-left: 12px;
        }
        
        .account-option.selected .account-radio::after {
          content: "";
          position: absolute;
          width: 12px;
          height: 12px;
          background-color: #0b6e4f;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        
        .account-info-detailed {
          background-color: #f5f5f5;
          border-radius: 6px;
          padding: 16px;
          margin-bottom: 20px;
        }
        
        .account-details {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #777;
        }
        
        .amount {
          font-size: 18px;
          font-weight: 600;
          margin-top: 4px;
        }
        
        .alert {
          padding: 16px;
          border-radius: 4px;
          margin-bottom: 24px;
          font-size: 14px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        
        .alert-warning {
          background-color: #fff3cd;
          border-left: 4px solid #ff9800;
          color: #856404;
        }
        
        .alert-icon {
          flex-shrink: 0;
          width: 20px;
          height: 20px;
        }
        
        .text-danger {
          color: #e53935;
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ResetAccountModal;