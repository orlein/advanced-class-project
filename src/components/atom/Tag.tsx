import { tagColors } from '@/constants/challenge';

interface TagProps {
  tag: keyof typeof tagColors;
}

const Tag = ({ tag }: TagProps) => {
  return (
    <div>
      <div
        className={`px-[10px] rounded-xl text-white flex items-center justify-center ${tagColors[tag]}`}
        key={tag}
      >
        {tag}
      </div>
    </div>
  );
};

export default Tag;
