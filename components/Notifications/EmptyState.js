const NotificationEmptyState = () =>{
    return(
        <div className="mx-auto w-full rounded-lg border border-gray-300">
        <div className="pt-20 pb-20 px-6">
          <img
            width="150"
            className=" mx-auto"
            src="https://letter-so.s3.amazonaws.com/prototypr/6dd2bd90-2c61-4163-bd5d-720567a692e6.png"
            style={{ opacity: "0.92" }}
          />
          <h1 className="text-lg text-gray-500 pt-0 mt-4 mb-8 text-center">
           No notifications yet.
          </h1>
        </div>
      </div>
    )
}

export default NotificationEmptyState