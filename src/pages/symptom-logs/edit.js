import React, { useState, Fragment, useEffect } from "react";

import { useRouter } from "next/router";

import Head from "next/head";

import Layout from "@/components/Layout/Layout";
import Card from "@/components/Card/Card";

import { createClient } from "@/utils/supabase/component";

import { useStore } from "@/store";

import {
  Description,
  Field,
  FieldGroup,
  Fieldset,
  Label,
  Legend,
} from "../../components/Catalyst/fieldset";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const steps = [
  {
    id: 1,
    name: "Basic Details",
  },
  {
    id: 2,
    name: "Comments",
  },
  {
    id: 3,
    name: "Review & Submit",
  },
];

const NewSymptomEntryForm = () => {
  const router = useRouter();
  const supabase = createClient();
  const user = useStore((state) => state.user);

  const [submitError, setSubmitError] = useState({
    isError: false,
    message: "",
  });

  const [page, setPage] = useState(0);

  //   GET ROW

  const [formData, setFormData] = useState({
    dateAndTime: new Date(),
    supaDate: new Date().toISOString(),
    symptoms: [],
    comments: "",
  });

  const query = router.query.id;

  useEffect(() => {
    const getEntry = async () => {
      let { data, error } = await supabase
        .from("Symptom Logs")
        .select("*")
        .eq("id", query);

      if (!error) {
        setFormData((prevState) => ({
          ...prevState,
          dateAndTime: new Date(data[0].date),
          symptoms: data[0].symptoms,
          comments: data[0].comments,
        }));
      }
    };

    getEntry();
  }, []);

  const symptoms = [
    "Heartburn",
    "Difficulty swallowing",
    "Cough",
    "Throat irritation",
    "Chest pain",
    "Nausea",
    "Vomiting",
    "Bloating",
    "Loss of Appetite",
    "Abdominal pain",
    "Diarrhea",
    "Constipation",
  ];

  const onSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("Symptom Logs")
      .update([
        {
          date: formData.supaDate,
          symptoms: formData.symptoms,
          comments: formData.comments,
          user_id: user.id,
        },
      ])
      .eq("id", query)
      .select();

    if (error) {
      setSubmitError({
        isError: true,
        message: error,
      });
    } else {
      router.push("/symptom-logs");
    }
  };

  const handleSymptomAdd = (e) => {
    const value = e.target.value;

    if (formData.symptoms.includes(value)) {
      setFormData((prevState) => ({
        ...prevState,
        symptoms: [...prevState.symptoms.filter((item) => item !== value)],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        symptoms: [...prevState.symptoms, value],
      }));
    }
  };

  const handleDateChange = (date) => {
    const supaDate = new Date(date);
    const formattedSupaDate = supaDate.toISOString();

    setFormData((prevState) => ({
      ...prevState,
      dateAndTime: date,
      supaDate: formattedSupaDate,
    }));
  };

  const handleRemoveSymptom = (e) => {
    const value = e.target.innerHTML;

    setFormData((prevState) => ({
      ...prevState,
      symptoms: [...prevState.symptoms.filter((item) => item !== value)],
    }));
  };

  return (
    <>
      <ul className="lg:grid lg:grid-cols-3 lg:gap-5 !mt-12 [&_dd]:font-light">
        {steps.map((step) => (
          <Fragment key={step.id}>
            {page + 1 >= step.id ? (
              <li key={step.id} className="space-y-2">
                <div className="w-full h-1 bg-evening-sea-500"></div>
                <dl>
                  <dt className="text-sm text-evening-sea-500">
                    Step {step.id}
                  </dt>
                  <dd className="text-base">{step.name}</dd>
                </dl>
              </li>
            ) : (
              <li key={step.id} className="space-y-2">
                <div className="w-full h-1 bg-gray-100"></div>
                <dl>
                  <dt className="text-sm text-gray-500">Step {step.id}</dt>
                  <dd className="text-base">{step.name}</dd>
                </dl>
              </li>
            )}
          </Fragment>
        ))}
      </ul>
      <form
        className="block !mt-12 space-y-6 min-h-[calc(100vh-600px)]"
        onSubmit={onSubmit}
      >
        {page == 0 && (
          <Fieldset>
            <FieldGroup>
              <Field>
                <Label className="block">Date & Time</Label>
                <DatePicker
                  onChange={handleDateChange}
                  selected={formData.dateAndTime}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy h:mm aa"
                  timeIntervals={1}
                  className="outline-1 -outline-offset-1 outline-gray-300 rounded p-2 relative focus:outline-2 focus:outline-evening-sea-500 focus:outline-offset-1 focus:border-evening-sea-500"
                />
              </Field>
              {symptoms && (
                <Field>
                  <Label>Symptoms</Label>
                  <Description className="mb-5">
                    Select all symptoms that you are experiencing.
                  </Description>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                    {symptoms.map((symptom, i) => (
                      <Fragment key={i}>
                        <div className="relative flex items-start">
                          <div className="flex h-6 items-center">
                            <input
                              id="symptoms"
                              type="checkbox"
                              value={symptom}
                              className="h-4 w-4 rounded border-gray-300 text-evening-sea-500 focus:ring-evening-sea-600"
                              name={symptom}
                              onChange={handleSymptomAdd}
                              checked={formData.symptoms.includes(symptom)}
                            />
                          </div>
                          <div className="ml-3 text-sm leading-6">
                            <label htmlFor={symptom} className="font-medium">
                              {symptom}
                            </label>
                          </div>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                </Field>
              )}
            </FieldGroup>
          </Fieldset>
        )}
        {page == 1 && (
          <>
            <Field>
              <Label>Commments</Label>
              <Description>
                If there’s anything else you’d like to share about your
                symptoms, such as severity, frequency, or related concerns,
                please provide details here.
              </Description>
            </Field>
            <div>
              <textarea
                id="about"
                name="about"
                rows={3}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-evening-sea-950 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-1 focus:outline-evening-sea-500 sm:text-sm/6"
                value={formData.comments}
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    comments: e.target.value,
                  }))
                }
              />
            </div>
          </>
        )}
        {page == 2 && (
          <>
            <Field>
              <Label>Review your entry</Label>
            </Field>
            <div>
              <div className="flex gap-2">
                <p className="font-bold">Date:</p>
                <p>
                  {formData.dateAndTime.toLocaleString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <p className="font-bold">Symptoms:</p>
              <ul className="flex gap-x-2">
                {formData.symptoms.map((symptom) => (
                  <li
                    key={symptom}
                    onClick={handleRemoveSymptom}
                    className="w-fit bg-orange-100 hover:bg-orange-200 rounded-full px-3 text-sm py-1 text-orange-500 group hover:cursor-pointer transition-all"
                  >
                    <span className="font-medium">{symptom}</span>{" "}
                    <button className="font-bold">x</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="space-y-2">
                <p className="font-bold">Comments:</p>
                <p className="bg-gray-100 rounded px-1 py-2 min-h-20 text-gray-600">
                  {formData.comments}
                </p>
              </div>
            </div>
          </>
        )}
        <div className="flex justify-center gap-5">
          <button
            disabled={page == 0}
            className="bg-evening-sea-500 p-2 rounded text-white font-semibold disabled:bg-gray-500"
            onClick={(e) => {
              e.preventDefault();
              setPage((prevState) => prevState - 1);
            }}
          >
            Previous
          </button>
          {page == steps.length - 1 ? (
            <input
              type="submit"
              className="bg-green-500 rounded font-semibold disabled:bg-gray-500 p-2 text-white hover:cursor-pointer"
            />
          ) : (
            <button
              disabled={page == steps.length - 1}
              className="bg-evening-sea-500 rounded font-semibold disabled:bg-gray-500 p-2 text-white"
              onClick={(e) => {
                e.preventDefault();
                setPage((prevState) => prevState + 1);
              }}
            >
              Next
            </button>
          )}
        </div>
      </form>
    </>
  );
};

import { createClient as createServerClient } from "@/utils/supabase/server-props";

export async function getServerSideProps(context) {
  const supabase = createServerClient(context);

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  let { data: user_data } = await supabase
    .from("user_data")
    .select()
    .eq("id", user.id);

  return {
    props: {
      user: user,
      userData: user_data[0],
    },
  };
}

const Page = ({ user, userData }) => {
  return (
    <Card>
      <h1 className="text-lg font-bold uppercase">
        Add a new symptom log entry
      </h1>
      <NewSymptomEntryForm />
    </Card>
  );
};

export default Page;

Page.getLayout = function getLayout(page, { user, userData }) {
  return (
    <>
      <Head>
        <title>New Symptom Entry</title>
      </Head>
      <Layout user={user} userData={userData}>
        {page}
      </Layout>
    </>
  );
};
