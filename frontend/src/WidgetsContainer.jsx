import React from 'react';
import Mail from './Widgets/Mail/Mail';
import WidgetTemplate from './Widgets/WidgetTemplate';

function WidgetsContainer({ isOpen }) {
  return (
    <div
    style={{ width: isOpen ? "90%" : "95%" }}
    className="WidgetsContainer"
    >
      <WidgetTemplate icon="images/MailIcon.png" title="Mail" width={400} height={300} Content={ <Mail /> } />
    </div>
  )
}

export default WidgetsContainer
