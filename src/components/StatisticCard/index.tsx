import { ReactNode } from "react";
import "./index.less";

interface StatisticCardProps {
  title: string;
  value: number | string | ReactNode;
  icon?: ReactNode;
  trend?: {
    value: number | string;
    isPositive: boolean;
  };
  footer?: ReactNode;
  loading?: boolean;
  className?: string;
}

export default function StatisticCard({
  title,
  value,
  icon,
  trend,
  footer,
  loading = false,
  className = "",
}: StatisticCardProps) {
  return (
    <div className={`statistic-card ${className} ${loading ? "loading" : ""}`}>
      <div className="statistic-header">
        <span className="statistic-title">{title}</span>
        {icon && <div className="statistic-icon">{icon}</div>}
      </div>

      <div className="statistic-content">
        <div className="statistic-value">{value}</div>
      </div>

      {(footer || trend) && (
        <div className="statistic-footer">
          {trend && (
            <span
              className={`statistic-trend ${trend.isPositive ? "up" : "down"}`}
            >
              {trend.isPositive ? "↑" : "↓"} {trend.value}
            </span>
          )}
          {footer && <span className="footer-text">{footer}</span>}
        </div>
      )}
    </div>
  );
}
