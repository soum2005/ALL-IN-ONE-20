"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  MapPin, 
  Train, 
  Bus, 
  Clock, 
  DollarSign, 
  Heart, 
  Share2, 
  Compass, 
  Info,
  Calendar,
  ChevronRight,
  ExternalLink,
  Check,
  Zap,
  Navigation,
  Users,
  Film
} from "lucide-react";
import { motion } from "framer-motion";
import { places, movieHalls, foodItems, Place } from "@/data/kolkataData";
import { durgaPujas } from "@/data/durgaPujaData";
import { upcomingMovies } from "@/data/upcomingMovies";

interface UnifiedItem {
  id: string;
  name: string;
  category: 'places' | 'movies' | 'food' | 'puja';
  type?: 'hall' | 'upcoming';
  description: string;
  nearestMetro: string;
  distanceFromMetro?: string;
  nearestBusStop?: string;
  metroFare?: string;
  busFare?: string;
  autoFare?: string;
  entryFee: string;
  openingTime: string;
  closingTime: string;
  closedDay: string;
  googleMapsUrl: string;
  detailedRoute: string[];
  importantTips?: string[];
  nearbyAttractions?: string[];
  image: string;
  zone?: string;
  extraDetails?: {
    showTimings?: { lang: string; times: string[] }[];
    priceDetails?: string;
    extraTickets?: string;
  };
}

export default function PlaceDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  
  // Combine all database items to search for the requested id
  const allItems: UnifiedItem[] = [
    ...places.map(p => ({
      ...p,
      nearestBusStop: p.nearestBusStop || "Various buses available",
      metroFare: p.metroFare || "₹10 - ₹25",
      busFare: p.busFare || "₹10 - ₹15",
    })),
    ...movieHalls.map(m => ({
      ...m,
      type: 'hall' as const,
      nearestBusStop: m.nearestBusStop || "Hazra / Exide crossing",
      metroFare: m.metroFare || "₹10 - ₹20",
      busFare: m.busFare || "₹10",
    })),
    ...foodItems.map(f => ({
      ...f,
      nearestMetro: f.nearestMetro || "Sealdah / Howrah",
      nearestBusStop: "Taxi / Rickshaw available",
      metroFare: "₹10 - ₹30",
      busFare: "₹15",
      entryFee: f.price || "Varies by order",
      openingTime: "11:00 AM",
      closingTime: "10:30 PM",
      closedDay: "None",
      googleMapsUrl: f.googleMapsUrl || "https://maps.google.com",
      detailedRoute: f.detailedRoute || ["Take train/auto to destination."],
      importantTips: f.importantTips || [],
      nearbyAttractions: []
    })),
    ...durgaPujas.map(p => ({
      id: p.id,
      name: p.name,
      category: 'puja' as const,
      description: p.description,
      nearestMetro: p.nearestMetro,
      distanceFromMetro: "Walkable / Feeder Transit",
      nearestBusStop: p.busRoute,
      metroFare: "₹10 - ₹25",
      busFare: "₹10 - ₹15",
      entryFee: "Free",
      openingTime: "Any time",
      closingTime: "",
      closedDay: "None",
      googleMapsUrl: p.googleMapsUrl,
      detailedRoute: p.detailedRoute,
      importantTips: ["Free Entry for all.", "Extremely crowded during evenings.", "Best visited late at night or early morning to avoid long queues."],
      nearbyAttractions: [],
      image: "",
      zone: p.zone
    })),
    ...upcomingMovies.map(m => ({
      id: m.id,
      name: m.name,
      category: 'movies' as const,
      type: 'upcoming' as const,
      description: m.description,
      nearestMetro: `Language: ${m.language}`,
      distanceFromMetro: "",
      nearestBusStop: `Genre: ${m.genre}`,
      metroFare: "",
      busFare: "",
      entryFee: `Releases: ${m.releaseDate}`,
      openingTime: "",
      closingTime: "",
      closedDay: "None",
      googleMapsUrl: "",
      detailedRoute: [`Cast: ${m.cast.join(", ")}`],
      importantTips: [
        `Language: ${m.language}`,
        `Genre: ${m.genre}`,
        `Release Date: ${m.releaseDate}`,
        `Starring: ${m.cast.join(", ")}`
      ],
      nearbyAttractions: [],
      image: "",
      zone: m.language
    }))
  ];

  const item = allItems.find(x => x.id === resolvedParams.id);

  // Load favorites from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("kolkata_guide_favorites");
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }
  }, []);

  if (!item) {
    return (
      <div className="flex-1 bg-white text-black min-h-screen flex flex-col justify-center items-center p-6 space-y-4">
        <Info className="w-12 h-12 text-[#666666]" />
        <h1 className="text-2xl font-bold">Place Not Found</h1>
        <p className="text-sm text-[#666666] max-w-sm text-center">
          Sorry, we couldn&apos;t find the place or attraction you are looking for in our Kolkata Guide database.
        </p>
        <Link 
          href="/" 
          className="px-6 py-2.5 bg-black text-white text-xs font-semibold rounded-lg hover:bg-black/90 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  const isFavorite = favorites.includes(item.id);

  const toggleFavorite = () => {
    let updated: string[];
    if (isFavorite) {
      updated = favorites.filter(favId => favId !== item.id);
    } else {
      updated = [...favorites, item.id];
    }
    setFavorites(updated);
    localStorage.setItem("kolkata_guide_favorites", JSON.stringify(updated));
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex-1 bg-white text-black min-h-screen flex flex-col font-sans selection:bg-black selection:text-white">
      {/* Top sticky action navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#F5F5F5] px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-xs font-semibold hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-4 h-4 text-black" />
            <span>Back to Guides</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <button
              onClick={toggleFavorite}
              className={`w-9 h-9 border rounded-lg flex items-center justify-center transition-all ${
                isFavorite 
                  ? "bg-black border-black text-white" 
                  : "bg-white border-[#E5E5E5] text-black hover:bg-[#F5F5F5]"
              }`}
              title={isFavorite ? "Remove from Saved" : "Save to Favorites"}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? "fill-white text-white" : "text-black"}`} />
            </button>
            
            <button
              onClick={handleShare}
              className="w-9 h-9 border border-[#E5E5E5] bg-white rounded-lg flex items-center justify-center hover:bg-[#F5F5F5] text-black transition-all relative"
              title="Copy link"
            >
              {copied ? (
                <Check className="w-4 h-4 text-black" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-5xl w-full mx-auto px-6 py-8 flex-1 space-y-10">
        
        {/* Cover & Title */}
        <section className="space-y-4">
          <div className="inline-block bg-[#F5F5F5] text-black px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border border-[#E5E5E5]/50">
            {item.category === "places" 
              ? "📍 Place Details" 
              : item.category === "movies" 
                ? (item.type === "upcoming" ? `🎬 Upcoming • ${item.zone}` : "🎬 Movie Hall") 
                : item.category === "food" 
                  ? "🍽 Food Spot" 
                  : `🪔 Durga Puja • ${item.zone}`}
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-black">
              {item.name}
            </h1>
            <p className="text-base md:text-lg text-[#666666] leading-relaxed max-w-4xl font-light">
              {item.description}
            </p>
          </div>
        </section>

        <hr className="border-[#F5F5F5]" />

        {/* Info Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Quick Details Table */}
          {item.type === "upcoming" ? (
            <div className="md:col-span-1 space-y-6 bg-[#F5F5F5] p-6 rounded-2xl border border-[#E5E5E5]/50">
              <h3 className="font-bold text-sm uppercase tracking-wider text-black flex items-center gap-1.5 border-b border-[#E5E5E5] pb-3">
                <Info className="w-4 h-4" />
                Movie Information
              </h3>
              
              <div className="space-y-4 text-sm">
                <div className="space-y-1">
                  <span className="text-xs text-[#666666] font-semibold block">Language</span>
                  <span className="text-black font-semibold">{item.zone}</span>
                </div>
                
                <div className="space-y-1">
                  <span className="text-xs text-[#666666] font-semibold block">Genre</span>
                  <span className="text-black font-medium">{item.nearestBusStop?.replace("Genre: ", "")}</span>
                </div>
                
                <div className="space-y-1">
                  <span className="text-xs text-[#666666] font-semibold block">Release Date</span>
                  <span className="text-black font-semibold text-xs inline-block px-2.5 py-1 bg-black text-white rounded">
                    {item.entryFee.replace("Releases: ", "")}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="md:col-span-1 space-y-6 bg-[#F5F5F5] p-6 rounded-2xl border border-[#E5E5E5]/50">
              <h3 className="font-bold text-sm uppercase tracking-wider text-black flex items-center gap-1.5 border-b border-[#E5E5E5] pb-3">
                <Info className="w-4 h-4" />
                Visitor Information
              </h3>
              
              <div className="space-y-4 text-sm">
                {/* Timings */}
                <div className="space-y-1">
                  <span className="text-xs text-[#666666] font-semibold block">Opening Hours</span>
                  <span className="text-black font-medium">
                    {item.openingTime}
                    {item.closingTime && ` - ${item.closingTime}`}
                  </span>
                </div>

                {/* Weekly Closed */}
                <div className="space-y-1">
                  <span className="text-xs text-[#666666] font-semibold block">Weekly Closed Day</span>
                  <span className={`inline-block px-2 py-0.5 text-xs font-bold rounded ${
                    item.closedDay !== "None" ? "bg-black text-white" : "bg-[#E5E5E5] text-black"
                  }`}>
                    {item.closedDay === "None" ? "Open Every Day" : item.closedDay}
                  </span>
                </div>

                {/* Entry Fee */}
                <div className="space-y-1">
                  <span className="text-xs text-[#666666] font-semibold block">Entry Fee / Cost</span>
                  <span className="text-black font-semibold">{item.entryFee}</span>
                </div>

                {/* Planetarium special schedules */}
                {item.id === "birla-planetarium" && item.extraDetails?.showTimings && (
                  <div className="pt-2 border-t border-[#E5E5E5] space-y-2">
                    <span className="text-xs text-[#666666] font-semibold block">Show Schedules</span>
                    <div className="space-y-2 text-xs">
                      {item.extraDetails.showTimings.map((show, idx) => (
                        <div key={idx} className="flex justify-between border-b border-[#E5E5E5]/50 pb-1">
                          <span className="font-bold">{show.lang}</span>
                          <span className="text-[#666666]">{show.times.join(", ")}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Transit and Fares OR Synopsis & Cast */}
          {item.type === "upcoming" ? (
            <div className="md:col-span-2 space-y-6">
              <h3 className="font-bold text-sm uppercase tracking-wider text-black flex items-center gap-1.5 border-b border-[#F5F5F5] pb-3">
                <Film className="w-4 h-4" />
                Synopsis & Cast
              </h3>
              
              <div className="space-y-4 text-sm leading-relaxed text-[#666666]">
                <p>{item.description}</p>
              </div>

              {/* Cast members */}
              <div className="space-y-4 pt-4 border-t border-[#F5F5F5]">
                <h4 className="font-bold text-sm text-black flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  Starring Cast
                </h4>
                <div className="flex flex-wrap gap-2">
                  {item.detailedRoute[0]?.replace("Cast: ", "").split(", ").map((actor, idx) => (
                    <span key={idx} className="px-3.5 py-2 bg-white border border-[#E5E5E5] rounded-xl text-xs font-semibold text-black shadow-sm/5">
                      {actor}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="md:col-span-2 space-y-6">
              <h3 className="font-bold text-sm uppercase tracking-wider text-black flex items-center gap-1.5 border-b border-[#F5F5F5] pb-3">
                <Zap className="w-4 h-4" />
                Transit & Fares
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Metro Box */}
                <div className="border border-[#E5E5E5] p-5 rounded-xl space-y-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center">
                      <Train className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-sm">Metro Transit</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#666666]">Nearest Station</span>
                      <span className="font-semibold">{item.nearestMetro}</span>
                    </div>
                    {item.distanceFromMetro && (
                      <div className="flex justify-between">
                        <span className="text-[#666666]">Distance</span>
                        <span className="font-medium">{item.distanceFromMetro}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t border-[#F5F5F5] pt-1 mt-1">
                      <span className="text-[#666666]">Estimated Fare</span>
                      <span className="font-semibold text-black">{item.metroFare || "₹10 - ₹25"}</span>
                    </div>
                  </div>
                </div>

                {/* Bus Box */}
                <div className="border border-[#E5E5E5] p-5 rounded-xl space-y-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#F5F5F5] text-black flex items-center justify-center border border-[#E5E5E5]">
                      <Bus className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-sm">Bus Transit</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#666666]">Nearest Stop</span>
                      <span className="font-semibold text-right max-w-[150px] truncate" title={item.nearestBusStop}>{item.nearestBusStop}</span>
                    </div>
                    <div className="flex justify-between border-t border-[#F5F5F5] pt-1 mt-1">
                      <span className="text-[#666666]">Estimated Fare</span>
                      <span className="font-semibold text-black">{item.busFare || "₹10 - ₹15"}</span>
                    </div>
                  </div>
                </div>

                {/* Auto Rickshaw box (if available) */}
                {item.autoFare && (
                  <div className="sm:col-span-2 border border-[#E5E5E5] p-5 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#F5F5F5] text-black flex items-center justify-center border border-[#E5E5E5] text-xs font-bold">
                        A
                      </div>
                      <div>
                        <span className="font-bold text-sm block">Auto Rickshaw</span>
                        <span className="text-[10px] text-[#666666]">Alternative local feeder transit</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#666666] block">Feeder Fare</span>
                      <span className="font-bold text-sm text-black">{item.autoFare}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Detailed Directions */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-black flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5" />
                  Step-by-Step Directions
                </h4>
                <div className="space-y-3 pl-2">
                  {item.detailedRoute.map((routeStep, index) => (
                    <div key={index} className="flex gap-3 text-xs leading-relaxed text-[#666666]">
                      <span className="w-5 h-5 rounded-full bg-black text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </span>
                      <p className="mt-0.5">{routeStep}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Embedded Map section (only for physical locations) */}
        {item.type !== "upcoming" && (
          <>
            <hr className="border-[#F5F5F5]" />
            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm uppercase tracking-wider text-black flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  Location Map
                </h3>
                <a 
                  href={item.googleMapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold hover:underline"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="aspect-[21/9] w-full bg-[#F5F5F5] rounded-2xl overflow-hidden border border-[#E5E5E5]">
                <iframe
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(item.name + ", Kolkata")}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={item.name}
                ></iframe>
              </div>
            </section>
          </>
        )}

        {/* Tips & Nearby Attractions */}
        {item.type !== "upcoming" && ((item.importantTips && item.importantTips.length > 0) || (item.nearbyAttractions && item.nearbyAttractions.length > 0)) ? (
          <>
            <hr className="border-[#F5F5F5]" />
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Important Tips */}
              {item.importantTips && item.importantTips.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-bold text-sm uppercase tracking-wider text-black flex items-center gap-1.5">
                    <Compass className="w-4 h-4" />
                    Important Tips
                  </h3>
                  <ul className="space-y-2 text-xs text-[#666666] leading-relaxed list-disc pl-4">
                    {item.importantTips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Nearby Attractions */}
              {item.nearbyAttractions && item.nearbyAttractions.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-bold text-sm uppercase tracking-wider text-black flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    Nearby Attractions
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.nearbyAttractions.map((attraction, idx) => {
                      // Attempt to find id for dynamic links
                      const matchedItem = allItems.find(x => x.name.toLowerCase().includes(attraction.toLowerCase()) || attraction.toLowerCase().includes(x.name.toLowerCase()));
                      if (matchedItem) {
                        return (
                          <Link 
                            key={idx} 
                            href={`/place/${matchedItem.id}`}
                            className="inline-flex items-center gap-1 px-3 py-2 bg-[#F5F5F5] hover:bg-black hover:text-white rounded-lg text-xs font-semibold border border-transparent transition-all"
                          >
                            <span>{attraction}</span>
                            <ChevronRight className="w-3 h-3" />
                          </Link>
                        );
                      }
                      return (
                        <span 
                          key={idx} 
                          className="px-3 py-2 bg-[#F5F5F5] rounded-lg text-xs font-semibold border border-[#E5E5E5]/30"
                        >
                          {attraction}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </section>
          </>
        ) : null}

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#F5F5F5] py-8 px-6 mt-12">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#666666]">
          <div className="font-semibold text-black">Kolkata Guide</div>
          <div>&copy; {new Date().getFullYear()} Kolkata Guide. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
