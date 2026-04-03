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
  LogOut
} from "lucide-react";
import { useState, useEffect } from "react";

// --- Types ---
type UserType = 'portal' | 'kids' | 'pro' | 'elderly';

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
const COMPANIONS = [
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
  const [modal, setModal] = useState<{ open: boolean; title: string; content: string; type: any; data?: any }>({
    open: false,
    title: '',
    content: '',
    type: 'info'
  });
  const [toast, setToast] = useState({ show: false, msg: '' });

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

  const showToast = (msg: string) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: '' }), 3000);
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
                  setModal({ ...modal, open: false });
                  showToast(`Đã gửi yêu cầu đồng hành tới ${modal.data.name}!`);
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
        <div className="flex items-center gap-2">
          <Baby className="text-kids-orange w-8 h-8" />
          <span className="text-2xl font-black text-kids-orange">LinkHeart Kids</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-6 mr-8">
            <button onClick={() => showToast('Bạn đang ở Trang Chủ')} className="font-black text-gray-400 hover:text-kids-orange transition-colors">TRANG CHỦ</button>
            <button onClick={() => showToast('Chưa có bạn bè trực tuyến')} className="font-black text-gray-400 hover:text-kids-orange transition-colors">BẠN BÈ</button>
            <button onClick={() => showToast('Nhật ký đang trống')} className="font-black text-gray-400 hover:text-kids-orange transition-colors">NHẬT KÝ</button>
          </div>
          <button onClick={onBack} className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-12">
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
          <div className="bg-kids-blue/10 p-8 rounded-[40px] border-4 border-kids-blue/20">
            <h3 className="text-3xl font-black text-kids-blue mb-6 flex items-center gap-3">
              <Award className="w-10 h-10" /> Bảng vàng tuần này
            </h3>
            <div className="space-y-4">
              {[
                { name: 'Bé Na', task: 'Hoàn thành 5 bài tập toán', points: '+500' },
                { name: 'Bé Tí', task: 'Đọc xong 2 cuốn sách', points: '+300' }
              ].map((b, i) => (
                <div key={i} className="bg-white p-4 rounded-2xl flex justify-between items-center shadow-sm">
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
          <div className="bg-kids-orange/10 p-8 rounded-[40px] border-4 border-kids-orange/20">
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
                onClick={showHandbook}
                className="w-full bg-white text-kids-orange py-3 rounded-2xl font-black border-2 border-kids-orange"
              >
                XEM CẨM NANG
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer theme="kids" onToast={showToast} />
    </div>
  );
};

// --- Pro Mode ---
const ProMode = ({ onBack }: { onBack: () => void }) => {
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
      showSimulation('Đã tìm thấy Companion!', '', 'companion', randomComp);
    }, 1500);
  };

  const showToast = (msg: string) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: '' }), 3000);
  };

  return (
    <div className="theme-pro min-h-screen bg-pro-white">
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
              <p className="text-gray-600 font-medium">Đang xử lý yêu cầu của bạn...</p>
            </div>
          ) : modal.type === 'companion' ? (
            <div className="text-left">
              <CompanionDetail companion={modal.data} />
              <button 
                onClick={() => {
                  setModal({ ...modal, open: false });
                  showToast(`Đã đặt lịch thành công với ${modal.data.name}!`);
                }}
                className="w-full mt-6 bg-pro-green text-white py-4 rounded-2xl font-bold text-lg"
              >
                XÁC NHẬN ĐẶT LỊCH
              </button>
            </div>
          ) : modal.title === 'Theo dõi GPS' ? (
            <div className="space-y-4">
              <div className="p-4 bg-pro-green/5 rounded-2xl border border-pro-green/10">
                <CompanionDetail companion={COMPANIONS[0]} />
              </div>
              <MapSimulation />
              <p className="text-sm text-gray-500">Người thân của bạn đang ở gần Bệnh viện Chợ Rẫy.</p>
              <button 
                onClick={() => setModal({ ...modal, open: false })}
                className="w-full bg-pro-green text-white py-4 rounded-2xl font-bold"
              >
                Đóng bản đồ
              </button>
            </div>
          ) : (
            <>
              <div className="p-4 bg-gray-50 rounded-2xl space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Dịch vụ:</span>
                  <span className="font-bold">{modal.title}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Trạng thái:</span>
                  <span className="text-green-600 font-bold">Sẵn sàng</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Mã giao dịch:</span>
                  <span className="font-mono">#LH-2026-001</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Yêu cầu của bạn đã được ghi nhận. Hệ thống đang thông báo cho các Companion uy tín nhất trong khu vực.
              </p>
              <button 
                onClick={() => setModal({ ...modal, open: false })}
                className="w-full bg-pro-green text-white py-4 rounded-2xl font-bold shadow-lg shadow-pro-green/20"
              >
                Xác nhận & Theo dõi
              </button>
            </>
          )}
        </div>
      </SimulationModal>

      <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center sticky top-0 bg-pro-white/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-pro-green rounded-lg flex items-center justify-center">
            <Heart className="text-white w-5 h-5" fill="currentColor" />
          </div>
          <span className="text-xl font-bold text-pro-green">LinkHeart Pro</span>
        </div>
        <div className="flex items-center gap-8">
          <button onClick={() => showToast('Đang ở Bảng điều khiển')} className="text-sm font-medium text-gray-600 hover:text-pro-green transition-colors">Bảng điều khiển</button>
          <button onClick={() => showToast('Lịch hẹn đang trống')} className="text-sm font-medium text-gray-600 hover:text-pro-green transition-colors">Lịch hẹn</button>
          <button onClick={() => showToast('Số dư: 2.450.000đ')} className="text-sm font-medium text-gray-600 hover:text-pro-green transition-colors">Ví tiền</button>
          <button onClick={onBack} className="text-gray-400 hover:text-red-500 transition-colors"><LogOut className="w-5 h-5" /></button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex justify-between items-end"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Chào buổi sáng, Minh</h1>
            <p className="text-gray-500">Hôm nay bạn muốn đặt dịch vụ gì cho mình hay người thân?</p>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-xs text-gray-400 font-bold uppercase">Số dư ví</p>
              <p className="text-xl font-bold text-pro-green">2.450.000đ</p>
            </div>
            <button 
              onClick={() => showToast('Nạp tiền thành công (Demo)')}
              className="w-10 h-10 bg-pro-green text-white rounded-full flex items-center justify-center shadow-lg shadow-pro-green/20 active:scale-90 transition-transform"
            >
              +
            </button>
          </div>
        </motion.div>

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
                <div className="p-6 rounded-2xl bg-pro-green/5 border border-pro-green/10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img src="https://picsum.photos/seed/comp/100/100" className="w-14 h-14 rounded-full object-cover border-2 border-pro-green" alt="Comp" referrerPolicy="no-referrer" />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Đồng hành y tế - Bố (Bác Ba)</p>
                      <p className="text-xs text-gray-500">Vị trí: BV Chợ Rẫy • Companion: Minh Anh</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      showSimulation('Theo dõi GPS', 'loading');
                      setTimeout(() => showSimulation('Theo dõi GPS'), 1000);
                    }}
                    className="bg-white text-pro-green px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all"
                  >
                    Theo dõi Live
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold mb-6">Câu chuyện từ cộng đồng</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { name: 'Bác Hùng', story: 'Tìm thấy niềm vui đi dạo mỗi chiều...', img: 'https://picsum.photos/seed/elder1/100/100' },
                  { name: 'Chị Lan', story: 'Yên tâm công tác khi có người đồng hành cùng con...', img: 'https://picsum.photos/seed/mom1/100/100' }
                ].map((s, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.05 }}
                    onClick={() => showSimulation(`Câu chuyện của ${s.name}`, 'loading')}
                    className="p-4 rounded-2xl bg-gray-50 cursor-pointer group"
                  >
                    <img src={s.img} className="w-full h-32 object-cover rounded-xl mb-4" alt={s.name} referrerPolicy="no-referrer" />
                    <p className="font-bold text-sm group-hover:text-pro-green transition-colors">{s.name}</p>
                    <p className="text-xs text-gray-500 line-clamp-2">{s.story}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold mb-8 text-center">Gói hội viên ưu đãi</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: 'Cơ bản', price: '499k/tháng', features: ['5 chuyến đồng hành', 'Hỗ trợ 24/7'] },
                  { title: 'Gia đình', price: '999k/tháng', features: ['15 chuyến đồng hành', 'Bảo hiểm an toàn'] }
                ].map((p, i) => (
                  <div key={i} className="p-6 rounded-2xl border-2 border-gray-100 hover:border-pro-green transition-all">
                    <h4 className="font-bold text-xl mb-2">{p.title}</h4>
                    <p className="text-2xl font-black text-pro-green mb-4">{p.price}</p>
                    <ul className="space-y-2 mb-6">
                      {p.features.map((f, j) => (
                        <li key={j} className="text-xs text-gray-500 flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3 text-pro-green" /> {f}
                        </li>
                      ))}
                    </ul>
                    <button 
                      onClick={() => showSimulation(`Đăng ký gói ${p.title}`, 'loading')}
                      className="w-full py-3 rounded-xl bg-gray-900 text-white font-bold text-sm hover:bg-pro-green transition-colors"
                    >
                      Chọn gói này
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold mb-6">Câu hỏi thường gặp</h3>
              <div className="space-y-4">
                {[
                  { q: 'Làm sao để biết Companion an toàn?', a: 'Tất cả Companion đều được xác minh CCCD và đào tạo kỹ năng.' },
                  { q: 'Tôi có thể hủy lịch đã đặt không?', a: 'Bạn có thể hủy trước 2 tiếng mà không mất phí.' }
                ].map((item, i) => (
                  <details key={i} className="group border-b border-gray-100 pb-4">
                    <summary className="list-none font-bold text-sm flex justify-between items-center cursor-pointer group-hover:text-pro-green transition-colors">
                      {item.q}
                      <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                    </summary>
                    <p className="text-xs text-gray-500 mt-3 leading-relaxed">{item.a}</p>
                  </details>
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
                onClick={() => {
                  showSimulation('Gói Hiếu Thảo', 'loading');
                  setTimeout(() => showSimulation('Gói Hiếu Thảo'), 1500);
                }}
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
      </main>
      <Footer theme="pro" onToast={showToast} />
    </div>
  );
};

// --- Elderly Mode ---
const ElderlyMode = ({ onBack }: { onBack: () => void }) => {
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
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => showToast('Chào bác! Chúc bác ngày mới vui vẻ.')}>
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

      <main className="flex-1 p-8 grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {[
          { title: 'GỌI BÁC SĨ', icon: <Stethoscope className="w-24 h-24" />, color: 'bg-blue-400', content: 'Đang kết nối với bác sĩ gia đình của bác...' },
          { title: 'TÌM NGƯỜI ĐI DẠO', icon: <Users className="w-24 h-24" />, color: 'bg-green-400', content: 'Đang tìm người đồng hành đi dạo cùng bác...' },
          { title: 'HỖ TRỢ ĐI CHỢ', icon: <Smartphone className="w-24 h-24" />, color: 'bg-orange-400', content: 'Đang gửi yêu cầu hỗ trợ mua sắm cho bác...' },
          { title: 'TÂM SỰ', icon: <MessageCircle className="w-24 h-24" />, color: 'bg-purple-400', content: 'Đang kết nối với bạn tâm tình của bác...' }
        ].map((btn, i) => (
          <motion.button 
            key={i}
            whileTap={{ scale: 0.95 }}
            onClick={() => triggerAction(btn.title, btn.content)}
            className={`btn-huge ${btn.color} hover:scale-[1.02] transition-transform`}
          >
            {btn.icon}
            <span className="mt-4">{btn.title}</span>
          </motion.button>
        ))}
      </main>

      {/* Reminders & Handbook */}
      <div className="px-8 mb-8 space-y-4">
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
      <div className="px-8 mb-8">
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
      </div>

      {/* Voice Assistant */}
      <div className="p-10 bg-white border-t-8 border-gray-900 flex flex-col items-center gap-6">
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

      {/* SOS Button */}
      <motion.button 
        whileTap={{ scale: 0.8 }}
        onClick={triggerSOS}
        className="fixed bottom-40 right-8 w-32 h-32 bg-red-600 text-white rounded-full border-8 border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center font-black text-4xl animate-bounce z-[60]"
      >
        SOS
      </motion.button>
      <Footer theme="elderly" onToast={showToast} />
    </div>
  );
};

// --- Main App ---
export default function App() {
  const [userType, setUserType] = useState<UserType>('portal');
  const [isLoading, setIsLoading] = useState(false);

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
            <ProMode onBack={() => handleSelect('portal')} />
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
