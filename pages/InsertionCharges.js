// pages/InsertionCharges.js
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Parse from 'parse/dist/parse.min.js';

// Attach Parse to the global window if not already defined
if (typeof window !== 'undefined' && !window.Parse) {
  window.Parse = Parse;
}

// Helper to get current date as DD/MM/YYYY
const getCurrentDate = () => {
  const d = new Date();
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

// ProjectChooser component
const ProjectChooser = ({ id, value, onChange, projects }) => {
  const handleSelect = proj => onChange({ target: { id, value: proj } });
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {projects.length ? (
        projects.map((p, i) => (
          <button
            key={i}
            onClick={() => handleSelect(p)}
            style={{
              padding: '8px 12px',
              borderRadius: 4,
              border: '1px solid #5cb85c',
              backgroundColor: value === p ? '#d4edda' : '#fff',
              cursor: 'pointer',
            }}
          >
            {p}
          </button>
        ))
      ) : (
        <span style={{ color: '#888' }}>Aucun projet disponible</span>
      )}
    </div>
  );
};

const InsertionChargesContent = () => {
  // State
  const [activeType, setActiveType] = useState('non-justifiee');
  const [showNewWorker, setShowNewWorker] = useState(false);
  const [projects, setProjects] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [uploadBonFile, setUploadBonFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [total, setTotal] = useState(0);

  const [fields, setFields] = useState({
    // Non‑justifiée
    projetNj: '',
    descriptionNj: '',
    dateNj: getCurrentDate(),
    quantiteNj: '1',
    montantNj: '',
    compteOperationNj: '',
    // Par Bon
    projetBon: '',
    montantBon: '',
    compteOperationBon: '',
    // Fournisseur
    projetFournisseur: '',
    descriptionFournisseur: '',
    numBonFournisseur: '',
    fournisseurFournisseur: 'demnati',
    dateFournisseur: getCurrentDate(),
    quantiteFournisseur: '1',
    montantFournisseur: '',
    compteOperationFournisseur: '',
    // Main‑œuvre ancien
    projetOuvrierAncien: '',
    nomOuvrierAncien: '',
    dateOuvrierAncien: getCurrentDate(),
    avanceAncien: '',
    compteOperationOuvrierAncien: '',
    // Main‑œuvre nouveau
    projetOuvrierNouveau: '',
    nomOuvrierNouveau: '',
    prixNegocie: '',
    // These remain in state but are no longer rendered or sent for new worker
    dateOuvrierNouveau: getCurrentDate(),
    avanceNouveau: '',
    compteOperationOuvrierNouveau: '',
  });

  // Styles (unchanged)
  const styles = {
    container: {
      width: 742,
      height: 577,
      backgroundColor: '#fff',
      borderRadius: 8,
      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
      display: 'flex',
      overflow: 'hidden',
      fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
      opacity: submitting ? 0.5 : 1,
      transition: 'opacity 0.3s',
    },
    sidebar: {
      width: 176,
      background: 'linear-gradient(145deg,#5cb85c 0%,#4cae4c 100%)',
      color: '#fff',
      padding: '20px 12px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    sidebarHeader: { display: 'flex', alignItems: 'center', marginBottom: 10 },
    sidebarIconContainer: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      backgroundColor: 'rgba(255,255,255,0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
    },
    sidebarTitle: { fontSize: 20, margin: 0, fontWeight: 600 },
    sidebarText: { fontSize: 12, lineHeight: 1.4, marginBottom: 16 },
    sidebarMenuTitle: { fontSize: 12, color: 'rgba(255,255,255,0.9)', marginBottom: 4 },
    sidebarMenuList: { listStyle: 'none', padding: 0, margin: 0 },
    sidebarMenuItem: isActive => ({
      display: 'flex',
      alignItems: 'center',
      padding: '6px 4px',
      backgroundColor: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
      borderRadius: isActive ? 4 : 0,
      cursor: 'pointer',
      marginBottom: 2,
    }),
    sidebarMenuIcon: { marginRight: 6, width: 14, textAlign: 'center' },
    sidebarFooter: { fontSize: 10, textAlign: 'center', opacity: 0.9, marginTop: 12 },

    content: { flex: 1, padding: 20, display: 'flex', flexDirection: 'column', position: 'relative' },
    contentTitle: { fontSize: 16, marginBottom: 10, borderBottom: '1px solid #eee', paddingBottom: 8, color: '#444' },

    chargeTypes: { display: 'flex', gap: 10, marginBottom: 10 },
    chargeOption: active => ({
      flex: 1,
      padding: '10px 6px',
      border: '1px solid #eee',
      borderRadius: 6,
      backgroundColor: active ? '#fff' : '#f9f9f9',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: active ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
      transition: 'all 0.3s',
    }),
    chargeOptionIcon: active => ({ fontSize: 18, marginBottom: 4, color: active ? '#5cb85c' : '#777' }),
    chargeOptionText: { fontSize: 11, fontWeight: 500 },

    formContainer: {
      flex: 1,
      backgroundColor: '#fafafa',
      borderRadius: 6,
      padding: 16,
      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)',
      overflowY: 'auto',
      maxHeight: 'calc(100% - 80px)',
    },
    formRow: { display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 14 },
    formGroup: { flex: 1, minWidth: 160, display: 'flex', flexDirection: 'column' },
    formLabel: { fontSize: 12, fontWeight: 500, marginBottom: 4, color: '#555' },
    formInput: {
      width: '100%',
      padding: 10,
      border: '1px solid #ddd',
      borderRadius: 4,
      fontSize: 13,
      backgroundColor: '#fcfcfc',
    },
    formTextarea: {
      width: '100%',
      padding: 10,
      border: '1px solid #ddd',  
      borderRadius: 4,
      fontSize: 13,
      backgroundColor: '#fcfcfc',
      resize: 'vertical',
      height: 80,
    },
    formSelect: {
      width: '100%',
      padding: 10,
      border: '1px solid #ddd',
      borderRadius: 4,
      fontSize: 13,
      backgroundColor: '#fcfcfc',
      appearance: 'none',
      WebkitAppearance: 'none',
      MozAppearance: 'none',
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23555'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 8px center',
      backgroundSize: 16,
    },
    fileInput: { marginTop: 4 },

    totalSection: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '12px 20px',
      borderTop: '1px solid #eee',
      backgroundColor: '#fff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    totalText: { fontSize: 14, fontWeight: 600 },
    totalAmount: { fontSize: 16, fontWeight: 600, marginLeft: 4 },

    btnCreate: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#5cb85c',
      color: '#fff',
      border: 'none',
      padding: '10px 16px',
      borderRadius: 4,
      cursor: 'pointer',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'all 0.3s',
    },
    circleButton: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 16,
      height: 16,
      borderRadius: '50%',
      backgroundColor: '#fff',
      border: '1px solid #5cb85c',
      marginRight: 4,
      color: '#5cb85c',
      fontSize: 12,
    },
  };

  // Load projects
  useEffect(() => {
    Parse.Cloud.run('listProjects')
      .then(r => r.success && setProjects(r.projects))
      .catch(console.error);
  }, []);

  // Fetch workers for existing-worker scenario
  useEffect(() => {
    if (activeType === 'main-oeuvre' && !showNewWorker && fields.projetOuvrierAncien) {
      Parse.Cloud.run('listWorkers', { projet: fields.projetOuvrierAncien })
        .then(r => (r.success ? setWorkers(r.workers) : setWorkers([])))
        .catch(() => setWorkers([]));
    } else {
      setWorkers([]);
    }
  }, [activeType, showNewWorker, fields.projetOuvrierAncien]);

  // Calculate total
  useEffect(() => {
    let n = 0;
    switch (activeType) {
      case 'non-justifiee':
        n = parseFloat(fields.quantiteNj || 0) * parseFloat(fields.montantNj || 0);
        break;
      case 'bon':
        n = parseFloat(fields.montantBon || 0);
        break;
      case 'fournisseur':
        n = parseFloat(fields.quantiteFournisseur || 0) * parseFloat(fields.montantFournisseur || 0);
        break;
      case 'main-oeuvre':
        n = showNewWorker
          ? parseFloat(fields.prixNegocie || 0)
          : parseFloat(fields.avanceAncien || 0);
        break;
    }
    setTotal(n);
  }, [
    activeType,
    fields.quantiteNj,
    fields.montantNj,
    fields.montantBon,
    fields.quantiteFournisseur,
    fields.montantFournisseur,
    fields.avanceAncien,
    fields.prixNegocie,
    showNewWorker,
  ]);

  const handleFieldChange = e => {
    const { id, value } = e.target;
    setFields(f => ({ ...f, [id]: value }));
  };
  const handleFileUpload = e => setUploadBonFile(e.target.files[0]);

  const getFilteredFields = () => {
    const f = fields;
    if (activeType === 'non-justifiee') {
      return {
        projet: f.projetNj,
        description: f.descriptionNj,
        date: f.dateNj,
        quantite: f.quantiteNj,
        montant: f.montantNj,
        compteOperation: f.compteOperationNj,
      };
    }
    if (activeType === 'bon') {
      return {
        projet: f.projetBon,
        montant: f.montantBon,
        compteOperation: f.compteOperationBon,
      };
    }
    if (activeType === 'fournisseur') {
      return {
        projet: f.projetFournisseur,
        description: f.descriptionFournisseur,
        numBon: f.numBonFournisseur,
        fournisseur: f.fournisseurFournisseur,
        date: f.dateFournisseur,
        quantite: f.quantiteFournisseur,
        montant: f.montantFournisseur,
        compteOperation: f.compteOperationFournisseur,
      };
    }
    if (activeType === 'main-oeuvre') {
      if (!showNewWorker) {
        return {
          projet: f.projetOuvrierAncien,
          nomOuvrier: f.nomOuvrierAncien,
          date: f.dateOuvrierAncien,
          avance: f.avanceAncien,
          compteOperation: f.compteOperationOuvrierAncien,
        };
      } else {
        return {
          projet: f.projetOuvrierNouveau,
          nomOuvrier: f.nomOuvrierNouveau,
          prixNegocie: f.prixNegocie,
        };
      }
    }
    return {};
  };

  const validateFields = () => {
    const miss = [];
    if (activeType === 'non-justifiee') {
      ['projetNj','descriptionNj','dateNj','quantiteNj','montantNj','compteOperationNj']
        .forEach(k => !fields[k] && miss.push(k));
    }
    if (activeType === 'bon') {
      ['projetBon','montantBon','compteOperationBon'].forEach(k => !fields[k] && miss.push(k));
      if (!uploadBonFile) miss.push('fichier du bon');
    }
    if (activeType === 'fournisseur') {
      [
        'projetFournisseur','descriptionFournisseur','numBonFournisseur',
        'fournisseurFournisseur','dateFournisseur','quantiteFournisseur',
        'montantFournisseur','compteOperationFournisseur'
      ].forEach(k => !fields[k] && miss.push(k));
    }
    if (activeType === 'main-oeuvre') {
      if (!showNewWorker) {
        ['projetOuvrierAncien','nomOuvrierAncien','dateOuvrierAncien','avanceAncien','compteOperationOuvrierAncien']
          .forEach(k => !fields[k] && miss.push(k));
      } else {
        ['projetOuvrierNouveau','nomOuvrierNouveau','prixNegocie']
          .forEach(k => !fields[k] && miss.push(k));
      }
    }
    return miss.length ? `Champs vides : ${miss.join(', ')}` : null;
  };

  const handleChargeSubmission = async () => {
    setSubmitting(true);
    setMessage('');
    const err = validateFields();
    if (err) {
      setMessage(err);
      setSubmitting(false);
      return;
    }
    const payload = { type: activeType, total, fields: getFilteredFields() };
    if (activeType === 'bon' && uploadBonFile) {
      const pf = new Parse.File(uploadBonFile.name, uploadBonFile);
      await pf.save();
      payload.file = pf;
    }
    try {
      const res = await Parse.Cloud.run('insertCharges', payload);
      setMessage(res.success ? res.message : (res.error || 'Erreur lors de l’enregistrement'));
    } catch (e) {
      setMessage(e.message || 'Erreur inconnue');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div>
          <div style={styles.sidebarHeader}>
            <div style={styles.sidebarIconContainer}>
              <i className="fas fa-wallet" style={{ fontSize: 16 }} />
            </div>
            <h2 style={styles.sidebarTitle}>Gestion des Charges</h2>
          </div>
          <p style={styles.sidebarText}>
            Sélectionnez un type de charge et complétez les champs requis.
          </p>
        </div>
        <div>
          <div style={styles.sidebarMenuTitle}>Type de charges</div>
          <ul style={styles.sidebarMenuList}>
            {['non-justifiee','bon','fournisseur','main-oeuvre'].map(type => {
              const isActive = activeType === type;
              const labels = {
                'non-justifiee': 'Non Justifiées',
                'bon': 'Par Bon',
                'fournisseur': 'Fournisseur',
                'main-oeuvre': 'Main d’Œuvre'
              };
              return (
                <li key={type} style={styles.sidebarMenuItem(isActive)} onClick={() => setActiveType(type)}>
                  <div style={styles.sidebarMenuIcon}>
                    <i className={isActive ? 'fas fa-check-circle' : 'far fa-circle'} />
                  </div>
                  <span>{labels[type]}</span>
                  {isActive && (
                    <span style={{
                      marginLeft: 'auto',
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      padding: '2px 4px',
                      fontSize: 8,
                      borderRadius: 10
                    }}>
                      Actif
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <div style={styles.sidebarFooter}>© 2025 | Système de Gestion Comptable</div>
      </div>

      {/* Main content */}
      <div style={styles.content}>
        <h3 style={styles.contentTitle}>Insertion d'une Nouvelle Charge</h3>
        {message && (
          <div style={{ color: message.includes('succès') ? 'green' : 'red', marginBottom: 10 }}>
            {message}
          </div>
        )}

        {/* Charge Type Selector */}
        <div style={styles.chargeTypes}>
          {['non-justifiee','bon','fournisseur','main-oeuvre'].map(type => {
            const isActive = activeType === type;
            const icons = {
              'non-justifiee': 'lock',
              'bon': 'file-invoice',
              'fournisseur': 'tools',
              'main-oeuvre': 'hard-hat'
            };
            const labels = {
              'non-justifiee': 'Non Justifiées',
              'bon': 'Par Bon',
              'fournisseur': 'Fournisseur',
              'main-oeuvre': 'Main d’Œuvre'
            };
            return (
              <div
                key={type}
                style={styles.chargeOption(isActive)}
                onClick={() => setActiveType(type)}
              >
                <i className={`fas fa-${icons[type]}`} style={styles.chargeOptionIcon(isActive)} />
                <span style={styles.chargeOptionText}>{labels[type]}</span>
              </div>
            );
          })}
        </div>

        {/* Form Container */}
        <div style={styles.formContainer}>
          {/* Non-justifiée */}
          {activeType === 'non-justifiee' && (
            <>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Projet associé</label>
                  <ProjectChooser
                    id="projetNj"
                    value={fields.projetNj}
                    onChange={handleFieldChange}
                    projects={projects}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Compte Opération</label>
                  <select
                    id="compteOperationNj"
                    value={fields.compteOperationNj}
                    onChange={handleFieldChange}
                    style={styles.formSelect}
                  >
                    <option value="">Sélectionnez un compte</option>
                    <option value="hassan">Hassan</option>
                    <option value="mohamed">Mohamed</option>
                  </select>
                </div>
              </div>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Description</label>
                  <textarea
                    id="descriptionNj"
                    value={fields.descriptionNj}
                    onChange={handleFieldChange}
                    style={styles.formTextarea}
                    placeholder="Entrez la description ici..."
                  />
                </div>
              </div>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Date</label>
                  <input
                    type="text"
                    id="dateNj"
                    value={fields.dateNj}
                    onChange={handleFieldChange}
                    style={styles.formInput}
                    placeholder="JJ/MM/AAAA"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Quantité</label>
                  <input
                    type="number"
                    id="quantiteNj"
                    value={fields.quantiteNj}
                    onChange={handleFieldChange}
                    style={styles.formInput}
                    min="1"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Montant (DHS) - Prix unitaire</label>
                  <input
                    type="number"
                    id="montantNj"
                    value={fields.montantNj}
                    onChange={handleFieldChange}
                    style={styles.formInput}
                    step="0.01"
                  />
                </div>
              </div>
            </>
          )}

          {/* Par Bon */}
          {activeType === 'bon' && (
            <>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Projet associé</label>
                  <ProjectChooser
                    id="projetBon"
                    value={fields.projetBon}
                    onChange={handleFieldChange}
                    projects={projects}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Compte d’opération</label>
                  <select
                    id="compteOperationBon"
                    value={fields.compteOperationBon}
                    onChange={handleFieldChange}
                    style={styles.formSelect}
                  >
                    <option value="">Sélectionnez un compte</option>
                    <option value="hassan">Hassan</option>
                    <option value="mohamed">Mohamed</option>
                  </select>
                </div>
              </div>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Montant (DHS) - Prix unitaire</label>
                  <input
                    type="number"
                    id="montantBon"
                    value={fields.montantBon}
                    onChange={handleFieldChange}
                    style={styles.formInput}
                    step="0.01"
                  />
                </div>
              </div>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Télécharger l’image du bon</label>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    style={styles.fileInput}
                  />
                </div>
              </div>
            </>
          )}

          {/* Fournisseur */}
          {activeType === 'fournisseur' && (
            <>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Projet associé</label>
                  <ProjectChooser
                    id="projetFournisseur"
                    value={fields.projetFournisseur}
                    onChange={handleFieldChange}
                    projects={projects}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Fournisseur</label>
                  <select
                    id="fournisseurFournisseur"
                    value={fields.fournisseurFournisseur}
                    onChange={handleFieldChange}
                    style={styles.formSelect}
                  >
                    <option value="demnati">DEMNATI</option>
                  </select>
                </div>
              </div>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Description</label>
                  <textarea
                    id="descriptionFournisseur"
                    value={fields.descriptionFournisseur}
                    onChange={handleFieldChange}
                    style={styles.formTextarea}
                  />
                </div>
              </div>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>N° de bon de commande</label>
                  <input
                    type="text"
                    id="numBonFournisseur"
                    value={fields.numBonFournisseur}
                    onChange={handleFieldChange}
                    style={styles.formInput}
                  />
                </div>
              </div>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Date</label>
                  <input
                    type="text"
                    id="dateFournisseur"
                    value={fields.dateFournisseur}
                    onChange={handleFieldChange}
                    style={styles.formInput}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Compte Opération</label>
                  <select
                    id="compteOperationFournisseur"
                    value={fields.compteOperationFournisseur}
                    onChange={handleFieldChange}
                    style={styles.formSelect}
                  >
                    <option value="">Sélectionnez un compte</option>
                    <option value="hassan">Hassan</option>
                    <option value="mohamed">Mohamed</option>
                  </select>
                </div>
              </div>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Quantité</label>
                  <input
                    type="number"
                    id="quantiteFournisseur"
                    value={fields.quantiteFournisseur}
                    onChange={handleFieldChange}
                    style={styles.formInput}
                    min="1"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Montant (DHS) - Prix unitaire</label>
                  <input
                    type="number"
                    id="montantFournisseur"
                    value={fields.montantFournisseur}
                    onChange={handleFieldChange}
                    style={styles.formInput}
                    step="0.01"
                  />
                </div>
              </div>
            </>
          )}

          {/* Main‑œuvre */}
          {activeType === 'main-oeuvre' && (
            <>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Projet associé</label>
                  <ProjectChooser
                    id={showNewWorker ? 'projetOuvrierNouveau' : 'projetOuvrierAncien'}
                    value={showNewWorker ? fields.projetOuvrierNouveau : fields.projetOuvrierAncien}
                    onChange={handleFieldChange}
                    projects={projects}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label>
                    <input
                      type="checkbox"
                      checked={showNewWorker}
                      onChange={() => setShowNewWorker(!showNewWorker)}
                      style={{ marginRight: 6 }}
                    />
                    NOUVEL OUVRIER
                  </label>
                </div>
              </div>

              {!showNewWorker ? (
                // Existing Worker
                <>
                  <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Nom de l’ouvrier</label>
                      <select
                        id="nomOuvrierAncien"
                        value={fields.nomOuvrierAncien}
                        onChange={handleFieldChange}
                        style={styles.formSelect}
                      >
                        {workers.length ? (
                          <>
                            <option value="">Sélectionnez un ouvrier</option>
                            {workers.map(w => (
                              <option key={w} value={w}>{w}</option>
                            ))}
                          </>
                        ) : (
                          <option disabled>Aucun ouvrier dans ce projet</option>
                        )}
                      </select>
                    </div>
                  </div>
                  <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Date</label>
                      <input
                        type="text"
                        id="dateOuvrierAncien"
                        value={fields.dateOuvrierAncien}
                        onChange={handleFieldChange}
                        style={styles.formInput}
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Avance (DHS)</label>
                      <input
                        type="number"
                        id="avanceAncien"
                        value={fields.avanceAncien}
                        onChange={handleFieldChange}
                        style={styles.formInput}
                        step="0.01"
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Compte Opération</label>
                      <select
                        id="compteOperationOuvrierAncien"
                        value={fields.compteOperationOuvrierAncien}
                        onChange={handleFieldChange}
                        style={styles.formSelect}
                      >
                        <option value="">Sélectionnez un compte</option>
                        <option value="hassan">Hassan</option>
                        <option value="mohamed">Mohamed</option>
                      </select>
                    </div>
                  </div>
                </>
              ) : (
                // New Worker (only name & price)
                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Nom de l’ouvrier</label>
                    <input
                      type="text"
                      id="nomOuvrierNouveau"
                      value={fields.nomOuvrierNouveau}
                      onChange={handleFieldChange}
                      style={styles.formInput}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Prix négocié (DHS)</label>
                    <input
                      type="number"
                      id="prixNegocie"
                      value={fields.prixNegocie}
                      onChange={handleFieldChange}
                      style={styles.formInput}
                      step="0.01"
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Total & Submit */}
        <div style={styles.totalSection}>
          <div style={styles.totalText}>
            TOTAL TTC: <span style={styles.totalAmount}>{total.toFixed(2)} DHS</span>
          </div>
          <button
            style={styles.btnCreate}
            onClick={handleChargeSubmission}
            disabled={submitting}
          >
            <span style={styles.circleButton}>
              <i className={submitting ? 'fas fa-spinner fa-spin' : 'fas fa-check'} />
            </span>
            Enregistrer la charge
          </button>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(InsertionChargesContent), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
