'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Alert,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { fetchWithAuth, clearTokens } from "../lib/auth";

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

interface Solution {
  id: string;
  solution_id: string;
  title: string;
  description: string;
}

interface ProfileData {
  user_id: string;
  username: string;
  is_premium: boolean;
  paypal_subscription_id?: string;
  health_concerns: string[];
  submitted_solutions: Solution[];
  favorite_solutions: Solution[];
  interactions_count: number;
}

export default function Profile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [healthConcerns, setHealthConcerns] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetchWithAuth("http://localhost:5000/api/user-profile");
        if (!res.ok) throw new Error("Not logged in");
        const data = await res.json();
        setProfile(data);
        setHealthConcerns(data.health_concerns || []);
      } catch (err) {
        setErrorMessage("Please log in to view your profile.");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [router]);

  const handleHealthConcernChange = (concern: string) => {
    setHealthConcerns((prev) =>
      prev.includes(concern)
        ? prev.filter((c) => c !== concern)
        : [...prev, concern]
    );
  };

  const handleHealthConcernsSubmit = async () => {
    if (!profile) return;
    try {
      const res = await fetchWithAuth("http://localhost:5000/api/user-profile", {
        method: "POST",
        body: JSON.stringify({ health_concerns: healthConcerns }),
      });
      if (!res.ok) throw new Error("Failed to update health concerns");
      setProfile({ ...profile, health_concerns: healthConcerns });
      setErrorMessage("");
      alert("Health concerns updated successfully!");
    } catch (err:any) {
      setErrorMessage("Failed to update health concerns: " + err.message);
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
        router.push("/login");
      } else {
        throw new Error("Logout failed");
      }
    } catch (err: any) {
      setErrorMessage("Error logging out: " + err.message);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Profile
      </Typography>
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}
      {profile && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6">Username: {profile.username}</Typography>
          <Typography variant="body1">
            Premium: {profile.is_premium ? "Yes" : "No"}
          </Typography>
          {profile.paypal_subscription_id && (
            <Typography variant="body2">
              Subscription ID: {profile.paypal_subscription_id}
            </Typography>
          )}
          <Typography variant="body1">
            Solutions Submitted: {profile.submitted_solutions?.length}
          </Typography>
          <Typography variant="body1">
            Solutions Favorited: {profile.favorite_solutions?.length}
          </Typography>
          <Typography variant="body1">
            Interactions: {profile.interactions_count}
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Your Health Concerns</Typography>
            <FormGroup>
              {healthConcernsList.map((concern) => (
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
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            sx={{ mt: 2 }}
          >
            Logout
          </Button>
        </Box>
      )}
      <Typography variant="h5" gutterBottom>
        Your Submitted Solutions
      </Typography>
      {profile?.submitted_solutions?.length ? (
        <Grid container spacing={4}>
          {profile?.submitted_solutions.map((solution) => (
            <Grid  size={6} key={solution.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    {solution.title} ({solution.solution_id})
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {solution.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No solutions submitted yet.</Typography>
      )}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Favorite Solutions
      </Typography>
      {profile?.favorite_solutions?.length ? (
        <Grid container spacing={4}>
          {profile?.favorite_solutions?.map((solution) => (
            <Grid  size={6} key={solution.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    {solution.title} ({solution.solution_id})
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {solution.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No favorite solutions yet.</Typography>
      )}
    </Container>
  );
}