import Tag from '../atom/Tag';

const ChallengeCard = ({ title, startDate, endDate, tags }) => {
  return (
    <div className="bg-black padding-[10px] flex flex-col gap-5 py-[15px] px-[10px]">
      <img className="w-[300px] h-[300px]" />
      <div className="w-[300px] flex flex-col gap-5">
        <span>{title}</span>
        <span>{`${startDate} - ${endDate}`}</span>
        <div className="flex gap-2">
          {tags.map(tag => (
            <Tag tag={tag} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
