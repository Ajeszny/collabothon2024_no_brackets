import './style.css';
import '../style.css';
import { useState, useEffect } from 'react';
import WidgetCloseButton from '../WidgetCloseButton';
import { BeatLoader } from 'react-spinners';

function Mail({
  isHidden,
  setIsHidden,
  wasPressed,
  setWasPressed
}) {
  const [mails, setMails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredMailId, setHoveredMailId] = useState(null);

  // Array of available image URLs
  const images = [
    'images/MailRowUrgentIcon.png',
    'images/MailRowRegularIcon.png',
    'images/MailRowRegularIcon.png',
  ];

  // Function to get a random image from the array
  const getRandomImage = () => {
    return images[Math.floor(Math.random() * images.length)];
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const data = await fetch("http://localhost:8000/get_email", { method: "GET" });
      const json = await data.json();

      // Assign a random image to each mail when the data is fetched
      const mailsWithIcons = json.map(mail => ({
        ...mail,
        icon: getRandomImage() // Assign a random icon to each mail
      }));

      setMails(mailsWithIcons);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    };
    fetchData();

    // Temporary data in case the function above doesn't work on your machine 🪄
    // const tempMails = [{ id: 1, subject: "Hello world", sender: "Sender" }];
    // const mailsWithIcons = tempMails.map(mail => ({
    //   ...mail,
    //   icon: getRandomImage()
    // }));
    // setMails(mailsWithIcons);
    // setTimeout(() => { setLoading(false); }, 1000);

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
        <div className="MailContent"
        style={{  
        "align-items": "center",
        "justify-content": "center",
        "text-align": "center",
        }}
        >
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
      {/* Use the assigned random icon */}
      <div className="MailRowIcon">
        <img src={mail.icon} alt="Mail Row Icon" />
      </div>
      <div className="MailRowContent">
        {mail.subject}
        {/* Show additional information on hover */}
        {hoveredMailId === mail.id && (
          <div className="AdditionalInfo">{mail.sender}</div>
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
  );
}

export default Mail;
