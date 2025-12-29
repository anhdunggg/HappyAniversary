'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Cat, Heart } from 'lucide-react';

const pages = [
    {
        id: 1,
        title: "Bé Mèo Đầu Tiên",
        desc: "Ngày đầu tiên đón bé về, nhỏ xíu và cute xỉu!",
        image: "https://placedog.net/400/500?id=1"
    },
    {
        id: 2,
        title: "Bé Mèo Thứ Hai",
        desc: "Thành viên mới gia nhập, quậy phá nhưng rất tình cảm.",
        image: "https://placedog.net/400/500?id=2"
    },
    {
        id: 3,
        title: "Khoảnh Khắc Bên Nhau",
        desc: "Hai đứa nó ngủ chung nè, cưng chưa!",
        image: "https://placedog.net/400/500?id=3"
    }
];

export default function PhotoAlbum() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipping, setIsFlipping] = useState(false);
    const [direction, setDirection] = useState(0); // 1 = Next, -1 = Prev
    const isFirstRender = useRef(true);

    useEffect(() => {
        // After mount, mark as not first render so animations can play
        isFirstRender.current = false;
    }, []);

    // Make sure to reset to page 0 whenever the album opens
    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(0);
        }
    }, [isOpen]);

    const totalPages = pages.length;

    const nextPage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isFlipping) return;

        if (currentIndex < totalPages - 1) {
            setIsFlipping(true);
            setDirection(1);
            setTimeout(() => {
                setCurrentIndex(prev => prev + 1);
                setIsFlipping(false);
            }, 600); // Wait for transition
        } else {
            setIsOpen(false);
        }
    };

    const prevPage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isFlipping) return;

        if (currentIndex > 0) {
            setIsFlipping(true);
            setDirection(-1);
            setTimeout(() => {
                setCurrentIndex(prev => prev - 1);
                setIsFlipping(false);
            }, 600);
        } else {
            setIsOpen(false);
        }
    };

    return (
        <div className="w-full flex justify-center py-20 relative z-10 perspective-[2000px]">
            <AnimatePresence mode="wait">
                {!isOpen ? (
                    <motion.div
                        key="cover"
                        layoutId="album-cover"
                        onClick={() => setIsOpen(true)}
                        initial={isFirstRender.current ? { rotateY: 0, opacity: 1, scale: 0.9 } : { rotateY: -180, opacity: 0, scale: 0.9 }}
                        animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                        exit={{ rotateY: -180, opacity: 0, scale: 0.9, transition: { duration: 0.6 } }}
                        transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
                        className="cursor-pointer mx-auto w-full max-w-md aspect-[3/4] bg-gradient-to-br from-[#2d1b4e] to-black border-4 border-fuchsia-500/50 rounded-r-2xl rounded-l-md shadow-[20px_20px_60px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center p-8 text-center relative overflow-hidden group origin-left"
                    >
                        {/* Decorative spine */}
                        <div className="absolute left-0 top-0 bottom-0 w-8 bg-[#1a0b2e] border-r border-fuchsia-900/50" />

                        <div className="relative z-10 space-y-6">
                            <div className="w-32 h-32 mx-auto bg-fuchsia-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-fuchsia-400/30 group-hover:scale-110 transition-transform duration-500">
                                <Cat size={64} className="text-fuchsia-300" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-fuchsia-300 font-[family-name:var(--font-great-vibes)]">
                                Mình đã cùng nhau nuôi 2 bé mèo đáng yêu
                            </h2>
                            <p className="text-purple-300/80 text-sm animate-pulse">
                                (Nhấn để mở album)
                            </p>
                        </div>

                        {/* Decorative corner */}
                        <div className="absolute top-4 right-4 text-fuchsia-500/20">
                            <Heart size={40} fill="currentColor" />
                        </div>
                        <div className="absolute bottom-4 right-4 text-fuchsia-500/20">
                            <Cat size={30} />
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="open-book"
                        initial={{ opacity: 0, scale: 0.9, rotateY: 0 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                        className="relative w-full max-w-5xl h-[500px] flex justify-center items-center perspective-[2000px]"
                    >
                        {/* THE OPEN BOOK SPREAD */}
                        <div className="relative flex w-full h-full shadow-2xl rounded-xl overflow-hidden bg-[#1a0b2e]">

                            {/* LEFT PAGE (Current Image) */}
                            <div className="flex-1 relative border-r border-black/30 overflow-hidden bg-black">
                                <img
                                    src={pages[currentIndex].image}
                                    className="w-full h-full object-cover opacity-90"
                                    alt="Left Page"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40 pointer-events-none" />

                                {/* Previous Button Area */}
                                <button
                                    onClick={prevPage}
                                    disabled={isFlipping}
                                    className="absolute left-0 top-0 bottom-0 w-20 disabled:hover:bg-transparent transition-colors z-20 flex items-center justify-start pl-4 group outline-none"
                                >
                                    <div className="p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ChevronLeft />
                                    </div>
                                </button>
                            </div>

                            {/* RIGHT PAGE (Current Text) */}
                            <div className="flex-1 relative bg-[#2d1b4e] p-8 flex flex-col justify-center items-center text-center">
                                <h3 className="text-4xl font-[family-name:var(--font-great-vibes)] text-fuchsia-300 mb-6">
                                    {pages[currentIndex].title}
                                </h3>
                                <p className="text-purple-200 text-lg italic font-serif leading-relaxed mb-8">
                                    "{pages[currentIndex].desc}"
                                </p>
                                <Heart className="w-8 h-8 text-fuchsia-500 animate-pulse" fill="currentColor" />

                                <div className="absolute bottom-4 right-4 text-xs text-purple-400">
                                    {currentIndex + 1} / {totalPages}
                                </div>

                                {/* Next Button Area */}
                                <button
                                    onClick={nextPage}
                                    disabled={isFlipping}
                                    className="absolute right-0 top-0 bottom-0 w-20 disabled:hover:bg-transparent transition-colors z-20 flex items-center justify-end pr-4 group outline-none"
                                >
                                    <div className="p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ChevronRight />
                                    </div>
                                </button>

                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-4 right-4 text-xs text-purple-400 hover:text-white z-30"
                                >
                                    Close
                                </button>
                            </div>

                            {/* FLIPPING PAGE LAYER */}
                            <AnimatePresence>
                                {isFlipping && direction === 1 && (
                                    /* Flipping Forward: Right page lifts and goes left */
                                    <motion.div
                                        initial={{ rotateY: 0, zIndex: 50, transformOrigin: "left" }}
                                        animate={{ rotateY: -180 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.6, ease: "easeInOut" }}
                                        className="absolute top-0 bottom-0 right-0 w-1/2 h-full bg-[#2d1b4e] backface-hidden shadow-2xl border-l border-black/20"
                                        style={{ transformStyle: "preserve-3d" }}
                                    >
                                        <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center backface-hidden">
                                            <h3 className="text-4xl font-[family-name:var(--font-great-vibes)] text-fuchsia-300 mb-6">{pages[currentIndex].title}</h3>
                                            <p className="text-purple-200 text-lg italic">{pages[currentIndex].desc}</p>
                                        </div>
                                        <div
                                            className="absolute inset-0 w-full h-full bg-black backface-visible rotate-y-180 overflow-hidden p-0"
                                            style={{ transform: "rotateY(180deg)" }}
                                        >
                                            <img
                                                src={pages[currentIndex + 1].image}
                                                className="w-full h-full object-cover opacity-90"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/40" />
                                        </div>
                                    </motion.div>
                                )}

                                {isFlipping && direction === -1 && (
                                    /* Flipping Backward */
                                    <motion.div
                                        initial={{ rotateY: 0, zIndex: 50, transformOrigin: "right" }}
                                        animate={{ rotateY: 180 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.6, ease: "easeInOut" }}
                                        className="absolute top-0 bottom-0 left-0 w-1/2 h-full bg-black backface-hidden shadow-2xl border-r border-black/20"
                                        style={{ transformStyle: "preserve-3d" }}
                                    >
                                        <div className="absolute inset-0 overflow-hidden backface-hidden">
                                            <img
                                                src={pages[currentIndex].image}
                                                className="w-full h-full object-cover opacity-90"
                                            />
                                        </div>
                                        <div
                                            className="absolute inset-0 bg-[#2d1b4e] p-8 flex flex-col justify-center items-center text-center backface-visible overflow-hidden"
                                            style={{ transform: "rotateY(180deg)" }}
                                        >
                                            <h3 className="text-4xl font-[family-name:var(--font-great-vibes)] text-fuchsia-300 mb-6">{pages[currentIndex - 1].title}</h3>
                                            <p className="text-purple-200 text-lg italic">{pages[currentIndex - 1].desc}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>



                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
