import { parseISO, format } from 'date-fns'
import { es } from 'date-fns/locale'
import { FormattedMessage, useIntl } from "react-intl";

export default function Date({ dateString, locale }) {
  const intl = useIntl();

  const date = parseISO(dateString)
  return <time dateTime={dateString} className="capitalize">{format(date, 'LLLL	d, yyyy', {locale:intl.locale.indexOf('es-ES')>-1 ?es:''})}</time>
}
