const EmptyState = ({ draft }) => {
    return (
      <div className="mt-6 mx-auto rounded-lg border border-gray-300">
        <div className="pt-20 pb-20 px-6">
          <img
            width="150"
            className=" mx-auto"
            src="https://letter-so.s3.amazonaws.com/prototypr/6dd2bd90-2c61-4163-bd5d-720567a692e6.png"
            style={{ opacity: "0.92" }}
          />
          <h1 className="text-lg text-gray-500 pt-0 mt-4 mb-8 text-center">
            {draft
              ? `No drafts in progress.`
              : `You've not published anything.`}
          </h1>
          {draft && (
            <div class="flex justify-center w-full my-3">
              <a
                class="inline-block bg-blue-600 hover:bg-blue-500 mx-auto text-white font-semibold  py-2 px-6 rounded-full shadow hover:shadow-lg"
                href="/write"
              >
                New draft
              </a>
            </div>
          )}
        </div>
      </div>
    );
  };

  export default EmptyState