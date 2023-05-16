import React from "react";
import { parseISO, differenceInHours } from "date-fns";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { tr } from "date-fns/locale";

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
    locale: tr,
  });

  // const result = formatDistanceToNow(
  //   new Date(2016, 7, 1),
  // //   {locale: trLocale}
  // )

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
