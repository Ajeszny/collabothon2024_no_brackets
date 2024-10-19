import React, { useState } from 'react'; 
import './style.css'; 
import '../style.css'; 
import WidgetCloseButton from '../WidgetCloseButton';

function Tasks({ 
  isHidden,
  setIsHidden,
  wasPressed,
  setWasPressed
}) {
  const [view, setView] = useState("list"); // Toggle between list and calendar view

  // Sample tasks with different types (task and meeting)
  const tasks = [
    { description_task: "Task 1", time: "10:00", type: "task", day: 4 },
    { description_task: "Task 2", time: "12:00", type: "task", day: 9 },
    { description_task: "Meeting 1", time: "13:00", type: "meeting", day: 11 },
    { description_task: "Meeting 2", time: "15:00", type: "meeting", day: 20 },
    { description_task: "Task 3", time: "16:00", type: "task", day: 17 }
  ];

  const switchView = () => {
    setView(view === "list" ? "calendar" : "list");
  };

  // Helper function to get the tasks/meetings for a given day
  const getTasksForDay = (day) => {
    return tasks.filter(task => task.day === day);
  };

  return (
    isHidden ? null : (
      <div 
      style={ wasPressed ? { opacity: 0 } : { opacity: 1 } }
      className="TasksWidget">
        <WidgetCloseButton setIsHidden={setIsHidden} setWasPressed={setWasPressed} />
        <div className="Header">
          <img className="HeaderIcon" src="images/TasksIcon.png" alt="Tasks Icon" />
          <p className="HeaderTitle" style={{ marginLeft: '8px' }}>Tasks</p>

          {/* Button to switch between list and calendar views */}
          <button className="SwitchViewButton" onClick={switchView}>
            <img src="images/TasksArrows2.png" alt="Switch View Icon" />
          </button>

        </div>

        <div className="TasksContent">
          {view === "list" ? (
            // List View
            tasks.map((task, index) => (
              <div key={index} className="TasksRow">
                <div className="TasksRowIcon">
                  {task.type === "task" ? (
                    <img src="images/TasksCheckbox.png" alt="Task Icon" className="TaskIcon" />
                  ) : (
                    <img src="images/TasksMeeting.png" alt="Meeting Icon" className="MeetingIcon" />
                  )}
                </div>
                <div className="TasksDetails">
                  <p className="Description_task">{task.description_task}</p>
                </div>
                <div className={`Time ${task.type}`}>
                  {task.time}
                </div>
              </div>
            ))
          ) : (
            // Calendar View
            <div className="CalendarView">
              <p>Current month name</p>
              <div className="CalendarGrid">
                {[...Array(28)].map((_, day) => (
                  <div key={day} className="CalendarDay">
                    <span>{day + 1}</span>
                    {/* Conditionally render task/meeting icons based on the tasks for the current day */}
                    {getTasksForDay(day + 1).map((task, index) => (
                      <img
                        key={index}
                        src={task.type === "task" ? "images/TasksCheckboxCallendar.png" : "images/TasksMeeting.png"}
                        alt={task.type === "task" ? "Task Icon" : "Meeting Icon"}
                        className="CalendarIcon"
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default Tasks;
