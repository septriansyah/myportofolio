/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import emailjs from "@emailjs/browser";
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Instagram, 
  Mail, 
  ExternalLink, 
  Code2, 
  Palette, 
  GraduationCap, 
  Briefcase, 
  Send,
  ChevronRight,
  Menu,
  X,
  Layout,
  Smartphone,
  Globe,
  Monitor,
  Database,
  Layers,
  Cpu,
  Figma,
  Wind,
  Terminal,
  Box,
  Zap,
  Coffee,
  Star,
  Sparkles,
  Gamepad2,
  Trophy,
  RotateCcw
} from 'lucide-react';

// --- Snake Game Component ---
const SnakeGame = () => {
  const GRID_SIZE = 15;
  const INITIAL_SNAKE = [{ x: 7, y: 7 }];
  const INITIAL_DIRECTION = { x: 0, y: -1 };
  const INITIAL_FOOD = { x: 3, y: 3 };

  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const moveSnake = useCallback(() => {
    if (gameOver || !isPlaying) return;

    const newSnake = [...snake];
    const head = { ...newSnake[0] };
    head.x += direction.x;
    head.y += direction.y;

    // Check collisions
    if (
      head.x < 0 || head.x >= GRID_SIZE ||
      head.y < 0 || head.y >= GRID_SIZE ||
      newSnake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
      setGameOver(true);
      setIsPlaying(false);
      if (score > highScore) setHighScore(score);
      return;
    }

    newSnake.unshift(head);

    // Check food
    if (head.x === food.x && head.y === food.y) {
      setScore(s => s + 10);
      setFood({
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      });
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, direction, food, gameOver, isPlaying, score, highScore]);

  useEffect(() => {
    const interval = setInterval(moveSnake, 150);
    return () => clearInterval(interval);
  }, [moveSnake]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction.y === 0) setDirection({ x: 0, y: -1 }); break;
        case 'ArrowDown': if (direction.y === 0) setDirection({ x: 0, y: 1 }); break;
        case 'ArrowLeft': if (direction.x === 0) setDirection({ x: -1, y: 0 }); break;
        case 'ArrowRight': if (direction.x === 0) setDirection({ x: 1, y: 0 }); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(INITIAL_FOOD);
    setGameOver(false);
    setScore(0);
    setIsPlaying(true);
  };

  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-[2rem] border border-slate-200 shadow-lg max-w-sm mx-auto">
      <div className="flex justify-between w-full mb-4">
        <div className="flex items-center gap-2">
          <Trophy size={16} className="text-amber-500" />
          <span className="font-bold text-slate-600 text-sm">Score: {score}</span>
        </div>
        <div className="text-slate-400 text-xs font-medium">Best: {highScore}</div>
      </div>

      <div 
        className="grid bg-slate-50 border border-slate-200 rounded-xl overflow-hidden"
        style={{ 
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          width: '200px',
          height: '200px'
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);
          const isSnake = snake.some(s => s.x === x && s.y === y);
          const isHead = snake[0].x === x && snake[0].y === y;
          const isFood = food.x === x && food.y === y;

          return (
            <div 
              key={i} 
              className={`w-full h-full border-[0.5px] border-slate-100 flex items-center justify-center
                ${isSnake ? (isHead ? 'bg-emerald-500 rounded-sm' : 'bg-emerald-400/80') : ''}
                ${isFood ? 'bg-rose-500 rounded-full scale-75 animate-pulse' : ''}
              `}
            />
          );
        })}
      </div>

      <div className="mt-6 flex gap-4">
        {!isPlaying && !gameOver ? (
          <button 
            onClick={() => setIsPlaying(true)}
            className="px-6 py-2 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-700 transition-all text-xs flex items-center gap-2"
          >
            <Gamepad2 size={16} /> Start Game
          </button>
        ) : gameOver ? (
          <button 
            onClick={resetGame}
            className="px-6 py-2 bg-rose-600 text-white rounded-full font-bold hover:bg-rose-700 transition-all text-xs flex items-center gap-2"
          >
            <RotateCcw size={16} /> Try Again
          </button>
        ) : (
          <div className="text-slate-400 text-[10px] italic font-medium">Use Arrow Keys to Move</div>
        )}
      </div>
    </div>
  );
};

// --- Main App Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
      <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-full px-6 md:px-8 py-3 flex justify-between items-center shadow-sm">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl md:text-2xl font-serif italic font-bold text-slate-900"
        >
          Dewa Ahmad.
        </motion.div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-slate-600 hover:text-emerald-600 transition-colors font-medium text-[10px] tracking-[0.2em] uppercase"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-4 text-xs font-bold text-slate-600 hover:text-emerald-600 hover:bg-slate-50 rounded-2xl tracking-widest uppercase"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ title, subtitle, color = "emerald" }: { title: string; subtitle?: string; color?: string }) => (
  <div className="mb-10">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-serif italic font-bold text-slate-900 mb-6"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-slate-600 max-w-2xl text-lg leading-relaxed font-light"
      >
        {subtitle}
      </motion.p>
    )}
    <div className={`h-1 w-24 bg-${color}-500 mt-6 rounded-full`} />
  </div>
);

const ExperienceCard = ({ title, org, date, desc, delay, color = "emerald" }: any) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="relative pl-8 pb-12 border-l border-slate-200 last:pb-0"
  >
    <br />
    <div className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-${color}-500 border-4 border-[#faf9f6] shadow-sm`} />
    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <span className={`text-[10px] font-bold text-${color}-600 mb-2 block tracking-[0.2em] uppercase`}>{date}</span>
      <h3 className="text-2xl font-serif italic font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-700 font-medium mb-4 text-lg">{org}</p>
      <ul className="space-y-3">
        {desc.map((item: string, i: number) => (
          <li key={i} className="text-slate-600 flex items-start leading-relaxed text-sm">
            <ChevronRight size={18} className={`text-${color}-400 mt-0.5 mr-3 flex-shrink-0`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

const TechMarquee = () => {
  const techs = [
    { name: "React", icon: <Code2 />, color: "#61DAFB" },
    { name: "TypeScript", icon: <Terminal />, color: "#3178C6" },
    { name: "Tailwind", icon: <Wind />, color: "#06B6D4" },
    { name: "Figma", icon: <Figma />, color: "#F24E1E" },
    { name: "Node.js", icon: <Database />, color: "#339933" },
    { name: "Next.js", icon: <Globe />, color: "#000000" },
    { name: "PostgreSQL", icon: <Database />, color: "#4169E1" },
    { name: "Docker", icon: <Box />, color: "#2496ED" },
    { name: "Git", icon: <Github />, color: "#F05032" },
    { name: "Python", icon: <Cpu />, color: "#3776AB" },
    { name: "Vite", icon: <Zap />, color: "#646CFF" },
    { name: "JavaScript", icon: <Coffee />, color: "#F7DF1E" },
  ];

  return (
    <div className="py-16 bg-white border-y border-slate-100 overflow-hidden relative">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...techs, ...techs].map((tech, index) => (
          <div key={index} className="flex items-center gap-4 px-12">
            <div 
              className="w-14 h-14 rounded-2xl bg-slate-50 shadow-sm flex items-center justify-center transition-transform hover:scale-110"
              style={{ color: tech.color }}
            >
              {React.cloneElement(tech.icon as React.ReactElement, { size: 28 })}
            </div>
            <span className="text-xl font-bold text-slate-800 font-serif italic">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProjectsCarousel = () => {
  const projects = [
    {
      title: "Vibrant Booth",
      desc: "An AI-powered web photobooth platform that allows users to capture, customize, and generate creative photo strips instantly. Designed as a SaaS product with modern UI and seamless user experience.",
      image: "/img/vibrant.png",
      tags: ["React", "Node.js", "Stripe"],
      color: "emerald",
      link: "https://github.com/septriansyah/Vibrant-Booth",
    },
    {
      title: "Website Asrama Bumi Siliwangi UPI",
      desc: "A dynamic website developed to manage dormitory information, announcements, and student activities. Built with a focus on usability, accessibility, and efficient data management.",
      image: "/img/asrama.png",
      tags: ["Laravel", "MySQL", "Tailwind"],
      color: "amber",
      link: "https://github.com/septriansyah/Website-Asrama"
    },
    {
      title: "UI EduGrade",
      desc: "A comprehensive library of reusable UI components for Figma.",
      image: "/img/UI.png",
      tags: ["Figma", "UI Design", "UX"],
      color: "rose",
      link:"https://www.figma.com/design/68uDY6VP6DzcIT6kusnuQf/UI-EduGrade?node-id=0-1&t=nDjRU9VlbXH55pqE-1"
    },
    {
      title: "Portfolio Website",
      desc: "Modern and responsive portfolio for creative professionals.",
      image: "/img/porto.png",
      tags: ["React", "Framer Motion", "Tailwind"],
      color: "indigo",
      link: "https://github.com/septriansyah/myportofolio"
    }
  ];

  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  return (
    <>
      {/* Projects Carousel */}
      <section id="projects" className="py-16 bg-slate-50 px-4 overflow-hidden dot-texture border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
        <SectionHeading 
          title="Featured Projects" 
          subtitle="A selection of my recent work in web development and design. Drag to explore."
          color="amber"
        />
        
        <motion.div ref={carouselRef} className="cursor-grab active:cursor-grabbing overflow-hidden">
          <motion.div 
            drag="x" 
            dragConstraints={{ right: 0, left: -width }}
            className="flex gap-10"
          >
            {projects.map((project, index) => (
              <motion.div 
                key={index} 
                className="min-w-[320px] md:min-w-[400px] bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 group shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6">
                  <div className="flex gap-2 mb-6">
                    {project.tags.map((tag, i) => (
                      <span key={i} className={`px-4 py-1.5 bg-${project.color}-50 text-${project.color}-700 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-3xl font-serif italic font-bold text-slate-900 mb-4">{project.title}</h3>
                  <p className="text-slate-600 mb-8 leading-relaxed line-clamp-2 text-sm">{project.desc}</p>
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 text-${project.color}-600 font-bold hover:gap-5 transition-all text-xs uppercase tracking-widest`}
                  >
                    View Project <ExternalLink size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  </>
);
};

export default function App() {
  const formRef = useRef();

const sendEmail = (e) => {
  e.preventDefault();

  emailjs
    .sendForm(
      "service_5uo1s0q",
      "template_in6a6mn",
      formRef.current,
      "FIVhbvek6V484j5zR"
    )
    .then(() => {
      alert("Pesan berhasil dikirim!");
      formRef.current.reset();
    })
    .catch(() => {
      alert("Gagal mengirim pesan");
    });
};
  const experiences = [
    {
      title: "Sekretaris Umum",
      org: "Asrama Mahasiswa Bumi Siliwangi",
      date: "Desember 2025 - 2026",
      color: "emerald",
      desc: [
        "Bertanggung jawab atas seluruh administrasi kesekretariatan asrama.",
        "Pengarsipan, surat-menyurat, dan pengelolaan data penghuni."
      ]
    },
    {
      title: "Staff Divisi Desain Kreatif",
      org: "Kabinet Asrama Bumi Siliwangi Adhyayana",
      date: "November 2024 - Sekarang",
      color: "amber",
      desc: [
        "Mengembangkan materi visual yang inovatif untuk branding asrama.",
        "Berkontribusi dalam pembuatan konten publikasi acara yang menarik."
      ]
    },
    {
      title: "Ketua Umum",
      org: "Forum Intelektual Darel Azhar",
      date: "Maret 2023 - 2024",
      color: "rose",
      desc: [
        "Memimpin dan mengkoordinasikan tim dalam merancang program kerja strategis.",
        "Meningkatkan partisipasi dan engagement anggota melalui pendekatan target-oriented."
      ]
    }
  ];

  const skills = [
    { name: "Web Development", icon: <Code2 size={24} />, color: "emerald", items: ["React", "TypeScript", "Tailwind CSS", "Node.js"] },
    { name: "UI/UX Design", icon: <Palette size={24} />, color: "amber", items: ["Figma", "Prototyping", "User Research", "Wireframing"] },
    { name: "Creative Design", icon: <Layout size={24} />, color: "rose", items: ["Visual Branding", "Content Creation", "Adobe Suite", "Canva"] }
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] transition-colors duration-500">
      <Navbar />
<br />
      {/* Hero Section */}
      <section id="home" className="relative pt-16 pb-8 md:pt-20 md:pb-12 px-4 overflow-hidden dot-texture">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
          <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-200 rounded-full blur-[100px]" />
          <div className="absolute bottom-5 right-10 w-96 h-96 bg-amber-200 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-rose-200 rounded-full blur-[80px]" />
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-20 text-center md:text-left">
            <div className="flex-[1.2]">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-block px-6 py-2 mb-8 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold tracking-[0.3em] uppercase border border-emerald-100"
              >
                Available for Collaboration
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-8xl font-serif italic font-bold text-slate-900 mb-8 tracking-tight leading-[1.1]"
              >
                Dewa Ahmad <span className="text-emerald-600 block">Septriansyah</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl text-slate-600 mb-12 max-w-2xl leading-relaxed font-light"
              >
                Web Developer & UI/UX Designer based in Bandung. Crafting digital experiences with precision and creativity.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap justify-center md:justify-start gap-6"
              >
                <a 
                  href="https://wa.me/6287717630260" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-5 bg-slate-900 text-white rounded-full font-bold hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200 flex items-center gap-3 text-xs uppercase tracking-widest"
                >
                  Let's Talk <Send size={18} />
                </a>
                <div className="flex gap-4">
                  <a href="https://github.com/septriansyah" target="_blank" rel="noopener noreferrer" className="p-5 bg-white border border-slate-200 rounded-full text-slate-600 hover:text-emerald-600 transition-all shadow-sm">
                    <Github size={24} />
                  </a>
                  <a href="https://instagram.com/dntyquotly" target="_blank" rel="noopener noreferrer" className="p-5 bg-white border border-slate-200 rounded-full text-slate-600 hover:text-rose-600 transition-all shadow-sm">
                    <Instagram size={24} />
                  </a>
                </div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="relative w-full max-w-[320px] group"
            >
              {/* Lanyard Strap */}
              <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-0.5 h-40 bg-slate-300 -z-10" />
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border border-slate-200 rounded-full shadow-sm flex items-center justify-center -z-10">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
              </div>

              <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden border-[8px] border-white shadow-2xl transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105">
                <img 
                  src="/img/hero.png" 
                  alt="Dewa Ahmad" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {/* ID Card Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-6 border-t border-slate-100">
                  <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-[0.2em] mb-1">ID CARD / 2026</p>
                  <p className="text-xl font-serif italic font-bold text-slate-900 leading-tight">DEWA AHMAD S.</p>
                  <p className="text-[9px] text-slate-500 font-medium tracking-widest uppercase mt-1">WEB DEV & UI/UX</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Marquee */}
      <TechMarquee />

      {/* About Section */}
      <section id="about" className="py-16 bg-white px-4 dot-texture">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="aspect-[4/5] rounded-[3rem] bg-slate-50 overflow-hidden border-[12px] border-white shadow-2xl transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-105">
                <img 
                  src="/img/about.jpg" 
                  alt="Dewa Ahmad" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[2rem] shadow-2xl border border-slate-100 hidden lg:block max-w-[280px]">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <GraduationCap size={28} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-1">Education</p>
                    <p className="text-sm font-bold text-slate-900 leading-tight">Universitas Pendidikan Indonesia</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <div>
              <SectionHeading 
                title="About Me" 
                subtitle="I am a passionate student at Universitas Pendidikan Indonesia with a strong interest in technology and design. My journey in web development and UI/UX design is driven by a desire to create functional and aesthetically pleasing digital solutions."
                color="emerald"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
                <div className="p-8 rounded-[2rem] bg-white border border-slate-100 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6">
                    <Code2 size={24} />
                  </div>
                  <h4 className="text-xl font-serif italic font-bold text-slate-900 mb-2">Web Dev</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">Building robust and scalable web applications with modern tech.</p>
                </div>
                <div className="p-8 rounded-[2rem] bg-white border border-slate-100 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 mb-6">
                    <Palette size={24} />
                  </div>
                  <h4 className="text-xl font-serif italic font-bold text-slate-900 mb-2">UI/UX</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">Designing user-centric interfaces and seamless experiences.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Game Section */}
      <section className="py-8 bg-slate-50 px-4 dot-texture">
        <div className="max-w-7xl mx-auto text-center">
          <SectionHeading 
            title="Take a Break" 
            subtitle="Take a moment to relax and play a quick game of Snake. Use your arrow keys to control the snake!"
            color="rose"
          />
          <SnakeGame />
        </div>
      </section>

      {/* Projects Carousel */}
      <ProjectsCarousel />

      {/* Experience Section */}
      <section id="experience" className="py-16 bg-white px-4 dot-texture">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            title="Organizational Experience" 
            subtitle="My leadership and administrative roles have shaped my professional character and teamwork skills."
            color="rose"
          />
          <div className="max-w-4xl">
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} {...exp} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 bg-slate-50 px-4 dot-texture border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            title="My Expertise" 
            subtitle="The tools and technologies I use to bring ideas to life."
            color="indigo"
          />
          <div className="grid md:grid-cols-3 gap-10">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-10 rounded-[2.5rem] bg-white border border-slate-100 hover:shadow-xl transition-all group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-${skill.color}-50 shadow-sm flex items-center justify-center text-${skill.color}-600 mb-8 group-hover:scale-110 transition-transform`}>
                  {skill.icon}
                </div>
                <h3 className="text-2xl font-serif italic font-bold text-slate-900 mb-6">{skill.name}</h3>
                <div className="flex flex-wrap gap-3">
                  {skill.items.map((item, i) => (
                    <span key={i} className={`px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-bold text-slate-600 tracking-wider uppercase`}>
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-slate-900 px-4 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-600/5 blur-[120px] -z-0" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-rose-600/5 blur-[120px] -z-0" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-24">
            <div>
              <h2 className="text-5xl md:text-6xl font-serif italic font-bold text-white mb-8 leading-tight">Let's build something <span className="text-emerald-400">extraordinary</span> together.</h2>
              <p className="text-slate-400 mb-12 text-xl font-light leading-relaxed">
                I'm always open to new opportunities, collaborations, or just a friendly chat about design and tech.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6 text-slate-300">
                  <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-emerald-400">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-1">Email Me</p>
                    <p className="text-lg font-medium">septriansyah31@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-slate-300">
                  <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-rose-400">
                    <Globe size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-1">Location</p>
                    <p className="text-lg font-medium">Bandung, Indonesia</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-5 mt-16">
                <a href="https://github.com/septriansyah" target="_blank" rel="noopener noreferrer" className="p-5 bg-slate-800 rounded-2xl text-slate-400 hover:text-white hover:bg-slate-700 transition-all shadow-lg">
                  <Github size={24} />
                </a>
                <a href="https://instagram.com/dntyquotly" target="_blank" rel="noopener noreferrer" className="p-5 bg-slate-800 rounded-2xl text-slate-400 hover:text-white hover:bg-slate-700 transition-all shadow-lg">
                  <Instagram size={24} />
                </a>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl"
            >
              <form ref={formRef} onSubmit={sendEmail} className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Name</label>
                    <input 
                        name="user_name"
                        type="text" 
                        placeholder="Your Name" 
                        required
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200"
                      />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email</label>
                    <input 
                        name="user_email"
                        type="email" 
                        placeholder="Email Address" 
                        required
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200"
                      />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Subject</label>
                  <input 
                    name="subject"
                    type="text" 
                    placeholder="Collaboration / Project" 
                    required
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Message</label>
                  <textarea 
                    name="message"
                    rows={5} 
                    placeholder="Tell me about your project..." 
                    required
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200"
                  />
                </div>
                <button 
                    type="submit"
                    className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 group text-xs uppercase tracking-[0.2em]"
                  > Send
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-slate-900 border-t border-slate-800 px-4 text-center">
        <p className="text-slate-500 text-[10px] tracking-widest uppercase">
          © {new Date().getFullYear()} Dewa Ahmad Septriansyah. Built with Passion & Code.
        </p>
      </footer>
    </div>
  );
}
