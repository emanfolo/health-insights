export const SaveButton = ({ saved, onClick, context }) => {
  const generated = context === "generated";
  const className = !!generated && !!saved ? "opacity-0" : "cursor-pointer btn";

  return (
    <div onClick={onClick} className={className}>
      {saved ? "Unsave Mealplan" : "Save Mealplan"}
    </div>
  );
};
