'use client';

import { useState } from 'react';
import TermsModal from '@/components/TermsModal';
import PasswordGame from '@/components/PasswordGame';

export default function Home() {
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
      
      {/* Content */}
      <div className="relative">
        {!termsAccepted && (
          <TermsModal onAccept={() => setTermsAccepted(true)} />
        )}
        {termsAccepted && <PasswordGame />}
      </div>
    </main>
  );
}
