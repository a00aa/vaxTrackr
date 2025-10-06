import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { StatCard } from "@/components/StatCard";
import { TeamMemberInvite } from "@/components/TeamMemberInvite";
import { Link } from "wouter";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Syringe,
  Users,
  FileText,
  Calendar,
  ArrowLeft,
  UserPlus,
  ClipboardList,
  Search,
  Settings,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function FacilityDashboard() {
  const [searchPatientId, setSearchPatientId] = useState("");
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const [vaccineDialogOpen, setVaccineDialogOpen] = useState(false);
  const [teamInviteOpen, setTeamInviteOpen] = useState(false);

  const recentPatients = [
    { id: "VAX-2024-001234", name: "John Doe", lastVisit: "2024-03-15", status: "completed" },
    { id: "VAX-2024-001235", name: "Jane Smith", lastVisit: "2024-03-14", status: "pending" },
    { id: "VAX-2024-001236", name: "Robert Johnson", lastVisit: "2024-03-13", status: "completed" },
  ];

  const handlePatientSearch = () => {
    console.log("Searching for patient:", searchPatientId);
  };

  const handleRegisterPatient = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registering patient");
    setRegisterDialogOpen(false);
  };

  const handleRecordVaccine = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Recording vaccine");
    setVaccineDialogOpen(false);
  };

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
              <div className="bg-facility text-facility-foreground rounded-lg p-2">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">Facility Dashboard</h1>
                <p className="text-xs text-muted-foreground">Central Medical Center</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTeamInviteOpen(true)}
              data-testid="button-manage-team"
            >
              <Users className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Team</span>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Today's Vaccinations"
            value="24"
            icon={Syringe}
            trend="8 scheduled"
            iconColor="text-facility"
          />
          <StatCard
            title="Registered Patients"
            value="1,247"
            icon={Users}
            trend="+18 this week"
            iconColor="text-primary"
          />
          <StatCard
            title="Pending Appointments"
            value="12"
            icon={Calendar}
            trend="Next: 2:00 PM"
            iconColor="text-pending"
          />
          <StatCard
            title="Reports Generated"
            value="45"
            icon={FileText}
            trend="This month"
            iconColor="text-vaccinated"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-facility" />
                Patient Lookup
              </CardTitle>
              <CardDescription>Search for patient records by unique ID</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter Patient ID (e.g., VAX-2024-001234)"
                  value={searchPatientId}
                  onChange={(e) => setSearchPatientId(e.target.value)}
                  data-testid="input-patient-id"
                />
                <Button onClick={handlePatientSearch} data-testid="button-search-patient">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>

              <div className="space-y-3 mt-6">
                <h4 className="text-sm font-medium text-muted-foreground">RECENT PATIENTS</h4>
                {recentPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover-elevate transition-all"
                    data-testid={`patient-${patient.id}`}
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-muted-foreground">{patient.id}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Last Visit</p>
                        <p className="text-sm">{patient.lastVisit}</p>
                      </div>
                      <Badge
                        className={
                          patient.status === "completed"
                            ? "bg-vaccinated-bg text-vaccinated-text"
                            : "bg-pending-bg text-pending-text"
                        }
                      >
                        {patient.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="hover-elevate transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <UserPlus className="h-5 w-5 text-facility" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Dialog open={registerDialogOpen} onOpenChange={setRegisterDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-facility hover:bg-facility/90" data-testid="button-register-patient">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Register New Patient
                    </Button>
                  </DialogTrigger>
                  <DialogContent data-testid="modal-register-patient">
                    <DialogHeader>
                      <DialogTitle>Register New Patient</DialogTitle>
                      <DialogDescription>
                        Enter patient details to create a new vaccination record
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleRegisterPatient} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="patient-name">Full Name</Label>
                        <Input id="patient-name" placeholder="John Doe" required data-testid="input-patient-name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="patient-email">Email Address</Label>
                        <Input id="patient-email" type="email" placeholder="john@example.com" required data-testid="input-patient-email" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="patient-dob">Date of Birth</Label>
                        <Input id="patient-dob" type="date" required data-testid="input-patient-dob" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="patient-phone">Phone Number</Label>
                        <Input id="patient-phone" type="tel" placeholder="+1234567890" required data-testid="input-patient-phone" />
                      </div>
                      <Button type="submit" className="w-full" data-testid="button-submit-patient">
                        Register Patient
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>

                <Dialog open={vaccineDialogOpen} onOpenChange={setVaccineDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full" data-testid="button-record-vaccine">
                      <ClipboardList className="h-4 w-4 mr-2" />
                      Record Vaccination
                    </Button>
                  </DialogTrigger>
                  <DialogContent data-testid="modal-record-vaccine">
                    <DialogHeader>
                      <DialogTitle>Record Vaccination</DialogTitle>
                      <DialogDescription>
                        Record a vaccine administered to a patient
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleRecordVaccine} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="vaccine-patient-id">Patient ID</Label>
                        <Input id="vaccine-patient-id" placeholder="VAX-2024-001234" required data-testid="input-vaccine-patient-id" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vaccine-type">Vaccine Type</Label>
                        <Select required>
                          <SelectTrigger id="vaccine-type" data-testid="select-vaccine-type">
                            <SelectValue placeholder="Select vaccine" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="covid19">COVID-19 (Pfizer)</SelectItem>
                            <SelectItem value="covid19-moderna">COVID-19 (Moderna)</SelectItem>
                            <SelectItem value="hepatitis-b">Hepatitis B</SelectItem>
                            <SelectItem value="measles">Measles</SelectItem>
                            <SelectItem value="polio">Polio</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vaccine-date">Date Administered</Label>
                        <Input id="vaccine-date" type="date" required data-testid="input-vaccine-date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vaccine-location">Location</Label>
                        <Select required>
                          <SelectTrigger id="vaccine-location" data-testid="select-vaccine-location">
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="main">Main Building</SelectItem>
                            <SelectItem value="north">North Wing</SelectItem>
                            <SelectItem value="mobile">Mobile Unit</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button type="submit" className="w-full" data-testid="button-submit-vaccine">
                        Record Vaccine
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" data-testid="button-facility-report">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Facility Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <TeamMemberInvite open={teamInviteOpen} onOpenChange={setTeamInviteOpen} />
    </div>
  );
}
