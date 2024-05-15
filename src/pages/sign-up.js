import { useState } from "react";

import Head from "next/head";
import Link from "next/link";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;

    switch (e.target.type) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email, password);
  };

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Create your account on Digestitrak and take control of your GERD management journey. Sign up now to begin tracking your meals and symptoms, gaining insights to improve your gut health and overall well-being."
        />
        <title>Sign Up | Digestitrak | Gerd Symptom Tracker</title>
      </Head>
      <main>
        <section className="h-screen px-10 flex items-center justify-center">
          <div className="space-y-4">
            <h1 className="text-6xl text-center font-bold">
              Signup for{" "}
              <span className="text-evening-sea-500">Digestitrak</span>
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-evening-sea-700 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-evening-sea-700 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <button className="text-base uppercase bg-evening-sea-500 text-evening-sea-50 font-bold w-full py-3 px-2 rounded hover:bg-evening-sea-400">
                login
              </button>
              <p className="text-sm">
                Already have an account?{" "}
                <Link
                  href="/"
                  className="text-evening-sea-400 font-bold underline"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default Page;
