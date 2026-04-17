import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle2, 
  Shield, 
  Heart, 
  Baby, 
  Users, 
  Star,
  Award,
  Zap
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-cream text-gray-900 font-sans selection:bg-primary/20">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-primary">LinkHeart</span>
          </div>
          <button 
            onClick={onGetStarted}
            className="px-6 py-2.5 bg-gray-900 text-white font-bold rounded-full hover:bg-primary transition-colors shadow-lg shadow-gray-200"
          >
            Đăng nhập
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold mb-8"
          >
            <Star className="w-4 h-4 fill-current" />
            Nền tảng đồng hành đa thế hệ đầu tiên tại Việt Nam
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight"
          >
            Kết nối trái tim <br />
            <span className="text-secondary italic">Lan tỏa yêu thương</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto font-medium"
          >
            LinkHeart cung cấp các dịch vụ đồng hành tin cậy, giúp kết nối người trẻ nhiệt huyết với những thành viên cần sự quan tâm trong gia đình bạn.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={onGetStarted}
              className="w-full sm:w-auto px-10 py-5 bg-primary text-white font-black text-xl rounded-2xl shadow-xl shadow-primary/30 hover:scale-105 transition-transform group flex items-center justify-center gap-2"
            >
              Bắt đầu ngay <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center gap-3 p-2 bg-white rounded-2xl border border-gray-100 shadow-lg px-4 py-3">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <img key={i} src={`https://picsum.photos/seed/user${i}/40/40`} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="User" referrerPolicy="no-referrer" />
                ))}
              </div>
              <div className="text-left">
                <p className="text-sm font-black text-gray-900 leading-none">10,000+</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Gia đình tin tưởng</p>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Giải pháp cho mọi thế hệ</h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto">Chúng tôi thiết kế những trải nghiệm riêng biệt để phù hợp với nhu cầu và phong cách của từng thành viên.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: 'Cho Bé Yêu (Kids)',
                desc: 'Hỗ trợ học tập, vui chơi, rèn luyện kỹ năng cùng các Companion (Sinh viên) năng động.',
                icon: <Baby className="w-8 h-8 text-kids-orange" />,
                bg: 'bg-kids-orange/10',
                color: 'text-kids-orange'
              },
              {
                title: 'Cho Chính Bạn (Pro)',
                desc: 'Tìm bạn cùng tập gym, học ngoại ngữ, du lịch hoặc đặt dịch vụ chăm sóc cho người thân.',
                icon: <Users className="w-8 h-8 text-pro-green" />,
                bg: 'bg-pro-green/10',
                color: 'text-pro-green'
              },
              {
                title: 'Cho Cha Mẹ (Elderly)',
                desc: 'Chế độ hỗ trợ đặc biệt với giao diện đơn giản, theo dõi sức khỏe và kết nối cứu trợ SOS.',
                icon: <Heart className="w-8 h-8 text-primary" />,
                bg: 'bg-primary/10',
                color: 'text-primary'
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 rounded-[40px] border-4 border-gray-50 bg-gray-50/50 hover:bg-white hover:border-white hover:shadow-2xl transition-all"
              >
                <div className={`w-16 h-16 ${service.bg} rounded-2xl flex items-center justify-center mb-8 ${service.color}`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-black mb-4">{service.title}</h3>
                <p className="text-gray-600 font-medium leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black mb-10 leading-tight">An toàn & Tin cậy <br /><span className="text-primary italic">là ưu tiên hàng đầu</span></h2>
              <div className="space-y-8">
                {[
                  { title: 'Xác thực 100%', desc: 'Tất cả Companion đều được phỏng vấn và kiểm tra lý lịch nghiêm ngặt.' },
                  { title: 'Bảo hiểm dịch vụ', desc: 'Mọi chuyến hành trình đều được bảo vệ bởi gói bảo hiểm toàn diện.' },
                  { title: 'Theo dõi Real-time', desc: 'Giám sát vị trí và trạng thái của người thân trực tiếp trên ứng dụng.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <CheckCircle2 className="w-8 h-8 text-primary shrink-0" />
                    <div>
                      <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                      <p className="text-gray-400 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://picsum.photos/seed/trust/800/600" 
                className="rounded-[40px] shadow-2xl border-4 border-white/10" 
                alt="Trust" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 -left-10 bg-primary p-8 rounded-[32px] shadow-2xl">
                <Shield className="w-12 h-12 text-white mb-4" />
                <p className="text-2xl font-black">Hệ thống <br />Bảo vệ 24/7</p>
              </div>
            </div>
          </div>
        </div>
        {/* Abstract pattern */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
      </section>

      {/* CTA Footer */}
      <section className="py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-12 p-6 bg-white rounded-[40px] shadow-xl inline-block">
             <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                   <p className="text-3xl font-black text-primary">5k+</p>
                   <p className="text-[10px] font-black text-gray-400 uppercase">Companion</p>
                </div>
                <div className="text-center border-x border-gray-100 px-8">
                   <p className="text-3xl font-black text-secondary">10k+</p>
                   <p className="text-[10px] font-black text-gray-400 uppercase">Khách hàng</p>
                </div>
                <div className="text-center">
                   <p className="text-3xl font-black text-gray-900">4.9/5</p>
                   <p className="text-[10px] font-black text-gray-400 uppercase">Đánh giá</p>
                </div>
             </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-8">Sẵn sàng để yêu thương lan tỏa?</h2>
          <button 
            onClick={onGetStarted}
            className="px-12 py-6 bg-gray-900 text-white font-black text-2xl rounded-2xl shadow-2xl shadow-gray-400 hover:bg-primary transition-all active:scale-95"
          >
            Tham gia ngay miễn phí
          </button>
          <p className="mt-8 text-gray-400 font-bold">Không cần thẻ tín dụng • Đăng ký trong 30 giây</p>
        </div>
      </section>

      {/* Small Footer */}
      <footer className="py-12 border-t border-gray-100 text-center text-gray-400 font-medium">
        <p>© 2026 LinkHeart Omni-Platform. Tất cả quyền được bảo lưu.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
