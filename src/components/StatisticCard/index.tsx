import "./index.less";

interface StatisticCardProps {
  title: string;
  value: number | React.ReactNode;
  footer: React.ReactNode;
  type: "primary" | "success" | "warning";
}

export default function StatisticCard({
  title,
  value,
  footer,
}: StatisticCardProps) {
  return (
    <div className="statistic-card flex flex-col">
      <div className="card-title">{title}</div>
      <div className="card-value">{value}</div>
      <div className="card-footer">{footer}</div>
    </div>
  );
}
