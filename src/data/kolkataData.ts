export interface Place {
  id: string;
  name: string;
  category: 'places' | 'movies' | 'food';
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
  extraDetails?: {
    showTimings?: { lang: string; times: string[] }[];
    priceDetails?: string;
    extraTickets?: string;
  };
}

export const movieHalls: Place[] = [
  {
    id: "nandan",
    name: "Nandan",
    category: "movies",
    description: "Kolkata's cultural hub and government-sponsored film and theatre centre, serving as a primary venue for film festivals and quality cinema.",
    nearestMetro: "Rabindra Sadan",
    distanceFromMetro: "300m (3 mins walk)",
    nearestBusStop: "Exide / Rabindra Sadan Crossing",
    metroFare: "₹5 - ₹15",
    busFare: "₹10",
    entryFee: "Standard movie ticket rates apply (very affordable)",
    openingTime: "1:00 PM",
    closingTime: "10:00 PM",
    closedDay: "None",
    googleMapsUrl: "https://maps.app.goo.gl/5ty1AzbknMQVDmtZ6",
    detailedRoute: [
      "De-board at Rabindra Sadan Metro Station.",
      "Take Exit Gate towards Rabindra Sadan Stage.",
      "Walk straight for 3 minutes to enter the Nandan complex."
    ],
    importantTips: [
      "Check out the adjacent Rabindra Sadan and Bangla Academy.",
      "Very affordable cafeteria and snacks outside.",
      "Tickets sell out fast for Bengali film releases."
    ],
    nearbyAttractions: ["Victoria Memorial", "St. Paul's Cathedral", "Birla Planetarium"],
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "radha-studio",
    name: "Radha Studio",
    category: "movies",
    description: "A historic cinema hall situated in Tollygunge, known for showcasing local Bengali films and close connection to the regional film industry.",
    nearestMetro: "Mahanayak Uttam Kumar",
    distanceFromMetro: "200m (2 mins walk)",
    nearestBusStop: "Tollygunge Tram Depot",
    metroFare: "₹5 - ₹20",
    busFare: "₹10",
    entryFee: "Varies by showtime",
    openingTime: "11:00 AM",
    closingTime: "9:00 PM",
    closedDay: "None",
    googleMapsUrl: "https://maps.app.goo.gl/VAcvuAfB6w4VHrA4A",
    detailedRoute: [
      "De-board at Mahanayak Uttam Kumar Metro Station (Tollygunge).",
      "Walk towards Tollygunge Tram Depot / Tollygunge Bridge.",
      "The studio/cinema hall is 2 minutes walk away."
    ],
    importantTips: [
      "Explore the old heritage studio surroundings.",
      "Centrally located in the heart of Tollygunge's studio area."
    ],
    nearbyAttractions: ["Tollygunge Golf Club", "Royal Calcutta Golf Club"],
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "navina-cinema",
    name: "Navina Cinema",
    category: "movies",
    description: "One of the most popular single-screen theatres in South Kolkata, well-known for its excellent sound system and comfortable seating.",
    nearestMetro: "Rabindra Sarovar",
    distanceFromMetro: "600m (7 mins walk)",
    nearestBusStop: "Tollygunge Phanri / Anwar Shah Road",
    metroFare: "₹5 - ₹20",
    busFare: "₹10",
    entryFee: "₹120 - ₹250 depending on show",
    openingTime: "11:00 AM",
    closingTime: "10:30 PM",
    closedDay: "None",
    googleMapsUrl: "https://maps.app.goo.gl/RonEqUeQEcQXjLEYA",
    detailedRoute: [
      "Get down at Rabindra Sarovar Metro Station.",
      "Walk towards Anwar Shah Road intersection.",
      "Walk along Anwar Shah Road for 5-7 minutes. Navina Cinema is on your right."
    ],
    importantTips: [
      "Book tickets online via BookMyShow for convenience.",
      "Enjoy local street food like rolls and chaat right outside."
    ],
    nearbyAttractions: ["Lake Mall", "Rabindra Sarovar Lake"],
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "priya-cinema",
    name: "Priya Cinema",
    category: "movies",
    description: "A prominent landmark single-screen cinema on Rashbehari Avenue, equipped with state-of-the-art projection and sound systems.",
    nearestMetro: "Kalighat",
    distanceFromMetro: "800m (10 mins walk)",
    nearestBusStop: "Deshapriya Park",
    metroFare: "₹5 - ₹20",
    busFare: "₹10 - ₹15",
    entryFee: "₹150 - ₹300",
    openingTime: "11:30 AM",
    closingTime: "10:30 PM",
    closedDay: "None",
    googleMapsUrl: "https://maps.app.goo.gl/b9n8YCF4jyjC557p7",
    detailedRoute: [
      "Exit at Kalighat Metro Station.",
      "Walk eastward along Rashbehari Avenue towards Deshapriya Park.",
      "Priya Cinema is right opposite Deshapriya Park."
    ],
    importantTips: [
      "Explore standard Bengali snacks like fish fry nearby.",
      "Often showcases independent regional cinema along with mainstream hits."
    ],
    nearbyAttractions: ["Deshapriya Park", "Lake Mall", "Kalighat Temple"],
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "bijoli-cinema",
    name: "Bijoli Cinema",
    category: "movies",
    description: "A classic single-screen hall located near Hazra Crossing, representing the nostalgic cinema culture of Kolkata.",
    nearestMetro: "Jatin Das Park",
    distanceFromMetro: "100m (1 min walk)",
    nearestBusStop: "Hazra Crossing",
    metroFare: "₹5 - ₹15",
    busFare: "₹10",
    entryFee: "₹80 - ₹180",
    openingTime: "12:00 PM",
    closingTime: "9:30 PM",
    closedDay: "None",
    googleMapsUrl: "https://maps.app.goo.gl/GbwzaCER3y5rZoAp6",
    detailedRoute: [
      "Exit at Jatin Das Park Metro Station (Hazra crossing side).",
      "Bijoli Cinema is visible just steps away from the metro exit."
    ],
    importantTips: [
      "Try the famous fish fry at Bijoli Grill adjacent to the hall (though the restaurant has moved, the brand origin is here).",
      "Very budget-friendly ticket prices."
    ],
    nearbyAttractions: ["Ashutosh Mukherjee College", "Jatin Das Park"],
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "basusree-cinema",
    name: "Basusree Cinema",
    category: "movies",
    description: "One of the oldest cinema halls in South Kolkata, historic for hosting Netaji Subhas Chandra Bose and showcasing legacy movies.",
    nearestMetro: "Jatin Das Park",
    distanceFromMetro: "300m (3 mins walk)",
    nearestBusStop: "Hazra Crossing",
    metroFare: "₹5 - ₹15",
    busFare: "₹10",
    entryFee: "₹100 - ₹200",
    openingTime: "11:30 AM",
    closingTime: "10:00 PM",
    closedDay: "None",
    googleMapsUrl: "https://maps.app.goo.gl/YQMTQ4Zj94hGkum8A",
    detailedRoute: [
      "De-board at Jatin Das Park Metro Station.",
      "Walk towards Hazra Crossing and proceed along Ashutosh Mukherjee Road.",
      "The hall is a 3-minute walk northwards."
    ],
    importantTips: [
      "Rich history: Inaugurated in 1947, a heritage site for movie lovers."
    ],
    nearbyAttractions: ["Jatin Das Park", "Kalighat Temple"],
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "menoka-cinema",
    name: "Menoka Cinema",
    category: "movies",
    description: "A highly popular single-screen cinema near Southern Avenue, known for running blockbusters with high-quality projection.",
    nearestMetro: "Rabindra Sarovar",
    distanceFromMetro: "900m (11 mins walk)",
    nearestBusStop: "Southern Avenue / Lake Road",
    metroFare: "₹5 - ₹20",
    busFare: "₹10 - ₹15",
    entryFee: "₹120 - ₹250",
    openingTime: "11:30 AM",
    closingTime: "10:30 PM",
    closedDay: "None",
    googleMapsUrl: "https://maps.app.goo.gl/a2FrrpqXEEbxzTUs7",
    detailedRoute: [
      "Get down at Rabindra Sarovar Metro Station.",
      "Walk along Southern Avenue towards Rabindra Sarovar Lake.",
      "Menoka is located near the Sarat Bose Road - Southern Avenue crossing."
    ],
    importantTips: [
      "Great to combine a movie with a peaceful walk at Rabindra Sarovar Lake.",
      "Ample parking space along the wide avenue."
    ],
    nearbyAttractions: ["Rabindra Sarovar Lake", "Durga Museum"],
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80"
  }
];

export const places: Place[] = [
  {
    id: "birla-planetarium",
    name: "Birla Planetarium",
    category: "places",
    description: "The largest planetarium in Asia and the second largest in the world, designed in the Buddhist Stupa style, featuring daily scientific astronomical shows.",
    nearestMetro: "Maidan",
    distanceFromMetro: "400m (5 mins walk)",
    nearestBusStop: "Exide Crossing / Cathedral Road",
    metroFare: "₹5 - ₹15",
    busFare: "₹10",
    entryFee: "₹150 per person",
    openingTime: "12:00 PM",
    closingTime: "6:00 PM",
    closedDay: "None (Open daily)",
    googleMapsUrl: "https://maps.app.goo.gl/23YgdZSLkXaVPXPQ7",
    detailedRoute: [
      "Get down at Maidan Metro Station.",
      "Take Exit Gate towards Cathedral Road.",
      "Walk past the Academy of Fine Arts. The Planetarium is on the right."
    ],
    importantTips: [
      "Show languages vary: Bengali (3:00 PM, 5:00 PM), Hindi (12:00 PM, 2:00 PM, 4:00 PM), English (1:00 PM, 6:00 PM). Plan your arrival accordingly.",
      "Ticket counter opens 30 minutes before the first show."
    ],
    nearbyAttractions: ["Victoria Memorial", "St. Paul's Cathedral", "Maidan"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    extraDetails: {
      showTimings: [
        { lang: "Bengali", times: ["3:00 PM", "5:00 PM"] },
        { lang: "Hindi", times: ["12:00 PM", "2:00 PM", "4:00 PM"] },
        { lang: "English", times: ["1:00 PM", "6:00 PM"] }
      ]
    }
  },
  {
    id: "maidan",
    name: "Maidan",
    category: "places",
    description: "Kolkata's largest open green space, rich in history, hosting sports grounds, horse carriage rides, and landmarks like Fort William.",
    nearestMetro: "Maidan",
    distanceFromMetro: "0m (Immediate)",
    nearestBusStop: "Maidan Bus Stop",
    metroFare: "₹5 - ₹15",
    busFare: "₹10",
    entryFee: "Free",
    openingTime: "Any time",
    closingTime: "",
    closedDay: "None",
    googleMapsUrl: "https://maps.app.goo.gl/kVzmodtmeFQoCDbq5",
    detailedRoute: [
      "De-board at Maidan Metro Station.",
      "Step out of the station. You are right in the middle of the Maidan green expanse."
    ],
    importantTips: [
      "Best visited in early mornings for jogging or late evenings for a cool breeze.",
      "Enjoy a traditional horse carriage ride near Victoria Memorial boundary."
    ],
    nearbyAttractions: ["Victoria Memorial", "Birla Planetarium", "Eden Gardens"],
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "alipore-jail-museum",
    name: "Alipore Jail Museum",
    category: "places",
    description: "A historic high-security colonial-era jail converted into a memorial museum, depicting the struggles and detention cells of India's iconic freedom fighters.",
    nearestMetro: "Netaji Bhawan",
    distanceFromMetro: "1.8 km (take auto or bus)",
    nearestBusStop: "Alipore Jail / Zeerut Bridge",
    metroFare: "₹5 - ₹15",
    busFare: "₹10 - ₹12",
    autoFare: "₹15 - ₹20",
    entryFee: "₹30 per person (Light & Sound show: ₹100 per person extra)",
    openingTime: "11:00 AM",
    closingTime: "5:30 PM",
    closedDay: "Monday",
    googleMapsUrl: "https://maps.app.goo.gl/oCCNRL1uGXiMuHAs9",
    detailedRoute: [
      "De-board at Netaji Bhawan or Jatin Das Park Metro Station.",
      "Take an auto-rickshaw heading towards Alipore / Zeerut Bridge.",
      "Get down directly at the Alipore Jail Museum gate."
    ],
    importantTips: [
      "The Light and Sound show begins in the evening (usually 6:00 PM onwards) and is highly recommended.",
      "Photography is allowed, but do not touch the historic artifacts inside the cells."
    ],
    nearbyAttractions: ["Alipore Zoo", "National Library", "Victoria Memorial"],
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80",
    extraDetails: {
      priceDetails: "Entry: ₹30, Light & Sound Show: ₹100"
    }
  },
  {
    id: "national-library",
    name: "Indian National Library",
    category: "places",
    description: "The largest library in India by volume, housed in the grand, colonial Belvedere Estate, boasting an archive of over 2.2 million books.",
    nearestMetro: "Jatin Das Park",
    distanceFromMetro: "1.5 km (take auto or bus)",
    nearestBusStop: "National Library Stop (Alipore)",
    metroFare: "₹5 - ₹15",
    busFare: "₹12 (from Rabindra Sadan)",
    autoFare: "₹15 (from Jatin Das Park)",
    entryFee: "Free (Temporary visitor's pass required at gate)",
    openingTime: "9:00 AM",
    closingTime: "8:00 PM",
    closedDay: "National Holidays",
    googleMapsUrl: "https://maps.app.goo.gl/fD6mv4ayJNSUNZs78",
    detailedRoute: [
      "Option 1: Get down at Jatin Das Park metro, take a shared auto to National Library for ₹15.",
      "Option 2: Get down at Rabindra Sadan metro, take a bus heading towards Alipore/Kidderpore for ₹12."
    ],
    importantTips: [
      "Carry a valid photo ID card to get a temporary entry slip at the reception.",
      "Maintain strict silence. Very peaceful environment for reading and research."
    ],
    nearbyAttractions: ["Alipore Zoo", "Alipore Jail Museum"],
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "botanical-garden",
    name: "Botanical Garden",
    category: "places",
    description: "The Acharya Jagadish Chandra Bose Indian Botanic Garden, famous worldwide for the 'Great Banyan Tree' which is over 250 years old and covers a massive acreage.",
    nearestMetro: "Howrah",
    distanceFromMetro: "6 km (take bus or taxi)",
    nearestBusStop: "Botanical Garden Gate (Shalimar/Sibpur)",
    metroFare: "₹5 - ₹20",
    busFare: "₹15 - ₹20",
    entryFee: "₹30 per person",
    openingTime: "8:00 AM",
    closingTime: "4:00 PM",
    closedDay: "Monday",
    googleMapsUrl: "https://maps.app.goo.gl/zSsj5jXiF7g3F3fg9",
    detailedRoute: [
      "De-board at Howrah Metro/Railway Station.",
      "Go to the Howrah bus stand and board a bus bound for Shalimar/Botanical Garden (Route 55 or similar).",
      "Get down at the main garden gate in Sibpur, Howrah."
    ],
    importantTips: [
      "Wear comfortable walking shoes; the garden is vast and requires walking.",
      "Single-use plastic bottles and plastic packets are strictly banned inside."
    ],
    nearbyAttractions: ["Vidyasagar Setu (Second Hooghly Bridge)", "Howrah Station"],
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "pareshnath-jain-temple",
    name: "Pareshnath Jain Temple",
    category: "places",
    description: "A 157-year-old Jain temple complex featuring exquisite mirror-work, colored glass windows, and beautiful gardens surrounding the temple.",
    nearestMetro: "Sobhabazar Sutanuti",
    distanceFromMetro: "2 km (take bus or auto)",
    nearestBusStop: "Gauri Bari / Maniktala Crossing",
    metroFare: "₹5 - ₹25",
    busFare: "₹10",
    entryFee: "Free",
    openingTime: "6:00 AM (12:00 PM close, reopens 3:00 PM)",
    closingTime: "7:00 PM",
    closedDay: "None",
    googleMapsUrl: "https://maps.app.goo.gl/JFij4sHhndFwv2PU9",
    detailedRoute: [
      "Get down at Sobhabazar Sutanuti Metro Station.",
      "Take a bus or auto heading towards Maniktala/Gauri Bari.",
      "Get down at Gauri Bari bus stop and walk 3 minutes to the Jain Temple Road."
    ],
    importantTips: [
      "Note the mid-day closing hours (12:00 PM to 3:00 PM). Plan your trip either in the morning or late afternoon.",
      "Dress modestly and maintain sanctity."
    ],
    nearbyAttractions: ["Sobhabazar Rajbari", "Maniktala Fish Market"],
    image: "https://images.unsplash.com/photo-1609137882297-cb9d5d36d22f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "sobhabazar-rajbari",
    name: "Sobhabazar Rajbari",
    category: "places",
    description: "The heritage palace of the Sobhabazar Royal Family, famous for starting the iconic zamindari Durga Puja in 1757.",
    nearestMetro: "Sobhabazar Sutanuti",
    distanceFromMetro: "300m (3 mins walk)",
    nearestBusStop: "Sobhabazar Crossing",
    metroFare: "₹5 - ₹25",
    busFare: "₹10",
    entryFee: "Free",
    openingTime: "8:00 AM",
    closingTime: "8:00 PM",
    closedDay: "None",
    googleMapsUrl: "https://maps.app.goo.gl/6ptwzT3qtHvMZfrQ6",
    detailedRoute: [
      "Get down at Sobhabazar Sutanuti Metro Station.",
      "Walk towards Lal Mandir / Sobhabazar Street.",
      "Proceed straight for 3 minutes. The Rajbari is on your left."
    ],
    importantTips: [
      "Best time to visit is during Durga Puja (September-October) to witness the grand traditional rituals.",
      "Great spot for vintage architectural photography."
    ],
    nearbyAttractions: ["Bagbazar Ghat", "Sarada Ma's House", "Kumartuli (Clay artisans hub)"],
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "victoria-memorial",
    name: "Victoria Memorial",
    category: "places",
    description: "A grand white Makrana marble monument built in memory of Queen Victoria, set inside expansive landscaped gardens and housing a grand heritage museum.",
    nearestMetro: "Rabindra Sadan / Maidan",
    distanceFromMetro: "500m (6 mins walk)",
    nearestBusStop: "Rabindra Sadan / Maidan / Cathedral Road",
    metroFare: "₹5 - ₹15",
    busFare: "₹10",
    entryFee: "₹100 per person (Garden only ticket is ₹30)",
    openingTime: "10:00 AM",
    closingTime: "6:00 PM",
    closedDay: "Monday",
    googleMapsUrl: "https://maps.app.goo.gl/oVjBZCFA1EA8Yuxz8",
    detailedRoute: [
      "Option 1: Exit at Rabindra Sadan metro, walk past Exide crossing onto Cathedral road towards Victoria South Gate.",
      "Option 2: Exit at Maidan metro and walk across the Maidan lawns to the North Gate."
    ],
    importantTips: [
      "The museum galleries are closed on Mondays, but the garden remains open.",
      "Food items are not allowed inside the main complex."
    ],
    nearbyAttractions: ["St. Paul's Cathedral", "Birla Planetarium", "Maidan"],
    image: "https://images.unsplash.com/photo-1558431382-27e39cbef4bc?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "kalighat-temple",
    name: "Kalighat Temple",
    category: "places",
    description: "One of the most sacred Hindu Shakti Peethas in India, dedicated to Goddess Kali, located on the old course of the Hooghly river.",
    nearestMetro: "Kalighat",
    distanceFromMetro: "700m (8 mins walk)",
    nearestBusStop: "Kalighat Tram Depot / Rashbehari Crossing",
    metroFare: "₹5 - ₹20",
    busFare: "₹10",
    entryFee: "Free",
    openingTime: "5:00 AM (Closes at 2:00 PM, Reopens 5:00 PM)",
    closingTime: "10:30 PM",
    closedDay: "None (Open daily)",
    googleMapsUrl: "https://maps.app.goo.gl/RE7rrveE9zPqoQ7F9",
    detailedRoute: [
      "Get down at Kalighat Metro Station.",
      "Walk westward on Rashbehari Avenue, then take a right on Kali Temple Road.",
      "Walk straight for 7-8 minutes to reach the temple shrine."
    ],
    importantTips: [
      "Beware of local middlemen offering fast-track darshan for hefty tips.",
      "Visit early in the morning (before 7:00 AM) to avoid massive crowds."
    ],
    nearbyAttractions: ["Priya Cinema", "Sorse Posto Restaurant"],
    image: "https://images.unsplash.com/photo-1626244243685-64580327f2c6?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "dakshineswar-temple",
    name: "Dakshineswar Kali Temple",
    category: "places",
    description: "Built by Rani Rashmoni in 1855, this 9-spire temple on the bank of the Ganges is highly famous for Ramakrishna Paramahansa's spiritual journey.",
    nearestMetro: "Dakshineswar",
    distanceFromMetro: "200m (3 mins walk via Skywalk)",
    nearestBusStop: "Dakshineswar Bus Terminus",
    metroFare: "₹5 - ₹30",
    busFare: "₹15 - ₹20",
    entryFee: "Free",
    openingTime: "5:00 AM (Closes at 12:30 PM, Reopens 3:30 PM)",
    closingTime: "7:30 PM",
    googleMapsUrl: "https://maps.app.goo.gl/iV9PJzkhJDHBP71K8",
    closedDay: "None (Open daily)",
    detailedRoute: [
      "Get down at Dakshineswar Metro Station (Terminus of North-South line).",
      "Take the newly constructed public Skywalk directly from the station gate.",
      "The skywalk leads you straight into the temple entrance."
    ],
    importantTips: [
      "Mobile phones, cameras, and leather items are strictly prohibited inside the main temple area. Lockers are available.",
      "Take a ferry from the ghat to cross the river and reach Belur Math directly."
    ],
    nearbyAttractions: ["Belur Math (via ferry)", "Dakshineswar Skywalk"],
    image: "https://images.unsplash.com/photo-1598376742511-c6729a997efd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "bagbazar-ghat",
    name: "Bagbazar Ghat",
    category: "places",
    description: "A historic bathing ghat on the Hooghly River, closely associated with the early settlement of North Kolkata and Ramakrishna-Vivekananda history.",
    nearestMetro: "Shyambazar",
    distanceFromMetro: "1.2 km (take auto or walk)",
    nearestBusStop: "Bagbazar Bata / Circular Railway Station",
    metroFare: "₹5 - ₹25",
    busFare: "₹10",
    entryFee: "Free",
    openingTime: "5:00 AM",
    closingTime: "9:00 PM",
    closedDay: "None",
    googleMapsUrl: "https://maps.app.goo.gl/vt2zPd7eBvHps4iFA",
    detailedRoute: [
      "De-board at Shyambazar Metro Station.",
      "Take an auto towards Bagbazar Ghat (₹10 - ₹12).",
      "Get down near the riverbank."
    ],
    importantTips: [
      "The ghat is beautiful during sunset. Highly photogenic.",
      "Locals visit here for peaceful evening chats (adda) by the river."
    ],
    nearbyAttractions: ["Sarada Ma's House", "Madan Mohan Temple"],
    image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "sarada-ma-house",
    name: "Sarada Ma's House (Udbodhan)",
    category: "places",
    description: "The sacred residence where Holy Mother Sri Sarada Devi lived and published the Udbodhan magazine, now a peaceful ashram.",
    nearestMetro: "Shyambazar",
    distanceFromMetro: "1 km (take auto or walk)",
    nearestBusStop: "Bagbazar Bata",
    metroFare: "₹5 - ₹25",
    busFare: "₹10",
    entryFee: "Free",
    openingTime: "8:30 AM (Closes 11:30 AM, Reopens 4:00 PM)",
    closingTime: "8:00 PM",
    closedDay: "None",
    googleMapsUrl: "https://maps.app.goo.gl/v66xyxt8eqoy8Qhp6",
    detailedRoute: [
      "De-board at Shyambazar Metro Station.",
      "Walk or take an auto down Bagbazar Street towards the River Ghat.",
      "Turn left onto Mukherjee Lane to find the Udbodhan office and house."
    ],
    importantTips: [
      "Maintain strict silence and respect the spiritual ambiance.",
      "Check out the small bookstore selling Ramakrishna Mission literature."
    ],
    nearbyAttractions: ["Bagbazar Ghat", "Sobhabazar Rajbari"],
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "st-pauls-cathedral",
    name: "St. Paul's Cathedral",
    category: "places",
    description: "An iconic Anglican cathedral built in the Indo-Gothic style, featuring majestic high steeples and marvelous stained-glass windows.",
    nearestMetro: "Rabindra Sadan",
    distanceFromMetro: "300m (4 mins walk)",
    nearestBusStop: "Rabindra Sadan / Cathedral Road",
    metroFare: "₹5 - ₹15",
    busFare: "₹10",
    entryFee: "₹10 per person",
    openingTime: "10:00 AM",
    closingTime: "6:00 PM",
    closedDay: "None (Open daily)",
    googleMapsUrl: "https://maps.app.goo.gl/JBQCWsaVxALjjtY67",
    detailedRoute: [
      "De-board at Rabindra Sadan Metro Station.",
      "Exit towards Cathedral Road.",
      "Walk past the Birla Planetarium. The Cathedral entrance is immediately next to it."
    ],
    importantTips: [
      "Photography is strictly prohibited inside the main cathedral hall.",
      "Beautifully decorated and lit during Christmas Eve and Christmas week."
    ],
    nearbyAttractions: ["Victoria Memorial", "Birla Planetarium", "Academy of Fine Arts"],
    image: "https://images.unsplash.com/photo-1548625361-155de0cbb55a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "south-park-street-cemetery",
    name: "South Park Street Cemetery",
    category: "places",
    description: "An 18th-century colonial-era graveyard featuring moss-covered gothic tombs, obelisks, and monuments of East India Company officers.",
    nearestMetro: "Park Street",
    distanceFromMetro: "1.2 km (take auto or walk)",
    nearestBusStop: "Mullick Bazar Crossing / Rawdon Street",
    metroFare: "₹5 - ₹15",
    busFare: "₹10",
    entryFee: "Free (Photography may require a fee of ₹20-₹50)",
    openingTime: "10:00 AM",
    closingTime: "5:00 PM",
    closedDay: "None",
    googleMapsUrl: "https://maps.app.goo.gl/pcCpAV1B1uTHGoeMA",
    detailedRoute: [
      "De-board at Park Street Metro Station.",
      "Walk straight down Park Street (towards Mullick Bazar crossing) for 12-15 minutes, or take a short auto ride.",
      "The cemetery entrance is on the right before the Rawdon Street crossing."
    ],
    importantTips: [
      "Wear mosquito repellent; the dense foliage breeds many mosquitoes.",
      "Highly popular for portrait and moody gothic photography."
    ],
    nearbyAttractions: ["Park Street Restaurants", "Indian Museum"],
    image: "https://images.unsplash.com/photo-1552083375-1447ce886485?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "indian-museum",
    name: "Indian Museum",
    category: "places",
    description: "Established in 1814, it is the oldest and largest museum in the Asia-Pacific region, holding a massive collection of antiques, mummies, and fossils.",
    nearestMetro: "Park Street / Esplanade",
    distanceFromMetro: "100m (1 min walk)",
    nearestBusStop: "Esplanade / Park Street Crossing",
    metroFare: "₹5 - ₹15",
    busFare: "₹10",
    entryFee: "₹75 per person (Foreigners: ₹500)",
    openingTime: "10:00 AM",
    closingTime: "6:00 PM",
    closedDay: "Monday",
    googleMapsUrl: "https://maps.app.goo.gl/38aVbSoWUTRyHTBKA",
    detailedRoute: [
      "De-board at Park Street Metro Station.",
      "Take the Exit Gate towards Jawaharlal Nehru Road.",
      "Walk 1 minute northward. The grand white museum colonnade is on your left."
    ],
    importantTips: [
      "Allow at least 2 to 3 hours to properly view the massive collections.",
      "Do not miss the Egyptian Mummy and the ancient Ashoka Pillar capital section."
    ],
    nearbyAttractions: ["Park Street Cemetery", "Maidan", "Esplanade Market"],
    image: "https://images.unsplash.com/photo-1580537659444-1297ccc7ad71?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "jorasanko-thakur-bari",
    name: "Jorasanko Thakur Bari",
    category: "places",
    description: "The ancestral home of the Tagore family, birthplace of Rabindranath Tagore, now a museum displaying original paintings, letters, and memories.",
    nearestMetro: "MG Road / Girish Park",
    distanceFromMetro: "500m (6 mins walk)",
    nearestBusStop: "Girish Park / Jorasanko Stop",
    metroFare: "₹5 - ₹20",
    busFare: "₹10",
    entryFee: "₹20 per person",
    openingTime: "10:30 AM",
    closingTime: "4:30 PM",
    closedDay: "Monday",
    googleMapsUrl: "https://maps.app.goo.gl/j4yB6xmgiMSCiUYaA",
    detailedRoute: [
      "De-board at MG Road Metro Station.",
      "Walk northwards along Chittaranjan Avenue towards Girish Park.",
      "Turn left onto Rabindra Sarani. The Thakur Bari gates are a short distance away."
    ],
    importantTips: [
      "Visitors must take off their shoes before entering the main wooden galleries.",
      "Taking photos inside the galleries is prohibited."
    ],
    nearbyAttractions: ["College Street Boi Para", "Marble Palace"],
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "princep-ghat",
    name: "Princep Ghat",
    category: "places",
    description: "A heritage Greek-infill style riverfront monument built during the British era, famous for sunset views and traditional wooden boating.",
    nearestMetro: "Esplanade",
    distanceFromMetro: "3 km (take auto or local train)",
    nearestBusStop: "Princep Ghat / Babu Ghat",
    metroFare: "₹5 - ₹15",
    busFare: "₹10 - ₹12",
    entryFee: "Free (Boating costs ₹400 for a 30-min ride)",
    openingTime: "Open 24 hours",
    closingTime: "11:00 PM (Ghat park area closes)",
    closedDay: "None (Open daily)",
    googleMapsUrl: "https://maps.app.goo.gl/E9vKAM4ffuoPSCkM7",
    detailedRoute: [
      "Option 1: Get down at Esplanade Metro, take an auto or bus to Princep Ghat.",
      "Option 2: Take the Circular Railway train and get down directly at Princep Ghat Station."
    ],
    importantTips: [
      "A boat ride on the river (₹400 for 30 minutes, negotiable) during sunset is highly recommended.",
      "Try local street food like 'Jhalmuri' and 'Ghoti Gorom'."
    ],
    nearbyAttractions: ["Millennium Park", "Vidyasagar Setu Viewpoint"],
    image: "https://images.unsplash.com/photo-1616843415587-434ab386f78f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "millennium-park",
    name: "Millennium Park",
    category: "places",
    description: "A landscaped riverfront park on the banks of Hooghly, offering spectacular views of the Howrah Bridge and children's amusement rides.",
    nearestMetro: "Esplanade",
    distanceFromMetro: "1.5 km (take auto or walk)",
    nearestBusStop: "Fairlie Place / Babu Ghat",
    metroFare: "₹5 - ₹15",
    busFare: "₹10",
    entryFee: "Free",
    openingTime: "10:30 AM",
    closingTime: "6:30 PM",
    closedDay: "None",
    googleMapsUrl: "https://maps.app.goo.gl/GEJmhoqV8u5w9EEs7",
    detailedRoute: [
      "De-board at Esplanade Metro Station.",
      "Walk down towards Babughat / Strand Road along the Shipping Corporation buildings.",
      "The park spans along the river bank next to the circular railway tracks."
    ],
    importantTips: [
      "Ideal place to sit and watch boats on the river under the backdrop of Howrah Bridge.",
      "Excellent spot for evening photography."
    ],
    nearbyAttractions: ["Metcalfe Hall", "Princep Ghat", "Babughat"],
    image: "https://images.unsplash.com/photo-1601999109332-542b18dbec57?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "metcalfe-hall",
    name: "Metcalfe Hall",
    category: "places",
    description: "A classical heritage building inspired by the Temple of the Winds in Athens, reflecting majestic 19th-century British colonial architecture.",
    nearestMetro: "Esplanade / Chandni Chowk",
    distanceFromMetro: "1.5 km (take auto or walk)",
    nearestBusStop: "Fairlie Place Crossing / Strand Road",
    metroFare: "₹5 - ₹15",
    busFare: "₹10",
    entryFee: "₹20 per person (Only cash/UPI accepted)",
    openingTime: "10:00 AM",
    closingTime: "5:00 PM",
    closedDay: "Monday",
    googleMapsUrl: "https://maps.app.goo.gl/Ei9G1Gcwr5FEtu7q9",
    detailedRoute: [
      "Get down at Esplanade or Chandni Chowk Metro Station.",
      "Walk or take an auto to the intersection of Strand Road and Hare Street.",
      "The monument is located right at the corner."
    ],
    importantTips: [
      "Inspect the exhibitions displaying old pictures and stories of Kolkata's transition.",
      "Maintain decorum inside the wooden galleries."
    ],
    nearbyAttractions: ["Millennium Park", "High Court", "St. John's Church"],
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "alipore-zoo",
    name: "Alipore Zoo",
    category: "places",
    description: "India's oldest formally established zoological park, housing popular fauna including the Royal Bengal Tiger, giraffes, and elephants.",
    nearestMetro: "Netaji Bhawan / Jatin Das Park",
    distanceFromMetro: "2 km (take auto or bus)",
    nearestBusStop: "Alipore Zoo Stop",
    metroFare: "₹5 - ₹15",
    busFare: "₹10 - ₹12",
    autoFare: "₹15 (from Jatin Das Park)",
    entryFee: "₹50 per person",
    openingTime: "9:00 AM",
    closingTime: "5:00 PM",
    closedDay: "Thursday",
    googleMapsUrl: "https://maps.app.goo.gl/qqso1beUSPzUyaEn6",
    detailedRoute: [
      "Get down at Netaji Bhawan or Jatin Das Park Metro.",
      "Take an auto or bus heading towards Alipore Crossing / Zoo Gate.",
      "De-board right outside the ticket counter."
    ],
    importantTips: [
      "Avoid weekends if you want to dodge long queues.",
      "Carry umbrellas and hats as you will have to walk in open sun inside."
    ],
    nearbyAttractions: ["Alipore Jail Museum", "National Library"],
    image: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "bitm",
    name: "Birla Industrial & Technological Museum",
    category: "places",
    description: "The first science museum in India, featuring interactive science galleries, physics experiments, 3D theatres, and a mock coal mine.",
    nearestMetro: "Rabindra Sadan",
    distanceFromMetro: "2.5 km (take bus or auto)",
    nearestBusStop: "Ballygunge Phari / Gurusaday Road",
    metroFare: "₹5 - ₹15",
    busFare: "₹10 - ₹15",
    entryFee: "₹60 per person",
    openingTime: "10:00 AM",
    closingTime: "5:30 PM",
    closedDay: "None (Open daily)",
    googleMapsUrl: "https://maps.app.goo.gl/FWYpWnw1ZDYA9Wuj9",
    detailedRoute: [
      "De-board at Rabindra Sadan Metro.",
      "Take an auto or bus towards Ballygunge Phari.",
      "Walk down Gurusaday Road for 5 minutes. The museum is on the left."
    ],
    importantTips: [
      "Don't miss the 'Mock Coal Mine' tour which gives a realistic underground experience.",
      "Great educational place for kids and students."
    ],
    nearbyAttractions: ["Quest Mall", "Birla Temple"],
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "eco-park",
    name: "Eco Park",
    category: "places",
    description: "A colossal ecological park in New Town featuring a huge water body, replication of the Seven Wonders of the World, and active boating and cycling.",
    nearestMetro: "Salt Lake Sector V",
    distanceFromMetro: "8 km (take bus or auto)",
    nearestBusStop: "Eco Park Gate 1 / 2 / 4",
    metroFare: "₹5 - ₹20",
    busFare: "₹20 - ₹25",
    entryFee: "₹30 per person",
    openingTime: "11:00 AM",
    closingTime: "7:30 PM",
    closedDay: "Monday",
    googleMapsUrl: "https://maps.app.goo.gl/8RcDCbnXSzLFcc2w6",
    detailedRoute: [
      "Exit at Salt Lake Sector V Metro Station.",
      "Board a bus heading towards New Town/Eco Space.",
      "Get down at Eco Park Gate 2 (closest to the Seven Wonders replicas)."
    ],
    importantTips: [
      "Due to its huge size, cycles can be rented inside for easier movement.",
      "Carry hats/umbrellas; the park is very open."
    ],
    nearbyAttractions: ["Mother's Wax Museum", "Eco Space"],
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "rabindra-sarovar",
    name: "Rabindra Sarovar Lake & Durga Museum",
    category: "places",
    description: "A peaceful artificial lake in South Kolkata surrounded by gardens, popular for jogging, bird watching, and holding the unique Durga Museum.",
    nearestMetro: "Rabindra Sadan",
    distanceFromMetro: "Close via Rabindra Sarovar Metro / Lake Gardens station",
    nearestBusStop: "Southern Avenue Stop / Sarat Bose Road Crossing",
    metroFare: "₹5 - ₹20",
    busFare: "₹10",
    entryFee: "Free",
    openingTime: "5:00 AM",
    closingTime: "8:00 PM",
    closedDay: "None (Open daily)",
    googleMapsUrl: "https://maps.app.goo.gl/x7ymYK6MGM8GXR7T6",
    detailedRoute: [
      "Although Rabindra Sadan metro is mentioned, the nearest metro is actually Rabindra Sarovar or Kavi Nazrul line.",
      "Walk towards Southern Avenue and enter the lake garden pathways.",
      "Alternatively, take the Eastern Railway to Lake Gardens station."
    ],
    importantTips: [
      "Durga Museum showcases award-winning idols from past Durga Pujas.",
      "Keep the environment clean; do not litter in the lake."
    ],
    nearbyAttractions: ["Menoka Cinema", "Lake Mall"],
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "nicco-park",
    name: "Nicco Park",
    category: "places",
    description: "An extensive amusement park in Salt Lake, often called the Disneyland of West Bengal, featuring thrilling rides and an attached water park.",
    nearestMetro: "Salt Lake Sector V",
    distanceFromMetro: "1.5 km (take auto or walk)",
    nearestBusStop: "Nicco Park Crossing",
    metroFare: "₹5 - ₹20",
    busFare: "₹10 - ₹15",
    entryFee: "₹500 per person (Water Park entry: ₹700 per person)",
    openingTime: "10:30 AM",
    closingTime: "8:00 PM (Water park closes at 6:00 PM)",
    closedDay: "None (Open daily)",
    googleMapsUrl: "https://maps.app.goo.gl/PGNjifEMoCWy3AhA8",
    detailedRoute: [
      "De-board at Salt Lake Sector V Metro Station.",
      "Take an auto heading towards Nicco Park (₹15) or walk for 15 minutes."
    ],
    importantTips: [
      "Bring extra clothes and towels if you plan to visit the Wet-O-Wild Water Park.",
      "The cable car ride offers a complete bird's-eye view of the entire amusement park."
    ],
    nearbyAttractions: ["Salt Lake Bypass", "Nalban Boating Complex"],
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    extraDetails: {
      priceDetails: "Main Entry: ₹500, Water Park: ₹700"
    }
  },
  {
    id: "science-city",
    name: "Science City",
    category: "places",
    description: "The largest science center in the Indian subcontinent, featuring a space theater, space odyssey, dynamotion, and outdoor science park.",
    nearestMetro: "Barun Sengupta",
    distanceFromMetro: "300m (4 mins walk)",
    nearestBusStop: "Science City Bus Stop / EM Bypass Crossing",
    metroFare: "₹5 - ₹20",
    busFare: "₹10 - ₹15",
    entryFee: "₹70 per person",
    openingTime: "10:00 AM",
    closingTime: "6:00 PM",
    closedDay: "None",
    googleMapsUrl: "https://maps.app.goo.gl/LvneunuxneMFCApCA",
    detailedRoute: [
      "De-board at Barun Sengupta Metro Station (on the Orange Line).",
      "Walk towards the EM Bypass intersection.",
      "Science City is right at the junction."
    ],
    importantTips: [
      "Show tickets (Space Odyssey, Time Machine, etc.) must be purchased separately inside.",
      "The cable car ride offers a transit between different parts of the park."
    ],
    nearbyAttractions: ["Milan Mela Ground", "Nicco Park"],
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "netaji-bhawan",
    name: "Netaji Bhawan",
    category: "places",
    description: "The ancestral house of Netaji Subhas Chandra Bose, preserved as a memorial hall and research museum showing his life archives.",
    nearestMetro: "Netaji Bhawan",
    distanceFromMetro: "100m (1 min walk)",
    nearestBusStop: "Elgin Road / Netaji Bhawan",
    metroFare: "₹5 - ₹15",
    busFare: "₹10",
    entryFee: "₹50 per person",
    openingTime: "11:00 AM",
    closingTime: "6:00 PM",
    closedDay: "Monday",
    googleMapsUrl: "https://maps.app.goo.gl/3E5dGMXMaJjRt5nT7",
    detailedRoute: [
      "De-board at Netaji Bhawan Metro Station.",
      "Take the Exit Gate towards Elgin Road.",
      "The museum is just a minute's walk away on the left side of the street."
    ],
    importantTips: [
      "See the actual heritage Wanderer car in the driveway that Netaji used for his escape.",
      "Maintain silence in the study room where he worked."
    ],
    nearbyAttractions: ["Forum Mall", "Ashutosh Mukherjee Memorial"],
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "belur-math",
    name: "Belur Math",
    category: "places",
    description: "The headquarters of Ramakrishna Math & Mission founded by Swami Vivekananda, showcasing a unique architectural synthesis of major world religions.",
    nearestMetro: "Dakshineswar",
    distanceFromMetro: "Take ferry across the Hooghly river",
    nearestBusStop: "Belur Math Bus Stop",
    metroFare: "₹5 - ₹30 (metro) + ferry ticket",
    busFare: "₹15",
    entryFee: "Free",
    openingTime: "6:30 AM (11:30 AM close, reopens 3:00 PM)",
    closingTime: "8:30 PM",
    closedDay: "None (Open daily)",
    googleMapsUrl: "https://maps.app.goo.gl/1gHBAvaLmksKz1Uh6",
    detailedRoute: [
      "De-board at Dakshineswar Metro Station.",
      "Walk to the Dakshineswar Ferry Ghat.",
      "Take a scenic 15-minute ferry ride across the river directly to the Belur Math Ghat."
    ],
    importantTips: [
      "Prasada/Bhog coupons are distributed at 10:30 AM daily.",
      "Maintain peace, keep phones switched off or silent, and dress conservatively."
    ],
    nearbyAttractions: ["Dakshineswar Kali Temple (via ferry)"],
    image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=800&q=80"
  }
];

export interface FoodItem {
  id: string;
  name: string;
  category: 'food';
  description: string;
  nearestMetro?: string;
  price?: string;
  googleMapsUrl?: string;
  detailedRoute?: string[];
  importantTips?: string[];
  image: string;
}

export const foodItems: FoodItem[] = [
  {
    id: "chinese-paratha",
    name: "Chinese Paratha, Kochuri Ghugni & Alur Dom",
    category: "food",
    description: "Kolkata's legendary street-style breakfast featuring hot fluffy Kochuris served with thick spicy Ghugni and Dum Aloo.",
    nearestMetro: "Metro Gate No. 4, 5",
    price: "₹7 per piece",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=800&q=80",
    importantTips: [
      "Get there early in the morning (7 AM - 9 AM) for fresh, hot parathas.",
      "Highly budget friendly street food."
    ]
  },
  {
    id: "sorse-posto",
    name: "Sorse Posto Restaurant",
    category: "food",
    description: "A highly-rated authentic Bengali fine-dining restaurant serving signature mustard and poppy seed dishes.",
    nearestMetro: "Kalighat (then take auto or bus)",
    googleMapsUrl: "https://maps.app.goo.gl/hC3CjhTVVBWCPH697",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    detailedRoute: [
      "Get down at Kalighat Metro Station.",
      "Board an auto-rickshaw or bus going towards Gariahat/Southern Avenue.",
      "Get down at the restaurant lane junction."
    ],
    importantTips: [
      "Try the signature Bhetki Paturi (mustard fish steamed in banana leaf) and Alu Posto."
    ]
  },
  {
    id: "bhooter-raja-dilo-bor",
    name: "Bhooter Raja Dilo Bor",
    category: "food",
    description: "A whimsical themed Bengali restaurant named after Satyajit Ray's iconic ghost king character, serving elaborate traditional thalis.",
    nearestMetro: "Kavi Subhash / Garia (then take auto to Jadavpur)",
    googleMapsUrl: "https://maps.app.goo.gl/btBCmaobKdJVAxDz7",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
    detailedRoute: [
      "Get down at Garia metro station.",
      "Take a shared auto going towards Jadavpur 8B bus stand.",
      "Get down near the restaurant landmark."
    ],
    importantTips: [
      "Order their unlimited thali for a complete Bengali feast.",
      "Enjoy the unique interactive ghost voice effects."
    ]
  },
  {
    id: "kolkata-rajbari",
    name: "Kolkata Rajbari",
    category: "food",
    description: "A premium heritage dining spot designed to look like a vintage zamindar mansion, celebrating royal Bengali recipes.",
    googleMapsUrl: "https://maps.app.goo.gl/P43t8joVckWMrjQh8",
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80",
    importantTips: [
      "Perfect for family gatherings and experiencing royal zamindari hospitality."
    ]
  },
  {
    id: "coffee-house",
    name: "Indian Coffee House (College Street)",
    category: "food",
    description: "The historic intellectual hub of Kolkata on College Street, known for its nostalgic high-ceiling layout and Mutton Cutlets.",
    nearestMetro: "Central or MG Road",
    googleMapsUrl: "https://maps.app.goo.gl/cXfH7ZfyvUFmYUbt9",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    detailedRoute: [
      "De-board at Central or MG Road Metro Station.",
      "Walk towards College Street (Boi Para).",
      "Enter the small lane near Albert Hall. The Coffee House is on the first floor."
    ],
    importantTips: [
      "Order their famous Mutton Kabiraji Cutlet and Infusion Coffee.",
      "Best enjoyed with a group of friends for an endless chat (adda)."
    ]
  },
  {
    id: "ujjwal-biryani",
    name: "Ujjwal Dar Biriyani",
    category: "food",
    description: "A highly acclaimed local biryani joint in the Madhyamgram area, famous for its flavorful long grain rice and melt-in-mouth mutton.",
    nearestMetro: "No direct metro (take train from Sealdah)",
    googleMapsUrl: "https://maps.app.goo.gl/42c2kGpVsdVD1TMV8",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    detailedRoute: [
      "Go to Sealdah Railway Station.",
      "Take a local train on the Barasat/Bongaon line and get down at Madhyamgram Station.",
      "Take a short rickshaw to the biryani outlet."
    ],
    importantTips: [
      "The potato in this biryani is highly flavorful and a local favorite."
    ]
  },
  {
    id: "dada-boudi",
    name: "Dada Boudi Biryani (Barrackpore)",
    category: "food",
    description: "Arguably the most famous Biryani in the outskirts of Kolkata, famous for massive mutton portions and rich, ghee-infused aroma.",
    nearestMetro: "No direct metro (take train from Sealdah)",
    googleMapsUrl: "https://maps.app.goo.gl/X4cWTz5EoTyBZE437",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    detailedRoute: [
      "Go to Sealdah Station.",
      "Board a local train bound for Barrackpore.",
      "Get down at Barrackpore Station. The restaurant is right outside the station exit."
    ],
    importantTips: [
      "Expect long wait times on weekends and holidays.",
      "Their mutton piece is massive (usually around 200g) and extremely soft."
    ]
  },
  {
    id: "d-bapi",
    name: "D Bapi Biriyani (Barrackpore)",
    category: "food",
    description: "A major rival to Dada Boudi in Barrackpore, popular for serving a slightly lighter but equally flavorful and aromatic biryani.",
    nearestMetro: "No direct metro (take train from Sealdah)",
    googleMapsUrl: "https://maps.app.goo.gl/wkvBeDkTn1tRrfKc6",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80",
    detailedRoute: [
      "Take a local train from Sealdah to Barrackpore.",
      "Take a cycle rickshaw or walk from the station area towards the D Bapi outlet."
    ],
    importantTips: [
      "A great alternative if the queues at Dada Boudi are too long."
    ]
  },
  {
    id: "putiram-sweets",
    name: "Putiram Sweets (College Street)",
    category: "food",
    description: "A historic sweet shop near College Square, famous for its signature Radhaballavi (lentil-stuffed flatbread) served with sweet and spicy cholar dal.",
    nearestMetro: "Mahatma Gandhi Road (MG Road) / Central",
    googleMapsUrl: "https://maps.google.com/?q=Putiram+Sweets+College+Street+Kolkata",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=800&q=80",
    detailedRoute: [
      "De-board at MG Road Metro Station.",
      "Walk 5-7 minutes towards College Square / Surya Sen Street.",
      "The shop is situated near the Surya Sen Street crossing."
    ],
    importantTips: [
      "Their Radhaballavi is a local legend and sells out quickly in the morning.",
      "Pair your breakfast with their baked rasgulla or sweet curd (Misti Doi)."
    ]
  },
  {
    id: "adi-haridas-modak",
    name: "Adi Haridas Modak (Shyambazar)",
    category: "food",
    description: "A legendary 200-year-old heritage shop in North Kolkata, famous for its traditional hing (asafoetida) kochuri served with alur dom on sal leaves.",
    nearestMetro: "Shyambazar",
    googleMapsUrl: "https://maps.google.com/?q=Adi+Haridas+Modak+Shyambazar+Kolkata",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    detailedRoute: [
      "De-board at Shyambazar Metro Station.",
      "Take Exit 1 towards Shyambazar 5-point crossing.",
      "Walk 5 minutes down Bidhan Sarani towards Fariapukur; the shop is on the left."
    ],
    importantTips: [
      "Best visited between 7:30 AM and 10:00 AM for fresh morning kachoris.",
      "Do try their signature Rabri and traditional sweets."
    ]
  },
  {
    id: "nandalal-ghosh-sons",
    name: "Nandalal Ghosh & Sons (Sukia Street)",
    category: "food",
    description: "A traditional gem in the heart of North Kolkata, highly popular among locals for serving piping hot, thin kochuris with a special flavorful potato curry.",
    nearestMetro: "Girish Park",
    googleMapsUrl: "https://maps.google.com/?q=Nandalal+Ghosh+and+Sons+Sukia+Street+Kolkata",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=800&q=80",
    detailedRoute: [
      "De-board at Girish Park Metro Station.",
      "Walk or take a short rickshaw ride towards Sukia Street (near Manicktola crossing)."
    ],
    importantTips: [
      "Go early (around 7:30 AM) to beat the morning crowd.",
      "They also serve excellent classic Bengali sweets."
    ]
  },
  {
    id: "golbari",
    name: "Golbari (Shyambazar)",
    category: "food",
    description: "The iconic century-old eatery at Shyambazar crossing, legendary for its dark, spicy, and slow-cooked Kosha Mangsho (mutton curry) served with hot roomali rotis.",
    nearestMetro: "Shyambazar",
    googleMapsUrl: "https://maps.app.goo.gl/YeLJmbZ8d7H8qkZE6",
    price: "₹300 - ₹500 for two",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80",
    detailedRoute: [
      "De-board at Shyambazar Metro Station.",
      "Take Exit 1 or Exit 2 towards the Shyambazar 5-Point Crossing.",
      "The shop is located right at the crossing, next to the statue."
    ],
    importantTips: [
      "Their Kosha Mangsho is famously spicy and rich; pair it with Roomali Roti or soft parathas.",
      "Seating space is extremely limited (historically tiny), so most people opt for takeaway."
    ]
  },
  {
    id: "gods-kitchen",
    name: "God's Kitchen (Jadavpur)",
    category: "food",
    description: "A popular hangout spot in Katju Nagar near Jadavpur 8B, known for its pocket-friendly Chinese, North Indian, and Tandoori dishes.",
    nearestMetro: "Mahanayak Uttam Kumar (Tollygunge) - then take auto to Jadavpur 8B",
    googleMapsUrl: "https://maps.app.goo.gl/53TZCszsjvcamv6n8",
    price: "₹300 - ₹500 for two",
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80",
    detailedRoute: [
      "Get down at Mahanayak Uttam Kumar (Tollygunge) Metro Station.",
      "Take a shared auto going towards Jadavpur 8B.",
      "Get down at Jadavpur 8B Bus Stand and walk towards Katju Nagar (near Bijoygarh College)."
    ],
    importantTips: [
      "Nearest Bus Stop: Jadavpur 8B Bus Stand.",
      "Bus Numbers available: 8B, 1A, 24A, 45, 47A, 47B, AC-1, E-1.",
      "Very popular among college students for budget meals."
    ]
  },
  {
    id: "hungry-hub",
    name: "Hungry Hub (Kalibazar)",
    category: "food",
    description: "A popular fast-food eatery located in Kalibazar, well-known for its delicious, budget-friendly Chinese street food and momos.",
    nearestMetro: "Kavi Subhash (Garia)",
    googleMapsUrl: "https://maps.app.goo.gl/mM1jgH4rpfHimyua8",
    price: "₹150 for two",
    image: "",
    detailedRoute: [
      "De-board at Kavi Subhash (Garia) Metro Station.",
      "Take a shared auto-rickshaw going towards Kalibazar.",
      "Get off at Kalibazar (Auto fare: ₹12 per person)."
    ],
    importantTips: [
      "Special Attraction: 10 pieces of delicious Momos for only ₹70!",
      "Perfect for quick, cheap, and tasty evening snacks."
    ]
  },
  {
    id: "potlar-kochuri",
    name: "Potlar Kochuri (Bagbazar)",
    category: "food",
    description: "Legendary street joint in Bagbazar (North Kolkata), famous for serving Sattu (Chatur Kochuri) and Dal Kochuri wrapped in sal leaves with flavorful spicy potato curry.",
    nearestMetro: "Shyambazar / Sovabazar Sutanuti",
    googleMapsUrl: "https://maps.google.com/?q=Potlar+Kochuri+Bagbazar+Kolkata",
    price: "₹10 per plate (2 pieces)",
    image: "",
    detailedRoute: [
      "De-board at Shyambazar Metro Station.",
      "Walk 7 minutes towards Bagbazar Street.",
      "The shop is located at the Bagbazar crossing."
    ],
    importantTips: [
      "Extremely popular in the morning; sells out very fast.",
      "Try their classic Sattu (Chatu) Kochuri."
    ]
  },
  {
    id: "mitra-cafe-sovabazar",
    name: "Mitra Cafe (Sovabazar) - Fish Kochuri",
    category: "food",
    description: "Historic cabin-style restaurant in North Kolkata, famous for Macher Kochuri (Fish Kochuri), Bhetki Macher Kochuri, and standard Fish Fry.",
    nearestMetro: "Sovabazar Sutanuti",
    googleMapsUrl: "https://maps.google.com/?q=Mitra+Cafe+Sovabazar+Kolkata",
    price: "₹45 - ₹65 per piece",
    image: "",
    detailedRoute: [
      "De-board at Sovabazar Sutanuti Metro Station.",
      "Exit towards Sovabazar crossing. The eatery is situated right opposite the metro gate."
    ],
    importantTips: [
      "Order their signature Macher Kochuri (stuffed with spiced fish filling).",
      "Also try the Bhetki Macher Kochuri and standard Fish Fry."
    ]
  },
  {
    id: "tewari-brothers-barabazar",
    name: "Tewari Brothers (Bara Bazar) - Daler Kochuri",
    category: "food",
    description: "Iconic pure-vegetarian outlet, famous for serving authentic, thick, crispy Dal er Kochuri fried in pure ghee.",
    nearestMetro: "Mahatma Gandhi Road (MG Road)",
    googleMapsUrl: "https://maps.google.com/?q=Tewari+Brothers+Bara+Bazar+Kolkata",
    price: "₹20 per piece",
    image: "",
    detailedRoute: [
      "De-board at MG Road Metro Station.",
      "Walk 5 minutes down towards Bara Bazar crossing."
    ],
    importantTips: [
      "Known for pure ghee preparation.",
      "A must-visit for authentic North Indian style Daler Kochuri."
    ]
  },
  {
    id: "jagannath-sweets-sealdah",
    name: "Jagannath Ghosh Sweets (Sealdah)",
    category: "food",
    description: "Highly popular breakfast joint near Sealdah station, serving fresh, hot Hinger Kochuri and sweet Cholar Dal.",
    nearestMetro: "Sealdah",
    googleMapsUrl: "https://maps.google.com/?q=Jagannath+Ghosh+Sweets+Sealdah+Kolkata",
    price: "₹12 per plate (2 pieces)",
    image: "",
    detailedRoute: [
      "Exit at Sealdah Metro Station.",
      "Walk 3 minutes towards Sealdah railway station corridor."
    ],
    importantTips: [
      "The sweet Cholar Dal served with the Kochuri is highly addictive.",
      "Very fast service, perfect for daily commuters."
    ]
  },
  {
    id: "tibetan-delight-elgin",
    name: "Tibetan Delight (Elgin Road) - Momos",
    category: "food",
    description: "A viral hidden gem in Elgin Road, legendary for serving authentic, juicy Tibetan Momos (Chicken & Pork) in a cozy residential lane.",
    nearestMetro: "Netaji Bhavan",
    googleMapsUrl: "https://maps.google.com/?q=Tibetan+Delight+Elgin+Road+Kolkata",
    price: "₹80 - ₹120 per plate",
    image: "",
    detailedRoute: [
      "Get down at Netaji Bhavan Metro Station.",
      "Walk towards Elgin Road (Lala Lajpat Rai Sarani) and enter the lane behind Forum Mall."
    ],
    importantTips: [
      "Their Pork Steam Momos and Fried Momos are highly viral.",
      "Expect a small queue in the evenings."
    ]
  },
  {
    id: "momo-i-am-lake-gardens",
    name: "Momo I Am (Lake Gardens)",
    category: "food",
    description: "Modern viral Himalayan dining spot, famous for its juicy Pork Momo, Chicken T-momo, and spicy schezwan dipping sauce.",
    nearestMetro: "Rabindra Sarobar",
    googleMapsUrl: "https://maps.google.com/?q=Momo+I+Am+Lake+Gardens+Kolkata",
    price: "₹150 - ₹250 per plate",
    image: "",
    detailedRoute: [
      "De-board at Rabindra Sarobar Metro Station.",
      "Take a short auto-rickshaw to Lake Gardens area near the railway station."
    ],
    importantTips: [
      "Try their special Lhasa steamed momos.",
      "A great premium option with beautiful modern seating."
    ]
  },
  {
    id: "chitto-babur-dokan",
    name: "Chitto Babur Dokan (Dacres Lane) - Fish Fry",
    category: "food",
    description: "Legendary food stall in Dacres Lane (James Hickey Sarani), serving crispy Bhetki Fish Fry and hot Chicken Stew.",
    nearestMetro: "Esplanade",
    googleMapsUrl: "https://maps.google.com/?q=Chitto+Babur+Dokan+Dacres+Lane+Kolkata",
    price: "₹80 per piece",
    image: "",
    detailedRoute: [
      "Exit at Esplanade Metro Station.",
      "Walk towards Dacres Lane (James Hickey Sarani). The shop is located in the middle of the narrow food street."
    ],
    importantTips: [
      "Their Bhetki Fish Fry is freshly fried in front of you.",
      "One of the oldest office-para street food hubs."
    ]
  },
  {
    id: "kalika-fry-college-street",
    name: "Kalika Mukhoruchok (College Street) - Fish Fry",
    category: "food",
    description: "A heritage evening snacks counter on College Street, serving iconic crispy Bhetki Fish Fry, Fish Finger, and Mutton Chop.",
    nearestMetro: "Central / MG Road",
    googleMapsUrl: "https://maps.google.com/?q=Kalika+College+Street+Kolkata",
    price: "₹70 per piece",
    image: "",
    detailedRoute: [
      "De-board at Central or MG Road Metro Station.",
      "Walk towards College Street; the shop is located near the Surya Sen Street crossing."
    ],
    importantTips: [
      "Opens only in the evening (after 4:30 PM).",
      "Expect a huge crowd waiting for fresh fries."
    ]
  },
  {
    id: "allen-kitchen-sovabazar",
    name: "Allen Kitchen (Sovabazar) - Special Ghee Fish Cutlet",
    category: "food",
    description: "A 140-year-old heritage eatery near Sovabazar, famous for their unique Bhetki Fish Cutlet fried in pure ghee (Special Ghee Fry).",
    nearestMetro: "Sovabazar Sutanuti",
    googleMapsUrl: "https://maps.google.com/?q=Allen+Kitchen+Sovabazar+Kolkata",
    price: "₹140 per piece",
    image: "",
    detailedRoute: [
      "De-board at Sovabazar Sutanuti Metro Station.",
      "Walk 3 minutes towards Sovabazar crossing. The eatery is situated on the main street."
    ],
    importantTips: [
      "Famous for being fried in pure clarified butter (ghee) which gives it a unique rich flavor.",
      "Historical favorite of royal families."
    ]
  }
];
