import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <div className="font-montserrat">Hello world</div>
      <div className="font-spaceGrotesk">Hello world</div>
      <div className="font-inter">Hello world</div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
