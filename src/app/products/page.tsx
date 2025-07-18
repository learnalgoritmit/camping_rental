"use client";
import { useOrder } from "@/context/OrderContext";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import { LuArrowLeft, LuShoppingCart, LuPlus, LuCheck, LuImage, LuStar } from 'react-icons/lu';
import Link from "next/link";
import React, { useState, useEffect } from "react";
import BackgroundWrapper from "@/components/BackgroundWrapper";

interface Product {
  id: number;
  key: string;
  titleEn: string;
  titleHe: string;
  descriptionEn: string;
  descriptionHe: string;
  price: number;
  imageUrl?: string;
}

function detectLocale() {
  if (typeof window !== 'undefined') {
    const lang = navigator.language || navigator.languages[0] || 'en';
    return lang.startsWith('he') ? 'he' : 'en';
  }
  return 'en';
}

export default function ProductsPage() {
  const { order, setAccessoryQuantity } = useOrder();
  const t = useTranslations();
  const [locale, setLocale] = useState('en');

  React.useEffect(() => {
    setLocale(detectLocale());
  }, []);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error loading products");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Snackbar state
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({ open: false, message: '' });
  // Show snackbar helper
  const showSnackbar = (message: string) => {
    setSnackbar({ open: true, message });
    setTimeout(() => setSnackbar({ open: false, message: '' }), 2000);
  };

  // Helper to get current quantity for a product
  const getQuantity = (productId: number) => {
    const found = order.accessories.find(item => item.product.id === productId);
    return found ? found.quantity : 0;
  };

  // Calculate total
  const total = order.tent.price + order.accessories.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <BackgroundWrapper>
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center gap-6 py-10">
        {/* Back arrow button */}
        <Link
          href="/booking"
          className="absolute left-0 top-0 mt-4 ml-4 flex items-center gap-2 text-green-800 hover:text-green-600 bg-white/80 rounded-full p-2 shadow focus:outline-none focus:ring-2 focus:ring-green-400 z-20"
          aria-label="Back to booking"
        >
          <LuArrowLeft size={24} />
          <span className="sr-only">Back</span>
        </Link>
        {/* Go to Cart button */}
        <Link
          href="/checkout"
          className="absolute right-0 top-0 mt-4 mr-4 z-20"
        >
          <button className="flex items-center gap-2 bg-green-700 text-white font-bold py-2 px-6 rounded-full shadow hover:bg-green-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 relative">
            <span className="relative">
              <LuShoppingCart size={20} />
              {order.accessories.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                  {order.accessories.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </span>
            {t('button.viewCart')}
          </button>
        </Link>
        <h1 className="text-3xl font-bold my-4 text-green-900 drop-shadow-lg">{t('products.whatMoreCanWeOffer')}</h1>
        <div className="w-full flex flex-col md:flex-row gap-8">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Tent card always included */}
            <div>
              <div className="rounded-2xl shadow-xl bg-green-50/90 flex flex-col transition-transform hover:scale-105 overflow-hidden p-3 border-2 border-green-300 h-96 min-h-[24rem] max-h-[24rem] min-w-[18rem] max-w-[18rem]">
                <div className="relative w-full h-40 rounded-xl overflow-hidden flex items-center justify-center bg-green-100">
                  <span className="text-7xl text-green-400">⛺️</span>
                </div>
                <div className="flex flex-col flex-1 p-3 gap-2">
                  <div className="flex justify-between items-center">
                    <h2 className="font-bold text-lg text-green-900">{order.tent.name}</h2>
                    <span className="bg-green-200 text-green-800 font-semibold px-2 py-1 rounded-full text-sm">
                      ₪{order.tent.price}
                    </span>
                  </div>
                  <p className="text-green-700 text-xs mb-2 text-left w-full flex-1">{t('tent.description')}</p>
                  <span className="text-green-800 font-semibold text-xs mt-2 flex items-center gap-1">
                    <LuCheck size={14} className="text-green-600" />
                    {t('products.includedTent')}
                  </span>
                </div>
              </div>
            </div>
            {/* Product cards */}
            {loading ? (
              <div className="col-span-full text-center text-lg text-gray-600">{t('products.loading')}</div>
            ) : error ? (
              <div className="col-span-full text-center text-red-600">{t('products.errorLoading')}</div>
            ) : products.length === 0 ? (
              <div className="col-span-full text-center text-gray-600">{t('products.noProducts')}</div>
            ) : (
              products.map((product) => {
                const quantity = getQuantity(product.id);
                const name = t('products.' + product.key + '.name') || (locale === 'he' ? product.titleHe : product.titleEn);
                const description = t('products.' + product.key + '.description') || (locale === 'he' ? product.descriptionHe : product.descriptionEn);
                return (
                  <div key={product.id}>
                    <div className={
                      "rounded-2xl shadow-xl bg-white/90 flex flex-col transition-transform hover:scale-105 overflow-hidden p-3 relative h-96 min-h-[24rem] max-h-[24rem] min-w-[18rem] max-w-[18rem]"
                    }>
                      <div className="relative w-full h-40 rounded-xl overflow-hidden">
                        {product.imageUrl ? (
                          <Image
                            src={product.imageUrl}
                            alt={name}
                            layout="fill"
                            objectFit="cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                            <LuImage size={24} className="mr-2" />
                            {t('products.noImage')}
                          </div>
                        )}
                        <span className="absolute top-3 left-3 bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs shadow-md flex items-center gap-1">
                          <LuStar size={14} className="text-yellow-500" />
                          {t('products.limitedDrop')}
                        </span>
                      </div>
                      <div className="flex flex-col flex-1 p-3 gap-2 min-h-0">
                        <div className="flex justify-between items-center">
                          <h2 className="font-bold text-lg text-gray-900">{name}</h2>
                          <span className="bg-green-100 text-green-800 font-semibold px-2 py-1 rounded-full text-sm">
                            ₪{product.price}
                          </span>
                        </div>
                        <div className="text-gray-500 text-xs mb-2 text-left w-full flex-1 transition-all" style={{ minHeight: 0 }}>{description}</div>
                        <button
                          onClick={() => {
                            setAccessoryQuantity({
                              id: product.id,
                              name,
                              price: product.price,
                              description,
                            }, quantity + 1);
                            showSnackbar(t('products.addedToCart', { name }));
                          }}
                          className="w-full bg-black text-white font-bold py-2 rounded-xl text-base mt-auto hover:bg-gray-900 transition-colors shadow-sm flex items-center gap-2"
                        >
                          <LuPlus size={18} />
                          {t('products.addToCart')}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      {/* Snackbar */}
      {snackbar.open && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all animate-fade-in-out flex items-center gap-2">
          <LuCheck size={20} className="text-white" />
          {snackbar.message}
        </div>
      )}
      {/* Simple checkout/cart button at the bottom */}
      <div className="w-full bg-white/95 border-t border-green-200 shadow-lg flex flex-col md:flex-row items-center justify-between px-4 py-3 gap-4 mt-8">
        <div className="text-lg font-bold text-green-900">{t('label.totalOrder')}: <span className="text-green-800">₪{total}</span></div>
        <Link href="/checkout" className="w-full md:w-auto">
          <button className="w-full bg-green-700 text-white font-bold py-3 px-8 rounded-xl text-lg shadow hover:bg-green-800 transition-colors">
            {t('button.viewCart') || 'View Cart / Checkout'}
          </button>
        </Link>
      </div>
    </BackgroundWrapper>
  );
} 