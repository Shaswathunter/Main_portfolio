import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      access_key: "496bad8b-e77f-465e-9e3a-aef49f36fe87",
      name: data.username,
      email: data.email,
      message: data.message,
    };
    try {
      await axios.post("https://api.web3forms.com/submit", userInfo);
      toast.success("Message Sent Successfully on Shaswat's Email");
    } catch (error) {
      toast.error("An error occured");
    }
  };

  return (
    <div className="flex flex-wrap justify-center items-center min-h-screen md:flex-row gap-4 mt-6">
      {/* ✅ Contact Form (Left Animation) */}
      <motion.section
        className="text-white py-16 px-4 md:w-1/2"
        initial={{ opacity: 0, x: -150, scale: 0.9 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-secondary">Get in Touch</h2>
          <p className="mb-8 text-textSecondary">
            We'd love to hear from you! Fill out the form below to get in touch.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
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
                {...register("username", { required: true })}
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
                {...register("email", { required: true })}
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
                {...register("message", { required: true })}
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
        </div>
      </motion.section>

      {/* ✅ Contact Info (Right Animation) */}
      <motion.div
        initial={{ opacity: 0, x: 150, rotateY: 15 }}
        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: false, amount: 0.3 }}
        className="bg-gradient-to-br text-white max-w-xl mx-auto p-8 rounded-2xl mt-10 md:w-1/2"
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
  📧 Email:{" "}
  <a 
    href="mailto:Shaswat2016@gmail.com" 
    className="text-cyan-400 relative z-10"
  >
    Shaswat2016@gmail.com 
  </a>
</motion.p>
          <motion.p
            whileHover={{ scale: 1.05, color: '#64FFDA' }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="hover:underline cursor-pointer"
          >
            � Phone:{" "}
            <a href="tel:8279476617" className="text-cyan-400">
              8279476617
              
            </a>
          </motion.p>

          <motion.p
            whileHover={{ scale: 1.05, color: '#64FFDA' }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="hover:underline cursor-pointer"
          >
            🐦 X (Twitter):{" "}
            <a
              href="https://x.com/CoderShaswat"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300"
            >
              CoderShaswat
            </a>
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
  );
};

export default ContactForm;
