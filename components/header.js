import Link from 'next/link'

export default function Header() {
  return (
    <h2 className="hover:underline text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
      <Link href="/">Home</Link>.
    </h2>
  )
}
