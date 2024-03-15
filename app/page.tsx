import Image from "next/image";
import Clock from "@/app/ui/clock";

export default async function Home() {
  return (
    <div className="parent">
      <header>
        <Image src="/logo.svg" alt="logo"
            width={50}
            height={50}
            priority={true}/>
      </header>
      <div className="left-side"></div>
      <main>
        <Clock />
      </main>
      <div className="right-side section yellow"></div>
      <footer>
        <div>a project by <a href="https://sonolibero.io" target="_blank">libero</a></div>
        <div>© 2092</div>
      </footer>
    </div>
  );
}
