import Tabs from './Tabs';
import { motion, useInView } from 'framer-motion';
import { MoveTextAnimation } from '../../../utils/anim';
import { useRef } from 'react';

const SecondSection = () => {
  const title = useRef(null);
  const isInView = useInView(title);

  return (
    <section className="second_color_box">
      <section className="second_page_container">
        <article className="second_page_content">
          <motion.div ref={title} className="line_mask">
            <motion.div
              className="wrapper"
              variants={MoveTextAnimation}
              initial="hidden"
              animate={isInView ? 'showCantHover' : ''}
            >
              <h2>HOW IT WORKS?</h2>
            </motion.div>
          </motion.div>
        </article>
        <Tabs />
      </section>
    </section>
  );
};

export default SecondSection;
