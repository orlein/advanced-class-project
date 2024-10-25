export default function Header() {
  return (
    <header className='bg-background w-screen fixed top-0 left-0 h-16 z-40 flex justify-center items-center border-b'>
      <section>
        <h1 className='text-4xl'>원정대</h1>
      </section>
      <section>
        <div className='bg-foreground rounded-full size-10 absolute top-1/2 right-8 -translate-y-1/2'></div>
      </section>
    </header>
  );
}
