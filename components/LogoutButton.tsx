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
            className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full text-rose-600 shadow-lg hover:bg-rose-50 transition-all text-sm font-medium group"
        >
            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
            Đăng xuất
        </button>
    );
}
