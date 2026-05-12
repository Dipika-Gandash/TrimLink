
import Header from '@/components/common/Header'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {

  const currentYear = new Date().getFullYear()

  return (
    <main className="min-h-screen bg-[#101b33] flex flex-col">

      <Header />

      <div className="flex-1">
        <Outlet />
      </div>

      <footer className="border-t border-white/10 bg-[#0b1224] px-4 py-8">

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="text-center md:text-left">
            <h2 className="text-2xl font-black text-white tracking-tight">
              Trim
              <span className="text-cyan-300">.</span>
              Link
            </h2>

            <p className="text-slate-400 text-sm mt-2">
              Fast, clean and modern URL shortener.
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-cyan-300 transition">
              Features
            </a>

            <a href="https://github.com/Dipika-Gandash/TrimLink"  target="_blank"
  rel="noopener noreferrer" className="hover:text-cyan-300 transition">
              Github
            </a>

            <a href="#" className="hover:text-cyan-300 transition">
              Contact
            </a>
          </div>

        </div>

        <div className="mt-6 pt-6 border-t border-white/5 text-center text-xs text-slate-500">
          © {currentYear} Trim.Link — Built with React & Tailwind CSS
        </div>

      </footer>

    </main>
  )
}

export default AppLayout