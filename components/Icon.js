import {
  Plane, Route, Mountain, PartyPopper, ShieldCheck, SlidersHorizontal, Sparkles, Headset, Landmark, UsersRound, Users,
  Heart, Footprints, Flower2, MapPin, Car, Hotel, CalendarDays, Armchair, Briefcase, Snowflake, Utensils, Flag, Search,
  LayoutDashboard, ReceiptText, Luggage, Mail, Globe, RotateCcw, LogOut, Image as ImageIcon,
} from "lucide-react";

const MAP = {
  plane: Plane, route: Route, mountain: Mountain, party: PartyPopper, shield: ShieldCheck, sliders: SlidersHorizontal,
  sparkles: Sparkles, headset: Headset, temple: Landmark, family: UsersRound, friends: Users, heart: Heart, trek: Footprints,
  women: Flower2, pin: MapPin, car: Car, hotel: Hotel, calendar: CalendarDays, seat: Armchair, bag: Briefcase, ac: Snowflake,
  meal: Utensils, flag: Flag, search: Search, dash: LayoutDashboard, receipt: ReceiptText, luggage: Luggage, mail: Mail,
  globe: Globe, reset: RotateCcw, logout: LogOut, image: ImageIcon,
};

export default function Icon({ name, size = 18, className, style }) {
  const C = MAP[name] || MapPin;
  return <C size={size} strokeWidth={1.9} className={className} style={{ flex: "none", ...style }} aria-hidden="true" />;
}
