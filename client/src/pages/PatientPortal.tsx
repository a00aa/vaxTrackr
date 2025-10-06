import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { VaccinationRecordCard } from "@/components/VaccinationRecordCard";
import { QRCodeModal } from "@/components/QRCodeModal";
import { Link } from "wouter";
import { Label } from "@/components/ui/label";
import {
  Syringe,
  ArrowLeft,
  Calendar,
  MapPin,
  Download,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function PatientPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [patientId, setPatientId] = useState("");
  const [email, setEmail] = useState("");
  const [selectedVaccine, setSelectedVaccine] = useState<any>(null);
  const [qrModalOpen, setQrModalOpen] = useState(false);

  const mockPatientData = {
    id: "VAX-2024-001234",
    name: "John Doe",
    email: "john.doe@example.com",
    vaccinations: [
      {
        id: 1,
        vaccineName: "COVID-19 Vaccine (Pfizer) - Dose 1",
        dateAdministered: new Date("2024-01-15"),
        facility: "Central Medical Center",
        status: "completed" as const,
      },
      {
        id: 2,
        vaccineName: "COVID-19 Vaccine (Pfizer) - Dose 2",
        dateAdministered: new Date("2024-02-15"),
        facility: "Central Medical Center",
        status: "completed" as const,
      },
      {
        id: 3,
        vaccineName: "Hepatitis B",
        dateAdministered: new Date("2024-03-10"),
        facility: "Westside Health Clinic",
        status: "completed" as const,
      },
      {
        id: 4,
        vaccineName: "Measles Booster",
        dateAdministered: new Date("2024-06-01"),
        facility: "Central Medical Center",
        status: "pending" as const,
      },
    ],
    upcomingVaccinations: [
      {
        vaccineName: "Influenza",
        scheduledDate: new Date("2024-11-15"),
        facility: "Central Medical Center",
      },
    ],
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", patientId, email);
    setIsLoggedIn(true);
  };

  const handleViewQR = (vaccine: any) => {
    setSelectedVaccine(vaccine);
    setQrModalOpen(true);
  };

  const handleDownloadRecord = () => {
    console.log("Downloading vaccination record");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon" data-testid="button-back">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <div className="bg-patient text-patient-foreground rounded-lg p-2">
                  <Syringe className="h-5 w-5" />
                </div>
                <h1 className="text-lg font-semibold">Patient Portal</h1>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <main className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Access Your Vaccination Records</CardTitle>
                <CardDescription>
                  Enter your unique patient ID and email address to view your vaccination history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient-id">Patient ID</Label>
                    <Input
                      id="patient-id"
                      placeholder="VAX-2024-001234"
                      value={patientId}
                      onChange={(e) => setPatientId(e.target.value)}
                      required
                      data-testid="input-patient-id"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      data-testid="input-email"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-patient hover:bg-patient/90" data-testid="button-access-records">
                    Access Records
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsLoggedIn(false)}
              data-testid="button-logout"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="bg-patient text-patient-foreground rounded-lg p-2">
                <Syringe className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">{mockPatientData.name}</h1>
                <p className="text-xs text-muted-foreground">{mockPatientData.id}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleDownloadRecord} data-testid="button-download-record">
              <Download className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Download Record</span>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {mockPatientData.upcomingVaccinations.length > 0 && (
          <Card className="border-patient/50 bg-patient/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-patient">
                <Calendar className="h-5 w-5" />
                Upcoming Vaccinations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockPatientData.upcomingVaccinations.map((vaccine, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-card border"
                >
                  <div className="space-y-1">
                    <p className="font-semibold">{vaccine.vaccineName}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {vaccine.facility}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-patient/20 text-patient">
                      {vaccine.scheduledDate.toLocaleDateString()}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <div>
          <h2 className="text-2xl font-semibold mb-6">Vaccination History</h2>
          <div className="space-y-4">
            {mockPatientData.vaccinations.map((vaccine) => (
              <VaccinationRecordCard
                key={vaccine.id}
                vaccineName={vaccine.vaccineName}
                dateAdministered={vaccine.dateAdministered}
                facility={vaccine.facility}
                status={vaccine.status}
                onViewQR={
                  vaccine.status === "completed"
                    ? () => handleViewQR(vaccine)
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      </main>

      {selectedVaccine && (
        <QRCodeModal
          open={qrModalOpen}
          onOpenChange={setQrModalOpen}
          vaccineName={selectedVaccine.vaccineName}
          patientId={mockPatientData.id}
          dateAdministered={selectedVaccine.dateAdministered.toLocaleDateString()}
          facility={selectedVaccine.facility}
        />
      )}
    </div>
  );
}
