import "bulma/css/bulma.css";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer has-background-white-ter">
      <div className="content has-text-centered">
        <p className="title">2021 QiitaViz</p>
        <p><Link to="/about">このサイトについて</Link></p>
      </div>
    </footer>
  );
};

export default Footer;
