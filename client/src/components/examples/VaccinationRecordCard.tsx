import { VaccinationRecordCard } from "../VaccinationRecordCard";

export default function VaccinationRecordCardExample() {
  return (
    <div className="p-8 space-y-4">
      <VaccinationRecordCard
        vaccineName="COVID-19 Vaccine (Pfizer)"
        dateAdministered={new Date("2024-03-15")}
        facility="Central Medical Center"
        status="completed"
        onViewQR={() => console.log("View QR clicked")}
      />
      <VaccinationRecordCard
        vaccineName="Hepatitis B"
        dateAdministered={new Date("2024-06-20")}
        facility="Westside Health Clinic"
        status="pending"
      />
    </div>
  );
}
