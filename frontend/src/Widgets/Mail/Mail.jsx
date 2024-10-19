import './style.css'
import '../style.css'
import { useState, useEffect } from 'react'
import WidgetCloseButton from '../WidgetCloseButton'
import { BeatLoader } from 'react-spinners';

function Mail({
  isHidden,
  setIsHidden,
  wasPressed,
  setWasPressed
}) {
  const [mails, setMails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredMailId, setHoveredMailId] = useState(null); // State to track which mail is hovered

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const data = await fetch("http://localhost:8000/get_email", { method: "GET" });
      const json = await data.json();
      setMails(json);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    };

    fetchData().catch(err => {
      console.error({ err });
    });
  }, []);

  if (loading) {
    return (
      <div
      style={ wasPressed ? { opacity: 0 } : { opacity: 1 } }
      className="Mail"
      >
        <WidgetCloseButton setIsHidden={setIsHidden} setWasPressed={setWasPressed} />
        <div className="Header">
          <img className="HeaderIcon" src="images/MailIcon.png" />
          <p className="HeaderTitle">Mail</p>
        </div>
        <div className="MailContent">
          <BeatLoader color={"#FED601"} />
        </div>
      </div>
    );
  }

  const renderMails = () => mails.map((mail) => (
    <div
      className="MailRow"
      key={mail.id} // Add a unique key for each mail
      onMouseEnter={() => setHoveredMailId(mail.id)} // Set hovered mail id on mouse enter
      onMouseLeave={() => setHoveredMailId(null)} // Reset hovered mail id on mouse leave
    >
      <div className="MailRowIcon"><img src="images/MailRowUrgentIcon.png" /></div>
      <div className="MailRowContent">
        {mail.subject}
        {/* Show additional information on hover */}
        {hoveredMailId === mail.id && (
          <div className="AdditionalInfo">{mail.additionalInfo}</div> // Ensure 'additionalInfo' exists in your data
        )}
      </div>
    </div>
  ));

  return (
    isHidden ? 
    <></> : 
    <div
    style={ wasPressed ? { opacity: 0 } : { opacity: 1 } }
    className="Mail"
    >
      <WidgetCloseButton setIsHidden={setIsHidden} setWasPressed={setWasPressed} />
      <div className="Header">
        <img className="HeaderIcon" src="images/MailIcon.png" />
        <p className="HeaderTitle">Mail</p>
      </div>
      <div className="MailContent">
        { renderMails() }
      </div>
    </div>
  )
}

export default Mail;
