import React from "react";
import { parseISO, differenceInHours, formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";

const Task = ({ taskObj, onComplete }) => {
  const deadline = parseISO(taskObj.deadline);
  const currentDate = new Date();

  const hoursRemaining = differenceInHours(deadline, currentDate);
  const daysRemaining = Math.floor(hoursRemaining / 24);

  let spanClassName;

  if (daysRemaining < 3) {
    spanClassName = "bg-[#ffd9d4]";
  } else {
    spanClassName = "bg-[#d2d5fd]";
  }

  const formattedDistance = formatDistanceToNow(deadline, {
    addSuffix: true,
    locale: tr,
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
