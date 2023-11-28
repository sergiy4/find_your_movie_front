import { motion } from 'framer-motion';

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const loadingLetterVariants = {
  start: {
    scale: 1,
  },
  end: {
    scale: 1.2,
  },
};

const loadTransition: any = {
  duration: 0.3,
  repeatType: 'reverse',
  repeat: Infinity,
};

const Loader = () => {
  return (
    <section className="loading_section">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.3 } }}
      >
        <motion.div
          className="text"
          variants={loadingContainerVariants}
          initial="start"
          animate="end"
        >
          <motion.h1
            variants={loadingLetterVariants}
            transition={loadTransition}
          >
            F
          </motion.h1>
          <motion.h1
            variants={loadingLetterVariants}
            transition={loadTransition}
          >
            Y
          </motion.h1>
          <motion.h1
            variants={loadingLetterVariants}
            transition={loadTransition}
          >
            M
          </motion.h1>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Loader;
