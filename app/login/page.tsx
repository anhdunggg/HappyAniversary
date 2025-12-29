'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  console.log("Login Page Mounted");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    // Gửi thông tin lên Supabase Auth
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login error:', error);
      const funnyErrors = [
        "Sai rồi nè, thử lại đi cưng 😜",
        "Nhập sai pass rồi, có phải Thanh hông vậy? 🤔",
        "Đừng hack nha, Dũng biết hết đó! 😎",
        "Sai quá sai, thử lại lần nữa xem nào! 🦄",
        "Không đúng, không cho vào đâu nhé! 😝",
        "Cố nhớ lại xem nào, pass dễ mà! 🥺"
      ];
      const randomError = funnyErrors[Math.floor(Math.random() * funnyErrors.length)];
      setErrorMsg(randomError);
      setLoading(false);
    } else {
      // Đăng nhập thành công -> Chuyển hướng về trang chủ
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-start px-4 bg-cover bg-center relative pl-20"
      style={{ backgroundImage: "url('https://qcycgxfglxaszrvutoqn.supabase.co/storage/v1/object/public/AniPhoto/background.png')" }}
    >
      <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 space-y-6 relative z-10 border border-white/20">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl text-rose-600 font-[family-name:var(--font-great-vibes)] py-2">Kỷ Niệm 3 Năm bên nhau của Dũng và Thanh❤️</h1>
          <p className="text-gray-500 mt-2">Liên hệ với DungAnhHa để cho phép đăng nhập, ai cho xem chùa😒</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
            <input
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {errorMsg && (
            <div className="text-rose-500 text-sm font-medium text-center bg-rose-50 p-3 rounded-xl border-2 border-rose-100 animate-bounce">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-50 transition-all"
          >
            {loading ? 'Đang kiểm tra...' : 'Mở Quà 🎁'}
          </button>
        </form>
      </div>
    </div>
  );
}