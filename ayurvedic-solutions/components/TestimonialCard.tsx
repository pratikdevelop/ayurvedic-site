import { motion } from "framer-motion";

export default function TestimonialCard({ quote, author, role }:{
  quote: any,
  author: any,
  role: any
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <p className="text-gray-600 italic mb-4">"{quote}"</p>
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gradient-to-r from-green-200 to-amber-200 rounded-full mr-4" />
        <div>
          <p className="text-gray-800 font-semibold">{author}</p>
          <p className="text-gray-500 text-sm">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}