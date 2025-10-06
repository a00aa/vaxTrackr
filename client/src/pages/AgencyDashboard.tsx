import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { StatCard } from "@/components/StatCard";
import { Link } from "wouter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Syringe,
  Users,
  Building2,
  AlertTriangle,
  Search,
  ArrowLeft,
  TrendingUp,
  MapPin,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function AgencyDashboard() {
  const [selectedLGA, setSelectedLGA] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const vaccineData = [
    { name: "COVID-19", count: 12500 },
    { name: "Hepatitis B", count: 9800 },
    { name: "Measles", count: 8600 },
    { name: "Polio", count: 7200 },
    { name: "Others", count: 7131 },
  ];

  const coverageData = [
    { name: "Fully Vaccinated", value: 68, color: "hsl(145 65% 42%)" },
    { name: "Partially Vaccinated", value: 22, color: "hsl(35 85% 55%)" },
    { name: "Not Vaccinated", value: 10, color: "hsl(0 75% 50%)" },
  ];

  const recentActivity = [
    { facility: "Central Medical Center", lga: "Metropolitan", vaccines: 142, date: "Today" },
    { facility: "Westside Health Clinic", lga: "Westside", vaccines: 98, date: "Today" },
    { facility: "Northern Care Hospital", lga: "Northern", vaccines: 76, date: "Today" },
    { facility: "Eastern Medical Hub", lga: "Eastern", vaccines: 64, date: "Yesterday" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" data-testid="button-back">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="bg-agency text-agency-foreground rounded-lg p-2">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">Agency Dashboard</h1>
                <p className="text-xs text-muted-foreground">State Vaccination Overview</p>
              </div>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Vaccinations"
            value="45,231"
            icon={Syringe}
            trend="+12.5% from last month"
            iconColor="text-agency"
          />
          <StatCard
            title="Registered Patients"
            value="28,547"
            icon={Users}
            trend="+8.2% from last month"
            iconColor="text-facility"
          />
          <StatCard
            title="Active Facilities"
            value="156"
            icon={Building2}
            trend="12 new this month"
            iconColor="text-patient"
          />
          <StatCard
            title="Coverage Rate"
            value="68%"
            icon={TrendingUp}
            trend="+3.4% from last month"
            iconColor="text-vaccinated"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search facilities..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-facilities"
              />
            </div>
          </div>
          <Select value={selectedLGA} onValueChange={setSelectedLGA}>
            <SelectTrigger className="w-[200px]" data-testid="select-lga">
              <SelectValue placeholder="Filter by LGA" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All LGAs</SelectItem>
              <SelectItem value="metropolitan">Metropolitan</SelectItem>
              <SelectItem value="westside">Westside</SelectItem>
              <SelectItem value="northern">Northern</SelectItem>
              <SelectItem value="eastern">Eastern</SelectItem>
              <SelectItem value="southern">Southern</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" data-testid="button-generate-report">
            Generate Report
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Syringe className="h-5 w-5 text-agency" />
                Vaccinations by Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={vaccineData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(220 75% 45%)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-facility" />
                Vaccination Coverage
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={coverageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {coverageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-pending" />
              Recent Facility Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border hover-elevate transition-all"
                  data-testid={`activity-item-${index}`}
                >
                  <div className="space-y-1">
                    <p className="font-medium">{activity.facility}</p>
                    <p className="text-sm text-muted-foreground">{activity.lga} LGA</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">{activity.vaccines}</p>
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
