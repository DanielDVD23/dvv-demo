import { UserPlus, Calendar, CreditCard, Award } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Activity {
  id: number;
  icon: LucideIcon;
  iconBg: string;
  text: string;
  time: string;
}

const activities: Activity[] = [
  {
    id: 1,
    icon: UserPlus,
    iconBg: "bg-blue-100 text-blue-600",
    text: "Maria Schmidt ist dem Verein beigetreten",
    time: "vor 2 Stunden",
  },
  {
    id: 2,
    icon: CreditCard,
    iconBg: "bg-green-100 text-green-600",
    text: "Mitgliedsbeitrag von Thomas Müller eingegangen (120 €)",
    time: "vor 4 Stunden",
  },
  {
    id: 3,
    icon: Calendar,
    iconBg: "bg-amber-100 text-amber-600",
    text: "Neue Veranstaltung erstellt: Jahreshauptversammlung",
    time: "vor 6 Stunden",
  },
  {
    id: 4,
    icon: Award,
    iconBg: "bg-purple-100 text-purple-600",
    text: "Klaus Weber hat die Trainer-Lizenz B erhalten",
    time: "vor 1 Tag",
  },
  {
    id: 5,
    icon: UserPlus,
    iconBg: "bg-blue-100 text-blue-600",
    text: "Lena Fischer ist dem Verein beigetreten",
    time: "vor 1 Tag",
  },
  {
    id: 6,
    icon: CreditCard,
    iconBg: "bg-green-100 text-green-600",
    text: "Sponsoring-Zahlung von SportPartner GmbH (2.500 €)",
    time: "vor 2 Tagen",
  },
];

export default function ActivityFeed() {
  return (
    <div className="bg-card-bg rounded-xl border border-card-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-1">Letzte Aktivitäten</h3>
      <p className="text-sm text-gray-500 mb-6">Neueste Ereignisse im Verein</p>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className={`rounded-lg p-2 shrink-0 ${activity.iconBg}`}>
              <activity.icon className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-foreground">{activity.text}</p>
              <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
