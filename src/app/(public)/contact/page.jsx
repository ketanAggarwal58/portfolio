export default function ContactPage() {
  return (
    <section className="container p-3 mt-10 mx-auto">
      <div className="rounded-xl bg-white p-8 shadow-card">
        <h1 className="text-3xl font-bold">Contact KA</h1>
        <form className="mt-6 grid gap-4 max-w-xl">
          <input className="rounded-md border p-3" placeholder="Name" />
          <input className="rounded-md border p-3" placeholder="Email" type="email" />
          <textarea className="rounded-md border p-3" placeholder="Message" rows={5} />
          <button className="rounded-md bg-black px-4 py-2 text-white">Send</button>
        </form>
      </div>
    </section>
  );
}
