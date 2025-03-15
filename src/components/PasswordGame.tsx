'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Rule {
  id: number;
  text: string;
  validator: (password: string) => boolean;
  unlocked: boolean;
}

export default function PasswordGame() {
  const [password, setPassword] = useState('');
  const [activeRules, setActiveRules] = useState<Rule[]>([]);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);

  const allRules: Rule[] = [
    {
      id: 1,
      text: "Your password must be at least 8 characters long",
      validator: (pwd) => pwd.length >= 8,
      unlocked: true
    },
    {
      id: 2,
      text: "Your password must contain at least one uppercase letter",
      validator: (pwd) => /[A-Z]/.test(pwd),
      unlocked: true
    },
    {
      id: 3,
      text: "Your password must contain the current hour (in 24-hour format)",
      validator: (pwd) => {
        const hour = new Date().getHours().toString().padStart(2, '0');
        return pwd.includes(hour);
      },
      unlocked: false
    },
    {
      id: 4,
      text: "Your password must contain a prime number",
      validator: (pwd) => {
        const numbers = pwd.match(/\d+/g) || [];
        return numbers.some(num => {
          const n = parseInt(num);
          if (n < 2) return false;
          for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) return false;
          }
          return true;
        });
      },
      unlocked: false
    },
    {
      id: 5,
      text: "The sum of all numbers in your password must be 25",
      validator: (pwd) => {
        const numbers = pwd.match(/\d+/g) || [];
        return numbers.reduce((sum, num) => sum + parseInt(num), 0) === 25;
      },
      unlocked: false
    },
    {
      id: 6,
      text: "Your password must contain a Roman numeral",
      validator: (pwd) => /[IVXLCDM]/.test(pwd),
      unlocked: false
    },
    {
      id: 7,
      text: "Your password must contain a chemical element symbol",
      validator: (pwd) => {
        const elements = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar'];
        return elements.some(element => pwd.includes(element));
      },
      unlocked: false
    },
    {
      id: 8,
      text: "Your password must contain an emoji",
      validator: (pwd) => /[\p{Emoji}]/u.test(pwd),
      unlocked: false
    },
    {
      id: 9,
      text: "Your password must contain a palindrome of at least 3 characters",
      validator: (pwd) => {
        for (let i = 0; i < pwd.length - 2; i++) {
          for (let j = i + 2; j < pwd.length; j++) {
            const substr = pwd.slice(i, j + 1);
            if (substr === substr.split('').reverse().join('')) return true;
          }
        }
        return false;
      },
      unlocked: false
    },
    {
      id: 10,
      text: "Your password must contain a chess piece (♔♕♖♗♘♙)",
      validator: (pwd) => /[♔♕♖♗♘♙]/.test(pwd),
      unlocked: false
    },
    {
      id: 11,
      text: "Your password must contain a mathematical operator (+,-,*,/,=)",
      validator: (pwd) => /[+\-*\/=]/.test(pwd),
      unlocked: false
    },
    {
      id: 12,
      text: "The length of your password must be a Fibonacci number",
      validator: (pwd) => {
        const fib = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
        return fib.includes(pwd.length);
      },
      unlocked: false
    },
    {
      id: 13,
      text: "Your password must contain a valid hex color code (e.g., #FF0000)",
      validator: (pwd) => /#[0-9A-Fa-f]{6}/.test(pwd),
      unlocked: false
    },
    {
      id: 14,
      text: "Your password must contain a word from the NATO phonetic alphabet",
      validator: (pwd) => {
        const natoWords = ['ALPHA', 'BRAVO', 'CHARLIE', 'DELTA', 'ECHO', 'FOXTROT', 'GOLF', 'HOTEL', 'INDIA', 'JULIET', 'KILO', 'LIMA', 'MIKE', 'NOVEMBER', 'OSCAR', 'PAPA', 'QUEBEC', 'ROMEO', 'SIERRA', 'TANGO', 'UNIFORM', 'VICTOR', 'WHISKEY', 'XRAY', 'YANKEE', 'ZULU'];
        return natoWords.some(word => pwd.toUpperCase().includes(word));
      },
      unlocked: false
    },
    {
      id: 15,
      text: "Your password must contain a valid IPv4 address",
      validator: (pwd) => /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/.test(pwd),
      unlocked: false
    },
    {
      id: 16,
      text: "Your password must contain a playing card (e.g., 🂡, 🂢, 🂣)",
      validator: (pwd) => /[🂡🂢🂣🂤🂥🂦🂧🂨🂩🂪🂫🂬🂭🂮]/.test(pwd),
      unlocked: false
    },
    {
      id: 17,
      text: "Your password must contain a valid URL",
      validator: (pwd) => /https?:\/\/[^\s]+/.test(pwd),
      unlocked: false
    },
    {
      id: 18,
      text: "Your password must contain a musical note (♩♪♫♬)",
      validator: (pwd) => /[♩♪♫♬]/.test(pwd),
      unlocked: false
    },
    {
      id: 19,
      text: "Your password must contain a word that means 'password' in another language",
      validator: (pwd) => {
        const passwordWords = ['contraseña', 'Passwort', 'mot de passe', 'パスワード', '密码', 'senha', 'wachtwoord'];
        return passwordWords.some(word => pwd.toLowerCase().includes(word.toLowerCase()));
      },
      unlocked: false
    },
    {
      id: 20,
      text: "Your password must contain a valid Git commit hash",
      validator: (pwd) => /\b[0-9a-f]{7,40}\b/.test(pwd),
      unlocked: false
    },
    {
      id: 21,
      text: "The ASCII values of all characters must sum to a perfect square",
      validator: (pwd) => {
        const sum = pwd.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const sqrt = Math.sqrt(sum);
        return sqrt === Math.floor(sqrt);
      },
      unlocked: false
    },
    {
      id: 22,
      text: "Your password must contain a valid base64 encoded string",
      validator: (pwd) => /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(pwd),
      unlocked: false
    },
    {
      id: 23,
      text: "Your password must contain a valid JSON object",
      validator: (pwd) => {
        try {
          const matches = pwd.match(/\{.*\}/);
          if (!matches) return false;
          JSON.parse(matches[0]);
          return true;
        } catch {
          return false;
        }
      },
      unlocked: false
    },
    {
      id: 24,
      text: "Your password must contain a valid chess move in algebraic notation",
      validator: (pwd) => /[KQRBN]?[a-h]?[1-8]?x?[a-h][1-8](\=[QRBN])?[+#]?/.test(pwd),
      unlocked: false
    },
    {
      id: 25,
      text: "Your password must contain 'Error404' written in binary ASCII",
      validator: (pwd) => pwd.includes('01000101011100100111001001101111011100100110100000110100'),
      unlocked: false
    }
  ];

  useEffect(() => {
    // Unlock new rules based on password length and previous rule completion
    const unlockedRules = allRules.filter((rule, index) => {
      if (index <= 1) return true; // First two rules always visible
      const previousRulesPassed = allRules
        .slice(0, index)
        .every(r => r.validator(password));
      return previousRulesPassed && password.length >= (index * 2);
    });
    setActiveRules(unlockedRules);

    // Check win condition
    const allRulesPassed = unlockedRules.every(rule => rule.validator(password));
    if (allRulesPassed && unlockedRules.length === allRules.length) {
      setGameWon(true);
    }
  }, [password]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
      >
        The Ultimate Password Challenge
      </motion.h1>
      
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password..."
            className="w-full p-4 sm:p-5 rounded-xl bg-gray-800/50 text-white border-2 border-gray-700 focus:border-blue-500 outline-none transition-all duration-300 hover:bg-gray-800/70 backdrop-blur-sm shadow-lg text-base sm:text-lg"
          />
          <div className="absolute right-4 top-4 sm:top-5 text-gray-400 text-sm sm:text-base">
            Length: {password.length}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6">
        {activeRules.map((rule) => (
          <motion.div
            key={rule.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className={`p-4 sm:p-5 rounded-xl border ${
              rule.validator(password) 
                ? 'bg-green-900/20 border-green-500/30 text-green-300' 
                : 'bg-gray-800/50 border-gray-700 text-gray-300'
            } backdrop-blur-sm shadow-lg transition-all duration-300 hover:transform hover:scale-[1.02]`}
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                {rule.validator(password) ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-green-400 text-xl sm:text-2xl"
                  >
                    ✓
                  </motion.span>
                ) : (
                  <span className="text-red-400 text-xl sm:text-2xl">×</span>
                )}
              </div>
              <span className="text-sm sm:text-base">{rule.text}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {gameWon && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-gradient-to-br from-green-900 to-green-800 text-white p-8 rounded-xl text-center max-w-md w-full border border-green-700 shadow-2xl"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-5xl mb-4"
            >
              🎉
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Congratulations!
            </h2>
            <p className="text-lg sm:text-xl mb-2 text-green-300">
              You've mastered the Ultimate Password Challenge!
            </p>
            <p className="text-base sm:text-lg text-green-400">
              Team Error404 will vote for your project!
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
} 