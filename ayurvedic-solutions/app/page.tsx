'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
  IconButton,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GiHerbsBundle, 
  GiMeditation, 
  GiHealthPotion,
  GiSandsOfTime,
  GiHealing,
  GiWeight
} from "react-icons/gi";
import { 
  FaLeaf,
  FaUserMd,
  FaHeart,
  FaRegClock,
  FaArrowRight,
  FaBars
} from "react-icons/fa";
import TestimonialCard from "./components/TestimonialCard";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, []);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const testimonials = [
    {
      quote: "After years of digestive issues, Ayurvedic Solutions helped me find natural remedies that actually work. My gut health has never been better!",
      author: "Sarah Johnson",
      role: "Yoga Instructor",
      avatar: "/avatars/sarah.jpg"
    },
    {
      quote: "The personalized recommendations transformed my sleep quality. I wake up refreshed after decades of insomnia. This platform is a game-changer!",
      author: "Michael Chen",
      role: "Software Engineer",
      avatar: "/avatars/michael.jpg"
    },
    {
      quote: "As an Ayurvedic practitioner, I love sharing my knowledge with this community. The engagement and results I see are truly rewarding.",
      author: "Dr. Priya Sharma",
      role: "Ayurvedic Doctor",
      avatar: "/avatars/priya.jpg"
    }
  ];

  const features = [
    { icon: <GiHealing className="text-green-600 text-4xl" />, title: "Personalized Remedies", desc: "Get solutions tailored to your dosha type" },
    { icon: <FaUserMd className="text-yellow-500 text-4xl" />, title: "Expert Verified", desc: "Reviewed by certified practitioners" },
    { icon: <FaRegClock className="text-green-600 text-4xl" />, title: "Daily Routines", desc: "Discover dinacharya practices" },
    { icon: <FaLeaf className="text-yellow-500 text-4xl" />, title: "Seasonal Guides", desc: "Adapt with ritucharya recommendations" }
  ];

  const healthConcerns = [
    { name: "Digestive Issues", icon: <GiHealthPotion /> },
    { name: "Stress & Anxiety", icon: <GiMeditation /> },
    { name: "Skin Problems", icon: <FaHeart /> },
    { name: "Weight Management", icon: <GiWeight /> },
    { name: "Chronic Fatigue", icon: <GiSandsOfTime /> },
    { name: "Joint Pain", icon: <GiHerbsBundle /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <AppBar position="fixed" className={`transition-all ${isScrolled ? 'bg-green-700/95 backdrop-blur-md shadow-sm' : 'bg-transparent shadow-none'}`}>
        <Container maxWidth="xl">
          <Toolbar disableGutters className="flex justify-between items-center w-full">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center">
              <Typography
                variant="h6"
                noWrap
                className={`flex items-center font-bold ${isScrolled ? 'text-white' : 'text-green-700'}`}
              >
                <GiHerbsBundle className="mr-2" />
                Ayurvedic Solutions
              </Typography>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  href="/login"
                  className={`font-semibold normal-case ${isScrolled ? 'text-white' : 'text-green-700'}`}
                >
                  Login
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  href="/signup"
                  variant={isScrolled ? "outlined" : "contained"}
                  className={`font-semibold normal-case ${isScrolled ? 'text-white border-white hover:bg-white/10' : 'bg-green-700 text-white hover:bg-green-800'}`}
                >
                  Sign Up
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <IconButton
                size="large"
                onClick={handleMobileMenuOpen}
                className={isScrolled ? 'text-white' : 'text-green-700'}
              >
                <FaBars />
              </IconButton>
              <Menu
                anchorEl={mobileMenuAnchor}
                open={Boolean(mobileMenuAnchor)}
                onClose={handleMobileMenuClose}
              >
                <MenuItem onClick={handleMobileMenuClose} component="a" href="/login">
                  Login
                </MenuItem>
                <MenuItem onClick={handleMobileMenuClose} component="a" href="/signup">
                  Sign Up
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Spacer for fixed navbar */}
      <Toolbar />

      {/* Hero Section */}
      <div className="relative py-16 text-center bg-gradient-to-b from-green-50 to-white bg-cover bg-center" 
           style={{ backgroundImage: "url('/images/ayurveda-bg.jpg')" }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{ scale: [1, 1.02, 1], rotate: [0, 1, -1, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            >
              <h1 className="text-3xl sm:text-5xl font-bold text-green-800 mb-4 drop-shadow-sm">
                Ancient Wisdom for Modern Wellness
              </h1>
            </motion.div>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover personalized Ayurvedic remedies for your unique mind-body constitution.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  className="bg-green-700 hover:bg-green-800 text-white py-3 px-6 text-lg font-semibold"
                  href="/signup"
                  endIcon={<FaArrowRight />}
                >
                  Get Started
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outlined"
                  className="border-green-700 text-green-700 hover:border-green-800 hover:text-green-800 py-3 px-6 text-lg"
                  href="/about"
                >
                  Learn More
                </Button>
              </motion.div>
            </div>
            
            <div className="mt-12">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <img 
                  src="/images/ayurveda-herbs.png" 
                  alt="Ayurvedic Herbs"
                  className="max-w-full w-72 mx-auto drop-shadow-lg"
                />
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </div>

      {/* Stats Section */}
      <div className="py-12 bg-yellow-50">
        <Container>
          <Grid container spacing={4} justifyContent="center">
            {[
              { number: '5000+', label: 'Years of Wisdom' },
              { number: '10K+', label: 'Community Members' },
              { number: '2K+', label: 'Verified Remedies' },
              { number: '98%', label: 'Satisfaction Rate' }
            ].map((stat, index) => (
              <Grid size={6} key={index}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Card className="text-center py-6 bg-white/70 backdrop-blur-sm shadow-sm">
                    <CardContent>
                      <h3 className="text-3xl sm:text-4xl font-bold text-green-700">{stat.number}</h3>
                      <p className="text-gray-600">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>

      {/* Features Section */}
      <Container className="py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-green-700 text-center mb-4">
            Why Choose Ayurvedic Solutions?
          </h2>
          
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            We combine ancient Ayurvedic wisdom with modern technology.
          </p>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid size={6} key={index}>
                <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
                  <Card className="text-center p-6 h-full border border-green-200 hover:shadow-lg">
                    <CardContent>
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 5, repeat: Infinity }}
                      >
                        {feature.icon}
                      </motion.div>
                      <h3 className="text-xl font-bold mt-4 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* Health Concerns Section */}
      <div className="py-16 bg-green-50">
        <Container>
          <h2 className="text-3xl sm:text-4xl font-bold text-green-700 text-center mb-12">
            Common Health Concerns
          </h2>
          
          <Grid container spacing={3} justifyContent="center">
            {healthConcerns.map((concern, index) => (
              <Grid size={6} key={index}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Card className="text-center p-4 cursor-pointer hover:bg-green-100">
                    <CardContent>
                      <Avatar className="bg-green-300 w-14 h-14 mx-auto mb-3">
                        {concern.icon}
                      </Avatar>
                      <p className="font-medium">{concern.name}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-yellow-50">
        <Container>
          <h2 className="text-3xl sm:text-4xl font-bold text-yellow-600 text-center mb-12">
            Success Stories
          </h2>
          
          <div className="relative min-h-96">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="absolute w-full"
              >
                <TestimonialCard {...testimonials[currentSlide]} />
              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-center mt-8 gap-1">
              {[0, 1, 2].map((index) => (
                <IconButton
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className="p-0"
                >
                  <div className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-yellow-600' : 'bg-gray-300'}`} />
                </IconButton>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* CTA Section */}
      <div className="py-16 text-center text-white" 
           style={{ background: "linear-gradient(rgba(56, 142, 60, 0.9), url('/images/ayurveda-pattern.jpg') center/cover" }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Transform Your Health?
            </h2>
            
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands who have discovered the power of Ayurveda.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  className="bg-white text-green-700 py-3 px-8 text-lg font-bold hover:bg-gray-50"
                  href="/signup"
                >
                  Sign Up Free
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outlined"
                  className="border-white text-white py-3 px-8 text-lg font-bold hover:bg-white/10"
                  href="/about"
                >
                  Learn More
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </div>

      {/* Footer */}
      <footer className="bg-green-900 text-white pt-12 pb-6">
        <Container>
          <Grid container spacing={6}>
            <Grid size={4}>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <GiHerbsBundle className="mr-2" />
                Ayurvedic Solutions
              </h3>
              <p className="mb-4">Bringing ancient healing wisdom to modern lifestyles.</p>
            </Grid>
            
            <Grid size={2}>
              <h4 className="text-lg font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                {['Blog', 'Research', 'Guides', 'Webinars'].map((item) => (
                  <li key={item} className="hover:underline cursor-pointer">{item}</li>
                ))}
              </ul>
            </Grid>
            
            <Grid size={2}>
              <h4 className="text-lg font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                {['About', 'Careers', 'Press', 'Contact'].map((item) => (
                  <li key={item} className="hover:underline cursor-pointer">{item}</li>
                ))}
              </ul>
            </Grid>
            
            <Grid size={4}>
              <h4 className="text-lg font-bold mb-4">Newsletter</h4>
              <div className="flex mb-4">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-grow p-3 rounded-l focus:outline-none text-gray-800"
                />
                <Button 
                  variant="contained" 
                  className="bg-yellow-600 hover:bg-yellow-700 rounded-l-none px-4"
                >
                  Subscribe
                </Button>
              </div>
              <p className="text-sm">Get wellness tips and updates</p>
            </Grid>
          </Grid>
          
          <Divider className="my-6 bg-white/20" />
          
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p>© 2025 Ayurvedic Solutions. All rights reserved.</p>
            <div className="flex gap-4 mt-4 sm:mt-0">
              {['Privacy', 'Terms', 'Sitemap'].map((item) => (
                <span key={item} className="hover:underline cursor-pointer">{item}</span>
              ))}
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}