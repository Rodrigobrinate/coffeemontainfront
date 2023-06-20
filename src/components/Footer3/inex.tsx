import React from 'react';
import Link from 'next/link';

import styles from './styles.module.css';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
  <div>
        <footer className={styles.footer}>
  <div className={styles.container}>
    <div className={styles.social_links}>
      <Link className={styles.social_links_a} href="https://www.facebook.com/suaempresa" target="_blank" rel="noopener noreferrer">
       <Facebook /></Link>
      <Link className={styles.social_links_a} href="https://www.instagram.com/suaempresa" target="_blank" rel="noopener noreferrer">
        <Instagram /> </Link>
      <Link className={styles.social_links_a} href="https://www.twitter.com/suaempresa" target="_blank" rel="noopener noreferrer">
        <Twitter /></Link>
    </div>
    <nav className={styles.footer_nav}>
      <ul className={styles.footer_nav_ul}>
        <li className={styles.footer_nav_ul_li}><Link className={styles.footer_nav_ul_li_a} href="/">Home</Link></li>
        <li className={styles.footer_nav_ul_li}><Link className={styles.footer_nav_ul_li_a} href="/sobre">Sobre</Link></li>
        <li className={styles.footer_nav_ul_li}><Link className={styles.footer_nav_ul_li_a} href="/produtos">Produtos</Link></li>
        <li className={styles.footer_nav_ul_li}><Link className={styles.footer_nav_ul_li_a} href="/contato">Contato</Link></li>
        <li className={styles.footer_nav_ul_li}><Link className={styles.footer_nav_ul_li_a} href="/termos">Termos de Uso</Link></li>
        <li className={styles.footer_nav_ul_li}><Link className={styles.footer_nav_ul_li_a} href="/privacidade">Política de Privacidade</Link></li>
      </ul>
    </nav>
    <p>&copy; 2023 Coffee Mountain Caparaó. Todos os direitos reservados.</p>
  </div>
</footer>

    
  </div>
    );
}

export default Footer;