import React, { useEffect, useState } from 'react'
import MailRow from './MailRow';
import './style.css';

function Mail() {
  const [mails, setMails] = useState([]);

  useEffect(() => {
    setMails(
      prev => [
      { content: "Unauthorized access", type: "urgent" },
      { content: "Something", type: "regular" },
      ...prev
    ]);
  }, []);

  const mail = mails.map(mail => <MailRow content={mail.content} type={mail.type} />);
  for (let i = mail.length; i < 5; i++) {
    mail.push(<MailRow content="Empty" type="empty" />);
  }

  return (
    <div class="Mail">
      { mail }
    </div>
  )
}

export default Mail
