import UnderlineLink from '@/components/links/UnderlineLink';
import Typography, { TypographyVariant } from '@/components/Typography';

export default function TypographySandbox() {
  const variants = Object.keys(TypographyVariant).filter((v) =>
    isNaN(Number(v))
  );

  return (
    <div className='layout py-20'>
      <Typography as='h1' variant='h5' weight='bold'>
        Typography Sandbox
      </Typography>

      <UnderlineLink href='/sandbox' className='mt-2'>
        Back to Sandbox
      </UnderlineLink>

      <div className='flex font-medium text-gray-500 border-b pb-2 mt-12'>
        <div className='w-[80px] md:w-[130px]'>Variant</div>
        <div className='flex-1'>Example</div>
      </div>

      {variants.map((variant) => (
        <div key={variant} className='flex items-start gap-4 py-4 border-b'>
          <Typography
            variant='c'
            weight='medium'
            className='w-[60px] md:w-[90px] text-gray-500'
          >
            {variant}
          </Typography>
          <div className='flex flex-col gap-1'>
            <Typography
              variant={variant as keyof typeof TypographyVariant}
              weight='regular'
            >
              mySarpras
            </Typography>
            <Typography
              variant={variant as keyof typeof TypographyVariant}
              weight='bold'
            >
              mySarpras
            </Typography>
          </div>
        </div>
      ))}
    </div>
  );
}
