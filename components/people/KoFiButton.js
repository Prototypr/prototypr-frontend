export default function PostListItem({ label = "", color = "", kofiId = "" }) {
  return (
    <div className="flex  justify-start">
      <div className="btn-container">
        <a
          title={label}
          className="kofi-button"
          style={{ backgroundColor: color }}
          href={"https://ko-fi.com/" + kofiId}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="kofitext">
            <img
              src="https://ko-fi.com/img/cup-border.png"
              className="kofiimg mr-2"
              alt="Ko-Fi button"
            />
            {label}
          </span>
        </a>
      </div>
    </div>
  );
}
