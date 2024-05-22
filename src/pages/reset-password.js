import Head from "next/head";
import { useEffect, useState } from "react";

// function Form() {

//     return ()
// }

export default function Page() {
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const [showError, setShowError] = useState(false);
  const [isTypeText, setIsTypeText] = useState(false);

  useEffect(() => {
    if (newPasswordConfirmation.length > 0) {
      console.log("running actual code.");
      if (newPassword == newPasswordConfirmation) {
        console.log("passwords match!");
        setButtonIsDisabled(false);
        setShowError(false);
      } else {
        console.log("passwords do not match");
        setButtonIsDisabled(true);
        setShowError(true);
      }
    }
  }, [newPasswordConfirmation]);

  return (
    <>
      <Head>
        <title>Reset your password | Digestitrak</title>
      </Head>
      <main>
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Reset Your Password
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type={isTypeText ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-evening-sea-600 sm:text-sm sm:leading-6"
                      onChange={(e) => setNewPassword(e.target.value)}
                      value={newPassword}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="confirm-password"
                      name="confirm-password"
                      type={isTypeText ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-evening-sea-600 sm:text-sm sm:leading-6"
                      value={newPasswordConfirmation}
                      onChange={(e) =>
                        setNewPasswordConfirmation(e.target.value)
                      }
                    />
                  </div>
                  {showError && (
                    <>
                      <p className="text-xs text-red-500 bg-red-100 rounded mt-2 px-2 py-1">
                        Passwords do not match. Please verify that they are the
                        same.
                      </p>
                      <div className="mt-2 flex justify-end">
                        <input
                          type="checkbox"
                          onChange={(e) => setIsTypeText(e.target.checked)}
                        />
                        <label className="ml-2 text-xs italic">
                          Show password
                        </label>
                      </div>
                    </>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-evening-sea-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-evening-sea-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-evening-sea-600 disabled:bg-gray-300 disabled:text-gray-400"
                    disabled={buttonIsDisabled}
                  >
                    Reset
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
