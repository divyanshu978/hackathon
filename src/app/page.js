import Image from "next/image";
import Artificial from "./component/artificial";
import Nav from "./component/navbar";

export default function Home() {


  return (
   <>
  
    <Nav/>

<div className="h-140 flex-col  flex items-center justify-center gap-6 font-bold ">
 <h1 className="sm:text-xl md:text-3xl lg:text-5xl">Welcome To Walmart Navigator</h1>
  <h1 className="sm:text-xl md:text-2xl lg:text-3xl text-gray-300/70">A fully fledged navigator</h1>
</div>

<div className="flex  flex-col items-center gap-6 justify-center">
 <h1 className="sm:text-xl md:text-xl lg:text-2xl text-gray-100/70">Feel Free to ask </h1> 
  
  </div>

   <Artificial/>
   </>
  );
}
