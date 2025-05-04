import ButtonLink from '@/components/links/ButtonLink';
import Typography from '@/components/Typography';

export default function Page() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-white'>
      <Typography variant='h4' className='mb-4 text-primary-800' weight='bold'>
        Sandbox
      </Typography>
      <div className='flex gap-4'>
        <ButtonLink href='/sandbox/buttons'>Buttons</ButtonLink>
        <ButtonLink href='/sandbox/colors'>Colors</ButtonLink>
        <ButtonLink href='/sandbox/forms'>Forms</ButtonLink>
        <ButtonLink href='/sandbox/typography'>Typography</ButtonLink>
        <ButtonLink href='/sandbox/loading'>Loading</ButtonLink>
      </div>
    </div>
  );
}
