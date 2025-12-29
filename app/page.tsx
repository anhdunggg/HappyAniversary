'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Calendar, Image as ImageIcon, Music } from 'lucide-react';
import ScrollSection from '@/components/ScrollSection';
import LogoutButton from '@/components/LogoutButton';

export default function ScrollyTellingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      } else {
        setIsLoading(false);
      }
    };
    checkUser();
  }, [router]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-rose-50">
        <div className="animate-pulse text-rose-500 font-bold">Đang tải kỷ niệm...</div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-stone-50 overflow-hidden font-sans text-stone-800">
      <LogoutButton />

      {/* Floating Hearts Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-rose-300"
            initial={{ y: '100vh', x: Math.random() * 100 + 'vw', scale: 0.5 }}
            animate={{
              y: '-10vh',
              rotate: 360,
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
          >
            <Heart size={24 + Math.random() * 48} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* HERO SECTION */}
      <section className="h-screen flex flex-col items-center justify-center relative z-10 text-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Heart className="w-24 h-24 text-rose-500 mx-auto mb-6 animate-bounce" fill="currentColor" />
          <h1 className="text-5xl md:text-7xl font-bold text-rose-600 mb-4 tracking-tight">Kỷ Niệm 3 Năm</h1>
          <p className="text-xl md:text-2xl text-stone-600 italic">"Mỗi khoảnh khắc bên em đều là phép màu"</p>
        </motion.div>
        <motion.div
          className="absolute bottom-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-sm text-stone-400">Cuộn xuống để xem hành trình</span>
        </motion.div>
      </section>

      {/* TIMELINE SECTION */}
      <div className="max-w-4xl mx-auto px-6 py-20 space-y-40 relative z-10">
        {/* Year 1 */}
        <ScrollSection className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-right">
            <div className="inline-block p-4 bg-rose-100 rounded-full mb-4 text-rose-600">
              <Calendar size={32} />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-rose-700">Năm Đầu Tiên</h2>
            <p className="text-lg leading-relaxed text-stone-600">
              Ngày chúng ta bắt đầu câu chuyện này. Những buổi hẹn hò ngại ngùng, những tin nhắn thâu đêm.
              Khoảnh khắc anh nhận ra em chính là người anh tìm kiếm bấy lâu.
            </p>
          </div>
          <div className="flex-1">
            <div className="aspect-video bg-rose-200 rounded-2xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform flex items-center justify-center text-rose-400">
              {/* Placeholder for Image */}
              <ImageIcon size={48} />
              <span className="ml-2">Ảnh Năm 1</span>
            </div>
          </div>
        </ScrollSection>

        {/* Year 2 */}
        <ScrollSection className="flex flex-col md:flex-row-reverse items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-block p-4 bg-rose-100 rounded-full mb-4 text-rose-600">
              <Heart size={32} />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-rose-700">Năm Thứ Hai</h2>
            <p className="text-lg leading-relaxed text-stone-600">
              Cùng nhau trải qua những thử thách. Có giận hờn, có cãi vã, nhưng sau tất cả chúng ta càng hiểu và thương nhau hơn.
              Những chuyến đi xa cùng nhau thật đáng nhớ.
            </p>
          </div>
          <div className="flex-1">
            <div className="aspect-video bg-rose-200 rounded-2xl shadow-xl transform -rotate-3 hover:rotate-0 transition-transform flex items-center justify-center text-rose-400">
              <ImageIcon size={48} />
              <span className="ml-2">Ảnh Năm 2</span>
            </div>
          </div>
        </ScrollSection>

        {/* Year 3 */}
        <ScrollSection className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-right">
            <div className="inline-block p-4 bg-rose-100 rounded-full mb-4 text-rose-600">
              <Music size={32} />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-rose-700">Năm Thứ Ba</h2>
            <p className="text-lg leading-relaxed text-stone-600">
              Trưởng thành và gắn bó. Ba năm không phải quá dài nhưng đủ để ta biết mình cần nhau.
              Cảm ơn em vì đã luôn ở bên anh.
            </p>
          </div>
          <div className="flex-1">
            <div className="aspect-video bg-rose-200 rounded-2xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform flex items-center justify-center text-rose-400">
              <ImageIcon size={48} />
              <span className="ml-2">Ảnh Năm 3</span>
            </div>
          </div>
        </ScrollSection>
      </div>

      {/* MESSAGE SECTION */}
      <section className="min-h-[80vh] flex items-center justify-center relative z-10 py-20 bg-rose-900 text-white mt-20">
        <ScrollSection className="max-w-2xl text-center px-6">
          <Heart className="w-16 h-16 mx-auto mb-8 text-rose-300 animate-pulse" fill="currentColor" />
          <h2 className="text-4xl font-bold mb-8">Lời Nhắn Gửi</h2>
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20">
            <p className="text-xl md:text-2xl italic leading-relaxed font-serif">
              "Chúc mừng kỷ niệm 3 năm của chúng ta. Anh mong rằng chặng đường phía trước, dù bằng phẳng hay chông gai,
              chúng ta vẫn sẽ nắm chặt tay nhau như ngày đầu tiên. Yêu em!"
            </p>
            <p className="mt-8 font-bold text-lg">- Anh của em -</p>
          </div>
        </ScrollSection>
      </section>
    </main>
  );
}