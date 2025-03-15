import { motion } from 'framer-motion';

interface TermsModalProps {
  onAccept: () => void;
}

export default function TermsModal({ onAccept }: TermsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-xl p-6 max-w-md w-full shadow-2xl border border-gray-700"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Terms and Conditions
        </h2>
        <div className="prose prose-sm sm:prose prose-invert max-w-none mb-8">
          <p className="mb-6 text-gray-300">
            Welcome to &quot;The Ultimate Password Challenge&quot; by Team Error404! Before you proceed,
            please read and agree to the following terms:
          </p>
          <ol className="list-decimal pl-4 space-y-4 text-gray-300">
            <li className="transition-colors hover:text-white">
              If you successfully complete all 25 password rules and win the game,
              Team Error404 commits to voting for your project.
            </li>
            <li className="transition-colors hover:text-white">
              However, if you fail to complete all rules or give up,
              you agree to vote for Team Error404&apos;s project.
            </li>
            <li className="transition-colors hover:text-white">
              This is a challenging game designed to test your problem-solving skills.
              Only 1% of players are expected to complete it successfully.
            </li>
            <li className="transition-colors hover:text-white">
              Your progress cannot be saved, and you must complete the challenge in one session.
            </li>
          </ol>
        </div>
        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAccept}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-blue-500/25 transition-shadow duration-300"
          >
            I Accept the Challenge
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
} 