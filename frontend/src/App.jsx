import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { 
  Building2, BookOpen, Layers, ClipboardList, Video, 
  Settings, Trash2, PlusCircle, ArrowUpRight, CheckCircle, 
  Clock, ShieldCheck, Truck, BarChart3, ChevronRight, ChevronLeft, 
  Download, HardHat, Factory, Sliders, FileText, UserCheck, 
  Briefcase, Flame, Anchor, Layers3, Lock, Eye, EyeOff, Menu, X,
  TrendingUp, TrendingDown, Send, Phone, Mail, MapPin, CheckCircle2
} from 'lucide-react';

import websiteLogo from './assets/Website Logo.png';
import appIcon from './assets/App Icon.png';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const BACKEND_WS_URL = API_BASE_URL;
const BLOG_API_URL = `${API_BASE_URL}/api/blogs`;
const PRICE_API_URL = `${API_BASE_URL}/api/prices`;
const VIDEO_API_URL = `${API_BASE_URL}/api/videos`;
const AUTH_API_URL = `${API_BASE_URL}/api/auth/login`;
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.steelsuvidha.app";

// Web3Forms Access Key
const WEB3FORMS_ACCESS_KEY = "d43e94c8-302b-457a-9807-b38c564c454d";

export default function App() {
  const [blogs, setBlogs] = useState([]);
  const [videos, setVideos] = useState([]);
  const [currentBookPage, setCurrentBookPage] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Enquiry Form State
  const [enquiryStatus, setEnquiryStatus] = useState(null); // 'submitting' | 'success' | 'error'
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    phone: '',
    email: '',
    materialType: 'Steel TMT Rebars (Fe 550D)',
    tonnage: '',
    message: ''
  });

  // Admin & Auth States
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminPassphrase, setAdminPassphrase] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [adminActiveTab, setAdminActiveTab] = useState('prices');

  // Admin Blog State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Market Trends');
  const [newAuthor, setNewAuthor] = useState('');
  const [newContent, setNewContent] = useState('');

  // Admin Video State
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoSubtitle, setNewVideoSubtitle] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newVideoDuration, setNewVideoDuration] = useState('02:45');

  // Admin Price State
  const [editPriceItem, setEditPriceItem] = useState('Steel TMT Rebars (Fe 550D)');
  const [editPriceVal, setEditPriceVal] = useState('');
  const [editPriceChange, setEditPriceChange] = useState('0.0');
  const [editPriceUp, setEditPriceUp] = useState(true);

  const [tickerPrices, setTickerPrices] = useState([
    { item: "Steel TMT Rebars (Fe 550D)", price: 58500, change: 0.8, up: true },
    { item: "ISMC Channels", price: 54200, change: -0.4, up: false },
    { item: "Structural Angles (MS/GI)", price: 51200, change: 1.1, up: true },
    { item: "Commercial Iron Flats", price: 49800, change: -0.2, up: false },
    { item: "ISMB Structural Joists", price: 56400, change: 0.5, up: true },
    { item: "HR / CR Steel Sheets", price: 65200, change: 0.3, up: true },
    { item: "Color Profile Roofing Sheets", price: 73500, change: -0.6, up: false }
  ]);

  useEffect(() => {
    const socketConnection = io(BACKEND_WS_URL);

    socketConnection.on('priceUpdate', (freshMarketData) => {
      if (Array.isArray(freshMarketData) && freshMarketData.length > 0) {
        setTickerPrices(freshMarketData);
      }
    });

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(BLOG_API_URL);
      const data = await res.json();
      if (Array.isArray(data)) setBlogs(data);
    } catch (err) {
      console.warn("Backend API data pipeline offline.");
    }
  };

  const fetchVideos = async () => {
    try {
      const res = await fetch(VIDEO_API_URL);
      const data = await res.json();
      if (Array.isArray(data)) setVideos(data);
    } catch (err) {
      console.warn("Video API offline.");
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchVideos();
  }, []);

  // Submit Customer Order Enquiry to Email
  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setEnquiryStatus('submitting');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `📦 New Steel Order Enquiry from ${enquiryForm.name}`,
          from_name: "Steel Suvidha Web Portal",
          ...enquiryForm
        })
      });

      const result = await response.json();
      if (result.success) {
        setEnquiryStatus('success');
        setEnquiryForm({
          name: '',
          phone: '',
          email: '',
          materialType: 'Steel TMT Rebars (Fe 550D)',
          tonnage: '',
          message: ''
        });
      } else {
        setEnquiryStatus('error');
      }
    } catch (err) {
      setEnquiryStatus('error');
    }
  };

  const handlePublishBlog = async (e) => {
    e.preventDefault();
    if (!newTitle || !newAuthor || !newContent) return;

    try {
      const res = await fetch(BLOG_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, category: newCategory, author: newAuthor, content: newContent })
      });
      if (res.ok) {
        setNewTitle('');
        setNewContent('');
        setNewAuthor('');
        fetchBlogs();
        alert("Insight node successfully published to MongoDB!");
      }
    } catch (err) {
      console.error("Publishing request failed:", err);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      const res = await fetch(`${BLOG_API_URL}/${id}`, { method: 'DELETE' });
      if (res.ok) fetchBlogs();
    } catch (err) {
      console.error("Purge request failed:", err);
    }
  };

  const handlePublishVideo = async (e) => {
    e.preventDefault();
    if (!newVideoTitle || !newVideoUrl) return;

    try {
      const res = await fetch(VIDEO_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: newVideoTitle, 
          subtitle: newVideoSubtitle || 'Verified Infrastructure Ledger Node Log', 
          videoUrl: newVideoUrl, 
          duration: newVideoDuration 
        })
      });

      if (res.ok) {
        setNewVideoTitle('');
        setNewVideoSubtitle('');
        setNewVideoUrl('');
        setNewVideoDuration('02:45');
        fetchVideos();
        alert("Video reel added successfully!");
      }
    } catch (err) {
      console.error("Video creation failed:", err);
    }
  };

  const handleDeleteVideo = async (id) => {
    try {
      const res = await fetch(`${VIDEO_API_URL}/${id}`, { method: 'DELETE' });
      if (res.ok) fetchVideos();
    } catch (err) {
      console.error("Video purge failed:", err);
    }
  };

  const handleUpdatePrice = async (e) => {
    e.preventDefault();
    if (!editPriceItem || !editPriceVal) return;

    try {
      const res = await fetch(PRICE_API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item: editPriceItem,
          price: editPriceVal,
          change: editPriceChange,
          up: editPriceUp
        })
      });

      if (res.ok) {
        alert(`✅ Rate updated live for ${editPriceItem}!`);
        setEditPriceVal('');
        setEditPriceChange('0.0');
      }
    } catch (err) {
      console.error("Price update request failed:", err);
    }
  };

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 120; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleAdminAuthSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(AUTH_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: adminPassphrase })
      });

      if (res.ok) {
        setIsAdminAuthenticated(true);
      } else {
        alert("Security Violation: Invalid Admin Credentials.");
        setAdminPassphrase('');
      }
    } catch (err) {
      alert("Authentication Service Unavailable.");
    }
  };

  const bookPages = [
    {
      title: "Structural Catalog Overview",
      subtitle: "Welcome to the Digital Material Menu",
      desc: "Turn the pages using the navigation nodes below to explore architectural variables, baseline steel dimensions, and structural specifications available for real-time secure procurement.",
      details: ["Page 1: Primary Rebar Grids", "Page 2: Structural Framing Angles", "Page 3: Commercial Iron Flats", "Page 4: Heavy Logistics Elements"]
    },
    {
      title: "Thermo-Mechanically Treated Bars",
      subtitle: "High-Tensile Foundation Grids",
      desc: "Mill-certified reinforcing elements engineered explicitly to manage intense high-seismic configurations and architectural concrete framing structures.",
      details: ["Available Sizes: 6mm, 8mm, 10mm, 12mm", "Heavy Grids: 16mm, 20mm, 25mm, 32mm", "Structural Standards: Fe 550D / Fe 600 CRS", "Mill Compliance: TATA Tiscon, JSW, SAIL, Jindal"]
    },
    {
      title: "L-Angles & Structural Iron Flats",
      subtitle: "Framing Trusses & Platform Supports",
      desc: "Comprehensive structural sections manufactured precisely down to equal and unequal L-profiles and flat cross-section plating matrix specifications.",
      details: ["Angles Dimension Map: A 20×3 up to A 75×10", "Flats Plating Scope: F 20×3 up to F 100×12", "Surface Finishes: Mild Steel (Black), Galvanised", "Yards Supply Nodes: Patna Iron, Kamdhenu, JKSPL"]
    },
    {
      title: "Heavy Sections & Roofing Profiles",
      subtitle: "Warehouse Joists & Coated Shielding Plates",
      desc: "ISMC channel bars, structural ISMB load-bearing joists, and external weather-resistant color profile roofing sheet infrastructures.",
      details: ["ISMC Section Channels: 70×40 to 250×75 Profiles", "ISMB Structural Joists: ISMB 100 to ISMB 400 Arrays", "GC Corrugated Sheets: 0.15mm to 0.80mm Thickness", "Coated Color Profiles: Tata Durashine, JSW Pragati+"]
    }
  ];

  const nextBookPage = () => {
    if (currentBookPage < bookPages.length - 1) setCurrentBookPage(currentBookPage + 1);
  };

  const prevBookPage = () => {
    if (currentBookPage > 0) setCurrentBookPage(currentBookPage - 1);
  };

  const menuNavigationItems = [
    { id: 'hero-section', label: 'Home' },
    { id: 'catalog-section', label: 'Product Catalog' },
    { id: 'enquiry-section', label: 'Order Enquiry' },
    { id: 'about-section', label: 'About Us' },
    { id: 'services-section', label: 'Our Services' },
    { id: 'portal-section', label: 'Portal Showcase' },
    { id: 'media-section', label: 'Media Hub' },
    { id: 'blog-section', label: 'Insights Blog' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F5F9] text-[#263238] selection:bg-[#E23744] selection:text-white antialiased font-poppins">
      <div className="fixed inset-0 pointer-events-none opacity-40 z-0" style={{
        backgroundImage: `
          linear-gradient(to right, #cbd5e1 1px, transparent 1px),
          linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }} />

      <div className="sticky top-0 z-50 flex flex-col w-full shadow-xs">
        <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-4 flex items-center justify-between">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="flex items-center cursor-pointer transition-opacity hover:opacity-90"
            aria-label="Steel Suvidha Home"
          >
            <img src={websiteLogo} alt="Steel Suvidha" width="176" height="44" className="h-11 w-auto object-contain" />
          </button>
          
          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold">
            {menuNavigationItems.map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className="px-4 py-2.5 rounded transition-all duration-150 cursor-pointer text-slate-600 hover:bg-slate-100 hover:text-black"
              >
                {tab.label}
              </button>
            ))}
            
            <button 
              onClick={() => setShowAdminPanel(true)} 
              className="w-9 h-9 ml-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-400 flex items-center justify-center hover:text-[#E23744] hover:bg-red-50 transition-colors cursor-pointer"
              title="Open Gateway Platform"
            >
              <Lock size={13} />
            </button>
          </nav>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="p-2 text-slate-600 lg:hidden hover:text-black cursor-pointer"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        <div className="w-full bg-[#0D1137] text-white overflow-hidden py-2.5 border-b border-slate-900 select-none z-40">
          <div className="relative w-full flex items-center">
            <div className="absolute left-0 top-0 bottom-0 bg-[#E23744] text-white px-4 flex items-center z-50 font-black tracking-wider text-[10px] uppercase shadow-md">
              Live Rates <span className="w-1.5 h-1.5 rounded-full bg-white ml-2 animate-pulse"></span>
            </div>

            <div className="w-full overflow-hidden pl-28">
              <div className="animate-marquee whitespace-nowrap flex items-center gap-12 text-xs font-bold font-mono">
                {[...tickerPrices, ...tickerPrices].map((t, idx) => (
                  <div key={idx} className="inline-flex items-center gap-2 tracking-wide">
                    <span className="text-slate-400">{t.item}:</span>
                    <span className="text-white font-mono">₹{Number(t.price).toLocaleString('en-IN')}/MT</span>
                    <span className={`inline-flex items-center text-[10px] px-1.5 py-0.5 rounded font-black ${t.up ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                      {t.up ? <TrendingUp size={10} className="mr-0.5" /> : <TrendingDown size={10} className="mr-0.5" />}
                      {t.up ? '+' : ''}{t.change}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-grow relative z-10 space-y-20">
        <div id="hero-section" className="w-full pt-8">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 lg:py-24 grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-[#000000] tracking-tight leading-[1.05] font-lora">
                Simplifying and Modernizing the <span className="text-[#0D1137] underline decoration-[#E23744] decoration-4 underline-offset-8">Steel Supply</span> Experience.
              </h2>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed font-poppins max-w-2xl">
                Welcome to Steel Suvidha, where we are committed to simplifying and modernizing the steel and construction supply experience.
              </p>
              <button 
                onClick={() => scrollToSection('enquiry-section')}
                className="inline-flex px-6 py-3.5 bg-[#E23744] text-white text-xs font-bold rounded-xl items-center gap-2 hover:bg-[#c62828] transition-all shadow-md uppercase tracking-wider cursor-pointer"
              >
                Request Material Quotation <ArrowUpRight size={16} />
              </button>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 font-poppins">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 rounded-2xl border border-slate-700 shadow-xl flex flex-col justify-between h-48 relative overflow-hidden">
                <HardHat size={28} className="text-[#FF9100]" />
                <div>
                  <h4 className="font-bold text-sm tracking-wide text-slate-200">Mill-Certified Stock</h4>
                  <p className="text-[11px] text-slate-400 mt-1">Direct testing logs mapped to physical batch containers.</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-xs flex flex-col justify-between h-48">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono bg-slate-100 px-2 py-0.5 border border-slate-200 rounded text-slate-600 font-bold tracking-wide">LIVE TELEMETRY</span>
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-900 font-lora tracking-tight">14,820+</h3>
                  <h4 className="font-bold text-xs text-[#0D1137] mt-1">Enquiries Processed</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: PRODUCT CATALOG TILES */}
        <div id="catalog-section" className="max-w-7xl mx-auto px-6 sm:px-8 py-16 font-poppins scroll-mt-28">
          <div className="border-l-4 border-[#E23744] pl-4 mb-12">
            <p className="text-xs font-extrabold text-[#2F8DC7] tracking-widest uppercase">MASTER MATERIAL LEDGER</p>
            <h3 className="text-2xl sm:text-3xl font-black font-lora text-gray-900 mt-0.5">Unified Product Specifications Matrix</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 border border-slate-300 rounded-2xl shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-base text-slate-900 flex items-center gap-2 border-b pb-2 mb-3"><Flame size={18} className="text-[#E23744]" /> Steel TMT Bars</h4>
                <p className="text-xs text-slate-400 mb-1 font-bold">SIZES AVAILABLE:</p>
                <p className="text-xs font-mono font-bold text-slate-700">6 mm, 8 mm, 10 mm, 12 mm, 16 mm, 20 mm, 25 mm, 32 mm</p>
                <p className="text-xs text-slate-400 mt-3 font-bold">VARIANTS / BRANDS:</p>
                <p className="text-xs text-slate-600">500 D, 550 D, 600 D • TATA Tiscon, SAIL, Jindal, JSW, Shyam Steel, Rungta</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 font-mono">Variables: Weight per length / Rate per kg</div>
            </div>

            <div className="bg-white p-6 border border-slate-300 rounded-2xl shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-base text-slate-900 flex items-center gap-2 border-b pb-2 mb-3"><Layers size={18} className="text-[#2F8DC7]" /> Structural Angles</h4>
                <p className="text-xs text-slate-400 mb-1 font-bold">PROFILES AVAILABLE:</p>
                <p className="text-[11px] font-mono font-bold text-slate-700 h-16 overflow-y-auto pr-1">
                  A 20×3, 25×3, 25×5, 30×3, 32×3, 35×5, 35×6, 40×3, 40×5, 40×6, 50×3, 50×5, 50×6, 65×5, 65×6, 75×5, 75×6, 75×8, 75×10
                </p>
                <p className="text-xs text-slate-400 mt-2 font-bold">FINISH / BRANDS:</p>
                <p className="text-xs text-slate-600">MS (Black), GI (Galvanised) • Patna Iron, Kamdhenu, JKSPL, Sel Tiger, SAIL, SUL</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 font-mono">Variables: Weight per length of 6 mtr / Qty in Lengths</div>
            </div>

            <div className="bg-white p-6 border border-slate-300 rounded-2xl shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-base text-slate-900 flex items-center gap-2 border-b pb-2 mb-3"><Layers3 size={18} className="text-[#2F8DC7]" /> Commercial Flats</h4>
                <p className="text-xs text-slate-400 mb-1 font-bold">DIMENSIONS AVAILABLE:</p>
                <p className="text-[11px] font-mono font-bold text-slate-700 h-16 overflow-y-auto pr-1">
                  F 20×3, 20×5, 20×6, 25×3, 25×5, 25×6, 25×10, 25×12, 32×5, 32×6, 32×8, 32×10, 40×5, 40×6, 40×8, 40×10, 40×12, 50×5, 50×6, 50×8, 50×10, 50×12, 65×6, 65×8, 65×10, 65×12, 75×6, 75×8, 75×10, 75×12, 75×16, 100×8, 100×12
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 font-mono">Variables: MS, GI / Weight per length of 6 mtr</div>
            </div>

            <div className="bg-white p-6 border border-slate-300 rounded-2xl shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-base text-slate-900 flex items-center gap-2 border-b pb-2 mb-3"><Anchor size={18} className="text-slate-700" /> Square & Round Bars</h4>
                <p className="text-xs text-slate-400 mb-1 font-bold">SQUARE BARS COILS:</p>
                <p className="text-xs font-mono font-bold text-slate-700 mb-2">8 mm, 10 mm, 12 mm, 16 mm, 20 mm, 25 mm, 32 mm, 40 mm</p>
                <p className="text-xs text-slate-400 mb-1 font-bold">ROUND BARS STRUCTURAL:</p>
                <p className="text-xs font-mono font-bold text-slate-700">8 mm, 10 mm, 12 mm, 16 mm, 20 mm, 25 mm, 32 mm, 40 mm</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 font-mono">Brands: Patna Iron, Kamdhenu, JKSPL, Sel Tiger, SAIL</div>
            </div>

            <div className="bg-white p-6 border border-slate-300 rounded-2xl shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-base text-slate-800 flex items-center gap-2 border-b pb-2 mb-3"><Factory size={18} className="text-slate-800" /> Channels & Joists (ISMB)</h4>
                <p className="text-xs text-slate-400 mb-1 font-bold">ISMC CHANNELS:</p>
                <p className="text-[11px] font-mono text-slate-700 mb-2 truncate">70×40, 75×40 (ULC/LC/MC/H), 100×50 (LC/MC/H), 125×65, 150×75, 200×75, 250×75</p>
                <p className="text-xs text-slate-400 mb-1 font-bold">ISMB JOISTS:</p>
                <p className="text-xs font-mono font-bold text-slate-700">ISMB 100, 125, 150, 200, 250, 300, 350, 400</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 font-mono">Z-Angle (L/H) • Gate Channels: 13 ft to 18 ft</div>
            </div>

            <div className="bg-white p-6 border border-slate-300 rounded-2xl shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-base text-slate-900 flex items-center gap-2 border-b pb-2 mb-3"><ClipboardList size={18} className="text-amber-600" /> Plates & Roofing Sheets</h4>
                <p className="text-slate-700 text-xs font-bold mb-1">MS & Chequered Plates: <span className="font-normal text-slate-600">2.5 mm to 6 mm profiles</span></p>
                <p className="text-slate-700 text-xs font-bold mb-1">HR & CR Sheets: <span className="font-normal text-slate-600">8 G to 26 G (TATA, JSW, SAIL)</span></p>
                <p className="text-slate-700 text-xs font-bold">Roofing Coated: <span className="font-normal text-slate-600">GC Sheets, Color Profiles (Durashine)</span></p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 font-mono">Asbestos Cement Roofing Sheets: 6 ft to 12 ft</div>
            </div>
          </div>
        </div>

        {/* SECTION 3: DIRECT MATERIAL & ORDER ENQUIRY FORM */}
        <div id="enquiry-section" className="max-w-7xl mx-auto px-6 sm:px-8 py-16 font-poppins scroll-mt-28">
          <div className="bg-white rounded-3xl border border-slate-300 shadow-xl overflow-hidden grid lg:grid-cols-12">
            
            {/* LEFT CONTACT INFO PANEL */}
            <div className="lg:col-span-5 bg-[#0D1137] text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-12 -bottom-12 opacity-10 pointer-events-none">
                <Factory size={280} />
              </div>

              <div>
                <span className="text-[10px] font-mono tracking-widest font-extrabold uppercase bg-[#E23744] text-white px-2.5 py-1 rounded">
                  DIRECT COMMERCIAL LINE
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-lora text-white mt-4 leading-tight">
                  Request a Custom Rate Quote or Order Delivery
                </h3>
                <p className="text-slate-300 text-xs mt-3 leading-relaxed">
                  Need bulk tonnage rates, specific dimensional sections, or site delivery details? Submit your order requirement below and our sales team will email you back directly.
                </p>
              </div>

              <div className="space-y-4 my-8 text-xs">
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="p-2.5 bg-white/10 rounded-lg text-[#E23744]"><Phone size={16} /></div>
                  <div><p className="text-[10px] text-slate-400 uppercase font-bold">Sales Hotline</p><p className="font-bold text-white">+91 98018 46515</p></div>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="p-2.5 bg-white/10 rounded-lg text-[#2F8DC7]"><Mail size={16} /></div>
                  <div><p className="text-[10px] text-slate-400 uppercase font-bold">Official Email</p><p className="font-bold text-white">manage.steelsuvidha@gmail.com</p></div>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="p-2.5 bg-white/10 rounded-lg text-emerald-400"><MapPin size={16} /></div>
                  <div><p className="text-[10px] text-slate-400 uppercase font-bold">Primary Distribution Hub</p><p className="font-bold text-white">Patna Steel Yard, Bihar, India</p></div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-400 font-mono">
                ⚡ Direct dispatch inquiries usually receive email responses within 2 hours.
              </div>
            </div>

            {/* RIGHT FORM INTERFACE */}
            <div className="lg:col-span-7 p-8 sm:p-12 bg-white">
              {enquiryStatus === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className="text-2xl font-bold font-lora text-slate-900">Enquiry Transmitted Successfully!</h4>
                  <p className="text-xs text-slate-500 max-w-md">
                    Thank you for submitting your order request. Our commercial desk has received your details via email and will reach out to you shortly.
                  </p>
                  <button 
                    onClick={() => setEnquiryStatus(null)}
                    className="mt-4 px-6 py-2.5 bg-[#0D1137] text-white text-xs font-bold rounded-xl hover:bg-[#1A237E] transition-colors cursor-pointer"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  <h4 className="text-xl font-bold font-lora text-slate-900 mb-6 border-b pb-3">
                    Order Procurement Form
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Your Full Name *</label>
                      <input 
                        type="text" 
                        value={enquiryForm.name} 
                        onChange={e => setEnquiryForm({...enquiryForm, name: e.target.value})}
                        placeholder="e.g. Rupesh Kumar" 
                        className="w-full text-xs p-3 border border-slate-200 rounded-xl bg-[#F8FAFC] focus:outline-[#E23744]" 
                        required 
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Phone Number *</label>
                      <input 
                        type="tel" 
                        value={enquiryForm.phone} 
                        onChange={e => setEnquiryForm({...enquiryForm, phone: e.target.value})}
                        placeholder="e.g. +91 9876543210" 
                        className="w-full text-xs p-3 border border-slate-200 rounded-xl bg-[#F8FAFC] focus:outline-[#E23744]" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Email Address *</label>
                      <input 
                        type="email" 
                        value={enquiryForm.email} 
                        onChange={e => setEnquiryForm({...enquiryForm, email: e.target.value})}
                        placeholder="e.g. rupesh@steelsuvidha.com" 
                        className="w-full text-xs p-3 border border-slate-200 rounded-xl bg-[#F8FAFC] focus:outline-[#E23744]" 
                        required 
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Material Required</label>
                      <select 
                        value={enquiryForm.materialType} 
                        onChange={e => setEnquiryForm({...enquiryForm, materialType: e.target.value})}
                        className="w-full text-xs p-3 border border-slate-200 rounded-xl bg-[#F8FAFC] font-semibold text-slate-800 focus:outline-[#E23744] cursor-pointer"
                      >
                        <option>Steel TMT Rebars (Fe 550D)</option>
                        <option>ISMC Channels</option>
                        <option>Structural Angles (MS/GI)</option>
                        <option>Commercial Iron Flats</option>
                        <option>ISMB Structural Joists</option>
                        <option>HR / CR Steel Sheets</option>
                        <option>Color Profile Roofing Sheets</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Estimated Quantity / Tonnage (e.g. 50 Tons)</label>
                    <input 
                      type="text" 
                      value={enquiryForm.tonnage} 
                      onChange={e => setEnquiryForm({...enquiryForm, tonnage: e.target.value})}
                      placeholder="e.g. 25 Metric Tons" 
                      className="w-full text-xs p-3 border border-slate-200 rounded-xl bg-[#F8FAFC] focus:outline-[#E23744]" 
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Delivery Address & Specific Dimensions</label>
                    <textarea 
                      rows={3} 
                      value={enquiryForm.message} 
                      onChange={e => setEnquiryForm({...enquiryForm, message: e.target.value})}
                      placeholder="Specify size requirements, delivery site location, or urgency..." 
                      className="w-full text-xs p-3 border border-slate-200 rounded-xl bg-[#F8FAFC] focus:outline-[#E23744] resize-none" 
                      required
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={enquiryStatus === 'submitting'}
                    className="w-full py-4 bg-[#E23744] text-white text-xs font-bold rounded-xl hover:bg-[#c62828] transition-colors cursor-pointer uppercase tracking-widest flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                  >
                    {enquiryStatus === 'submitting' ? 'Transmitting Enquiry...' : 'Transmit Order Request to Sales Email'} <Send size={14} />
                  </button>

                  {enquiryStatus === 'error' && (
                    <p className="text-xs text-red-600 font-bold text-center mt-2">
                      Failed to send enquiry. Please try again or call our sales hotline directly.
                    </p>
                  )}
                </form>
              )}
            </div>

          </div>
        </div>

        {/* SECTION 4: EDITORIAL CORE INFRASTRUCTURE FEATURE */}
        <div id="about-section" className="bg-gradient-to-b from-white to-slate-50 border-y border-slate-300 py-20 font-poppins scroll-mt-28">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl font-bold font-lora tracking-tight text-[#000000] leading-tight">
                Steel is more than just a material; it is the foundation of progress, innovation, and strong relationships.
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We believe high-volume commercial steel trading demands strict adherence to dimensional metrics and transparent quote cycles. Our software eliminates intermediaries, bringing automated accounting systems directly to the distribution floor.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white border border-slate-200 rounded-xl">
                  <Sliders size={18} className="text-[#E23744] mb-2" />
                  <h5 className="font-bold text-xs text-slate-900">Custom Slitting</h5>
                </div>
                <div className="p-4 bg-white border border-slate-200 rounded-xl">
                  <FileText size={18} className="text-[#2F8DC7] mb-2" />
                  <h5 className="font-bold text-xs text-slate-900">MTC Records</h5>
                </div>
              </div>
            </div>

            <div className="bg-[#0D1137] text-white p-6 sm:p-8 rounded-2xl border-b-4 border-[#E23744] shadow-xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-700/10 rounded-full blur-2xl pointer-events-none" />
              <div>
                <span className="text-[9px] font-mono tracking-widest font-extrabold uppercase bg-[#E23744] text-white px-2 py-0.5 rounded">
                  ENTERPRISE CONTROL
                </span>
                <h4 className="text-xl font-bold font-lora tracking-wide text-white mt-3">Smart Procurement Terminal</h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Monitor active tonnage weights, manage incoming quotation request streams, verify tax settlements, and coordinate active truck routing dispatches directly inside a centralized operational control interface.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 5: SERVICES */}
        <div id="services-section" className="max-w-5xl mx-auto px-6 py-12 scroll-mt-28">
          <h2 className="text-2xl sm:text-3xl font-black font-lora text-center mb-12">Marketplace Infrastructure Matrix</h2>
          <div className="grid md:grid-cols-2 gap-6 font-poppins">
            {[
              { t: "Bulk Material Procurement", d: "Direct algorithmic matching pipelines routing industrial contracts directly into high-capacity blast furnaces and local steel mills." },
              { t: "Supplier Node Provisioning", d: "Dedicated real-time telemetry inventory management dashboards constructed custom for authorized independent distribution yards." },
              { t: "Logistics & Fleet Tracking", d: "Route optimization engines providing end-to-end telemetry and delivery status logging." },
              { t: "Smart Quotation Engine", d: "Rapid electronic commercial bid submittals and instant digital invoice parameter parsing." }
            ].map((srv, i) => (
              <div key={i} className="bg-white p-6 border border-slate-300 rounded-2xl shadow-xs hover:border-[#2F8DC7] transition-colors duration-150">
                <Layers className="text-[#2F8DC7] mb-3" size={20} />
                <h3 className="font-bold text-base text-[#0D1137]">{srv.t}</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{srv.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 6: DIGITAL MENU FLIP-BOOK */}
        <div id="portal-section" className="max-w-5xl mx-auto px-6 sm:px-8 py-16 font-poppins scroll-mt-28">
          <div className="border-l-4 border-[#2F8DC7] pl-4 mb-10">
            <p className="text-xs font-extrabold text-[#2F8DC7] tracking-widest uppercase">IMMERSIVE INTERACTION SHOWCASE</p>
            <h3 className="text-2xl sm:text-3xl font-black font-lora text-gray-900 mt-0.5">Digital Platform Menu Book</h3>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="w-full max-w-xl aspect-[16/10] bg-slate-300 rounded-xl p-2 shadow-2xl relative bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 border border-slate-400/60 flex">
                <div className="absolute inset-y-0 left-1/2 w-4 bg-gradient-to-r from-black/20 via-black/5 to-transparent z-20 transform -translate-x-1/2" />

                <div className="w-1/2 h-full bg-[#FCFBF7] rounded-l p-2 sm:p-4 flex flex-col justify-between border-r border-slate-300/40 shadow-inner relative overflow-hidden">
                  <img src={appIcon} alt="" width="120" height="120" className="absolute bottom-2 left-2 h-14 w-auto object-contain opacity-10 select-none pointer-events-none z-0" />
                  <div className="space-y-1 sm:space-y-2 relative z-10">
                    <span className="text-[8px] sm:text-[9px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-mono font-bold">SEC: 0{currentBookPage + 1}</span>
                    <h4 className="text-xs sm:text-sm font-bold font-lora text-slate-900 leading-tight">{bookPages[currentBookPage].title}</h4>
                    <p className="text-[9px] sm:text-[10px] text-[#2F8DC7] font-bold">{bookPages[currentBookPage].subtitle}</p>
                    <p className="text-[8px] sm:text-[10px] text-slate-500 leading-relaxed pt-1 line-clamp-4 sm:line-clamp-none">{bookPages[currentBookPage].desc}</p>
                  </div>
                  <span className="text-[8px] sm:text-[9px] text-slate-400 font-mono relative z-10">Page {currentBookPage * 2 + 1}</span>
                </div>

                <div className="w-1/2 h-full bg-[#FCFBF7] rounded-r p-2 sm:p-4 flex flex-col justify-between shadow-inner relative overflow-hidden">
                  <img src={appIcon} alt="" width="120" height="120" className="absolute bottom-2 right-2 h-14 w-auto object-contain opacity-10 select-none pointer-events-none z-0" />
                  <div className="space-y-1 sm:space-y-2 relative z-10">
                    <span className="text-[8px] sm:text-[9px] text-slate-400 uppercase font-bold tracking-wider block border-b pb-1">Inventory Index</span>
                    <ul className="space-y-1.5 pt-1">
                      {bookPages[currentBookPage].details.map((item, idx) => (
                        <li key={idx} className="text-[8px] sm:text-[10px] text-slate-700 font-semibold flex items-center gap-1"><span className="w-1 h-1 bg-[#E23744] rounded-full shrink-0"></span> <span className="truncate">{item}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-between items-center relative z-10">
                    <span className="text-[8px] sm:text-[9px] text-slate-400 font-mono">Page {currentBookPage * 2 + 2}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-6 text-xs font-bold">
                <button onClick={prevBookPage} disabled={currentBookPage === 0} className="p-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors shadow-2xs flex items-center gap-1"><ChevronLeft size={14} /> Flip Back</button>
                <span className="text-slate-500 text-xs font-mono">Document {currentBookPage + 1} of {bookPages.length}</span>
                <button onClick={nextBookPage} disabled={currentBookPage === bookPages.length - 1} className="p-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors shadow-2xs flex items-center gap-1">Flip Forward <ChevronRight size={14} /></button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-br from-[#0D1137] to-slate-900 text-white p-6 sm:p-8 rounded-2xl border-l-4 border-[#E23744] shadow-xl space-y-6">
              <div><span className="text-[9px] font-mono tracking-widest font-extrabold uppercase bg-[#E23744] text-white px-2 py-0.5 rounded">MOBILE CONVERGENCE NODE</span><h4 className="text-xl sm:text-2xl font-bold font-lora tracking-wide text-white mt-4">Deploy Orders Directly via Android</h4><p className="text-xs text-slate-300 mt-2 leading-relaxed font-poppins">Ready to calculate weights and submit procurement contracts? Tap below to initialize our automated logistics software hub directly via the official Android deployment ecosystem marketplace app path.</p></div>
              <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex w-full py-4 bg-[#E23744] text-white text-xs font-bold rounded-xl items-center justify-center gap-2 hover:bg-[#c62828] transition-all transform hover:-translate-y-0.5 shadow-md tracking-widest uppercase font-poppins"><Download size={16} /> INITIALIZE ORDER IN APP <ArrowUpRight size={14} /></a>
            </div>
          </div>
        </div>

        {/* SECTION 7: OPERATIONS MULTI-MEDIA REELS */}
        <div id="media-section" className="max-w-4xl mx-auto px-6 py-12 font-poppins scroll-mt-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.length === 0 ? (
              <div className="col-span-2 text-center text-slate-400 py-12 font-poppins text-xs border border-dashed border-slate-300 bg-white rounded-2xl">
                No video reels uploaded to grid cluster yet.
              </div>
            ) : (
              videos.map((vid) => (
                <div key={vid._id} className="bg-white rounded-2xl border border-slate-300 overflow-hidden shadow-xs hover:border-[#2F8DC7] transition-all duration-200">
                  <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                    {vid.videoUrl && vid.videoUrl.includes('youtube.com/embed') ? (
                      <iframe
                        src={vid.videoUrl}
                        title={vid.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <div className="h-full w-full bg-slate-900 flex flex-col items-center justify-center text-white p-4">
                        <Video size={40} className="text-[#E23744] mb-2" />
                        <span className="text-xs font-mono font-bold">{vid.title}</span>
                      </div>
                    )}
                    <span className="absolute bottom-2 right-2 bg-black/80 text-white font-mono text-[9px] px-2 py-0.5 rounded backdrop-blur-xs font-bold pointer-events-none z-10">
                      {vid.duration || '02:45'}
                    </span>
                  </div>

                  <div className="p-4 bg-white">
                    <h3 className="font-bold text-sm text-slate-900 font-lora">{vid.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">{vid.subtitle || 'Verified Infrastructure Ledger Node Log'}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* SECTION 8: PUBLIC BLOG INSIGHTS */}
        <div id="blog-section" className="max-w-4xl mx-auto px-6 py-16 scroll-mt-28">
          <h2 className="text-2xl sm:text-3xl font-black text-center mb-12 text-[#000000] font-lora">Corporate Intel & Insights Ledger</h2>
          {blogs.length === 0 ? (
            <div className="text-center text-slate-400 py-12 font-poppins text-xs border border-dashed border-slate-300 bg-white rounded-2xl">No insights published on the database grid cluster yet.</div>
          ) : (
            <div className="grid gap-6 font-poppins">
              {blogs.map((b) => (
                <article key={b._id} className="bg-white p-6 border border-slate-300 rounded shadow-xs">
                  <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase text-[#2F8DC7]"><BookOpen size={12} /><span>{b.category}</span></div>
                  <h3 className="text-xl font-bold font-lora text-slate-900 mt-2">{b.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">Written by Executive Node: {b.author} • {new Date(b.createdAt).toLocaleDateString()}</p>
                  <p className="text-sm text-slate-600 mt-4 leading-relaxed whitespace-pre-line">{b.content}</p>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* ADMIN CONTROL PANEL MODAL */}
        {showAdminPanel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 font-poppins">
            <div className="bg-white w-full max-w-5xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
              <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <div className="flex items-center gap-2 text-slate-800">
                  <Lock size={16} className={isAdminAuthenticated ? "text-emerald-500" : "text-[#E23744]"} />
                  <h3 className="font-bold font-lora text-sm">
                    {isAdminAuthenticated ? "Cluster Ledger Console Node: Active" : "System Cryptographic Gate Access Loop"}
                  </h3>
                </div>
                <button 
                  onClick={() => { setShowAdminPanel(false); setIsAdminAuthenticated(false); setAdminPassphrase(''); }} 
                  className="text-xs font-bold text-slate-400 hover:text-slate-900 cursor-pointer"
                >
                  Terminate Connection
                </button>
              </div>

              {!isAdminAuthenticated ? (
                <div className="p-8 flex flex-col items-center justify-center space-y-6 max-w-md mx-auto my-12">
                  <div className="p-4 bg-red-50 text-[#E23744] rounded-full border border-red-100 shadow-inner"><Lock size={28} /></div>
                  <div className="text-center space-y-1">
                    <h4 className="font-bold text-sm text-slate-900 font-lora">Authentication Token Mandated</h4>
                    <p className="text-xs text-slate-400">Provide the baseline administrative operational passcode loop.</p>
                  </div>
                  <form onSubmit={handleAdminAuthSubmit} className="w-full space-y-4">
                    <div className="relative">
                      <input 
                        type={isPassVisible ? "text" : "password"} 
                        value={adminPassphrase} 
                        onChange={(e) => setAdminPassphrase(e.target.value)} 
                        placeholder="Enter primary administrative passphrase..." 
                        className="w-full text-xs p-3.5 pl-4 pr-10 border border-slate-200 rounded-xl bg-[#F8FAFC] font-mono tracking-wide focus:outline-hidden focus:border-[#E23744]" 
                        required 
                      />
                      <button 
                        type="button" 
                        onClick={() => setIsPassVisible(!isPassVisible)} 
                        className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {isPassVisible ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                    <button type="submit" className="w-full py-3.5 bg-[#0D1137] text-white text-xs font-bold rounded-xl tracking-widest uppercase hover:bg-[#1A237E] transition-colors cursor-pointer">Authenticate Node Key</button>
                  </form>
                </div>
              ) : (
                <div className="flex flex-col h-full overflow-hidden">
                  <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setAdminActiveTab('prices')}
                        className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                          adminActiveTab === 'prices'
                            ? 'bg-[#0D1137] text-white shadow-xs'
                            : 'bg-white text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        <TrendingUp size={14} /> Live Steel Rates Control
                      </button>
                      <button
                        onClick={() => setAdminActiveTab('blogs')}
                        className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                          adminActiveTab === 'blogs'
                            ? 'bg-[#0D1137] text-white shadow-xs'
                            : 'bg-white text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        <BookOpen size={14} /> Manage Insights & Blogs
                      </button>
                      <button
                        onClick={() => setAdminActiveTab('videos')}
                        className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                          adminActiveTab === 'videos'
                            ? 'bg-[#0D1137] text-white shadow-xs'
                            : 'bg-white text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        <Video size={14} /> Manage Video Reels
                      </button>
                    </div>
                  </div>

                  {/* TAB 1: LIVE STEEL RATES CONTROL */}
                  {adminActiveTab === 'prices' && (
                    <div className="p-6 overflow-y-auto space-y-6">
                      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
                        <h4 className="font-bold text-sm text-slate-900 mb-4 border-b pb-2 flex items-center gap-2">
                          <TrendingUp size={16} className="text-[#E23744]" /> Update Daily Category Rates (₹/MT)
                        </h4>

                        <form onSubmit={handleUpdatePrice} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                          <div className="md:col-span-4">
                            <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                              Product Category Line
                            </label>
                            <select
                              value={editPriceItem}
                              onChange={(e) => setEditPriceItem(e.target.value)}
                              className="w-full text-xs p-3 border border-slate-200 rounded-lg bg-[#F8FAFC] font-semibold text-slate-800 focus:outline-[#E23744] cursor-pointer"
                            >
                              <option>Steel TMT Rebars (Fe 550D)</option>
                              <option>ISMC Channels</option>
                              <option>Structural Angles (MS/GI)</option>
                              <option>Commercial Iron Flats</option>
                              <option>ISMB Structural Joists</option>
                              <option>HR / CR Steel Sheets</option>
                              <option>Color Profile Roofing Sheets</option>
                            </select>
                          </div>

                          <div className="md:col-span-3">
                            <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                              New Daily Rate (₹ / Metric Ton)
                            </label>
                            <input
                              type="number"
                              value={editPriceVal}
                              onChange={(e) => setEditPriceVal(e.target.value)}
                              placeholder="e.g. 58500"
                              className="w-full text-xs p-3 border border-slate-200 rounded-lg bg-[#F8FAFC] focus:outline-[#E23744] font-mono"
                              required
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                              Daily Change (%)
                            </label>
                            <input
                              type="number"
                              step="0.1"
                              value={editPriceChange}
                              onChange={(e) => setEditPriceChange(e.target.value)}
                              placeholder="0.5"
                              className="w-full text-xs p-3 border border-slate-200 rounded-lg bg-[#F8FAFC] focus:outline-[#E23744] font-mono"
                            />
                          </div>

                          <div className="md:col-span-1">
                            <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                              Trend
                            </label>
                            <button
                              type="button"
                              onClick={() => setEditPriceUp(!editPriceUp)}
                              className={`w-full py-3 text-xs font-bold rounded-lg border text-center cursor-pointer ${
                                editPriceUp
                                  ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                  : 'bg-red-50 text-red-600 border-red-200'
                              }`}
                            >
                              {editPriceUp ? '▲ Up' : '▼ Down'}
                            </button>
                          </div>

                          <div className="md:col-span-2">
                            <button
                              type="submit"
                              className="w-full py-3 bg-[#E23744] text-white text-xs font-bold rounded-lg hover:bg-[#c62828] transition-colors cursor-pointer uppercase tracking-wider"
                            >
                              Save Rate
                            </button>
                          </div>
                        </form>
                      </div>

                      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                        <h5 className="text-xs font-bold text-slate-800 mb-3 border-b pb-2">
                          Active Live Ticker Rates in Database
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {tickerPrices.map((p, idx) => (
                            <div key={idx} className="p-3 border border-slate-100 rounded-lg bg-[#F8FAFC] flex justify-between items-center">
                              <div>
                                <p className="text-xs font-bold text-slate-900">{p.item}</p>
                                <p className="text-xs font-mono font-bold text-[#0D1137] mt-0.5">₹{Number(p.price).toLocaleString('en-IN')}/MT</p>
                              </div>
                              <span className={`text-[10px] font-bold px-2 py-1 rounded ${p.up ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                {p.up ? '+' : ''}{p.change}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: INSIGHTS & BLOGS MANAGEMENT */}
                  {adminActiveTab === 'blogs' && (
                    <div className="p-6 overflow-y-auto grid lg:grid-cols-12 gap-6 items-start">
                      <form onSubmit={handlePublishBlog} className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs lg:col-span-5 space-y-3.5">
                        <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5 border-b pb-2 mb-2"><PlusCircle size={14} className="text-[#E23744]" /> Inject Insight Document Node</h4>
                        <div>
                          <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Document Title</label>
                          <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="e.g. Structural Price Fluctuations" className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-[#F8FAFC] focus:outline-[#E23744]" required />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Category Filter</label>
                            <select value={newCategory} onChange={e => setNewCategory(e.target.value)} className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-[#F8FAFC] focus:outline-[#E23744] font-semibold cursor-pointer"><option>Market Trends</option><option>Supply Chain</option><option>Technical Specs</option><option>Platform News</option></select>
                          </div>
                          <div>
                            <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Author Identity</label>
                            <input type="text" value={newAuthor} onChange={e => setNewAuthor(e.target.value)} placeholder="e.g. shubham_raj" className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-[#F8FAFC] focus:outline-[#E23744]" required />
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Body Text Content Stream</label>
                          <textarea rows={4} value={newContent} onChange={e => setNewContent(e.target.value)} placeholder="Write article content parameters..." className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-[#F8FAFC] focus:outline-[#E23744] resize-none" required />
                        </div>
                        <button type="submit" className="w-full py-3 bg-[#0D1137] text-white text-xs font-bold rounded-lg hover:bg-[#1A237E] transition-colors cursor-pointer tracking-wide uppercase">Commit to Remote Database</button>
                      </form>
                      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs lg:col-span-7 h-full flex flex-col max-h-[450px]">
                        <h4 className="font-bold text-xs text-slate-900 border-b pb-2 mb-3">Live Active Database Node Log Stream</h4>
                        {blogs.length === 0 ? (
                          <p className="text-xs text-slate-400 text-center py-12 font-mono">No transaction logs captured within data layout schema buffer.</p>
                        ) : (
                          <div className="space-y-2.5 overflow-y-auto pr-1 flex-grow">
                            {blogs.map((b) => (
                              <div key={b._id} className="p-3.5 border border-slate-100 rounded-lg flex items-center justify-between bg-[#F8FAFC]">
                                <div className="max-w-[78%]"><h5 className="text-xs font-black text-slate-900 truncate font-lora">{b.title}</h5><p className="text-[9px] font-mono text-slate-400 mt-0.5">UID: {b._id} • Node Owner: {b.author}</p></div>
                                <button onClick={() => handleDeleteBlog(b._id)} className="p-2 text-gray-400 hover:text-[#E23744] hover:bg-red-50 rounded transition-colors cursor-pointer"><Trash2 size={14} /></button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* TAB 3: VIDEO REELS MANAGEMENT */}
                  {adminActiveTab === 'videos' && (
                    <div className="p-6 overflow-y-auto grid lg:grid-cols-12 gap-6 items-start">
                      <form onSubmit={handlePublishVideo} className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs lg:col-span-5 space-y-3.5">
                        <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5 border-b pb-2 mb-2">
                          <Video size={14} className="text-[#E23744]" /> Add Operations Video Reel
                        </h4>
                        <div>
                          <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Video Title</label>
                          <input type="text" value={newVideoTitle} onChange={e => setNewVideoTitle(e.target.value)} placeholder="e.g. TMT Bending & Quality Check" className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-[#F8FAFC]" required />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">YouTube / Embed Video URL</label>
                          <input type="url" value={newVideoUrl} onChange={e => setNewVideoUrl(e.target.value)} placeholder="https://www.youtube.com/embed/..." className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-[#F8FAFC]" required />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Subtitle / Description</label>
                            <input type="text" value={newVideoSubtitle} onChange={e => setNewVideoSubtitle(e.target.value)} placeholder="Verified Yard Dispatch" className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-[#F8FAFC]" />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Duration (mm:ss)</label>
                            <input type="text" value={newVideoDuration} onChange={e => setNewVideoDuration(e.target.value)} placeholder="02:30" className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-[#F8FAFC]" />
                          </div>
                        </div>
                        <button type="submit" className="w-full py-3 bg-[#0D1137] text-white text-xs font-bold rounded-lg hover:bg-[#1A237E] transition-colors cursor-pointer tracking-wide uppercase">
                          Add Video Reel
                        </button>
                      </form>

                      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs lg:col-span-7 h-full flex flex-col max-h-[450px]">
                        <h4 className="font-bold text-xs text-slate-900 border-b pb-2 mb-3">Live Video Reels Stream</h4>
                        <div className="space-y-2.5 overflow-y-auto pr-1 flex-grow">
                          {videos.map((v) => (
                            <div key={v._id} className="p-3.5 border border-slate-100 rounded-lg flex items-center justify-between bg-[#F8FAFC]">
                              <div>
                                <h5 className="text-xs font-bold text-slate-900 truncate">{v.title}</h5>
                                <p className="text-[9px] font-mono text-slate-400">{v.duration} • {v.subtitle}</p>
                              </div>
                              <button onClick={() => handleDeleteVideo(v._id)} className="p-2 text-gray-400 hover:text-[#E23744] hover:bg-red-50 rounded transition-colors cursor-pointer">
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="bg-[#000000] text-slate-400 px-8 py-12 border-t border-slate-800 text-xs font-poppins relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3">
              <img src={appIcon} alt="" width="32" height="32" className="h-8 w-8 object-contain shrink-0" />
              <p className="font-bold text-white text-sm font-lora">Steel Suvidha Platforms Ltd.</p>
            </div>
            <p className="mt-1 text-slate-500">Corporate System Portal Interface Matrix • All rights reserved 2026.</p>
            <p className="mt-4 text-slate-600 text-[11px]">
              Developed and designed by{" "}
              <a href="https://pixelnode-agency.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-[#2F8DC7] font-bold underline underline-offset-4 hover:text-white transition-colors cursor-pointer">
                Pixelnode Agency
              </a>
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <span className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider">OFFICIAL SYSTEM PLATFORM</span>
            <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex bg-slate-900 border border-slate-700 hover:border-slate-500 rounded-lg px-4 py-2 items-center gap-3 transition-colors shadow-lg group">
              <svg className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 2.083c-.157.172-.25.438-.25.772v18.289c0 .334.093.6.25.772l.061.056 10.334-10.334v-.276L3.67 2.027l-.061.056zm14.316 10.158l3.66-2.09c1.026-.586 1.026-1.543 0-2.13l-3.66-2.09-3.957 3.957 3.957 3.953zm-4.321-4.317l-3.232-3.232L3.899 2.196c.237-.061.548-.035.918.175l11.517 6.577-2.962 2.962zm0 4.156l2.962 2.962L4.817 21.63c-.37.21-.681.236-.918.175l6.471-6.471 3.232-3.232z"/>
              </svg>
              <div className="text-left">
                <p className="text-[9px] text-slate-400 uppercase tracking-tight leading-none">GET IT ON</p>
                <p className="text-xs text-white font-bold tracking-wide mt-0.5 leading-none">Google Play</p>
              </div>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}