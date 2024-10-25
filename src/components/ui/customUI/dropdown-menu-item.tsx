import { LucideProps } from 'lucide-react';

interface ItemProps {
  icon: React.ComponentType<LucideProps>;
  text: string;
}

export default function DropdownMenuItemContent({
  icon: Icon,
  text,
}: ItemProps) {
  return (
    <div className='flex gap-2 items-center'>
      <Icon size={20} />
      <p>{text}</p>
    </div>
  );
}
