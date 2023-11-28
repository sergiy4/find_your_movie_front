import { motion } from 'framer-motion';
import { MoveTextAnimation, hoverTextAnimation } from '../utils/anim';
import { useNavigate } from 'react-router-dom';

const HomeLink = () => {
  const navigate = useNavigate();
  return (
    <div
      className="line_mask_menu"
      onClick={() => {
        navigate('/');
      }}
    >
      <motion.div
        className="item_inside_mask"
        variants={MoveTextAnimation}
        initial="hidden"
        animate="show"
        custom={0.06}
      >
        <motion.div
          className="wrapper_div"
          variants={hoverTextAnimation}
          whileHover="hover"
        >
          <h3>HOME </h3>
          <h3>HOME </h3>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HomeLink;
