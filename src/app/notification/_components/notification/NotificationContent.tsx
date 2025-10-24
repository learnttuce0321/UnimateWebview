interface Props {
  isRead: boolean;
  content: string;
}

const NotificationContent = ({ isRead, content }: Props) => {
  const parts = content.split(/(\[.*?\])/g);

  return (
    <p
      className={`${isRead ? 'text-blue_gray-600' : 'text-blue_gray-900'} text-[16px] leading-[22.4px] tracking-[0.2px]`}
    >
      {parts.map((part, index) => {
        if (part.match(/^\[.*\]$/)) {
          const innerText = part.slice(1, -1);
          return (
            <span key={index} className="font-semibold">
              {innerText}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </p>
  );
};

export default NotificationContent;
