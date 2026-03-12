import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Activities from './pages/Activities';
import Faculty from './pages/Faculty';
import Members from './pages/Members';
import Teams from './pages/Teams';
import Feedback from './pages/Feedback';
import BrainBuffPage from './pages/BrainBuffPage';
import { motion, useScroll, useSpring } from 'framer-motion';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden relative">
      {/* Global Mathematical Background */}
      <div className="fixed inset-0 math-bg-global" style={{ zIndex: -10 }} />
      <div className="fixed inset-0 math-symbols-overlay-global" style={{ zIndex: -9 }} />
      <div className="fixed inset-0 equation-particles-global" style={{ zIndex: -8 }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="equation-particle-global"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${20 + Math.random() * 20}s`,
              fontSize: `${10 + Math.random() * 4}px`,
              color: `rgba(${
                Math.random() > 0.5 ? '59,130,246' : 
                Math.random() > 0.5 ? '168,85,247' : '34,211,238'
              }, ${0.05 + Math.random() * 0.1})`
            }}
          >
            {[
              '∇·E = ρ/ε₀', 'F = ma', 'PV = nRT', 'HΨ = EΨ',
              'x = [-b ± √(b²-4ac)]/2a', 'sin²θ + cos²θ = 1',
              '∫e^x dx = e^x + C', '∇×E = -∂B/∂t', 'A = πr²',
              'V = (4/3)πr³', 'E = hf', 'z = x + iy',
              'det(A - λI) = 0', 'f(x) = ∑a_n xⁿ', '∂u/∂t = α∇²u',
              'lim_{x→∞} f(x)', '∮ F·dr = 0', 'Δx·Δp ≥ ħ/2',
              'S = k ln W', 'c² = a² + b² - 2ab cos C'
            ][i % 20]}
          </div>
        ))}
      </div>

      <style jsx>{`
        .math-bg-global {
          background-color: #0a0e1a;
          background-image:
            url("data:image/svg+xml,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='150' y='150' font-size='20' font-family='Cambria Math, serif' fill='rgba(59,130,246,0.1)' text-anchor='middle'%3EE = mc²%3C/text%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg width='350' height='350' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='175' y='175' font-size='22' font-family='Cambria Math, serif' fill='rgba(168,85,247,0.08)' text-anchor='middle'%3Ee^{iπ} + 1 = 0%3C/text%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg width='280' height='280' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='140' y='140' font-size='18' font-family='Cambria Math, serif' fill='rgba(34,211,238,0.08)' text-anchor='middle'%3Eφ = (1+√5)/2%3C/text%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg width='380' height='380' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='190' y='190' font-size='16' font-family='monospace' fill='rgba(245,158,11,0.06)' text-anchor='middle'%3E∫_a^b f'(x) dx = f(b)-f(a)%3C/text%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg width='320' height='320' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='160' y='160' font-size='14' font-family='monospace' fill='rgba(16,185,129,0.06)' text-anchor='middle'%3Ef'(x)=lim_{h→0} (f(x+h)-f(x))/h%3C/text%3E%3C/svg%3E"),
            radial-gradient(ellipse at 30% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 70%, rgba(168, 85, 247, 0.06) 0%, transparent 60%),
            linear-gradient(135deg, #050914 0%, #07142a 35%, #0b1f3a 55%, #090f24 100%),
            linear-gradient(to right, rgba(59, 130, 246, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.03) 1px, transparent 1px);
          background-size: 
            300px 300px, 350px 350px, 280px 280px, 380px 380px, 320px 320px,
            100% 100%, 100% 100%, 100% 100%, 40px 40px, 40px 40px;
          background-position: 
            10% 15%, 85% 30%, 25% 65%, 70% 80%, 40% 40%,
            0 0, 0 0, 0 0, 0 0, 0 0;
        }

        .math-symbols-overlay-global {
          background-image: 
            url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50' y='50' font-size='40' font-family='Cambria Math' fill='rgba(59,130,246,0.02)' text-anchor='middle'%3E∑%3C/text%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50' y='50' font-size='36' font-family='Cambria Math' fill='rgba(168,85,247,0.02)' text-anchor='middle'%3E∫%3C/text%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50' y='50' font-size='32' font-family='Cambria Math' fill='rgba(34,211,238,0.02)' text-anchor='middle'%3Eπ%3C/text%3E%3C/svg%3E"),
            url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50' y='50' font-size='38' font-family='Cambria Math' fill='rgba(245,158,11,0.02)' text-anchor='middle'%3E∞%3C/text%3E%3C/svg%3E");
          background-size: 200px 200px, 180px 180px, 160px 160px, 190px 190px;
          background-position: 20% 25%, 75% 40%, 35% 70%, 80% 75%;
          opacity: 0.4;
        }

        .equation-particle-global {
          position: absolute;
          font-family: 'Cambria Math', serif;
          font-size: 12px;
          white-space: nowrap;
          animation: float-equation-global 25s linear infinite;
          pointer-events: none;
        }

        @keyframes float-equation-global {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% { opacity: 0.2; }
          90% { opacity: 0.2; }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-numerano-accent origin-left z-50"
        style={{ scaleX }}
      />

      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={
            <>
              <section id="home"><Home /></section>
              <section id="teams"><Teams /></section>
              <section id="activities"><Activities /></section>
              <section id="faculty"><Faculty /></section>
              <section id="members"><Members /></section>
              <section id="feedback"><Feedback /></section>
            </>
          } />
          <Route path="/brainbuff" element={<BrainBuffPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
