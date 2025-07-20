import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "@/hooks/useTranslation";
import { mockGalleryEvents } from "@/data/mockData";
import { Upload, ArrowRight } from "lucide-react";

export default function Gallery() {
  const { t } = useTranslation();
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState("all");

  const filteredEvents = mockGalleryEvents.filter(event => {
    const yearMatch = selectedYear === "all" || event.year === selectedYear;
    const eventMatch = selectedEvent === "all" || event.title.toLowerCase().includes(selectedEvent.toLowerCase());
    return yearMatch && eventMatch;
  });

  const uniqueYears = Array.from(new Set(mockGalleryEvents.map(event => event.year))).sort().reverse();

  return (
    <div className="space-y-6">
      <Card>
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <h3 className="text-lg font-medium text-gray-900">{t("Family Gallery")}</h3>
            <div className="flex items-center space-x-3">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder={t("All Years")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("All Years")}</SelectItem>
                  {uniqueYears.map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder={t("All Events")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("All Events")}</SelectItem>
                  <SelectItem value="diwali">Diwali</SelectItem>
                  <SelectItem value="new year">New Year</SelectItem>
                  <SelectItem value="gathering">Family Gathering</SelectItem>
                  <SelectItem value="wedding">Wedding</SelectItem>
                </SelectContent>
              </Select>
              <Button className="flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>{t("Upload")}</span>
              </Button>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div key={event.id} className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-medium text-gray-900">{event.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    {event.month} {event.year} • {event.photoCount} {t("Photos")}
                  </p>
                  <Button variant="ghost" className="mt-3 p-0 h-auto text-primary hover:text-primary/80">
                    {t("View Gallery")} <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
