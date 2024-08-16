import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

const DemoCodeDialog = ({ isDialogOpen, setIsDialogOpen, demoCode, theme }) => {
  const [copyButtonText, setCopyButtonText] = useState("Copy");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(demoCode).then(() => {
      setCopyButtonText("Copied!");
      setTimeout(() => {
        setCopyButtonText("Copy");
      }, 2000);
    });
  };

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Dialog.Trigger asChild>
        <button className="hidden">Open Dialog</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-[98]" />
        <Dialog.Content className="fixed m-6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg max-w-[680px] w-full z-[9999]">
          <Dialog.Title className="text-lg font-semibold mb-4">
            Demo Code
          </Dialog.Title>
          <Dialog.Description className="mb-4">
            Here is the demo code with the current props:
          </Dialog.Description>
          <pre className="bg-gray-100 p-4 h-[500px] max-h-[90%] text-gray-600 rounded-md overflow-auto">
            <code>{demoCode}</code>
          </pre>
          <div className="mt-4 flex justify-end">
            <button
              onClick={copyToClipboard}
              className={`py-2 px-4 ${
                theme === "blue" ? "bg-blue-600" : "bg-gray-600"
              } text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                theme === "blue" ? "focus:ring-blue-500" : "focus:ring-gray-500"
              } mr-2`}
            >
              {copyButtonText}
            </button>
            <Dialog.Close asChild>
              <button className="py-2 px-4 bg-transparent border border-gray-300 text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                Close
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DemoCodeDialog;