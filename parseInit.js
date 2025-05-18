const handleSubmit = async (e) => {
  e.preventDefault();
  if (!projectName.trim()) {
    setError('Le nom du projet est requis');
    return;
  }

  setLoading(true);
  try {
    const result = await Parse.Cloud.run('createProjectFile', {
      fileName: projectName.trim()
    });
    
    if (result.success) {
      alert('Projet créé avec succès!');
      onClose();
    } else {
      setError(result.error || 'Erreur lors de la création du projet');
    }
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
