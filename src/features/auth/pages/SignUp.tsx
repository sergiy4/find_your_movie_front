import SignUpForm from '../components/SignUpForm';
import { motion } from 'framer-motion';
import { MoveTextAnimation } from '../../../utils/anim';

const SignUp = () => {
  return (
    <>
      <main className="form_page">
        <section className="form_container">
          <section className="section_form_text">
            <div className="register_title">
              <motion.div className="line_mask">
                <motion.div
                  className="wrapper"
                  custom={0.01}
                  variants={MoveTextAnimation}
                  initial="hidden"
                  animate="showCantHover"
                >
                  <h2>CREATE </h2>
                </motion.div>
              </motion.div>

              <p> an</p>
            </div>
            <motion.div className="line_mask">
              <motion.div
                className="wrapper"
                custom={0.03}
                variants={MoveTextAnimation}
                initial="hidden"
                animate="showCantHover"
              >
                <h2>ACCOUNT</h2>
              </motion.div>
            </motion.div>
          </section>

          <section className="section_form">
            <SignUpForm />
          </section>
        </section>
      </main>
    </>
  );
};

export default SignUp;
