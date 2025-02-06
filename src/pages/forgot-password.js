import Head from "next/head";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/component";
// function Form() {

//     return ()
// }

export default function Page() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailSending, setEmailSending] = useState(false);

  const sendResetEmail = async (e) => {
    e.preventDefault();
    setEmailSending(true);
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/account/change-password",
    });

    if (!error) {
      setEmailSent(true);
      setEmailSending(false);
      setEmail("");
    }
  };

  return (
    <>
      <Head>
        <title>Reset your password | Digestitrak</title>
      </Head>
      <main>
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h1 className="text-lg font-bold text-evening-sea-950 text-center">
              Digestitrak
            </h1>
            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Get a password reset email
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
              {emailSent && (
                <div className="bg-green-100 px-2 py-2 rounded-lg">
                  <p className="text-green-500 font-semibold">
                    Password reset email sent. Check your email.
                  </p>
                </div>
              )}
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="text"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-evening-sea-600 sm:text-sm sm:leading-6"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full items-center gap-2 justify-center rounded-md bg-evening-sea-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-evening-sea-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-evening-sea-600 disabled:bg-gray-300 disabled:text-gray-400"
                    disabled={email == ""}
                    onClick={sendResetEmail}
                  >
                    {emailSending && (
                      <>
                        <svg
                          className="text-evening-sea-50 animate-spin"
                          viewBox="0 0 64 64"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                        >
                          <path
                            d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                            stroke="currentColor"
                            strokeWidth="5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                            stroke="currentColor"
                            strokeWidth="5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-evening-sea-700"
                          ></path>
                        </svg>
                        {"Sending Email"}
                      </>
                    )}
                    {!emailSending && "Send Email"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
