'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from "./signupForm.module.css"

const SignupForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) router.push('/welcome');
      else alert('Signup failed');
    } catch (err) {
      console.error(err);
    }
  };

  return (
<form onSubmit={handleSubmit} className={styles['form-container']}>
    <h2>Sign Up</h2>
    <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={styles.formInput}
    />
    <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className={styles.formInput}
    />
    <button type="submit">Sign Up</button>
</form>
  );
};

export default SignupForm;