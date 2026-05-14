import { Metadata } from 'next';
import DonateClient from './DonateClient';
import { academyImages } from '@/lib/imageLibrary';

// SEO metadata for donate page
export const metadata: Metadata = {
  title: 'Donate | React Now FC Academy Nairobi',
  description: 'Support youth football development in Nairobi. Make a secure donation to React Now FC Academy through M-Pesa, Stripe, PayPal, or internal donation options.',
  keywords: [
    'donate React Now FC',
    'football academy donation',
    'youth football support',
    'Nairobi football donation',
    'M-Pesa donation',
    'charity football Kenya',
    'support youth sports',
    'football academy funding'
  ],
  openGraph: {
    title: 'Support React Now FC Academy | Make a Donation',
    description: 'Help us develop the next generation of football talent in Nairobi. Your donation supports equipment, training, and youth development programs.',
    images: [
      {
        url: academyImages.teamPhoto1,
        width: 1200,
        height: 630,
        alt: 'Donate to React Now FC Academy'
      }
    ]
  },
  alternates: {
    canonical: 'https://reactnowfc.org/donate'
  }
};

export default function DonatePage() {
  return <DonateClient />;
}