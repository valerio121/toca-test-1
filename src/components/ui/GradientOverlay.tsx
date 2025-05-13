import { cn } from '@/libs/functions';

export default function GradientOverlay({
  direction = 'to-b',
  className = '',
}: {
  direction?: 'to-b' | 'to-t' | 'to-l' | 'to-r';
  className?: string;
}) {
  let gradientClass;
  switch (direction) {
    case 'to-t':
      gradientClass = 'bg-gradient-to-t';
      break;
    case 'to-l':
      gradientClass = 'bg-gradient-to-l';
      break;
    case 'to-r':
      gradientClass = 'bg-gradient-to-r';
      break;
    default:
      gradientClass = 'bg-gradient-to-b';
  }

  return <div className={cn(gradientClass, 'from-background to-transparent', className)} />;
}
