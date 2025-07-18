"use client";

import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { LuPlus, LuMinus } from "react-icons/lu";
import { useRouter, useParams } from "next/navigation";
import React from 'react';
import { useOrder } from '../context/OrderContext';
import { useTranslations } from 'next-intl';

const PRODUCTS = [
  {
    id: 1,
    key: "campingChair",
    price: 20,
  },
  {
    id: 2,
    key: "sleepingBag",
    price: 40,
  },
  {
    id: 3,
    key: "portableGrill",
    price: 60,
  },
  {
    id: 4,
    key: "lantern",
    price: 15,
  },
  {
    id: 5,
    key: "coffeeKit",
    price: 35,
  },
  {
    id: 6,
    key: "coolerBox",
    price: 30,
  },
  {
    id: 7,
    key: "campingTable",
    price: 25,
  },
  {
    id: 8,
    key: "hammock",
    price: 28,
  },
  {
    id: 9,
    key: "firstAidKit",
    price: 18,
  },
  {
    id: 10,
    key: "inflatableMattress",
    price: 45,
  },
  {
    id: 11,
    key: "portableShower",
    price: 50,
  },
  {
    id: 12,
    key: "firewoodBundle",
    price: 12,
  },
  {
    id: 13,
    key: "campingStove",
    price: 38,
  },
  {
    id: 14,
    key: "boardGames",
    price: 10,
  },
  {
    id: 15,
    key: "fishingKit",
    price: 32,
  },
  {
    id: 16,
    key: "picnicBlanket",
    price: 14,
  },
  {
    id: 17,
    key: "tentLightString",
    price: 16,
  },
  {
    id: 18,
    key: "portableSpeaker",
    price: 22,
  },
  {
    id: 19,
    key: "bugSpray",
    price: 8,
  },
  {
    id: 20,
    key: "marshmallowKit",
    price: 9,
  },
];

const TENT = {
  name: "Basic Tent (Included)",
  price: 200,
  description: "Spacious, weather-resistant tent for up to 4 people. Included in every booking.",
};

type QuantityControlMode = 'stepper' | 'inline';
const quantityControlMode: QuantityControlMode = 'stepper';

export default function ProductSelector() {
  const [selected, setSelected] = useState<{ [id: number]: number }>({});
  const router = useRouter();
  const params = useParams();
  const { setTent, setAccessoryQuantity } = useOrder();
  const t = useTranslations();

  const total =
    TENT.price +
    Object.entries(selected).reduce(
      (sum, [id, qty]) => sum + (PRODUCTS.find(p => p.id === Number(id))?.price || 0) * qty,
      0
    );

  const handleContinue = () => {
    setTent(TENT);
    Object.entries(selected).forEach(([id, qty]) => {
      const product = PRODUCTS.find(p => p.id === Number(id));
      if (product) {
        setAccessoryQuantity({
          id: product.id,
          name: t(`products.${product.key}.name`),
          price: product.price,
          description: t(`products.${product.key}.description`),
        }, qty);
      }
    });
    PRODUCTS.forEach(product => {
      if (!selected[product.id]) {
        setAccessoryQuantity({
          id: product.id,
          name: t(`products.${product.key}.name`),
          price: product.price,
          description: t(`products.${product.key}.description`),
        }, 0);
      }
    });
    router.push(`/checkout/${params.id}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-4">
        <h2 className="text-2xl font-bold mb-2">{t("productSelector.title")}</h2>
        <p>{t("productSelector.description")}</p>
      </Card>

      <Card className="p-4">
        <h3 className="text-xl font-semibold mb-2">{TENT.name}</h3>
        <p>{TENT.description}</p>
        <p className="text-lg font-bold mt-2">
          {t("productSelector.total")}: {total} {t("productSelector.currency")}
        </p>
        <Button onClick={handleContinue} className="w-full mt-4">
          {t("productSelector.continue")}
        </Button>
      </Card>

      <Card className="p-4">
        <h3 className="text-xl font-semibold mb-2">{t("productSelector.products")}</h3>
        <AnimatePresence>
          {PRODUCTS.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center justify-between py-2 border-b last:border-b-0"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selected[product.id] > 0}
                  onChange={(e) => {
                    setSelected(prev => ({
                      ...prev,
                      [product.id]: e.target.checked ? 1 : 0,
                    }));
                  }}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span>{t(`products.${product.key}.name`)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{product.price} {t("productSelector.currency")}</span>
                {quantityControlMode === 'stepper' && (
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelected(prev => ({
                        ...prev,
                        [product.id]: Math.max(0, (prev[product.id] || 0) - 1),
                      }))}
                      className="h-7 w-7 p-0"
                    >
                      <LuMinus />
                    </Button>
                    <span className="h-7 w-7 flex items-center justify-center">
                      {selected[product.id] || 0}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelected(prev => ({
                        ...prev,
                        [product.id]: (prev[product.id] || 0) + 1,
                      }))}
                      className="h-7 w-7 p-0"
                    >
                      <LuPlus />
                    </Button>
                  </div>
                )}
                {quantityControlMode === 'inline' && (
                  <input
                    type="number"
                    value={selected[product.id] || 0}
                    onChange={(e) => setSelected(prev => ({
                      ...prev,
                      [product.id]: Math.max(0, parseInt(e.target.value) || 0),
                    }))}
                    className="w-12 h-7 text-center border border-gray-300 rounded"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </Card>
    </div>
  );
}