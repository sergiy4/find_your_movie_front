import { motion, useInView } from 'framer-motion';
import { MoveTextAnimation } from '../../../utils/anim';
import { useRef } from 'react';

const ThirdSection = () => {
  const title = useRef(null);
  const isInView = useInView(title);

  return (
    <section className="third_color_box">
      <section className="third_page_container">
        <motion.div ref={title} className="line_mask">
          <motion.div
            className="wrapper"
            variants={MoveTextAnimation}
            initial="hidden"
            animate={isInView ? 'showCantHover' : ''}
          >
            <h2>COLLECTIONS</h2>
          </motion.div>
        </motion.div>
        <section className="collection_step_content">
          <section className="first_row">
            <section className="collection_first_step">
              <h3>STEP 1</h3>
              <h4>CREATE A COLLECTION</h4>
            </section>

            <section className="collection_second_step">
              <h3>STEP 2</h3>
              <h4>MAKE IT PRIVATE </h4>
              <h4> OR PUBLIC</h4>
            </section>
          </section>

          <section className="second_row">
            <section className="collection_third_step">
              <h3>STEP 3</h3>
              <h4>ADD MOVIES TO IT </h4>
              <h4>SO YOU DON'T LOSE IT</h4>
            </section>
            <section className="collection_forth_step">
              <h3>STEP 4</h3>
              <h4>VIEW THE COLLECTIONS </h4>
              <h4>OF OTHER USERS</h4>
            </section>
          </section>
        </section>
      </section>
    </section>
  );
};

export default ThirdSection;
