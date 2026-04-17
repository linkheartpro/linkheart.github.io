import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Mail, Lock, User, Github, Chrome, AlertCircle, Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup,
  updateProfile,
  signOut
} from 'firebase/auth';
import { auth, googleProvider, db } from '../firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

interface AuthProps {
  onBack: () => void;
}

const Auth: React.FC<AuthProps> = ({ onBack }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: any) => {
    console.error('Detailed Auth Error:', err);
    if (err.message) setError(`Lỗi: ${err.message}`);
    else setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
  };

  const syncUserProfile = async (user: { uid: string; email: string | null; displayName: string | null; photoURL?: string | null }) => {
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || 'Người dùng LinkHeart',
          photoURL: user.photoURL || '',
          preferredMode: 'default',
          createdAt: serverTimestamp()
        });
      }
    } catch (err: any) {
      console.error('Sync Profile Error:', err);
      throw err;
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      await syncUserProfile({
        uid: res.user.uid,
        email: res.user.email,
        displayName: res.user.displayName,
        photoURL: res.user.photoURL
      });
    } catch (err: any) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -ml-48 -mb-48" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-[48px] shadow-2xl border-8 border-white p-8 md:p-12 relative z-10"
      >
        <button 
          onClick={onBack}
          className="absolute top-8 left-8 p-3 hover:bg-gray-50 rounded-2xl transition-colors text-gray-400 group"
        >
          <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </button>

        <div className="text-center mb-10 pt-4">
          <div className="w-16 h-16 bg-primary rounded-[20px] flex items-center justify-center text-white shadow-xl mx-auto mb-6 transform rotate-6">
            <Heart className="w-10 h-10 fill-current" />
          </div>
          <h1 className="text-4xl font-black tracking-tight mb-2">
            Chào mừng bạn!
          </h1>
          <p className="text-gray-400 font-bold">
            Đăng nhập nhanh chóng và an toàn để tiếp tục kết nối.
          </p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-red-50 border-2 border-red-100 rounded-2xl flex items-center gap-3 text-red-600 font-bold"
          >
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span className="text-sm">{error}</span>
          </motion.div>
        )}

        <div className="space-y-4">
          <button 
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-4 py-5 px-6 bg-white border-4 border-gray-100 hover:border-primary/30 hover:bg-gray-50 rounded-3xl transition-all font-black text-xl text-gray-700 shadow-lg shadow-gray-100 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            ) : (
              <>
                <Chrome className="w-7 h-7 text-red-500" />
                Tiếp tục với Google
              </>
            )}
          </button>
        </div>

        <p className="mt-10 text-center text-sm font-bold text-gray-300 leading-relaxed px-4">
          Bằng cách đăng nhập, bạn đồng ý với Điều khoản sử dụng và Chính sách bảo mật của LinkHeart.
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
