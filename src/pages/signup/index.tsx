import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { useSginUpMutation } from "@/api/register/api";
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
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">SignUp now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-2xl shadow-2xl bg-base-100">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              gender: "",
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
                  <div className="md:col-span-6">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">First Name</span>
                      </label>
                      <Field
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        className="input input-bordered input-md"
                      />
                      <ErrorMessage
                        name="firstName"
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
                        <span className="label-text">Last Name</span>
                      </label>
                      <Field
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        className="input input-bordered input-md"
                      />
                      <ErrorMessage
                        name="lastName"
                        render={(msg) => (
                          <label className="label text-[#c44444] text-[12px]">
                            {msg}
                          </label>
                        )}
                      />
                    </div>
                  </div>
                  <div className="md:col-span-12">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <Field
                        type="text"
                        placeholder="Email"
                        name="email"
                        className="input input-bordered input-md"
                      />
                      <ErrorMessage
                        name="email"
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
                  <Link href="login" className="label-text-alt link link-hover">
                    You have an account? LogIn!
                  </Link>
                </label>

                <div className="form-control mt-4">
                  {isLoading ? (
                    <div className="text-center">
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      {error ? (
                        <div className="flex justify-center items-center">
                          <span className="label text-[#c44444] text-[16px]">
                            {error?.data}
                          </span>
                        </div>
                      ) : null}
                      <button className="btn btn-primary" type="submit">
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
  );
};

export default Signup;
