import React, { useEffect, useState, Fragment, ref, forwardRef } from "react";
import Head from "next/head";

import Layout from "@/components/Layout/Layout";
import Card from "@/components/Card/Card";

import { useForm, Controller, useController, get } from "react-hook-form";
import { CheckboxField, Checkbox } from "@/components/Catalyst/checkbox";
import { createClient } from "@/utils/supabase/component";
import {
  Description,
  Field,
  FieldGroup,
  Fieldset,
  Label,
  Legend,
} from "@/components/catalyst/fieldset";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const steps = [
  {
    id: 1,
    name: "Basic Information",
  },
  {
    id: 2,
    name: "Symptom Severity",
  },
  {
    id: 3,
    name: "Comments",
  },
  {
    id: 4,
    name: "Review & Submit",
  },
];

const NewSymptomEntryForm = () => {
  const supabase = createClient();
  const [symptoms, setSymptoms] = useState(null);
  const [page, setPage] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [formData, setFormData] = useState({
    dateAndTime: new Date(),
    symptoms: [],
    comments: null,
  });

  useEffect(() => {
    const getSymptoms = async () => {
      let { data: Symptoms, error } = await supabase
        .from("Symptoms")
        .select("*")
        .order("Severity", { ascending: false });

      if (!error) {
        setSymptoms(Symptoms);
      }
    };

    getSymptoms();
  }, []);

  const { register, handleSubmit, watch, control, formState, getValues } =
    useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const CustomDateInput = forwardRef(({ value, onClick, className }, ref) => (
    <button className={className} onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  return (
    <>
      <ul className="lg:grid lg:grid-cols-4 lg:gap-5 !mt-12 [&_dd]:font-light">
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
        onSubmit={handleSubmit(onSubmit)}
      >
        {page == 0 && (
          <Fieldset>
            <FieldGroup>
              <Field>
                <Label className="block">Date & Time</Label>
                <Controller
                  name="date"
                  control={control}
                  defaultValue={new Date()}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <DatePicker
                      selected={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      showTimeSelect
                      dateFormat="MMMM d, yyyy h:mm aa"
                      timeIntervals={1}
                      customInput={
                        <CustomDateInput className="bg-transparent border border-gray-300 rounded  p-2 relative" />
                      }
                    />
                  )}
                />
              </Field>
              {symptoms && (
                <Field>
                  <Label>Symptoms</Label>
                  <Description className="mb-5">
                    Select all symptoms that you are experiencing.
                  </Description>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                    {symptoms.map((symptom) => (
                      <Fragment key={symptom.id}>
                        <div className="relative flex items-start">
                          <div className="flex h-6 items-center">
                            <input
                              {...register(`symptoms`)}
                              id="symptoms"
                              type="checkbox"
                              value={symptom.Name}
                              className="h-4 w-4 rounded border-gray-300 text-evening-sea-500 focus:ring-evening-sea-600"
                            />
                          </div>
                          <div className="ml-3 text-sm leading-6">
                            <label
                              htmlFor={symptom.Name}
                              className="font-medium"
                            >
                              {symptom.Name}
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
          <Fieldset>
            {getValues("symptoms").map((symptom, i) => (
              <FieldGroup key={i}>
                <Field>
                  <Label>{symptom}</Label>
                </Field>
              </FieldGroup>
            ))}
          </Fieldset>
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
          <button
            disabled={page == steps.length}
            className="bg-evening-sea-500 rounded font-semibold disabled:bg-gray-500 p-2 text-white"
            onClick={(e) => {
              e.preventDefault();
              setPage((prevState) => prevState + 1);
            }}
          >
            Next
          </button>
        </div>
      </form>
    </>
  );
};

const Page = () => {
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

Page.getLayout = function getLayout(page) {
  return (
    <>
      <Head>
        <title>New Symptom Entry</title>
      </Head>
      <Layout>{page}</Layout>
    </>
  );
};
