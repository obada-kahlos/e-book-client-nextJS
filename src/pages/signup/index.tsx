import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { useSginUpMutation } from "@/api/register/api";
import { signupData } from "./data";
const Signup = () => {
  const schema = yup.object().shape({
    email: yup.string().required("This field is required"),
    firstName: yup.string().required("This field is required"),
    lastName: yup.string().required("This field is required"),
    gender: yup.string().required("This field is required"),
    password: yup
      .string()
      .min(8, "Password should be biger than 8")
      .max(30, "Password should be smaller than 30")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*^#?&-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|])[A-Za-z\d@$#!^%*?&-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]{8,32}$/,
        "Must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
      )
      .required("This field is required"),
    confirmPassword: yup
      .string()
      .required("Password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });
  const router = useRouter();

  const [sginUp, { isLoading, data, isSuccess, error }]: any =
    useSginUpMutation({});
  console.log({ error });

  if (isSuccess) localStorage.setItem("e-book", JSON.stringify(data));

  useEffect(() => {
    if (isSuccess) {
      router.push("/landing");
    }
  }, [isSuccess]);

  const getToken =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("e-book") as any)
      : null;
  const [token, setToken] = useState<any>(null);
  useEffect(() => {
    if (getToken !== null) {
      setToken(getToken);
    }
  }, []);
  console.log({ token });

  const handleSginUp = (values: any) => {
    console.log({ values });
    sginUp({
      firstName: values.firstName,
      lastName: values.lastName,
      gender: values.gender,
      password: values.password,
      email: values.email,
    });
  };

  return (
    <>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">SignUp now!</h1>
            <p className="py-6">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat
              ipsum perferendis provident debitis ad earum quae eum alias
              possimus! Consequatur omnis eius cum sunt reiciendis voluptas
              error, quam sequi at dolore id magni laudantium quibusdam
              dignissimos maxime officia? Quasi, repellendus.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-2xl shadow-2xl bg-base-100">
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                gender: "Male",
                email: "",
                password: "",
              }}
              validationSchema={schema}
              onSubmit={(values) => {
                console.log(values);
                handleSginUp(values);
              }}
            >
              <Form>
                <div className="card-body">
                  <div className="md:grid block grid-cols-12 gap-1">
                    {signupData.map((item, key) => (
                      <div className={`${item.grid}`} key={key}>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">{item.label}</span>
                          </label>
                          <Field
                            type={item.type}
                            placeholder={item.placeholder}
                            name={item.name}
                            className="input input-bordered input-md"
                          />
                          <ErrorMessage
                            name={item.name}
                            render={(msg) => (
                              <label className="label text-[#c44444] text-[12px]">
                                {msg}
                              </label>
                            )}
                          />
                        </div>
                      </div>
                    ))}

                    <div className="md:col-span-6">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Password</span>
                        </label>
                        <Field
                          type="text"
                          placeholder="Password"
                          name="password"
                          className="input input-bordered input-md"
                        />
                        <ErrorMessage
                          name="password"
                          render={(msg) => (
                            <label className="label text-[#c44444] text-[12px]">
                              {msg}
                            </label>
                          )}
                        />
                      </div>
                    </div>

                    <div className="md:col-span-6">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Confirm Password</span>
                        </label>
                        <Field
                          type="text"
                          placeholder="Confirm Password"
                          name="confirmPassword"
                          className="input input-bordered input-md"
                        />
                        <ErrorMessage
                          name="confirmPassword"
                          render={(msg) => (
                            <label className="label text-[#c44444] text-[12px]">
                              {msg}
                            </label>
                          )}
                        />
                      </div>
                    </div>
                    <div className="md:col-span-12">
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">Select Your Gender</span>
                        </label>
                        <Field
                          as="select"
                          className="select select-bordered"
                          name="gender"
                        >
                          <option disabled selected>
                            Pick one
                          </option>
                          <option value={0}>Male</option>
                          <option value={1}>Female</option>
                        </Field>
                        <ErrorMessage
                          name="gender"
                          render={(msg) => (
                            <label className="label text-[#c44444] text-[12px]">
                              {msg}
                            </label>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <label className="label">
                    <Link
                      href="login"
                      className="label-text-alt link link-hover"
                    >
                      You have an account? LogIn!
                    </Link>
                  </label>

                  <div className="form-control mt-4">
                    {isLoading ? (
                      <button
                        className="btn dark:glass btn-primary loading"
                        type="submit"
                      ></button>
                    ) : (
                      <>
                        {error ? (
                          <div className="flex justify-center items-center">
                            <span className="label text-[#c44444] text-[16px]">
                              {error?.data}
                            </span>
                          </div>
                        ) : null}
                        <button
                          className="btn dark:glass btn-primary"
                          type="submit"
                        >
                          SignUp
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
