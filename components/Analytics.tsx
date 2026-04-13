"use client";

declare global {
  interface Window {
    gtag: (command: string, target: string, config?: any) => void;
  }
}

import { useEffect } from "react";
import Script from "next/script";

export default function Analytics() {
  useEffect(() => {
    // Page view tracking
    const trackPageView = (url: string) => {
      if (typeof window.gtag !== 'undefined') {
        window.gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
          page_path: url,
        });
      }
    };

    // Track initial page view
    trackPageView(window.location.pathname);

    // Track route changes
    const handleRouteChange = (url: string) => {
      trackPageView(url);
    };

    // Listen for route changes
    window.addEventListener('popstate', () => {
      handleRouteChange(window.location.pathname);
    });

    return () => {
      window.removeEventListener('popstate', () => {
        handleRouteChange(window.location.pathname);
      });
    };
  }, []);

  return (
    <>
      {/* Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}