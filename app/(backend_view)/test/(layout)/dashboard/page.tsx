import { cookies, headers } from "next/headers";
import { FaArrowRight } from "react-icons/fa6";
import { SiHyperskill } from "react-icons/si";
import { DiCodeigniter } from "react-icons/di";
import { PiCodesandboxLogoFill } from "react-icons/pi";
import Link from "next/link";
import { SiSpeedypage } from "react-icons/si";

export const dynamic = "force-dynamic";

/* =======================================================================
  to fetch data from protected routes always attach the required 
  cookies that are stored in the browser(when you make a request to protected
  routes naturally cookies or not attched to it we have to manually attach
  required headers and cookies
          )
     ======================================================================= */
async function fetchData(path: string) {
  const res = await fetch(path, {
    method: "GET",
    headers: { Cookie: cookies().toString() },
    credentials: "include", // Ensure cookies are sent in the request
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return await res.json();
}
export default function PageName() {
  // const headersList = headers();
  // // const baseUrl = headersList.get("x-base-url"); // to get url
  // const baseUrl = process.env.NEXT_PUBLIC_URL; // to get url

  // const skillsRes = await fetchData(`${baseUrl}/api/v1/skills/authorised`);
  // const projectsRes = await fetchData(`${baseUrl}/api/v1/projects/authorised`);
  // const applicationsRes = await fetchData(
  //   `${baseUrl}/api/v1/job-applications/authorised`
  // );

  return (
    <div>
      <div
        className={`p-4 pb-0 bg-white text-black  ||  flex flex-col   shadow  rounded-xl border-b-xblue border-b-2`}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores animi
        tempore dicta, tenetur nobis fuga ipsa veniam accusantium ab. Quidem
        quaerat doloremque eum, atque vitae mollitia ab. Itaque, distinctio
        reiciendis quidem nisi adipisci culpa temporibus nulla eveniet neque
        aspernatur, qui dignissimos exercitationem blanditiis maiores sapiente.
        Molestias impedit in aperiam, delectus quisquam aliquam eaque provident
        obcaecati voluptate eius blanditiis minus quis quibusdam, aliquid
        asperiores? Quo iste amet perferendis repellendus! Repellat placeat
        aspernatur quas ipsa aperiam qui suscipit eveniet impedit, in est
        molestiae asperiores eligendi sapiente repudiandae, ea cumque! Porro
        impedit quibusdam, harum adipisci inventore itaque odit mollitia cum ex
        ullam quas deleniti magni aspernatur aliquid? Voluptates excepturi
        voluptatibus dicta. Commodi veniam ullam quam aut rem exercitationem
        sunt earum nulla adipisci esse! Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Consectetur tempore, fuga quo laudantium non quisquam
        esse eligendi quia rerum dignissimos aliquid temporibus laborum.
        Necessitatibus praesentium perferendis, itaque distinctio non voluptate
        repellendus consequatur fugiat maxime culpa aliquam porro, vitae
        veritatis, assumenda tempore. Libero ducimus facere maxime dolorum porro
        voluptas doloribus earum praesentium officia reiciendis! Obcaecati illo
        vitae harum ipsa inventore, incidunt voluptatem. Repellendus cupiditate
        assumenda adipisci, illum totam, hic reprehenderit maiores expedita
        aperiam saepe delectus esse labore ratione enim laboriosam nihil sunt,
        architecto nobis magnam! Vel iure, repudiandae eum laboriosam maiores
        optio perspiciatis ipsum doloribus placeat inventore ducimus minus
        aperiam non quasi, quibusdam adipisci fugiat dolorem, praesentium iste
        sit repellat accusamus mollitia. Accusamus, illo cumque. Expedita porro
        odio labore nemo perspiciatis placeat deleniti, laboriosam rerum
        accusamus officiis dolor repellendus. Quidem.
      </div>
    </div>
  );
}
