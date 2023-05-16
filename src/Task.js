import React from "react";
import { parseISO, differenceInHours, formatDistanceToNow } from "date-fns";

const Task = ({ taskObj, onComplete }) => {
  const deadline = parseISO(taskObj.deadline);
  const currentDate = new Date();

  const hoursRemaining = differenceInHours(deadline, currentDate);
  const daysRemaining = Math.floor(hoursRemaining / 24);

  let spanClassName;

  if (daysRemaining < 3) {
    spanClassName = "redBackground";
  } else {
    spanClassName = "blueBackground";
  }

  const formattedDistance = formatDistanceToNow(deadline, {
    addSuffix: true,
  });

  return (
    <div className="task">
      <h3>{taskObj.title}</h3>
      <div className="deadline">
        son teslim: <span className={spanClassName}>{formattedDistance}</span>
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
