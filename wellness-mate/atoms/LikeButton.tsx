import { Heart, HeartFilled } from "../icons";

export const LikeButton = ({ liked, onClick }) => {
  return (
    <div onClick={onClick} className="cursor-pointer">
      {liked ? <HeartFilled /> : <Heart />}
    </div>
  );
};
