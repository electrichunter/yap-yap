"use client";

import Link from 'next/link';

import { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="w-full border-b border-black/5 bg-[#edede9]/95 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tighter text-primary z-50 relative">

                    <span>YAP<span className="text-foreground">YAP</span></span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/hakkimizda" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                        HAKKIMIZDA
                    </Link>
                    <Link href="/calisma-alanimiz" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                        HİZMETLER
                    </Link>
                    <Link href="/ekibimiz" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                        EKİBİMİZ
                    </Link>
                    <Link href="/iletisim" className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-none hover:opacity-90 transition-opacity">
                        TEKLİF AL
                    </Link>
                    <Link href="/login" className="px-5 py-2.5 border border-primary text-primary text-sm font-bold rounded-none hover:bg-primary hover:text-primary-foreground transition-colors flex items-center gap-2">
                        <span>🔒</span> GİRİŞ YAP
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={toggleMenu}
                    className="flex flex-col gap-1.5 md:hidden z-50 relative p-2"
                    aria-label="Toggle Menu"
                >
                    <span className={`block w-6 h-0.5 bg-foreground transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-foreground transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-foreground transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>

                {/* Mobile Menu Overlay */}
                <div className={`fixed inset-0 bg-[#edede9] z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 ease-in-out md:hidden ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                    <Link onClick={toggleMenu} href="/" className="text-2xl font-bold text-foreground hover:text-primary">
                        ANA SAYFA
                    </Link>
                    <Link onClick={toggleMenu} href="/hakkimizda" className="text-2xl font-bold text-foreground hover:text-primary">
                        HAKKIMIZDA
                    </Link>
                    <Link onClick={toggleMenu} href="/calisma-alanimiz" className="text-2xl font-bold text-foreground hover:text-primary">
                        HİZMETLER
                    </Link>
                    <Link onClick={toggleMenu} href="/ekibimiz" className="text-2xl font-bold text-foreground hover:text-primary">
                        EKİBİMİZ
                    </Link>
                    <Link onClick={toggleMenu} href="/iletisim" className="mt-4 px-8 py-3 bg-primary text-primary-foreground text-xl font-bold rounded-none">
                        TEKLİF AL
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
