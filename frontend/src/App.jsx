import React, { useState, useEffect } from 'react';
import { 
  Building2, BookOpen, Layers, ClipboardList, Video, 
  Settings, Trash2, PlusCircle, ArrowUpRight, CheckCircle, 
  Clock, ShieldCheck, Truck, BarChart3, ChevronRight, ChevronLeft, 
  Download, HardHat, Factory, Sliders, FileText, UserCheck, 
  Briefcase, Flame, Anchor, Layers3, Lock, Activity, Eye, EyeOff
} from 'lucide-react';

export default function App() {
  const [blogs, setBlogs] = useState([]);
  const [orderFilter, setOrderFilter] = useState('All');
  
  // Interactive 3D Book Page Turning State Engine
  const [currentBookPage, setCurrentBookPage] = useState(0);
  
  // 🔒 Security Isolation State Matrix
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminPassphrase, setAdminPassphrase] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isPassVisible, setIsPassVisible] = useState(false);

  // Admin form state bindings
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Market Trends');
  const [newAuthor, setNewAuthor] = useState('');
  const [newContent, setNewContent] = useState('');

  const API_URL = 'http://localhost:5000/api/blogs';
  const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.steelsuvidha.app";

  const fetchBlogs = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error("Error communicating with backend database API:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handlePublishBlog = async (e) => {
    e.preventDefault();
    if (!newTitle || !newAuthor || !newContent) return;

    try {
      const res = await fetch(API_URL, {
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
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchBlogs();
      }
    } catch (err) {
      console.error("Purge request failed:", err);
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleAdminAuthSubmit = (e) => {
    e.preventDefault();
    // Cryptographic token string passphrase verification block
    if (adminPassphrase === "suvidha_admin_2026") {
      setIsAdminAuthenticated(true);
    } else {
      alert("Security Violation: Invalid Cryptographic Access Key Token.");
      setAdminPassphrase('');
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

  const mockOrders = [
    { id: '#SS-9842', item: 'TMT Reinforced Bars', qty: '120 Tons', status: 'Processing', client: 'Patna Infrastructure Ltd' },
    { id: '#SS-8921', item: 'Structural I-Beams', qty: '50 Tons', status: 'Pending', client: 'Steel Suvidha Enterprise' },
    { id: '#SS-7611', item: 'Galvanized Angle Steel', qty: '15 Tons', status: 'Completed', client: 'Bihar Grid Corp' },
    { id: '#SS-4412', item: 'Industrial Channel Rails', qty: '85 Tons', status: 'Quoted', client: 'Mithila Steel Yards' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F5F9] text-[#263238] selection:bg-[#E23744] selection:text-white antialiased">
      
      {/* ─── STEEL GRID BACKGROUND MATRIX ─── */}
      <div className="fixed inset-0 pointer-events-none opacity-40 z-0" style={{
        backgroundImage: `
          linear-gradient(to right, #cbd5e1 1px, transparent 1px),
          linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }} />
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0" style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, #000000 2px, transparent 2px)`,
        backgroundSize: '16px 16px'
      }} />

      {/* ─── HEADER ─── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-300/80 px-8 py-4 flex items-center justify-between shadow-xs">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="flex items-center cursor-pointer transition-opacity hover:opacity-90 focus:outline-hidden"
        >
          <img 
            src="/src/assets/Website Logo.png" 
            alt="Steel Suvidha Logo" 
            className="h-11 w-auto object-contain" 
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </button>
        
        {/* PUBLIC CLEAN NAV: Tab link trigger for admin has been strictly purged */}
        <nav className="hidden lg:flex items-center gap-1 font-poppins text-xs font-semibold">
          {[
            { id: 'hero-section', label: 'Home' },
            { id: 'catalog-section', label: 'Product Catalog' },
            { id: 'about-section', label: 'About Us' },
            { id: 'services-section', label: 'Our Services' },
            { id: 'portal-section', label: 'Portal Showcase' },
            { id: 'media-section', label: 'Media Hub' },
            { id: 'blog-section', label: 'Insights Blog' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollToSection(tab.id)}
              className="px-4 py-2.5 rounded transition-all duration-150 cursor-pointer text-slate-600 hover:bg-slate-100 hover:text-black"
            >
              {tab.label}
            </button>
          ))}
          
          {/* Secret Hidden Dynamic Gateway Access Point */}
          <button 
            onClick={() => setShowAdminPanel(true)} 
            className="w-9 h-9 ml-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-400 flex items-center justify-center hover:text-[#E23744] hover:bg-red-50 transition-colors cursor-pointer"
            title="SS System Gateway Node"
          >
            <Lock size={13} />
          </button>
        </nav>
      </header>

      {/* ─── CONTINUOUS SCROLLABLE PRIMARY VIEWPORT ─── */}
      <main className="flex-grow relative z-10 space-y-20">
        
        {/* SECTION 1: HERO DISPLAY */}
        <div id="hero-section" className="w-full pt-12">
          <div className="max-w-7xl mx-auto px-8 py-20 lg:py-28 grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-4xl md:text-6xl font-black text-[#000000] tracking-tight leading-[1.05] font-lora">
                Simplifying and Modernizing the <span className="text-[#0D1137] underline decoration-[#E23744] decoration-4 underline-offset-8">Steel Supply</span> Experience.
              </h2>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed font-poppins max-w-2xl">
                Welcome to Steel Suvidha, where we are committed to simplifying and modernizing the steel and construction supply experience. We focus on delivering quality materials, reliable service, and seamless solutions that empower businesses, builders, and individuals alike.
              </p>
            </div>

            {/* Sidebar Info Panels */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 font-poppins">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 rounded border border-slate-700 shadow-xl flex flex-col justify-between h-48 relative overflow-hidden group">
                <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-4 pointer-events-none">
                  <Factory size={160} />
                </div>
                <HardHat size={28} className="text-[#FF9100]" />
                <div>
                  <h4 className="font-bold text-sm tracking-wide text-slate-200">Mill-Certified Stock</h4>
                  <p className="text-[11px] text-slate-400 mt-1">Direct testing logs mapped to physical batch containers.</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded border border-slate-300 shadow-xs flex flex-col justify-between h-48">
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

        {/* SECTION 2: FULL COMPREHENSIVE PRODUCT CATALOG TILES */}
        <div id="catalog-section" className="max-w-7xl mx-auto px-8 py-16 font-poppins">
          <div className="border-l-4 border-[#E23744] pl-4 mb-12">
            <p className="text-xs font-extrabold text-[#2F8DC7] tracking-widest uppercase">MASTER MATERIAL LEDGER</p>
            <h3 className="text-3xl font-black font-lora text-gray-900 mt-0.5">Unified Product Specifications Matrix</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* TMT Card */}
            <div className="bg-white p-6 border border-slate-300 rounded shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-base text-slate-900 flex items-center gap-2 border-b pb-2 mb-3"><Flame size={18} className="text-[#E23744]" /> Steel TMT Bars</h4>
                <p className="text-xs text-slate-400 mb-1 font-bold">SIZES AVAILABLE:</p>
                <p className="text-xs font-mono font-bold text-slate-700">6 mm, 8 mm, 10 mm, 12 mm, 16 mm, 20 mm, 25 mm, 32 mm</p>
                <p className="text-xs text-slate-400 mt-3 font-bold">VARIANTS / BRANDS:</p>
                <p className="text-xs text-slate-600">500 D, 550 D, 600 D • TATA Tiscon, SAIL, Jindal, JSW, Shyam Steel, Rungta</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 font-mono">Variables: Weight per length / Rate per kg / Rate Difference</div>
            </div>

            {/* Angles Card */}
            <div className="bg-white p-6 border border-slate-300 rounded shadow-xs flex flex-col justify-between">
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

            {/* Flats Card */}
            <div className="bg-white p-6 border border-slate-300 rounded shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-base text-slate-900 flex items-center gap-2 border-b pb-2 mb-3"><Layers3 size={18} className="text-[#2F8DC7]" /> Commercial Flats</h4>
                <p className="text-xs text-slate-400 mb-1 font-bold">DIMENSIONS AVAILABLE:</p>
                <p className="text-[11px] font-mono font-bold text-slate-700 h-16 overflow-y-auto pr-1">
                  F 20×3, 20×5, 20×6, 25×3, 25×5, 25×6, 25×10, 25×12, 32×5, 32×6, 32×8, 32×10, 40×5, 40×6, 40×8, 40×10, 40×12, 50×5, 50×6, 50×8, 50×10, 50×12, 65×6, 65×8, 65×10, 65×12, 75×6, 75×8, 75×10, 75×12, 75×16, 100×8, 100×12
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 font-mono">Variables: MS, GI / Weight per length of 6 mtr</div>
            </div>

            {/* Square & Round Bars */}
            <div className="bg-white p-6 border border-slate-300 rounded shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-base text-slate-900 flex items-center gap-2 border-b pb-2 mb-3"><Anchor size={18} className="text-slate-700" /> Square & Round Bars</h4>
                <p className="text-xs text-slate-400 mb-1 font-bold">SQUARE BARS COILS:</p>
                <p className="text-xs font-mono font-bold text-slate-700 mb-2">8 mm, 10 mm, 12 mm, 16 mm, 20 mm, 25 mm, 32 mm, 40 mm</p>
                <p className="text-xs text-slate-400 mb-1 font-bold">ROUND BARS STRUCTURAL:</p>
                <p className="text-xs font-mono font-bold text-slate-700">8 mm, 10 mm, 12 mm, 16 mm, 20 mm, 25 mm, 32 mm, 40 mm</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 font-mono">Brands: Patna Iron, Kamdhenu, JKSPL, Sel Tiger, SAIL</div>
            </div>

            {/* Heavy Channels & ISMB Joists */}
            <div className="bg-white p-6 border border-slate-300 rounded shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-base text-slate-800 flex items-center gap-2 border-b pb-2 mb-3"><Factory size={18} className="text-slate-800" /> Channels & Joists (ISMB)</h4>
                <p className="text-xs text-slate-400 mb-1 font-bold">ISMC CHANNELS:</p>
                <p className="text-[11px] font-mono text-slate-700 mb-2 truncate">70×40, 75×40 (ULC/LC/MC/H), 100×50 (LC/MC/H), 125×65, 150×75, 200×75, 250×75</p>
                <p className="text-xs text-slate-400 mb-1 font-bold">ISMB JOISTS:</p>
                <p className="text-xs font-mono font-bold text-slate-700">ISMB 100, 125, 150, 200, 250, 300, 350, 400</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 font-mono">Z-Angle (L/H) • Gate Channels: 13 ft to 18 ft</div>
            </div>

            {/* Plates & Industrial Sheets */}
            <div className="bg-white p-6 border border-slate-300 rounded shadow-xs flex flex-col justify-between">
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

        {/* SECTION 3: EDITORIAL CORE INFRASTRUCTURE FEATURE */}
        <div id="about-section" className="bg-gradient-to-b from-white to-slate-50 border-y border-slate-300 py-20 font-poppins">
          <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold font-lora tracking-tight text-[#000000] leading-tight">
                Steel is more than just a material; it is the foundation of progress, innovation, and strong relationships.
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We believe high-volume commercial steel trading demands strict adherence to dimensional metrics and transparent quote cycles. Our software eliminates intermediaries, bringing automated accounting systems directly to the distribution floor.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white border border-slate-200 rounded">
                  <Sliders size={18} className="text-[#E23744] mb-2" />
                  <h5 className="font-bold text-xs text-slate-900">Custom Slitting</h5>
                  <p className="text-[11px] text-slate-400 mt-0.5">Cut down to explicit length logs.</p>
                </div>
                <div className="p-4 bg-white border border-slate-200 rounded">
                  <FileText size={18} className="text-[#2F8DC7] mb-2" />
                  <h5 className="font-bold text-xs text-slate-900">MTC Records</h5>
                  <p className="text-[11px] text-slate-400 mt-0.5">Mill Test Certificates exported live.</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0D1137] text-white p-8 rounded border-b-4 border-[#E23744] shadow-xl space-y-6 relative overflow-hidden">
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

        {/* SECTION 4: SERVICES MATRIX */}
        <div id="services-section" className="max-w-5xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-black font-lora text-center mb-12">Marketplace Infrastructure Matrix</h2>
          <div className="grid md:grid-cols-2 gap-6 font-poppins">
            {[
              { t: "Bulk Material Procurement", d: "Direct algorithmic matching pipelines routing industrial contracts directly into high-capacity blast furnaces and local steel mills." },
              { t: "Supplier Node Provisioning", d: "Dedicated real-time telemetry inventory management dashboards constructed custom for authorized independent distribution yards." },
              { t: "Logistics & Fleet Tracking", d: "Route optimization engines providing end-to-end telemetry and delivery status logging." },
              { t: "Smart Quotation Engine", d: "Rapid electronic commercial bid submittals and instant digital invoice parameter parsing." }
            ].map((srv, i) => (
              <div key={i} className="bg-white p-6 border border-slate-300 rounded shadow-xs hover:border-[#2F8DC7] transition-colors duration-150">
                <Layers className="text-[#2F8DC7] mb-3" size={20} />
                <h3 className="font-bold text-base text-[#0D1137]">{srv.t}</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{srv.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 5: INTERACTIVE FLIP-BOOK WITH WATERMARK BACKGROUND BINDING */}
        <div id="portal-section" className="max-w-5xl mx-auto px-8 py-16 font-poppins">
          <div className="border-l-4 border-[#2F8DC7] pl-4 mb-10">
            <p className="text-xs font-extrabold text-[#2F8DC7] tracking-widest uppercase">IMMERSIVE INTERACTION SHOWCASE</p>
            <h3 className="text-3xl font-black text-gray-900 mt-0.5 font-lora">Digital Platform Menu Book</h3>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* 3D Animated Flipbook Engine Panel */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="w-full max-w-xl aspect-[16/10] bg-slate-300 rounded-xl p-2 shadow-2xl relative bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 border border-slate-400/60 flex">
                
                <div className="absolute inset-y-0 left-1/2 w-4 bg-gradient-to-r from-black/20 via-black/5 to-transparent z-20 transform -translate-x-1/2" />

                {/* LEFT PAGE CONTAINER WITH WATERMARK GRAPHIC NODE */}
                <div className="w-1/2 h-full bg-[#FCFBF7] rounded-l p-4 flex flex-col justify-between border-r border-slate-300/40 shadow-inner relative overflow-hidden">
                  
                  {/* APP ICON CORNER WATERMARK BACKGROUND EMBED */}
                  <img 
                    src="/src/assets/App Icon.png" 
                    alt="" 
                    className="absolute bottom-2 left-2 h-14 w-auto object-contain opacity-10 select-none pointer-events-none z-0" 
                  />

                  <div className="space-y-2 relative z-10">
                    <span className="text-[9px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-mono font-bold">
                      SEC: 0{currentBookPage + 1}
                    </span>
                    <h4 className="text-sm font-bold font-lora text-slate-900 leading-tight">
                      {bookPages[currentBookPage].title}
                    </h4>
                    <p className="text-[10px] text-[#2F8DC7] font-bold">
                      {bookPages[currentBookPage].subtitle}
                    </p>
                    <p className="text-[10px] text-slate-500 leading-relaxed pt-1">
                      {bookPages[currentBookPage].desc}
                    </p>
                  </div>
                  <span className="text-[9px] text-slate-400 font-mono relative z-10">Page {currentBookPage * 2 + 1}</span>
                </div>

                {/* RIGHT PAGE CONTAINER WITH WATERMARK GRAPHIC NODE */}
                <div className="w-1/2 h-full bg-[#FCFBF7] rounded-r p-4 flex flex-col justify-between shadow-inner relative overflow-hidden">
                  
                  {/* APP ICON CORNER WATERMARK BACKGROUND EMBED */}
                  <img 
                    src="/src/assets/App Icon.png" 
                    alt="" 
                    className="absolute bottom-2 right-2 h-14 w-auto object-contain opacity-10 select-none pointer-events-none z-0" 
                  />

                  <div className="space-y-2 relative z-10">
                    <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block border-b pb-1">
                      Inventory Index
                    </span>
                    <ul className="space-y-1.5 pt-1">
                      {bookPages[currentBookPage].details.map((item, idx) => (
                        <li key={idx} className="text-[10px] text-slate-700 font-semibold flex items-center gap-1.5">
                          <span className="w-1 h-1 bg-[#E23744] rounded-full"></span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-between items-center relative z-10">
                    <span className="text-[9px] text-slate-400 font-mono">Page {currentBookPage * 2 + 2}</span>
                    <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest font-mono">Suvidha Grid</span>
                  </div>
                </div>
              </div>

              {/* Book Turning Navigation Control Deck */}
              <div className="flex items-center gap-4 mt-6 text-xs font-bold">
                <button 
                  onClick={prevBookPage} 
                  disabled={currentBookPage === 0}
                  className="p-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors shadow-2xs flex items-center gap-1"
                >
                  <ChevronLeft size={14} /> Flip Back
                </button>
                <span className="text-slate-500 text-xs font-mono">
                  Document {currentBookPage + 1} of {bookPages.length}
                </span>
                <button 
                  onClick={nextBookPage} 
                  disabled={currentBookPage === bookPages.length - 1}
                  className="p-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors shadow-2xs flex items-center gap-1"
                >
                  Flip Forward <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Deep Marketplace Interaction Direct Router Links */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0D1137] to-slate-900 text-white p-8 rounded-2xl border-l-4 border-[#E23744] shadow-xl space-y-6">
              <div>
                <span className="text-[9px] font-mono tracking-widest font-extrabold uppercase bg-[#E23744] text-white px-2 py-0.5 rounded">
                  MOBILE CONVERGENCE NODE
                </span>
                <h4 className="text-2xl font-bold font-lora tracking-wide text-white mt-4">
                  Deploy Orders Directly via Android
                </h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed font-poppins">
                  Ready to calculate weights and submit procurement contracts? Tap below to initialize our automated logistics software hub directly via the official Android deployment ecosystem marketplace app path.
                </p>
              </div>

              <a 
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full py-4 bg-[#E23744] text-white text-xs font-bold rounded-xl items-center justify-center gap-2 hover:bg-[#c62828] transition-all transform hover:-translate-y-0.5 shadow-md shadow-red-500/10 tracking-widest uppercase font-poppins"
              >
                <Download size={16} /> INITIALIZE ORDER IN APP <ArrowUpRight size={14} />
              </a>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                <span className="text-[10px] text-slate-400 font-mono font-bold tracking-wider uppercase block">
                  Simulated Active Tonnage Ledger
                </span>
                <div className="space-y-1.5 max-h-[110px] overflow-y-auto pr-1">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="flex justify-between items-center text-[10px] bg-black/20 p-2 rounded border border-white/5">
                      <span className="font-mono text-slate-300">{order.id} • {order.item}</span>
                      <span className="text-[#FF9100] font-bold">{order.qty}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 6: MULTI-MEDIA LOGISTICS HUB */}
        <div id="media-section" className="max-w-4xl mx-auto px-6 py-12 font-poppins">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['Automated Rolling Mills', 'Structural Failure Diagnostics', 'Smarter Yards Loading', 'Client Delivery Handovers'].map((label, idx) => (
              <div key={idx} className="bg-white rounded border border-slate-300 overflow-hidden shadow-xs group cursor-pointer">
                <div className="h-44 bg-slate-100 flex items-center justify-center group-hover:bg-slate-200/80 transition-colors relative border-b border-slate-200">
                  <Video className="text-slate-400 group-hover:scale-110 group-hover:text-[#0D1137] transition-all" size={36} />
                  <span className="absolute bottom-3 right-3 bg-black/70 text-white font-mono text-[9px] px-1.5 py-0.5 rounded">02:45</span>
                </div>
                <div className="p-4"><h3 className="font-bold text-sm text-gray-900">{label}</h3><p className="text-xs text-gray-400 mt-1">Verified Infrastructure Ledger Node Log</p></div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 7: PUBLIC BLOG INSIGHTS FEED */}
        <div id="blog-section" className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-black text-center mb-12 text-[#000000] font-lora">Corporate Intel & Insights Ledger</h2>
          {blogs.length === 0 ? (
            <div className="text-center text-slate-400 py-12 font-poppins text-xs border border-dashed border-slate-300 bg-white rounded">
              No insights published on the database grid cluster yet.
            </div>
          ) : (
            <div className="grid gap-6 font-poppins">
              {blogs.map((b) => (
                <article key={b._id} className="bg-white p-6 border border-slate-300 rounded shadow-xs">
                  <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase text-[#2F8DC7]">
                    <BookOpen size={12} /><span>{b.category}</span>
                  </div>
                  <h3 className="text-xl font-bold font-lora text-slate-900 mt-2">{b.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">Written by Executive Node: {b.author} • {new Date(b.createdAt).toLocaleDateString()}</p>
                  <p className="text-sm text-slate-600 mt-4 leading-relaxed whitespace-pre-line">{b.content}</p>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* ─── ISOLATED/PROTECTED OPERATIONS GATEWAY MODAL VIEWPORT ─── */}
        {showAdminPanel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in font-poppins">
            <div className="bg-white w-full max-w-5xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
              
              {/* Modal Top Verification Navigation Frame */}
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

              {/* Secure Passphrase Gate Layer */}
              {!isAdminAuthenticated ? (
                <div className="p-8 flex flex-col items-center justify-center space-y-6 max-w-md mx-auto my-12">
                  <div className="p-4 bg-red-50 text-[#E23744] rounded-full border border-red-100 shadow-inner">
                    <Lock size={28} />
                  </div>
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
                    <button 
                      type="submit" 
                      className="w-full py-3.5 bg-[#0D1137] text-white text-xs font-bold rounded-xl tracking-widest uppercase hover:bg-[#1A237E] transition-colors cursor-pointer shadow-md shadow-indigo-900/10"
                    >
                      Authenticate Node Key
                    </button>
                  </form>
                </div>
              ) : (
                
                /* Fully Authorized Internal Workspace Control Board */
                <div className="p-6 overflow-y-auto flex-grow grid lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Production Document Form Injection Module */}
                  <form onSubmit={handlePublishBlog} className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs lg:col-span-5 space-y-3.5">
                    <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5 border-b pb-2 mb-2">
                      <PlusCircle size={14} className="text-[#E23744]" /> Inject Insight Document Node
                    </h4>
                    
                    <div>
                      <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Document Title</label>
                      <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="e.g. Structural Price Fluctuations" className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-[#F8FAFC] focus:outline-[#E23744]" required />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Category Filter</label>
                        <select value={newCategory} onChange={e => setNewCategory(e.target.value)} className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-[#F8FAFC] focus:outline-[#E23744] font-semibold cursor-pointer">
                          <option>Market Trends</option><option>Supply Chain</option><option>Technical Specs</option><option>Platform News</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Author Identity</label>
                        <input type="text" value={newAuthor} onChange={e => setNewAuthor(e.target.value)} placeholder="e.g. shubham_raj" className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-[#F8FAFC] focus:outline-[#E23744]" required />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Body Text Stream Content</label>
                      <textarea rows={4} value={newContent} onChange={e => setNewContent(e.target.value)} placeholder="Write article content segments..." className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-[#F8FAFC] focus:outline-[#E23744] resize-none" required />
                    </div>

                    <button type="submit" className="w-full py-3 bg-[#0D1137] text-white text-xs font-bold rounded-lg hover:bg-[#1A237E] transition-colors cursor-pointer tracking-wide uppercase">
                      Commit to Remote Database
                    </button>
                  </form>

                  {/* Operational Ledger Mutator List */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs lg:col-span-7 h-full flex flex-col max-h-[450px]">
                    <h4 className="font-bold text-xs text-slate-900 border-b pb-2 mb-3">
                      Live Active Database Node Log Stream
                    </h4>
                    {blogs.length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-12 font-mono">No transaction documents verified within the MongoDB layout schema buffers.</p>
                    ) : (
                      <div className="space-y-2.5 overflow-y-auto pr-1 flex-grow">
                        {blogs.map((b) => (
                          <div key={b._id} className="p-3.5 border border-slate-100 rounded-lg flex items-center justify-between bg-[#F8FAFC]">
                            <div className="max-w-[78%]">
                              <h5 className="text-xs font-black text-slate-900 truncate font-lora">{b.title}</h5>
                              <p className="text-[9px] font-mono text-slate-400 mt-0.5">UID: {b._id} • Node Owner: {b.author}</p>
                            </div>
                            <button onClick={() => handleDeleteBlog(b._id)} className="p-2 text-slate-400 hover:text-[#E23744] hover:bg-red-50 rounded-md transition-colors cursor-pointer">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              )}
            </div>
          </div>
        )}

      </main>

      {/* ─── CORPORATE COMPREHENSIVE FOOTER ─── */}
      <footer className="bg-[#000000] text-slate-400 px-8 py-12 border-t border-slate-800 text-xs font-poppins relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="font-bold text-white text-sm font-lora">Steel Suvidha Platforms Ltd.</p>
            <p className="mt-1 text-slate-500">Corporate System Portal Interface Matrix • All rights reserved 2026.</p>
            
            {/* HYPERLINKED CLICKABLE DIGITAL AGENCY MARK NODE */}
            <p className="mt-4 text-slate-600 text-[11px]">
              Developed and designed by{" "}
              <a 
                href="https://pixelnode-agency.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#2F8DC7] font-bold underline underline-offset-4 hover:text-white transition-colors cursor-pointer"
              >
                Pixelnode Agency 
              </a>
            </p>
          </div>
          
          {/* HIGH CONVERSION PLAY STORE EXTERNAL VECTOR SYSTEM BADGE */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <span className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider">
              OFFICIAL SYSTEM PLATFORM
            </span>
            <a 
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex bg-slate-900 border border-slate-700 hover:border-slate-500 rounded-lg px-4 py-2 items-center gap-3 transition-colors shadow-lg group"
            >
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