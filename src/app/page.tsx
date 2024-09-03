import { redirect } from "next/navigation";

export default function Home() {

  if ( process.env.NODE_ENV === "development" ) {
     redirect('/charts/qap')
  }
   
  return null;
}
