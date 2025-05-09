import { useEffect, useState } from "react";

function Notification({ notification }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(true);
    const timeoutId = setTimeout(() => setShow(false), 2000);

    return () => clearInterval(timeoutId);
  }, [notification]);

  return show && notification.message !== "" ? <p className={`${notification.status}-notification`}>{notification.message}</p> : null;
}

export default Notification;
