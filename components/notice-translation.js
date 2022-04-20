/* This example requires Tailwind CSS v2.0+ */
import { SpeakerphoneIcon, XIcon } from '@heroicons/react/outline'
import { FormattedMessage, useIntl } from "react-intl";

export default function NoticeTranslation() {
  return (
    <div className="bg-gray-100 rounded mt-4">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex-1 flex items-center">
            <span className="flex p-1.5 rounded-lg bg-white text-lg w-10 h-10 justify-center">
             🇪🇸
            </span>
            <p className="ml-3 font-medium text-gray-800">
              <FormattedMessage id="notice.translation.copy" />
            </p>
          </div>
          <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
            <a
              
              className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-indigo-50"
            >
              <FormattedMessage id="notice.translation.button" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}