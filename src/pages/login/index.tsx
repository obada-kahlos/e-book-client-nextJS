import React, { useEffect, useState } from "react";

import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import { useLoginMutation } from "@/api/register/api";
import { useRouter } from "next/router";
import Popup from "@/components/popup/popup";

const Login = () => {
  const schema = yup.object().shape({
    email: yup.string().required("This field is required"),
    password: yup
      .string()
      .min(8, "Password should be biger than 8")
      .max(30, "Password should be smaller than 30")
      .required("This field is required"),
  });

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

  const [login, { isSuccess, isLoading, error, data }]: any = useLoginMutation(
    {}
  );
  const handleLogin = (values: any) => {
    login(values);
  };

  if (isSuccess) localStorage.setItem("e-book", JSON.stringify(data));
  console.log({ error });
  const router = useRouter();
  useEffect(() => {
    if (isSuccess) {
      router.push("/landing");
    }
  }, [isSuccess]);

  return (
    <>
      <div className="hero min-h-screen ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores atque iste porro dicta, soluta id, recusandae deleniti
              mollitia provident assumenda delectus sequi in doloribus
              repellendus accusamus. Officiis praesentium fuga accusantium.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-2xl shadow-2xl bg-base-100">
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={schema}
              onSubmit={(values) => {
                handleLogin(values);
              }}
            >
              <Form>
                <div className="card-body">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <Field
                      type="text"
                      placeholder="email"
                      name="email"
                      className="input input-bordered"
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
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <Field
                      type="password"
                      placeholder="password"
                      name="password"
                      className="input input-bordered"
                    />
                    <ErrorMessage
                      name="password"
                      render={(msg) => (
                        <label className="label text-[#c44444] text-[12px]">
                          {msg}
                        </label>
                      )}
                    />
                    <label className="label">
                      <label
                        htmlFor="forgetPassword"
                        className="label-text-alt hover:text-bothColor cursor-pointer"
                      >
                        Forgot password?
                      </label>
                      <Link href="signup">
                        <span className="label-text-alt link link-hover hover:text-bothColor">
                          SginUp?
                        </span>
                      </Link>
                    </label>
                  </div>
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
                        Login
                      </button>
                    </>
                  )}
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
      <Popup id="forgetPassword">
        <>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Enter Your Email</span>
            </label>
            <label className="input-group">
              <span>Email</span>
              <input
                type="text"
                placeholder="info@site.com"
                className="input w-full input-bordered"
              />
            </label>
          </div>
          <button
            className="btn dark:glass btn-primary btn-block my-[10px]"
            type="submit"
          >
            Submit
          </button>
        </>
      </Popup>
    </>
  );
};

export default Login;
