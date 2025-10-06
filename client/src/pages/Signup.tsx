import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "wouter";
import { Label } from "@/components/ui/label";
import { Syringe, ArrowLeft, Building2, Check, AlertCircle, Mail } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Signup() {
  const [step, setStep] = useState<'facility' | 'user-details' | 'verify-email'>('facility');
  const [facilityName, setFacilityName] = useState("");
  const [isFacilityAvailable, setIsFacilityAvailable] = useState<boolean | null>(null);
  const [isCheckingFacility, setIsCheckingFacility] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const handleCheckFacility = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingFacility(true);
    
    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock facility availability check
    const isAvailable = !["Central Medical Center", "City Hospital"].includes(facilityName);
    setIsFacilityAvailable(isAvailable);
    setIsCheckingFacility(false);
    
    if (isAvailable) {
      setTimeout(() => setStep('user-details'), 500);
    }
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // TODO: Replace with actual API call to create account and send verification email
    console.log("Creating account and sending verification email:", { facilityName, fullName, email });
    
    // Simulate sending verification email
    await new Promise(resolve => setTimeout(resolve, 1000));
    setStep('verify-email');
  };

  const handleVerifyEmail = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Replace with actual API call to verify code
    console.log("Verifying code:", verificationCode);
    
    // Redirect to onboarding
    window.location.href = "/facility/onboarding";
  };

  const handleSkipOnboarding = () => {
    window.location.href = "/facility";
  };

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
              <div className="bg-primary text-primary-foreground rounded-lg p-2">
                <Syringe className="h-6 w-6" />
              </div>
              <h1 className="text-xl font-bold">VaxTrack</h1>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          {step === 'facility' && (
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Register Your Facility</CardTitle>
                <CardDescription>
                  Enter your healthcare facility name to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCheckFacility} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="facility-name">Facility Name</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="facility-name"
                        type="text"
                        placeholder="Central Medical Center"
                        className="pl-10"
                        value={facilityName}
                        onChange={(e) => {
                          setFacilityName(e.target.value);
                          setIsFacilityAvailable(null);
                        }}
                        required
                        data-testid="input-facility-name"
                      />
                    </div>
                    {isFacilityAvailable === false && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          This facility name is already registered. Please choose a different name.
                        </AlertDescription>
                      </Alert>
                    )}
                    {isFacilityAvailable === true && (
                      <Alert className="border-vaccinated bg-vaccinated-bg/20">
                        <Check className="h-4 w-4 text-vaccinated" />
                        <AlertDescription className="text-vaccinated-text">
                          This facility name is available!
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-facility hover:bg-facility/90" 
                    disabled={isCheckingFacility}
                    data-testid="button-check-facility"
                  >
                    {isCheckingFacility ? "Checking availability..." : "Continue"}
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login">
                      <span className="text-primary hover:underline cursor-pointer" data-testid="link-login">
                        Sign in
                      </span>
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {step === 'user-details' && (
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Create Your Account</CardTitle>
                <CardDescription>
                  You'll be the administrator for {facilityName}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateAccount} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input
                      id="full-name"
                      type="text"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      data-testid="input-full-name"
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
                    <p className="text-xs text-muted-foreground">
                      We'll send a verification code to this email
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      data-testid="input-password"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      data-testid="input-confirm-password"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setStep('facility')}
                      data-testid="button-back-to-facility"
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="flex-1 bg-facility hover:bg-facility/90"
                      data-testid="button-create-account"
                    >
                      Create Account
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {step === 'verify-email' && (
            <Card>
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full bg-facility/10 text-facility flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl">Verify Your Email</CardTitle>
                <CardDescription>
                  We've sent a verification code to {email}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleVerifyEmail} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="verification-code">Verification Code</Label>
                    <Input
                      id="verification-code"
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      required
                      maxLength={6}
                      data-testid="input-verification-code"
                    />
                  </div>

                  <Alert>
                    <AlertDescription>
                      After verification, you can set up your facility details or skip to your dashboard.
                    </AlertDescription>
                  </Alert>

                  <Button 
                    type="submit" 
                    className="w-full bg-facility hover:bg-facility/90"
                    data-testid="button-verify-email"
                  >
                    Verify & Continue to Onboarding
                  </Button>

                  <Button 
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleSkipOnboarding}
                    data-testid="button-skip-onboarding"
                  >
                    Skip Onboarding for Now
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    Didn't receive the code?{" "}
                    <button 
                      type="button"
                      className="text-primary hover:underline"
                      onClick={() => console.log("Resending verification email")}
                      data-testid="button-resend-code"
                    >
                      Resend
                    </button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
