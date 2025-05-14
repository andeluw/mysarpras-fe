import { LucideIcon } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/AlertDialog';
import Button, { buttonClassName } from '@/components/buttons/Button';

import useUpdateStatusMutation from '@/app/admin/peminjaman/hooks/useUpdateStatusMutation';

export default function UpdateStatusModal({
  id,
  title,
  description,
  status,
  danger = false,
  actionText,
  icon,
}: {
  id: number;
  title: string;
  description: string;
  status: 'approved' | 'rejected' | 'canceled';
  danger?: boolean;
  actionText: string;
  icon: LucideIcon;
}) {
  const { mutate, isPending } = useUpdateStatusMutation({ id });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={danger ? 'destructive' : 'primary'} rightIcon={icon}>
          {actionText}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Kembali</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              mutate({ status: status });
            }}
            disabled={isPending}
            className={buttonClassName({
              variant: danger ? 'destructive' : 'primary',
            })}
          >
            {actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
