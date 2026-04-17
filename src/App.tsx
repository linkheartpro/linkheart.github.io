import { motion, AnimatePresence } from "motion/react";
import { 
  Heart, 
  Shield, 
  MapPin, 
  MessageCircle, 
  Stethoscope, 
  Clock, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  ArrowLeft,
  Menu,
  X,
  Phone,
  Mail,
  Facebook,
  Instagram,
  ChevronDown,
  Star,
  Smartphone,
  Zap,
  Award,
  Mic,
  Gamepad2,
  BookOpen,
  Dumbbell,
  Plane,
  FileText,
  Activity,
  Baby,
  LogOut,
  CreditCard,
  Building2,
  Wallet,
  Calendar,
  LayoutDashboard,
  History,
  Navigation,
  Video,
  Send,
  User,
  Bot,
  Sparkles,
  Loader2
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { GoogleGenAI } from "@google/genai";
import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
import { doc, getDoc, collection, getDocs, query, where, setDoc, serverTimestamp } from "firebase/firestore";
import LandingPage from "./components/LandingPage";
import Auth from "./components/Auth";

// --- Types ---
type UserType = 'portal' | 'kids' | 'pro' | 'elderly' | 'pricing' | 'payment';
type ProView = 'home' | 'dashboard' | 'appointments' | 'wallet' | 'tracking' | 'footer-page';

interface Plan {
  name: string;
  price: string;
  period: string;
  features: string[];
  color: string;
  button: string;
  highlight?: boolean;
  isCurrent?: boolean;
}

interface Appointment {
  id: string;
  service: string;
  companion: typeof COMPANIONS[0];
  status: 'pending' | 'active' | 'completed';
  time: string;
  location: string;
}

// --- Portal Component ---
const Portal = ({ onSelect }: { onSelect: (type: UserType) => void }) => {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center p-4 py-12 md:py-24 relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -ml-48 -mb-48" />

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 max-w-4xl relative z-10"
      >
        <div className="inline-block px-4 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-6 uppercase tracking-widest">
          Kết nối tâm giao - Lan tỏa yêu thương
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
          LinkHeart: Đồng hành <br className="hidden md:block" />
          <span className="text-primary italic">đa thế hệ</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto font-medium">
          Dịch vụ chăm sóc và đồng hành tin cậy cho mọi thành viên trong gia đình bạn.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16">
          <button 
            onClick={() => onSelect('pricing')}
            className="px-10 py-5 bg-gray-900 text-white font-black text-xl rounded-full shadow-xl hover:scale-105 transition-transform active:scale-95 flex items-center gap-3"
          >
            <CreditCard className="w-6 h-6 text-primary" />
            XEM CÁC GÓI DỊCH VỤ
          </button>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full relative z-10">
        {[
          { 
            id: 'kids', 
            title: 'Cho bé yêu', 
            desc: 'Dưới 18 tuổi. Tìm anh chị sinh viên dạy kèm, chơi thể thao, kể chuyện.',
            icon: <Baby className="w-12 h-12 text-kids-orange" />,
            color: 'border-kids-orange hover:bg-kids-orange/5',
            tag: 'The Bright Theme'
          },
          { 
            id: 'pro', 
            title: 'Cho chính tôi', 
            desc: 'Người trưởng thành. Tìm bạn tập gym, du lịch, hoặc đặt dịch vụ cho cha mẹ.',
            icon: <Users className="w-12 h-12 text-pro-green" />,
            color: 'border-pro-green hover:bg-pro-green/5',
            tag: 'The Professional Theme'
          },
          { 
            id: 'elderly', 
            title: 'Cho cha mẹ', 
            desc: 'Người cao tuổi. Chế độ hỗ trợ đặc biệt với giao diện siêu đơn giản.',
            icon: <Heart className="w-12 h-12 text-primary" />,
            color: 'border-primary hover:bg-primary/5',
            tag: 'The Comfort Theme'
          }
        ].map((item, i) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => onSelect(item.id as UserType)}
            className={`p-10 rounded-[48px] border-4 bg-white text-left transition-all group ${item.color} shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_40px_60px_-20px_rgba(0,0,0,0.15)] hover:-translate-y-2`}
          >
            <div className="mb-8 p-4 bg-gray-50 rounded-2xl w-fit group-hover:scale-110 transition-transform">{item.icon}</div>
            <h3 className="text-3xl font-bold mb-3">{item.title}</h3>
            <p className="text-gray-500 text-lg mb-6 leading-relaxed">{item.desc}</p>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400">
               {item.tag} <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
// --- LinkyAI Persistent Assistant Component ---
const LinkyAI = ({ user }: { user: FirebaseUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: `Chào ${user.displayName || 'bạn'}, Linky đây! Mình có thể giúp gì cho gia đình bạn hôm nay?` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            role: 'user',
            parts: [{ text: `Hệ thống: Bạn là Linky, một trợ lý thông minh và ấm áp của ứng dụng LinkHeart. 
            LinkHeart là ứng dụng kết nối đa thế hệ: 
            - Cho bé yêu (Kids Mode): Anh chị Companion sinh viên chơi cùng bé.
            - Cho người trưởng thành (Pro Mode): Quản lý gia đình, nạp ví, đặt lịch.
            - Cho cha mẹ (Senior Mode): Giao diện đơn giản cho người già, theo dõi sức khỏe.
            Hãy trả lời ngắn gọn, thân thiện, và luôn hỗ trợ người dùng về các dịch vụ của LinkHeart.` }]
          },
          ...messages.map(m => ({
            role: m.role === 'ai' ? 'model' : 'user' as const,
            parts: [{ text: m.text }],
          })),
          { role: 'user', parts: [{ text: userMsg }] }
        ]
      });

      const aiText = response.text || "Xin lỗi, mình đang gặp chút trục trặc. Bạn thử lại nhé!";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "Kết nối của Linky đang bị gián đoạn, hãy kiểm tra lại mạng nhé!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[200]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 50, scale: 0.8, filter: 'blur(10px)' }}
            className="absolute bottom-24 right-0 w-[90vw] md:w-[400px] h-[550px] bg-white rounded-[40px] shadow-2xl border-4 border-primary overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-primary p-6 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-black text-lg leading-none">Linky AI</h4>
                  <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest mt-1">Trợ lý gia đình</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Chat Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
              {messages.map((m, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: m.role === 'ai' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${m.role === 'ai' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-3xl font-bold text-sm shadow-sm ${
                    m.role === 'ai' 
                      ? 'bg-white text-gray-800 border-2 border-primary/10 rounded-tl-none' 
                      : 'bg-primary text-white rounded-tr-none'
                  }`}>
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-3xl rounded-tl-none border-2 border-primary/10 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce delay-75" />
                    <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce delay-150" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 bg-white border-t-2 border-gray-100 flex gap-3">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Hỏi Linky bất cứ điều gì..."
                className="flex-1 bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 text-sm font-bold focus:border-primary focus:ring-0 transition-colors"
              />
              <button 
                onClick={handleSend}
                disabled={isTyping || !input.trim()}
                className="p-4 bg-primary text-white rounded-2xl hover:scale-110 active:scale-95 transition-all shadow-lg disabled:opacity-50 disabled:scale-100"
              >
                {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative group p-6 bg-white rounded-full shadow-2xl border-4 border-primary z-10"
      >
        <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping group-hover:animate-none" />
        <Bot className="w-8 h-8 text-primary relative z-10" />
        {!isOpen && (
          <div className="absolute -top-12 right-0 bg-white px-4 py-2 rounded-2xl shadow-xl border-2 border-primary/10 whitespace-nowrap hidden md:block group-hover:block transition-all scale-0 group-hover:scale-100 origin-bottom-right">
             <p className="text-[10px] font-black text-primary uppercase leading-tight">Linky AI</p>
             <p className="text-xs font-bold text-gray-700">Chat với Linky!</p>
          </div>
        )}
      </motion.button>
    </div>
  );
};

// --- Mock Data ---
interface Companion {
  id: string;
  name: string;
  age: number;
  school: string;
  rating: number;
  bio: string;
  img: string;
  skills: string[];
  price?: number;
}

const COMPANIONS: Companion[] = [
  { id: 'c1', name: 'Nguyễn Minh Anh', age: 21, school: 'ĐH Ngoại Thương', rating: 4.9, bio: 'Năng động, yêu trẻ em, có chứng chỉ sơ cứu.', img: 'https://picsum.photos/seed/c1/200/200', skills: ['Tiếng Anh', 'Dạy vẽ'] },
  { id: 'c2', name: 'Trần Hoàng Nam', age: 22, school: 'ĐH Bách Khoa', rating: 4.8, bio: 'Giỏi toán, thích chơi thể thao, nhiệt tình.', img: 'https://picsum.photos/seed/c2/200/200', skills: ['Toán', 'Bóng rổ'] },
  { id: 'c3', name: 'Lê Thị Thanh', age: 20, school: 'ĐH Sư Phạm', rating: 5.0, bio: 'Kỹ năng kể chuyện tốt, kiên nhẫn và chu đáo.', img: 'https://picsum.photos/seed/c3/200/200', skills: ['Kể chuyện', 'Âm nhạc'] },
  { id: 'c4', name: 'Phạm Đức Hiếu', age: 23, school: 'ĐH Y Dược', rating: 4.7, bio: 'Kiến thức y tế tốt, điềm đạm, hỗ trợ người già tốt.', img: 'https://picsum.photos/seed/c4/200/200', skills: ['Sơ cứu', 'Y tế'] }
];

const PRICES = {
  kids: 149000,
  social: 119000,
  senior: 179000
};

const HIEU_THAO_PACKAGES = [
  { id: 's', title: 'Hiếu Thảo S', hours: 20, price: 3390000, desc: 'Phù hợp dùng thử, làm quen với Companion.' },
  { id: 'm', title: 'Hiếu Thảo M', hours: 40, price: 6390000, desc: 'Tặng máy đo huyết áp điện tử + Báo cáo.' },
  { id: 'l', title: 'Hiếu Thảo L', hours: 60, price: 8990000, desc: 'Companion cố định + Nút SOS 24/7 + Miễn phí Tech-Tutor.' }
];

const KIDS_MISSIONS = [
  { id: 1, title: 'Nhà toán học nhí', task: 'Giải 5 bài toán cùng Companion', badge: '🧮' },
  { id: 2, title: 'Kình ngư nhỏ', task: 'Hoàn thành buổi tập bơi', badge: '🏊' },
  { id: 3, title: 'Họa sĩ tài ba', task: 'Vẽ một bức tranh về gia đình', badge: '🎨' }
];

const HANDBOOK_CONTENT = {
  kids: [
    { title: '3 Quy tắc vàng', content: '1. Luôn đi cùng anh chị Companion. 2. Không nhận quà người lạ. 3. Gọi bố mẹ ngay khi cần.' },
    { title: 'Nhận diện LinkHeart', content: 'Anh chị luôn mặc áo đồng hồ xanh, có thẻ tên và mã QR xác minh trên ngực.' },
    { title: 'Cách dùng nút SOS', content: 'Nhấn giữ nút đỏ trên màn hình 3 giây để gọi cứu hộ và bố mẹ ngay lập tức.' }
  ],
  elderly: [
    { title: 'An toàn đi dạo', content: 'Luôn mang theo điện thoại, đi giày êm và thông báo cho người thân trước khi đi.' },
    { title: 'Dùng trợ lý ảo', content: 'Chỉ cần nhấn nút Mic và nói "Gọi con" hoặc "Tìm người đi dạo", cháu sẽ hỗ trợ ngay.' },
    { title: 'Bảo mật thông tin', content: 'Không cung cấp mật khẩu ngân hàng cho bất kỳ ai, kể cả người đồng hành.' }
  ]
};

// --- Companion Detail Component ---
const CompanionDetail = ({ companion, onConfirm }: { companion: typeof COMPANIONS[0] & { service?: string }; onConfirm?: () => void }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-6">
      <div className="relative">
        <img src={companion.img} className="w-24 h-24 rounded-full border-4 border-pro-green/20 object-cover" alt={companion.name} referrerPolicy="no-referrer" />
        <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-lg border-2 border-pro-green">
           <Shield className="w-4 h-4 text-pro-green" />
        </div>
      </div>
      <div>
        <h4 className="text-2xl font-black text-gray-900">{companion.name}</h4>
        <p className="text-sm font-bold text-pro-green uppercase tracking-tighter">{companion.school}</p>
        <div className="flex items-center gap-1 text-yellow-500 mt-2">
          {[1, 2, 3, 4, 5].map(i => <Star key={i} className={`w-4 h-4 ${i <= Math.floor(companion.rating) ? 'fill-current' : ''}`} />)}
          <span className="font-black text-gray-900 ml-2">{companion.rating}</span>
        </div>
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-4">
       <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <p className="text-[10px] text-gray-400 font-black uppercase">Độ tuổi</p>
          <p className="font-bold text-gray-900">{companion.age} tuổi</p>
       </div>
       <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <p className="text-[10px] text-gray-400 font-black uppercase">Dịch vụ</p>
          <p className="font-bold text-pro-green uppercase">{companion.service || 'Đồng hành'}</p>
       </div>
    </div>

    <div className="space-y-3">
       <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Kỹ năng nổi bật</p>
       <div className="flex flex-wrap gap-2">
          {companion.skills.map(skill => (
            <span key={skill} className="px-3 py-1 bg-pro-green/5 text-pro-green text-[10px] font-black rounded-full border border-pro-green/10">#{skill}</span>
          ))}
       </div>
    </div>

    <p className="text-sm text-gray-600 font-medium italic border-l-4 border-pro-green pl-4 py-2 bg-pro-green/5 rounded-r-2xl">
      "{companion.bio}"
    </p>

    {onConfirm && (
      <div className="pt-4 border-t border-gray-100 space-y-4">
        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
           <p className="font-bold text-gray-500">Giá tham khảo:</p>
           <p className="text-2xl font-black text-gray-900">{PRICES.senior.toLocaleString()}đ/giờ</p>
        </div>
        <button 
          onClick={onConfirm}
          className="w-full bg-pro-green text-white py-6 rounded-[32px] font-black text-xl shadow-xl hover:bg-pro-green-dark transition-all active:scale-95 flex items-center justify-center gap-3"
        >
          XÁC NHẬN & ĐẶT LỊCH NGAY
        </button>
      </div>
    )}
  </div>
);

const ChatSimulation = ({ onBack }: { onBack: () => void }) => {
  const [messages, setMessages] = useState([
    { role: 'companion', text: 'Chào bạn, mình đang trên đường đến. Bạn cần mình chuẩn bị thêm gì không?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'companion', text: 'Vâng ạ, mình đã nắm rõ. Hẹn gặp bạn sau ít phút nữa!' }]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto space-y-4 p-2 scrollbar-hide">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-3xl font-medium ${m.role === 'user' ? 'bg-gray-900 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div className="pt-6 flex gap-3">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Nhập tin nhắn..."
          className="flex-1 bg-gray-100 border-none rounded-2xl px-6 font-medium focus:ring-2 focus:ring-pro-green"
        />
        <button onClick={handleSend} className="p-4 bg-pro-green text-white rounded-2xl shadow-lg shadow-pro-green/20 active:scale-95 transition-all">
          <Send className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

const PaymentSimulation = ({ onComplete }: { onComplete: (method: string) => void }) => {
  const [method, setMethod] = useState<'visa' | 'bank' | null>(null);
  const [step, setStep] = useState(1);

  if (step === 2) {
    return (
      <div className="text-center py-8 space-y-6">
        <div className="w-24 h-24 border-8 border-pro-green border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="font-black text-2xl uppercase tracking-tighter text-pro-green">Đang xác thực giao dịch...</p>
        <p className="text-gray-500 font-bold italic">Vui lòng không tắt ứng dụng</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-2">
      <p className="text-sm text-gray-500 font-black uppercase tracking-widest text-center border-b pb-4">Chọn phương thức thanh toán</p>
      <div className="grid grid-cols-2 gap-6">
        <button 
          onClick={() => setMethod('visa')}
          className={`p-8 rounded-[40px] border-4 transition-all flex flex-col items-center gap-3 shadow-sm ${method === 'visa' ? 'border-pro-green bg-pro-green/5' : 'border-gray-100 hover:border-gray-200'}`}
        >
          <div className={`p-4 rounded-2xl ${method === 'visa' ? 'bg-pro-green text-white' : 'bg-gray-100 text-gray-400'}`}>
            <CreditCard className="w-10 h-10" />
          </div>
          <span className="font-black text-lg">THE VISA</span>
        </button>
        <button 
          onClick={() => setMethod('bank')}
          className={`p-8 rounded-[40px] border-4 transition-all flex flex-col items-center gap-3 shadow-sm ${method === 'bank' ? 'border-pro-green bg-pro-green/5' : 'border-gray-100 hover:border-gray-200'}`}
        >
          <div className={`p-4 rounded-2xl ${method === 'bank' ? 'bg-pro-green text-white' : 'bg-gray-100 text-gray-400'}`}>
            <Building2 className="w-10 h-10" />
          </div>
          <span className="font-black text-lg">CHUYỂN KHOẢN</span>
        </button>
      </div>

      {method === 'visa' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-8 bg-gray-50 rounded-[40px] border-4 border-gray-100 space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-xs font-black text-gray-400 uppercase">Thẻ đã lưu (Ưu tiên)</p>
            <span className="px-3 py-1 bg-green-100 text-green-600 text-[8px] font-black rounded-full">SECURE</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-white rounded-3xl border-2 border-pro-green">
             <div className="flex items-center gap-4">
               <div className="w-12 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-[10px] text-white font-black">VISA</div>
               <p className="font-black text-xl tracking-tighter">**** **** **** 8888</p>
             </div>
             <CheckCircle2 className="text-pro-green w-8 h-8" />
          </div>
          <p className="text-[10px] text-gray-400 italic font-bold">Thanh toán 1 chạm an toàn qua LinkHeart Secure Hub.</p>
        </motion.div>
      )}

      {method === 'bank' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-8 bg-blue-50 rounded-[40px] border-4 border-dashed border-blue-200 text-center space-y-6">
          <p className="font-black text-2xl text-blue-800 uppercase tracking-tight">Quét mã QR Napas 24/7</p>
          <div className="w-48 h-48 bg-white mx-auto flex items-center justify-center border-8 border-white shadow-2xl rounded-3xl relative overflow-hidden">
             <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=LinkHeartPayment" className="w-full h-full p-2" alt="QR" />
             <div className="absolute inset-0 flex items-center justify-center opacity-10">
               <Zap className="w-32 h-32 text-blue-800" />
             </div>
          </div>
          <div className="bg-white/50 p-4 rounded-2xl">
             <p className="text-xs text-blue-600 font-black uppercase tracking-widest mb-1">Vietcombank • 1022334455</p>
             <p className="text-sm text-gray-900 font-bold uppercase">LINKHEART GLOBAL TECHNOLOGY</p>
          </div>
        </motion.div>
      )}

      <button 
        disabled={!method}
        onClick={() => {
          setStep(2);
          setTimeout(() => onComplete(method!), 2500);
        }}
        className="w-full bg-gray-900 text-white py-10 rounded-[64px] font-black text-3xl shadow-2xl disabled:opacity-30 disabled:grayscale hover:bg-black transition-all active:scale-95"
      >
        TIẾP TỤC
      </button>
    </div>
  );
};

// --- Simulation Modal ---
const SimulationModal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  type = 'info' 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  children: React.ReactNode;
  type?: 'info' | 'success' | 'loading' | 'emergency' | 'companion';
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className={`relative w-full max-w-md bg-white rounded-[32px] overflow-hidden shadow-2xl border-4 ${
              type === 'emergency' ? 'border-red-600' : 
              type === 'success' ? 'border-green-500' : 
              type === 'companion' ? 'border-primary' : 'border-gray-100'
            }`}
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">{title}</h3>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- Toast System ---
const Toast = ({ message, isVisible, onClose }: { message: string; isVisible: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[300] bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-white/10"
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-bold">{message}</span>
          <button onClick={onClose} className="ml-2 hover:text-primary transition-colors"><X className="w-4 h-4" /></button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Map Simulation ---
const MapSimulation = () => {
  return (
    <div className="w-full h-48 bg-gray-100 rounded-2xl relative overflow-hidden border border-gray-200">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-full h-1 bg-gray-300 rotate-45" />
        <div className="absolute top-20 left-0 w-full h-1 bg-gray-300 -rotate-12" />
        <div className="absolute top-0 left-40 w-1 h-full bg-gray-300" />
      </div>
      <motion.div 
        animate={{ 
          x: [20, 100, 50, 20],
          y: [20, 50, 80, 20]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-4 h-4 bg-pro-green rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)] flex items-center justify-center"
      >
        <div className="w-2 h-2 bg-white rounded-full" />
      </motion.div>
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg text-[10px] font-bold shadow-sm">
        Đang di chuyển: 15km/h
      </div>
    </div>
  );
};

// --- Footer Component ---
const Footer = ({ theme = 'default', onToast }: { theme?: 'kids' | 'pro' | 'elderly' | 'default', onToast: (msg: string) => void }) => {
  const colors = {
    kids: 'bg-kids-orange text-white',
    pro: 'bg-gray-900 text-white',
    elderly: 'bg-white text-gray-900 border-t-8 border-gray-900',
    default: 'bg-gray-900 text-white'
  };

  return (
    <footer className={`py-12 px-8 ${colors[theme]}`}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6" fill="currentColor" />
            <span className="text-xl font-bold">LinkHeart</span>
          </div>
          <p className="text-sm opacity-70">Kết nối yêu thương trong mọi hành trình đồng hành.</p>
        </div>
        {[
          { title: 'Về chúng tôi', links: ['Sứ mệnh', 'Đội ngũ', 'Tuyển dụng'] },
          { title: 'Dịch vụ', links: ['Cho trẻ em', 'Cho người lớn', 'Cho người già'] },
          { title: 'Hỗ trợ', links: ['Trung tâm trợ giúp', 'Điều khoản', 'Bảo mật'] }
        ].map((col, i) => (
          <div key={i} className="space-y-4">
            <h4 className="font-bold">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((link, j) => (
                <li key={j}>
                  <button 
                    onClick={() => onToast(`Đang chuyển đến trang ${link}...`)}
                    className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 text-center text-xs opacity-50">
        © 2026 LinkHeart. All rights reserved.
      </div>
    </footer>
  );
};

// --- Kids Mode ---
const KidsMode = ({ onBack }: { onBack: () => void }) => {
  const [activeView, setActiveView] = useState<'home' | 'footer-page' | 'tracking'>('home');
  const [footerPage, setFooterPage] = useState<{ title: string; content: string } | null>(null);
  const [activeCompanion, setActiveCompanion] = useState<Companion | null>(null);
  const [modal, setModal] = useState<{ open: boolean; title: string; content: React.ReactNode; type: any; data?: any }>({
    open: false,
    title: '',
    content: '',
    type: 'info'
  });
  const [toast, setToast] = useState({ show: false, msg: '' });

  const showToast = (msg: string) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: '' }), 3000);
  };

  const showSimulation = (title: string, content: React.ReactNode, type: any = 'success', data?: any) => {
    setModal({ open: true, title, content, type, data });
  };

  const showRandomCompanion = async () => {
    const path = "companions";
    showSimulation('Tìm kiếm', '', 'loading');
    try {
      const companionsRef = collection(db, path);
      const snapshot = await getDocs(companionsRef);
      const companionsData = snapshot.docs.map(doc => doc.data() as Companion);
      
      if (companionsData.length === 0) {
        showSimulation('Opps!', 'Hiện chưa có Companion nào đăng ký dịch vụ này.', 'info');
        return;
      }

      const randomComp = companionsData[Math.floor(Math.random() * companionsData.length)];
      showSimulation('Đã tìm thấy Companion!', '', 'companion', randomComp);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  };

  const showHandbook = () => {
    showSimulation('Cẩm nang cho bé', '', 'info', { handbook: HANDBOOK_CONTENT.kids });
  };

  const renderFooterPage = (title: string) => {
    const contentMap: Record<string, string> = {
      'Sứ mệnh': 'LinkHeart Kids mang đến môi trường an toàn, vui vẻ cho bé và sự an tâm tuyệt đối cho bố mẹ.',
      'Đội ngũ': 'Các anh chị Companion là sinh viên ưu tú từ các trường đại học hàng đầu, yêu trẻ và năng động.',
      'Tuyển dụng': 'Gia nhập đội ngũ Companion để cùng bé kiến tạo những kỷ niệm đẹp!',
      'Cho trẻ em': 'Dịch vụ vui chơi, học tập và rèn luyện kỹ năng cho bé.',
      'Cho người lớn': 'Dịch vụ hỗ trợ người trưởng thành trong cuộc sống hàng ngày.',
      'Cho người già': 'Dịch vụ chăm sóc và đồng hành cùng người cao tuổi.',
      'Trung tâm trợ giúp': 'Liên hệ 1900 1234 để được hỗ trợ nhanh nhất.',
      'Điều khoản': 'Quy định sử dụng dịch vụ an toàn cho bé.',
      'Bảo mật': 'Cam kết bảo mật thông tin gia đình và bé.'
    };
    setFooterPage({ title, content: contentMap[title] || 'Nội dung đang được cập nhật...' });
    setActiveView('footer-page');
    window.scrollTo(0, 0);
  };

  return (
    <div className="theme-kids min-h-screen flex flex-col">
      <Toast message={toast.msg} isVisible={toast.show} onClose={() => setToast({ ...toast, show: false })} />
      <SimulationModal 
        isOpen={modal.open} 
        onClose={() => setModal({ ...modal, open: false })}
        title={modal.title}
        type={modal.type}
      >
        <div className="text-center space-y-4">
          {modal.type === 'loading' ? (
            <div className="py-8">
              <div className="w-16 h-16 border-4 border-kids-orange border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="font-bold text-kids-orange">Đang tìm kiếm anh chị phù hợp...</p>
            </div>
          ) : modal.type === 'companion' ? (
            <div className="text-left">
              <CompanionDetail companion={modal.data} />
              <button 
                onClick={() => {
                  setActiveCompanion(modal.data);
                  setModal({ ...modal, open: false });
                  setActiveView('tracking');
                  showToast(`Đã bắt đầu hành trình cùng ${modal.data.name}!`);
                }}
                className="w-full mt-6 bg-kids-orange text-white py-4 rounded-2xl font-black text-lg shadow-[4px_4px_0px_0px_#CC7E16]"
              >
                CHỌN ANH/CHỊ NÀY
              </button>
            </div>
          ) : modal.data?.handbook ? (
            <div className="text-left space-y-4">
              {modal.data.handbook.map((item: any, i: number) => (
                <div key={i} className="p-4 bg-blue-50 rounded-2xl border-2 border-blue-100">
                  <h4 className="font-black text-blue-600 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.content}</p>
                </div>
              ))}
              <button 
                onClick={() => setModal({ ...modal, open: false })}
                className="w-full bg-kids-orange text-white py-4 rounded-2xl font-black text-lg shadow-[4px_4px_0px_0px_#CC7E16]"
              >
                ĐÃ HIỂU!
              </button>
            </div>
          ) : (
            <>
              <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <p className="text-gray-600 leading-relaxed">{modal.content}</p>
              <button 
                onClick={() => setModal({ ...modal, open: false })}
                className="w-full bg-kids-orange text-white py-4 rounded-2xl font-black text-lg shadow-[4px_4px_0px_0px_#CC7E16]"
              >
                TUYỆT VỜI!
              </button>
            </>
          )}
        </div>
      </SimulationModal>

      <nav className="p-6 flex justify-between items-center bg-white border-b-4 border-kids-orange sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveView('home')}>
          <Baby className="text-kids-orange w-8 h-8" />
          <span className="text-2xl font-black text-kids-orange">LinkHeart Kids</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-6 mr-8">
            <button onClick={() => { setActiveView('home'); showToast('Bạn đang ở Trang Chủ'); }} className="font-black text-gray-400 hover:text-kids-orange transition-colors">TRANG CHỦ</button>
            <button onClick={() => showToast('Chưa có bạn bè trực tuyến')} className="font-black text-gray-400 hover:text-kids-orange transition-colors">BẠN BÈ</button>
            <button onClick={() => showToast('Nhật ký đang trống')} className="font-black text-gray-400 hover:text-kids-orange transition-colors">NHẬT KÝ</button>
          </div>
          <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors font-black text-xs text-gray-600">
            <ArrowLeft className="w-5 h-5" />
            <span>QUAY LẠI</span>
          </button>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        <AnimatePresence mode="wait">
          {activeView === 'home' ? (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
                <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                  <div className="inline-block bg-kids-orange/10 text-kids-orange px-4 py-2 rounded-full font-black text-sm mb-6">
                    AN TOÀN & VUI VẺ 100%
                  </div>
                  <h1 className="text-6xl font-black text-kids-orange mb-6 leading-tight">Cùng bé <br /> vui chơi & học tập!</h1>
                  <p className="text-xl text-gray-600 mb-8">Tìm anh chị sinh viên năng động để cùng bé khám phá thế giới qua các hoạt động bổ ích.</p>
                  <div className="flex gap-4">
                    <button 
                      onClick={showRandomCompanion}
                      className="bg-kids-orange text-white px-10 py-5 rounded-full font-black text-2xl shadow-[6px_6px_0px_0px_#CC7E16] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#CC7E16] active:scale-95 transition-all"
                    >
                      TÌM NGAY!
                    </button>
                  </div>
                </motion.div>
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }} 
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative group cursor-pointer"
                  onClick={() => showSimulation('Video giới thiệu', 'Đang tải video giới thiệu về các hoạt động vui chơi tại LinkHeart Kids...')}
                >
                  <div className="absolute inset-0 bg-kids-blue rounded-[40px] rotate-3 group-hover:rotate-1 transition-transform" />
                  <img src="https://picsum.photos/seed/kids/800/600" className="relative rounded-[40px] border-8 border-white shadow-2xl w-full h-[400px] object-cover" alt="Kids" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Zap className="w-10 h-10 text-kids-orange fill-current" />
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-20">
                {[
                  { title: 'Gia sư vui vẻ', icon: <BookOpen />, color: 'bg-blue-100 text-blue-500', desc: 'Học mà chơi, chơi mà học cùng các anh chị ĐH Ngoại Thương, Bách Khoa.' },
                  { title: 'Bạn chơi thể thao', icon: <Gamepad2 />, color: 'bg-green-100 text-green-500', desc: 'Cùng đá bóng, cầu lông hoặc chạy bộ tại công viên an toàn.' },
                  { title: 'Kể chuyện đêm khuya', icon: <MessageCircle />, color: 'bg-purple-100 text-purple-500', desc: 'Những câu chuyện nhân văn giúp bé ngủ ngon và phát triển tư duy.' }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ y: -10 }}
                    onClick={() => showSimulation(item.title, `Bạn đã chọn dịch vụ ${item.title}. Chúng tôi sẽ gửi danh sách các Companion phù hợp nhất cho bố mẹ duyệt!`)}
                    className="card-bouncy p-8 bg-white text-center cursor-pointer"
                  >
                    <div className={`w-20 h-20 ${item.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-black mb-4">{item.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-8 mb-20">
                <div className="bg-kids-blue/10 p-8 rounded-[40px] border-4 border-kids-blue/20 cursor-pointer hover:bg-kids-blue/20 transition-colors" onClick={() => showToast('Bảng vàng vinh danh các bé ngoan!')}>
                  <h3 className="text-3xl font-black text-kids-blue mb-6 flex items-center gap-3">
                    <Award className="w-10 h-10" /> Bảng vàng tuần này
                  </h3>
                  <div className="space-y-4">
                    {[
                      { name: 'Bé Na', task: 'Hoàn thành 5 bài tập toán', points: '+500' },
                      { name: 'Bé Tí', task: 'Đọc xong 2 cuốn sách', points: '+300' }
                    ].map((b, i) => (
                      <div key={i} className="bg-white p-4 rounded-2xl flex justify-between items-center shadow-sm hover:scale-105 transition-transform">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-black">{i + 1}</div>
                          <div>
                            <p className="font-black">{b.name}</p>
                            <p className="text-xs text-gray-500">{b.task}</p>
                          </div>
                        </div>
                        <span className="text-kids-orange font-black">{b.points}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-kids-orange/10 p-8 rounded-[40px] border-4 border-kids-orange/20 cursor-pointer hover:bg-kids-orange/20 transition-colors" onClick={() => showToast('Gói an toàn cho bé yêu!')}>
                  <h3 className="text-3xl font-black text-kids-orange mb-6 flex items-center gap-3">
                    <Shield className="w-10 h-10" /> Bảo vệ chủ động
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={(e) => { e.stopPropagation(); showSimulation('QR Check-in', 'Hệ thống yêu cầu quét mã QR bảo mật từ Companion để xác nhận ca làm việc bắt đầu.', 'info'); }}
                      className="bg-white p-6 rounded-3xl flex flex-col items-center gap-3 shadow-md hover:scale-105 transition-all text-gray-700"
                    >
                      <Zap className="w-8 h-8 text-kids-orange" />
                      <span className="font-black text-xs uppercase">Mã QR Bảo Mật</span>
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); showSimulation('Safe-Word', 'Bé đã kích hoạt mật mã an toàn! Hệ thống đã gửi thông báo khẩn cấp (Alarm Red) cho bố mẹ ngay lập tức!', 'danger'); }}
                      className="bg-red-100 p-6 rounded-3xl flex flex-col items-center gap-3 shadow-md border-4 border-red-500 hover:scale-105 transition-all text-red-600"
                    >
                      <Mic className="w-8 h-8" />
                      <span className="font-black text-xs uppercase">Nút "Safe-Word"</span>
                    </button>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); showHandbook(); }}
                    className="w-full mt-4 bg-white text-kids-orange py-3 rounded-2xl font-black border-2 border-kids-orange hover:bg-kids-orange hover:text-white transition-all"
                  >
                    XEM CẨM NANG
                  </button>
                </div>
              </div>

              {/* Học mà chơi - Gamified Learning (Page 2) */}
              <div className="mb-20">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-4xl font-black text-kids-orange flex items-center gap-4">
                    <Award className="w-12 h-12" /> Học mà chơi - Thử thách ngày
                  </h2>
                  <span className="px-6 py-2 bg-kids-orange text-white rounded-full font-black text-lg">
                    GEMS: 1,250 💎
                  </span>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {KIDS_MISSIONS.map((mission) => (
                    <motion.div 
                      key={mission.id}
                      whileHover={{ scale: 1.05 }}
                      className="p-8 bg-white rounded-[40px] border-4 border-dashed border-kids-orange/30 relative overflow-hidden group cursor-pointer"
                      onClick={() => showSimulation(mission.title, `Bạn đang bắt đầu nhiệm vụ: ${mission.task}. Hãy cùng Companion hoàn thành để nhận huy hiệu ${mission.badge} nhé!`, 'success')}
                    >
                      <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="text-8xl">{mission.badge}</span>
                      </div>
                      <span className="inline-block px-3 py-1 bg-kids-orange/10 text-kids-orange rounded-lg text-xs font-black mb-4 uppercase">
                        Cấp độ: Dễ
                      </span>
                      <h4 className="text-2xl font-black mb-2">{mission.title}</h4>
                      <p className="text-gray-500 font-bold mb-6">{mission.task}</p>
                      <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: mission.id === 1 ? '70%' : '10%' }}
                          className="h-full bg-kids-orange"
                        />
                      </div>
                      <p className="text-right text-xs font-black text-kids-orange mt-2">TIẾN ĐỘ: {mission.id === 1 ? '70' : '10'}%</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : activeView === 'tracking' && activeCompanion ? (
            <motion.div 
              key="tracking"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="max-w-7xl mx-auto py-12"
            >
              <button onClick={() => setActiveView('home')} className="mb-8 flex items-center gap-2 text-kids-orange font-black hover:underline">
                <ArrowRight className="w-4 h-4 rotate-180" /> QUAY LẠI
              </button>
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="bg-white p-4 rounded-[40px] shadow-2xl border-8 border-kids-orange/20 relative overflow-hidden h-[500px]">
                    <MapSimulation />
                    <div className="absolute top-6 left-6 bg-white/90 p-3 rounded-2xl shadow-lg border-2 border-kids-orange">
                      <p className="text-[10px] font-black text-kids-orange uppercase">Vị trí của bé</p>
                      <p className="font-black text-gray-800">Công viên Lê Văn Tám</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-white p-8 rounded-[40px] shadow-xl border-4 border-kids-orange text-center">
                    <img src={activeCompanion.img} className="w-24 h-24 rounded-full border-4 border-kids-orange mx-auto mb-4 object-cover" alt="Comp" referrerPolicy="no-referrer" />
                    <h3 className="text-2xl font-black mb-1">{activeCompanion.name}</h3>
                    <p className="text-sm font-bold text-gray-500 mb-6">Đang vui chơi cùng bé</p>
                    <div className="grid grid-cols-2 gap-3">
                      <button onClick={() => showSimulation('Gọi cho anh/chị', `Đang kết nối cuộc gọi với ${activeCompanion.name}...`, 'info')} className="p-4 bg-blue-100 text-blue-600 rounded-2xl flex flex-col items-center gap-2 font-black text-xs">
                        <Phone className="w-6 h-6" /> GỌI
                      </button>
                      <button onClick={() => showSimulation('Nhắn tin', '', 'info', { chat: true })} className="p-4 bg-green-100 text-green-600 rounded-2xl flex flex-col items-center gap-2 font-black text-xs">
                        <MessageCircle className="w-6 h-6" /> CHAT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="footer-page"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="max-w-3xl mx-auto py-12"
            >
              <button onClick={() => setActiveView('home')} className="mb-8 flex items-center gap-2 text-kids-orange font-black hover:underline">
                <ArrowRight className="w-4 h-4 rotate-180" /> QUAY LẠI
              </button>
              <h2 className="text-5xl font-black mb-8 text-kids-orange uppercase">{footerPage?.title}</h2>
              <div className="bg-white p-10 rounded-[40px] border-8 border-kids-orange shadow-2xl space-y-6">
                <p className="text-2xl font-bold text-gray-800">{footerPage?.content}</p>
                <p className="text-gray-600">LinkHeart Kids luôn đồng hành cùng sự phát triển của bé yêu. Chúng tôi cam kết mang lại những trải nghiệm tuyệt vời nhất, giúp bé vừa học vừa chơi một cách hiệu quả.</p>
                <div className="grid grid-cols-2 gap-4 pt-8">
                  <img src="https://picsum.photos/seed/kids1/400/300" className="rounded-3xl border-4 border-kids-blue" alt="Kids 1" referrerPolicy="no-referrer" />
                  <img src="https://picsum.photos/seed/kids2/400/300" className="rounded-3xl border-4 border-kids-orange" alt="Kids 2" referrerPolicy="no-referrer" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <SimulationModal 
        isOpen={modal.open} 
        onClose={() => setModal({ ...modal, open: false })} 
        title={modal.title}
        type={modal.type}
      >
        {modal.data?.chat ? <ChatSimulation onBack={() => setModal({ ...modal, open: false })} /> : (
          modal.data?.handbook ? (
            <div className="space-y-6">
              {modal.data.handbook.map((h: any, i: number) => (
                <div key={i} className="p-6 bg-gray-50 rounded-3xl border-4 border-gray-200">
                  <h4 className="text-2xl font-black mb-2 uppercase tracking-tight">{h.title}</h4>
                  <p className="text-lg font-bold text-gray-600">{h.content}</p>
                </div>
              ))}
            </div>
          ) : modal.type === 'companion' ? <CompanionDetail companion={modal.data} onConfirm={() => {
             setActiveCompanion(modal.data);
             setActiveView('tracking');
             setModal({ ...modal, open: false });
             showToast('Đã kết nối với anh/chị companion!');
          }} /> : 
          modal.content || <p className="text-gray-600 font-medium italic">Tính năng này đang được phát triển.</p>
        )}
      </SimulationModal>

      <Toast message={toast.msg} isVisible={toast.show} onClose={() => setToast({ show: false, msg: '' })} />
      <Footer theme="kids" onToast={renderFooterPage} />
    </div>
  );
};

// --- Pro Mode ---
const ProMode = ({ onBack, walletBalance, setWalletBalance }: { onBack: () => void, walletBalance: number, setWalletBalance: React.Dispatch<React.SetStateAction<number>> }) => {
  const [activeView, setActiveView] = useState<ProView>('home');
  const [footerPage, setFooterPage] = useState<{ title: string; content: string } | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 'LH-992', service: 'Đồng hành y tế', companion: COMPANIONS[0], status: 'active', time: '08:00 - 10:00', location: 'BV Chợ Rẫy' }
  ]);
  const [activeAppointment, setActiveAppointment] = useState<Appointment | null>(null);
  
  const [modal, setModal] = useState<{ open: boolean; title: string; content: React.ReactNode; type: any; data?: any }>({
    open: false,
    title: '',
    content: '',
    type: 'info'
  });
  const [toast, setToast] = useState({ show: false, msg: '' });

  const showSimulation = (title: string, content: React.ReactNode = '', type: any = 'success', data?: any) => {
    setModal({ open: true, title, content, type, data });
  };

  const showRandomCompanion = async (service: string) => {
    showSimulation(`Đặt lịch ${service}`, '', 'loading');
    try {
      const companionsRef = collection(db, "companions");
      const snapshot = await getDocs(companionsRef);
      const companionsData = snapshot.docs.map(doc => doc.data() as Companion);
      
      if (companionsData.length === 0) {
        showSimulation('Opps!', 'Hiện chưa có Companion nào đăng ký dịch vụ này.', 'info');
        return;
      }

      const randomComp = companionsData[Math.floor(Math.random() * companionsData.length)];
      showSimulation('Đã tìm thấy Companion!', '', 'companion', { ...randomComp, service });
    } catch (error) {
      console.error("Fetch Companions Error:", error);
      showSimulation('Lỗi', 'Không thể kết nối với cơ sở dữ liệu để tìm Companion.', 'danger');
    }
  };

  const showToast = (msg: string) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: '' }), 3000);
  };

  const handlePayment = (amount: number, method: 'visa' | 'bank') => {
    showSimulation('Đang xử lý thanh toán', '', 'loading');
    setTimeout(() => {
      setWalletBalance(walletBalance + amount);
      showSimulation('Thanh toán thành công', `Bạn đã nạp thành công ${amount.toLocaleString()}đ vào ví qua ${method === 'visa' ? 'thẻ Visa **** 8888' : 'chuyển khoản ngân hàng'}.`, 'success');
      showToast('Số dư ví đã được cập nhật!');
      
      // Add to transaction history (simulated by updating local state if we had one, but for now just toast)
      console.log(`Transaction: +${amount} via ${method}`);
    }, 2000);
  };

  const startTracking = (appointment: Appointment) => {
    setActiveAppointment(appointment);
    setActiveView('tracking');
    showToast('Đang mở chế độ theo dõi thời gian thực...');
  };

  const renderFooterPage = (title: string) => {
    const contentMap: Record<string, string> = {
      'Sứ mệnh': 'LinkHeart ra đời với sứ mệnh xóa nhòa khoảng cách thế hệ, mang lại sự an tâm cho gia đình và tạo thu nhập ý nghĩa cho sinh viên. Chúng tôi khao khát xây dựng một cộng đồng nơi sự tử tế được lan tỏa và mỗi cá nhân đều cảm thấy được đồng hành.',
      'Đội ngũ': 'Chúng tôi là tập hợp những chuyên gia công nghệ, y tế và giáo dục hàng đầu Việt Nam. Với hơn 10 năm kinh nghiệm trong lĩnh vực chăm sóc sức khỏe và phát triển cộng đồng, đội ngũ LinkHeart cam kết mang lại dịch vụ tốt nhất.',
      'Tuyển dụng': 'LinkHeart luôn chào đón các bạn sinh viên năng động và có tâm hồn nhân hậu gia nhập đội ngũ Companion. Chúng tôi cung cấp môi trường làm việc linh hoạt, thu nhập hấp dẫn và cơ hội phát triển kỹ năng mềm tuyệt vời.',
      'Cho trẻ em': 'Dịch vụ dành riêng cho các bé dưới 18 tuổi. Các anh chị Companion sẽ hỗ trợ học tập, vui chơi và rèn luyện kỹ năng sống trong môi trường an toàn tuyệt đối.',
      'Cho người lớn': 'Dịch vụ dành cho người trưởng thành bận rộn. Tìm bạn đồng hành tập gym, đi du lịch, hoặc đơn giản là người hỗ trợ các công việc hàng ngày.',
      'Cho người già': 'Chế độ chăm sóc đặc biệt cho người cao tuổi. Companion được đào tạo kỹ năng y tế cơ bản, tâm lý học và luôn sẵn sàng lắng nghe, chia sẻ.',
      'Trung tâm trợ giúp': 'Bạn cần hỗ trợ? Liên hệ hotline 1900 1234 hoặc chat trực tiếp với chúng tôi 24/7. Chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn về dịch vụ và kỹ thuật.',
      'Điều khoản': 'Sử dụng dịch vụ LinkHeart đồng nghĩa với việc bạn đồng ý với các quy định về an toàn, bảo mật và trách nhiệm của chúng tôi. Vui lòng đọc kỹ trước khi sử dụng.',
      'Bảo mật': 'Dữ liệu của bạn và người thân được mã hóa đầu cuối và bảo vệ bởi các tiêu chuẩn an ninh mạng cao nhất. Chúng tôi cam kết không chia sẻ thông tin cá nhân cho bên thứ ba.'
    };
    setFooterPage({ title, content: contentMap[title] || 'Nội dung đang được cập nhật...' });
    setActiveView('footer-page');
    window.scrollTo(0, 0);
  };

  return (
    <div className="theme-pro min-h-screen bg-pro-white flex flex-col">
      <Toast message={toast.msg} isVisible={toast.show} onClose={() => setToast({ ...toast, show: false })} />
      
      <SimulationModal 
        isOpen={modal.open} 
        onClose={() => setModal({ ...modal, open: false })}
        title={modal.title}
        type={modal.type}
      >
        <div className="space-y-6">
          {modal.type === 'loading' ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 border-4 border-pro-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600 font-medium">{modal.title === 'Đang xử lý thanh toán' ? 'Đang kết nối cổng thanh toán...' : 'Đang xử lý yêu cầu của bạn...'}</p>
            </div>
          ) : modal.type === 'companion' ? (
            <div className="text-left">
              <CompanionDetail companion={modal.data} />
              <div className="mt-6 p-4 bg-gray-50 rounded-2xl border border-gray-100 mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Dịch vụ:</span>
                  <span className="font-bold">{modal.data.service}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Phí dịch vụ:</span>
                  <span className="font-bold text-pro-green">150.000đ/giờ</span>
                </div>
              </div>
              <button 
                onClick={() => {
                  if (walletBalance < 150000) {
                    showToast('Số dư ví không đủ! Vui lòng nạp thêm.');
                    setActiveView('wallet');
                    setModal({ ...modal, open: false });
                    return;
                  }
                  const newAppt: Appointment = {
                    id: `LH-${Math.floor(Math.random() * 1000)}`,
                    service: modal.data.service,
                    companion: modal.data,
                    status: 'pending',
                    time: 'Hôm nay, 14:00',
                    location: 'Địa điểm của bạn'
                  };
                  setAppointments([newAppt, ...appointments]);
                  setWalletBalance(walletBalance - 150000);
                  setModal({ ...modal, open: false });
                  showToast('Đặt lịch thành công!');
                  startTracking(newAppt);
                }}
                className="w-full bg-pro-green text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-pro-green/20"
              >
                THANH TOÁN & XÁC NHẬN
              </button>
            </div>
          ) : modal.title === 'Nạp tiền vào ví' ? (
            <div className="space-y-6">
              <p className="text-sm text-gray-500">Chọn phương thức nạp tiền để tiếp tục sử dụng dịch vụ.</p>
              <div className="grid grid-cols-1 gap-4">
                <button 
                  onClick={() => handlePayment(500000, 'visa')}
                  className="p-6 border-2 border-pro-green/20 bg-pro-green/5 rounded-3xl hover:border-pro-green transition-all text-left flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                    <CreditCard className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-lg">Thẻ Visa **** 8888</p>
                    <p className="text-xs text-gray-500">Thanh toán nhanh (Mặc định)</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-pro-green opacity-0 group-hover:opacity-100 transition-all" />
                </button>
                <button 
                  onClick={() => handlePayment(1000000, 'bank')}
                  className="p-6 border-2 border-gray-100 rounded-3xl hover:border-pro-green transition-all text-left flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                    <Building2 className="w-8 h-8 text-pro-green" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-lg">Chuyển khoản ngân hàng</p>
                    <p className="text-xs text-gray-500">Vietcombank, Techcombank...</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-pro-green opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-3">
                <Shield className="w-5 h-5 text-pro-green" />
                <p className="text-[10px] text-gray-500 leading-tight">Giao dịch của bạn được bảo vệ bởi hệ thống bảo mật đa lớp LinkHeart Secure Pay. Chúng tôi không lưu trữ mã CVV của bạn.</p>
              </div>
            </div>
          ) : modal.data?.chat ? (
            <div className="space-y-4">
              <div className="h-64 bg-gray-50 rounded-2xl p-4 overflow-y-auto space-y-3">
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[80%]">
                    <p className="text-sm">Chào bác, cháu đang đưa bác đi dạo ạ. Bác rất vui vẻ!</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-pro-green text-white p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[80%]">
                    <p className="text-sm">Cảm ơn cháu nhé, hãy để ý bác cẩn thận.</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[80%]">
                    <p className="text-sm">Vâng ạ, bác yên tâm!</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <input type="text" placeholder="Nhập tin nhắn..." className="flex-1 bg-gray-100 border-none rounded-xl px-4 text-sm focus:ring-2 focus:ring-pro-green" />
                <button className="p-3 bg-pro-green text-white rounded-xl">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <p className="text-gray-600">{modal.content}</p>
              <button 
                onClick={() => setModal({ ...modal, open: false })}
                className="w-full bg-pro-green text-white py-4 rounded-2xl font-bold"
              >
                Đóng
              </button>
            </div>
          )}
        </div>
      </SimulationModal>

      <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center sticky top-0 bg-pro-white/80 backdrop-blur-md z-50 w-full">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveView('home')}>
          <div className="w-8 h-8 bg-pro-green rounded-lg flex items-center justify-center">
            <Heart className="text-white w-5 h-5" fill="currentColor" />
          </div>
          <span className="text-xl font-bold text-pro-green">LinkHeart Pro</span>
        </div>
        <div className="flex items-center gap-8">
          {[
            { id: 'dashboard', label: 'Bảng điều khiển', icon: <LayoutDashboard className="w-4 h-4" /> },
            { id: 'appointments', label: 'Lịch hẹn', icon: <Calendar className="w-4 h-4" /> },
            { id: 'wallet', label: 'Ví tiền', icon: <Wallet className="w-4 h-4" /> }
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveView(item.id as ProView)}
              className={`text-sm font-bold flex items-center gap-2 transition-colors ${activeView === item.id ? 'text-pro-green' : 'text-gray-400 hover:text-pro-green'}`}
            >
              {item.icon}
              <span className="hidden md:inline">{item.label}</span>
            </button>
          ))}
          <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-400 hover:text-pro-green transition-all rounded-xl font-bold text-sm">
            <ArrowLeft className="w-5 h-5" />
            <span>QUAY LẠI</span>
          </button>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        <AnimatePresence mode="wait">
          {activeView === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-12 flex justify-between items-end">
                <div>
                  <h1 className="text-4xl font-black text-gray-900 mb-2 leading-tight uppercase">Bảng điều khiển <br /> Master Dashboard</h1>
                  <p className="text-gray-500 font-medium italic">"Mọi thành viên trong tầm mắt, mọi hành trình trọn niềm tin"</p>
                </div>
                <div className="flex gap-4">
                  <div className="text-right">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Ví Gia Đình</p>
                    <p className="text-3xl font-black text-pro-green">{walletBalance.toLocaleString()}đ</p>
                  </div>
                  <button 
                    onClick={() => showSimulation('Nạp tiền vào ví', <PaymentSimulation onComplete={(m) => {
                      setWalletBalance(prev => prev + 500000);
                      showSimulation('Nạp tiền thành công', `Bạn đã nạp thành công 500.000đ qua ${m === 'visa' ? 'thẻ Visa' : 'Chuyển khoản'}. Số dư mới: ${(walletBalance + 500000).toLocaleString()}đ`, 'success');
                    }} />, 'info')}
                    className="w-12 h-12 bg-white border-4 border-pro-green text-pro-green rounded-full flex items-center justify-center shadow-[4px_4px_0_0_rgba(45,106,79,1)] active:translate-y-1 active:shadow-none transition-all font-black text-2xl"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8 mb-12">
                <div className="lg:col-span-2 space-y-8">
                  {/* Hobby Matching / Social Section (Page 4) */}
                  <div className="bg-white p-8 rounded-[48px] shadow-sm border-2 border-gray-100">
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="text-xl font-black flex items-center gap-3 uppercase tracking-tight">
                        <Users className="w-6 h-6 text-pro-green" />
                        Kết nối sở thích (Hobby Matching)
                      </h3>
                      <span className="text-xs font-black text-pro-green bg-pro-green/10 px-3 py-1 rounded-full uppercase">Mới</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        { title: 'Cùng tập Gym', time: '6:00 AM', icon: <Dumbbell className="w-5 h-5 text-gray-600" />, desc: 'Tìm người cùng lịch tập luyện' },
                        { title: 'Triển lãm nghệ thuật', time: 'Cuối tuần', icon: <Plane className="w-5 h-5 text-gray-600" />, desc: 'Thảo luận về startup/kinh doanh' }
                      ].map((item, i) => (
                        <div key={i} className="p-6 rounded-3xl border-2 border-gray-50 bg-gray-50/50 hover:bg-white hover:border-pro-green hover:shadow-xl transition-all cursor-pointer group">
                          <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center group-hover:bg-pro-green group-hover:text-white transition-colors">{item.icon}</div>
                            <span className="text-[10px] font-black uppercase text-gray-400">{item.time}</span>
                          </div>
                          <h4 className="font-black text-gray-800 text-lg">{item.title}</h4>
                          <p className="text-sm text-gray-500 mt-2">{item.desc}</p>
                          <button onClick={() => showSimulation(item.title, `Hệ thống đang bóc tách từ khóa và lọc Companion có cùng sở thích ${item.title}...`, 'loading')} className="mt-4 text-xs font-black text-pro-green uppercase flex items-center gap-2">
                             Tìm người đi cùng <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Master Dashboard (Family Monitoring) */}
                  <div className="bg-gray-900 p-8 rounded-[48px] text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-20">
                      <LayoutDashboard className="w-24 h-24" />
                    </div>
                    <h3 className="text-xl font-black mb-8 uppercase tracking-widest flex items-center gap-3">
                      <Navigation className="w-6 h-6 text-pro-green animate-pulse" />
                      Giám sát gia đình (Real-time GPS)
                    </h3>
                    <div className="space-y-6">
                       <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-between">
                         <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-full border-2 border-primary overflow-hidden">
                              <img src="https://picsum.photos/seed/mom/100/100" className="object-cover" alt="Mom" referrerPolicy="no-referrer" />
                           </div>
                           <div>
                              <p className="font-black text-lg">Mẹ Lan (Senior Mode)</p>
                              <p className="text-xs text-pro-white/60 uppercase font-bold tracking-tighter italic">"Đang đi dạo • CV Cầu Giấy"</p>
                           </div>
                         </div>
                         <button onClick={() => setActiveView('tracking')} className="bg-white text-gray-900 px-6 py-2 rounded-full font-black text-xs hover:bg-pro-green hover:text-white transition-colors">
                           XEM LIVE
                         </button>
                       </div>
                       <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-between">
                         <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-full border-2 border-kids-orange overflow-hidden">
                              <img src="https://picsum.photos/seed/kid/100/100" className="object-cover" alt="Kid" referrerPolicy="no-referrer" />
                           </div>
                           <div>
                              <p className="font-black text-lg">Bé Bo (Kids Mode)</p>
                              <p className="text-xs text-pro-white/60 uppercase font-bold tracking-tighter italic">"Đang học toán • Tại nhà"</p>
                           </div>
                         </div>
                         <button onClick={() => showToast('Mở Camera nhà riêng...')} className="bg-white text-gray-900 px-6 py-2 rounded-full font-black text-xs hover:bg-pro-green hover:text-white transition-colors">
                           XEM CAMERA
                         </button>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Analysis Report (Page 4) */}
                  <div className="bg-white p-8 rounded-[48px] shadow-sm border-2 border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-pro-green/5 rounded-full -mr-16 -mt-16" />
                    <h3 className="text-xl font-black mb-6 uppercase tracking-tight flex items-center gap-3">
                       <Activity className="w-6 h-6 text-pro-green" />
                       Báo cáo phân tích
                    </h3>
                    <div className="space-y-4">
                       <p className="text-sm font-bold text-gray-600 leading-relaxed italic">
                         "Tháng này Mẹ đã đi dạo 20 giờ (tăng 5 giờ so với tháng trước), tâm trạng cải thiện rõ rệt."
                       </p>
                       <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '80%' }}
                            className="bg-pro-green h-full"
                          />
                       </div>
                       <p className="text-[10px] font-black text-pro-green uppercase">Chỉ số hạnh phúc: 8.5/10</p>
                       <button onClick={() => showSimulation('Báo cáo nhịp tim', 'Đang tải báo cáo sức khỏe chi tiết của Bố trong tuần qua...', 'loading')} className="w-full mt-4 bg-gray-900 text-white py-4 rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl">
                          Chi tiết sức khỏe
                       </button>
                    </div>
                  </div>

                  {/* Hieu Thao Packages (Page 7) */}
                  <div className="bg-primary/5 p-8 rounded-[48px] border-4 border-dashed border-primary/20">
                    <h3 className="text-xl font-black mb-6 uppercase tracking-tight text-primary flex items-center gap-3">
                       <Heart className="w-6 h-6" /> Gói Hiếu Thảo
                    </h3>
                    <div className="space-y-4">
                       {HIEU_THAO_PACKAGES.map((pkg) => (
                         <div key={pkg.id} className="p-4 bg-white rounded-3xl border border-primary/10 shadow-sm hover:border-primary transition-all cursor-pointer group" onClick={() => showSimulation(pkg.title, `Hệ thống tự động gia hạn ${pkg.title} hàng tuần cho cha mẹ bạn.`, 'success')}>
                            <div className="flex justify-between items-center mb-1">
                               <p className="font-black text-sm uppercase">{pkg.title}</p>
                               <p className="font-black text-primary text-xs tracking-widest">{pkg.price.toLocaleString()}đ</p>
                            </div>
                            <p className="text-[10px] text-gray-500 font-bold italic line-clamp-1">{pkg.desc}</p>
                         </div>
                       ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking & Filter Specs (Page 4) */}
              <div className="mb-20">
                 <h2 className="text-4xl font-black text-gray-900 mb-8 uppercase tracking-widest text-center">Đồng hành mới</h2>
                 <div className="grid md:grid-cols-4 gap-6">
                    {[
                      { title: 'LinkHeart Kids', price: '149.000đ/giờ', theme: 'text-kids-orange bg-kids-orange/5', desc: 'Dạy vẽ, Tiếng Anh...' },
                      { title: 'LinkHeart Social', price: '119.000đ/giờ', theme: 'text-pro-green bg-pro-green/5', desc: 'Gym, Cafe, Xem phim...' },
                      { title: 'LinkHeart Senior', price: '179.000đ/giờ', theme: 'text-primary bg-primary/5', desc: 'Sơ cứu, Gọi điện bác sĩ...' },
                      { title: 'Phỏng vấn Video', price: 'Miễn phí', theme: 'text-blue-500 bg-blue-50', desc: 'Phỏng vấn trực tiếp Companion' }
                    ].map((svc, i) => (
                      <motion.div 
                        key={i}
                        whileHover={{ y: -10 }}
                        className={`p-8 rounded-[40px] border-4 border-transparent hover:border-current transition-all cursor-pointer ${svc.theme}`}
                        onClick={() => showRandomCompanion(svc.title)}
                      >
                         <h4 className="font-black text-xl mb-2">{svc.title}</h4>
                         <p className="text-xl font-black mb-4">{svc.price}</p>
                         <p className="text-xs font-bold opacity-70 italic">{svc.desc}</p>
                         <ArrowRight className="w-6 h-6 mt-6 ml-auto" />
                      </motion.div>
                    ))}
                 </div>
              </div>
            </motion.div>
          )}

          {activeView === 'dashboard' && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold">Bảng điều khiển</h2>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { label: 'Tổng chuyến', value: '42', icon: <History className="text-blue-500" />, onClick: () => showToast('Đang tải lịch sử chuyến đi...') },
                  { label: 'Đánh giá', value: '4.9/5', icon: <Star className="text-yellow-500" />, onClick: () => showToast('Xem các đánh giá từ Companion') },
                  { label: 'Số dư ví', value: `${walletBalance.toLocaleString()}đ`, icon: <Wallet className="text-pro-green" />, onClick: () => setActiveView('wallet') },
                  { label: 'Hội viên', value: 'Gia đình', icon: <Award className="text-purple-500" />, onClick: () => showSimulation('Hạng hội viên', 'Bạn đang ở hạng Gia đình. Tích lũy thêm 500 điểm để lên hạng Kim Cương!') }
                ].map((stat, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ y: -5 }}
                    onClick={stat.onClick}
                    className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all"
                  >
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mb-4">{stat.icon}</div>
                    <p className="text-xs text-gray-400 font-bold uppercase">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </motion.div>
                ))}
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold mb-6">Thống kê hoạt động tháng này</h3>
                <div className="h-64 flex items-end gap-4 px-4">
                  {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        className="w-full bg-pro-green/20 rounded-t-lg relative group"
                      >
                        <div className="absolute inset-0 bg-pro-green opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg" />
                      </motion.div>
                      <span className="text-[10px] text-gray-400 font-bold">T{i+1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeView === 'appointments' && (
            <motion.div 
              key="appointments"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Lịch hẹn của bạn</h2>
                <button onClick={() => showRandomCompanion('Dịch vụ mới')} className="bg-pro-green text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-pro-green/20">Đặt lịch mới</button>
              </div>
              <div className="space-y-4">
                {appointments.map(appt => (
                  <div key={appt.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <img src={appt.companion.img} className="w-16 h-16 rounded-full object-cover" alt={appt.companion.name} referrerPolicy="no-referrer" />
                      <div>
                        <h4 className="font-bold text-lg">{appt.service}</h4>
                        <p className="text-sm text-gray-500">Companion: {appt.companion.name} • {appt.id}</p>
                      </div>
                    </div>
                    <div className="flex flex-col md:items-end w-full md:w-auto">
                      <p className="text-sm font-bold text-gray-900">{appt.time}</p>
                      <p className="text-xs text-gray-400">{appt.location}</p>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                      <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase ${
                        appt.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {appt.status === 'active' ? 'Đang diễn ra' : 'Sắp tới'}
                      </span>
                      {appt.status === 'active' && (
                        <button 
                          onClick={() => startTracking(appt)}
                          className="p-2 bg-pro-green/10 text-pro-green rounded-lg hover:bg-pro-green hover:text-white transition-colors"
                        >
                          <Navigation className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeView === 'wallet' && (
            <motion.div 
              key="wallet"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold">Ví tiền & Thanh toán</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1 space-y-6">
                  <div className="bg-gray-900 text-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
                    <p className="text-xs opacity-50 font-bold uppercase mb-2">Số dư khả dụng</p>
                    <h3 className="text-4xl font-black mb-8">{walletBalance.toLocaleString()}đ</h3>
                    <div className="flex justify-between items-end">
                      <div className="text-[10px] opacity-50">
                        <p>ID VÍ: LH-WALLET-889</p>
                        <p>LINKHEART SECURE</p>
                      </div>
                      <Wallet className="w-10 h-10 opacity-20" />
                    </div>
                  </div>
                  <button 
                    onClick={() => showSimulation('Nạp tiền vào ví', <PaymentSimulation onComplete={(m) => {
                      setWalletBalance(prev => prev + 500000);
                      showSimulation('Nạp tiền thành công', `Bạn đã nạp thành công 500.000đ qua ${m === 'visa' ? 'thẻ Visa' : 'Chuyển khoản'}. Số dư mới: ${(walletBalance + 500000).toLocaleString()}đ`, 'success');
                    }} />, 'info')}
                    className="w-full bg-pro-green text-white py-5 rounded-3xl font-bold text-lg shadow-lg shadow-pro-green/20 flex items-center justify-center gap-3 active:scale-95 transition-all"
                  >
                    <CreditCard className="w-6 h-6" /> NẠP TIỀN NGAY
                  </button>
                </div>
                <div className="md:col-span-2 bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold mb-6">Lịch sử giao dịch</h3>
                  <div className="space-y-6">
                    {[
                      { type: 'Dịch vụ', title: 'Đồng hành y tế #LH-992', amount: '-150.000đ', date: 'Hôm nay, 08:30', icon: <Activity className="text-red-500" /> },
                      { type: 'Nạp tiền', title: 'Nạp tiền qua Visa ****8888', amount: '+500.000đ', date: 'Hôm qua, 15:45', icon: <CreditCard className="text-green-500" /> },
                      { type: 'Dịch vụ', title: 'Gia sư cho bé #LH-881', amount: '-200.000đ', date: '01/04/2026', icon: <Baby className="text-red-500" /> }
                    ].map((tx, i) => (
                      <div key={i} className="flex justify-between items-center group cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-gray-100 transition-colors">{tx.icon}</div>
                          <div>
                            <p className="font-bold text-gray-900">{tx.title}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">{tx.date}</p>
                          </div>
                        </div>
                        <p className={`font-black ${tx.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{tx.amount}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeView === 'tracking' && activeAppointment && (
            <motion.div 
              key="tracking"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 mb-8">
                <button onClick={() => setActiveView('home')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <ArrowRight className="w-6 h-6 rotate-180" />
                </button>
                <h2 className="text-3xl font-bold">Theo dõi hành trình</h2>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white p-4 rounded-[40px] shadow-2xl border-4 border-pro-green/20 relative overflow-hidden h-[500px]">
                    <MapSimulation />
                    <div className="absolute top-8 left-8 right-8 flex justify-between items-start pointer-events-none">
                      <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-100 pointer-events-auto">
                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Điểm đến</p>
                        <p className="font-bold text-gray-900">{activeAppointment.location}</p>
                      </div>
                      <div className="bg-pro-green text-white p-4 rounded-2xl shadow-xl pointer-events-auto">
                        <p className="text-[10px] opacity-70 font-bold uppercase mb-1">Thời gian còn lại</p>
                        <p className="text-xl font-black">12 PHÚT</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 text-center">
                    <div className="relative inline-block mb-6">
                      <img src={activeAppointment.companion.img} className="w-24 h-24 rounded-full border-4 border-pro-green object-cover" alt="Comp" referrerPolicy="no-referrer" />
                      <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{activeAppointment.companion.name}</h3>
                    <p className="text-sm text-gray-500 mb-8">Đang đồng hành cùng người thân của bạn</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => showSimulation('Đang gọi...', `Đang kết nối cuộc gọi thoại với ${activeAppointment.companion.name}...`, 'info')}
                        className="flex flex-col items-center gap-3 p-6 bg-blue-50 text-blue-600 rounded-3xl hover:bg-blue-100 transition-all group"
                      >
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                          <Phone className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold uppercase">Gọi điện</span>
                      </button>
                      <button 
                        onClick={() => showSimulation('Nhắn tin', '', 'info', { chat: true })}
                        className="flex flex-col items-center gap-3 p-6 bg-pro-green/5 text-pro-green rounded-3xl hover:bg-pro-green/10 transition-all group"
                      >
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                          <MessageCircle className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold uppercase">Nhắn tin</span>
                      </button>
                    </div>

                    <button 
                      onClick={() => showSimulation('Video Call', 'Đang khởi tạo cuộc gọi video an toàn...', 'info')}
                      className="w-full mt-4 flex items-center justify-center gap-3 p-6 bg-gray-900 text-white rounded-3xl hover:bg-gray-800 transition-all group"
                    >
                      <Video className="w-6 h-6" />
                      <span className="font-bold uppercase">Video Call Trực Tiếp</span>
                    </button>
                  </div>

                  <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
                    <h4 className="font-bold mb-4">Cập nhật mới nhất</h4>
                    <div className="space-y-4">
                      {[
                        { text: 'Đã đến cổng bệnh viện', time: '08:42' },
                        { text: 'Đang làm thủ tục đăng ký', time: '08:45' }
                      ].map((log, i) => (
                        <div key={i} className="flex gap-3 items-start">
                          <div className="w-1.5 h-1.5 bg-pro-green rounded-full mt-1.5" />
                          <p className="text-xs text-gray-600"><span className="font-bold text-gray-900">[{log.time}]</span> {log.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeView === 'footer-page' && footerPage && (
            <motion.div 
              key="footer-page"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto py-12"
            >
              <button onClick={() => setActiveView('home')} className="mb-8 flex items-center gap-2 text-pro-green font-bold hover:underline">
                <ArrowRight className="w-4 h-4 rotate-180" /> Quay lại
              </button>
              <h2 className="text-5xl font-black mb-8 text-gray-900">{footerPage.title}</h2>
              <div className="prose prose-lg text-gray-600 leading-relaxed space-y-6">
                <p className="text-xl font-medium text-gray-800">{footerPage.content}</p>
                <p>Tại LinkHeart, chúng tôi tin rằng công nghệ chỉ thực sự có giá trị khi nó phục vụ trái tim con người. Mỗi dòng code, mỗi tính năng đều được xây dựng với sự tỉ mỉ và tâm huyết cao nhất để đảm bảo an toàn cho người dùng.</p>
                <div className="grid grid-cols-2 gap-8 mt-12">
                  <img src="https://picsum.photos/seed/about1/400/300" className="rounded-3xl shadow-xl" alt="About 1" referrerPolicy="no-referrer" />
                  <img src="https://picsum.photos/seed/about2/400/300" className="rounded-3xl shadow-xl" alt="About 2" referrerPolicy="no-referrer" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <SimulationModal 
        isOpen={modal.open} 
        onClose={() => setModal({ ...modal, open: false })} 
        title={modal.title}
        type={modal.type}
      >
        {modal.data?.chat ? <ChatSimulation onBack={() => setModal({ ...modal, open: false })} /> : (
          modal.type === 'companion' ? <CompanionDetail companion={modal.data} onConfirm={() => {
            const newAppt: Appointment = {
              id: `LH-${Math.floor(Math.random() * 900) + 100}`,
              service: modal.data.service || 'Đồng hành',
              companion: modal.data,
              status: 'pending',
              time: 'Hôm nay, 14:00 - 16:00',
              location: 'Tại nhà'
            };
            setAppointments([...appointments, newAppt]);
            setModal({ ...modal, open: false });
            showSimulation('Đặt lịch thành công', 'Companion sẽ liên hệ với bạn trong giây lát.', 'success');
            setTimeout(() => startTracking(newAppt), 3000);
          }} /> : 
          modal.content || <p className="text-gray-600 font-medium">Đang xử lý yêu cầu của bạn...</p>
        )}
      </SimulationModal>

      <Toast message={toast.msg} isVisible={toast.show} onClose={() => setToast({ show: false, msg: '' })} />
      <Footer theme="pro" onToast={renderFooterPage} />
    </div>
  );
};

// --- Elderly Mode ---
const ElderlyMode = ({ onBack }: { onBack: () => void }) => {
  const [activeView, setActiveView] = useState<'home' | 'footer-page' | 'tracking'>('home');
  const [footerPage, setFooterPage] = useState<{ title: string; content: string } | null>(null);
  const [activeCompanion, setActiveCompanion] = useState<Companion | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: '' });
  const [modal, setModal] = useState<{ open: boolean; title: string; content: string; type: any; data?: any }>({
    open: false,
    title: '',
    content: '',
    type: 'info'
  });

  const triggerAction = (title: string, content: string, type: any = 'success', data?: any) => {
    if ('vibrate' in navigator) navigator.vibrate(50);
    setModal({ open: true, title, content, type, data });
  };

  const showToast = (msg: string) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: '' }), 3000);
  };

  const handleVoiceAssistant = () => {
    setIsListening(true);
    setTimeout(async () => {
      setIsListening(false);
      triggerAction('Trợ lý Linky', 'Linky đã hiểu: Bác muốn tìm người đi dạo vào 4h chiều nay. Đang kết nối với Companion phù hợp nhất...', 'loading');
      try {
        const companionsRef = collection(db, "companions");
        const snapshot = await getDocs(companionsRef);
        const companionsData = snapshot.docs.map(doc => doc.data() as Companion);
        
        if (companionsData.length > 0) {
          const seniorComp = companionsData[Math.floor(Math.random() * companionsData.length)]; 
          triggerAction('Đã đặt thành công!', `Cháu ${seniorComp.name} sẽ đến đón bác vào 4h chiều nay nhé. Bác nhớ mang theo áo khoác ạ!`, 'companion', seniorComp);
        } else {
          showToast('Hiện chưa tìm thấy Companion nào cho bác.');
        }
      } catch (err) {
        showToast('Lỗi kết nối máy chủ.');
      }
    }, 2500);
  };

  const renderFooterPage = (title: string) => {
    const contentMap: Record<string, string> = {
      'Sứ mệnh': 'LinkHeart mang đến sự an tâm cho người cao tuổi và sự thảnh thơi cho con cháu.',
      'Đội ngũ': 'Các tình nguyện viên và nhân viên y tế tận tâm, giàu kinh nghiệm chăm sóc người già.',
      'Tuyển dụng': 'Chúng tôi luôn chào đón những trái tim ấm áp gia nhập đội ngũ chăm sóc.',
      'Cho trẻ em': 'Dịch vụ vui chơi và học tập an toàn cho các cháu.',
      'Cho người lớn': 'Hỗ trợ cuộc sống hàng ngày cho người trưởng thành.',
      'Cho người già': 'Người bạn đồng hành tin cậy cho tuổi già an nhàn.',
      'Trung tâm trợ giúp': 'Bác hãy gọi 1900 1234 nếu cần bất kỳ sự trợ giúp nào.',
      'Điều khoản': 'Cam kết dịch vụ chất lượng cao nhất cho bác.',
      'Bảo mật': 'Thông tin của bác luôn được bảo vệ tuyệt đối.'
    };
    setFooterPage({ title, content: contentMap[title] || 'Nội dung đang được cập nhật...' });
    setActiveView('footer-page');
    window.scrollTo(0, 0);
  };

  const triggerSOS = () => {
    triggerAction('KHẨN CẤP SOS', 'Hệ thống đang kết nối trực tiếp với bác sĩ gia đình và gửi vị trí của bác cho con cái ngay lập tức!', 'danger');
  };

  return (
    <div className={`theme-elderly min-h-screen flex flex-col ${highContrast ? 'high-contrast' : ''}`}>
      <Toast message={toast.msg} isVisible={toast.show} onClose={() => setToast({ ...toast, show: false })} />
      <SimulationModal 
        isOpen={modal.open} 
        onClose={() => setModal({ ...modal, open: false })}
        title={modal.title}
        type={modal.type}
      >
        <div className="text-center space-y-6">
          {modal.type === 'loading' ? (
            <div className="py-12">
              <div className="w-24 h-24 border-8 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
              <p className="text-3xl font-black">{modal.title}</p>
            </div>
          ) : modal.type === 'companion' ? (
            <div className="text-left">
              <div className="flex items-center gap-6 mb-8">
                 <img src={modal.data.img} className="w-32 h-32 rounded-[32px] border-4 border-gray-900 shadow-lg object-cover" alt="Comp" referrerPolicy="no-referrer" />
                 <div>
                    <h4 className="text-4xl font-black">{modal.data.name}</h4>
                    <p className="text-2xl font-bold opacity-70 italic text-gray-600">Companion của bác</p>
                 </div>
              </div>
              <button 
                onClick={() => {
                  setActiveCompanion(modal.data);
                  setModal({ ...modal, open: false });
                  setActiveView('tracking');
                  showToast(`Đã bắt đầu hành trình cùng cháu ${modal.data.name}!`);
                }}
                className="w-full bg-gray-900 text-white py-8 rounded-[40px] font-black text-3xl shadow-xl active:scale-95 transition-transform"
              >
                CHỌN CHÁU NÀY
              </button>
            </div>
          ) : modal.data?.handbook ? (
            <div className="text-left space-y-4">
              {modal.data.handbook.map((item: any, i: number) => (
                <div key={i} className="p-6 bg-yellow-100 rounded-[32px] border-4 border-gray-900">
                  <h4 className="font-black text-2xl mb-2 uppercase">{item.title}</h4>
                  <p className="text-xl font-bold text-gray-800">{item.content}</p>
                </div>
              ))}
              <button 
                onClick={() => setModal({ ...modal, open: false })}
                className="w-full bg-gray-900 text-white py-6 rounded-[32px] font-black text-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                ĐÃ HIỂU!
              </button>
            </div>
          ) : (
            <>
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto ${modal.type === 'danger' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                {modal.type === 'danger' ? <Activity className="w-16 h-16" /> : <CheckCircle2 className="w-16 h-16" />}
              </div>
              <p className="text-3xl font-black leading-tight">{modal.content || modal.title}</p>
              <button 
                onClick={() => setModal({ ...modal, open: false })}
                className="w-full bg-gray-900 text-white py-8 rounded-[40px] font-black text-3xl shadow-xl"
              >
                XÁC NHẬN
              </button>
            </>
          )}
        </div>
      </SimulationModal>

      <nav className="p-10 flex justify-between items-center border-b-8 border-gray-900 bg-white sticky top-0 z-50">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveView('home')}>
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center border-4 border-gray-900">
            <Heart className="text-white w-8 h-8" fill="currentColor" />
          </div>
          <span className="text-4xl font-black uppercase tracking-tighter text-gray-900">LinkHeart Senior</span>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setHighContrast(!highContrast)} 
            className={`p-4 rounded-2xl border-4 border-gray-900 font-black text-xs uppercase transition-all ${highContrast ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'}`}
          >
            {highContrast ? 'Tắt Tương Phản' : 'Màu Tương Phản'}
          </button>
          <button onClick={onBack} className="px-8 py-6 bg-red-500 text-white rounded-3xl border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all flex items-center gap-4">
            <ArrowLeft className="w-10 h-10" />
            <span className="text-3xl font-black">QUAY LẠI</span>
          </button>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto px-10 py-16 w-full space-y-16">
        <AnimatePresence mode="wait">
          {activeView === 'home' ? (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
              
              <div className="text-center mb-10">
                <p className="text-4xl font-black mb-10 text-gray-600 italic">"Bác cần cháu giúp gì hôm nay không ạ?"</p>
                <motion.button 
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={handleVoiceAssistant}
                   className={`w-56 h-56 rounded-full mx-auto flex items-center justify-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] relative group border-8 border-gray-900 ${isListening ? 'bg-red-600' : 'bg-primary'}`}
                >
                   {isListening && (
                     <div className="absolute inset-0 rounded-full border-[10px] border-red-400 animate-ping" />
                   )}
                   <Mic className={`w-24 h-24 text-white ${isListening ? '' : 'group-hover:scale-110 transition-transform'}`} />
                   <div className="absolute -bottom-14 w-full text-center">
                      <p className={`font-black uppercase tracking-widest text-2xl transition-colors ${isListening ? 'text-red-600' : 'text-gray-900'}`}>
                        {isListening ? 'CHÁU ĐANG NGHE...' : 'BẤM ĐỂ NÓI'}
                      </p>
                   </div>
                </motion.button>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <button 
                   onClick={() => triggerAction('Gọi bác sĩ', 'Đang kết nối cuộc gọi video trực tiếp với bác sĩ gia đình...', 'info')}
                   className="btn-huge bg-blue-100 group border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-blue-200 transition-all p-10 rounded-[64px] flex flex-col items-center gap-6"
                >
                  <div className="p-8 bg-white rounded-full text-blue-600 group-hover:scale-110 transition-transform border-4 border-gray-900">
                    <Stethoscope className="w-20 h-20" />
                  </div>
                  <span className="uppercase text-4xl font-black">GỌI BÁC SĨ</span>
                </button>
                <button 
                  onClick={() => triggerAction('Tìm người đi dạo', 'Hệ thống đang tìm kiếm Companion ở gần bác nhất...', 'loading')}
                  className="btn-huge bg-green-100 group border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-green-200 transition-all p-10 rounded-[64px] flex flex-col items-center gap-6"
                >
                  <div className="p-8 bg-white rounded-full text-green-600 group-hover:scale-110 transition-transform border-4 border-gray-900">
                    <Navigation className="w-20 h-20" />
                  </div>
                  <span className="uppercase text-4xl font-black">TÌM NGƯỜI ĐI DẠO</span>
                </button>
                <button 
                  onClick={() => triggerAction('Gia đình số', 'Đang trình chiếu những hình ảnh kỷ niệm của gia đình bác...', 'info', { gallery: true })}
                  className="btn-huge bg-purple-100 group border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-purple-200 transition-all p-10 rounded-[64px] flex flex-col items-center gap-6"
                >
                  <div className="p-8 bg-white rounded-full text-purple-600 group-hover:scale-110 transition-transform border-4 border-gray-900">
                    <Users className="w-20 h-20" />
                  </div>
                  <span className="uppercase text-4xl font-black">GIA ĐÌNH SỐ</span>
                </button>
                <button 
                  onClick={triggerSOS}
                  className="btn-huge group border-4 border-red-600 text-red-600 font-black bg-red-50 hover:bg-red-600 hover:text-white transition-all p-10 rounded-[64px] flex flex-col items-center gap-6 shadow-[8px_8px_0px_0px_#EF4444] scale-105"
                >
                   <div className="p-8 bg-white text-red-600 rounded-full animate-pulse border-4 border-red-600">
                    <Shield className="w-20 h-20" />
                  </div>
                  <span className="uppercase text-5xl font-black">SOS KHẨN CẤP</span>
                </button>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 pt-10">
                 <div className="bg-white p-10 rounded-[64px] border-8 border-gray-900 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden h-[450px]">
                    <h3 className="text-3xl font-black mb-8 uppercase flex items-center gap-4 text-gray-900">
                       <Star className="text-yellow-500 fill-current" /> Khung ảnh kỷ niệm
                    </h3>
                    <motion.img 
                       animate={{ scale: [1, 1.05, 1] }} 
                       transition={{ duration: 15, repeat: Infinity }}
                       src="https://picsum.photos/seed/family/800/600" 
                       className="w-full h-full object-cover rounded-[48px]" 
                       alt="Family Photo" 
                       referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-x-10 bottom-10 p-6 bg-white/90 backdrop-blur rounded-3xl border-4 border-gray-900 font-bold text-2xl">
                       "Bác Minh cùng con cháu tại buổi tiệc sinh nhật 2026"
                    </div>
                 </div>

                 <div className="bg-yellow-50 p-10 rounded-[64px] border-8 border-gray-900 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] h-[450px]">
                    <h3 className="text-3xl font-black mb-8 uppercase flex items-center gap-4">
                       <Activity className="text-primary" /> Nhắc nhở cháu Linky
                    </h3>
                    <div className="space-y-6">
                       <div className="p-8 bg-white rounded-3xl border-4 border-primary flex items-center gap-8 group hover:bg-primary/5 transition-all cursor-pointer">
                          <Clock className="w-14 h-14 text-primary" />
                          <div>
                             <p className="text-3xl font-black text-gray-900">Uống thuốc huyết áp</p>
                             <p className="text-xl font-bold text-primary italic uppercase tracking-wider">ĐẾN GIỜ RỒI • 08:30</p>
                          </div>
                          <CheckCircle2 className="w-12 h-12 ml-auto text-primary" />
                       </div>
                       <div className="p-8 bg-white rounded-3xl border-4 border-gray-200 flex items-center gap-8 group hover:bg-gray-50 transition-all cursor-pointer">
                          <Navigation className="w-14 h-14 text-orange-600" />
                          <div>
                             <p className="text-3xl font-black text-gray-900">Đi dạo buổi chiều</p>
                             <p className="text-xl font-bold text-gray-400 italic uppercase">SẮP TỚI • 16:00</p>
                          </div>
                          <CheckCircle2 className="w-12 h-12 ml-auto opacity-10" />
                       </div>
                    </div>
                 </div>
              </div>
            </motion.div>
          ) : activeView === 'tracking' && activeCompanion ? (
            <motion.div key="tracking" className="space-y-12">
               <div className="flex items-center gap-10">
                 <button onClick={() => setActiveView('home')} className="p-8 bg-white rounded-full border-4 border-gray-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-2 active:shadow-none transition-all">
                    <ArrowRight className="w-16 h-16 rotate-180" />
                 </button>
                 <h2 className="text-6xl font-black uppercase tracking-tight text-gray-900">Theo dõi hành trình của bác</h2>
               </div>
               <div className="grid lg:grid-cols-3 gap-12">
                 <div className="lg:col-span-2 h-[600px] border-8 border-gray-900 rounded-[64px] overflow-hidden relative shadow-2xl">
                   <MapSimulation />
                   <div className="absolute top-10 left-10 p-10 bg-white/95 backdrop-blur rounded-[48px] border-4 border-gray-900 shadow-xl max-w-md">
                      <div className="flex items-center gap-6 mb-8">
                         <img src={activeCompanion.img} className="w-24 h-24 rounded-full border-4 border-gray-900 shadow-lg object-cover" alt="Comp" referrerPolicy="no-referrer" />
                         <div>
                            <p className="text-3xl font-black text-gray-900">{activeCompanion.name}</p>
                            <p className="text-xl font-bold text-gray-500 mb-4">Đang đồng hành cùng bác</p>
                            <div className="grid grid-cols-1 gap-4">
                              <button onClick={() => triggerAction('Gọi cho cháu', `Đang kết nối cuộc gọi với cháu ${activeCompanion.name}...`, 'info')} className="p-6 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center gap-4 font-black text-2xl border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <Phone className="w-10 h-10" /> GỌI ĐIỆN
                              </button>
                              <button onClick={() => triggerAction('Nhắn tin', '', 'info', { chat: true })} className="p-6 bg-green-100 text-green-600 rounded-3xl flex items-center justify-center gap-4 font-black text-2xl border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <MessageCircle className="w-10 h-10" /> NHẮN TIN
                              </button>
                            </div>
                         </div>
                      </div>
                   </div>
                 </div>
                 <div className="space-y-8">
                    <div className="bg-white p-10 rounded-[64px] border-8 border-gray-900 shadow-xl">
                       <h3 className="text-3xl font-black mb-8 border-b-4 border-gray-100 pb-4 uppercase">Trạng thái</h3>
                       <div className="space-y-8">
                          {[
                            { time: '08:45 AM', text: 'Bắt đầu chuyến đi dạo', status: 'done' },
                            { time: '09:12 AM', text: 'Đang ở Công viên Tao Đàn', status: 'current' },
                            { time: '09:45 AM', text: 'Về nhà nghỉ ngơi', status: 'pending' }
                          ].map((step, i) => (
                            <div key={i} className="flex gap-6 items-start relative pb-8 last:pb-0">
                               {i < 2 && <div className="absolute left-[23px] top-10 w-2 h-full bg-gray-100" />}
                               <div className={`w-12 h-12 rounded-full border-4 border-gray-900 flex items-center justify-center z-10 ${step.status === 'done' ? 'bg-green-500' : step.status === 'current' ? 'bg-primary' : 'bg-gray-200'}`}>
                                  {step.status === 'done' ? <CheckCircle2 className="w-6 h-6 text-white" /> : <Clock className="w-6 h-6 text-white" />}
                               </div>
                               <div>
                                  <p className="text-xl font-black text-gray-900">{step.text}</p>
                                  <p className="text-lg font-bold text-gray-400">{step.time}</p>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                 </div>
               </div>
            </motion.div>
          ) : footerPage && (
            <motion.div 
              key="footer-page"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="max-w-3xl mx-auto py-12"
            >
              <button onClick={() => setActiveView('home')} className="mb-8 flex items-center gap-2 text-gray-900 font-black hover:underline text-2xl">
                <ArrowRight className="w-6 h-6 rotate-180" /> QUAY LẠI
              </button>
              <h2 className="text-6xl font-black mb-8 text-gray-900 uppercase">{footerPage.title}</h2>
              <div className="bg-white p-12 rounded-[40px] border-8 border-gray-900 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] space-y-8">
                <p className="text-3xl font-bold text-gray-800 leading-relaxed">{footerPage.content}</p>
                <p className="text-xl text-gray-600 font-medium">LinkHeart luôn trân trọng và nỗ lực hết mình vì sức khỏe và niềm vui của các bác. Chúng tôi tin rằng mỗi người cao tuổi đều xứng đáng có một người bạn đồng hành tận tâm.</p>
                <div className="grid grid-cols-2 gap-6 pt-8">
                  <img src="https://picsum.photos/seed/elderly1/500/400" className="rounded-[32px] border-4 border-gray-900" alt="Elderly 1" referrerPolicy="no-referrer" />
                  <img src="https://picsum.photos/seed/elderly2/500/400" className="rounded-[32px] border-4 border-gray-900" alt="Elderly 2" referrerPolicy="no-referrer" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <motion.button 
        whileTap={{ scale: 0.8 }}
        onClick={triggerSOS}
        className="fixed bottom-40 right-8 w-32 h-32 bg-red-600 text-white rounded-full border-8 border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center font-black text-4xl animate-bounce z-[60]"
      >
        SOS
      </motion.button>

      <SimulationModal 
        isOpen={modal.open} 
        onClose={() => setModal({ ...modal, open: false })} 
        title={modal.title}
        type={modal.type}
      >
        {modal.data?.chat ? <ChatSimulation onBack={() => setModal({ ...modal, open: false })} /> : (
          modal.data?.handbook ? (
            <div className="space-y-6">
              {modal.data.handbook.map((h: any, i: number) => (
                <div key={i} className="p-6 bg-gray-50 rounded-3xl border-4 border-gray-200">
                  <h4 className="text-2xl font-black mb-2 uppercase tracking-tight">{h.title}</h4>
                  <p className="text-lg font-bold text-gray-600">{h.content}</p>
                </div>
              ))}
            </div>
          ) : modal.content || <p className="text-3xl font-black text-gray-900">Tính năng này đang được hỗ trợ.</p>
        )}
      </SimulationModal>

      <Toast message={toast.msg} isVisible={toast.show} onClose={() => setToast({ show: false, msg: '' })} />
      <Footer theme="elderly" onToast={renderFooterPage} />
    </div>
  );
};

// --- Pricing Component ---
const Pricing = ({ onBack, onSelectPlan, trialDaysLeft }: { onBack: () => void; onSelectPlan: (plan: Plan) => void; trialDaysLeft: number | null }) => {
  const plans: Plan[] = [
    {
      name: "Gói Cơ Bản",
      price: "199.000đ",
      period: "/tháng",
      features: ["Đồng hành 2 giờ/tuần", "Hỗ trợ 24/7", "Báo cáo cơ bản"],
      color: "border-gray-100",
      button: "Bắt đầu ngay"
    },
    {
      name: "Gói Phổ Thông",
      price: "499.000đ",
      period: "/tháng",
      features: ["Đồng hành 5 giờ/tuần", "Hỗ trợ 24/7", "Báo cáo chi tiết", "Ưu tiên chọn Companion"],
      color: "border-primary/30 bg-primary/5",
      button: "Phổ biến nhất",
      highlight: true
    },
    {
      name: "Gói Hiện Tại",
      price: "Free",
      period: " (15 ngày)",
      features: ["Trải nghiệm Full tính năng", "Hỗ trợ 24/7", "Báo cáo chi tiết", "Kết nối đa thế hệ"],
      color: "border-gray-900 bg-gray-900 text-white",
      button: trialDaysLeft !== null ? `Còn ${trialDaysLeft} ngày` : "Đang dùng thử",
      isCurrent: true
    }
  ];

  return (
    <div className="min-h-screen bg-cream p-6 py-24 flex flex-col items-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48" />
      <button 
        onClick={onBack}
        className="absolute top-12 left-12 p-4 bg-white rounded-full shadow-xl hover:scale-110 transition-transform active:scale-95 z-20"
      >
        <ArrowLeft className="w-8 h-8 text-gray-900" />
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 relative z-10"
      >
        <h2 className="text-5xl font-black mb-4">Các Gói Dịch Vụ</h2>
        <p className="text-xl text-gray-500 font-bold">Lựa chọn gói phù hợp để kết nối yêu thương bền vững.</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8 max-w-6xl w-full relative z-10">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-10 rounded-[48px] border-4 flex flex-col ${plan.color} shadow-xl relative overflow-hidden bg-white`}
          >
            {plan.highlight && (
              <div className="absolute top-0 right-0 bg-primary text-white px-6 py-2 rounded-bl-3xl font-black text-xs uppercase tracking-widest">
                Phổ biến
              </div>
            )}
            <h3 className={`text-2xl font-black mb-2 ${plan.isCurrent ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
            <div className="mb-8">
              <span className={`text-5xl font-black ${plan.isCurrent ? 'text-primary' : 'text-gray-900'}`}>{plan.price}</span>
              <span className={`text-sm font-bold ${plan.isCurrent ? 'text-gray-400' : 'text-gray-500'}`}>{plan.period}</span>
            </div>
            
            <ul className="space-y-4 mb-10 flex-1">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-center gap-3">
                  <CheckCircle2 className={`w-5 h-5 ${plan.isCurrent ? 'text-primary' : 'text-green-500'}`} />
                  <span className={`font-bold ${plan.isCurrent ? 'text-gray-300' : 'text-gray-600'}`}>{f}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={() => !plan.isCurrent && onSelectPlan(plan)}
              className={`w-full py-5 rounded-3xl font-black text-xl transition-all active:scale-95 ${
              plan.isCurrent ? 'bg-white/20 text-white cursor-default' : plan.highlight ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}>
              {plan.button}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- Payment Component ---
const PaymentPage = ({ onBack, plan, user }: { onBack: () => void; plan: Plan; user: FirebaseUser }) => {
  const transferCode = `LH${user.uid.slice(0, 6).toUpperCase()}`;

  return (
    <div className="min-h-screen bg-cream p-6 py-24 flex flex-col items-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -mr-48 -mt-48" />
      <button 
        onClick={onBack}
        className="absolute top-12 left-12 p-4 bg-white rounded-full shadow-xl hover:scale-110 transition-transform active:scale-95 z-20"
      >
        <ArrowLeft className="w-8 h-8 text-gray-900" />
      </button>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl bg-white rounded-[48px] shadow-2xl border-8 border-white p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center"
      >
        <div className="flex-1 text-center md:text-left">
          <div className="inline-block px-4 py-1 bg-primary/10 text-primary text-xs font-black rounded-full mb-4 uppercase">
            Thanh Toán Đăng Ký
          </div>
          <h2 className="text-4xl font-black mb-4">Nâng cấp {plan.name}</h2>
          <p className="text-xl text-gray-500 font-bold mb-8">Thời gian sử dụng: <span className="text-gray-900">1 Tháng</span></p>
          
          <div className="space-y-6 bg-gray-50 p-8 rounded-3xl border-2 border-gray-100 mb-8">
            <div>
              <p className="text-xs font-black text-gray-400 uppercase mb-1">Số tài khoản</p>
              <p className="text-2xl font-black text-gray-900">0123 4567 8999</p>
              <p className="text-sm font-bold text-gray-500 italic">Ngân hàng MB Bank - Chủ TK: LINKHEART VN</p>
            </div>
            <div>
              <p className="text-xs font-black text-gray-400 uppercase mb-1">Mã chuyển khoản</p>
              <div className="flex items-center gap-3">
                <p className="text-3xl font-black text-primary select-all">{transferCode}</p>
                <div className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-lg">BẮT BUỘC</div>
              </div>
            </div>
            <div>
              <p className="text-xs font-black text-gray-400 uppercase mb-1">Số tiền</p>
              <p className="text-3xl font-black text-gray-900">{plan.price}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm font-bold text-gray-400">
            <Shield className="w-5 h-5" />
            Giao dịch được bảo mật bởi LinkHeart. Hệ thống sẽ tự động kích hoạt sau 1-3 phút.
          </div>
        </div>

        <div className="w-64 md:w-80 flex flex-col items-center gap-6">
          <div className="bg-white p-6 rounded-[32px] shadow-xl border-4 border-gray-50 relative">
             <img 
               src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=STK:012345678999|CODE:${transferCode}|AMOUNT:${plan.price}`} 
               alt="QR Code Payment" 
               className="w-full h-auto rounded-xl"
               referrerPolicy="no-referrer"
             />
             <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                <Heart className="w-20 h-20 text-primary" />
             </div>
          </div>
          <p className="text-center font-black text-gray-900 flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-primary" />
            Quét mã để thanh toán nhanh
          </p>
        </div>
      </motion.div>
    </div>
  );
};

// --- Error Handling ---
enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  // We keep it as console error and don't necessarily throw if we want the app to keep running,
  // but the instructions say "throw a new error with a very specific JSON object".
  // Let's follow to be safe.
  throw new Error(JSON.stringify(errInfo));
}

// --- Seed Helpers ---
const seedCompanionsIfNeeded = async () => {
  const path = "companions";
  try {
    const companionsRef = collection(db, path);
    const snapshot = await getDocs(companionsRef);
    if (snapshot.empty) {
      console.log("Seeding companions to database...");
      for (const c of COMPANIONS) {
        await setDoc(doc(db, path, c.id), {
          ...c,
          createdAt: serverTimestamp()
        });
      }
      console.log("Seeding complete!");
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('Missing or insufficient permissions')) {
      handleFirestoreError(error, OperationType.WRITE, path);
    } else {
      console.error("Seeding Error:", error);
    }
  }
};

// --- Main App ---
export default function App() {
  const [userType, setUserType] = useState<UserType>('portal');
  const [isLoading, setIsLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState(2450000);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  
  // Auth states
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);

  // Trial states
  const [trialDaysLeft, setTrialDaysLeft] = useState<number | null>(null);
  const [isTrialExpired, setIsTrialExpired] = useState(false);
  const [isTrialChecking, setIsTrialChecking] = useState(false);
  
  useEffect(() => {
    if (!authLoading && user) {
      seedCompanionsIfNeeded();
    }
  }, [user, authLoading]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setTrialDaysLeft(null);
      setIsTrialExpired(false);
      return;
    }

    const checkTrial = async () => {
      setIsTrialChecking(true);
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          // createdAt is a Timestamp in Firestore
          const createdAt = data.createdAt?.toDate ? data.createdAt.toDate() : (data.createdAt ? new Date(data.createdAt) : null);
          
          if (createdAt) {
            const now = new Date();
            const diffInMs = now.getTime() - createdAt.getTime();
            const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
            const remaining = Math.max(0, 15 - diffInDays);
            
            setTrialDaysLeft(remaining);
            if (remaining === 0) {
              setIsTrialExpired(true);
            }
          } else {
            // If no createdAt, we assume it's just created now
            setTrialDaysLeft(15);
          }
        }
      } catch (err) {
        console.error('Check trial error:', err);
      } finally {
        setIsTrialChecking(false);
      }
    };

    checkTrial();
  }, [user]);

  const handleSelect = (type: UserType) => {
    setIsLoading(true);
    setTimeout(() => {
      setUserType(type);
      setIsLoading(false);
    }, 1000);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      setUserType('portal');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.body.className = userType === 'elderly' ? 'theme-elderly' : userType === 'kids' ? 'theme-kids' : '';
  }, [userType]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="w-16 h-16 border-8 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  // If not logged in, show Landing or Auth
  if (!user) {
    return (
      <AnimatePresence mode="wait">
        {!showAuth ? (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LandingPage onGetStarted={() => setShowAuth(true)} />
          </motion.div>
        ) : (
          <motion.div key="auth" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
            <Auth onBack={() => setShowAuth(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  if (isTrialExpired) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-xl bg-white rounded-[48px] shadow-2xl border-8 border-white p-12 text-center"
        >
          <div className="w-24 h-24 bg-red-100 rounded-[28px] flex items-center justify-center text-red-500 shadow-xl mx-auto mb-8 transform -rotate-3">
            <Clock className="w-12 h-12" />
          </div>
          <h2 className="text-4xl font-black mb-6 leading-tight">Hết hạn dùng thử!</h2>
          <p className="text-xl text-gray-500 font-bold mb-10 leading-relaxed">
            Khoảng thời gian 15 ngày trải nghiệm miễn phí của bạn đã kết thúc. <br />
            Để tiếp tục sử dụng trọn bộ tính năng của LinkHeart, vui lòng nâng cấp tài khoản của bạn.
          </p>
          <div className="space-y-4">
            <button 
              onClick={() => window.location.href = 'https://linkheart.vn/upgrading'} 
              className="w-full py-6 bg-primary text-white font-black text-2xl rounded-3xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
            >
              ĐĂNG KÝ NGAY
            </button>
            <button 
              onClick={handleLogout}
              className="w-full py-4 text-gray-400 font-bold hover:text-gray-600 transition-colors"
            >
              Đăng xuất
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <AnimatePresence>
        {(isLoading || isTrialChecking) && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center"
          >
            <div className="w-20 h-20 border-8 border-primary/20 border-t-primary rounded-full animate-spin mb-6" />
            <p className="text-2xl font-bold text-primary animate-pulse">
              {isTrialChecking ? 'Đang kiểm tra quyền truy cập...' : 'Đang tải giao diện thích ứng...'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Info & Logout Float - Only show on Portal/Pricing pages to avoid overlap in Modes */}
      {(userType === 'portal' || userType === 'pricing' || userType === 'payment') && (
        <div className="fixed top-6 right-6 z-[100] flex items-center gap-4">
           {trialDaysLeft !== null && (
             <div className={`px-4 py-2 rounded-full border-2 font-black text-xs shadow-lg hidden md:block ${trialDaysLeft <= 3 ? 'bg-red-50 border-red-200 text-red-500' : 'bg-green-50 border-green-200 text-green-500'}`}>
                DÙNG THỬ: {trialDaysLeft} NGÀY CÒN LẠI
             </div>
           )}
           <div className="bg-white/80 backdrop-blur p-2 pr-6 rounded-full shadow-xl border-4 border-white flex items-center gap-3">
              <img src={user.photoURL || `https://picsum.photos/seed/${user.uid}/40/40`} className="w-10 h-10 rounded-full border-2 border-primary shadow-sm" alt="User" referrerPolicy="no-referrer" />
              <div>
                <p className="text-xs font-black text-gray-400 uppercase leading-none mb-1">Thành viên</p>
                <p className="text-sm font-black text-gray-900 leading-none truncate max-w-[120px]">{user.displayName || user.email?.split('@')[0]}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="ml-4 p-3 bg-red-50 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-sm"
                title="Đăng xuất"
              >
                <LogOut className="w-5 h-5" />
              </button>
           </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {userType === 'portal' && (
          <motion.div 
            key="portal" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Portal onSelect={handleSelect} />
          </motion.div>
        )}
        {userType === 'pricing' && (
          <motion.div 
            key="pricing" 
            initial={{ opacity: 0, scale: 1.1 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <Pricing 
              onBack={() => handleSelect('portal')} 
              trialDaysLeft={trialDaysLeft} 
              onSelectPlan={(plan) => {
                setSelectedPlan(plan);
                handleSelect('payment');
              }}
            />
          </motion.div>
        )}
        {userType === 'payment' && selectedPlan && user && (
          <motion.div 
            key="payment" 
            initial={{ y: 100, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            exit={{ y: -100, opacity: 0 }}
          >
            <PaymentPage 
              onBack={() => handleSelect('pricing')} 
              plan={selectedPlan}
              user={user}
            />
          </motion.div>
        )}
        {userType === 'kids' && (
          <motion.div 
            key="kids" 
            initial={{ x: 100, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            exit={{ x: -100, opacity: 0 }}
          >
            <KidsMode onBack={() => handleSelect('portal')} />
          </motion.div>
        )}
        {userType === 'pro' && (
          <motion.div 
            key="pro" 
            initial={{ x: 100, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            exit={{ x: -100, opacity: 0 }}
          >
            <ProMode 
              onBack={() => handleSelect('portal')} 
              walletBalance={walletBalance}
              setWalletBalance={setWalletBalance}
            />
          </motion.div>
        )}
        {userType === 'elderly' && (
          <motion.div 
            key="elderly" 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            exit={{ scale: 1.2, opacity: 0 }}
          >
            <ElderlyMode onBack={() => handleSelect('portal')} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistence LinkyAI Assistant */}
      {user && <LinkyAI user={user} />}
    </div>
  );
}
