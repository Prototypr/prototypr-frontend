import { FormattedMessage, useIntl } from 'react-intl';
export default function TitleBlock() {
    const intl = useIntl();
    return (
        <aside className="lg:py-24 bg-gray-100 p-16 mb-8">
            <div className="max-w-xl mx-auto text-center">
                <h2 className="font-bold text-6xl tracking-wide text-title-1">{intl.formatMessage({ id: "newsletter.title" })}</h2>
            </div>
        </aside>
    )
}