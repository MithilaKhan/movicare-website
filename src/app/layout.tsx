import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import { Plus_Jakarta_Sans } from 'next/font/google';
import Script from "next/script";
import ReduxProvider from "@/redux/lib/ReduxProvider";
import { ToastContainer } from "react-toastify";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});


export const metadata: Metadata = {
  title: "movicare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakartaSans.className}>

      <head>
        {/* Google Translate Meta */}
        <meta
          name="google-translate-customization"
          content="9f841e7780177523-3214ceb76f765f38-gc38c6fe6f9d06436-c"
        />

        {/* Google Translate Script */}
        <Script
          strategy="afterInteractive"
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        />
        <Script
          id="google-translate-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement(
                  {
                    pageLanguage: 'en',
                    includedLanguages: 'en,es',
                    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
                  },
                  'google_translate_element'
                );
              }
            `,
          }}
        />
      </head>

      <body
        className={`antialiased`}
      > 
       <ReduxProvider> 
        <AntdRegistry>
          <div id="google_translate_element" /> 
           <ToastContainer position="top-right" autoClose={3000} />
          {children}
        </AntdRegistry> 
        </ReduxProvider>
      </body>
    </html>
  );
}
