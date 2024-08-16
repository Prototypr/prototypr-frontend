import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as RadixSwitch from "@radix-ui/react-switch";

const SimulatorDialog = ({ isOpen, onOpenChange, simulatorSettings, onSimulatorChange }) => (
  <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30 z-[999]" />
      <Dialog.Content className="z-[9999] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
        <Dialog.Title className="text-lg font-medium">Simulator Settings</Dialog.Title>
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex items-center justify-between w-full">
            <label className="text-sm font-medium text-gray-700">Simulate onSave</label>
            <RadixSwitch.Root
              checked={simulatorSettings.onSave}
              onCheckedChange={checked => onSimulatorChange({ ...simulatorSettings, onSave: checked })}
              className={`w-10 h-5 rounded-full relative shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${
                simulatorSettings.onSave ? "bg-blue-500/90" : "bg-gray-300"
              }`}
            >
              <RadixSwitch.Thumb
                className={`block w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                  simulatorSettings.onSave ? "translate-x-5" : "translate-x-1"
                }`}
              />
            </RadixSwitch.Root>
          </div>
          <div className="flex items-center justify-between w-full">
            <label className="text-sm font-medium text-gray-700">Simulate onCreate</label>
            <RadixSwitch.Root
              checked={simulatorSettings.onCreate}
              onCheckedChange={checked => onSimulatorChange({ ...simulatorSettings, onCreate: checked })}
              className={`w-10 h-5 rounded-full relative shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${
                simulatorSettings.onCreate ? "bg-blue-500/90" : "bg-gray-300"
              }`}
            >
              <RadixSwitch.Thumb
                className={`block w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                  simulatorSettings.onCreate ? "translate-x-5" : "translate-x-1"
                }`}
              />
            </RadixSwitch.Root>
          </div>
          <div className="flex items-center justify-between w-full">
            <label className="text-sm font-medium text-gray-700">Simulate onPublish</label>
            <RadixSwitch.Root
              checked={simulatorSettings.onPublish}
              onCheckedChange={checked => onSimulatorChange({ ...simulatorSettings, onPublish: checked })}
              className={`w-10 h-5 rounded-full relative shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${
                simulatorSettings.onPublish ? "bg-blue-500/90" : "bg-gray-300"
              }`}
            >
              <RadixSwitch.Thumb
                className={`block w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                  simulatorSettings.onPublish ? "translate-x-5" : "translate-x-1"
                }`}
              />
            </RadixSwitch.Root>
          </div>
        </div>
        <Dialog.Close className="absolute top-2 right-2">X</Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default SimulatorDialog;