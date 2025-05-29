import React from "react";

interface SvgIconProps {
  prefix?: string;
  name: string;
  size?: number;
  className?: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({
  name,
  className,
  prefix = "icon",
  size = 16,
}) => {
  const symbolId = `#${prefix}-${name}`;
  return (
    <svg className={className} width={size} height={size}>
      <use xlinkHref={symbolId} />
    </svg>
  );
};

export default SvgIcon;
