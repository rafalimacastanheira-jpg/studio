"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchInputRef.current?.value.trim();
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      if (searchInputRef.current) {
        searchInputRef.current.value = '';
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center gap-4">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center gap-2 font-headline text-xl font-bold">
            <div className="flex-shrink-0">
              <svg width="36" height="32" viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g transform="rotate(-15 5 12)">
                  <rect x="5" y="5" width="30" height="7" fill="hsl(var(--destructive))"/>
                  <rect x="9" y="5" width="3" height="7" fill="white"/>
                  <rect x="16" y="5" width="3" height="7" fill="white"/>
                  <rect x="23" y="5" width="3" height="7" fill="white"/>
                  <rect x="30" y="5" width="3" height="7" fill="white"/>
                </g>
                <rect x="5" y="14" width="30" height="21" fill="hsl(var(--destructive))" rx="1"/>
                <path d="M16 20.5 L 26 24.5 L 16 28.5 Z" fill="hsl(var(--primary))"/>
                <path d="M32 1 L34.24 5.76 L39.5 6.5 L35.88 9.8 L36.7 15 L32 12.5 L27.3 15 L28.12 9.8 L24.5 6.5 L29.76 5.76 Z" fill="hsl(var(--primary))"/>
              </svg>
            </div>
            <span className="text-foreground">Help<span className="text-destructive">Flix</span></span>
          </Link>
        </div>

        <form onSubmit={handleSearch} className="hidden flex-1 sm:flex items-center">
          <div className="relative w-full max-w-sm">
            <Input ref={searchInputRef} placeholder="Pesquisar títulos…" className="pr-10" />
            <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0 h-full">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </form>
        
        <nav className="hidden md:flex flex-1 items-center justify-center gap-4 text-sm font-medium text-muted-foreground">
  <Link href="/" className="transition-colors hover:text-foreground">
    Home
  </Link>
  <Link href="/browse" className="transition-colors hover:text-foreground">
    Explorar
  </Link>
  <Link href="/search" className="transition-colors hover:text-foreground">
    Pesquisa
  </Link>
</nav>

        <div className="flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Button asChild variant="secondary">
                <Link href="/login">Entrar</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Registar</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
