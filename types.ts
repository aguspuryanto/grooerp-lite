
export enum ModuleType {
  DASHBOARD = 'DASHBOARD',
  INVENTORY = 'INVENTORY',
  FINANCE = 'FINANCE',
  SALES_PURCHASE = 'SALES_PURCHASE',
  PROJECT = 'PROJECT',
  MANUFACTURING = 'MANUFACTURING',
  DICTIONARY = 'DICTIONARY',
  CRM = 'CRM',
  ANALYTICS = 'ANALYTICS'
}

export interface Location {
  id: string;
  name: string;
  type: 'Warehouse' | 'Outlet' | 'Distributor';
  address: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock: number; // Total stock
  locationStocks?: { locationId: string, stock: number }[];
  unit: string;
  priceRetail: number;
  priceDistributor: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  type: 'Income' | 'Expense';
  amount: number;
  tax: number;
  total: number;
  category: string;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  budget: number;
  spent: number;
  progress: number;
  status: 'Planning' | 'Ongoing' | 'Completed';
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  value: number;
  status: 'New' | 'Contacted' | 'Qualified' | 'Won' | 'Lost';
  source: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  tier: 'Gold' | 'Silver' | 'Bronze';
  totalSpent: number;
  lastInteraction: string;
}

// Added missing DictionaryItem interface for constants.tsx
export interface DictionaryItem {
  term: string;
  definition: string;
  link: string;
}

// Added missing PettyCashSystem enum for Finance.tsx
export enum PettyCashSystem {
  IMPREST = 'IMPREST',
  FLUCTUATING = 'FLUCTUATING'
}
