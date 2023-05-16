import React from "react";
import { parseISO, differenceInHours, isAfter } from "date-fns";

const Task = ({ taskObj, onComplete }) => {
  const deadline = parseISO(taskObj.deadline);
  const currentDate = new Date();
  const deadlinePassed = isAfter(currentDate, deadline);

  const hoursRemaining = differenceInHours(deadline, currentDate);
  const daysRemaining = Math.floor(hoursRemaining / 24);
  const remainingHours = hoursRemaining % 24;

  let spanClassName;

  if (daysRemaining < 3) {
    spanClassName = "redBackground";
  } else {
    spanClassName = "blueBackground";
  }

  let deadlineText;
  if (deadlinePassed && daysRemaining === 0) {
    deadlineText = `yaklaşık ${Math.abs(remainingHours)} saat önceydi..`;
  } else if (deadlinePassed && daysRemaining !== 0) {
    deadlineText = `${Math.abs(daysRemaining)} gün önceydi..`;
  } else if (!deadlinePassed && daysRemaining !== 0) {
    deadlineText = `${Math.abs(daysRemaining)} gün sonra..`;
  } else if (!deadlinePassed && daysRemaining === 0) {
    deadlineText = `yaklaşık ${Math.abs(remainingHours)} saat sonra..`;
  }

  return (
    <div className="task">
      <h3>{taskObj.title}</h3>
      <div className="deadline">
        son teslim: <span className={spanClassName}>{deadlineText}</span>
      </div>
      <p>{taskObj.description}</p>
      <div>
        {taskObj.people.map((p) => (
          <span className="pill" key={p}>
            {p}
          </span>
        ))}
      </div>
      {onComplete && (
        <button onClick={() => onComplete(taskObj.id)}>Tamamlandı</button>
      )}
    </div>
  );
};

export default Task;
