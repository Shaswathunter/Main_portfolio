import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
  const experiences = [
    {
      title: 'Java Developer Intern',
      company: 'Infosys Springboard',
      period: '2024 - Present',
      description: 'Building a Multi-cloud storage application with unified interface.',
      skills: ['Java', 'Cloud Computing', 'API Development']
    },
    {
      title: 'MERN Stack Developer',
      company: 'FYGDS',
      period: '2024 - 2025',
      description: 'Developed responsive web applications using React and modern TypeScript.',
      skills: ['React', 'Node.js', 'MongoDB', 'Express.js']
    }
  ];

  return (
    <div id="experience" name="experience" className="w-full min-h-screen  text-gray-100 py-20">
      <div className="max-w-screen-lg mx-auto p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pb-8 text-center"
        >
          <h2 className="text-5xl font-extrabold inline border-b-4 border-indigo-400">Experience</h2>
          <p className="py-6 text-lg text-gray-400">My professional journey and achievements</p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gradient-to-r from-gray-400 to-gray-300 p-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-3xl font-bold text-gray-700">{exp.title}</h3>
                  <p className="text-gray-500 text-sm">{exp.company}</p>
                </div>
                <span className="text-gray-500 text-sm">{exp.period}</span>
              </div>
              <p className="text-gray-800 mb-4 text-base">{exp.description}</p>
              <div className="flex flex-wrap gap-3">
                {exp.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-400 to-indigo-300 rounded-full text-white text-sm font-medium shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;