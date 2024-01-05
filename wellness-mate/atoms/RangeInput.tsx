export const RangeInput = ({
  minValue,
  maxValue,
  value,
  setValue,
  className,
  name,
  suffix,
}) => {
  const handleChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    setValue(newValue);
  };

  return (
    <div className="range-input">
      <input
        type="range"
        min={minValue}
        max={maxValue}
        value={value}
        onChange={handleChange}
        className={className}
        name={name}
      />
      <div className="range-value">
        {value}
        {suffix}
      </div>
    </div>
  );
};
