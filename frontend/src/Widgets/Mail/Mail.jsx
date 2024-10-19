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
    <div className="MailRow">
      <div className="MailRowIcon"><img src="images/MailRowUrgentIcon.png" /></div>
      <div className="MailRowContent">{mail.subject}</div>
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

export default Mail


// <div className="MailRow">
//           <div className="MailRowIcon"><img src="images/MailRowUrgentIcon.png" /></div>
//           <div className="MailRowContent">Urgent message</div>
//         </div>
//         <div className="MailRow">
//           <div className="MailRowIcon"><img src="images/MailRowRegularIcon.png" /></div>
//           <div className="MailRowContent">Regular message</div>
//         </div>
//         <div className="MailRow">
//           <div className="MailRowIcon"><img src="images/MailRowRegularIcon.png" /></div>
//           <div className="MailRowContent">Empty message</div>
//         </div>
//         <div className="MailRow">
//           <div className="MailRowIcon"><img src="images/MailRowRegularIcon.png" /></div>
//           <div className="MailRowContent">Empty message</div>
//         </div>
//         <div className="MailRow">
//           <div className="MailRowIcon"><img src="images/MailRowRegularIcon.png" /></div>
//           <div className="MailRowContent">Empty message</div>
//         </div>
