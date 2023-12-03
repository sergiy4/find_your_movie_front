import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  MoveTextAnimation,
  hoverTextAnimation,
  menuHeight,
} from '../utils/anim';

interface NavProps {
  isActiveMenu: boolean;
  setIsActiveMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const Nav = ({ isActiveMenu, setIsActiveMenu }: NavProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className={`nav_wrapped_animation ${isActiveMenu ? 'open' : 'close'}`}
      variants={menuHeight}
      animate={isActiveMenu ? 'enter' : 'close'}
    >
      <nav className="nav_menu">
        <ul className="menu_list">
          <li className="menu_item">
            <div
              className="line_mask_menu"
              onClick={() => {
                navigate('/');
                setIsActiveMenu(false);
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
          </li>

          <li className="menu_item">
            <div
              className="line_mask_menu"
              onClick={() => {
                navigate('/FYM ');
                setIsActiveMenu(false);
              }}
            >
              <motion.div
                variants={MoveTextAnimation}
                className="w"
                initial="hidden"
                animate="show"
                custom={0.1}
              >
                <motion.div
                  className="wrapper_div"
                  variants={hoverTextAnimation}
                  whileHover="hover"
                >
                  <h3>FYM </h3>
                  <h3>FYM </h3>
                </motion.div>
              </motion.div>
            </div>
          </li>

          <li className="menu_item">
            <div
              className="line_mask_menu"
              onClick={() => {
                navigate('/collections?page=1 ');
                setIsActiveMenu(false);
              }}
            >
              <motion.div
                variants={MoveTextAnimation}
                className="item_inside_mask"
                initial="hidden"
                animate="show"
                custom={0.2}
              >
                <motion.div
                  className="wrapper_div"
                  variants={hoverTextAnimation}
                  whileHover="hover"
                >
                  <h3>MY COLLECTIONS </h3>
                  <h3>MY COLLECTIONS </h3>
                </motion.div>
              </motion.div>
            </div>
          </li>

          <li className="menu_item">
            <div
              className="line_mask_menu"
              onClick={() => {
                navigate('/randomCollections?page=1 ');
                setIsActiveMenu(false);
              }}
            >
              <motion.div
                variants={MoveTextAnimation}
                className="w"
                initial="hidden"
                animate="show"
                custom={0.3}
              >
                <motion.div
                  className="wrapper_div"
                  variants={hoverTextAnimation}
                  whileHover="hover"
                >
                  <h3>COLLECTIONS </h3>
                  <h3>COLLECTIONS </h3>
                </motion.div>
              </motion.div>
            </div>
          </li>
        </ul>
      </nav>
    </motion.div>
  );
};

export default Nav;
