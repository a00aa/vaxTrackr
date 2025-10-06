import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";
import { Download, Printer } from "lucide-react";

interface QRCodeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vaccineName: string;
  patientId: string;
  dateAdministered: string;
  facility: string;
}

export function QRCodeModal({
  open,
  onOpenChange,
  vaccineName,
  patientId,
  dateAdministered,
  facility,
}: QRCodeModalProps) {
  const qrData = JSON.stringify({
    patientId,
    vaccine: vaccineName,
    date: dateAdministered,
    facility,
  });

  const handleDownload = () => {
    const svg = document.querySelector("#qr-code-svg") as SVGElement;
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `vaccine-qr-${patientId}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" data-testid="modal-qr-code">
        <DialogHeader>
          <DialogTitle>Vaccination QR Code</DialogTitle>
          <DialogDescription>
            Scan this QR code for proof of vaccination
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-6 py-4">
          <div className="bg-white p-4 rounded-lg">
            <QRCodeSVG
              id="qr-code-svg"
              value={qrData}
              size={256}
              level="H"
              includeMargin={true}
            />
          </div>
          <div className="space-y-2 text-center">
            <p className="font-semibold">{vaccineName}</p>
            <p className="text-sm text-muted-foreground">
              Date: {dateAdministered}
            </p>
            <p className="text-sm text-muted-foreground">
              Patient ID: {patientId}
            </p>
            <p className="text-sm text-muted-foreground">{facility}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              data-testid="button-download-qr"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              data-testid="button-print-qr"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
