"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Search, 
  MapPin, 
  Train, 
  Bus,  
  Clock, 
  DollarSign, 
  Heart, 
  Share2, 
  ArrowRight, 
  Info,
  Calendar,
  Compass,
  Film,
  Utensils,
  Sparkles,
  ExternalLink,
  Check,
  ShoppingBag,
  Lock,
  Plus,
  Trash2,
  CheckCircle,
  Circle,
  Bell,
  BellOff,
  User,
  Home as HomeIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { places, movieHalls, foodItems, Place, FoodItem } from "@/data/kolkataData";
import { durgaPujas } from "@/data/durgaPujaData";
import { upcomingMovies, UpcomingMovie } from "@/data/upcomingMovies";

// Define a unified interface for display in the grid
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
  menuItems?: { item: string; price: string }[];
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>(" ");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState<string>("all");
  const [selectedFoodSub, setSelectedFoodSub] = useState<string>("all");
  const [selectedMetroStation, setSelectedMetroStation] = useState<string>("all");

  const metroStations = React.useMemo(() => {
    const stations = new Set<string>();
    durgaPujas.forEach(p => {
      p.nearestMetro.split("/").forEach(part => {
        let clean = part.trim()
          .replace(/sutanuti/gi, "")
          .replace(/metro/gi, "")
          .replace(/station/gi, "")
          .trim();
        if (clean && clean !== "None" && clean !== "Kalyani Luminous" && clean !== "Kalyani") {
          stations.add(clean);
        }
      });
    });
    return ["All Stations", ...Array.from(stations).sort(), "Kalyani"];
  }, []);
  
  // --- Secure Client-Side Auth State ---
  const [currentUser, setCurrentUser] = useState<{ email: string; username: string; isAdmin?: boolean } | null>(null);
  const [authModal, setAuthModal] = useState<"login" | "signup" | null>(null);
  const [authEmail, setAuthEmail] = useState<string>("");
  const [authPassword, setAuthPassword] = useState<string>("");
  const [authUsername, setAuthUsername] = useState<string>("");
  const [authError, setAuthError] = useState<string | null>(null);

  // --- Admin Panel State ---
  const [adminUsers, setAdminUsers] = useState<any[]>([]);
  const [adminSearch, setAdminSearch] = useState<string>("");

  // --- Goals Tracker State ---
  interface UserGoal {
    id: string;
    title: string;
    description: string;
    targetDate: string;
    category: string;
    completed: boolean;
    createdAt: string;
  }
  const [goals, setGoals] = useState<UserGoal[]>([]);
  const [newGoalTitle, setNewGoalTitle] = useState<string>("");
  const [newGoalDesc, setNewGoalDesc] = useState<string>("");
  const [newGoalDate, setNewGoalDate] = useState<string>("");
  const [newGoalCategory, setNewGoalCategory] = useState<string>("Travel");

  // --- Upcoming Movies Alerts State ---
  const [movieAlerts, setMovieAlerts] = useState<string[]>([]);
  const [movieLangFilter, setMovieLangFilter] = useState<string>("All");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // --- Near Me Location State ---
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [loadingLocation, setLoadingLocation] = useState<boolean>(false);

  // Check active session on mount
  useEffect(() => {
    const session = localStorage.getItem("kolkata_guide_session");
    if (session) {
      const users = JSON.parse(localStorage.getItem("kolkata_guide_users") || "[]");
      const found = users.find((u: any) => u.email.toLowerCase() === session.toLowerCase());
      if (found) {
        setCurrentUser({ 
          email: found.email, 
          username: found.username, 
          isAdmin: found.isAdmin || found.email.toLowerCase() === "epsitamaity629@gmail.com" || found.email.toLowerCase() === "soumyasaha205@gmail.com" 
        });
      }
    }
  }, []);

  // Load and save goals per user
  useEffect(() => {
    if (currentUser) {
      const savedGoals = localStorage.getItem(`kolkata_guide_goals_${currentUser.email}`);
      setGoals(savedGoals ? JSON.parse(savedGoals) : []);
      
      const savedAlerts = localStorage.getItem(`kolkata_guide_movie_alerts_${currentUser.email}`);
      setMovieAlerts(savedAlerts ? JSON.parse(savedAlerts) : []);
    } else {
      setGoals([]);
      setMovieAlerts([]);
    }
  }, [currentUser]);

  const saveGoalsToStorage = (updatedGoals: UserGoal[]) => {
    setGoals(updatedGoals);
    if (currentUser) {
      localStorage.setItem(`kolkata_guide_goals_${currentUser.email}`, JSON.stringify(updatedGoals));
    }
  };

  const saveAlertsToStorage = (updatedAlerts: string[]) => {
    setMovieAlerts(updatedAlerts);
    if (currentUser) {
      localStorage.setItem(`kolkata_guide_movie_alerts_${currentUser.email}`, JSON.stringify(updatedAlerts));
    }
  };

  // Auth Handlers
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (!authEmail || !authPassword) {
      setAuthError("Please fill in all fields.");
      return;
    }
    const users = JSON.parse(localStorage.getItem("kolkata_guide_users") || "[]");
    const found = users.find((u: any) => u.email.toLowerCase() === authEmail.toLowerCase() && u.password === authPassword);
    if (found) {
      const isAdmin = found.isAdmin || found.email.toLowerCase() === "epsitamaity629@gmail.com" || found.email.toLowerCase() === "soumyasaha205@gmail.com";
      localStorage.setItem("kolkata_guide_session", found.email);
      setCurrentUser({ email: found.email, username: found.username, isAdmin });
      setAuthModal(null);
      resetAuthFields();
      showToast(`Welcome back, ${found.username}!`);
    } else {
      setAuthError("Invalid email or password.");
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (!authEmail || !authPassword || !authUsername) {
      setAuthError("Please fill in all fields.");
      return;
    }
    if (authPassword.length < 6) {
      setAuthError("Password must be at least 6 characters.");
      return;
    }
    const users = JSON.parse(localStorage.getItem("kolkata_guide_users") || "[]");
    const exists = users.some((u: any) => u.email.toLowerCase() === authEmail.toLowerCase());
    if (exists) {
      setAuthError("Email is already registered.");
      return;
    }
    const isAdmin = authEmail.toLowerCase() === "epsitamaity629@gmail.com" || authEmail.toLowerCase() === "soumyasaha205@gmail.com";
    const newUser = { 
      email: authEmail, 
      password: authPassword, 
      username: authUsername,
      id: Math.random().toString(36).substr(2, 9),
      isAdmin,
      totalUsageTime: 0
    };
    users.push(newUser);
    localStorage.setItem("kolkata_guide_users", JSON.stringify(users));
    localStorage.setItem("kolkata_guide_session", authEmail);
    setCurrentUser({ email: authEmail, username: authUsername, isAdmin });
    setAuthModal(null);
    resetAuthFields();
    showToast(`Account created! Welcome, ${authUsername}.`);
  };

  const handleLogout = () => {
    localStorage.removeItem("kolkata_guide_session");
    showToast(`Goodbye, ${currentUser?.username}!`);
    setCurrentUser(null);
    if (activeTab === "goals" || activeTab === "admin") {
      setActiveTab("all");
    }
  };

  const resetAuthFields = () => {
    setAuthEmail("");
    setAuthPassword("");
    setAuthUsername("");
    setAuthError(null);
  };

  // Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Track active usage time for the logged-in user
  useEffect(() => {
    if (!currentUser) return;
    const interval = setInterval(() => {
      const users = JSON.parse(localStorage.getItem("kolkata_guide_users") || "[]");
      const updated = users.map((u: any) => {
        if (u.email.toLowerCase() === currentUser.email.toLowerCase()) {
          const newTime = (u.totalUsageTime || 0) + 2;
          return { ...u, totalUsageTime: newTime };
        }
        return u;
      });
      localStorage.setItem("kolkata_guide_users", JSON.stringify(updated));
      if (activeTab === "admin") {
        setAdminUsers(updated);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [currentUser, activeTab]);

  // Load registered users list for Admin panel
  useEffect(() => {
    if (activeTab === "admin") {
      const users = JSON.parse(localStorage.getItem("kolkata_guide_users") || "[]");
      setAdminUsers(users);
    }
  }, [activeTab]);

  const formatDuration = (seconds: number) => {
    if (!seconds) return "0s";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    let parts = [];
    if (hrs > 0) parts.push(`${hrs}h`);
    if (mins > 0) parts.push(`${mins}m`);
    if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);
    return parts.join(" ");
  };

  const handleDeleteUser = (email: string) => {
    if (email.toLowerCase() === currentUser?.email.toLowerCase()) {
      showToast("You cannot delete your own admin account!");
      return;
    }
    const users = JSON.parse(localStorage.getItem("kolkata_guide_users") || "[]");
    const updated = users.filter((u: any) => u.email.toLowerCase() !== email.toLowerCase());
    localStorage.setItem("kolkata_guide_users", JSON.stringify(updated));
    setAdminUsers(updated);
    showToast(`User ${email} deleted successfully.`);
  };

  // Goals Handlers
  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalTitle.trim() || !newGoalDate) return;
    const newGoal: UserGoal = {
      id: Math.random().toString(36).substr(2, 9),
      title: newGoalTitle,
      description: newGoalDesc,
      targetDate: newGoalDate,
      category: newGoalCategory,
      completed: false,
      createdAt: new Date().toISOString().split('T')[0]
    };
    saveGoalsToStorage([...goals, newGoal]);
    setNewGoalTitle("");
    setNewGoalDesc("");
    setNewGoalDate("");
  };

  const toggleGoalComplete = (id: string) => {
    const updated = goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g);
    saveGoalsToStorage(updated);
  };

  const handleDeleteGoal = (id: string) => {
    const updated = goals.filter(g => g.id !== id);
    saveGoalsToStorage(updated);
  };

  // Movie Alert Handlers
  const toggleMovieAlert = (movieId: string, movieName: string) => {
    if (!currentUser) {
      setAuthModal("login");
      return;
    }
    let updated: string[];
    if (movieAlerts.includes(movieId)) {
      updated = movieAlerts.filter(id => id !== movieId);
      showToast(`Removed alert for ${movieName}.`);
    } else {
      updated = [...movieAlerts, movieId];
      // Request browser notification permission
      if (typeof window !== "undefined" && "Notification" in window) {
        Notification.requestPermission();
      }
      showToast(`Reminder set for ${movieName}!`);
    }
    saveAlertsToStorage(updated);
  };

  const simulateMovieNotification = (movieName: string) => {
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
      new Notification("🎬 Movie Release Alert!", {
        body: `"${movieName}" has released today! Get your tickets now. 🍿`,
        icon: "/favicon.ico"
      });
    } else {
      // Fallback in-app alert
      alert(`🔔 [Notification Simulation]\n"${movieName}" is now playing in theaters! 🍿`);
    }
  };
  const requestLocation = () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }
    setLoadingLocation(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoadingLocation(false);
      },
      (error) => {
        let msg = "Failed to retrieve location.";
        if (error.code === error.PERMISSION_DENIED) {
          msg = "Location permission denied. Please allow access in browser settings.";
        }
        setLocationError(msg);
        setLoadingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Filters state
  const [filters, setFilters] = useState({
    free: false,
    paid: false,
    mondayClosed: false,
    openToday: false,
    metroNearby: false,
    familyFriendly: false,
    budgetFriendly: false
  });

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

  // Standardize the search query on first render to empty string
  useEffect(() => {
    setSearchQuery("");
  }, []);

  // Save favorites to local storage when updated
  const toggleFavorite = (id: string) => {
    let updated: string[];
    if (favorites.includes(id)) {
      updated = favorites.filter(favId => favId !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem("kolkata_guide_favorites", JSON.stringify(updated));
  };

  const handleShare = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/place/${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  // Convert everything into a unified array for searching/filtering
  const unifiedItems: UnifiedItem[] = [
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

  // Run searches & filters
  const filteredItems = unifiedItems.filter(item => {
    // 1. Category Tab Filter
    if (activeTab === "places" && item.category !== "places") return false;
    if (activeTab === "movies" && (item.category !== "movies" || item.type === "upcoming")) return false;
    if (activeTab === "food" && item.category !== "food") return false;
    if (activeTab === "puja" && item.category !== "puja") return false;
    if (activeTab === "favorites" && !favorites.includes(item.id)) return false;

    // Exclude upcoming from "all" guides view by default (so it doesn't clutter) unless there is a search query
    if (activeTab === "all" && item.type === "upcoming" && searchQuery.trim() === "") return false;

    // 2. Zone Filter (Durga Pujas only)
    if (activeTab === "puja" && selectedZone !== "all") {
      const z = selectedZone.toLowerCase();
      const itemZone = item.zone?.toLowerCase() || "";
      if (z === "north" && !itemZone.includes("north")) return false;
      if (z === "south" && !itemZone.includes("south")) return false;
      if (z === "east" && !itemZone.includes("east")) return false;
      if (z === "west" && !itemZone.includes("west") && !itemZone.includes("behala")) return false;
      if (z === "kalyani" && !itemZone.includes("kalyani")) return false;
    }

    // Food Sub-category Filter
    if (activeTab === "food" && selectedFoodSub !== "all") {
      if (selectedFoodSub === "kochuri" && !isKochuriItem(item)) return false;
      if (selectedFoodSub === "momo" && !isMomoItem(item)) return false;
      if (selectedFoodSub === "fishfry" && !isFishFryItem(item)) return false;
      if (selectedFoodSub === "restaurant" && !isRestaurantItem(item)) return false;
      if (selectedFoodSub === "biryani" && !isBiryaniItem(item)) return false;
    }

    // Durga Puja Metro Station Filter
    if (activeTab === "puja" && selectedMetroStation !== "all") {
      const station = selectedMetroStation.toLowerCase();
      const metroField = item.nearestMetro.toLowerCase();
      let matched = false;
      if (station === "mg road") {
        matched = metroField.includes("mahatma gandhi") || metroField.includes("mg road");
      } else if (station === "dum dum") {
        matched = metroField.includes("dum dum") || metroField.includes("noapara");
      } else {
        matched = metroField.includes(station);
      }
      if (!matched) return false;
    }

    // 2. Search Query Filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.nearestMetro.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.nearestBusStop && item.nearestBusStop.toLowerCase().includes(q));
      if (!matchesSearch) return false;
    }

    // 3. Dynamic Filter Pills
    if (filters.free) {
      const fee = item.entryFee.toLowerCase();
      if (!fee.includes("free") && !fee.includes("₹0")) return false;
    }
    if (filters.paid) {
      const fee = item.entryFee.toLowerCase();
      if (fee.includes("free") || fee.includes("₹0")) return false;
    }
    if (filters.mondayClosed) {
      if (item.closedDay.toLowerCase() !== "monday") return false;
    }
    if (filters.openToday) {
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const todayName = days[new Date().getDay()];
      if (item.closedDay.toLowerCase() === todayName.toLowerCase()) return false;
    }
    if (filters.metroNearby) {
      // If it lists walkable distance or distance under 500m
      const distance = item.distanceFromMetro || "";
      const isClose = distance.includes("m") && !distance.includes("km") && parseInt(distance) <= 500;
      const isShortWalk = distance.includes("mins walk") && parseInt(distance) <= 7;
      if (!isClose && !isShortWalk && !distance.includes("Immediate")) return false;
    }
    if (filters.familyFriendly) {
      // Classify family friendly based on tags, descriptions, or specific attractions
      const nonFamilyKeywords = ["bar", "pub", "cemetery", "jail"];
      const nameLower = item.name.toLowerCase();
      const isNonFamily = nonFamilyKeywords.some(kw => nameLower.includes(kw) || item.description.toLowerCase().includes(kw));
      if (isNonFamily && item.id !== "alipore-jail-museum") return false; // Alipore Jail Museum is educational family friendly
    }
    if (filters.budgetFriendly) {
      const fee = item.entryFee.toLowerCase();
      const isFree = fee.includes("free");
      // Extract first number from entry fee
      const match = fee.match(/₹?(\d+)/);
      const feeNum = match ? parseInt(match[1]) : 0;
      if (!isFree && feeNum > 100) return false;
    }

    return true;
  });

  const toggleFilter = (key: keyof typeof filters) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isKochuriItem = (item: UnifiedItem) => {
    return item.category === "food" && [
      "chinese-paratha",
      "putiram-sweets",
      "adi-haridas-modak",
      "nandalal-ghosh-sons",
      "potlar-kochuri",
      "mitra-cafe-sovabazar",
      "tewari-brothers-barabazar",
      "jagannath-sweets-sealdah",
      "mouchak-jadavpur"
    ].includes(item.id);
  };

  const isMomoItem = (item: UnifiedItem) => {
    return item.category === "food" && [
      "hungry-hub",
      "tibetan-delight-elgin",
      "momo-i-am-lake-gardens"
    ].includes(item.id);
  };

  const isFishFryItem = (item: UnifiedItem) => {
    return item.category === "food" && [
      "chitto-babur-dokan",
      "kalika-fry-college-street",
      "allen-kitchen-sovabazar"
    ].includes(item.id);
  };

  const isBiryaniItem = (item: UnifiedItem) => {
    return item.category === "food" && [
      "ujjwal-biryani",
      "dada-boudi",
      "d-bapi",
      "bedwin-jadavpur"
    ].includes(item.id);
  };

  const isRestaurantItem = (item: UnifiedItem) => {
    return item.category === "food" && 
      !isKochuriItem(item) && 
      !isMomoItem(item) && 
      !isFishFryItem(item) &&
      !isBiryaniItem(item);
  };

  const renderCard = (item: UnifiedItem) => (
    <motion.div
      layout
      key={item.id}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="group bg-white border border-[#E5E5E5] rounded-2xl overflow-hidden hover:shadow-lg transition-all flex flex-col h-full"
    >
      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-4">
          {/* Category Badge & Favorite Button */}
          <div className="flex justify-between items-center">
            <span className="bg-[#F5F5F5] text-black px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-[#E5E5E5]/50">
              {item.category === "places" 
                ? "📍 Place" 
                : item.category === "movies" 
                  ? (item.type === "upcoming" ? `🎬 Upcoming • ${item.zone}` : "🎬 Movie Hall") 
                  : item.category === "food" 
                    ? "🍽 Food" 
                    : `🪔 Puja • ${item.zone}`}
            </span>
            <button
              onClick={() => toggleFavorite(item.id)}
              className="w-8 h-8 bg-[#F5F5F5] rounded-full flex items-center justify-center border border-[#E5E5E5]/50 hover:bg-[#E5E5E5] transition-all text-black"
              aria-label="Toggle Favorite"
            >
              <Heart className={`w-4 h-4 ${favorites.includes(item.id) ? "fill-black text-black" : "text-[#666666]"}`} />
            </button>
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-bold tracking-tight text-black group-hover:underline decoration-1 underline-offset-2">
              {item.name}
            </h3>
            <p className="text-xs text-[#666666] line-clamp-3 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>

        {/* Metadata Rows */}
        <div className="space-y-2 pt-2 border-t border-[#F5F5F5] text-xs">
          {/* Metro */}
          <div className="flex items-start gap-2.5">
            <Train className="w-3.5 h-3.5 text-black mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-semibold text-black">Metro: </span>
              <span className="text-[#666666]">{item.nearestMetro}</span>
              {item.distanceFromMetro && (
                <span className="text-[10px] bg-[#F5F5F5] text-black px-1.5 py-0.5 rounded-full ml-1.5 font-medium whitespace-nowrap">
                  {item.distanceFromMetro}
                </span>
              )}
            </div>
          </div>

          {/* Bus */}
          {item.nearestBusStop && (
            <div className="flex items-start gap-2.5">
              <Bus className="w-3.5 h-3.5 text-black mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold text-black">Bus: </span>
                <span className="text-[#666666]">{item.nearestBusStop}</span>
              </div>
            </div>
          )}

          {/* Fee */}
          <div className="flex items-start gap-2.5">
            <DollarSign className="w-3.5 h-3.5 text-black mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-semibold text-black">Entry/Price: </span>
              <span className="text-[#666666]">{item.entryFee}</span>
            </div>
          </div>

          {/* Timings & Closed */}
          <div className="flex items-start gap-2.5">
            <Clock className="w-3.5 h-3.5 text-black mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-semibold text-black">Hours: </span>
              <span className="text-[#666666]">
                {item.openingTime}
                {item.closingTime && ` - ${item.closingTime}`}
              </span>
              {item.closedDay !== "None" && (
                <span className="text-[10px] bg-black text-white px-1.5 py-0.5 rounded ml-1.5 font-bold uppercase">
                  {item.closedDay} Closed
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Link 
            href={`/place/${item.id}`} 
            className="flex-1 bg-black text-white text-xs font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-1.5 hover:bg-black/90 active:scale-98 transition-all"
          >
            <span>Route Details</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
          
          <button
            onClick={(e) => handleShare(item.id, e)}
            className="w-10 h-10 border border-[#E5E5E5] rounded-lg flex items-center justify-center hover:bg-[#F5F5F5] text-black transition-all flex-shrink-0 relative"
            title="Share"
          >
            {copiedId === item.id ? (
              <Check className="w-4 h-4 text-black" />
            ) : (
              <Share2 className="w-4 h-4" />
            )}
          </button>

          <a
            href={item.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 border border-[#E5E5E5] rounded-lg flex items-center justify-center hover:bg-[#F5F5F5] text-black transition-all flex-shrink-0"
            title="Google Maps"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );



  return (
    <div className="flex-1 bg-white text-black min-h-screen flex flex-col font-sans selection:bg-black selection:text-white">
      {/* Navigation Bar */}
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#F5F5F5] px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity flex-shrink-0">
            <span className="bg-black text-white px-2 py-0.5 rounded text-base">K</span>
            <span>Kolkata Guide</span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {/* Explore Group */}
            <div className="flex items-center gap-5 border-r border-[#E5E5E5] pr-6">
              <span className="text-[10px] text-[#888888] uppercase tracking-wider font-bold">Explore</span>
              <button 
                onClick={() => { setActiveTab("all"); setSearchQuery(""); }}
                className={`hover:text-black transition-colors ${["all", "places", "movies", "food", "puja", "near-me"].includes(activeTab) ? "text-black font-semibold" : "text-[#666666]"}`}
              >
                Guides
              </button>
            </div>

            {/* Workspace Group */}
            <div className="flex items-center gap-5">
              <span className="text-[10px] text-[#888888] uppercase tracking-wider font-bold">Workspace</span>
              <button 
                onClick={() => {
                  if (!currentUser) {
                    setAuthModal("login");
                  } else {
                    setActiveTab("goals");
                  }
                }}
                className={`hover:text-black transition-colors ${activeTab === "goals" ? "text-black font-semibold" : "text-[#666666]"}`}
              >
                Goal Tracker
              </button>
              <button 
                onClick={() => { setActiveTab("upcoming-movies"); }}
                className={`hover:text-black transition-colors ${activeTab === "upcoming-movies" ? "text-black font-semibold" : "text-[#666666]"}`}
              >
                Upcoming Movies
              </button>
              {currentUser?.isAdmin && (
                <button 
                  onClick={() => { setActiveTab("admin"); }}
                  className={`hover:text-black transition-colors ${activeTab === "admin" ? "text-black font-semibold text-red-600" : "text-red-500 font-medium"}`}
                >
                  Admin Panel
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button 
              onClick={() => setActiveTab(activeTab === "favorites" ? "all" : "favorites")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                activeTab === "favorites" 
                  ? "bg-black text-white border-black" 
                  : "bg-white text-black border-[#E5E5E5] hover:bg-[#F5F5F5]"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${activeTab === "favorites" ? "fill-white text-white" : "text-black"}`} />
              <span className="hidden sm:inline">Saved ({favorites.length})</span>
            </button>

            {currentUser ? (
              <div className="flex items-center gap-2 border-l border-[#E5E5E5] pl-3">
                <span className="text-xs font-semibold text-black max-w-[100px] truncate" title={currentUser.username}>
                  👤 {currentUser.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-xs text-red-600 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => { resetAuthFields(); setAuthModal("login"); }}
                className="bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-black/90 active:scale-98 transition-all flex items-center gap-1"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="px-6 py-16 md:py-24 bg-white border-b border-[#F5F5F5]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Explore Kolkata Easily.
            </h1>
            <p className="text-lg md:text-xl text-[#666666] max-w-2xl mx-auto font-light leading-relaxed">
              Find tourist places, movie halls, metro stations, buses, ticket prices, timings and Google Maps directions in one place.
            </p>
          </motion.div>

          {/* Large Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative max-w-2xl mx-auto shadow-sm rounded-full border border-[#E5E5E5] bg-white focus-within:ring-2 focus-within:ring-black focus-within:border-black transition-all p-1"
          >
            <div className="flex items-center pl-4 pr-2 py-2">
              <Search className="w-5 h-5 text-[#666666] mr-3 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search by place name, metro station, category, food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm outline-none bg-transparent text-black"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-[#666666] hover:text-black mr-2 px-1"
                >
                  Clear
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </header>

      {/* Categories Horizontal Tabs (Explore only) */}
      {["all", "places", "movies", "food", "puja", "near-me"].includes(activeTab) && (
        <section className="px-6 py-8 border-b border-[#F5F5F5] bg-white sticky top-[64px] z-40 shadow-sm/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-nowrap overflow-x-auto gap-3 pb-2 scrollbar-none">
              <button
                onClick={() => { setActiveTab("all"); setSelectedFoodSub("all"); setSelectedMetroStation("all"); setSelectedZone("all"); }}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === "all" ? "bg-black text-white border-black" : "bg-[#F5F5F5] text-black border-transparent hover:bg-[#E5E5E5]"
                }`}
              >
                <HomeIcon className="w-4 h-4" />
                Home
              </button>
              <button
                onClick={() => { setActiveTab("food"); setSelectedFoodSub("all"); setSelectedMetroStation("all"); setSelectedZone("all"); }}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === "food" ? "bg-black text-white border-black" : "bg-[#F5F5F5] text-black border-transparent hover:bg-[#E5E5E5]"
                }`}
              >
                <Utensils className="w-4 h-4" />
                Food
              </button>
              <button
                onClick={() => { setActiveTab("puja"); setSelectedFoodSub("all"); setSelectedMetroStation("all"); setSelectedZone("all"); }}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === "puja" ? "bg-black text-white border-black" : "bg-[#F5F5F5] text-black border-transparent hover:bg-[#E5E5E5]"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                Durga Puja
              </button>
              <button
                onClick={() => { setActiveTab("places"); setSelectedFoodSub("all"); setSelectedMetroStation("all"); setSelectedZone("all"); }}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === "places" ? "bg-black text-white border-black" : "bg-[#F5F5F5] text-black border-transparent hover:bg-[#E5E5E5]"
                }`}
              >
                <MapPin className="w-4 h-4" />
                Tourist Spots
              </button>
              <button
                onClick={() => { setActiveTab("movies"); setSelectedFoodSub("all"); setSelectedMetroStation("all"); setSelectedZone("all"); }}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === "movies" ? "bg-black text-white border-black" : "bg-[#F5F5F5] text-black border-transparent hover:bg-[#E5E5E5]"
                }`}
              >
                <Film className="w-4 h-4" />
                Movie Halls
              </button>
              <button
                onClick={() => { setActiveTab("near-me"); setSelectedFoodSub("all"); setSelectedMetroStation("all"); setSelectedZone("all"); }}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === "near-me" ? "bg-black text-white border-black" : "bg-[#F5F5F5] text-black border-transparent hover:bg-[#E5E5E5]"
                }`}
              >
                <Compass className="w-4 h-4" />
                Near Me
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10">
        {activeTab === "near-me" ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-[#F5F5F5] rounded-2xl p-8 border border-[#E5E5E5]/50 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                  <span>📍</span> Near Me Services
                </h2>
                <p className="text-sm text-[#666666] max-w-xl">
                  Find nearest amenities based on your real-time GPS location. Location is processed strictly in your browser.
                </p>
                {coords && (
                  <p className="text-xs font-mono text-[#888888] bg-white border border-[#E5E5E5] px-3 py-1 rounded-md inline-block">
                    GPS Coordinates: {coords.latitude.toFixed(5)}, {coords.longitude.toFixed(5)}
                  </p>
                )}
              </div>
              <button
                onClick={requestLocation}
                disabled={loadingLocation}
                className="px-6 py-3 bg-black text-white text-sm font-semibold rounded-xl hover:bg-black/90 active:scale-98 transition-all flex items-center gap-2 flex-shrink-0 disabled:opacity-50"
              >
                {loadingLocation ? (
                  <>
                    <span className="animate-spin mr-1">🔄</span> Locating...
                  </>
                ) : coords ? (
                  "Update Location"
                ) : (
                  "Share Location"
                )}
              </button>
            </div>

            {locationError && (
              <div className="bg-red-50 text-red-600 border border-red-100 rounded-xl p-4 text-sm font-medium">
                ⚠️ {locationError}
              </div>
            )}

            {!coords && !loadingLocation && (
              <div className="py-20 text-center border border-dashed border-[#E5E5E5] rounded-2xl max-w-md mx-auto space-y-4">
                <MapPin className="w-10 h-10 text-[#666666] mx-auto animate-bounce" />
                <h3 className="text-lg font-semibold">Location Access Required</h3>
                <p className="text-sm text-[#666666]">
                  Click the button above to authorize location permissions so we can calculate search links close to you.
                </p>
              </div>
            )}

            {coords && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Hospital */}
                <div className="bg-white border border-[#E5E5E5] rounded-2xl p-6 hover:shadow-lg transition-all flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-2xl">🏥</span>
                    <h3 className="text-lg font-bold tracking-tight">Hospitals & Clinics</h3>
                    <p className="text-xs text-[#666666]">
                      Search nearby emergency medical services, pharmacies, and general clinics around you.
                    </p>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/hospital/@${coords.latitude},${coords.longitude},15z`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-black text-white text-xs font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-1.5 hover:bg-black/90 active:scale-98 transition-all"
                  >
                    <span>Find Hospitals</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Restaurants */}
                <div className="bg-white border border-[#E5E5E5] rounded-2xl p-6 hover:shadow-lg transition-all flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-2xl">🍽️</span>
                    <h3 className="text-lg font-bold tracking-tight">Restaurants & Cafes</h3>
                    <p className="text-xs text-[#666666]">
                      Find top-rated local dining spots, street food, and cafes for a quick bite or dine-in.
                    </p>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/restaurant/@${coords.latitude},${coords.longitude},15z`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-black text-white text-xs font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-1.5 hover:bg-black/90 active:scale-98 transition-all"
                  >
                    <span>Find Restaurants</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Shopping Malls */}
                <div className="bg-white border border-[#E5E5E5] rounded-2xl p-6 hover:shadow-lg transition-all flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-2xl">🛍️</span>
                    <h3 className="text-lg font-bold tracking-tight">Shopping Malls</h3>
                    <p className="text-xs text-[#666666]">
                      Discover nearby malls, retail outlets, and shopping complexes for your clothing or grocery needs.
                    </p>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/shopping+mall/@${coords.latitude},${coords.longitude},15z`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-black text-white text-xs font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-1.5 hover:bg-black/90 active:scale-98 transition-all"
                  >
                    <span>Find Shopping Malls</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Police Station */}
                <div className="bg-white border border-[#E5E5E5] rounded-2xl p-6 hover:shadow-lg transition-all flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-2xl">👮</span>
                    <h3 className="text-lg font-bold tracking-tight">Police Stations</h3>
                    <p className="text-xs text-[#666666]">
                      Locate nearest local law enforcement outposts and police stations for emergencies or queries.
                    </p>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/police+station/@${coords.latitude},${coords.longitude},15z`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-black text-white text-xs font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-1.5 hover:bg-black/90 active:scale-98 transition-all"
                  >
                    <span>Find Police Stations</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Durga Puja */}
                <div className="bg-white border border-[#E5E5E5] rounded-2xl p-6 hover:shadow-lg transition-all flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-2xl">🪔</span>
                    <h3 className="text-lg font-bold tracking-tight">Durga Puja Pandals</h3>
                    <p className="text-xs text-[#666666]">
                      Search nearby Durga Puja pandals and decorations during the festive season.
                    </p>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/durga+puja+pandal/@${coords.latitude},${coords.longitude},15z`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-black text-white text-xs font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-1.5 hover:bg-black/90 active:scale-98 transition-all"
                  >
                    <span>Find Puja Pandals</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        ) : activeTab === "goals" ? (
          // --- Goals Tracker Section ---
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {!currentUser ? (
              <div className="max-w-md mx-auto py-20 text-center space-y-6">
                <div className="w-20 h-20 bg-[#F5F5F5] rounded-full flex items-center justify-center mx-auto text-black text-2xl font-bold">
                  🔒
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-bold">Authentication Required</h2>
                  <p className="text-sm text-[#666666]">
                    Please log in to your account to set personal goals, track your progress, and manage your lists.
                  </p>
                </div>
                <button
                  onClick={() => setAuthModal("login")}
                  className="px-5 py-2.5 bg-black text-white text-xs font-semibold rounded-lg hover:bg-black/90 transition-colors"
                >
                  Sign In Now
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Header Stats */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#F5F5F5] rounded-2xl p-6 border border-[#E5E5E5]/50">
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold tracking-tight">🎯 Goal Achievement Tracker</h2>
                    <p className="text-xs text-[#666666]">Plan and track goals to explore the city or achieve personal targets.</p>
                  </div>
                  
                  {/* Progress Indicator */}
                  {goals.length > 0 && (
                    <div className="w-full md:w-64 space-y-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span>Progress</span>
                        <span>
                          {goals.filter(g => g.completed).length} / {goals.length} ({Math.round((goals.filter(g => g.completed).length / goals.length) * 100)}%)
                        </span>
                      </div>
                      <div className="w-full bg-[#E5E5E5] h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-black h-full transition-all duration-300"
                          style={{ width: `${(goals.filter(g => g.completed).length / goals.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Add Goal Form */}
                <form onSubmit={handleAddGoal} className="bg-white border border-[#E5E5E5] rounded-2xl p-6 space-y-4">
                  <h3 className="text-sm font-bold text-black uppercase tracking-wider">Set a New Goal</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-[#666666] uppercase">Goal Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Visit 10 Durga Pujas"
                        value={newGoalTitle}
                        onChange={(e) => setNewGoalTitle(e.target.value)}
                        className="w-full text-xs border border-[#E5E5E5] rounded-lg px-3 py-2 focus:outline-none focus:border-black"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-[#666666] uppercase">Description</label>
                      <input
                        type="text"
                        placeholder="e.g. Travel around with family"
                        value={newGoalDesc}
                        onChange={(e) => setNewGoalDesc(e.target.value)}
                        className="w-full text-xs border border-[#E5E5E5] rounded-lg px-3 py-2 focus:outline-none focus:border-black"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-[#666666] uppercase">Target Date</label>
                      <input
                        type="date"
                        value={newGoalDate}
                        onChange={(e) => setNewGoalDate(e.target.value)}
                        className="w-full text-xs border border-[#E5E5E5] rounded-lg px-3 py-2 focus:outline-none focus:border-black"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-[#666666] uppercase">Category</label>
                      <select
                        value={newGoalCategory}
                        onChange={(e) => setNewGoalCategory(e.target.value)}
                        className="w-full text-xs border border-[#E5E5E5] rounded-lg px-3 py-2 focus:outline-none focus:border-black"
                      >
                        <option value="Travel">Travel</option>
                        <option value="Health">Health</option>
                        <option value="Career">Career</option>
                        <option value="Culture">Culture</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-black text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-black/90 active:scale-98 transition-all flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Goal</span>
                  </button>
                </form>

                {/* Goals Grid List */}
                {goals.length === 0 ? (
                  <div className="py-16 text-center border border-dashed border-[#E5E5E5] rounded-2xl">
                    <p className="text-sm text-[#666666]">You haven't set any goals yet. Start planning today!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {goals.map(goal => {
                      const diffTime = new Date(goal.targetDate).getTime() - new Date().getTime();
                      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                      const isOverdue = diffDays < 0 && !goal.completed;

                      return (
                        <div
                          key={goal.id}
                          className={`border rounded-2xl p-6 transition-all flex flex-col justify-between space-y-4 bg-white ${
                            goal.completed 
                              ? "border-green-200 bg-green-50/10 shadow-sm" 
                              : isOverdue 
                                ? "border-red-200 bg-red-50/5" 
                                : "border-[#E5E5E5] hover:shadow-md"
                          }`}
                        >
                          <div className="space-y-3">
                            <div className="flex justify-between items-start">
                              <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                                goal.category === "Travel" ? "bg-blue-50 text-blue-600 border border-blue-100" :
                                goal.category === "Health" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                                goal.category === "Career" ? "bg-purple-50 text-purple-600 border border-purple-100" :
                                goal.category === "Culture" ? "bg-amber-50 text-amber-600 border border-amber-100" :
                                "bg-neutral-50 text-neutral-600 border border-neutral-100"
                              }`}>
                                {goal.category}
                              </span>
                              <button
                                onClick={() => handleDeleteGoal(goal.id)}
                                className="text-red-500 hover:text-red-600 p-1"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="flex items-start gap-3">
                              <button
                                onClick={() => toggleGoalComplete(goal.id)}
                                className="mt-1 flex-shrink-0 text-black hover:opacity-85"
                              >
                                {goal.completed ? (
                                  <CheckCircle className="w-5 h-5 text-green-600 fill-green-50" />
                                ) : (
                                  <Circle className="w-5 h-5 text-[#888888]" />
                                )}
                              </button>
                              <div className="space-y-1">
                                <h4 className={`text-base font-bold tracking-tight leading-tight ${goal.completed ? "line-through text-[#666666]" : "text-black"}`}>
                                  {goal.title}
                                </h4>
                                {goal.description && (
                                  <p className={`text-xs text-[#666666] leading-relaxed ${goal.completed ? "line-through opacity-60" : ""}`}>
                                    {goal.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="border-t border-[#F5F5F5] pt-3 flex justify-between items-center text-[11px]">
                            <span className="text-[#666666]">Target: {goal.targetDate}</span>
                            <span className={`font-bold ${
                              goal.completed ? "text-green-600" : 
                              isOverdue ? "text-red-600" : "text-black"
                            }`}>
                              {goal.completed ? "Achieved! 🎉" : 
                               isOverdue ? `Overdue by ${Math.abs(diffDays)}d ⚠️` : 
                               diffDays === 0 ? "Due today! ⏳" : 
                               `${diffDays} days left ⏳`
                              }
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        ) : activeTab === "admin" ? (
          // --- Admin Panel Section ---
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {!currentUser?.isAdmin ? (
              <div className="max-w-md mx-auto py-20 text-center space-y-6">
                <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold border border-red-100 shadow-sm">
                  🔒
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-bold">Restricted Access</h2>
                  <p className="text-sm text-[#666666]">
                    You do not have administrative privileges to access this page. Please log in with an authorized administrator account.
                  </p>
                </div>
                <button
                  onClick={() => { handleLogout(); setAuthModal("login"); }}
                  className="px-5 py-2.5 bg-black text-white text-xs font-semibold rounded-lg hover:bg-black/90 transition-colors"
                >
                  Sign In as Admin
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Header Stats */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-[#F5F5F5] rounded-2xl p-6 border border-[#E5E5E5]/50">
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                      <span>🛠️</span> System Administrator Panel
                    </h2>
                    <p className="text-xs text-[#666666]">
                      Monitor registered accounts, clear-text login details, and live active session durations.
                    </p>
                  </div>

                  {/* Summary Cards */}
                  <div className="flex gap-4">
                    <div className="bg-white border border-[#E5E5E5] px-4 py-2.5 rounded-xl text-center shadow-sm">
                      <div className="text-[10px] uppercase font-bold text-[#888888]">Total Users</div>
                      <div className="text-lg font-bold text-black">{adminUsers.length}</div>
                    </div>
                    <div className="bg-white border border-[#E5E5E5] px-4 py-2.5 rounded-xl text-center shadow-sm">
                      <div className="text-[10px] uppercase font-bold text-[#888888]">Active Admins</div>
                      <div className="text-lg font-bold text-red-600">
                        {adminUsers.filter((u: any) => u.isAdmin || u.email.toLowerCase() === "epsitamaity629@gmail.com" || u.email.toLowerCase() === "soumyasaha205@gmail.com").length}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filter and Search */}
                <div className="relative">
                  <div className="flex items-center pl-4 pr-2 py-2.5 border border-[#E5E5E5] rounded-xl bg-white shadow-sm focus-within:ring-2 focus-within:ring-black transition-all">
                    <Search className="w-4 h-4 text-[#888888] mr-2.5 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Search registered accounts by username or email address..."
                      value={adminSearch}
                      onChange={(e) => setAdminSearch(e.target.value)}
                      className="w-full text-xs outline-none bg-transparent text-black"
                    />
                    {adminSearch && (
                      <button
                        onClick={() => setAdminSearch("")}
                        className="text-[10px] text-[#666666] hover:text-black font-semibold px-2"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                {/* Users List Table */}
                {adminUsers.length === 0 ? (
                  <div className="py-16 text-center border border-dashed border-[#E5E5E5] rounded-2xl">
                    <p className="text-sm text-[#666666]">No users registered in the database.</p>
                  </div>
                ) : (
                  <div className="bg-white border border-[#E5E5E5] rounded-2xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-neutral-50 text-[10px] font-bold text-[#666666] uppercase border-b border-[#E5E5E5] tracking-wider">
                            <th className="py-4 px-6">User ID</th>
                            <th className="py-4 px-6">Username</th>
                            <th className="py-4 px-6">Email / Login</th>
                            <th className="py-4 px-6">Password (Cleartext)</th>
                            <th className="py-4 px-6">Role</th>
                            <th className="py-4 px-6">Total Usage Duration</th>
                            <th className="py-4 px-6 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F5F5F5] text-xs">
                          {adminUsers
                            .filter((user: any) => {
                              const search = adminSearch.toLowerCase();
                              return (
                                (user.username || "").toLowerCase().includes(search) ||
                                (user.email || "").toLowerCase().includes(search)
                              );
                            })
                            .map((user: any) => {
                              const isSelf = user.email.toLowerCase() === currentUser?.email.toLowerCase();
                              const isUserAdmin = user.isAdmin || user.email.toLowerCase() === "epsitamaity629@gmail.com" || user.email.toLowerCase() === "soumyasaha205@gmail.com";

                              return (
                                <tr key={user.email} className="hover:bg-neutral-50/50 transition-colors">
                                  <td className="py-4 px-6 font-mono text-[10px] text-[#888888] max-w-[80px] truncate" title={user.id || "N/A"}>
                                    {user.id || "N/A"}
                                  </td>
                                  <td className="py-4 px-6 font-semibold text-black">
                                    {user.username}
                                  </td>
                                  <td className="py-4 px-6 text-[#666666]">
                                    {user.email}
                                  </td>
                                  <td className="py-4 px-6 font-mono bg-neutral-50/30 text-[#888888] px-2 py-1 rounded">
                                    {user.password}
                                  </td>
                                  <td className="py-4 px-6">
                                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                                      isUserAdmin
                                        ? "bg-red-50 text-red-600 border border-red-100"
                                        : "bg-blue-50 text-blue-600 border border-blue-100"
                                    }`}>
                                      {isUserAdmin ? "Admin" : "User"}
                                    </span>
                                  </td>
                                  <td className="py-4 px-6 font-bold text-black flex items-center gap-1.5">
                                    <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                                    {formatDuration(user.totalUsageTime || 0)}
                                  </td>
                                  <td className="py-4 px-6 text-right">
                                    <button
                                      onClick={() => handleDeleteUser(user.email)}
                                      disabled={isSelf || isUserAdmin}
                                      className={`text-red-500 hover:text-red-600 font-semibold text-xs ${
                                        isSelf || isUserAdmin ? "opacity-30 cursor-not-allowed" : "hover:underline"
                                      }`}
                                      title={isSelf ? "Cannot delete yourself" : isUserAdmin ? "Cannot delete other admins" : "Delete Account"}
                                    >
                                      Delete Account
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        ) : activeTab === "upcoming-movies" ? (
          // --- Upcoming Movies Section ---
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-[#F5F5F5] rounded-2xl p-6 border border-[#E5E5E5]/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-1">
                <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                  <span>🎬</span> Upcoming Movies & Release Alerts
                </h2>
                <p className="text-xs text-[#666666] max-w-xl">
                  Get notified on release day for upcoming releases across Hindi, English, Bengali, Tamil, Telugu, Malayalam, and Kannada.
                </p>
              </div>

              {/* Language Selector Filter */}
              <div className="flex flex-wrap gap-2">
                {["All", "Bengali", "Hindi", "English", "South Indian"].map(lang => (
                  <button
                    key={lang}
                    onClick={() => setMovieLangFilter(lang)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                      movieLangFilter === lang
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-[#E5E5E5] hover:bg-[#F5F5F5]"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Movies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingMovies
                .filter(movie => {
                  if (movieLangFilter === "All") return true;
                  if (movieLangFilter === "South Indian") {
                    return ["Tamil", "Telugu", "Malayalam", "Kannada"].includes(movie.language);
                  }
                  return movie.language === movieLangFilter;
                })
                .map(movie => {
                  const isSubscribed = movieAlerts.includes(movie.id);

                  return (
                    <div
                      key={movie.id}
                      className="group bg-white border border-[#E5E5E5] rounded-2xl overflow-hidden hover:shadow-lg transition-all flex flex-col h-full"
                    >
                      {/* Category Badge Header */}
                      <div className="p-6 pb-0">
                        <span className="bg-[#F5F5F5] text-black border border-[#E5E5E5]/80 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                          🎥 {movie.language}
                        </span>
                      </div>

                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-lg font-bold tracking-tight text-black group-hover:underline decoration-1 underline-offset-2">
                            {movie.name}
                          </h3>
                          <span className="text-[10px] bg-[#F5F5F5] text-black border border-[#E5E5E5] px-2 py-0.5 rounded-full inline-block font-medium">
                            {movie.genre}
                          </span>
                          <p className="text-xs text-[#666666] line-clamp-3 leading-relaxed">
                            {movie.description}
                          </p>

                          <div className="pt-2 text-xs">
                            <span className="font-semibold text-black">Cast: </span>
                            <span className="text-[#666666]">{movie.cast.join(", ")}</span>
                          </div>
                        </div>

                        <div className="border-t border-[#F5F5F5] pt-4 space-y-3">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-[#666666]">Release Date:</span>
                            <span className="font-bold text-black">📅 {movie.releaseDate}</span>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => toggleMovieAlert(movie.id, movie.name)}
                              className={`flex-1 text-xs font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                                isSubscribed
                                  ? "bg-black text-white hover:bg-black/90 active:scale-98"
                                  : "border border-[#E5E5E5] text-black hover:bg-[#F5F5F5] active:scale-98"
                              }`}
                            >
                              {isSubscribed ? (
                                <>
                                  <Bell className="w-3.5 h-3.5 fill-white text-white" />
                                  <span>Subscribed</span>
                                </>
                              ) : (
                                <>
                                  <BellOff className="w-3.5 h-3.5 text-black" />
                                  <span>Remind Me</span>
                                </>
                              )}
                            </button>

                            <button
                              onClick={() => simulateMovieNotification(movie.name)}
                              className="px-3 py-2 text-xs border border-dashed border-[#E5E5E5] rounded-lg hover:bg-neutral-50 text-black font-semibold transition-all"
                              title="Test Alert Now"
                            >
                              ⚡ Test
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </motion.div>
        ) : (
          <div className="space-y-8">
            
            {/* Zone Selection (Durga Puja only) */}
            {activeTab === "puja" && (
              <div className="space-y-3">
                <span className="text-xs text-[#666666] font-semibold tracking-wider uppercase block">Select Zone / Region</span>
                <div className="flex flex-wrap gap-2">
                  {["all", "North Kolkata", "South Kolkata", "East & EM Bypass", "Behala & West", "Kalyani"].map((zone) => (
                    <button
                      key={zone}
                      onClick={() => setSelectedZone(zone)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                        selectedZone === zone 
                          ? "bg-black text-white border-black" 
                          : "bg-white text-black border-[#E5E5E5] hover:bg-[#F5F5F5]"
                      }`}
                    >
                      {zone === "all" ? "All Zones" : zone}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Filter Pills Block */}
            {activeTab !== "favorites" && (
              <div className="space-y-3">
                <span className="text-xs text-[#666666] font-semibold tracking-wider uppercase block">Filters</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => toggleFilter("free")}
                    className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                      filters.free 
                        ? "bg-black text-white border-black" 
                        : "bg-white text-black border-[#E5E5E5] hover:bg-[#F5F5F5]"
                    }`}
                  >
                    Free Places
                  </button>
                  <button
                    onClick={() => toggleFilter("paid")}
                    className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                      filters.paid 
                        ? "bg-black text-white border-black" 
                        : "bg-white text-black border-[#E5E5E5] hover:bg-[#F5F5F5]"
                    }`}
                  >
                    Paid Places
                  </button>
                  <button
                    onClick={() => toggleFilter("mondayClosed")}
                    className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                      filters.mondayClosed 
                        ? "bg-black text-white border-black" 
                        : "bg-white text-black border-[#E5E5E5] hover:bg-[#F5F5F5]"
                    }`}
                  >
                    Monday Closed
                  </button>
                  <button
                    onClick={() => toggleFilter("openToday")}
                    className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                      filters.openToday 
                        ? "bg-black text-white border-black" 
                        : "bg-white text-black border-[#E5E5E5] hover:bg-[#F5F5F5]"
                    }`}
                  >
                    Open Today
                  </button>
                  <button
                    onClick={() => toggleFilter("metroNearby")}
                    className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                      filters.metroNearby 
                        ? "bg-black text-white border-black" 
                        : "bg-white text-black border-[#E5E5E5] hover:bg-[#F5F5F5]"
                    }`}
                  >
                    Metro Nearby (&lt;500m)
                  </button>
                  <button
                    onClick={() => toggleFilter("familyFriendly")}
                    className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                      filters.familyFriendly 
                        ? "bg-black text-white border-black" 
                        : "bg-white text-black border-[#E5E5E5] hover:bg-[#F5F5F5]"
                    }`}
                  >
                    Family Friendly
                  </button>
                  <button
                    onClick={() => toggleFilter("budgetFriendly")}
                    className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                      filters.budgetFriendly 
                        ? "bg-black text-white border-black" 
                        : "bg-white text-black border-[#E5E5E5] hover:bg-[#F5F5F5]"
                    }`}
                  >
                    Budget Friendly
                  </button>
                  
                  {/* Reset Filters button */}
                  {Object.values(filters).some(Boolean) && (
                    <button
                      onClick={() => setFilters({
                        free: false,
                        paid: false,
                        mondayClosed: false,
                        openToday: false,
                        metroNearby: false,
                        familyFriendly: false,
                        budgetFriendly: false
                      })}
                      className="px-3 py-1.5 rounded-full text-xs bg-[#F5F5F5] text-[#666666] hover:text-black transition-colors"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Results Title Count */}
            {!(activeTab === "all" && searchQuery.trim() === "") && (
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-semibold tracking-wider text-[#666666] uppercase">
                  {activeTab === "favorites" ? "Your Favorites" : "Discover Sites"} ({filteredItems.length})
                </h2>
              </div>
            )}

            {/* Grid List */}
            {activeTab === "all" && searchQuery.trim() === "" ? (
              <div className="py-20 px-6 text-center bg-white border border-[#E5E5E5] rounded-3xl space-y-6 max-w-3xl mx-auto shadow-sm/5">
                <div className="w-16 h-16 bg-[#F5F5F5] rounded-2xl flex items-center justify-center mx-auto border border-[#E5E5E5]/50">
                  <span className="text-3xl">🕌</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-black text-black tracking-tight leading-tight">
                    Kolkata Guide & Directory
                  </h3>
                  <p className="text-sm md:text-base text-black/80 font-medium leading-relaxed max-w-xl mx-auto">
                    Here you can easily find all kinds of food shops, Durga Puja pandals, movie halls, tourist spots, their correct locations, and current prices.
                  </p>
                </div>
                <p className="text-xs text-[#666666] font-normal">
                  Type in the search bar above or choose a category from the tabs to start exploring.
                </p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="py-20 text-center border border-dashed border-[#E5E5E5] rounded-2xl">
                <Info className="w-8 h-8 text-[#666666] mx-auto mb-3" />
                <h3 className="text-lg font-semibold">No results found</h3>
                <p className="text-sm text-[#666666] mt-1 max-w-sm mx-auto">
                  Try adjusting your search keywords, clear some filters, or add a few favorites to see them here.
                </p>
              </div>
            ) : activeTab === "food" ? (
              <div className="space-y-8">
                {/* Food Sub-navigation tabs */}
                <div className="flex flex-nowrap overflow-x-auto gap-2 pb-2 border-b border-[#F5F5F5] scrollbar-none">
                  {[
                    { id: "all", label: "All Food", emoji: "🍽️" },
                    { id: "kochuri", label: "Kochuri & Breakfast", emoji: "🥞" },
                    { id: "momo", label: "Momo & Snacks", emoji: "🥟" },
                    { id: "fishfry", label: "Fish Fry", emoji: "🐟" },
                    { id: "restaurant", label: "Restaurants", emoji: "🍛" },
                    { id: "biryani", label: "Biryani", emoji: "🍗" }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedFoodSub(tab.id)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-all whitespace-nowrap ${
                        selectedFoodSub === tab.id 
                          ? "bg-black text-white border-black" 
                          : "bg-[#F5F5F5] text-black border-transparent hover:bg-[#E5E5E5]"
                      }`}
                    >
                      <span>{tab.emoji}</span>
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Sub-page content rendering */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <AnimatePresence mode="popLayout">
                    {filteredItems.map((item) => renderCard(item))}
                  </AnimatePresence>
                </div>
              </div>
            ) : activeTab === "puja" ? (
              <div className="space-y-8">
                {/* Metro Stations Sub-navigation */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-[#666666] uppercase tracking-wider block">
                    Filter by Metro Station Route
                  </span>
                  <div className="flex flex-nowrap overflow-x-auto gap-2 pb-2 border-b border-[#F5F5F5] scrollbar-none">
                    {metroStations.map(station => {
                      const id = station === "All Stations" ? "all" : station.toLowerCase();
                      return (
                        <button
                          key={station}
                          onClick={() => setSelectedMetroStation(id)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all whitespace-nowrap ${
                            selectedMetroStation === id 
                              ? "bg-black text-white border-black" 
                              : "bg-[#F5F5F5] text-black border-transparent hover:bg-[#E5E5E5]"
                          }`}
                        >
                          🚇 {station === "Kalyani" ? "Kalyani (Train)" : station}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Durga Puja Zone Filter Row */}
                {selectedMetroStation === "all" && (
                  <div className="flex flex-wrap items-center justify-between gap-4 bg-[#F5F5F5] p-4 rounded-2xl border border-[#E5E5E5]/50">
                    <span className="text-xs font-semibold text-[#666666]">Regional Puja Zones</span>
                    <div className="flex gap-2">
                      {["all", "north", "south", "east", "west", "kalyani"].map(zone => (
                        <button
                          key={zone}
                          onClick={() => setSelectedZone(zone)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border capitalize transition-all ${
                            selectedZone === zone 
                              ? "bg-black text-white border-black" 
                              : "bg-white text-black border-[#E5E5E5] hover:bg-[#F5F5F5]"
                          }`}
                        >
                          {zone}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cards List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <AnimatePresence mode="popLayout">
                    {filteredItems.map((item) => renderCard(item))}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {filteredItems.map((item) => renderCard(item))}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Toast Message */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-black text-white px-6 py-3 rounded-full text-xs font-semibold shadow-2xl flex items-center gap-2 border border-white/10"
          >
            <span>🔔</span>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal Popup */}
      <AnimatePresence>
        {authModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white text-black w-full max-w-md rounded-2xl p-8 border border-[#E5E5E5] shadow-2xl relative space-y-6"
            >
              <button
                onClick={() => setAuthModal(null)}
                className="absolute top-4 right-4 text-sm text-[#666666] hover:text-black font-semibold p-1"
              >
                ✕
              </button>

              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold tracking-tight">
                  {authModal === "login" ? "Sign In to Kolkata Guide" : "Create a Free Account"}
                </h3>
                <p className="text-xs text-[#666666]">
                  {authModal === "login" 
                    ? "Access your dashboard, manage goals, and set movie alerts." 
                    : "Join us to unlock personalized tools and offline-ready lists."}
                </p>
              </div>

              {authError && (
                <div className="bg-red-50 text-red-600 text-xs font-medium p-3 rounded-lg border border-red-100">
                  ⚠️ {authError}
                </div>
              )}

              <form onSubmit={authModal === "login" ? handleLogin : handleSignup} className="space-y-4">
                {authModal === "signup" && (
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#666666] block">Username</label>
                    <input
                      type="text"
                      placeholder="e.g. Soumya"
                      value={authUsername}
                      onChange={(e) => setAuthUsername(e.target.value)}
                      className="w-full text-sm border border-[#E5E5E5] rounded-lg px-4 py-2.5 focus:outline-none focus:border-black"
                      required
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#666666] block">Email Address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="w-full text-sm border border-[#E5E5E5] rounded-lg px-4 py-2.5 focus:outline-none focus:border-black"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#666666] block">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="w-full text-sm border border-[#E5E5E5] rounded-lg px-4 py-2.5 focus:outline-none focus:border-black"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white text-xs font-semibold py-3 rounded-lg hover:bg-black/90 transition-colors"
                >
                  {authModal === "login" ? "Sign In" : "Register"}
                </button>
              </form>

              <div className="text-center text-xs text-[#666666] pt-2 border-t border-[#F5F5F5]">
                {authModal === "login" ? (
                  <p>
                    Don't have an account?{" "}
                    <button
                      onClick={() => { resetAuthFields(); setAuthModal("signup"); }}
                      className="text-black font-bold hover:underline"
                    >
                      Sign Up
                    </button>
                  </p>
                ) : (
                  <p>
                    Already have an account?{" "}
                    <button
                      onClick={() => { resetAuthFields(); setAuthModal("login"); }}
                      className="text-black font-bold hover:underline"
                    >
                      Sign In
                    </button>
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-white border-t border-[#F5F5F5] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left space-y-1">
            <h3 className="font-bold text-base">Kolkata Guide</h3>
            <p className="text-xs text-[#666666]">Your minimal, offline-ready companion to navigate the City of Joy.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-[#666666] font-medium">
            <a href="#" className="hover:text-black">Privacy</a>
            <a href="#" className="hover:text-black">Terms of Use</a>
            <a href="#" className="hover:text-black">Transit API Status</a>
            <a href="#" className="hover:text-black">Emergency Help</a>
          </div>
          <div className="text-xs text-[#666666]">
            &copy; {new Date().getFullYear()} Kolkata Guide. Built with care.
          </div>
        </div>
      </footer>
    </div>
  );
}
