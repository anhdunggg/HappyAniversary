'use client';

import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
        router.refresh();
    };

    return (
        <button
            onClick={handleLogout}
            className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-purple-900/50 backdrop-blur-md border border-purple-500/30 rounded-full text-fuchsia-300 shadow-[0_0_15px_rgba(232,121,249,0.2)] hover:bg-purple-800/50 transition-all hover:scale-105 text-sm font-medium group"
        >
            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
            Đăng xuất
        </button>
    );
}
