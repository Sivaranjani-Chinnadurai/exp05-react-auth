import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const getPasswordStrength = (pass) => {
    let score = 0;
    if (!pass) return { score, color: '#333' };
    if (pass.length > 5) score += 1;
    if (pass.length > 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    const colors = ['#ff4d4d', '#ff944d', '#ffd11a', '#b3ff66', '#47d147'];
    return { score, color: colors[Math.min(score, 4)] };
  };

  const strength = getPasswordStrength(password);
  const strengthWidth = password ? Math.max((strength.score / 4) * 100, 10) : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const result = await register(username, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="container">
      <div className="glass-card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            {password && (
              <div className="strength-meter">
                <div 
                  className="strength-bar" 
                  style={{ width: `${strengthWidth}%`, backgroundColor: strength.color }}
                ></div>
              </div>
            )}
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit" className="btn" style={{ marginTop: '1rem' }}>Register</button>
        </form>
        <div className="text-center">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
