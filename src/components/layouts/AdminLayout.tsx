import { AdminSidebar } from '@/components/layouts/AdminSidebar';
import { Crumb, PageHeader } from '@/components/layouts/PageHeader';
import { SidebarInset, SidebarProvider } from '@/components/layouts/Sidebar';
import Typography from '@/components/Typography';

export default function AdminLayout({
  breadcrumbs,
  title,
  children,
}: {
  breadcrumbs: Crumb[];
  title: string;
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <PageHeader breadcrumbs={breadcrumbs} />
        <div className='flex flex-1 flex-col gap-6 px-8 py-6 md:px-12 md:py-8 lg:px-16 lg:py-10 bg-primary-foreground'>
          <Typography variant='h1'>{title}</Typography>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
