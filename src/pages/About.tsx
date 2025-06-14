
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Heart, Award } from 'lucide-react';
import Layout from '@/components/Layout';

const About = () => {
  const education = [
    {
      degree: "Master of Computer Science",
      school: "Stanford University",
      year: "2020-2022",
      description: "Specialized in Machine Learning and AI"
    },
    {
      degree: "Bachelor of Software Engineering",
      school: "UC Berkeley",
      year: "2016-2020",
      description: "Graduated Magna Cum Laude"
    }
  ];

  const experience = [
    {
      title: "Senior Full Stack Developer",
      company: "Tech Innovations Inc.",
      period: "2022-Present",
      description: "Leading development of scalable web applications using React, Node.js, and AWS"
    },
    {
      title: "Software Developer",
      company: "StartUp Solutions",
      period: "2020-2022",
      description: "Developed mobile and web applications for various clients"
    }
  ];

  const hobbies = [
    "Photography", "Rock Climbing", "Chess", "Cooking", "Travel", "Reading"
  ];

  return (
    <Layout>
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-white text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            About Me
          </motion.h1>

          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-lg rounded-2xl p-8 mb-12 border border-white/10"
          >
            <p className="text-lg text-gray-300 leading-relaxed text-center max-w-4xl mx-auto">
              I'm a passionate full-stack developer with over 4 years of experience creating 
              innovative digital solutions. I specialize in modern web technologies and have 
              a keen eye for user experience design. When I'm not coding, you'll find me 
              exploring new technologies, contributing to open-source projects, or enjoying 
              the great outdoors.
            </p>
          </motion.div>

          {/* Education Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <GraduationCap className="mr-3 text-blue-400" size={32} />
              Education
            </h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="bg-gradient-to-r from-blue-500/20 to-transparent backdrop-blur-lg rounded-xl p-6 border border-white/10 cursor-pointer"
                >
                  <h3 className="text-xl font-semibold text-blue-400">{edu.degree}</h3>
                  <p className="text-white font-medium">{edu.school}</p>
                  <p className="text-gray-400">{edu.year}</p>
                  <p className="text-gray-300 mt-2">{edu.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Experience Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Briefcase className="mr-3 text-purple-400" size={32} />
              Work Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.02, x: -10 }}
                  className="bg-gradient-to-l from-purple-500/20 to-transparent backdrop-blur-lg rounded-xl p-6 border border-white/10 cursor-pointer"
                >
                  <h3 className="text-xl font-semibold text-purple-400">{exp.title}</h3>
                  <p className="text-white font-medium">{exp.company}</p>
                  <p className="text-gray-400">{exp.period}</p>
                  <p className="text-gray-300 mt-2">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Hobbies Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Heart className="mr-3 text-pink-400" size={32} />
              Hobbies & Interests
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {hobbies.map((hobby, index) => (
                <motion.div
                  key={hobby}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, rotateZ: 5 }}
                  className="bg-gradient-to-br from-pink-500/20 to-orange-500/20 backdrop-blur-lg rounded-xl p-4 text-center border border-white/10 cursor-pointer"
                >
                  <p className="text-white font-medium">{hobby}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </Layout>
  );
};

export default About;
