'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  TextField,
  Box,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
  Rating,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { GiHerbsBundle, GiMeditation, GiHealthPotion } from "react-icons/gi";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import TestimonialCard from "../components/TestimonialCard";
import { fetchWithAuth, clearTokens } from "../lib/auth";

const paypalClientId = "AXBL_2Bz7P3ArXfpL-gwlNjeXwz38eiNCrvTfrUA5efGicHbISs-ZHAW7c3q7iNzwQAFxD3HQczoXIKA";

interface Solution {
  id: string;
  solution_id: string;
  title: string;
  description: string;
  date: string;
  affiliate_link?: string;
  is_premium: boolean;
  categories: { id: string; name: string }[];
  comments: { id: string; user: string; text: string; created_at: string }[];
  favorited: boolean;
}

const healthConcernsList = [
  "Digestive Issues (Indigestion, Bloating, Acidity)",
  "Stress and Anxiety",
  "Sleep Problems (Insomnia)",
  "Joint Pain and Inflammation",
  "Skin Issues (Acne, Eczema, Dryness)",
  "Weak Immunity",
  "High Blood Pressure (Hypertension)",
  "Diabetes (Madhumeha)",
  "Respiratory Issues (Asthma, Bronchitis, Allergies)",
  "Hair Fall and Thinning",
  "Fatigue and Low Energy",
];

export default function Dashboard() {
  const [submitTitle, setSubmitTitle] = useState<string>("");
  const [submitDescription, setSubmitDescription] = useState<string>("");
  const [submittedSolutions, setSubmittedSolutions] = useState<Solution[]>([]);
  const [filteredSolutions, setFilteredSolutions] = useState<Solution[]>([]);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [isLoadingSolutions, setIsLoadingSolutions] = useState<boolean>(true);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const [contactName, setContactName] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [contactMessage, setContactMessage] = useState<string>("");

  const [recommendedSolution, setRecommendedSolution] = useState<Solution | null>(
    null
  );
  const [recommendationReason, setRecommendationReason] = useState<string>("");
  const [isLoadingRecommendation, setIsLoadingRecommendation] =
    useState<boolean>(true);

  const [expandedSolution, setExpandedSolution] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("anonymous");
  const [commentText, setCommentText] = useState<string>("");
  const [healthConcerns, setHealthConcerns] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetchWithAuth("http://localhost:5000/api/user-profile");
        if (!res.ok) throw new Error("Not authenticated");
        const data = await res.json();
        setIsLoggedIn(true);
        setIsPremium(data.is_premium);
        setUserId(data.user_id);
        setHealthConcerns(data.health_concerns || []);
      } catch (err: any) {
        setIsLoggedIn(false);
        setUserId("anonymous");
        setHealthConcerns([]);
        router.push("/login");
      }
    };

    const fetchSolutions = async () => {
      try {
        const res = await fetchWithAuth("http://localhost:5000/api/solutions");
        if (!res.ok) throw new Error("Failed to fetch solutions");
        const data = await res.json();
        setSubmittedSolutions(data);
        setFilteredSolutions(data);
      } catch (err: any) {
        setErrorMessage("Could not load solutions: " + err.message);
      } finally {
        setIsLoadingSolutions(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (err: any) {
        setErrorMessage("Could not load categories: " + err.message);
      }
    };

    const fetchRecommendation = async () => {
      if (userId === "anonymous") {
        setIsLoadingRecommendation(false);
        return;
      }
      try {
        const res = await fetchWithAuth(
          `http://localhost:5000/api/recommend/${userId}`
        );
        if (!res.ok) throw new Error("Failed to fetch recommendation");
        const data = await res.json();
        setRecommendedSolution(data);
        if (healthConcerns.length > 0 && data.title && healthConcerns.includes(data.title)) {
          setRecommendationReason(`Based on your concern: ${data.title}`);
        } else if (data.categories?.length > 0) {
          setRecommendationReason(
            `Based on your interest in ${data.categories[0].name}`
          );
        } else {
          setRecommendationReason("Curated for you");
        }
      } catch (err: any) {
        setErrorMessage("Could not load recommendation: " + err.message);
      } finally {
        setIsLoadingRecommendation(false);
      }
    };

    checkAuth();
    fetchSolutions();
    fetchCategories();
    fetchRecommendation();
  }, [userId, healthConcerns, router]);

  useEffect(() => {
    const filtered = submittedSolutions.filter(
      (solution) =>
        (solution.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          solution.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase())) &&
        (isPremium || !solution.is_premium) &&
        (selectedCategory === "all" ||
          solution.categories.some((cat) => cat.name === selectedCategory))
    );
    setFilteredSolutions(filtered);
  }, [searchQuery, submittedSolutions, isPremium, selectedCategory]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setErrorMessage("Please log in to submit solutions.");
      return;
    }
    const newSolution = { title: submitTitle, description: submitDescription };
    try {
      const res = await fetchWithAuth("http://localhost:5000/api/solutions", {
        method: "POST",
        body: JSON.stringify(newSolution),
      });
      if (!res.ok) throw new Error("Failed to submit solution");
      const data = await res.json();
      setSubmittedSolutions([data, ...submittedSolutions]);
      setFilteredSolutions([data, ...filteredSolutions]);
      setSubmitTitle("");
      setSubmitDescription("");
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 1500);
    } catch (err: any) {
      setErrorMessage("Failed to submit solution: " + err.message);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const contactData = {
      name: contactName,
      email: contactEmail,
      message: contactMessage,
    };
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });
      if (!res.ok) throw new Error("Failed to send message");
      setContactName("");
      setContactEmail("");
      setContactMessage("");
      alert("Message sent successfully!");
    } catch (err: any) {
      setErrorMessage("Failed to send message: " + err.message);
    }
  };

  const handleHealthConcernsSubmit = async () => {
    if (!isLoggedIn) {
      setErrorMessage("Please log in to save health concerns.");
      return;
    }
    try {
      const res = await fetchWithAuth("http://localhost:5000/api/user-profile", {
        method: "POST",
        body: JSON.stringify({ health_concerns: healthConcerns }),
      });
      if (!res.ok) throw new Error("Failed to update health concerns");
      setErrorMessage("");
      alert("Health concerns updated successfully!");
      const recRes = await fetchWithAuth(
        `http://localhost:5000/api/recommend/${userId}`
      );
      if (recRes.ok) {
        const data = await recRes.json();
        setRecommendedSolution(data);
        setRecommendationReason(
          `Based on your concern: ${healthConcerns[0] || data.title}`
        );
      }
    } catch (err: any) {
      setErrorMessage("Failed to update health concerns: " + err.message);
    }
  };

  const handleHealthConcernChange = (concern: string) => {
    setHealthConcerns((prev) =>
      prev.includes(concern)
        ? prev.filter((c) => c !== concern)
        : [...prev, concern]
    );
  };

  const trackView = async (solutionId: string, rating?: number) => {
    if (!isLoggedIn) return;
    try {
      const interaction = {
        user_id: userId,
        solution: solutionId,
        action: "view",
        rating,
      };
      const res = await fetchWithAuth("http://localhost:5000/api/interactions", {
        method: "POST",
        body: JSON.stringify(interaction),
      });
      if (!res.ok) throw new Error("Failed to track view");
      const recRes = await fetchWithAuth(
        `http://localhost:5000/api/recommend/${userId}`
      );
      if (!recRes.ok) throw new Error("Failed to refresh recommendation");
      const data = await recRes.json();
      setRecommendedSolution(data);
      setRecommendationReason(
        healthConcerns.includes(data.title)
          ? `Based on your concern: ${data.title}`
          : `Based on your recent activity`
      );
    } catch (err: any) {
      setErrorMessage("Failed to track interaction: " + err.message);
    }
  };

  const handleFavorite = async (solutionId: string, favorited: boolean) => {
    if (!isLoggedIn) {
      setErrorMessage("Please log in to favorite solutions.");
      return;
    }
    try {
      const method = favorited ? "DELETE" : "POST";
      const res = await fetchWithAuth(
        `http://localhost:5000/api/favorite/${solutionId}`,
        { method }
      );
      if (!res.ok) throw new Error("Failed to update favorite");
      setSubmittedSolutions(
        submittedSolutions?.map((s) =>
          s.id === solutionId ? { ...s, favorited: !favorited } : s
        )
      );
      setFilteredSolutions(
        filteredSolutions?.map((s) =>
          s.id === solutionId ? { ...s, favorited: !favorited } : s
        )
      );
      if (recommendedSolution?.id === solutionId)
        setRecommendedSolution({
          ...recommendedSolution,
          favorited: !favorited,
        });
    } catch (err: any) {
      setErrorMessage("Failed to update favorite: " + err.message);
    }
  };

  const handleComment = async (solutionId: string) => {
    if (!isLoggedIn) {
      setErrorMessage("Please log in to comment.");
      return;
    }
    try {
      const res = await fetchWithAuth("http://localhost:5000/api/comments", {
        method: "POST",
        body: JSON.stringify({ solution: solutionId, text: commentText }),
      });
      if (!res.ok) throw new Error("Failed to add comment");
      const newComment = await res.json();
      setSubmittedSolutions(
        submittedSolutions?.map((s) =>
          s.id === solutionId
            ? { ...s, comments: [...s.comments, newComment] }
            : s
        )
      );
      setFilteredSolutions(
        filteredSolutions?.map((s) =>
          s.id === solutionId
            ? { ...s, comments: [...s.comments, newComment] }
            : s
        )
      );
      if (recommendedSolution?.id === solutionId)
        setRecommendedSolution({
          ...recommendedSolution,
          comments: [...recommendedSolution.comments, newComment],
        });
      setCommentText("");
    } catch (err: any) {
      setErrorMessage("Failed to add comment: " + err.message);
    }
  };

  const handleLogout = async () => {
    try {
      const refresh = localStorage.getItem("refresh_token");
      const res = await fetchWithAuth("http://localhost:5000/api/auth/logout", {
        method: "POST",
        body: JSON.stringify({ refresh }),
      });
      if (res.ok) {
        clearTokens();
        setIsLoggedIn(false);
        setIsPremium(false);
        setUserId("anonymous");
        setHealthConcerns([]);
        router.push("/login");
      }
    } catch (err: any) {
      setErrorMessage("Error logging out: " + err.message);
    }
  };

  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <PayPalScriptProvider options={{ "clientId": paypalClientId }}>
      <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
        <AppBar
          position="sticky"
          sx={{
            bgcolor: isScrolled ? "#388e3c" : "transparent",
            boxShadow: isScrolled ? 4 : 0,
          }}
        >
          <Toolbar sx={{ maxWidth: "1280px", mx: "auto", width: "100%" }}>
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, color: isScrolled ? "white" : "#388e3c" }}
            >
              Ayurvedic Solutions
            </Typography>
            {["Dashboard", "Submit", "Solutions", "About", "Contact"]?.map(
              (item) => (
                <Button
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  sx={{ color: isScrolled ? "white" : "#388e3c" }}
                >
                  {item}
                </Button>
              )
            )}
            <Button
              href="/profile"
              sx={{ color: isScrolled ? "white" : "#388e3c" }}
            >
              Profile
            </Button>
            <Button
              onClick={handleLogout}
              sx={{ color: isScrolled ? "white" : "#388e3c" }}
            >
              Logout
            </Button>
            {!isPremium && (
              <Button sx={{ color: "#ffca28" }}>
                Go Premium
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  createSubscription={(data, actions) =>
                    actions.subscription.create({
                      plan_id: "YOUR_PAYPAL_PLAN_ID",
                    })
                  }
                  onApprove={async (data) => {
                    const res = await fetchWithAuth(
                      "http://localhost:5000/api/user-profile",
                      {
                        method: "POST",
                        body: JSON.stringify({
                          paypal_subscription_id: data.subscriptionID,
                        }),
                      }
                    );
                    const profileData = await res.json();
                    setIsPremium(true);
                    setUserId(profileData.user_id);
                  }}
                />
              </Button>
            )}
          </Toolbar>
        </AppBar>

        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Alert
                severity="error"
                sx={{
                  position: "fixed",
                  top: 80,
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 1300,
                }}
              >
                {errorMessage}
                <IconButton
                  color="inherit"
                  size="small"
                  onClick={() => setErrorMessage("")}
                >
                  X
                </IconButton>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <Container
          id="dashboard"
          sx={{ py: 10, textAlign: "center", bgcolor: "#e8f5e9" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h3"
              sx={{ color: "#388e3c", fontWeight: "bold", mb: 2 }}
            >
              Your Ayurvedic Dashboard
            </Typography>
            <Typography
              variant="h6"
              color="textSecondary"
              sx={{ mb: 4, maxWidth: "600px", mx: "auto" }}
            >
              Explore and share natural remedies tailored to your health needs.
            </Typography>
            <Box sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Tell us about your health concerns
              </Typography>
              <FormGroup>
                {healthConcernsList?.map((concern) => (
                  <FormControlLabel
                    key={concern}
                    control={
                      <Checkbox
                        checked={healthConcerns.includes(concern)}
                        onChange={() => handleHealthConcernChange(concern)}
                      />
                    }
                    label={concern}
                  />
                ))}
              </FormGroup>
              <Button
                variant="contained"
                sx={{ bgcolor: "#388e3c", mt: 2 }}
                onClick={handleHealthConcernsSubmit}
              >
                Save Concerns
              </Button>
            </Box>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
              <Button
                variant="contained"
                sx={{ bgcolor: "#388e3c" }}
                size="large"
                href="#submit"
              >
                Submit Your Solution
              </Button>
              <Button
                variant="outlined"
                sx={{ borderColor: "#388e3c", color: "#388e3c" }}
                size="large"
                href="#solutions"
              >
                Explore Solutions
              </Button>
            </Box>
          </motion.div>
        </Container>

        <Container sx={{ py: 8 }}>
          {isLoadingRecommendation ? (
            <CircularProgress />
          ) : recommendedSolution ? (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h4"
                sx={{ color: "#388e3c", textAlign: "center", mb: 4 }}
              >
                Recommended for You
              </Typography>
              <Typography
                variant="body1"
                sx={{ textAlign: "center", mb: 2, color: "#388e3c" }}
              >
                {recommendationReason}
              </Typography>
              <Card sx={{ maxWidth: 600, mx: "auto" }}>
               
                <CardContent>
                  <Typography variant="h5">
                    {recommendedSolution.title} ({recommendedSolution.solution_id}
                    )
                  </Typography>
                  <List>
                    {recommendedSolution.description
                      .split("\n")
                      ?.map((item, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={item} />
                        </ListItem>
                      ))}
                  </List>
                  <Box sx={{ mt: 2 }}>
                    {recommendedSolution.categories?.map((cat) => (
                      <Chip key={cat.id} label={cat.name} sx={{ mr: 1 }} />
                    ))}
                  </Box>
                  {recommendedSolution.comments?.map((comment) => (
                    <Box key={comment.id} sx={{ mt: 1 }}>
                      <Typography variant="body2">
                        {comment.user}: {comment.text}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {new Date(comment.created_at).toLocaleString()}
                      </Typography>
                    </Box>
                  ))}
                  {isLoggedIn && (
                    <Box sx={{ mt: 2 }}>
                      <TextField
                        label="Add Comment"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        fullWidth
                        multiline
                        rows={2}
                      />
                      <Button
                        onClick={() => handleComment(recommendedSolution.id)}
                        sx={{ mt: 1 }}
                      >
                        Post
                      </Button>
                    </Box>
                  )}
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between" }}>
                  <Rating
                    value={null}
                    onChange={(_, value) =>
                      value && trackView(recommendedSolution.id, value)
                    }
                    precision={1}
                  />
                  <IconButton
                    onClick={() =>
                      handleFavorite(
                        recommendedSolution.id,
                        recommendedSolution.favorited
                      )
                    }
                  >
                    {recommendedSolution.favorited ? (
                      <FavoriteIcon color="error" />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                </CardActions>
              </Card>
            </motion.div>
          ) : null}
        </Container>

        <Container sx={{ py: 8, bgcolor: "#fff8e1" }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h4"
              sx={{ color: "#ffca28", textAlign: "center", mb: 4 }}
            >
              Ayurvedic Principles
            </Typography>
            <Grid container spacing={4}>
              {[
                {
                  icon: <GiHerbsBundle size={50} color="#388e3c" />,
                  title: "Natural Remedies",
                  desc: "Harness the power of herbs.",
                },
                {
                  icon: <GiMeditation size={50} color="#ffca28" />,
                  title: "Holistic Approach",
                  desc: "Balance mind, body, and spirit.",
                },
                {
                  icon: <GiHealthPotion size={50} color="#388e3c" />,
                  title: "Preventive Care",
                  desc: "Maintain health daily.",
                },
              ]?.map((principle, index) => (
                <Grid  size={4} key={index}>
                  <Card sx={{ textAlign: "center", p: 2 }}>
                    <CardContent>
                      {principle.icon}
                      <Typography variant="h6" sx={{ mt: 2 }}>
                        {principle.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {principle.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>

        <Container id="submit" sx={{ py: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h4"
              sx={{ color: "#388e3c", textAlign: "center", mb: 4 }}
            >
              Share Your Ayurvedic Solution
            </Typography>
            <Card sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Title"
                  value={submitTitle}
                  onChange={(e) => setSubmitTitle(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Description"
                  value={submitDescription}
                  onChange={(e) => setSubmitDescription(e.target.value)}
                  fullWidth
                  margin="normal"
                  multiline
                  rows={6}
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ bgcolor: "#388e3c", mt: 2 }}
                  fullWidth
                >
                  Submit Solution
                </Button>
              </form>
            </Card>
            <AnimatePresence>
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <Alert
                    severity="success"
                    sx={{ mt: 2, mx: "auto", maxWidth: 600 }}
                  >
                    Solution submitted successfully!
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </Container>

        <Container id="solutions" sx={{ py: 8, bgcolor: "#fff8e1" }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h4"
              sx={{ color: "#ffca28", textAlign: "center", mb: 4 }}
            >
              All Ayurvedic Solutions
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
              <TextField
                label="Search Solutions"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ mr: 2, width: 300 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <FormControl sx={{ width: 200 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <MenuItem value="all">All</MenuItem>
                  {categories?.map((cat) => (
                    <MenuItem key={cat.id} value={cat.name}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            {isLoadingSolutions ? (
              <CircularProgress />
            ) : filteredSolutions.length === 0 ? (
              <Typography variant="body1" color="textSecondary" align="center">
                No solutions match your search.
              </Typography>
            ) : (
              <Grid container spacing={4}>
                {filteredSolutions?.map((solution) => (
                  <Grid  size={4} key={solution.id}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="200"
                        image={`/images/${solution.title
                          .toLowerCase()
                          .replace(/\s+/g, "-")}.jpg`}
                        alt={solution.title}
                        onError={(e) =>
                          (e.currentTarget.src = "/images/default-ayurveda.jpg")
                        }
                      />
                      <CardContent>
                        <Typography variant="h6">
                          {solution.title} ({solution.solution_id})
                        </Typography>
                        <AnimatePresence>
                          {expandedSolution === solution.id ? (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                            >
                              <List>
                                {solution.description
                                  .split("\n")
                                  ?.map((item, index) => (
                                    <ListItem key={index}>
                                      <ListItemText primary={item} />
                                    </ListItem>
                                  ))}
                              </List>
                              <Box sx={{ mt: 1 }}>
                                {solution.categories?.map((cat) => (
                                  <Chip
                                    key={cat.id}
                                    label={cat.name}
                                    sx={{ mr: 1 }}
                                  />
                                ))}
                              </Box>
                              {solution.comments?.map((comment) => (
                                <Box key={comment.id} sx={{ mt: 1 }}>
                                  <Typography variant="body2">
                                    {comment.user}: {comment.text}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    color="textSecondary"
                                  >
                                    {new Date(comment.created_at).toLocaleString()}
                                  </Typography>
                                </Box>
                              ))}
                              {isLoggedIn && (
                                <Box sx={{ mt: 2 }}>
                                  <TextField
                                    label="Add Comment"
                                    value={commentText}
                                    onChange={(e) =>
                                      setCommentText(e.target.value)
                                    }
                                    fullWidth
                                    multiline
                                    rows={2}
                                  />
                                  <Button
                                    onClick={() => handleComment(solution.id)}
                                    sx={{ mt: 1 }}
                                  >
                                    Post
                                  </Button>
                                </Box>
                              )}
                            </motion.div>
                          ) : (
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                              }}
                            >
                              {solution.description.split("\n")[0]}
                            </Typography>
                          )}
                        </AnimatePresence>
                      </CardContent>
                      <CardActions sx={{ justifyContent: "space-between" }}>
                        <Button
                          size="small"
                          onClick={() =>
                            setExpandedSolution(
                              expandedSolution === solution.id
                                ? null
                                : solution.id
                            )
                          }
                        >
                          {expandedSolution === solution.id
                            ? "Show Less"
                            : "Read More"}
                        </Button>
                        <Box>
                          <Rating
                            value={null}
                            onChange={(_, value) =>
                              value && trackView(solution.id, value)
                            }
                            precision={1}
                          />
                          <IconButton
                            onClick={() =>
                              handleFavorite(solution.id, solution.favorited)
                            }
                          >
                            {solution.favorited ? (
                              <FavoriteIcon color="error" />
                            ) : (
                              <FavoriteBorderIcon />
                            )}
                          </IconButton>
                        </Box>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </motion.div>
        </Container>

        <Container id="about" sx={{ py: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h4"
              sx={{ color: "#388e3c", textAlign: "center", mb: 4 }}
            >
              About Us
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              align="center"
              sx={{ maxWidth: "800px", mx: "auto" }}
            >
              Ayurvedic Solutions is a community-driven platform dedicated to
              sharing the timeless wisdom of Ayurveda.
            </Typography>
          </motion.div>
        </Container>

        <Container sx={{ py: 8, bgcolor: "#fff8e1" }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h4"
              sx={{ color: "#ffca28", textAlign: "center", mb: 4 }}
            >
              Success Stories
            </Typography>
            <Grid container spacing={4}>
              <Grid size={6}>
                <TestimonialCard
                  quote="Transformed my health!"
                  author="Sarah Johnson"
                  role="Yoga Instructor"
                />
              </Grid>
              <Grid size={6}>
                <TestimonialCard
                  quote="Natural remedies that work!"
                  author="Raj Patel"
                  role="Nutritionist"
                />
              </Grid>
            </Grid>
          </motion.div>
        </Container>

        <Container id="contact" sx={{ py: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h4"
              sx={{ color: "#388e3c", textAlign: "center", mb: 4 }}
            >
              Contact Us
            </Typography>
            <Card sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
              <form onSubmit={handleContactSubmit}>
                <TextField
                  label="Name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Email"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="Message"
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  fullWidth
                  margin="normal"
                  multiline
                  rows={6}
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ bgcolor: "#388e3c", mt: 2 }}
                  fullWidth
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>
        </Container>

        <Box
          sx={{ bgcolor: "#388e3c", color: "white", p: 4, textAlign: "center" }}
        >
          <Typography variant="body2">
            © 2025 Ayurvedic Solutions. All rights reserved.
          </Typography>
          <Box
            sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 2 }}
          >
            {["About", "Contact", "Privacy"]?.map((item) => (
              <Button
                key={item}
                href={`#${item.toLowerCase()}`}
                sx={{ color: "white" }}
              >
                {item}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>
    </PayPalScriptProvider>
  );
}