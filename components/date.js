import parseISO from 'date-fns/parseISO'
import format from 'date-fns/format'
import es from 'date-fns/locale/es'
import { useIntl } from "react-intl";

export default function Date({ dateString, locale, className }) {
  const intl = useIntl();

  const date = parseISO(dateString)
  return <time dateTime={dateString} className={`${className} capitalize`}>{format(date, 'LLLL	d, yyyy', {locale:intl.locale.indexOf('es-ES')>-1 ?es:''})}</time>
}
