import { StatCard } from "../StatCard";
import { Syringe } from "lucide-react";

export default function StatCardExample() {
  return (
    <div className="p-8">
      <StatCard
        title="Total Vaccinations"
        value="45,231"
        icon={Syringe}
        trend="+12.5% from last month"
      />
    </div>
  );
}
