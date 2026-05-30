import React, { useState, useEffect } from 'react';
import { 
  Building2, BookOpen, Layers, ClipboardList, Video, 
  Settings, Trash2, PlusCircle, ArrowUpRight, CheckCircle, 
  Clock, ShieldCheck, Truck, BarChart3, ChevronRight,
  HardHat, Factory, Sliders, FileText, UserCheck, Briefcase,
  Flame, Anchor, Layers3
} from 'lucide-react';

export default function App() {
  const [blogs, setBlogs] = useState([]);
  const [orderFilter, setOrderFilter] = useState('All');
  
  // Admin form state bindings
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Market Trends');
  const [newAuthor, setNewAuthor] = useState('');
  const [newContent, setNewContent] = useState('');

  const API_URL = 'http://localhost:5000/api/blogs';

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
        
        <nav className="hidden lg:flex items-center gap-1 font-poppins text-xs font-semibold">
          {[
            { id: 'hero-section', label: 'Home' },
            { id: 'catalog-section', label: 'Product Catalog' },
            { id: 'about-section', label: 'About Us' },
            { id: 'services-section', label: 'Our Services' },
            { id: 'portal-section', label: 'Portal Showcase' },
            { id: 'media-section', label: 'Media Hub' },
            { id: 'blog-section', label: 'Insights Blog' },
            { id: 'admin-section', label: 'Admin Control', icon: <Settings size={12} className="inline mr-1" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollToSection(tab.id)}
              className="px-4 py-2.5 rounded transition-all duration-150 cursor-pointer text-slate-600 hover:bg-slate-100 hover:text-black"
            >
              {tab.icon}{tab.label}
            </button>
          ))}
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
            
            {/* 1. TMT Card */}
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

            {/* 2. Angles Card */}
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

            {/* 3. Flats Card */}
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

            {/* 4. Square & Round Bars */}
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

            {/* 5. Heavy Channels & ISMB Joists */}
            <div className="bg-white p-6 border border-slate-300 rounded shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-base text-slate-900 flex items-center gap-2 border-b pb-2 mb-3"><Factory size={18} className="text-slate-800" /> Channels & Joists (ISMB)</h4>
                <p className="text-xs text-slate-400 mb-1 font-bold">ISMC CHANNELS:</p>
                <p className="text-[11px] font-mono text-slate-700 mb-2 truncate">70×40, 75×40 (ULC/LC/MC/H), 100×50 (LC/MC/H), 125×65, 150×75, 200×75, 250×75</p>
                <p className="text-xs text-slate-400 mb-1 font-bold">ISMB JOISTS:</p>
                <p className="text-xs font-mono font-bold text-slate-700">ISMB 100, 125, 150, 200, 250, 300, 350, 400</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 font-mono">Z-Angle (L/H) • Gate Channels: 13 ft to 18 ft</div>
            </div>

            {/* 6. Plates & Industrial Sheets */}
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

        {/* SECTION 5: INTERACTIVE CLIENT PORTAL BOOK */}
        <div id="portal-section" className="max-w-4xl mx-auto px-6 py-12 font-poppins">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-black font-lora">Interactive Order Book</h2>
              <p className="text-xs text-gray-500">Live platform telemetry simulator module.</p>
            </div>
            <div className="flex gap-2 bg-slate-200 p-1 rounded text-xs font-bold border border-slate-300">
              {['All', 'Pending', 'Processing', 'Completed'].map((f) => (
                <button key={f} onClick={() => setOrderFilter(f)} className={`px-3 py-1.5 rounded cursor-pointer ${orderFilter === f ? 'bg-[#0D1137] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-300'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            {mockOrders.filter(o => orderFilter === 'All' || o.status === orderFilter).map((order) => (
              <div key={order.id} className="bg-white p-5 border border-slate-300 rounded flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-50 rounded border border-slate-200 text-slate-600"><ClipboardList size={20} /></div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-slate-900">{order.item}</span>
                      <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 border border-slate-200 rounded">{order.id}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{order.client} • Volume: {order.qty}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded border ${order.status === 'Completed' ? 'bg-green-50 text-green-600 border-green-200' : order.status === 'Processing' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-amber-50 text-amber-600 border-amber-200'}`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 6: MULTI-MEDIA LOGISTICS HUB */}
        <div id="media-section" className="max-w-4xl mx-auto px-6 py-12 font-poppins">
          <div className="bg-amber-50 border border-amber-300 rounded p-6 flex gap-4 items-start mb-12">
            <Clock className="text-[#FF9100] shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="text-sm font-bold text-amber-900">On-Site Dispatch Videography Framework Clause</h4>
              <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                For multi-media dispatch capturing sessions located beyond a 10 km radius from corporate regional hubs, an additional production logistics tariff of ₹500 per media node specialist applies for system file record updates.
              </p>
            </div>
          </div>

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
        <div id="blog-section" className="max-w-4xl mx-auto px-6 py-12">
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

        {/* SECTION 8: ADMINISTRATIVE CONTROL DESK */}
        <div id="admin-section" className="max-w-6xl mx-auto px-6 py-12 font-poppins">
          <div className="mb-8 border-b border-slate-300 pb-4">
            <h2 className="text-2xl font-black font-lora text-gray-900">Central Control Platform</h2>
            <p className="text-xs text-slate-500 mt-1">Authenticated system operations dashboard context framework.</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <form onSubmit={handlePublishBlog} className="bg-white p-6 rounded border border-slate-300 shadow-xs lg:col-span-5 space-y-4">
              <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2 mb-2"><PlusCircle size={16} className="text-[#E23744]" />Publish Corporate Insight Node</h3>
              
              <div>
                <label className="text-[11px] font-bold uppercase text-slate-400 block mb-1">Insight Title</label>
                <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="e.g. Price Fluctuations Q2 2026" className="w-full text-xs p-3 border border-slate-300 rounded bg-[#F8F9FA] focus:outline-[#E23744]" required />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-400 block mb-1">Category Scope</label>
                  <select value={newCategory} onChange={e => setNewCategory(e.target.value)} className="w-full text-xs p-3 border border-slate-300 rounded bg-[#F8F9FA] focus:outline-[#E23744]">
                    <option>Market Trends</option><option>Supply Chain</option><option>Technical Specs</option><option>Platform News</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-400 block mb-1">Author Identity</label>
                  <input type="text" value={newAuthor} onChange={e => setNewAuthor(e.target.value)} placeholder="e.g. shubham_raj" className="w-full text-xs p-3 border border-slate-300 rounded bg-[#F8F9FA] focus:outline-[#E23744]" required />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-slate-400 block mb-1">Markdown Body Stream Content</label>
                <textarea rows={5} value={newContent} onChange={e => setNewContent(e.target.value)} placeholder="Write technical logs here..." className="w-full text-xs p-3 border border-slate-300 rounded bg-[#F8F9FA] focus:outline-[#E23744] resize-none" required />
              </div>

              <button type="submit" className="w-full py-3 bg-[#0D1137] text-white text-xs font-bold rounded flex items-center justify-center gap-2 hover:bg-[#1A237E] transition-colors cursor-pointer">
                Inject Node Record & Publish
              </button>
            </form>

            <div className="bg-white p-6 rounded border border-slate-300 shadow-xs lg:col-span-7">
              <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2 mb-4"><Layers size={16} className="text-[#2F8DC7]" />Live Active Cluster Ledger Records</h3>
              {blogs.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-8">MongoDB record buffer empty.</p>
              ) : (
                <div className="space-y-3">
                  {blogs.map((b) => (
                    <div key={b._id} className="p-4 border border-slate-100 rounded flex items-center justify-between bg-[#F8F9FA]">
                      <div className="max-w-[80%]">
                        <h4 className="text-xs font-black text-gray-900 truncate font-lora">{b.title}</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">ID: {b._id} • By {b.author}</p>
                      </div>
                      <button onClick={() => handleDeleteBlog(b._id)} className="p-2 text-gray-400 hover:text-[#E23744] hover:bg-red-50 rounded transition-colors cursor-pointer">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#000000] text-slate-400 px-8 py-12 border-t border-slate-800 text-xs font-poppins relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-bold text-white text-sm font-lora">Steel Suvidha Platforms Ltd.</p>
            <p className="mt-1 text-slate-500">Corporate System Portal Interface Matrix • All rights reserved 2026.</p>
          </div>
          <div className="flex gap-4 text-slate-500 items-center">
            <span>Powered by Pixelnode Agency </span>
            <span>•</span>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors cursor-pointer">Back to Top</button>
          </div>
        </div>
      </footer>
    </div>
  );
}