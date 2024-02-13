export default function PostListItem({ label = "", color = "", kofiId = "" }) {
  return (
    <div className="flex  justify-start">
      <div className="btn-container">
        <a
          title={label}
          className={`${label?'kofi-button ':'rounded-full w-10 h-10 block flex justify-center'}`}
          style={{ backgroundColor: color }}
          href={"https://ko-fi.com/" + kofiId}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={`${label?'kofitext':'flex flex-col justify-center kofitext'}`}>
            <img
              src="https://ko-fi.com/img/cup-border.png"
              className={`kofiimg ${label?'mr-2':'my-auto'}`}
              alt="Ko-Fi button"
            />
            {label?label:null}
          </span>
        </a>
      </div>
    </div>
  );
}
