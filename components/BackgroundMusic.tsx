'use client';

import { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function BackgroundMusic() {
    const [isPlaying, setIsPlaying] = useState(true);

    return (
        <div className="fixed bottom-6 left-6 z-50">
            <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`bg-purple-900/50 backdrop-blur-md border border-purple-500/30 p-4 rounded-full text-fuchsia-300 hover:bg-purple-800/50 transition-all hover:scale-110 shadow-[0_0_15px_rgba(232,121,249,0.3)] ${isPlaying ? 'animate-pulse' : ''}`}
                title={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
            >
                {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </button>

            {isPlaying && (
                <iframe
                    width="1"
                    height="1"
                    src="https://www.youtube.com/embed/_NyX-60GWDM?autoplay=1&loop=1&playlist=_NyX-60GWDM&controls=0&showinfo=0"
                    title="Background Music"
                    allow="autoplay; encrypted-media"
                    className="absolute opacity-0 pointer-events-none top-0 left-0"
                />
            )}
        </div>
    );
}
