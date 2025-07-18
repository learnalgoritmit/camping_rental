"use client";

import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useSpring, animated } from "@react-spring/web";
import { useOrder } from '../context/OrderContext';
import { useTranslations } from 'next-intl';

export default function CheckoutSummary() {
  const { order } = useOrder();
  const total =
    order.tent.price +
    order.accessories.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const whatsappNumber = "972587507337";
  const message = encodeURIComponent(
    `Campinger New Order:\n` +
      `Phone: ${order.user.phone}\n` +
      `Email: $ {order.user.email}\n` +
      `Dates: ${order.dates.startDate ? new Date(order.dates.startDate).toISOString().slice(0, 10) : ''} to ${order.dates.endDate ? new Date(order.dates.endDate).toISOString().slice(0, 10) : ''}\n` +
      `Number of People: ${order.dates.people}\n` +
      `Tent: ${order.tent.name} (₪${order.tent.price})\n` +
      `Accessories: ${order.accessories.map((a) => `${a.product.name} x${a.quantity} (₪${a.product.price * a.quantity})`).join(", ")}\n` +
      `Total: ₪${total}`
  );

  const t = useTranslations();

  const fadeInUp = useSpring({ from: { opacity: 0, y: 20 }, to: { opacity: 1, y: 0 }, delay: 100 });

  return (
    <animated.div className="flex flex-col gap-6 w-full" style={fadeInUp}>
      <animated.div style={fadeInUp}>
        <Card className="p-4 flex flex-col gap-2 bg-green-50">
          <div className="flex justify-between items-center">
            <span className="font-semibold">{order.tent.name}</span>
            <span className="text-green-700 font-bold">₪{order.tent.price}</span>
          </div>
          <div className="flex flex-col gap-1 text-sm text-gray-700 mt-2">
            <div><b>{t('label.phone')}:</b> {order.user.phone}</div>
            <div><b>{t('label.email')}:</b> {order.user.email}</div>
            <div><b>{t('label.dateRange')}:</b> {order.dates.startDate ? new Date(order.dates.startDate).toISOString().slice(0, 10) : ''} {t('label.to')} {order.dates.endDate ? new Date(order.dates.endDate).toISOString().slice(0, 10) : ''}</div>
            <div><b>{t('label.adults')}:</b> {order.dates.people}</div>
          </div>
          {order.accessories.map((item) => (
            <div key={item.product.id} className="flex justify-between">
              <span>{(item.product.name || '').replace(/"/g, "&quot;")} x{item.quantity}</span>
              <span className="text-green-700">₪{item.product.price * item.quantity}</span>
            </div>
          ))}
          <div className="flex justify-between font-semibold border-t pt-2 mt-2">
            <span>{t('label.totalOrder')}</span>
            <span className="text-green-800">₪{total}</span>
          </div>
        </Card>
      </animated.div>
      <animated.div style={fadeInUp} className="border-t pt-4 mt-4 flex flex-row gap-2 w-full">
        <a
          href={`https://wa.me/${whatsappNumber}?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block flex-1"
        >
          <Button className="w-full flex justify-center items-center text-lg py-3 transition-transform active:scale-95 focus-visible:ring-4 focus-visible:ring-green-300">
            {t('button.sendWhatsapp')}
          </Button>
        </a>
      </animated.div>
    </animated.div>
  );
} 