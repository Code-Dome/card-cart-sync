import React from 'react';
import { Heart, ExternalLink } from 'lucide-react';
import {Button} from "@/components/ui/button.tsx";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const version = typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : 'dev';

  const quickLinks = [
    { name: "Privacy Policy", href: "/privacy", icon: null },
    { name: "Terms of Service", href: "/terms", icon: null },
  ];

  return (
      <footer className="bg-card text-brand-light py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Main Footer Content */}
            <div className="grid md:grid-cols-3 gap-12 mb-12">
              {/* Company Info (Left) */}
              <div className="space-y-4 md:col-span-1 md:col-start-1">
                <h3 className="text-xl font-bold text-primary">CardShop POS</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A hobbiest focused POS, providing easy store management and integration with major e-commerce sites.
                </p>
                <p className="text-xs text-muted-foreground mb-2">
                  Product by <a href={"https://www.shogunn.dev"}><span className="text-purple-500 font-medium">Shogun Dot Dev</span></a>
                </p>
              </div>

              {/* Empty middle column if needed */}
              <div className="hidden md:block"/>

              {/* Quick Links (Right) */}
              <div className="space-y-4 md:col-span-1 md:col-start-3">
                <h4 className="text-lg font-semibold text-brand-light sm:justify-center sm:text-center">Quick Links</h4>
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => (
                      <li key={index}>
                        <Button
                            variant="ghost"
                            className="h-auto px-3 py-2 text-muted-foreground hover:text-primary hover:bg-primary/10 justify-start rounded-md transition-all duration-200"
                            asChild
                        >
                          <a href={link.href} className="flex items-center gap-2 w-full">
                            {link.icon}
                            {link.name}
                          </a>
                        </Button>
                      </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-border/20 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-muted-foreground">
                  © 2025 Superhobby (Pty) Ltd | All rights
                  reserved.
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span>Built with</span>
                  <Heart className="w-3 h-3 text-purple-500"/>
                  <span>for hobbiests</span>

                </div>
              </div>
            </div>
            <code className="flex mt-2 text-muted-foreground text-sm sm:text-center justify-center mt-6">Version {version}</code>
          </div>
        </div>
      </footer>
  );
};