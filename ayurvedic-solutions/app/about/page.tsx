'use client';

import Link from "next/link";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="bg-gradient-to-b from-green-50 to-amber-50 min-h-screen">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto p-8 md:p-16"
      >
        <h1 className="text-4xl font-bold text-green-800 mb-6 text-center">
          About Ayurvedic Solutions
        </h1>
        <p className="text-gray-700 mb-4">
          Ayurvedic Solutions is a community-driven platform dedicated to sharing the timeless wisdom of Ayurveda. Our mission is to empower individuals to take charge of their health using natural remedies and holistic practices.
        </p>
        <p className="text-gray-700 mb-4">
          Founded in 2025, we aim to bridge ancient knowledge with modern needs, creating a space where enthusiasts and practitioners alike can exchange ideas and solutions.
        </p>
        <div className="text-center mt-8">
          <Link href="/" className="text-green-600 hover:text-green-700">
            Back to Home
          </Link>
        </div>
      </motion.section>
    </div>
  );
}