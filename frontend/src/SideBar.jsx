function SideBar({ isOpen, setIsOpen }) {
  return (
    <div
    style={{ width: isOpen ? "10%" : "5%" }}
    className="SideBar"
    >
      {
        isOpen ? 
        <>
          <img 
          className="SideBarCloseButton"
          onClick={() => setIsOpen(false)}
          src="images/SideBarCloseIcon.png" 
          />
          <ul>
            <li>menu option 1</li>
            <li>menu option 2</li>
            <li>menu option 3</li>
            <li>menu option 4</li>
          </ul>
        </> :
        <img 
        className="SideBarOpenButton"
        onClick={() => setIsOpen(true)}
        src="images/SideBarOpenIcon.png"
        />
      }
    </div>
  )
}

export default SideBar
