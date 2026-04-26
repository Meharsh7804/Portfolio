'use client';

import DesignTunnel from '@/components/DesignTunnel';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function DesignsPage() {
  return (
    <main className="bg-[#020202]">
      <Navbar />
      <DesignTunnel />
      <Footer />
    </main>
  );
}
