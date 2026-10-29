// ─────────────────────────────────────────────────────────────
//  GO TRIP — single source of truth for contact details & content.
//  Change the values in SITE and the whole website updates.
// ─────────────────────────────────────────────────────────────
export const SITE = {
  name: "Go Trip",
  tagline: "Bas Nikal Pado!",
  longName: "Go Trip — Bas Nikal Pado!",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://gotrip.in", // ← replace with the real domain
  phones: [
    { display: "+91 78074 66559", raw: "917807466559" },
    { display: "+91 80917 19146", raw: "918091719146" },
  ],
  email: "hello@gotrip.in", // ← placeholder, client will share the real e-mail later
  address: "Shimla, Himachal Pradesh, India", // ← placeholder
  hours: "Open 24 × 7",
};
SITE.phone = SITE.phones[0].display;
SITE.phoneRaw = SITE.phones[0].raw;

export const waLink = (text = "Hi Go Trip! I want to plan a trip.", raw = SITE.phoneRaw) =>
  `https://wa.me/${raw}?text=${encodeURIComponent(text)}`;
export const inr = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");

const u = (id, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export const IMG = {
  hero: u("1506905925346-21bda4d32df4", 2000),
  shimla: u("1597074866923-dc0589150358"),
  manali: u("1626621341517-bbf3d9990a23"),
  ladakh: u("1581793745862-99fde7fa73d2"),
  spiti: u("1609766857041-ed402ea8069a"),
  dharamshala: u("1605649487212-47bdab064df7"),
  jaipur: u("1477587458883-47145ed94245"),
  road: u("1469854523086-cc02fe5d8800"),
  friends: u("1511632765486-a01980e01a18"),
  trek: u("1551632811-561732d1e306"),
  trek2: u("1501555088652-021faa106b9b"),
  woman: u("1527631746610-bca00a040d60"),
  temple: u("1544735716-392fe2489ffa"),
  taj: u("1548013146-72479768bada"),
  peaks: u("1464822759023-fed622ff2c3b"),
  forest: u("1472396961693-142e6e269027"),
};

// ───────────── Cars: Alto → Tempo Traveller (no prices shown on the site) ─────────────
export const VEHICLES = [
  { id: "alto", name: "Alto / Kwid", type: "Hatchback", seats: 4, bags: 1, ac: true, img: "/cars/alto.jpg", tag: "Budget solo / couple", group: "Economy", factor: 1 },
  { id: "wagonr", name: "WagonR / Celerio / i10", type: "Hatchback", seats: 4, bags: 2, ac: true, img: "/cars/wagonr.jpg", tag: "City & short trips", group: "Economy", factor: 1.1 },
  { id: "dzire", name: "Swift Dzire / Etios / Aura", type: "Sedan", seats: 4, bags: 3, ac: true, img: "/cars/dzire.jpg", tag: "Best for couples", group: "Sedan", factor: 1.3 },
  { id: "ertiga", name: "Maruti Ertiga / Marazzo", type: "MPV (6+1)", seats: 6, bags: 3, ac: true, img: "/cars/ertiga.jpg", tag: "Small family", group: "SUV / MPV", factor: 1.65 },
  { id: "innova", name: "Toyota Innova", type: "SUV (7)", seats: 7, bags: 4, ac: true, img: "/cars/innova.jpg", tag: "Family favourite", group: "SUV / MPV", factor: 1.9 },
  { id: "crysta", name: "Toyota Innova Crysta", type: "Premium SUV", seats: 7, bags: 4, ac: true, img: "/cars/crysta.jpg", tag: "Most popular", group: "SUV / MPV", factor: 2.2 },
  { id: "tt9", name: "Tempo Traveller 9-Seater", type: "Traveller", seats: 9, bags: 6, ac: true, img: "/cars/tt9.jpg", tag: "Friends group", group: "Traveller", factor: 2.9 },
  { id: "tt12", name: "Tempo Traveller 12-Seater", type: "Traveller", seats: 12, bags: 8, ac: true, img: "/cars/tt12.jpg", tag: "Large family / group", group: "Traveller", factor: 3.3 },
  { id: "tt17", name: "Tempo Traveller 17-Seater", type: "Traveller", seats: 17, bags: 12, ac: true, img: "/cars/tt17.jpg", tag: "Corporate & weddings", group: "Traveller", factor: 4 },
];
export const CAR_GROUPS = ["Economy", "Sedan", "SUV / MPV", "Traveller"];

// ───────────── Hotels 2★ → 7★ ─────────────
// NOTE: sample partner properties — replace names/photos with the client's real tie-ups.
export const STARS = [
  { star: 2, label: "2★ Budget", note: "Clean & simple rooms, great for backpackers", rate: 900 },
  { star: 3, label: "3★ Comfort", note: "Comfortable rooms, breakfast, good location", rate: 1900 },
  { star: 4, label: "4★ Premium", note: "Premium rooms, restaurant & valley views", rate: 3400 },
  { star: 5, label: "5★ Luxury", note: "Luxury resorts with spa, pool & fine dining", rate: 6800 },
  { star: 7, label: "7★ Ultra Luxury", note: "Signature villas, butler service, chauffeured cars", rate: 17500 },
];
export const HOTELS = [
  { id: "h1", name: "Pine Nest Stay", city: "Shimla", star: 2, img: u("1520250497591-112f2f40a3f4"), perks: ["Mall Road access", "Free Wi-Fi"] },
  { id: "h2", name: "Hill View Residency", city: "Manali", star: 2, img: u("1582719508461-905c673771fd"), perks: ["Mountain view", "Hot water 24×7"] },
  { id: "h3", name: "Cedar Court Inn", city: "Shimla", star: 3, img: u("1566073771259-6a8506099945"), perks: ["Breakfast included", "Room heater"] },
  { id: "h4", name: "Snow Valley Residency", city: "Manali", star: 3, img: u("1566073771259-6a8506099945"), perks: ["Near Mall Road", "Balcony rooms"] },
  { id: "h5", name: "Mcleod Heights", city: "Dharamshala", star: 3, img: u("1582719508461-905c673771fd"), perks: ["Cafe on-site", "Valley view"] },
  { id: "h6", name: "Deodar Grand", city: "Shimla", star: 4, img: u("1542314831-068cd1dbfeeb"), perks: ["Restaurant & bar", "Valley-view rooms"] },
  { id: "h7", name: "Beas Riverside Resort", city: "Manali", star: 4, img: u("1571896349842-33c89424de2d"), perks: ["Riverside lawns", "Bonfire evenings"] },
  { id: "h8", name: "Leh Palace Heights", city: "Leh", star: 4, img: u("1542314831-068cd1dbfeeb"), perks: ["Oxygen support", "Local cuisine"] },
  { id: "h9", name: "The Himalayan Crest", city: "Shimla", star: 5, img: u("1571896349842-33c89424de2d"), perks: ["Spa & wellness", "Heated pool", "Fine dining"] },
  { id: "h10", name: "Apple Valley Luxury Resort", city: "Manali", star: 5, img: u("1520250497591-112f2f40a3f4"), perks: ["Private balconies", "Spa", "Mountain-view pool"] },
  { id: "h11", name: "Pangong Lakeside Camp & Suites", city: "Leh", star: 5, img: u("1571896349842-33c89424de2d"), perks: ["Lake-facing suites", "Heated rooms"] },
  { id: "h12", name: "Maharaja Signature Villas", city: "Shimla", star: 7, img: u("1571896349842-33c89424de2d"), perks: ["Private villa & pool", "Personal butler", "Chauffeured luxury car"] },
  { id: "h13", name: "Himalayan Royal Estate", city: "Manali", star: 7, img: u("1566073771259-6a8506099945"), perks: ["Private chef", "Helipad transfers on request", "Spa suite"] },
];

export const DESTINATIONS = [
  { name: "Shimla", cat: "Himachal", img: IMG.shimla },
  { name: "Manali", cat: "Himachal", img: IMG.manali },
  { name: "Leh Ladakh", cat: "Ladakh", img: IMG.ladakh },
  { name: "Spiti Valley", cat: "Spiti", img: IMG.spiti },
  { name: "Dharamshala", cat: "Himachal", img: IMG.dharamshala },
  { name: "Kedarnath • Badrinath", cat: "Uttarakhand", img: IMG.temple },
  { name: "Rishikesh • Haridwar", cat: "Uttarakhand", img: IMG.forest },
  { name: "Golden Triangle", cat: "Golden Triangle", img: IMG.jaipur },
];
export const CUSTOM_PLACES = ["Shimla", "Kufri", "Manali", "Kasol", "Dharamshala", "Dalhousie", "Spiti Valley", "Leh Ladakh", "Rishikesh", "Haridwar", "Kedarnath", "Amritsar", "Jaipur", "Agra"];

// Themes shown as big category tiles + filters
export const THEMES = [
  { id: "Temple", icon: "temple", title: "Temple Yatra", text: "Devi, Shiv & Char Dham darshan with comfort", img: IMG.temple },
  { id: "Family", icon: "family", title: "Family Trips", text: "Relaxed pace, kid-friendly stops, safe stays", img: IMG.shimla },
  { id: "Friends", icon: "friends", title: "Friends Gang", text: "Road trips, cafes, bonfires & zero boredom", img: IMG.friends },
  { id: "Women Special", icon: "women", title: "Women Special", text: "Safe, women-friendly group & solo trips", img: IMG.woman },
  { id: "Trekking", icon: "trek", title: "Trekking", text: "Triund, Kheerganga, Hampta Pass & more", img: IMG.trek },
  { id: "Honeymoon", icon: "heart", title: "Honeymoon", text: "Candle-light stays & private valley drives", img: IMG.manali },
];

export const SERVICES = [
  { icon: "plane", title: "Airport & Station Transfers", text: "Delhi, Chandigarh, Kullu & Shimla airport / railway pickups with flight tracking." },
  { icon: "route", title: "Outstation One-Way & Round Trip", text: "Delhi ⇄ Shimla, Manali, Dharamshala, Amritsar and every hill route in between." },
  { icon: "mountain", title: "Local Sightseeing", text: "Kufri, Naldehra, Solang, Atal Tunnel — by-the-day cabs with local drivers." },
  { icon: "party", title: "Weddings & Corporate", text: "Fleet bookings for baraat, events and company offsites, decorated cars on request." },
];

export const WHY = [
  { icon: "shield", title: "Verified Hill Drivers", text: "Experienced mountain drivers who know every pass, weather and shortcut." },
  { icon: "sliders", title: "Fully Customisable", text: "Choose your own car, your own hotel star-category and your own route." },
  { icon: "sparkles", title: "Clean, Sanitised Cabs", text: "Alto to Tempo Traveller — AC, GPS, music system and luggage carrier." },
  { icon: "headset", title: "24×7 Support", text: "Real humans on call and WhatsApp throughout your trip, day or night." },
];

export const TESTIMONIALS = [
  { name: "Rohit & Neha Sharma", place: "Delhi", text: "Booked Shimla–Manali for our anniversary. Driver was polite and the Innova was spotless. Smooth trip from start to end!" },
  { name: "Ankit Verma", place: "Noida", text: "Leh Ladakh in 9 days — great hotels, perfect planning and a driver who handled high passes like a pro." },
  { name: "Priya Mehta", place: "Mumbai", text: "Went with a women's group — felt totally safe. Easy WhatsApp booking and everything exactly as promised." },
  { name: "Sandeep Kaur", place: "Chandigarh", text: "Built my own package: Ertiga + 4★ hotels. They arranged it all in one call. Brilliant idea!" },
  { name: "Manish Gupta", place: "Gurugram", text: "Char Dham yatra with parents — comfortable cars, helpful driver, zero tension. Highly recommended." },
  { name: "Aarti Joshi", place: "Pune", text: "Our friends' Spiti trip was epic. Tempo Traveller was super clean and the itinerary was spot on." },
];

export const FAQS = [
  { q: "Can I create my own tour package?", a: "Yes! Use our Custom Package builder — pick destinations, number of nights, your car (Alto to Tempo Traveller) and your hotel category (2★ to 7★). We confirm the final quote on WhatsApp." },
  { q: "Which cars do you offer?", a: "Alto, WagonR, Swift Dzire, Ertiga, Innova, Innova Crysta and 9 / 12 / 17-seater Tempo Travellers — all AC with verified drivers." },
  { q: "Do you have women-only or women-friendly trips?", a: "Yes. Our Women Special packages use women-friendly stays, verified drivers, live-location sharing with family and flexible group sizes." },
  { q: "Do you arrange temple / pilgrimage yatras?", a: "Absolutely — Kedarnath-Badrinath, Vaishno Devi, Himachal Shakti Peeth, Haridwar-Rishikesh and the Golden Temple, with senior-citizen friendly planning." },
  { q: "How do I pay?", a: "No online payment is needed to enquire. Once our team confirms your trip you pay a small advance, rest during the journey." },
  { q: "What if the weather or roads are closed?", a: "We monitor road and weather updates 24×7 and re-plan your route or sightseeing at no extra planning cost." },
];

const q = (s) => `/packages?q=${encodeURIComponent(s)}`;
export const MARQUEE_TAGS = [
  { label: "Shimla", href: q("Shimla") }, { label: "Manali", href: q("Manali") }, { label: "Leh Ladakh", href: "/packages?c=Ladakh" },
  { label: "Spiti Valley", href: "/packages?c=Spiti" }, { label: "Kasol", href: q("Kasol") }, { label: "Dharamshala", href: q("Dharamshala") },
  { label: "Kedarnath", href: "/packages?c=Uttarakhand" }, { label: "Rishikesh", href: q("Rishikesh") }, { label: "Amritsar", href: q("Amritsar") },
  { label: "Jaipur", href: "/packages?c=Golden%20Triangle" },
];
export const MARQUEE_SERVICES = [
  { label: "Taxi Service", href: "/fleet" }, { label: "Tour Packages", href: "/packages" }, { label: "Temple Yatra", href: "/packages?t=Temple" },
  { label: "Family Trips", href: "/packages?t=Family" }, { label: "Friends Trips", href: "/packages?t=Friends" }, { label: "Women Special", href: "/packages?t=Women%20Special" },
  { label: "Trekking", href: "/packages?t=Trekking" }, { label: "Honeymoon", href: "/packages?t=Honeymoon" }, { label: "Custom Packages", href: "/custom" },
  { label: "3★ to 7★ Hotels", href: "/hotels" }, { label: "Alto to Traveller", href: "/fleet" }, { label: "24×7 Support", href: "/contact" },
];

export const STATUSES = ["Pending", "Confirmed", "Completed", "Cancelled"];

const INCL = [
  "AC vehicle for entire trip",
  "Experienced driver & driver allowance",
  "Fuel, toll, parking & state taxes",
  "Hotel pickup & drop",
  "24×7 trip support",
];
const EXCL = [
  "Meals & personal expenses",
  "Monument / activity entry tickets",
  "Costs arising from landslides or road closures",
];

const mk = (o) => ({
  inclusions: INCL,
  exclusions: EXCL,
  featured: false,
  active: true,
  rating: 4.8,
  themes: [],
  ...o,
  nights: o.nights ?? o.days - 1,
});

export const SEED_PACKAGES = [
  mk({
    id: "p1", slug: "shimla-kufri-weekend", title: "Shimla Kufri Weekend Getaway", route: "Delhi → Shimla → Kufri → Delhi",
    category: "Himachal", themes: ["Family", "Friends"], days: 3, price: 7500, img: IMG.shimla, featured: true,
    summary: "A relaxed hill-station break: colonial Mall Road, Kufri snow-point and Jakhu temple views.",
    highlights: ["Mall Road & The Ridge", "Kufri & Fagu viewpoints", "Jakhu Temple", "Christ Church", "Optional Naldehra visit"],
    itinerary: [
      "Day 1: Early Delhi pickup, drive to Shimla via Chandigarh (≈ 7 hrs). Evening walk on Mall Road.",
      "Day 2: Kufri, Fagu, Himalayan Nature Park & Jakhu Temple. Local shopping at Lakkar Bazaar.",
      "Day 3: Breakfast, optional Naldehra, then drive back to Delhi with evening drop.",
    ],
  }),
  mk({
    id: "p2", slug: "shimla-manali-classic", title: "Shimla Manali Classic", route: "Delhi → Shimla → Manali → Delhi",
    category: "Himachal", themes: ["Family", "Honeymoon", "Friends"], days: 6, price: 17500, img: IMG.manali, featured: true, rating: 4.9,
    summary: "India's most-loved hill circuit — two iconic hill stations, Kullu valley and Solang snow fun.",
    highlights: ["Kufri & Mall Road, Shimla", "Kullu river rafting (optional)", "Solang Valley & Atal Tunnel", "Hadimba Temple & Old Manali", "Manikaran Sahib"],
    itinerary: [
      "Day 1: Delhi → Shimla (≈ 7 hrs). Check-in and Mall Road evening.",
      "Day 2: Kufri & Jakhu sightseeing; afternoon drive to Manali via Mandi (≈ 7 hrs).",
      "Day 3: Solang Valley, Atal Tunnel & Sissu.",
      "Day 4: Hadimba Temple, Vashisht, Old Manali & Mall Road.",
      "Day 5: Kullu, Manikaran and river-side stops en route to Chandigarh.",
      "Day 6: Chandigarh → Delhi drop.",
    ],
  }),
  mk({
    id: "p3", slug: "manali-leh-ladakh-expedition", title: "Manali – Leh – Ladakh Expedition", route: "Delhi → Manali → Leh → Pangong → Delhi",
    category: "Ladakh", themes: ["Friends", "Trekking"], days: 9, price: 49500, img: IMG.ladakh, featured: true, rating: 4.9,
    summary: "The ultimate Himalayan road trip over Baralacha & Tanglang La to Nubra and Pangong.",
    highlights: ["Atal Tunnel & Sarchu", "Leh Palace & Shanti Stupa", "Nubra Valley & Khardung La", "Pangong Lake", "Magnetic Hill & Hall of Fame"],
    itinerary: [
      "Day 1: Delhi → Manali overnight drive / arrival.",
      "Day 2: Manali → Jispa / Sarchu via Atal Tunnel & Baralacha La.",
      "Day 3: Sarchu → Leh over Tanglang La. Rest for acclimatisation.",
      "Day 4: Leh local — Shanti Stupa, Palace, Hall of Fame, Magnetic Hill.",
      "Day 5: Leh → Nubra via Khardung La; camel safari at Hunder.",
      "Day 6: Nubra → Pangong Lake.",
      "Day 7: Pangong → Leh via Chang La.",
      "Day 8: Leh → Manali return journey.",
      "Day 9: Manali → Delhi drop.",
    ],
    inclusions: [...INCL, "Inner Line Permit assistance", "Oxygen cylinder in vehicle"],
  }),
  mk({
    id: "p4", slug: "spiti-valley-circuit", title: "Spiti Valley Circuit", route: "Shimla → Kinnaur → Spiti → Manali",
    category: "Spiti", themes: ["Friends", "Trekking"], days: 8, price: 38500, img: IMG.spiti,
    summary: "Cold-desert monasteries, Chandratal Lake and the world's highest post office at Hikkim.",
    highlights: ["Kalpa & Sangla (Kinnaur)", "Key & Kibber monasteries", "Hikkim post office", "Chandratal Lake", "Kunzum Pass"],
    itinerary: [
      "Day 1: Shimla → Narkanda → Sangla.", "Day 2: Sangla → Kalpa → Nako.", "Day 3: Nako → Tabo → Kaza.",
      "Day 4: Key, Kibber, Hikkim, Komic.", "Day 5: Kaza → Chandratal via Kunzum Pass.", "Day 6: Chandratal → Manali.",
      "Day 7: Manali local sightseeing.", "Day 8: Manali → Delhi / Chandigarh drop.",
    ],
  }),
  mk({
    id: "p5", slug: "dharamshala-dalhousie-khajjiar", title: "Dharamshala Dalhousie Khajjiar", route: "Delhi → Dharamshala → Dalhousie → Delhi",
    category: "Himachal", themes: ["Family"], days: 5, price: 15500, img: IMG.dharamshala, featured: true, rating: 4.7,
    summary: "Tibetan culture at McLeod Ganj, deodar forests of Dalhousie and 'Mini Switzerland' Khajjiar.",
    highlights: ["McLeod Ganj & Dalai Lama Temple", "Bhagsu Waterfall", "Triund viewpoint", "Khajjiar meadow", "Dainkund Peak"],
    itinerary: [
      "Day 1: Delhi → Dharamshala (≈ 10 hrs).", "Day 2: McLeod Ganj, Bhagsu, Naddi & cricket stadium.",
      "Day 3: Dharamshala → Dalhousie via Chamba road.", "Day 4: Khajjiar, Kalatop sanctuary and Dainkund.", "Day 5: Dalhousie → Delhi drop.",
    ],
  }),
  mk({
    id: "p6", slug: "golden-triangle-delhi-agra-jaipur", title: "Golden Triangle Delhi Agra Jaipur", route: "Delhi → Agra → Jaipur → Delhi",
    category: "Golden Triangle", themes: ["Family"], days: 4, price: 14500, img: IMG.taj, rating: 4.7,
    summary: "Red Fort, Taj Mahal, Amber Fort and Jaipur bazaars — India's classic heritage circuit.",
    highlights: ["Old & New Delhi tour", "Taj Mahal & Agra Fort", "Fatehpur Sikri", "Amber Fort & Hawa Mahal", "Jaipur bazaars"],
    itinerary: [
      "Day 1: Delhi sightseeing — India Gate, Qutub Minar, Humayun's Tomb.", "Day 2: Delhi → Agra via Yamuna Expressway; Taj & Agra Fort.",
      "Day 3: Fatehpur Sikri → Jaipur; Hawa Mahal & City Palace.", "Day 4: Amber Fort, Jal Mahal, then drive to Delhi.",
    ],
  }),
  mk({
    id: "p7", slug: "shimla-kullu-manali-family-special", title: "Shimla Kullu Manali Family Special", route: "Chandigarh → Shimla → Manali → Chandigarh",
    category: "Himachal", themes: ["Family"], days: 7, price: 21500, img: IMG.road, featured: true,
    summary: "Slow-paced family trip with more time in each town, kid-friendly stops and comfortable hotels.",
    highlights: ["Kufri horse ride", "Kullu shawl factory", "Snow point Solang", "Naggar Castle", "Chandigarh Rock Garden"],
    itinerary: [
      "Day 1: Chandigarh → Shimla.", "Day 2: Shimla local — Kufri & Jakhu.", "Day 3: Shimla → Kullu → Manali.", "Day 4: Solang Valley & Atal Tunnel.",
      "Day 5: Manali local and Naggar Castle.", "Day 6: Manali → Chandigarh.", "Day 7: Rock Garden & Sukhna Lake, then drop.",
    ],
  }),
  // ───── Temple ─────
  mk({
    id: "p8", slug: "char-dham-yatra", title: "Char Dham Yatra — Kedarnath Badrinath", route: "Haridwar → Yamunotri → Gangotri → Kedarnath → Badrinath → Haridwar",
    category: "Uttarakhand", themes: ["Temple", "Family"], days: 10, price: 52000, img: IMG.temple, featured: true, rating: 4.9,
    summary: "The sacred Char Dham circuit with senior-citizen friendly planning, comfortable stays and experienced hill drivers.",
    highlights: ["Yamunotri & Gangotri darshan", "Kedarnath Dham (helicopter / trek assist)", "Badrinath Dham & Mana village", "Ganga aarti at Haridwar", "Senior-citizen friendly pacing"],
    itinerary: [
      "Day 1: Haridwar / Dehradun pickup → Barkot.", "Day 2: Barkot → Jankichatti — Yamunotri darshan.", "Day 3: Barkot → Uttarkashi.",
      "Day 4: Gangotri darshan → Uttarkashi.", "Day 5: Uttarkashi → Guptkashi.", "Day 6: Kedarnath darshan (trek / pony / heli).",
      "Day 7: Guptkashi → Joshimath.", "Day 8: Badrinath darshan & Mana village.", "Day 9: Joshimath → Rishikesh.", "Day 10: Rishikesh → Haridwar / Delhi drop.",
    ],
  }),
  mk({
    id: "p9", slug: "himachal-shakti-peeth-yatra", title: "Himachal Shakti Peeth Yatra", route: "Chandigarh → Naina Devi → Chintpurni → Jwalaji → Chamunda → Kangra → Chandigarh",
    category: "Himachal", themes: ["Temple", "Family"], days: 4, price: 12500, img: IMG.temple,
    summary: "Darshan of five revered Devi temples of Himachal in one comfortable, well-planned circuit.",
    highlights: ["Naina Devi Temple", "Chintpurni Mata", "Jwalaji flame temple", "Chamunda Devi", "Brajeshwari Devi, Kangra"],
    itinerary: [
      "Day 1: Chandigarh → Naina Devi → Chintpurni.", "Day 2: Jwalaji → Kangra Brajeshwari Devi.", "Day 3: Chamunda Devi → Baijnath Shiv Temple.", "Day 4: Return to Chandigarh / Delhi.",
    ],
  }),
  mk({
    id: "p10", slug: "haridwar-rishikesh-spiritual", title: "Haridwar Rishikesh Spiritual Escape", route: "Delhi → Haridwar → Rishikesh → Delhi",
    category: "Uttarakhand", themes: ["Temple", "Friends", "Women Special"], days: 3, price: 9500, img: IMG.forest,
    summary: "Evening Ganga aarti, Laxman Jhula, yoga mornings and river-side cafes.",
    highlights: ["Har ki Pauri Ganga Aarti", "Laxman Jhula & Ram Jhula", "Triveni Ghat", "Yoga session (optional)", "River rafting (optional)"],
    itinerary: ["Day 1: Delhi → Haridwar; Mansa Devi & Ganga Aarti.", "Day 2: Rishikesh — Jhulas, Beatles Ashram, cafes, rafting.", "Day 3: Neelkanth Mahadev → Delhi drop."],
  }),
  mk({
    id: "p11", slug: "vaishno-devi-amritsar-yatra", title: "Vaishno Devi & Golden Temple Yatra", route: "Delhi → Katra → Amritsar → Delhi",
    category: "Punjab & J&K", themes: ["Temple", "Family"], days: 5, price: 18500, img: IMG.peaks,
    summary: "Mata Vaishno Devi darshan followed by the Golden Temple, Jallianwala Bagh and Wagah border ceremony.",
    highlights: ["Vaishno Devi (Katra)", "Golden Temple & Langar", "Jallianwala Bagh", "Wagah Border retreat", "Durgiana Temple"],
    itinerary: ["Day 1: Delhi → Katra.", "Day 2: Vaishno Devi yatra.", "Day 3: Katra → Amritsar; Golden Temple evening.", "Day 4: Jallianwala Bagh & Wagah border.", "Day 5: Amritsar → Delhi drop."],
  }),
  // ───── Friends ─────
  mk({
    id: "p12", slug: "kasol-tosh-kheerganga-gang-trip", title: "Kasol • Tosh • Kheerganga Gang Trip", route: "Delhi → Kasol → Tosh → Kheerganga → Delhi",
    category: "Himachal", themes: ["Friends", "Trekking"], days: 5, price: 13500, img: IMG.friends, featured: true,
    summary: "Cafes by Parvati river, Tosh village vibes and the famous Kheerganga hot-spring trek.",
    highlights: ["Kasol cafes & Parvati river", "Tosh village", "Kheerganga trek & hot spring", "Manikaran Sahib", "Bonfire nights"],
    itinerary: ["Day 1: Delhi → Kasol (overnight drive / arrival).", "Day 2: Kasol, Chalal trek & cafes.", "Day 3: Barshaini → Kheerganga trek & camp.", "Day 4: Descend; Manikaran Sahib; Tosh.", "Day 5: Return to Delhi."],
  }),
  // ───── Women special ─────
  mk({
    id: "p13", slug: "women-special-shimla-manali", title: "Women Special: Shimla Manali Group Trip", route: "Delhi → Shimla → Manali → Delhi",
    category: "Himachal", themes: ["Women Special", "Friends"], days: 6, price: 18500, img: IMG.woman, featured: true, rating: 4.9,
    summary: "A worry-free trip made for women — women-friendly stays, verified drivers, live-location sharing and flexible group sizes.",
    highlights: ["Women-friendly verified stays", "Live location shared with family", "Photo-friendly stops & cafes", "Safe evening plans", "Small, like-minded groups"],
    itinerary: [
      "Day 1: Delhi → Shimla; Mall Road evening.", "Day 2: Kufri, Jakhu & photo stops → drive to Manali.", "Day 3: Solang Valley & Atal Tunnel.",
      "Day 4: Hadimba, Old Manali cafes & shopping.", "Day 5: Kullu shawl shopping → Chandigarh.", "Day 6: Drop at Delhi.",
    ],
  }),
  mk({
    id: "p14", slug: "women-special-rishikesh-wellness", title: "Women Special: Rishikesh Wellness Retreat", route: "Delhi → Rishikesh → Delhi",
    category: "Uttarakhand", themes: ["Women Special", "Temple"], days: 3, price: 10500, img: IMG.forest,
    summary: "Yoga, meditation, Ganga aarti and cafe-hopping in a safe, women-friendly setting.",
    highlights: ["Morning yoga by the Ganga", "Ganga aarti", "Cafe-hopping", "Optional rafting", "Women-friendly stay"],
    itinerary: ["Day 1: Delhi → Rishikesh; sunset aarti.", "Day 2: Yoga, jhulas, cafes, optional rafting.", "Day 3: Temple visit & drive back to Delhi."],
  }),
  // ───── Trekking ─────
  mk({
    id: "p15", slug: "triund-trek-mcleodganj", title: "Triund Trek & McLeod Ganj", route: "Delhi → McLeod Ganj → Triund → Delhi",
    category: "Himachal", themes: ["Trekking", "Friends"], days: 4, price: 11500, img: IMG.trek2,
    summary: "Beginner-friendly trek to Triund ridge with camping under the stars and Dhauladhar views.",
    highlights: ["Triund ridge camping", "Snowline views", "Bhagsu waterfall", "Tibetan monasteries", "Local guide included"],
    itinerary: ["Day 1: Delhi → McLeod Ganj.", "Day 2: Trek to Triund & camp.", "Day 3: Descend; Bhagsu & Dalai Lama Temple.", "Day 4: Drive back to Delhi."],
  }),
  mk({
    id: "p16", slug: "hampta-pass-trek", title: "Hampta Pass Trek Special", route: "Manali → Jobra → Chika → Balu ka Ghera → Chandratal → Manali",
    category: "Himachal", themes: ["Trekking", "Friends"], days: 6, price: 17500, img: IMG.trek, rating: 4.9,
    summary: "Cross from lush Kullu to barren Lahaul on this classic crossover trek, ending at Chandratal Lake.",
    highlights: ["Hampta Pass (14,100 ft)", "Chandratal Lake", "Certified trek leader", "Camping & meals on trek", "Transport from Manali"],
    itinerary: ["Day 1: Manali → Jobra; trek to Chika.", "Day 2: Chika → Balu ka Ghera.", "Day 3: Cross Hampta Pass → Shea Goru.", "Day 4: Drive to Chandratal.", "Day 5: Chandratal → Manali.", "Day 6: Manali departure."],
  }),
  mk({
    id: "p17", slug: "shimla-manali-honeymoon", title: "Shimla Manali Honeymoon Special", route: "Delhi → Shimla → Manali → Delhi",
    category: "Himachal", themes: ["Honeymoon"], days: 7, price: 24500, img: IMG.manali, rating: 4.9,
    summary: "Candle-light dinner, flower-decorated room, private cab and a romantic valley itinerary.",
    highlights: ["Candle-light dinner", "Flower-decorated room", "Private cab for the couple", "Solang snow activities", "Photoshoot stops"],
    itinerary: ["Day 1: Delhi → Shimla.", "Day 2: Kufri & Mall Road.", "Day 3: Shimla → Manali.", "Day 4: Solang & Atal Tunnel.", "Day 5: Old Manali & Naggar.", "Day 6: Kullu → Chandigarh.", "Day 7: Drop."],
  }),
];

export const SEED_BOOKINGS = [
  { id: "GT-1001", type: "Package", packageId: "p2", packageTitle: "Shimla Manali Classic", vehicleId: "crysta", vehicleName: "Toyota Innova Crysta", name: "Rohit Sharma", phone: "9811122233", email: "rohit@example.com", pickup: "Delhi", drop: "", date: "2026-11-12", passengers: 4, notes: "Anniversary trip", amount: 0, status: "Confirmed", createdAt: "2026-10-14T09:30:00.000Z" },
  { id: "GT-1002", type: "Taxi", packageId: "", packageTitle: "", vehicleId: "dzire", vehicleName: "Swift Dzire / Etios / Aura", name: "Anita Verma", phone: "9988776655", email: "", pickup: "Chandigarh Airport", drop: "Shimla", date: "2026-10-25", passengers: 3, notes: "Flight lands 2:30 PM", amount: 0, status: "Pending", createdAt: "2026-10-17T14:10:00.000Z" },
  { id: "GT-1003", type: "Custom", packageId: "", packageTitle: "Custom: Manali, Leh Ladakh (7N)", vehicleId: "crysta", vehicleName: "Toyota Innova Crysta", name: "Karan Malhotra", phone: "9876501234", email: "", pickup: "Delhi", drop: "", date: "2027-06-05", passengers: 6, notes: "Hotel: 4★", amount: 0, status: "Pending", createdAt: "2026-10-18T18:45:00.000Z" },
];

// Indicative estimate for the Custom Package builder (only a single total is shown, never per-car rates).
const CAR_DAY = 2000;
const REGION = { "Leh Ladakh": 1.4, "Spiti Valley": 1.35, Kedarnath: 1.2 };
export function estimateCustom({ places, nights, pax, vehicleId, star, meals }) {
  const v = VEHICLES.find((x) => x.id === vehicleId);
  const s = STARS.find((x) => x.star === Number(star));
  if (!v || !s || !places.length) return 0;
  const region = Math.max(1, ...places.map((p) => REGION[p] || 1));
  const days = nights + 1;
  const car = CAR_DAY * v.factor * days * region;
  const rooms = Math.max(1, Math.ceil(pax / 2));
  const hotel = s.rate * rooms * nights;
  const food = meals ? 650 * pax * days : 0;
  return Math.round((car + hotel + food) / 500) * 500;
}
