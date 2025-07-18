'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types for order
export type Product = {
  id: number;
  name: string;
  price: number;
  description?: string;
};

export type Tent = {
  name: string;
  price: number;
  description?: string;
};

export type UserInfo = {
  phone: string;
  email: string;
};

export type BookingDates = {
  startDate: Date | null;
  endDate: Date | null;
  people: number;
};

export type Order = {
  tent: Tent;
  accessories: { product: Product; quantity: number }[];
  user: UserInfo;
  dates: BookingDates;
};

type OrderContextType = {
  order: Order;
  setTent: (tent: Tent) => void;
  setAccessoryQuantity: (product: Product, quantity: number) => void;
  setUser: (user: UserInfo) => void;
  setDates: (dates: BookingDates) => void;
  resetOrder: () => void;
};

const defaultTent: Tent = {
  name: 'Basic Tent (Included)',
  price: 200,
  description: 'Spacious, weather-resistant tent for up to 4 people. Included in every booking.',
};

const defaultUser: UserInfo = {
  phone: '',
  email: '',
};

const defaultDates: BookingDates = {
  startDate: null,
  endDate: null,
  people: 1,
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [tent, setTentState] = useState<Tent>(defaultTent);
  const [accessories, setAccessories] = useState<{ product: Product; quantity: number }[]>([]);
  const [user, setUserState] = useState<UserInfo>(defaultUser);
  const [dates, setDatesState] = useState<BookingDates>(defaultDates);

  const setTent = (newTent: Tent) => setTentState(newTent);

  const setAccessoryQuantity = (product: Product, quantity: number) => {
    setAccessories(prev => {
      if (quantity <= 0) {
        return prev.filter(item => item.product.id !== product.id);
      }
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity } : item
        );
      } else {
        return [...prev, { product, quantity }];
      }
    });
  };

  const setUser = (user: UserInfo) => setUserState(user);
  const setDates = (dates: BookingDates) => setDatesState(dates);

  const resetOrder = () => {
    setTentState(defaultTent);
    setAccessories([]);
    setUserState(defaultUser);
    setDatesState(defaultDates);
  };

  const order: Order = {
    tent,
    accessories: accessories.filter(item => item.quantity > 0),
    user,
    dates,
  };

  return (
    <OrderContext.Provider value={{ order, setTent, setAccessoryQuantity, setUser, setDates, resetOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrder must be used within an OrderProvider');
  return ctx;
} 