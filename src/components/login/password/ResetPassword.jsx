import React, { useState } from 'react';

function ResetPasswordForm({ token, email }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/password/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          email: email,
          password: password,
          password_confirmation: confirmPassword,
        }),
      });

      if (response.ok) {
        alert('Mot de passe réinitialisé avec succès');
      } else {
        const text = await response.text();
        alert(text);
      }
    } catch (error) {
      console.error("Erreur lors de la réinitialisation du mot de passe :", error);
    }
  };

  return (
    <div>
      <h2>Réinitialisation de mot de passe</h2>

      <form onSubmit={handleResetPassword}>
        <input type="hidden" name="token" value={token} />
        <input type="hidden" name="email" value={email} />

        <label>Nouveau mot de passe :</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>Confirmez le mot de passe :</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Réinitialiser le mot de passe</button>
      </form>
    </div>
  );
}

export default ResetPasswordForm;
