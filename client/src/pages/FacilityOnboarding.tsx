import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Syringe, Check, Building2, MapPin, Users, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function FacilityOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [facilityName, setFacilityName] = useState("");
  const [facilityType, setFacilityType] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [address, setAddress] = useState("");
  const [lga, setLga] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [locations, setLocations] = useState<Array<{ name: string; address: string; lga: string }>>([]);
  const [newLocation, setNewLocation] = useState({ name: "", address: "", lga: "" });
  const [teamMembers, setTeamMembers] = useState<Array<{ email: string; role: string }>>([]);
  const [newMember, setNewMember] = useState({ email: "", role: "staff" });

  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAddLocation = () => {
    if (newLocation.name && newLocation.address && newLocation.lga) {
      setLocations([...locations, newLocation]);
      setNewLocation({ name: "", address: "", lga: "" });
    }
  };

  const handleRemoveLocation = (index: number) => {
    setLocations(locations.filter((_, i) => i !== index));
  };

  const handleAddTeamMember = () => {
    if (newMember.email) {
      setTeamMembers([...teamMembers, newMember]);
      setNewMember({ email: "", role: "staff" });
    }
  };

  const handleRemoveTeamMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Onboarding complete:", {
      facilityName,
      facilityType,
      registrationNumber,
      address,
      lga,
      state,
      phone,
      locations,
      teamMembers,
    });
    window.location.href = "/facility";
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-facility text-facility-foreground rounded-lg p-2">
              <Syringe className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Facility Onboarding</h1>
              <p className="text-xs text-muted-foreground">Step {currentStep} of {totalSteps}</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                        step < currentStep
                          ? "bg-facility text-facility-foreground"
                          : step === currentStep
                          ? "bg-facility text-facility-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                      data-testid={`step-${step}`}
                    >
                      {step < currentStep ? <Check className="h-5 w-5" /> : step}
                    </div>
                  </div>
                  {step < 4 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition-colors ${
                        step < currentStep ? "bg-facility" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-facility" />
                    Facility Information
                  </CardTitle>
                  <CardDescription>
                    Tell us about your healthcare facility
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="facility-name">Facility Name</Label>
                    <Input
                      id="facility-name"
                      placeholder="Central Medical Center"
                      value={facilityName}
                      onChange={(e) => setFacilityName(e.target.value)}
                      required
                      data-testid="input-facility-name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="facility-type">Facility Type</Label>
                    <Select value={facilityType} onValueChange={setFacilityType} required>
                      <SelectTrigger id="facility-type" data-testid="select-facility-type">
                        <SelectValue placeholder="Select facility type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hospital">Hospital</SelectItem>
                        <SelectItem value="clinic">Clinic</SelectItem>
                        <SelectItem value="health-center">Health Center</SelectItem>
                        <SelectItem value="pharmacy">Pharmacy</SelectItem>
                        <SelectItem value="mobile-unit">Mobile Unit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="registration-number">Registration Number</Label>
                    <Input
                      id="registration-number"
                      placeholder="REG-2024-12345"
                      value={registrationNumber}
                      onChange={(e) => setRegistrationNumber(e.target.value)}
                      required
                      data-testid="input-registration-number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1234567890"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      data-testid="input-phone"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-facility" />
                    Main Location
                  </CardTitle>
                  <CardDescription>
                    Provide the main location details for your facility
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Textarea
                      id="address"
                      placeholder="123 Medical Drive, Suite 100"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      data-testid="input-address"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="lga">Local Government Area (LGA)</Label>
                      <Select value={lga} onValueChange={setLga} required>
                        <SelectTrigger id="lga" data-testid="select-lga">
                          <SelectValue placeholder="Select LGA" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="metropolitan">Metropolitan</SelectItem>
                          <SelectItem value="westside">Westside</SelectItem>
                          <SelectItem value="northern">Northern</SelectItem>
                          <SelectItem value="eastern">Eastern</SelectItem>
                          <SelectItem value="southern">Southern</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        placeholder="State name"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                        data-testid="input-state"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-facility" />
                    Additional Locations
                  </CardTitle>
                  <CardDescription>
                    Add any additional facility locations (optional)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {locations.map((location, index) => (
                      <div
                        key={index}
                        className="flex items-start justify-between p-4 rounded-lg border"
                        data-testid={`location-${index}`}
                      >
                        <div className="space-y-1">
                          <p className="font-medium">{location.name}</p>
                          <p className="text-sm text-muted-foreground">{location.address}</p>
                          <Badge variant="outline" className="mt-1">
                            {location.lga}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveLocation(index)}
                          data-testid={`button-remove-location-${index}`}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4 p-4 rounded-lg border bg-muted/50">
                    <h4 className="font-medium">Add New Location</h4>
                    <div className="space-y-3">
                      <Input
                        placeholder="Location name"
                        value={newLocation.name}
                        onChange={(e) =>
                          setNewLocation({ ...newLocation, name: e.target.value })
                        }
                        data-testid="input-new-location-name"
                      />
                      <Input
                        placeholder="Location address"
                        value={newLocation.address}
                        onChange={(e) =>
                          setNewLocation({ ...newLocation, address: e.target.value })
                        }
                        data-testid="input-new-location-address"
                      />
                      <Select
                        value={newLocation.lga}
                        onValueChange={(value) =>
                          setNewLocation({ ...newLocation, lga: value })
                        }
                      >
                        <SelectTrigger data-testid="select-new-location-lga">
                          <SelectValue placeholder="Select LGA" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="metropolitan">Metropolitan</SelectItem>
                          <SelectItem value="westside">Westside</SelectItem>
                          <SelectItem value="northern">Northern</SelectItem>
                          <SelectItem value="eastern">Eastern</SelectItem>
                          <SelectItem value="southern">Southern</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={handleAddLocation}
                        data-testid="button-add-location"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Location
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-facility" />
                    Invite Team Members
                  </CardTitle>
                  <CardDescription>
                    Invite staff members to join your facility (optional)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {teamMembers.map((member, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-lg border"
                        data-testid={`team-member-${index}`}
                      >
                        <div className="space-y-1">
                          <p className="font-medium">{member.email}</p>
                          <Badge variant="outline" className="capitalize">
                            {member.role}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveTeamMember(index)}
                          data-testid={`button-remove-member-${index}`}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4 p-4 rounded-lg border bg-muted/50">
                    <h4 className="font-medium">Invite Team Member</h4>
                    <div className="space-y-3">
                      <Input
                        type="email"
                        placeholder="team.member@example.com"
                        value={newMember.email}
                        onChange={(e) =>
                          setNewMember({ ...newMember, email: e.target.value })
                        }
                        data-testid="input-new-member-email"
                      />
                      <Select
                        value={newMember.role}
                        onValueChange={(value) =>
                          setNewMember({ ...newMember, role: value })
                        }
                      >
                        <SelectTrigger data-testid="select-new-member-role">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Administrator</SelectItem>
                          <SelectItem value="doctor">Doctor</SelectItem>
                          <SelectItem value="nurse">Nurse</SelectItem>
                          <SelectItem value="staff">Staff</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={handleAddTeamMember}
                        data-testid="button-add-member"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Team Member
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                data-testid="button-back"
              >
                Back
              </Button>
              {currentStep < totalSteps ? (
                <Button type="button" onClick={handleNext} data-testid="button-next">
                  Next
                </Button>
              ) : (
                <Button type="submit" data-testid="button-complete">
                  Complete Setup
                </Button>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
