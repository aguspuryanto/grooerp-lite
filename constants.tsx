
import React from 'react';
import { DictionaryItem, Lead, Customer } from './types';

export const COLORS = {
  primary: '#0f172a',
  secondary: '#3b82f6',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
};

export const Icons = {
  Dashboard: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  Inventory: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  Finance: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Sales: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  Project: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
  Manufacturing: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.673.337a4 4 0 01-2.5.476l-1.585-.199a2 2 0 00-1.283.352l-1.458 1.109a2 2 0 00-.738 2.226l.83 2.534a2 2 0 001.796 1.415 42.1 42.1 0 008.787 0 2 2 0 001.796-1.415l.83-2.534a2 2 0 00-.738-2.226l-1.458-1.109z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  CRM: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  Analytics: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Dictionary: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  User: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Bell: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )
};

export const BUSINESS_DICTIONARY: DictionaryItem[] = [
  { term: 'Biaya Overhead', definition: 'Biaya operasional bisnis yang tidak terkait langsung dengan produksi barang atau jasa tertentu.', link: 'https://ukirama.com/blogs/pahami-cara-menghitung-biaya-overhead-pabrik-bop-secara-mudah-disini' },
  { term: 'Buku Besar (General Ledger)', definition: 'Catatan akuntansi pusat yang berisi ringkasan semua transaksi keuangan perusahaan.', link: 'https://ukirama.com/blogs/general-ledger-adalah-definisi-fungsi-dan-cara-membuatnya' },
  { term: 'Dana Fluktuasi (Fluctuating Fund)', definition: 'Metode pengelolaan kas kecil di mana saldo kas kecil tidak harus selalu sama dengan jumlah awal.', link: 'https://ukirama.com/blogs/pengertian-kelebihan-kekurangan-serta-perbedaan-dana-tetap-dan-dana-fluktuasi-dalam-sistem-pencatatan-kas-kecil' },
  { term: 'Dana Tetap (Imprest Fund)', definition: 'Metode pengelolaan kas kecil di mana saldo kas kecil dijaga pada jumlah yang tetap.', link: 'https://ukirama.com/blogs/pengertian-kelebihan-kekurangan-serta-perbedaan-dana-tetap-dan-dana-fluktuasi-dalam-sistem-pencatatan-kas-kecil' },
  { term: 'Jurnal Penutup (Closing Entries)', definition: 'Entri jurnal akhir periode untuk mentransfer saldo akun sementara ke akun permanen.', link: '#' },
  { term: 'Kas Kecil (Petty Cash)', definition: 'Uang tunai untuk membayar pengeluaran kecil yang tidak praktis jika dibayar dengan transfer.', link: '#' },
  { term: 'Purchase Order (PO)', definition: 'Dokumen resmi pembeli kepada penjual yang menunjukkan jenis, jumlah, dan harga produk.', link: '#' }
];

export const MOCK_LEADS: Lead[] = [
  { id: 'LD-001', name: 'Andi Wijaya', company: 'PT Teknologi Maju', value: 250000000, status: 'Qualified', source: 'Website' },
  { id: 'LD-002', name: 'Siska Pratama', company: 'CV Retail Sejahtera', value: 45000000, status: 'Contacted', source: 'Referral' },
  { id: 'LD-003', name: 'Bambang Sudiro', company: 'PT Konstruksi Jaya', value: 1200000000, status: 'New', source: 'Social Media' },
];

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'CUS-001', name: 'PT Global Solusi', email: 'procurement@globalsolusi.com', tier: 'Gold', totalSpent: 4500000000, lastInteraction: '2023-11-20' },
  { id: 'CUS-002', name: 'Rina Melati', email: 'rina@personal.com', tier: 'Bronze', totalSpent: 12500000, lastInteraction: '2023-11-24' },
  { id: 'CUS-003', name: 'CV Indo Makmur', email: 'info@indomakmur.co.id', tier: 'Silver', totalSpent: 850000000, lastInteraction: '2023-11-15' },
];
