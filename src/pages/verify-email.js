import { useState } from "react";

import Head from "next/head";
import Image from "next/image";

const Page = () => {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Create your account on Digestitrak and take control of your GERD management journey. Sign up now to begin tracking your meals and symptoms, gaining insights to improve your gut health and overall well-being."
        />
        <title>Verify Your Email | Digestitrak | Gerd Symptom Tracker</title>
      </Head>
      <main>
        <section className="h-screen px-10 flex items-center justify-center">
          <div className="space-y-4">
            <Image
              src="https://nbnobnibyhrtkcphtbvc.supabase.co/storage/v1/object/public/images//email-confirmation-color-icon-e-mail-approval-response-hiring-letter-email-with-check-mark-employment-verification-letter-isolated-illustration-vector.jpg"
              alt="email verification illustration"
              width={300}
              height={300}
              className="mx-auto mix-blend-multiply"
            />
            <h1 className="text-6xl text-center font-bold">
              Verify your email
            </h1>
            <p className="text-center">
              check your inbox for a verification email to login.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Page;
