import React from "react";

export default function Notification(props) {
  const { type, content } = props;
  return <div className={type === "error" ? "notification-error" : "notification-success"}>{content}</div>;
}
