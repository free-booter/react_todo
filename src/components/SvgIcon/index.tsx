import React from "react";

interface SvgIconProps {
  prefix?: string;
  name: string;
  size?: number;
  className?: string;
  color?: string;
  style?: React.CSSProperties;
}

const SvgIcon: React.FC<SvgIconProps> = ({
  name,
  className,
  prefix = "icon",
  size = 16,
  color,
  style,
}) => {
  const symbolId = `#${prefix}-${name}`;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      style={{ color, ...style }}
    >
      <use xlinkHref={symbolId} />
    </svg>
  );
};

export default SvgIcon;
