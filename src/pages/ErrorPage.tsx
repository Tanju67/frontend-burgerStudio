import {
  useSearchParams,
  useNavigate,
  useRouteError,
  isRouteErrorResponse,
} from "react-router-dom";
import { FaRotateRight, FaCircleExclamation, FaHouse } from "react-icons/fa6";
import Button from "../shared/UIElements/button/Button";
import MainNav from "../shared/UIElements/Navigation/MainNav";

function ErrorPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const routeError = useRouteError();

  let status = searchParams.get("status");
  let message = searchParams.get("message");

  if (!status && routeError) {
    if (isRouteErrorResponse(routeError)) {
      status = routeError.status.toString();
      message = routeError.statusText || routeError.data?.message;
    } else if (routeError instanceof Error) {
      message = routeError.message;
      status = "500";
    }
  }

  status = status || "404";
  message = message || "We couldn't find the page you're looking for.";

  return (
    <>
      <MainNav title={"error"} />
      <div className="bg-main-light flex min-h-screen items-center justify-center p-6 text-center">
        <div className="w-full max-w-2xl space-y-8">
          <div className="relative inline-block">
            <h1 className="text-main-btn/10 text-[12rem] leading-none font-black italic select-none md:text-[18rem]">
              {status}
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <FaCircleExclamation className="text-main-btn animate-bounce text-6xl md:text-8xl" />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-text-dark text-3xl font-black tracking-tighter uppercase italic md:text-5xl">
              {status === "404"
                ? "Page Not Found"
                : status === "403"
                  ? "Access Denied"
                  : "System Error"}
            </h2>
            <p className="text-main-dark/60 mx-auto max-w-md text-sm font-bold tracking-widest uppercase">
              {message}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row">
            <Button
              type="button"
              onClick={() => navigate("/")}
              className="bg-main-btn flex w-full items-center justify-center gap-3 rounded-2xl px-10 py-4 font-black text-white uppercase italic sm:w-auto"
            >
              <FaHouse /> Home Kitchen
            </Button>

            <Button
              type="button"
              onClick={() => window.location.reload()}
              className="border-main-btn text-main-btn! flex w-full items-center justify-center gap-3 rounded-2xl border-2 bg-transparent px-10 py-4 font-black uppercase italic sm:w-auto"
            >
              <FaRotateRight /> Try Again
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
