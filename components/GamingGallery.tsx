'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sword, Shield, Trophy, Star, ChevronLeft, ChevronRight, Zap } from 'lucide-react';

const games = [
    {
        id: 1,
        title: "Trận Thắng Đầu Tiên",
        sub: "MVP - 15/2/8",
        desc: "Gánh team còng lưng nhưng mà vui! Chiến công đầu thuộc về chúng ta.",
        image: "https://placedog.net/600/400?id=10", // Placeholder
        rank: "Vàng IV"
    },
    {
        id: 2,
        title: "Duo Leo Rank",
        sub: "Chuỗi Thắng 10",
        desc: "Cùng nhau leo lên Cao Thủ. Không sợ địch mạnh, chỉ cần đồng đội là em.",
        image: "https://placedog.net/600/400?id=11",
        rank: "Kim Cương I"
    },
    {
        id: 3,
        title: "Skin Đôi",
        sub: "Tiệc Bãi Biển",
        desc: "Đẹp đôi từ ngoài đời vào trong game. Skin xịn + Skill đỉnh = Ez Win.",
        image: "https://placedog.net/600/400?id=12",
        rank: "Tinh Anh III"
    },
    {
        id: 4,
        title: "Highlight Của Em",
        sub: "Mega Kill",
        desc: "Pha này xử lý quá đỉnh lun. Cả team địch phải trầm trồ!",
        image: "https://placedog.net/600/400?id=13",
        rank: "Cao Thủ"
    }
];

export default function GamingGallery() {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % games.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + games.length) % games.length);
    };

    return (
        <div className="w-full max-w-5xl mx-auto py-20 px-4">
            {/* LQ Mobile Style Title */}
            <div className="text-center mb-16 relative">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    className="inline-block"
                >
                    <div className="flex items-center justify-center gap-4 mb-2">
                        <div className="h-[2px] w-12 bg-gradient-to-l from-yellow-400 to-transparent" />
                        <Star className="text-yellow-400 w-6 h-6 fill-yellow-400 animate-spin-slow" />
                        <div className="h-[2px] w-12 bg-gradient-to-r from-yellow-400 to-transparent" />
                    </div>

                    <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-serif">
                        Huyền Thoại
                    </h2>
                    <h3 className="text-xl md:text-2xl text-blue-300 font-bold uppercase tracking-[0.2em] mt-2 drop-shadow-md">
                        LIÊN QUÂN CÙNG NGƯỜI ẤY
                    </h3>
                </motion.div>
            </div>

            {/* Hero Card Container */}
            <div className="relative mx-auto max-w-4xl">
                {/* Decorative Border Frame - AOV Style */}
                <div className="absolute -inset-1 bg-gradient-to-b from-yellow-500 via-blue-900 to-blue-900 rounded-tr-[40px] rounded-bl-[40px] opacity-80 blur-sm" />

                <div className="relative bg-[#0f111a] border-2 border-yellow-600/50 rounded-tr-[40px] rounded-bl-[40px] overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)]">

                    {/* Top decorative bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent z-20 opacity-80" />

                    {/* Main Image Area */}
                    <div className="relative aspect-[16/9] md:aspect-[21/9] group overflow-hidden">
                        <motion.img
                            key={activeIndex}
                            src={games[activeIndex].image}
                            initial={{ scale: 1.1, filter: "brightness(0.5)" }}
                            animate={{ scale: 1, filter: "brightness(1)" }}
                            transition={{ duration: 0.6 }}
                            className="w-full h-full object-cover"
                        />

                        {/* Vignette & Gradients */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1420] via-transparent to-transparent opacity-90" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1420]/80 via-transparent to-[#0f1420]/80 opacity-60" />

                        {/* Navigation Arrows (Diamond Style) */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#0f1420]/80 border border-yellow-500/50 transform rotate-45 flex items-center justify-center hover:bg-blue-900/80 hover:border-yellow-400 transition-all z-30 group"
                        >
                            <ChevronLeft className="transform -rotate-45 text-yellow-100 group-hover:scale-125 transition-transform" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#0f1420]/80 border border-yellow-500/50 transform rotate-45 flex items-center justify-center hover:bg-blue-900/80 hover:border-yellow-400 transition-all z-30 group"
                        >
                            <ChevronRight className="transform -rotate-45 text-yellow-100 group-hover:scale-125 transition-transform" />
                        </button>

                        {/* Rank Badge */}
                        <div className="absolute top-6 right-8 z-20">
                            <motion.div
                                key={`rank-${activeIndex}`}
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="flex flex-col items-center"
                            >
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full p-[2px] shadow-[0_0_20px_rgba(234,179,8,0.5)] flex items-center justify-center border-4 border-yellow-900">
                                    <Trophy className="w-8 h-8 md:w-10 md:h-10 text-white fill-current drop-shadow-md" />
                                </div>
                                <span className="mt-2 text-yellow-400 font-bold uppercase text-xs md:text-sm tracking-wider drop-shadow-md bg-black/50 px-2 rounded-full border border-yellow-600/30">
                                    {games[activeIndex].rank}
                                </span>
                            </motion.div>
                        </div>
                    </div>

                    {/* Info Panel - Bottom */}
                    <div className="relative p-6 md:p-8 bg-[#0b0e14] border-t border-yellow-600/30">
                        {/* Decorative Tech Lines */}
                        <div className="absolute top-0 left-8 w-32 h-[2px] bg-yellow-500" />
                        <div className="absolute top-0 right-8 w-8 h-[2px] bg-yellow-500" />
                        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-blue-500/30" />

                        <div className="flex flex-col md:flex-row items-end justify-between gap-6 relative z-10">
                            <div className="flex-1">
                                <motion.div
                                    key={`text-${activeIndex}`}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                >
                                    <h4 className="text-yellow-500 font-bold tracking-widest text-sm mb-1 uppercase flex items-center gap-2">
                                        <Sword className="w-4 h-4" /> {games[activeIndex].sub}
                                    </h4>
                                    <h3 className="text-3xl md:text-5xl font-bold text-white uppercase font-serif tracking-wide drop-shadow-lg leading-none mb-3">
                                        {games[activeIndex].title}
                                    </h3>
                                    <p className="text-blue-200 text-sm md:text-base max-w-xl leading-relaxed italic border-l-4 border-blue-600 pl-4 py-1 bg-blue-900/10">
                                        "{games[activeIndex].desc}"
                                    </p>
                                </motion.div>
                            </div>

                            {/* Button / Action */}
                            <div className="flex items-center gap-4">
                                <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold uppercase tracking-wider skew-x-[-10deg] border border-blue-400 hover:brightness-110 hover:scale-105 transition-all shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                                    <span className="skew-x-[10deg] block">Thả Tim <Heart className="inline w-4 h-4 mb-1 text-red-500 fill-current" /></span>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Thumbnails - Hero Avatar Style */}
                <div className="flex justify-center gap-2 md:gap-4 mt-8 px-4">
                    {games.map((game, index) => (
                        <button
                            key={game.id}
                            onClick={() => setActiveIndex(index)}
                            className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full border-2 transition-all overflow-hidden ${index === activeIndex ? 'border-yellow-400 scale-110 shadow-[0_0_15px_#eab308]' : 'border-gray-700 opacity-50 hover:opacity-100 hover:border-blue-400'}`}
                        >
                            <img src={game.image} className="w-full h-full object-cover" />
                            {/* Active Ring */}
                            {index === activeIndex && (
                                <div className="absolute inset-0 border-4 border-yellow-400/50 rounded-full animate-pulse" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Footer Stats */}
            <div className="flex justify-center items-center gap-8 mt-12 text-blue-200/60 font-mono text-xs md:text-sm uppercase tracking-widest">
                <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" /> 3 Years Party
                </div>
                <div className="h-4 w-[1px] bg-blue-500/30" />
                <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Best Duo
                </div>
            </div>

        </div>
    );
}
// Helper component for icon
function Heart({ className, fill }: { className?: string, fill?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            style={{ fill: fill === 'currentColor' ? 'currentColor' : fill }}
        >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
    )
}
