import "./footer.css";
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export function Footer() {
  return (
    <section className="footer">
      <p>Alejo Mattalia</p>

      <div className="container-icon">
        <a href="">
          <InstagramIcon style={{color: "#fff", fontSize: "30px"}}/>
        </a>

        <a href="">
          <LinkedInIcon style={{color: "#fff", fontSize: "30px"}}/>
        </a>

        <a href="">
          <WhatsAppIcon style={{color: "#fff", fontSize: "30px"}}/>
        </a>
      </div>
    </section>
  )
}
