import React from "react";
import Layout from "../components/Layout";

const About = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-cyan-600 mb-6 text-center">Tentang Kami</h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Informasi Pengembang</h2>
          <p className="text-gray-700 text-lg">
            Nama: <span className="font-medium">Yusmia Washiatus Sani</span><br />
            NPM: <span className="font-medium">22081010114</span>
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Tujuan Website</h2>
          <p className="text-gray-700 text-lg">
            Website ini dibuat untuk keperluan <span className="font-medium">Ujian Kompetensi Keahlian (Ujikom)</span>. 
            Website ini merupakan simulasi toko obat online yang menyediakan informasi produk, 
            kemudahan pencarian, dan pengalaman belanja virtual yang aman dan cepat. 
            Tujuannya adalah untuk mempraktikkan konsep fullstack development, penggunaan React, 
            REST API, serta integrasi frontend-backend.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Fitur Website</h2>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
            <li>Menampilkan daftar produk obat, vitamin, dan produk kesehatan.</li>
            <li>Pencarian produk berbasis kata kunci.</li>
            <li>Detail produk lengkap dengan harga dan gambar.</li>
            <li>Keranjang belanja sederhana untuk menambahkan produk.</li>
            <li>Login dan akses profil pengguna.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Pengembangan Lebih Lanjut</h2>
          <p className="text-gray-700 text-lg">
            Kedepannya, website ini dapat dikembangkan dengan menambahkan fitur:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
            <li>Transaksi pembayaran online.</li>
            <li>Rating dan review produk dari pengguna.</li>
            <li>Filter produk berdasarkan kategori, harga, atau popularitas.</li>
            <li>Integrasi notifikasi dan email untuk promo dan update produk.</li>
            <li>Responsif dan optimalisasi untuk berbagai perangkat.</li>
          </ul>
        </section>

      
      </div>
    </Layout>
  );
};

export default About;
