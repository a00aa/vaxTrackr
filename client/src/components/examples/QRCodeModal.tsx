import { useState } from "react";
import { QRCodeModal } from "../QRCodeModal";
import { Button } from "@/components/ui/button";

export default function QRCodeModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-8">
      <Button onClick={() => setOpen(true)}>Show QR Code</Button>
      <QRCodeModal
        open={open}
        onOpenChange={setOpen}
        vaccineName="COVID-19 Vaccine (Pfizer)"
        patientId="VAX-2024-001234"
        dateAdministered="March 15, 2024"
        facility="Central Medical Center"
      />
    </div>
  );
}
