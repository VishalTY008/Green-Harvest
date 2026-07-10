export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  out: { opacity: 0, y: -20, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export const pageSlide = {
  initial: { opacity: 0, x: 100 },
  in: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  out: { opacity: 0, x: -100, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export const loaderVariants = {
  initial: { scale: 1, opacity: 1 },
  exit: { scale: 1.2, opacity: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
};
