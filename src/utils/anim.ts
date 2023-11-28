const transition = { duration: 0.5, ease: [0.81, 0.14, 0.56, 0.89] };

export const height = {
  initial: {
    height: 0,
  },
  enter: {
    height: '100%',
    transition,
  },
  exit: {
    height: 0,
    transition,
  },
};

export const MoveTextAnimation = {
  hidden: {
    y: '0%',
  },

  show: (i: number) => ({
    y: '-33%',
    transition: {
      ...transition,
      duration: 0.3,
      delay: i,
    },
  }),

  showCantHover: (i: number) => ({
    y: '-50%',
    transition: {
      ...transition,
      delay: i,
    },
  }),
};

export const hoverTextAnimation = {
  hover: {
    y: '-33%',
    color: '#f48c78',
    transition: { ...transition, duration: 0.2 },
  },
};

export const menuHeight = {
  enter: {
    height: '100vh',

    transition: {
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  close: {
    height: '0%',

    transition: {
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const menuOpenBtn = {
  closed: {
    y: '0',
    transition: {
      bounce: 0.2,
      type: 'spring',
    },
  },
  open: {
    y: '-100%',
    transition: {
      bounce: 0.2,
      type: 'spring',
    },
  },
};

export const cardImg = {
  hover: {
    scale: 0.91,
    transition: {
      ...transition,
      duration: 0.3,
    },
  },
};
export const card = {
  hover: {
    // scale:1.1
  },
};
