// import AuthButton from './AuthButton';
import Nav from './Nav';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { menuOpenBtn } from '../utils/anim';
import AuthButton from './AuthButton';

const Header = () => {
  const [isActiveMenu, setIsActiveMenu] = useState(false);

  const toggleMenu = () => {
    setIsActiveMenu((prev) => !prev);
  };

  return (
    <>
      <header className="main_header">
        <section className="header_container">
          <section className="header">
            <section className="header_title">
              <h1>FYM</h1>
            </section>

            <section className="header_btn_section">
              <AuthButton />
            </section>
            <section className="header_nav">
              <div className="menu_header_element" onClick={toggleMenu}>
                <div className="line_mask">
                  <motion.p
                    initial="closed"
                    variants={menuOpenBtn}
                    animate={isActiveMenu ? 'open' : 'closed'}
                  >
                    MENU
                  </motion.p>

                  <motion.p
                    initial="closed"
                    variants={menuOpenBtn}
                    animate={isActiveMenu ? 'open' : 'closed'}
                  >
                    CLOSE
                  </motion.p>
                </div>
                <div
                  className={`burger ${isActiveMenu ? 'burgerActive' : ''}`}
                ></div>
              </div>

              <Nav
                isActiveMenu={isActiveMenu}
                setIsActiveMenu={setIsActiveMenu}
              />
            </section>
          </section>
        </section>
      </header>
    </>
  );
};

export default Header;
