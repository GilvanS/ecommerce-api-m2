import { Star, StarHalf, StarOutline } from "../shared/Icons";

export const StarRating = ({ rating = 0 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className="h-4 w-4 text-yellow-400 fill-current"
        />
      ))}
      {hasHalfStar && (
        <StarHalf key="half" className="h-4 w-4 text-yellow-400 fill-current" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <StarOutline key={`empty-${i}`} className="h-4 w-4 text-yellow-400" />
      ))}
    </div>
  );
};
