import { useRouter } from "next/router";
import LinksPage from '../links/LinksPage'

const Route = () => {
  const router = useRouter();
  const { route } = router.query; // Destructuring our router object

  return (
    <>
      <LinksPage category={route}/>
    </>
  );
};

export default Route;