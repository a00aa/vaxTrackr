import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "wouter";
import { Building2, Users, UserCircle, Syringe, Shield, FileCheck, ArrowRight } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground rounded-lg p-2">
              <Syringe className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold">VaxTrack</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Complete Vaccination Tracking for Your State
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive platform for government agencies, healthcare facilities, and parents 
              to manage and monitor vaccination records statewide.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Select Your Role</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="hover-elevate transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-agency/10 text-agency flex items-center justify-center mb-4">
                  <Building2 className="h-6 w-6" />
                </div>
                <CardTitle>Government Agency</CardTitle>
                <CardDescription>
                  Monitor statewide vaccination data and generate comprehensive reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/agency">
                  <Button className="w-full bg-agency hover:bg-agency/90" data-testid="button-agency-access">
                    Agency Access
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-facility/10 text-facility flex items-center justify-center mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <CardTitle>Healthcare Facility</CardTitle>
                <CardDescription>
                  Register patients, record vaccinations, and manage your facility
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/facility">
                  <Button className="w-full bg-facility hover:bg-facility/90" data-testid="button-facility-access">
                    Facility Access
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-patient/10 text-patient flex items-center justify-center mb-4">
                  <UserCircle className="h-6 w-6" />
                </div>
                <CardTitle>Patient / Parent</CardTitle>
                <CardDescription>
                  Access vaccination records and generate QR codes for travel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/patient">
                  <Button className="w-full bg-patient hover:bg-patient/90" data-testid="button-patient-access">
                    Patient Access
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Key Features</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-lg bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8" />
              </div>
              <h4 className="font-semibold text-lg">Secure & Compliant</h4>
              <p className="text-sm text-muted-foreground">
                HIPAA-compliant platform with role-based access control and data encryption
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-lg bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <Syringe className="h-8 w-8" />
              </div>
              <h4 className="font-semibold text-lg">Real-Time Tracking</h4>
              <p className="text-sm text-muted-foreground">
                Monitor vaccination progress across the state with live updates and analytics
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-lg bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <FileCheck className="h-8 w-8" />
              </div>
              <h4 className="font-semibold text-lg">Digital Proof</h4>
              <p className="text-sm text-muted-foreground">
                Generate QR codes for vaccination records, perfect for travel requirements
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2024 VaxTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
