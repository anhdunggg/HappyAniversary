'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Calendar, Image as ImageIcon, Music } from 'lucide-react';
import ScrollSection from '@/components/ScrollSection';
import LogoutButton from '@/components/LogoutButton';
import BackgroundMusic from '@/components/BackgroundMusic';
import PhotoAlbum from '@/components/PhotoAlbum';
import GamingGallery from '@/components/GamingGallery';
import PhotoboothGallery from '@/components/PhotoboothGallery';
import Celebration from '@/components/Celebration';

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
    <main
      className="relative min-h-screen overflow-hidden font-sans text-purple-100 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(26, 11, 46, 0.7), rgba(26, 11, 46, 0.9)), url('https://qcycgxfglxaszrvutoqn.supabase.co/storage/v1/object/public/AniPhoto/kuromi_bg.webp')"
      }}
    >
      <LogoutButton />
      <BackgroundMusic />

      {/* Floating Hearts Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300/60"
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
          <Heart className="w-24 h-24 text-fuchsia-500 mx-auto mb-6 animate-bounce" fill="currentColor" />
          <h1 className="text-5xl md:text-7xl font-bold text-fuchsia-400 mb-4 tracking-tight font-[family-name:var(--font-great-vibes)]">Kỷ Niệm 3 Năm</h1>
          <p className="text-xl md:text-2xl text-purple-200 italic">"Mỗi khoảnh khắc bên em đều là phép màu"</p>
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
            <div className="inline-block p-4 bg-purple-900/50 rounded-full mb-4 text-fuchsia-400">
              <Calendar size={32} />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-fuchsia-300">Năm Đầu Tiên</h2>
            <p className="text-lg leading-relaxed text-purple-200">
              Ngày chúng ta bắt đầu câu chuyện này. Những buổi hẹn hò ngại ngùng, những tin nhắn thâu đêm.
              Khoảnh khắc anh nhận ra em chính là người anh tìm kiếm bấy lâu.
            </p>
          </div>
          <div className="flex-1">
            <div className="aspect-video bg-purple-800 rounded-2xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform flex items-center justify-center text-purple-400">
              {/* Placeholder for Image */}
              <ImageIcon size={48} />
              <span className="ml-2">Ảnh Năm 1</span>
            </div>
          </div>
        </ScrollSection>

        {/* Year 2 */}
        <ScrollSection className="flex flex-col md:flex-row-reverse items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-block p-4 bg-purple-900/50 rounded-full mb-4 text-fuchsia-400">
              <Heart size={32} />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-fuchsia-300">Năm Thứ Hai</h2>
            <p className="text-lg leading-relaxed text-purple-200">
              Cùng nhau trải qua những thử thách. Có giận hờn, có cãi vã, nhưng sau tất cả chúng ta càng hiểu và thương nhau hơn.
              Những chuyến đi xa cùng nhau thật đáng nhớ.
            </p>
          </div>
          <div className="flex-1">
            <div className="aspect-video bg-purple-800 rounded-2xl shadow-xl transform -rotate-3 hover:rotate-0 transition-transform flex items-center justify-center text-purple-400">
              <ImageIcon size={48} />
              <span className="ml-2">Ảnh Năm 2</span>
            </div>
          </div>
        </ScrollSection>

        {/* Year 3 */}
        <ScrollSection className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-right">
            <div className="inline-block p-4 bg-purple-900/50 rounded-full mb-4 text-fuchsia-400">
              <Music size={32} />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-fuchsia-300">Năm Thứ Ba</h2>
            <p className="text-lg leading-relaxed text-purple-200">
              Trưởng thành và gắn bó. Ba năm không phải quá dài nhưng đủ để ta biết mình cần nhau.
              Cảm ơn em vì đã luôn ở bên anh.
            </p>
          </div>
          <div className="flex-1">
            <div className="aspect-video bg-purple-800 rounded-2xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform flex items-center justify-center text-purple-400">
              <ImageIcon size={48} />
              <span className="ml-2">Ảnh Năm 3</span>
            </div>
          </div>
        </ScrollSection>

        {/* Cat Album Component */}
        <ScrollSection>
          <PhotoAlbum />
        </ScrollSection>

        {/* Gaming Gallery Component */}
        <ScrollSection>
          <GamingGallery />
        </ScrollSection>

        {/* Photobooth Gallery Component */}
        <ScrollSection>
          <PhotoboothGallery />
        </ScrollSection>
      </div>

      {/* MESSAGE SECTION */}
      <section className="min-h-[80vh] flex items-center justify-center relative z-10 py-20 mt-20">
        {/* Background Overlay for this section */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-[#1a0b2e] to-transparent pointer-events-none" />

        <ScrollSection className="relative max-w-3xl w-full px-4">
          <div className="relative group">
            {/* Glow effect behind the card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-[2rem] blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />

            {/* The Main Card */}
            <div className="relative bg-[#0f0518] rounded-[2rem] p-8 md:p-12 border border-purple-500/30 overflow-hidden">

              {/* Decorative Corners */}
              <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-fuchsia-500/50 rounded-tl-[2rem]" />
              <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-fuchsia-500/50 rounded-tr-[2rem]" />
              <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-fuchsia-500/50 rounded-bl-[2rem]" />
              <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-fuchsia-500/50 rounded-br-[2rem]" />

              {/* Kuromi Skull / Heart Decoration */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2">
                <Heart className="w-12 h-12 text-fuchsia-500 drop-shadow-[0_0_10px_rgba(217,70,239,0.5)] fill-current animate-pulse" />
              </div>

              {/* Card Content */}
              <div className="mt-16 text-center space-y-8 relative z-10">
                <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-fuchsia-200 to-purple-400 font-[family-name:var(--font-great-vibes)] drop-shadow-sm py-4 leading-normal">
                  Gửi Người Thương
                </h2>

                <div className="space-y-6">
                  <p className="text-xl md:text-3xl leading-loose text-purple-100/90 font-[family-name:var(--font-great-vibes)] px-4 py-2">
                    "Chúc mừng kỷ niệm 3 năm của chúng ta. Anh mong rằng chặng đường phía trước, dù bằng phẳng hay chông gai,
                    chúng ta vẫn sẽ nắm chặt tay nhau như ngày đầu tiên. Yêu em!"
                  </p>
                </div>

                <div className="pt-8 flex items-center justify-center gap-4">
                  <div className="h-[1px] w-12 bg-purple-500/50" />
                  <span className="text-fuchsia-400 font-bold text-lg uppercase tracking-[0.2em] text-shadow-glow">
                    FOREVER YOURS
                  </span>
                  <div className="h-[1px] w-12 bg-purple-500/50" />
                </div>
              </div>

              {/* Floating particles decoration */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-10 w-2 h-2 bg-purple-400 rounded-full animate-ping" />
                <div className="absolute bottom-1/3 right-12 w-2 h-2 bg-fuchsia-400 rounded-full animate-ping delay-700" />
                <div className="absolute bottom-10 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse" />
              </div>

            </div>
          </div>
        </ScrollSection>
      </section>

      {/* FINAL CELEBRATION */}
      <Celebration />

    </main>
  );
}