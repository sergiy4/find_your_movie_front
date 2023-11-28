import { motion } from 'framer-motion';
import { MoveTextAnimation } from '../../../utils/anim';
import Shadows from '../../../assets/shadows.svg';
import { useNavigate } from 'react-router-dom';

const FirstSection = () => {
  const navigate = useNavigate();

  return (
    <section className="color_box">
      <section className="main_img_section">
        <img
          src={Shadows}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
          alt=""
          className="main_img"
        />
      </section>

      <section className="first_page_container">
        <section className="main_text">
          <div className="main_text_line">
            <div className="main_text_mask">
              <motion.div className="line_mask">
                <motion.div
                  className="wrapper"
                  variants={MoveTextAnimation}
                  custom={0}
                  initial="hidden"
                  animate="showCantHover"
                >
                  <h2>FIND</h2>
                </motion.div>
              </motion.div>
            </div>

            <div className="main_text_mask">
              <motion.div className="line_mask">
                <motion.div
                  custom={0.01}
                  className="wrapper"
                  variants={MoveTextAnimation}
                  initial="hidden"
                  animate="showCantHover"
                >
                  <h2>YOUR</h2>
                </motion.div>
              </motion.div>
            </div>

            <div className="main_text_mask">
              <motion.div className="line_mask">
                <motion.div
                  custom={0.05}
                  className="wrapper"
                  variants={MoveTextAnimation}
                  initial="hidden"
                  animate="showCantHover"
                >
                  <h2>MOVIE</h2>
                </motion.div>
              </motion.div>
            </div>
          </div>
          <div className="main_text_line">
            <div className="main_text_mask">
              <motion.div className="line_mask">
                <motion.div
                  custom={0.1}
                  className="wrapper"
                  variants={MoveTextAnimation}
                  initial="hidden"
                  animate="showCantHover"
                >
                  <h2>USING</h2>
                </motion.div>
              </motion.div>
            </div>
            <div className="main_text_mask">
              <motion.div className="line_mask">
                <motion.div
                  custom={0.12}
                  className="wrapper"
                  variants={MoveTextAnimation}
                  initial="hidden"
                  animate="showCantHover"
                >
                  <h2>ARTIFICIAL</h2>
                </motion.div>
              </motion.div>
            </div>
          </div>
          <div className="main_text_line">
            <div className="main_text_mask">
              <motion.div className="line_mask">
                <motion.div
                  custom={0.13}
                  className="wrapper"
                  variants={MoveTextAnimation}
                  initial="hidden"
                  animate="showCantHover"
                >
                  <h2>INTELLIGENCE</h2>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="buttons_section">
          <div className="buttons_box">
            <button
              className="btn fym_btn"
              onClick={() => {
                navigate('/FYM');
              }}
            >
              FIND YOUR MOVIE
            </button>
            s
          </div>
        </section>
      </section>
    </section>
  );
};

export default FirstSection;
