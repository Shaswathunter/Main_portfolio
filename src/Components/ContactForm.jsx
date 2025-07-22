import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // You can integrate EmailJS or backend logic here
    setFormData({ name: '', email: '', message: '' });
  };

  return (
   <div className='flex flex-wrap justify-center items-center min-h-screen md:flex-row gap-4 mt-6 '>
     <section id="contact" className=" text-white py-16 px-4">
      <motion.div 
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-4 text-secondary">Get in Touch</h2>
        <p className="mb-8 text-textSecondary">We'd love to hear from you! Fill out the form below to get in touch.</p>

        <form 
          onSubmit={handleSubmit} 
          className="space-y-6 text-left"
        >
          {/* Name Field */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <label className="block mb-2 text-sm font-medium">Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </motion.div>

          {/* Email Field */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </motion.div>

          {/* Message Field */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <label className="block mb-2 text-sm font-medium">Message</label>
            <textarea 
              name="message" 
              rows="5" 
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button 
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 w-full bg-secondary text-black py-2 rounded-lg font-semibold transition duration-300"
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </section>
   <div>
     <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br text-white max-w-xl mx-auto p-8 rounded-2xl mt-10"
    >
      <motion.h2
        className="text-4xl font-bold text-cyan-400 mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        I'm always open to new collaborations! Drop a message anytime.
      </motion.h2>

      <div className="space-y-4 text-lg">
        <motion.p
          whileHover={{ scale: 1.05, color: '#64FFDA' }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="hover:underline cursor-pointer"
        >
          📧 Email: <a href="mailto:Shaswat2016@gmail.com" className="text-black">Shaswat2016@gmail.com</a>
        </motion.p>

        <motion.p
          whileHover={{ scale: 1.05, color: '#64FFDA' }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="hover:underline cursor-pointer"
        >
          🐦 X (Twitter): <a href="https://x.com/CoderShaswat" target="_blank" rel="noopener noreferrer" className="text-gray-300">CoderShaswat</a>
        </motion.p>

        <motion.p
          whileHover={{ scale: 1.05, color: '#64FFDA' }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          📍 Location: <span className="text-gray-300">Agra, UP, India</span>
        </motion.p>
      </div>
    </motion.div>
 </div>
   </div>
  );
};

export default ContactForm;
