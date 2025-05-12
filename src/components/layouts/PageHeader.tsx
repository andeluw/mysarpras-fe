import * as React from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/Breadcrumb';
import { SidebarTrigger } from '@/components/layouts/Sidebar';
import { Separator } from '@/components/Separator';

const breadcrumbMap: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/statistik': 'Statistik Analitik',
  '/admin/peminjaman/ajuan': 'Ajuan Peminjaman',
  '/admin/peminjaman/riwayat': 'Riwayat Peminjaman',
  '/admin/peminjaman/buat': 'Buat Peminjaman',
  '/admin/ruangan/jadwal-ketersediaan': 'Jadwal Ketersediaan',
  '/admin/ruangan/daftar-ruangan': 'Daftar Ruangan',
  '/admin/ruangan/tambah': 'Tambah Ruangan',
};

export type Crumb =
  | string
  | {
      href?: string;
      label: string;
    };

type PageHeaderProps = {
  title?: string;
  breadcrumbs?: Crumb[];
};

function normalizeBreadcrumbs(
  crumbs: Crumb[]
): { href?: string; label: string }[] {
  return crumbs.map((crumb) => {
    if (typeof crumb === 'string') {
      return {
        href: crumb,
        label: breadcrumbMap[crumb] ?? crumb,
      };
    }
    return crumb;
  });
}

export function PageHeader({ breadcrumbs }: PageHeaderProps) {
  const normalized = breadcrumbs ? normalizeBreadcrumbs(breadcrumbs) : [];

  return (
    <header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
      <SidebarTrigger className='-ml-1' />
      <Separator orientation='vertical' className='mr-2 h-4' />
      {normalized.length > 0 && (
        <Breadcrumb>
          <BreadcrumbList>
            {normalized.map((crumb, index) => {
              const isLast = index === normalized.length - 1;
              return (
                <React.Fragment key={crumb.href ?? crumb.label}>
                  <BreadcrumbItem>
                    {isLast || !crumb.href ? (
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={crumb.href}>
                        {crumb.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      )}
    </header>
  );
}
