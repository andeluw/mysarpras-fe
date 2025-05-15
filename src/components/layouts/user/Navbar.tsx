'use client';

import { ChevronDown, CircleUserRound, LogOut, Menu, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/DropdownMenu';
import ButtonLink from '@/components/links/ButtonLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/NavigationMenu';
import NextImage from '@/components/NextImage';
import { Separator } from '@/components/Separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/Sheet';
import Typography from '@/components/Typography';

export const mainNav = {
  navMain: [
    {
      title: 'Home',
      url: '/',
      exactMatch: true,
    },
    {
      title: 'Peminjaman',
      url: '#',
      className: 'w-[220px]',
      items: [
        {
          title: 'Buat Peminjaman',
          url: '/peminjaman/form',
        },
        {
          title: 'Riwayat Peminjaman',
          url: '/peminjaman/riwayat',
        },
      ],
    },
    {
      title: 'Ruangan',
      url: '#',
      className: 'w-[340px]',
      items: [
        {
          title: 'Jadwal Ketersediaan',
          url: '/ruangan/jadwal-ketersediaan',
        },
        {
          title: 'Daftar Ruangan',
          url: '/ruangan',
          exactMatch: true,
        },
      ],
    },
  ],
};

interface NavItem {
  title: string;
  url: string;
  className?: string;
  items?: {
    title: string;
    url: string;
    exactMatch?: boolean;
  }[];
  exactMatch?: boolean;
}

interface NavbarProps {
  navigation?: {
    navMain: NavItem[];
  };
}

export function Navbar({ navigation = mainNav }: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  const isActive = (url: string, exactMatch?: boolean) => {
    if (exactMatch) {
      return pathname === url;
    }
    return pathname.startsWith(url) && url !== '/';
  };

  const user = {
    namaUser: 'Budi Santoso',
    email: 'dosen@example.com',
    noTelp: null,
    role: 'dosen',
    kartuTandaPengenal: `${process.env.NEXT_PUBLIC_API_URL}/uploads/user/ff41271d-1d79-4b02-a230-6ae5f3183b4c.png`,
  };

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background'>
      <div className='container flex h-20 items-center justify-between px-6 md:px-12 lg:px-20'>
        <div className='flex items-center'>
          <UnstyledLink href='/' className='mr-6 flex items-center space-x-2'>
            <div className='flex py-3 px-1 items-center gap-1'>
              <NextImage
                src='/images/logo.png'
                alt='Logo'
                className='h-8 w-8'
                width={32}
                height={32}
              />
              <Typography variant='h3' className='text-primary-800 font-bold'>
                mySarpras
              </Typography>
            </div>
          </UnstyledLink>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className='hidden lg:flex'>
          <NavigationMenuList>
            {navigation.navMain.map((item) => (
              <NavigationMenuItem key={item.title}>
                {item.items ? (
                  <>
                    <NavigationMenuTrigger>
                      <Typography variant='s2'>{item.title}</Typography>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul
                        className={cn(
                          'flex flex-col gap-1 p-2 w-[240px]',
                          item.className
                        )}
                      >
                        {item.items.map((subItem) => (
                          <li key={subItem.title}>
                            <NavigationMenuLink asChild>
                              <UnstyledLink
                                href={subItem.url}
                                className={cn(
                                  'block w-full px-4 py-2 rounded-md hover:bg-accent'
                                )}
                              >
                                <Typography
                                  variant='s2'
                                  className='text-nowrap text-right'
                                >
                                  {subItem.title}
                                </Typography>
                              </UnstyledLink>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild>
                    <UnstyledLink
                      href={item.url}
                      className={cn(navigationMenuTriggerStyle())}
                    >
                      <Typography variant='s2'>{item.title}</Typography>
                    </UnstyledLink>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Auth Buttons - Desktop */}
        {user ? (
          <div className='hidden lg:flex lg:items-center lg:gap-4'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className='flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-accent transition-colors'>
                  <CircleUserRound className='h-6 w-6' />
                  <div className='flex flex-col items-start'>
                    <Typography variant='s3' className='font-medium'>
                      {user.namaUser}
                    </Typography>
                  </div>
                  <ChevronDown className='h-4 w-4 text-muted-foreground ml-1' />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-56'>
                <div className='px-2 py-1.5'>
                  <Typography variant='small' className='text-muted-foreground'>
                    {user.role[0].toUpperCase() + user.role.slice(1)}
                  </Typography>
                  <Typography variant='s3' className='font-medium truncate'>
                    {user.email}
                  </Typography>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <UnstyledLink
                    href='/profil'
                    className='flex items-center cursor-pointer'
                  >
                    <User className='mr-0.5 h-4 w-4' />
                    <Typography variant='s3'>Profil Saya</Typography>
                  </UnstyledLink>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  // eslint-disable-next-line @typescript-eslint/no-empty-function
                  onClick={() => {}}
                  className='text-destructive focus:text-destructive cursor-pointer'
                >
                  <LogOut className='mr-0.5 h-4 w-4' />
                  <Typography variant='s3'>Keluar</Typography>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className='hidden lg:flex lg:items-center lg:gap-4'>
            <ButtonLink href='/login' variant='light'>
              Login
            </ButtonLink>
            <ButtonLink href='/register'>Register</ButtonLink>
          </div>
        )}

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className='lg:hidden'>
            <Button variant='light' size='icon' className='lg:hidden'>
              <Menu className='h-6 w-6' />
              <span className='sr-only'>Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className='w-[300px] sm:w-[350px]'>
            <div className='flex items-center justify-between'>
              <UnstyledLink
                href='/'
                className='flex items-center space-x-2'
                onClick={() => setIsOpen(false)}
              >
                <NextImage
                  src='/images/logo.png'
                  alt='Logo'
                  className='h-8 w-8'
                  width={32}
                  height={32}
                />
              </UnstyledLink>
            </div>
            <Separator className='my-4' />
            <nav className='flex flex-col space-y-4'>
              {navigation.navMain.map((item) => (
                <React.Fragment key={item.title}>
                  {item.items ? (
                    <MobileNavItem title={item.title} items={item.items} />
                  ) : (
                    <Link
                      href={item.url}
                      className={cn(
                        'text-lg font-medium',
                        isActive(item.url, item.exactMatch) && 'text-primary'
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </nav>
            {user ? (
              <div className='mt-6 space-y-4'>
                <div className='flex items-center gap-3 p-3 rounded-lg border'>
                  <CircleUserRound className='h-6 w-6' />
                  <div className='flex flex-col'>
                    <Typography variant='s2' className='font-medium'>
                      {user.namaUser}
                    </Typography>
                    <Typography variant='s3' className='text-muted-foreground'>
                      {user.role[0].toUpperCase() + user.role.slice(1)}
                    </Typography>
                  </div>
                </div>
                <ButtonLink
                  href='/profil'
                  variant='outlineblack'
                  className='w-full flex items-center justify-center gap-2'
                >
                  <User className='h-4 w-4' />
                  <span>Profil Saya</span>
                </ButtonLink>
                <Button
                  variant='destructive'
                  className='w-full flex items-center justify-center gap-2'
                  // eslint-disable-next-line @typescript-eslint/no-empty-function
                  onClick={() => {}}
                >
                  <LogOut className='h-4 w-4' />
                  <span>Keluar</span>
                </Button>
              </div>
            ) : (
              <div className='mt-6 space-y-4'>
                <ButtonLink
                  href='/login'
                  variant='light'
                  className='w-full'
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </ButtonLink>
                <ButtonLink
                  href='/register'
                  className='w-full'
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </ButtonLink>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function MobileNavItem({
  title,
  items,
}: {
  title: string;
  items: { title: string; url: string; exactMatch?: boolean }[];
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  const isActive = (url: string, exactMatch?: boolean) => {
    if (exactMatch) {
      return pathname === url;
    }
    return pathname.startsWith(url) && url !== '/';
  };

  return (
    <div className='flex flex-col'>
      <button
        className='flex items-center justify-between text-lg font-medium'
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <ChevronDown
          className={cn('h-5 w-5 transition-transform', {
            'rotate-180': isOpen,
          })}
        />
      </button>
      {isOpen && (
        <div className='mt-4 ml-4 flex flex-col space-y-3'>
          {items.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className={cn(
                'text-sm text-muted-foreground hover:text-foreground',
                isActive(item.url, item.exactMatch) &&
                  'text-primary font-medium'
              )}
              onClick={() => setIsOpen(false)}
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
