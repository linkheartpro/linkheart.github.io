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
  Send
} from "lucide-react";
import React, { useState, useEffect } from "react";

// --- Types ---
type UserType = 'portal' | 'kids' | 'pro' | 'elderly';
type ProView = 'home' | 'dashboard' | 'appointments' | 'wallet' | 'tracking' | 'footer-page';

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
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center shadow-xl mx-auto mb-6">
          <Heart className="text-white w-10 h-10" fill="currentColor" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Hôm nay LinkHeart có thể <br /> đồng hành cùng ai?</h1>
        <p className="text-gray-500">Chọn trải nghiệm phù hợp với nhu cầu của bạn</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full">
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
            className={`p-8 rounded-[40px] border-4 bg-white text-left transition-all group ${item.color} shadow-xl hover:scale-105`}
          >
            <div className="mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
            <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">{item.desc}</p>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{item.tag}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// --- Mock Data ---
interface Companion {
  name: string;
  age: number;
  school: string;
  rating: number;
  bio: string;
  img: string;
}

const COMPANIONS: Companion[] = [
  { name: 'Nguyễn Minh Anh', age: 21, school: 'ĐH Ngoại Thương', rating: 4.9, bio: 'Năng động, yêu trẻ em, có chứng chỉ sơ cứu.', img: 'https://picsum.photos/seed/c1/200/200' },
  { name: 'Trần Hoàng Nam', age: 22, school: 'ĐH Bách Khoa', rating: 4.8, bio: 'Giỏi toán, thích chơi thể thao, nhiệt tình.', img: 'https://picsum.photos/seed/c2/200/200' },
  { name: 'Lê Thị Thanh', age: 20, school: 'ĐH Sư Phạm', rating: 5.0, bio: 'Kỹ năng kể chuyện tốt, kiên nhẫn và chu đáo.', img: 'https://picsum.photos/seed/c3/200/200' },
  { name: 'Phạm Đức Hiếu', age: 23, school: 'ĐH Y Dược', rating: 4.7, bio: 'Kiến thức y tế tốt, điềm đạm, hỗ trợ người già tốt.', img: 'https://picsum.photos/seed/c4/200/200' }
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
const CompanionDetail = ({ companion }: { companion: typeof COMPANIONS[0] }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-4">
      <img src={companion.img} className="w-20 h-20 rounded-full border-4 border-primary/20" alt={companion.name} referrerPolicy="no-referrer" />
      <div>
        <h4 className="text-xl font-bold">{companion.name}</h4>
        <p className="text-sm text-gray-500">{companion.school} • {companion.age} tuổi</p>
        <div className="flex items-center gap-1 text-yellow-500 mt-1">
          <Star className="w-4 h-4 fill-current" />
          <span className="font-bold">{companion.rating}</span>
        </div>
      </div>
    </div>
    <p className="text-sm text-gray-600 italic bg-gray-50 p-3 rounded-xl">"{companion.bio}"</p>
    <div className="flex gap-2">
      <span className="px-3 py-1 bg-blue-100 text-blue-600 text-[10px] font-bold rounded-full">ĐÃ XÁC MINH CCCD</span>
      <span className="px-3 py-1 bg-green-100 text-green-600 text-[10px] font-bold rounded-full">ĐÃ QUA ĐÀO TẠO</span>
    </div>
  </div>
);

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
  const [modal, setModal] = useState<{ open: boolean; title: string; content: string; type: any; data?: any }>({
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

  const showSimulation = (title: string, content: string, type: any = 'success', data?: any) => {
    setModal({ open: true, title, content, type, data });
  };

  const showRandomCompanion = () => {
    showSimulation('Tìm kiếm', '', 'loading');
    setTimeout(() => {
      const randomComp = COMPANIONS[Math.floor(Math.random() * COMPANIONS.length)];
      showSimulation('Đã tìm thấy Companion!', '', 'companion', randomComp);
    }, 2000);
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
          <button onClick={onBack} className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <LogOut className="w-6 h-6" />
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
                <div className="bg-kids-orange/10 p-8 rounded-[40px] border-4 border-kids-orange/20 cursor-pointer hover:bg-kids-orange/20 transition-colors" onClick={() => showToast('Góc an toàn cho bé yêu!')}>
                  <h3 className="text-3xl font-black text-kids-orange mb-6 flex items-center gap-3">
                    <Shield className="w-10 h-10" /> Góc an toàn cho bé
                  </h3>
                  <div className="space-y-4">
                    <p className="text-gray-600 font-bold">Bé hãy nhớ 3 quy tắc vàng nhé:</p>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-sm font-bold"><CheckCircle2 className="text-green-500" /> Luôn đi cùng anh chị Companion</li>
                      <li className="flex items-center gap-3 text-sm font-bold"><CheckCircle2 className="text-green-500" /> Không nhận quà từ người lạ</li>
                      <li className="flex items-center gap-3 text-sm font-bold"><CheckCircle2 className="text-green-500" /> Gọi bố mẹ ngay khi cần</li>
                    </ul>
                    <button 
                      onClick={(e) => { e.stopPropagation(); showHandbook(); }}
                      className="w-full bg-white text-kids-orange py-3 rounded-2xl font-black border-2 border-kids-orange hover:bg-kids-orange hover:text-white transition-all"
                    >
                      XEM CẨM NANG
                    </button>
                  </div>
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
      <Footer theme="kids" onToast={renderFooterPage} />
    </div>
  );
};

// --- Pro Mode ---
const ProMode = ({ onBack, walletBalance, setWalletBalance }: { onBack: () => void, walletBalance: number, setWalletBalance: (v: number) => void }) => {
  const [activeView, setActiveView] = useState<ProView>('home');
  const [footerPage, setFooterPage] = useState<{ title: string; content: string } | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 'LH-992', service: 'Đồng hành y tế', companion: COMPANIONS[0], status: 'active', time: '08:00 - 10:00', location: 'BV Chợ Rẫy' }
  ]);
  const [activeAppointment, setActiveAppointment] = useState<Appointment | null>(null);
  
  const [modal, setModal] = useState<{ open: boolean; title: string; content: string; type: any; data?: any }>({
    open: false,
    title: '',
    content: '',
    type: 'info'
  });
  const [toast, setToast] = useState({ show: false, msg: '' });

  const showSimulation = (title: string, content: string = '', type: any = 'success', data?: any) => {
    setModal({ open: true, title, content, type, data });
  };

  const showRandomCompanion = (service: string) => {
    showSimulation(`Đặt lịch ${service}`, '', 'loading');
    setTimeout(() => {
      const randomComp = COMPANIONS[Math.floor(Math.random() * COMPANIONS.length)];
      showSimulation('Đã tìm thấy Companion!', '', 'companion', { ...randomComp, service });
    }, 1500);
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
          <button onClick={onBack} className="text-gray-400 hover:text-red-500 transition-colors"><LogOut className="w-5 h-5" /></button>
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
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">Chào buổi sáng, Minh</h1>
                  <p className="text-gray-500">Hôm nay bạn muốn đặt dịch vụ gì cho mình hay người thân?</p>
                </div>
                <div className="flex gap-4">
                  <div className="text-right">
                    <p className="text-xs text-gray-400 font-bold uppercase">Số dư ví</p>
                    <p className="text-xl font-bold text-pro-green">{walletBalance.toLocaleString()}đ</p>
                  </div>
                  <button 
                    onClick={() => showSimulation('Nạp tiền vào ví', '', 'info')}
                    className="w-10 h-10 bg-pro-green text-white rounded-full flex items-center justify-center shadow-lg shadow-pro-green/20 active:scale-90 transition-transform"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="text-lg font-bold flex items-center gap-2">
                        <Activity className="w-5 h-5 text-pro-green" />
                        Dịch vụ đề xuất
                      </h3>
                      <button onClick={() => showToast('Đang tải danh sách dịch vụ...')} className="text-xs font-bold text-pro-green hover:underline">Xem tất cả</button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { title: 'Bạn tập Gym', icon: <Dumbbell />, desc: 'Tìm người cùng tập luyện' },
                        { title: 'Đồng hành du lịch', icon: <Plane />, desc: 'Lên kế hoạch & đi cùng' },
                        { title: 'Gói Hiếu Thảo', icon: <Heart />, desc: 'Đặt lịch cho cha mẹ' },
                        { title: 'Báo cáo sức khỏe', icon: <FileText />, desc: 'Xem tình hình người thân' }
                      ].map((item, i) => (
                        <motion.button 
                          key={i} 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => showRandomCompanion(item.title)}
                          className="p-6 rounded-2xl border border-gray-50 bg-gray-50/50 hover:bg-white hover:shadow-xl transition-all text-left group"
                        >
                          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:bg-pro-green group-hover:text-white transition-colors">
                            {item.icon}
                          </div>
                          <h4 className="font-bold text-gray-800">{item.title}</h4>
                          <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold mb-6">Hành trình đang diễn ra</h3>
                    <div className="space-y-4">
                      {appointments.filter(a => a.status === 'active').map(appt => (
                        <div key={appt.id} className="p-6 rounded-2xl bg-pro-green/5 border border-pro-green/10 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <img src={appt.companion.img} className="w-14 h-14 rounded-full object-cover border-2 border-pro-green" alt="Comp" referrerPolicy="no-referrer" />
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">{appt.service} - {appt.companion.name}</p>
                              <p className="text-xs text-gray-500">Vị trí: {appt.location} • {appt.time}</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => startTracking(appt)}
                            className="bg-white text-pro-green px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all"
                          >
                            Theo dõi Live
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-pro-green text-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                    <h3 className="text-2xl font-bold mb-4">Gói Hiếu Thảo</h3>
                    <p className="text-sm text-pro-white/80 mb-8 leading-relaxed">
                      Chăm sóc cha mẹ từ xa chưa bao giờ dễ dàng đến thế. Đặt lịch ngay, thông tin sẽ tự động đồng bộ.
                    </p>
                    <button 
                      onClick={() => showRandomCompanion('Gói Hiếu Thảo')}
                      className="w-full bg-white text-pro-green py-4 rounded-2xl font-bold hover:bg-pro-white active:scale-95 transition-all"
                    >
                      Đặt lịch cho cha mẹ
                    </button>
                  </motion.div>

                  <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold mb-6">Thông báo</h3>
                    <div className="space-y-6">
                      {[
                        { text: 'Minh Anh đã bắt đầu hành trình cùng Bác Ba', time: '5 phút trước' },
                        { text: 'Hóa đơn dịch vụ #LH-992 đã được thanh toán', time: '2 giờ trước' }
                      ].map((n, i) => (
                        <div key={i} className="flex gap-4 items-start cursor-pointer group" onClick={() => showToast('Chi tiết thông báo')}>
                          <div className="w-2 h-2 bg-pro-green rounded-full mt-2 shrink-0 group-hover:scale-150 transition-transform" />
                          <div>
                            <p className="text-sm text-gray-800 leading-snug group-hover:text-pro-green transition-colors">{n.text}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">{n.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
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
                    onClick={() => showSimulation('Nạp tiền vào ví', '', 'info')}
                    className="w-full bg-pro-green text-white py-5 rounded-3xl font-bold text-lg shadow-lg shadow-pro-green/20 flex items-center justify-center gap-3"
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
                <p>Tại LinkHeart, chúng tôi tin rằng công nghệ chỉ thực sự có giá trị khi nó phục vụ trái tim con người. Mỗi dòng code, mỗi tính năng đều được xây dựng with sự tỉ mỉ và tâm huyết cao nhất để đảm bảo an toàn cho người dùng.</p>
                <div className="grid grid-cols-2 gap-8 mt-12">
                  <img src="https://picsum.photos/seed/about1/400/300" className="rounded-3xl shadow-xl" alt="About 1" referrerPolicy="no-referrer" />
                  <img src="https://picsum.photos/seed/about2/400/300" className="rounded-3xl shadow-xl" alt="About 2" referrerPolicy="no-referrer" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
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
  const [toast, setToast] = useState({ show: false, msg: '' });
  const [modal, setModal] = useState<{ open: boolean; title: string; content: string; type: any; data?: any }>({
    open: false,
    title: '',
    content: '',
    type: 'info'
  });

  const triggerAction = (title: string, content: string, type: any = 'success', data?: any) => {
    setModal({ open: true, title, content, type, data });
  };

  const showHandbook = () => {
    triggerAction('Cẩm nang an toàn', '', 'info', { handbook: HANDBOOK_CONTENT.elderly });
  };

  const showToast = (msg: string) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: '' }), 3000);
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
    setModal({ 
      open: true, 
      title: 'CẢNH BÁO KHẨN CẤP', 
      content: 'Đang kết nối với đội cứu hộ và thông báo cho người thân của bác. Vui lòng giữ bình tĩnh!', 
      type: 'emergency' 
    });
  };

  return (
    <div className="theme-elderly min-h-screen flex flex-col">
      <Toast message={toast.msg} isVisible={toast.show} onClose={() => setToast({ ...toast, show: false })} />
      <SimulationModal 
        isOpen={modal.open} 
        onClose={() => setModal({ ...modal, open: false })}
        title={modal.title}
        type={modal.type}
      >
        <div className="text-center space-y-6">
          {modal.type === 'emergency' ? (
            <div className="py-4">
              <div className="w-24 h-24 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Shield className="w-12 h-12" />
              </div>
              <p className="text-xl font-black text-red-600 mb-4 uppercase">Đang gọi cấp cứu...</p>
              <p className="text-gray-700 font-bold leading-relaxed">{modal.content}</p>
              <div className="mt-8 flex gap-4">
                <button 
                  onClick={() => setModal({ ...modal, open: false })}
                  className="flex-1 bg-gray-200 text-gray-800 py-6 rounded-3xl font-black text-xl border-4 border-gray-900"
                >
                  HỦY
                </button>
                <button className="flex-1 bg-red-600 text-white py-6 rounded-3xl font-black text-xl border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  GỌI NGAY
                </button>
              </div>
            </div>
          ) : modal.type === 'companion' ? (
            <div className="text-left">
              <CompanionDetail companion={modal.data} />
              <button 
                onClick={() => {
                  setActiveCompanion(modal.data);
                  setModal({ ...modal, open: false });
                  setActiveView('tracking');
                  showToast(`Đã bắt đầu hành trình cùng cháu ${modal.data.name}!`);
                }}
                className="w-full mt-6 bg-gray-900 text-white py-6 rounded-[32px] font-black text-2xl shadow-[8px_8px_0px_0px_#E85D75]"
              >
                CHỌN CHÁU NÀY
              </button>
            </div>
          ) : modal.data?.handbook ? (
            <div className="text-left space-y-4">
              {modal.data.handbook.map((item: any, i: number) => (
                <div key={i} className="p-6 bg-yellow-50 rounded-[32px] border-4 border-gray-900">
                  <h4 className="font-black text-2xl mb-2 uppercase">{item.title}</h4>
                  <p className="text-lg font-bold text-gray-700">{item.content}</p>
                </div>
              ))}
              <button 
                onClick={() => setModal({ ...modal, open: false })}
                className="w-full bg-gray-900 text-white py-6 rounded-[32px] font-black text-2xl shadow-[8px_8px_0px_0px_#E85D75]"
              >
                ĐÃ HIỂU!
              </button>
            </div>
          ) : (
            <>
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <p className="text-2xl font-black text-gray-900">{modal.content}</p>
              <button 
                onClick={() => setModal({ ...modal, open: false })}
                className="w-full bg-gray-900 text-white py-6 rounded-[32px] font-black text-2xl shadow-[8px_8px_0px_0px_#E85D75]"
              >
                XÁC NHẬN
              </button>
            </>
          )}
        </div>
      </SimulationModal>

      <header className="p-8 flex justify-between items-center bg-white border-b-8 border-gray-900 sticky top-0 z-50">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveView('home')}>
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center border-4 border-gray-900">
            <Heart className="text-white w-10 h-10" fill="currentColor" />
          </div>
          <h1 className="text-5xl font-black">CHÀO BÁC!</h1>
        </div>
        <button 
          onClick={onBack} 
          className="p-6 bg-red-500 text-white rounded-3xl border-4 border-gray-900 font-black text-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
        >
          THOÁT
        </button>
      </header>

      <main className="flex-1 p-8">
        <AnimatePresence mode="wait">
          {activeView === 'home' ? (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { title: 'GỌI BÁC SĨ', icon: <Stethoscope className="w-24 h-24" />, color: 'bg-blue-400', content: 'Đang kết nối với bác sĩ gia đình của bác. Bác vui lòng đợi trong giây lát...' },
                  { title: 'TÌM NGƯỜI ĐI DẠO', icon: <Users className="w-24 h-24" />, color: 'bg-green-400', content: 'Đang tìm người đồng hành đi dạo cùng bác. Cháu Minh Anh ở gần đây đang sẵn sàng!' },
                  { title: 'HỖ TRỢ ĐI CHỢ', icon: <Smartphone className="w-24 h-24" />, color: 'bg-orange-400', content: 'Đang gửi yêu cầu hỗ trợ mua sắm cho bác. Cháu sẽ giúp bác mua thực phẩm tươi ngon nhất.' },
                  { title: 'TÂM SỰ', icon: <MessageCircle className="w-24 h-24" />, color: 'bg-purple-400', content: 'Đang kết nối với bạn tâm tình. Cháu Thanh rất vui được trò chuyện cùng bác.' }
                ].map((btn, i) => (
                  <motion.button 
                    key={i}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (btn.title === 'TÌM NGƯỜI ĐI DẠO') {
                        triggerAction(btn.title, '', 'companion', COMPANIONS[0]);
                      } else {
                        triggerAction(btn.title, btn.content);
                      }
                    }}
                    className={`btn-huge ${btn.color} hover:scale-[1.02] transition-transform`}
                  >
                    {btn.icon}
                    <span className="mt-4">{btn.title}</span>
                  </motion.button>
                ))}
              </div>

              {/* Reminders & Handbook */}
              <div className="space-y-4">
                <div className="bg-yellow-100 border-8 border-gray-900 p-6 rounded-[40px] flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <Clock className="w-12 h-12 text-gray-900" />
                    <div>
                      <p className="text-2xl font-black">NHẮC NHỞ: UỐNG THUỐC</p>
                      <p className="text-lg font-bold">Bác hãy uống thuốc huyết áp nhé!</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => showToast('Đã ghi nhận bác uống thuốc!')}
                    className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-xl"
                  >
                    ĐÃ XONG
                  </button>
                </div>
                <button 
                  onClick={showHandbook}
                  className="w-full bg-blue-100 border-8 border-gray-900 p-6 rounded-[40px] flex items-center justify-center gap-4 hover:bg-blue-200 transition-colors"
                >
                  <Shield className="w-12 h-12" />
                  <span className="text-3xl font-black">CẨM NANG AN TOÀN CHO BÁC</span>
                </button>
              </div>

              {/* Family Contacts */}
              <div className="bg-white border-8 border-gray-900 p-8 rounded-[40px]">
                <h3 className="text-3xl font-black mb-6">DANH BẠ NGƯỜI THÂN</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'CON TRAI (MINH)', color: 'bg-green-100' },
                    { name: 'CON GÁI (LAN)', color: 'bg-pink-100' }
                  ].map((c, i) => (
                    <button 
                      key={i}
                      onClick={() => triggerAction(`Gọi cho ${c.name}`, `Đang kết nối cuộc gọi với ${c.name}...`)}
                      className={`${c.color} p-6 rounded-3xl border-4 border-gray-900 font-black text-xl flex flex-col items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all`}
                    >
                      <Phone className="w-10 h-10" />
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Voice Assistant */}
              <div className="p-10 bg-white border-8 border-gray-900 rounded-[40px] flex flex-col items-center gap-6">
                <p className="font-black text-3xl text-center">BÁC CẦN GÌ, HÃY NHẤN VÀ NÓI:</p>
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setIsListening(!isListening);
                    if (!isListening) {
                      setTimeout(() => {
                        setIsListening(false);
                        triggerAction('Nhận diện giọng nói', 'Cháu đã nghe rõ! Bác muốn tìm người đi dạo vào lúc 4 giờ chiều nay.');
                      }, 3000);
                    }
                  }}
                  className={`w-40 h-40 rounded-full border-8 border-gray-900 flex items-center justify-center transition-all shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] ${isListening ? 'bg-red-500 voice-pulse' : 'bg-primary'}`}
                >
                  <Mic className="w-20 h-20 text-white" />
                </motion.button>
                <AnimatePresence>
                  {isListening && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-2"
                    >
                      <p className="text-primary font-black text-2xl animate-pulse">ĐANG NGHE BÁC NÓI...</p>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(i => (
                          <motion.div 
                            key={i}
                            animate={{ height: [10, 30, 10] }}
                            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                            className="w-2 bg-primary rounded-full"
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : activeView === 'tracking' && activeCompanion ? (
            <motion.div 
              key="tracking"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="space-y-8"
            >
              <button onClick={() => setActiveView('home')} className="mb-8 flex items-center gap-2 text-gray-900 font-black hover:underline text-2xl">
                <ArrowRight className="w-6 h-6 rotate-180" /> QUAY LẠI
              </button>
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="bg-white p-4 rounded-[40px] shadow-2xl border-8 border-gray-900 relative overflow-hidden h-[500px]">
                    <MapSimulation />
                    <div className="absolute top-8 left-8 bg-white/90 p-6 rounded-3xl shadow-xl border-4 border-gray-900">
                      <p className="text-sm font-black text-gray-500 uppercase">Vị trí của bác</p>
                      <p className="text-2xl font-black text-gray-900">Công viên Tao Đàn</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-white p-8 rounded-[40px] shadow-xl border-8 border-gray-900 text-center">
                    <img src={activeCompanion.img} className="w-32 h-32 rounded-full border-4 border-gray-900 mx-auto mb-6 object-cover" alt="Comp" referrerPolicy="no-referrer" />
                    <h3 className="text-3xl font-black mb-2">{activeCompanion.name}</h3>
                    <p className="text-xl font-bold text-gray-500 mb-8">Đang đồng hành cùng bác</p>
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
            </motion.div>
          ) : (
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
              <h2 className="text-6xl font-black mb-8 text-gray-900 uppercase">{footerPage?.title}</h2>
              <div className="bg-white p-12 rounded-[40px] border-8 border-gray-900 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] space-y-8">
                <p className="text-3xl font-bold text-gray-800 leading-relaxed">{footerPage?.content}</p>
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

      {/* SOS Button */}
      <motion.button 
        whileTap={{ scale: 0.8 }}
        onClick={triggerSOS}
        className="fixed bottom-40 right-8 w-32 h-32 bg-red-600 text-white rounded-full border-8 border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center font-black text-4xl animate-bounce z-[60]"
      >
        SOS
      </motion.button>
      <Footer theme="elderly" onToast={renderFooterPage} />
    </div>
  );
};

// --- Main App ---
export default function App() {
  const [userType, setUserType] = useState<UserType>('portal');
  const [isLoading, setIsLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState(2450000);

  const handleSelect = (type: UserType) => {
    setIsLoading(true);
    setTimeout(() => {
      setUserType(type);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    document.body.className = userType === 'elderly' ? 'theme-elderly' : userType === 'kids' ? 'theme-kids' : '';
  }, [userType]);

  return (
    <div className="min-h-screen relative">
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center"
          >
            <div className="w-20 h-20 border-8 border-primary/20 border-t-primary rounded-full animate-spin mb-6" />
            <p className="text-2xl font-bold text-primary animate-pulse">Đang tải giao diện thích ứng...</p>
          </motion.div>
        )}
      </AnimatePresence>

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
    </div>
  );
}
