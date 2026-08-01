export interface UpcomingMovie {
  id: string;
  name: string;
  language: 'English' | 'Hindi' | 'Bengali' | 'Tamil' | 'Telugu' | 'Malayalam' | 'Kannada';
  genre: string;
  releaseDate: string; // YYYY-MM-DD
  cast: string[];
  description: string;
  image: string;
}

export const upcomingMovies: UpcomingMovie[] = [
  {
    id: "avatar-3",
    name: "Avatar: Fire and Ash",
    language: "English",
    genre: "Sci-Fi / Action / Adventure",
    releaseDate: "2026-12-18",
    cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver", "Kate Winslet"],
    description: "The third installment of James Cameron's Avatar franchise, exploring the aggressive, ash-dwelling volcanic Na'vi clan.",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "avengers-5",
    name: "Avengers: Doomsday",
    language: "English",
    genre: "Action / Sci-Fi / Superhero",
    releaseDate: "2027-05-07",
    cast: ["Robert Downey Jr. (Doctor Doom)", "Pedro Pascal", "Vanessa Kirby", "Joseph Quinn"],
    description: "The Avengers assemble once more to face the universe-ending threat of Doctor Doom, portrayed by Robert Downey Jr.",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "war-2",
    name: "War 2",
    language: "Hindi",
    genre: "Action / Thriller / Spy",
    releaseDate: "2026-08-14",
    cast: ["Hrithik Roshan", "NTR Jr.", "Kiara Advani"],
    description: "Part of the YRF Spy Universe, featuring a high-octane clash between Kabir and a lethal antagonist played by NTR Jr.",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "housefull-5",
    name: "Housefull 5",
    language: "Hindi",
    genre: "Comedy / Drama",
    releaseDate: "2026-10-02",
    cast: ["Akshay Kumar", "Riteish Deshmukh", "Abhishek Bachchan", "Sanjay Dutt"],
    description: "The hilarious ensemble cast returns for another round of misunderstandings, chaos, and laughter on a cruise ship.",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "dev-khadaan",
    name: "Khadaan",
    language: "Bengali",
    genre: "Action / Drama",
    releaseDate: "2026-09-25",
    cast: ["Dev", "Jisshu Sengupta", "Barkha Bisht Sengupta"],
    description: "Set against the backdrop of a coal mine community, depicting the life, struggles, and conflicts of the local coal workers.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "tekka",
    name: "Tekka",
    language: "Bengali",
    genre: "Thriller / Drama",
    releaseDate: "2026-10-11",
    cast: ["Dev", "Rukmini Maitra", "Swastika Mukherjee"],
    description: "Srijit Mukherji's intense thriller revolving around a hostage crisis and a high-stakes investigation in the city.",
    image: "https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "coolie",
    name: "Coolie",
    language: "Tamil",
    genre: "Action / Gangster / Drama",
    releaseDate: "2026-11-20",
    cast: ["Rajinikanth", "Nagarjuna", "Soubin Shahir", "Shruti Haasan"],
    description: "Lokesh Kanagaraj directs superstar Rajinikanth in an action-packed gold smuggling drama with high emotional stakes.",
    image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "thalapathy-69",
    name: "Thalapathy 69",
    language: "Tamil",
    genre: "Action / Political Thriller",
    releaseDate: "2026-10-23",
    cast: ["Vijay", "Bobby Deol", "Pooja Hegde"],
    description: "Hailed as Thalapathy Vijay's final cinema outing before entering full-time politics, directed by H. Vinoth.",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "spirit",
    name: "Spirit",
    language: "Telugu",
    genre: "Action / Crime / Cop",
    releaseDate: "2027-01-15",
    cast: ["Prabhas"],
    description: "Prabhas plays an aggressive, honest police officer in Sandeep Reddy Vanga's highly anticipated dark crime-action drama.",
    image: "https://images.unsplash.com/photo-1542204172-e7052809d852?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "kannappa",
    name: "Kannappa",
    language: "Telugu",
    genre: "Mythology / Fantasy / Epic",
    releaseDate: "2026-09-04",
    cast: ["Vishnu Manchu", "Mohanlal", "Prabhas", "Akshay Kumar"],
    description: "An epic adaptation of the life of Bhakta Kannappa, a devout follower of Lord Shiva, featuring superstars in cameo roles.",
    image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "empuraan-l2",
    name: "L2: Empuraan",
    language: "Malayalam",
    genre: "Action / Crime / Drama",
    releaseDate: "2026-12-25",
    cast: ["Mohanlal", "Prithviraj Sukumaran", "Manju Warrier", "Tovino Thomas"],
    description: "The sequel to the blockbuster Lucifer, charting Stephen Nedumpally's rise to international underworld power.",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "toxic",
    name: "Toxic: A Fairy Tale for Grown-ups",
    language: "Kannada",
    genre: "Action / Crime / Thriller",
    releaseDate: "2026-11-13",
    cast: ["Yash", "Nayanthara", "Kiara Advani"],
    description: "Set against the drug cartel networks of coastal regions, featuring Yash in a stylized action thriller directed by Geetu Mohandas.",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80"
  }
];
