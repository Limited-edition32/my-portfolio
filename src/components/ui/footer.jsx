import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Camera, MessageCircle } from 'lucide-react';

const socials = [
  { icon: Camera, label: 'Instagram', href: 'https://www.instagram.com/limited._.edition.edits/' },
  { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/918074386036' },
];

// Animated letter-by-letter heading
const AnimatedHeading = () => {
  const line1 = "Let's create";
  const line2 = "something";
  const words = [line1, line2];

  return (
    <div className="text-5xl md:text-7xl font-display font-light mb-8 leading-tight overflow-hidden">
      {words.map((word, wi) => (
        <div key={wi} className="overflow-hidden">
          <motion.div
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.7, delay: wi * 0.12, ease: [0.76, 0, 0.24, 1] }}
            viewport={{ once: true }}
          >
            {word}
          </motion.div>
        </div>
      ))}
      <div className="overflow-hidden">
        <motion.div
          initial={{ y: '100%' }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.76, 0, 0.24, 1] }}
          viewport={{ once: true }}
          className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-white"
        >
          extraordinary.
        </motion.div>
      </div>
    </div>
  );
};

const Footer = () => {
  const footerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  });

  // Parallax the glow blob
  const blobY = useTransform(scrollYProgress, [0, 1], ['30%', '0%']);

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="bg-black text-white relative overflow-hidden pt-32 pb-12 border-t border-white/5"
    >
      {/* Top gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

      {/* Parallax glow */}
      <motion.div
        style={{ y: blobY }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-16 mb-24">
          {/* Left: Heading + email */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <AnimatedHeading />

            <motion.a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=limitededition.edits@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white rounded-full font-medium text-lg hover:bg-red-500 transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]"
            >
              <Mail className="w-5 h-5" />
              Send us an Email
            </motion.a>
          </motion.div>

          {/* Right: Socials */}
          <div className="flex flex-col gap-5">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-gray-400 font-medium uppercase tracking-widest text-sm mb-1"
            >
              Socials
            </motion.p>
            {socials.map(({ icon: Icon, label, href }, i) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 6 }}
                className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group"
              >
                <motion.div
                  whileHover={{ scale: 1.15, borderColor: 'rgba(239,68,68,0.6)', backgroundColor: 'rgba(239,68,68,0.15)' }}
                  transition={{ duration: 0.25 }}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center"
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                <span className="text-lg">{label}</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 gap-4"
        >
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Limited Edition. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service'].map((link) => (
              <motion.a
                key={link}
                href="#"
                whileHover={{ color: '#ffffff' }}
                className="text-gray-500 text-sm transition-colors"
              >
                {link}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
