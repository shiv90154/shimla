"use client";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

export function Reveal({ children, delay = 0, y = 18, className, as = "div", ...rest }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Grid whose direct children rise in one after another.
export function Stagger({ children, className, gap = 0.05 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </motion.div>
  );
}
export const Item = ({ children, className }) => (
  <motion.div
    className={className}
    variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } } }}
  >
    {children}
  </motion.div>
);

export function SecHead({ eyebrow, title, text, center }) {
  return (
    <Reveal className={`sec-head ${center ? "center" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </Reveal>
  );
}
