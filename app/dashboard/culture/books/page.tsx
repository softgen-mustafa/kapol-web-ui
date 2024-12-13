"use client";
import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Alert, Grid2 } from "@mui/material";
import BooksCard from "@/app/components/bookscard";
import ramayana from "@/app/assets/culture/ramayana.png";
import mahabharat from "@/app/assets/culture/mahabharat.png";
import shivaPurana from "@/app/assets/culture/ShivaPurana.png";
import upanishads from "@/app/assets/culture/Upanishads.png";
import mahabharat2 from "@/app/assets/culture/mahabharta2.png";
import rama from "@/app/assets/culture/rama.png";



import theme from "@/app/theme";

const Books = () => {
  const [bookList, setBookList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Dummy book data
  const dummyBooks = [

    
    {
      id: 1,
      title: "Shreemad Bhagavad Gita",
      author: "Vyasa ",
      genre: "Hindu Philosophy",
      coverImage: mahabharat ,
      year: 2000,

      description:
        "One of the longest epics, detailing the story of the Kurukshetra War between the Pandavas and the Kauravas, and exploring themes of dharma, righteousness, and the human condition.",
    },
    {
      id: 2,
      title: "Shiva Purana",
      author: "Vyasa",
      genre: "Hindu Epic",
      year: 4000,
      coverImage: shivaPurana,
      description:
        "A Purana dedicated to Lord Shiva, describing his divine feats, cosmic role, and teachings. It presents an alternative focus from the *Ramayana*, emphasizing Lord Shiva's significance.",
    },
    {
      id: 3,
      title: "Mahabharat (Gujarati Translation)",
      author: "Vyasa ",
      genre: "Epic",
      year: 5000, // Approximate date of the original Mahabharata
      coverImage: mahabharat2,
      description:
        "The great Indian epic, translated into Gujarati, narrating the story of the Kurukshetra War and the fates of the Kauravas and Pandavas.",
    },
    {
      id: 4,
      title: "Ramcharitmanas ",
      author: "Tulsidas ",
      genre: "Devotional Poem",
      year: 1600,
      coverImage: ramayana ,
      description:
        "A devotional retelling of the Ramayana by Tulsidas in Gujarati, focused on Lord Rama's life and virtues. It is a significant text in the Hindu devotional tradition, particularly in Gujarat.",
    },
    {
      id: 5,
      title: "Bhakt Chintamani",
      author: "Narsinh Mehta",
      genre: "Devotional Poetry",
      year: 1500,
      coverImage: rama,
      description:
        "A collection of devotional songs and poems by the famous Gujarati saint and poet Narsinh Mehta, dedicated to Lord Krishna. His hymns are an integral part of Gujarat's religious culture.",
    },
    {
      id: 6,
      title: "Gnaneshwari",
      author: "Sant Dnyaneshwar",
      genre: "Philosophical Commentary",
      year: 1290,
      coverImage: ramayana,
      description:
        "A commentary on the Bhagavad Gita in Marathi, widely respected in Maharashtra. It presents the teachings of the Gita in a simple, poetic form, making it accessible to the common people.",
    },
    {
      id: 7,
      title: "Tirukkural",
      author: "Thiruvalluvar",
      genre: "Tamil Literature",
      year: 500, // Approximate date of original text
      coverImage: mahabharat ,
      description:
        "An ancient Tamil text on ethics and morality, with teachings on virtue, wealth, and love. The Tirukkural is highly revered in Tamil culture and known for its universal wisdom.",
    },
    {
      id: 8,
      title: "Akhil Bharatiya Sant Vani",
      author: "Various Saints",
      genre: "Devotional Poetry",
      year: 1700,
      coverImage: shivaPurana,
      description:
        "A compilation of devotional verses from saints across India, such as Kabir, Mirabai, and Tulsidas, offering spiritual guidance and expressing profound devotion.",
    },
    {
      id: 9,
      title: "Upanishads",
      author: "Various Sages",
      genre: "Philosophical Scripture",
      year: 800, // Approximate date of the oldest Upanishads
      coverImage: upanishads,
      description:
        "Ancient Indian texts that explore the nature of reality, self, and the universe, forming the core of Hindu philosophy. They are revered as highly philosophical and spiritual scriptures.",
    },
    {
      id: 10,
      title: "Markandeya Purana",
      author: "Vyasa",
      genre: "Hindu Mythology",
      year: 2000,
      coverImage: rama,
      description:
       "A Purana that narrates the stories of Lord Shiva and other deities, including tales of the goddess Durga, emphasizing cosmic order and moral principles similar to the *Ramayana*.",
    },
  ];

  useEffect(() => {
    // Simulate a loading state with dummy data
    setLoading(true);
    setTimeout(() => {
      setBookList(dummyBooks);
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: "#FFF8F0",
        minHeight: "100vh",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {/* Page Title */}
        <Typography
          fontSize={{ xs: 20, md: 24 }}
          fontWeight={600}
          variant="h4"
          sx={{
            marginBottom: { xs: 1, md: 2 },
            color: theme.palette.primary.light,
          }}
        >
          Books Collection
        </Typography>
      </Box>

      {/* Loading Spinner */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Error Handling */}
      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {/* Books Grid */}
      {!loading && !error && bookList.length > 0 && (
        <Grid2 container spacing={3}>
          {bookList.map((book: any) => (
            <Grid2
              size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}
              key={book.id}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <BooksCard
                coverImage={book.coverImage}
                title={book.title}
                author={book.author}
                genre={book.genre}
                year={book.year}
                id={book.id}
                description={book.description}
                filePath={""}
              />
            </Grid2>
          ))}
        </Grid2>
      )}

      {/* No Books Message */}
      {!loading && !error && bookList.length === 0 && (
        <Typography
          variant="body1"
          color="textSecondary"
          align="center"
          sx={{ mt: 4 }}
        >
          No books available. Please try again later.
        </Typography>
      )}
    </Box>
  );
};

export default Books;
