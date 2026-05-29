import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail } from 'lucide-react';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const services = [
    { title: "Cinematic Editing", desc: "Crafting narratives with precision, ensuring every cut pushes the story forward." },
    { title: "Color Grading", desc: "Enhancing mood and atmosphere with professional, film-look color correction." },
    { title: "Sound Design", desc: "Building immersive audio landscapes that elevate the visual experience." },
    { title: "VFX & Compositing", desc: "Seamlessly integrating visual effects to create impossible realities." },
  ];

  const timeline = [
    { year: "2023 - Present", role: "Lead Video Editor", company: "Creative Studio X", desc: "Leading a team of editors, managing post-production workflows for high-end commercial clients." },
    { year: "2021 - 2023", role: "Freelance Editor", company: "Various Clients", desc: "Delivered over 100+ projects including music videos, short films, and brand documentaries." },
    { year: "2019 - 2021", role: "Junior Editor", company: "Film House", desc: "Assisted senior editors, organized footage, and cut social media teasers." },
  ];

  return (
    <main className="relative bg-black text-white overflow-hidden selection:bg-red-500/30">
      {/* Hero Section (100vh) */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background Video */}
        <motion.div 
          style={{ y }}
          className="absolute inset-0 w-full h-[150%] -top-[25%] z-0"
        >
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="object-cover w-full h-full opacity-40"
          >
            <source src="/spiderman.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
        </motion.div>
        
        <div className="max-w-4xl mx-auto relative z-10 px-6 md:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl font-display mb-6 tracking-tight font-bold text-white drop-shadow-lg">
              Sai Pavan
            </h1>
            <h2 className="text-2xl md:text-3xl text-red-500 mb-12 font-medium tracking-wide drop-shadow-md uppercase">
              Professional Video Editor
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-white/90 font-light leading-relaxed text-xl md:text-3xl italic drop-shadow-xl border-l-4 border-red-500 pl-6 text-left">
              "I love to shoot and edit where I can plan my perfection and deliver you a perfect video."
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
        >
          <span className="text-sm tracking-widest uppercase">Scroll</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-[1px] h-12 bg-gradient-to-b from-red-500 to-transparent"
          />
        </motion.div>
      </section>

      {/* Biography Section */}
      <section className="py-24 md:py-32 px-6 relative z-10 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              {/* Placeholder for Profile Image */}
              <div className="aspect-[4/5] relative rounded-lg overflow-hidden group">
                <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                  <span className="text-neutral-600 tracking-widest uppercase">Image Placeholder</span>
                </div>
                {/* Overlay glow */}
                <div className="absolute inset-0 bg-red-500/10 mix-blend-overlay group-hover:bg-red-500/0 transition-colors duration-500" />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-sm text-red-500 tracking-[0.3em] uppercase mb-4">The Journey</h3>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Crafting visual stories that <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white">captivate</span> and inspire.
              </h2>
              <div className="space-y-6 text-neutral-400 text-lg font-light leading-relaxed">
                <p>
                  [Placeholder] With over 5 years of experience in the industry, I've dedicated myself to the art of visual storytelling. My approach blends technical precision with creative intuition, ensuring every frame serves a purpose.
                </p>
                <p>
                  [Placeholder] Whether it's a high-energy commercial, a profound documentary, or an immersive music video, my goal is to evoke emotion and deliver an unforgettable experience.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 md:py-32 px-6 relative z-10 bg-neutral-950">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h3 className="text-sm text-red-500 tracking-[0.3em] uppercase mb-4">Expertise</h3>
            <h2 className="text-4xl md:text-5xl font-bold">What I Do Best</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative p-8 border border-neutral-800 bg-black hover:border-red-500/50 transition-colors duration-300"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <h4 className="text-xl font-bold mb-4 group-hover:text-red-500 transition-colors duration-300">{service.title}</h4>
                <p className="text-neutral-400 font-light text-sm leading-relaxed">{service.desc}</p>
                
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-transparent group-hover:border-red-500 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 md:py-32 px-6 relative z-10 bg-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h3 className="text-sm text-red-500 tracking-[0.3em] uppercase mb-4">Experience</h3>
            <h2 className="text-4xl md:text-5xl font-bold">Professional Timeline</h2>
          </motion.div>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neutral-800 before:to-transparent">
            {timeline.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                {/* Timeline Dot */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-black bg-neutral-800 group-hover:bg-red-500 group-hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all duration-300 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
                
                {/* Content */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-lg border border-neutral-800 bg-neutral-950/50 backdrop-blur-sm group-hover:border-red-500/30 transition-colors duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                    <h4 className="font-bold text-xl text-white">{item.role}</h4>
                    <span className="text-sm text-red-500 font-mono tracking-wider">{item.year}</span>
                  </div>
                  <h5 className="text-neutral-400 text-sm uppercase tracking-wider mb-4">{item.company}</h5>
                  <p className="text-neutral-500 font-light text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative z-10 bg-neutral-950 border-t border-neutral-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.05),transparent_70%)]" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center relative"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8">Ready to create?</h2>
          <p className="text-xl text-neutral-400 font-light mb-12 max-w-2xl mx-auto">
            Whether you have a specific project in mind or just want to explore possibilities, let's start a conversation.
          </p>
          <a 
            href="mailto:contact@saipavan.space" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(239,68,68,0.8)]"
          >
            <Mail className="w-5 h-5" />
            Let's Talk
          </a>
        </motion.div>
      </section>
    </main>
  );
};

export default AboutPage;

