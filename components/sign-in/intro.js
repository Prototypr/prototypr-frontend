
export default function Intro({session}) {
  console.log(session)
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        {session && session.user?`Hi, ${session.user.name}`:'Sign Up.'}
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
      {!session && 'Be part of the next generation of web publishing.'}
        
      </h4>
    </section>
  )
}
