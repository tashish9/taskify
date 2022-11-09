import Head from "next/head";
import { useRouter } from "next/router";
import PrimaryButton from "../components/shared/buttons/primary-button";
import { sendRequest } from "../utils/send-request";
import { useAuthStore } from "../utils/store";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  const isUserLoggedIn = useAuthStore((state) => state.isUserLoggedIn);
  const setIsUserLoggedIn = useAuthStore((state) => state.setIsUserLoggedIn);

  const signInHandler = async () => {
    const response = await sendRequest({
      endpoint: "/api/signin",
    });
    localStorage.setItem("token", response.token);
    setIsUserLoggedIn(true);
  };

  const signOutHandler = () => {
    setIsUserLoggedIn(false);
    localStorage.removeItem("token");
  };

  return (
    <div className="h-full">
      <Head>
        <title>Taskify</title>
      </Head>

      <main className="flex h-full justify-evenly">
        <div className="mt-20 w-2/5 px-4 py-12">
          <div className="my-8 text-center">
            <h1 className="font-serif text-7xl uppercase tracking-wider">
              Taskify
            </h1>
            <p className="text-xl tracking-wide">
              One place to manage all your teams & tasks
            </p>
          </div>

          <div className="w-full  p-4">
            {!isUserLoggedIn && (
              <div className="">
                <PrimaryButton
                  additionalStyles="w-full capitalize"
                  name="SignIn"
                  onClick={signInHandler}
                />
              </div>
            )}
            {isUserLoggedIn && (
              <div className="flex flex-col gap-6">
                <PrimaryButton
                  additionalStyles="w-full capitalize"
                  name=" View Teams"
                  onClick={() => {
                    router.push("/teams");
                  }}
                />
                <button
                  className="text-teal-700 underline underline-offset-2 "
                  onClick={signOutHandler}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex w-1/2 items-center justify-center p-4">
          <div className="relative aspect-video w-full  object-cover">
            <Image
              className="object-cover"
              src="/teamwork.png"
              alt="teamwork"
              fill
              priority
            />
          </div>
        </div>
      </main>
    </div>
  );
}
