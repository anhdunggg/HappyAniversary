'use client';

import { motion } from 'framer-motion';
import { Camera, Sparkles } from 'lucide-react';

const strips = [
    {
        id: 1,
        date: "14/02/2023",
        color: "bg-white",
        photos: [
            "https://placedog.net/300/300?id=20",
            "https://placedog.net/300/300?id=21",
            "https://placedog.net/300/300?id=22"
        ],
        rotation: -2
    },
    {
        id: 2,
        date: "Anniversary #2",
        color: "bg-rose-50",
        photos: [
            "https://placedog.net/300/300?id=23",
            "https://placedog.net/300/300?id=24",
            "https://placedog.net/300/300?id=25"
        ],
        rotation: 3
    },
    {
        id: 3,
        date: "Giáng Sinh Vui Vẻ",
        color: "bg-blue-50",
        photos: [
            "https://placedog.net/300/300?id=26",
            "https://placedog.net/300/300?id=27",
            "https://placedog.net/300/300?id=28"
        ],
        rotation: -1
    }
];

export default function PhotoboothGallery() {
    return (
        <div className="w-full py-20 relative z-10">

            {/* Title */}
            <div className="text-center mb-16 relative">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-block p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                        <Camera className="w-8 h-8 text-fuchsia-300" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-200 via-pink-200 to-purple-200 font-[family-name:var(--font-great-vibes)] drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                        Photobooth Kỷ Niệm
                    </h2>
                    <p className="text-purple-300 mt-2 font-mono text-sm tracking-widest uppercase">
                        <Sparkles className="inline w-3 h-3 mb-1" /> Cute Moments <Sparkles className="inline w-3 h-3 mb-1" />
                    </p>
                </motion.div>
            </div>

            {/* Gallery Container */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 px-4">
                {strips.map((strip, index) => (
                    <motion.div
                        key={strip.id}
                        initial={{ y: -100, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2, type: "spring", stiffness: 50 }}
                        className={`relative flex-shrink-0 w-64 ${strip.color} p-4 pb-8 shadow-2xl transform origin-top hover:z-20 transition-all duration-300 hover:scale-105`}
                        style={{ rotate: `${strip.rotation}deg` }}
                        whileHover={{ rotate: 0 }}
                    >
                        {/* Pin/Tape Effect */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-12 bg-white/30 backdrop-blur-sm border border-white/40 shadow-sm z-20 flex items-center justify-center rounded-sm">
                            <div className="w-3 h-3 rounded-full bg-gray-300 shadow-inner" />
                        </div>

                        {/* Photos Column */}
                        <div className="space-y-4">
                            {strip.photos.map((photo, pIndex) => (
                                <div key={pIndex} className="relative aspect-square overflow-hidden bg-gray-100 border border-gray-200 filter contrast-[1.1] brightness-[1.05] grayscale-[0.1]">
                                    <img src={photo} className="w-full h-full object-cover" alt="Photobooth" />
                                    <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] pointer-events-none" />
                                </div>
                            ))}
                        </div>

                        {/* Bottom Text/Date */}
                        <div className="mt-6 text-center">
                            <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-1">JAPANESE PURIKURA</p>
                            <p className="font-[family-name:var(--font-great-vibes)] text-2xl text-gray-800">{strip.date}</p>

                            {/* Barcode decorations */}
                            <div className="h-4 w-3/4 mx-auto mt-2 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/UPC-A-036000291452.svg/1200px-UPC-A-036000291452.svg.png')] bg-cover opacity-50 grayscale" />
                        </div>

                    </motion.div>
                ))}
            </div>

            {/* Scattered Decorations */}
            <div className="absolute top-1/2 left-10 hidden lg:block opacity-50 pointer-events-none">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                    <Sparkles className="w-12 h-12 text-pink-400" />
                </motion.div>
            </div>
        </div>
    );
}
