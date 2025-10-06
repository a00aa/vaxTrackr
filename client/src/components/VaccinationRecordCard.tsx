import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";
import { format } from "date-fns";

interface VaccinationRecordCardProps {
  vaccineName: string;
  dateAdministered: Date;
  facility: string;
  status: "completed" | "pending" | "overdue";
  onViewQR?: () => void;
}

export function VaccinationRecordCard({
  vaccineName,
  dateAdministered,
  facility,
  status,
  onViewQR,
}: VaccinationRecordCardProps) {
  const statusConfig = {
    completed: {
      label: "Completed",
      className: "bg-vaccinated-bg text-vaccinated-text",
    },
    pending: {
      label: "Pending",
      className: "bg-pending-bg text-pending-text",
    },
    overdue: {
      label: "Overdue",
      className: "bg-overdue-bg text-overdue-text",
    },
  };

  const config = statusConfig[status];

  return (
    <Card className="hover-elevate transition-all">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">{vaccineName}</h3>
              <Badge className={config.className} data-testid={`badge-status-${status}`}>
                {config.label}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Administered: {format(dateAdministered, "MMM dd, yyyy")}
            </p>
            <p className="text-sm text-muted-foreground">
              Facility: {facility}
            </p>
          </div>
          {status === "completed" && onViewQR && (
            <Button
              variant="outline"
              size="sm"
              onClick={onViewQR}
              data-testid="button-view-qr"
            >
              <QrCode className="h-4 w-4 mr-2" />
              QR Code
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
