import React, { useState, useEffect, useRef, createContext, useContext } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowRight,
  Code2,
  Shield,
  Layout,
  Database,
  MessageCircle,
  X,
  Send,
  Sparkles,
  Moon,
  Sun,
  Code,
  Award,
  Calendar,
  MapPin,
  Download,
  ChevronLeft,
  ChevronRight,
  User,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, TorusKnot, Environment, Stars, Text3D, Center, Float, Html } from "@react-three/drei";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Toaster, toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

// ==================== THEME CONTEXT ====================
const themes = {
  dark: {
    name: "Dark",
    bg: "#0b0f17",
    surface: "#ffffff0a",
    border: "#ffffff1a",
    text: "#ffffff",
    textMuted: "#ffffffb3",
    accent: "#4f46e5",
    accentGlow: "#4f46e580",
    gradient: "from-indigo-600 to-purple-600",
  },
  light: {
    name: "Light",
    bg: "#f8fafc",
    surface: "#0000000a",
    border: "#0000001a",
    text: "#0f172a",
    textMuted: "#334155",
    accent: "#2563eb",
    accentGlow: "#2563eb80",
    gradient: "from-blue-600 to-cyan-600",
  },
  matrix: {
    name: "Matrix",
    bg: "#000000",
    surface: "#00ff001a",
    border: "#00ff0033",
    text: "#00ff00",
    textMuted: "#00cc00",
    accent: "#00ff00",
    accentGlow: "#00ff0080",
    gradient: "from-green-500 to-lime-500",
  },
};

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === "dark") return "light";
      if (prev === "light") return "matrix";
      return "dark";
    });
  };

  return (
    <ThemeContext.Provider value={{ theme: themes[theme], toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

// ==================== DATA (enhanced) ====================
const DATA = {
  name: "Dulshan Kokila Senavirathna",
  title: "Software Engineering Undergraduate | Full-Stack Developer",
  tagline:
    "I build secure, scalable full-stack systems that solve real business problems—inventory, POS, and booking platforms.",
  location: "Sri Lanka",
  email: "kokiladulshan021@gmail.com",
  github: "https://github.com/dulshan066",
  linkedin: "https://www.linkedin.com/in/dulshan-kokila-8962b829a/",
  resumeUrl: "", // add later

  highlights: [
    {
      icon: Shield,
      title: "Security-minded",
      desc: "Auth, roles, validation, and structured data handling in real workflows.",
    },
    {
      icon: Code2,
      title: "Full-stack delivery",
      desc: "From UI to APIs to databases—end-to-end features with clean structure.",
    },
    {
      icon: Layout,
      title: "Product thinking",
      desc: "Built systems around business processes: billing, inventory, bookings, dashboards.",
    },
  ],

  projects: [
    {
      name: "Secure Jewellery Management + AI Studio",
      desc: "Secure management platform for jewellery operations with AI Studio integration.",
      bullets: [
        "Role-based access control (Admin/Staff)",
        "Inventory & sales management workflows",
        "Dashboard-style UI + structured records",
        "AI Studio module integration",
      ],
      tech: ["Full-Stack", "Auth/RBAC", "Dashboard", "AI Module"],
      repo: "https://github.com/dulshan066/SJM--Ai-Studio",
      live: "",
      featured: true,
      image: "https://via.placeholder.com/600x400", // Replace with actual screenshot
    },
    {
      name: "TechHub POS System (Mobile Shop)",
      desc: "Retail POS system to streamline billing, stock updates, and basic reporting.",
      bullets: [
        "Fast checkout flow + invoice generation",
        "Stock updates per sale",
        "Product management & sales records",
        "Admin controls / reporting-ready structure",
      ],
      tech: ["POS", "CRUD", "Inventory", "Reports"],
      repo: "https://github.com/dulshan066/techhub-pos",
      live: "",
      featured: true,
      image: "https://via.placeholder.com/600x400",
    },
    {
      name: "Ground Booking & Management System",
      desc: "Booking platform to manage reservations, schedules, and admin operations.",
      bullets: [
        "Time-slot booking logic",
        "Conflict prevention approach",
        "Admin management dashboard",
        "Clean user flow for booking management",
      ],
      tech: ["Booking", "Scheduling", "Admin Panel", "DB Relations"],
      repo: "https://github.com/dulshan066/Ground-manage",
      live: "",
      featured: false,
      image: "https://via.placeholder.com/600x400",
    },
  ],

  skills: {
    frontend: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Framer Motion"],
    backend: ["Node.js", "Express", "REST APIs", "Authentication", "JWT"],
    database: ["MySQL", "MongoDB", "Firebase"],
    tools: ["Git", "GitHub", "Postman", "VS Code", "Figma"],
    concepts: ["RBAC", "CRUD", "Validation", "MVC", "Clean Code", "Agile"],
  },

  timeline: [
    {
      year: "2022 - Present",
      title: "B.Sc. in Software Engineering",
      organization: "University of Sri Lanka",
      description: "Focus on full-stack development, algorithms, and security.",
      icon: GraduationCap,
    },
    {
      year: "2023",
      title: "Full-Stack Developer Intern",
      organization: "Tech Startup (Remote)",
      description: "Built internal tools and contributed to production systems.",
      icon: Briefcase,
    },
    {
      year: "2024",
      title: "Freelance Developer",
      organization: "Self-employed",
      description: "Developed POS and booking systems for local businesses.",
      icon: User,
    },
  ],

  achievements: [
    { title: "Hackathon Winner 2023", description: "Best Full-Stack App", icon: Award },
    { title: "Open Source Contributor", description: "Contributed to 3+ projects", icon: Github },
    { title: "Certified React Developer", description: "Meta Certification", icon: Code2 },
  ],

  testimonials: [
    {
      name: "John Doe",
      role: "CTO, Tech Corp",
      text: "Dulshan delivered a robust POS system ahead of schedule. Highly recommended!",
    },
    {
      name: "Jane Smith",
      role: "Product Manager, Startup",
      text: "Great communication and code quality. Will hire again.",
    },
  ],

  faq: [
    {
      keywords: ["internship", "opportunity", "hire", "job"],
      answer: "I'm actively looking for internships! Feel free to email me at kokiladulshan021@gmail.com.",
    },
    {
      keywords: ["project", "work", "experience"],
      answer: "I've built full-stack systems like a Jewellery Management platform, POS, and booking system. Check the Projects section!",
    },
    {
      keywords: ["skill", "technology", "stack"],
      answer: "My core skills: React, Node.js, Express, MongoDB, MySQL, and I focus on security & clean code.",
    },
    {
      keywords: ["contact", "email", "reach"],
      answer: "You can reach me at kokiladulshan021@gmail.com or via LinkedIn.",
    },
    {
      keywords: ["location", "sri lanka"],
      answer: "I'm based in Sri Lanka and open to remote internships worldwide.",
    },
  ],
  defaultAnswer: "I'm not sure about that. But you can check my projects or email me directly!",
};

// ==================== UTILS ====================
const cn = (...classes) => classes.filter(Boolean).join(" ");

// ==================== CUSTOM CURSOR ====================
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    document.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Track hover on links and buttons
    const handleLinkHoverStart = () => setLinkHovered(true);
    const handleLinkHoverEnd = () => setLinkHovered(false);

    document.querySelectorAll("a, button, [role=button]").forEach((el) => {
      el.addEventListener("mouseenter", handleLinkHoverStart);
      el.addEventListener("mouseleave", handleLinkHoverEnd);
    });

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);

      document.querySelectorAll("a, button, [role=button]").forEach((el) => {
        el.removeEventListener("mouseenter", handleLinkHoverStart);
        el.removeEventListener("mouseleave", handleLinkHoverEnd);
      });
    };
  }, []);

  if (hidden) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[100] mix-blend-difference"
      animate={{
        x: position.x - 16,
        y: position.y - 16,
        scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
    >
      <div className="w-8 h-8 border-2 border-white rounded-full" />
    </motion.div>
  );
};

// ==================== 3D BACKGROUND (enhanced) ====================
function FloatingShapes() {
  const { viewport } = useThree();
  const shapes = useRef([]);

  useFrame((state) => {
    shapes.current.forEach((shape, i) => {
      if (shape) {
        shape.rotation.x += 0.01 * (i % 2 === 0 ? 1 : -1);
        shape.rotation.y += 0.02;
      }
    });
  });

  return (
    <>
      {[...Array(10)].map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={1} floatIntensity={2}>
          <mesh
            ref={(el) => (shapes.current[i] = el)}
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
            ]}
          >
            {i % 3 === 0 && <boxGeometry args={[0.5, 0.5, 0.5]} />}
            {i % 3 === 1 && <sphereGeometry args={[0.3, 16, 16]} />}
            {i % 3 === 2 && <torusKnotGeometry args={[0.3, 0.1, 64, 8]} />}
            <meshStandardMaterial
              color={i % 2 === 0 ? "#4f46e5" : "#ff00ff"}
              emissive={i % 2 === 0 ? "#312e81" : "#831843"}
              roughness={0.2}
              metalness={0.8}
              transparent
              opacity={0.6}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function ThreeBackground() {
  const meshRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1 * mouse.current.y;
      meshRef.current.rotation.y += delta * 0.1 * mouse.current.x;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <TorusKnot
        ref={meshRef}
        args={[1, 0.3, 128, 16]}
        scale={1.5}
        position={[0, 0, -5]}
      >
        <meshStandardMaterial
          color="#4f46e5"
          wireframe
          emissive="#312e81"
          roughness={0.3}
          metalness={0.8}
        />
      </TorusKnot>
      <FloatingShapes />
      <Stars radius={30} depth={50} count={500} factor={4} saturation={0} />
    </>
  );
}

// ==================== PARTICLES BACKGROUND ====================
const ParticlesBackground = () => {
  const { theme } = useTheme();
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: { value: "transparent" },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: { enable: true, mode: "push" },
            onHover: { enable: true, mode: "repulse" },
            resize: true,
          },
          modes: {
            push: { quantity: 4 },
            repulse: { distance: 100, duration: 0.4 },
          },
        },
        particles: {
          color: { value: theme.accent },
          links: {
            color: theme.accent,
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: { default: "bounce" },
            random: false,
            speed: 2,
            straight: false,
          },
          number: {
            density: { enable: true, area: 800 },
            value: 80,
          },
          opacity: { value: 0.3 },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 -z-5"
    />
  );
};

// ==================== AI CHATBOT (enhanced) ====================
const suggestedQuestions = [
  "Tell me about your experience",
  "What are your skills?",
  "Are you open to internships?",
  "How can I contact you?",
];

function ChatBot({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Dulshan's virtual assistant. Ask me anything about his work or experience!", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userInput) => {
    for (let item of DATA.faq) {
      if (item.keywords.some((keyword) => userInput.includes(keyword))) {
        return item.answer;
      }
    }
    return DATA.defaultAnswer;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botReply = getBotResponse(input.toLowerCase());
      setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const handleSuggestionClick = (question) => {
    setInput(question);
    // Optionally auto-send after a short delay
    setTimeout(() => handleSend(), 100);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-24 right-6 z-50 w-80 rounded-2xl border border-white/20 bg-[#0b0f17]/95 backdrop-blur-xl shadow-2xl"
    >
      <div className="flex items-center justify-between border-b border-white/10 p-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-400" />
          <span className="font-semibold text-white">AI Assistant</span>
        </div>
        <button onClick={onClose} className="rounded-full p-1 hover:bg-white/10 transition">
          <X className="h-4 w-4 text-white/70" />
        </button>
      </div>

      <div className="h-80 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div key={idx} className={cn("flex", msg.sender === "user" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                msg.sender === "user"
                  ? "bg-indigo-600 text-white"
                  : "bg-white/10 text-white/80"
              )}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/10 text-white/80 rounded-2xl px-4 py-2 text-sm">
              <span className="animate-pulse">...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested questions */}
      <div className="px-3 pb-2 flex flex-wrap gap-2">
        {suggestedQuestions.map((q) => (
          <button
            key={q}
            onClick={() => handleSuggestionClick(q)}
            className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-white/70 hover:bg-white/10 transition"
          >
            {q}
          </button>
        ))}
      </div>

      <div className="border-t border-white/10 p-3 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about skills, projects..."
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
        />
        <button
          onClick={handleSend}
          className="rounded-xl bg-indigo-600 p-2 text-white hover:bg-indigo-700 transition"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}

// ==================== SECTION WRAPPER ====================
function Section({ id, title, subtitle, children, className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("scroll-mt-24 py-14", className)}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 max-w-2xl text-sm text-white/70 md:text-base">
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </motion.section>
  );
}

// ==================== PILL ====================
function Pill({ children }) {
  const { theme } = useTheme();
  return (
    <span
      className="inline-flex items-center rounded-full border px-3 py-1 text-xs"
      style={{
        borderColor: theme.border,
        backgroundColor: theme.surface,
        color: theme.textMuted,
      }}
    >
      {children}
    </span>
  );
}

// ==================== ICON LINK ====================
function IconLink({ href, label, children }) {
  if (!href) return null;
  return (
    <motion.a
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 transition hover:border-white/20 hover:bg-white/10"
      aria-label={label}
    >
      {children}
      <span className="sr-only">{label}</span>
    </motion.a>
  );
}

// ==================== PROJECT CARD (3D Flip) ====================
function ProjectCard({ p }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={cn(
        "group relative h-96 perspective",
        p.featured ? "md:col-span-2" : ""
      )}
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-6 shadow-lg">
          <img
            src={p.image}
            alt={p.name}
            className="w-full h-32 object-cover rounded-lg mb-4"
          />
          <h3 className="text-lg font-semibold text-white">{p.name}</h3>
          <p className="text-sm text-white/70 mt-1">{p.desc}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {p.tech.slice(0, 3).map((t) => (
              <Pill key={t}>{t}</Pill>
            ))}
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-indigo-500/20 to-purple-500/20 p-6 rotate-y-180 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Tech Stack</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <Pill key={t}>{t}</Pill>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <a
              href={p.repo}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/80 hover:bg-white/10"
            >
              <Github className="h-5 w-5" />
            </a>
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/80 hover:bg-white/10"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ==================== SKILL BLOCK ====================
function SkillBlock({ title, icon: Icon, items }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { theme } = useTheme();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border p-6 backdrop-blur-sm"
      style={{ borderColor: theme.border, backgroundColor: theme.surface }}
    >
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5" style={{ color: theme.accent }} />
        <h3 className="text-base font-semibold" style={{ color: theme.text }}>
          {title}
        </h3>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((s) => (
          <Pill key={s}>{s}</Pill>
        ))}
      </div>
    </motion.div>
  );
}

// ==================== TIMELINE ====================
function Timeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { theme } = useTheme();

  return (
    <div ref={ref} className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10" />

      {DATA.timeline.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className={cn(
            "relative flex items-start mb-8",
            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          )}
        >
          {/* Icon */}
          <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center z-10"
            style={{ backgroundColor: theme.accent, color: theme.bg }}
          >
            <item.icon className="h-4 w-4" />
          </div>

          {/* Content */}
          <div
            className={cn(
              "ml-12 md:ml-0 md:w-1/2 p-4 rounded-xl border",
              index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"
            )}
            style={{ borderColor: theme.border, backgroundColor: theme.surface }}
          >
            <p className="text-sm" style={{ color: theme.accent }}>{item.year}</p>
            <h4 className="text-lg font-semibold mt-1" style={{ color: theme.text }}>
              {item.title}
            </h4>
            <p className="text-sm" style={{ color: theme.textMuted }}>{item.organization}</p>
            <p className="text-sm mt-2" style={{ color: theme.textMuted }}>{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ==================== ACHIEVEMENTS ====================
function Achievements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { theme } = useTheme();

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {DATA.achievements.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="rounded-2xl border p-6 text-center"
          style={{ borderColor: theme.border, backgroundColor: theme.surface }}
        >
          <item.icon className="h-8 w-8 mx-auto mb-3" style={{ color: theme.accent }} />
          <h3 className="text-lg font-semibold" style={{ color: theme.text }}>
            {item.title}
          </h3>
          <p className="text-sm mt-1" style={{ color: theme.textMuted }}>
            {item.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

// ==================== TESTIMONIALS CAROUSEL ====================
function Testimonials() {
  const [current, setCurrent] = useState(0);
  const { theme } = useTheme();

  const next = () => setCurrent((prev) => (prev + 1) % DATA.testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + DATA.testimonials.length) % DATA.testimonials.length);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border p-8 text-center"
          style={{ borderColor: theme.border, backgroundColor: theme.surface }}
        >
          <p className="text-lg italic" style={{ color: theme.textMuted }}>
            "{DATA.testimonials[current].text}"
          </p>
          <p className="mt-4 font-semibold" style={{ color: theme.text }}>
            {DATA.testimonials[current].name}
          </p>
          <p className="text-sm" style={{ color: theme.accent }}>
            {DATA.testimonials[current].role}
          </p>
        </motion.div>
      </AnimatePresence>
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 rounded-full p-2 bg-white/10 hover:bg-white/20 transition"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 rounded-full p-2 bg-white/10 hover:bg-white/20 transition"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

// ==================== CONTACT FORM ====================
function ContactForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { theme } = useTheme();

  const onSubmit = async (data) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast.success("Message sent successfully!");
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div>
        <input
          {...register("name", { required: "Name is required" })}
          placeholder="Your Name"
          className="w-full px-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2"
          style={{
            borderColor: errors.name ? "#ef4444" : theme.border,
            color: theme.text,
          }}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
          })}
          placeholder="Your Email"
          className="w-full px-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2"
          style={{
            borderColor: errors.email ? "#ef4444" : theme.border,
            color: theme.text,
          }}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <textarea
          {...register("message", { required: "Message is required" })}
          placeholder="Your Message"
          rows="4"
          className="w-full px-4 py-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2 resize-none"
          style={{
            borderColor: errors.message ? "#ef4444" : theme.border,
            color: theme.text,
          }}
        />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
      </div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 rounded-xl font-semibold transition disabled:opacity-50"
        style={{ backgroundColor: theme.accent, color: theme.bg }}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </motion.button>
    </motion.form>
  );
}

// ==================== RESUME DOWNLOAD BUTTON ====================
function ResumeButton() {
  const [progress, setProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const { theme } = useTheme();

  const handleDownload = () => {
    if (isDownloading) return;
    setIsDownloading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          toast.success("Resume downloaded!");
          return 0;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleDownload}
      className="relative overflow-hidden rounded-xl px-6 py-3 font-semibold border transition"
      style={{ borderColor: theme.border, color: theme.text }}
      disabled={isDownloading}
    >
      <span className="relative z-10 flex items-center gap-2">
        <Download className="h-4 w-4" />
        {isDownloading ? `Downloading ${progress}%` : "Resume"}
      </span>
      {isDownloading && (
        <motion.div
          className="absolute inset-0"
          style={{ backgroundColor: theme.accent, opacity: 0.3 }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.button>
  );
}

// ==================== THEME TOGGLE BUTTON ====================
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const icons = {
    Dark: <Moon className="h-5 w-5" />,
    Light: <Sun className="h-5 w-5" />,
    Matrix: <Code className="h-5 w-5" />,
  };
  return (
    <motion.button
      whileHover={{ rotate: 15 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="p-2 rounded-xl border"
      style={{ borderColor: theme.border, color: theme.text }}
    >
      {icons[theme.name]}
    </motion.button>
  );
}

// ==================== MAIN COMPONENT ====================
function Portfolio() {
  const [chatOpen, setChatOpen] = useState(false);
  const { theme } = useTheme();
  const featured = DATA.projects.filter((p) => p.featured);
  const others = DATA.projects.filter((p) => !p.featured);

  // Typewriter effect
  const [tagline] = useTypewriter({
    words: [DATA.tagline],
    loop: 1,
    typeSpeed: 30,
    deleteSpeed: 0,
    delaySpeed: 1000,
  });

  // Parallax scroll
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.2, 0.1]);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Update CSS variables for theme
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
      if (key !== "name") {
        root.style.setProperty(`--theme-${key}`, value);
      }
    });
  }, [theme]);

  return (
    <div
      className="min-h-screen text-white relative transition-colors duration-300"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      <Toaster position="top-right" />

      {/* Fixed 3D Background with parallax */}
      <motion.div className="fixed inset-0 -z-10" style={{ y: yBg, opacity: opacityBg }}>
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ThreeBackground />
        </Canvas>
      </motion.div>

      {/* Particles */}
      <ParticlesBackground />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Animated gradient orbs */}
      <div
        className="fixed top-0 left-0 w-96 h-96 rounded-full blur-3xl -z-10 animate-pulse"
        style={{ backgroundColor: `${theme.accent}20` }}
      />
      <div
        className="fixed bottom-0 right-0 w-96 h-96 rounded-full blur-3xl -z-10 animate-pulse delay-1000"
        style={{ backgroundColor: `${theme.accent}20` }}
      />

      {/* Nav */}
      <header className="sticky top-0 z-50 border-b backdrop-blur" style={{ borderColor: theme.border, backgroundColor: `${theme.bg}cc` }}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <motion.a
            href="#top"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-semibold tracking-tight"
          >
            {DATA.name.split(" ")[0]}
            <span style={{ color: theme.textMuted }}>.dev</span>
          </motion.a>

          <nav className="hidden gap-6 text-sm md:flex" style={{ color: theme.textMuted }}>
            {["projects", "skills", "about", "contact"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={(e) => handleNavClick(e, item)}
                className="hover:text-white capitalize transition"
                style={{ color: "inherit" }}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <IconLink href={DATA.github} label="GitHub">
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </IconLink>
            <IconLink href={DATA.linkedin} label="LinkedIn">
              <Linkedin className="h-4 w-4" />
              <span className="hidden sm:inline">LinkedIn</span>
            </IconLink>
          </div>
        </div>
      </header>

      <main id="top" className="relative">
        {/* Hero */}
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-14 md:pt-20">
          <div className="grid gap-10 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p
                  className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs"
                  style={{ borderColor: theme.border, backgroundColor: theme.surface, color: theme.textMuted }}
                >
                  <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: theme.accent }} />
                  Open for Internships • {DATA.location}
                </p>
              </motion.div>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
                {DATA.name}
              </h1>
              <p className="mt-3 text-base md:text-lg" style={{ color: theme.textMuted }}>
                {DATA.title}
              </p>

              <p className="mt-5 max-w-2xl text-sm leading-relaxed md:text-base min-h-[80px]" style={{ color: theme.textMuted }}>
                {tagline}
                <Cursor cursorStyle="|" />
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#projects"
                  onClick={(e) => handleNavClick(e, "projects")}
                  className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition"
                  style={{ backgroundColor: theme.accent, color: theme.bg }}
                >
                  View Projects <ArrowRight className="h-4 w-4" />
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`mailto:${DATA.email}`}
                  className="inline-flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-semibold transition"
                  style={{ borderColor: theme.border, backgroundColor: theme.surface, color: theme.text }}
                >
                  <Mail className="h-4 w-4" />
                  Contact
                </motion.a>

                {DATA.resumeUrl && <ResumeButton />}
              </div>
            </div>

            {/* Hero right cards */}
            <div className="md:col-span-5">
              <div className="grid gap-4">
                {DATA.highlights.map((h, idx) => (
                  <motion.div
                    key={h.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="rounded-2xl border p-5 backdrop-blur-sm"
                    style={{ borderColor: theme.border, backgroundColor: theme.surface }}
                  >
                    <div className="flex items-center gap-2">
                      <h.icon className="h-5 w-5" style={{ color: theme.accent }} />
                      <p className="font-semibold" style={{ color: theme.text }}>{h.title}</p>
                    </div>
                    <p className="mt-2 text-sm" style={{ color: theme.textMuted }}>{h.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { label: "Projects", value: "3+", desc: "Full-stack, business-focused systems" },
              { label: "Focus", value: "Real workflows", desc: "Inventory • POS • Booking • Dashboards" },
              { label: "Strength", value: "Clean delivery", desc: "Structured code, security mindset, maintainability" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="rounded-2xl border p-6 backdrop-blur-sm"
                style={{ borderColor: theme.border, backgroundColor: theme.surface }}
              >
                <p className="text-sm" style={{ color: theme.textMuted }}>{stat.label}</p>
                <p className="mt-2 text-2xl font-semibold" style={{ color: theme.text }}>{stat.value}</p>
                <p className="mt-1 text-sm" style={{ color: theme.textMuted }}>{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <Section
          id="projects"
          title="Featured Projects"
          subtitle="A few real-world systems I built end-to-end. Hover to flip and see tech stack."
        >
          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((p) => (
              <ProjectCard key={p.name} p={p} />
            ))}
            {others.map((p) => (
              <ProjectCard key={p.name} p={p} />
            ))}
          </div>
          <div className="mt-8">
            <a
              href={DATA.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold transition hover:opacity-80"
              style={{ color: theme.text }}
            >
              View more on GitHub <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Section>

        {/* Skills */}
        <Section
          id="skills"
          title="Skills"
          subtitle="Focused on building practical full-stack applications with secure and clean implementations."
        >
          <div className="grid gap-6 md:grid-cols-2">
            <SkillBlock title="Frontend" icon={Layout} items={DATA.skills.frontend} />
            <SkillBlock title="Backend" icon={Code2} items={DATA.skills.backend} />
            <SkillBlock title="Database" icon={Database} items={DATA.skills.database} />
            <SkillBlock
              title="Tools & Concepts"
              icon={Shield}
              items={[...DATA.skills.tools, ...DATA.skills.concepts]}
            />
          </div>
        </Section>

        {/* Timeline */}
        <Section id="timeline" title="My Journey" subtitle="Education and experience.">
          <Timeline />
        </Section>

        {/* Achievements */}
        <Section id="achievements" title="Achievements" subtitle="Awards and recognition.">
          <Achievements />
        </Section>

        {/* Testimonials */}
        <Section id="testimonials" title="Testimonials" subtitle="What others say.">
          <Testimonials />
        </Section>

        {/* About */}
        <Section
          id="about"
          title="About"
          subtitle="A short summary recruiters actually read."
        >
          <div className="rounded-2xl border p-6 backdrop-blur-sm md:p-8" style={{ borderColor: theme.border, backgroundColor: theme.surface }}>
            <p className="text-sm leading-relaxed md:text-base" style={{ color: theme.textMuted }}>
              I’m a Software Engineering undergraduate who enjoys building
              production-style applications. I’ve created systems like a Secure
              Jewellery Management platform (with AI Studio integration), a POS
              system for a mobile shop, and a Ground Booking & Management web
              app. I like converting real workflows into clean user experiences
              backed by reliable APIs and databases, with attention to security
              and maintainability.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Pill>Open to Internships</Pill>
              <Pill>Full-Stack</Pill>
              <Pill>Backend</Pill>
              <Pill>Web Apps</Pill>
            </div>
          </div>
        </Section>

        {/* Contact */}
        <Section
          id="contact"
          title="Contact"
          subtitle="If you have an internship opportunity, I’d love to connect."
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              {[
                { href: `mailto:${DATA.email}`, icon: Mail, label: "Email", value: DATA.email },
                { href: DATA.github, icon: Github, label: "GitHub", value: "github.com/dulshan066" },
                { href: DATA.linkedin, icon: Linkedin, label: "LinkedIn", value: "Connect with me" },
              ].map((item, idx) => (
                <motion.a
                  key={idx}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="flex items-center gap-3 rounded-2xl border p-4 transition"
                  style={{ borderColor: theme.border, backgroundColor: theme.surface }}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <item.icon className="h-5 w-5" style={{ color: theme.accent }} />
                  <div>
                    <p className="font-semibold" style={{ color: theme.text }}>{item.label}</p>
                    <p className="text-sm" style={{ color: theme.textMuted }}>{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
            <ContactForm />
          </div>
        </Section>

        {/* Footer */}
        <footer className="border-t py-10" style={{ borderColor: theme.border }}>
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 text-sm md:flex-row md:items-center md:justify-between" style={{ color: theme.textMuted }}>
            <p>
              © {new Date().getFullYear()} {DATA.name}. Built with React + Tailwind + 3D Magic.
            </p>
            <p>
              Designed by Dulshan
            </p>
          </div>
        </footer>
      </main>

      {/* Floating Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        onClick={() => setChatOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full p-4 text-white shadow-lg transition"
        style={{ backgroundColor: theme.accent }}
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {chatOpen && <ChatBot isOpen={chatOpen} onClose={() => setChatOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

// Wrap with ThemeProvider
export default function App() {
  return (
    <ThemeProvider>
      <Portfolio />
    </ThemeProvider>
  );
}