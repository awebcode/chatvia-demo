import * as Yup from "yup";

import { Button, Link, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../app/store";

import { AuthLayout } from "../../../components/layouts/Auth/AuthLayout";
import LoadingButton from "@mui/lab/LoadingButton";
import { UserProfile } from "../../../models";
import { selectSubmit } from "../authSlice";
import { signup } from "../authThunk";
import { specialAndSpace } from "../../../constants";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSubmitting = useAppSelector(selectSubmit);

  const initialValue = {
    username: "",
    password: "",
    email: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Invalid Username")
      .required("Username is required!!")
      .matches(specialAndSpace, "Cannot contain special characters or spaces"),

    password: Yup.string()
      .min(5, "Password must be at least 5 characters")
      .required("Password is required!!"),

    email: Yup.string().email().required("Email is required!!"),
  });

  const handleSubmit = (values: UserProfile) => {
    dispatch(signup(values));
  };

  return (
    <AuthLayout
      layoutDescription="Get your Chatvia account now."
      title="Sign In"
    >
      <div className="p-4">
        <Formik
          initialValues={initialValue}
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={validationSchema}
        >
          {(formikProps) => {
            const {
              dirty,
              isValid,
              handleBlur,
              handleChange,
              touched,
              errors,
            } = formikProps;
            return (
              <Form>
                <div className="flex flex-col ">
                  <div className="mb-4">
                    <TextField
                      type="text"
                      fullWidth
                      id="outlined-error"
                      label="Username"
                      name="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.username && errors.username}
                      error={touched.username && Boolean(errors.username)}
                    />
                  </div>

                  <div className="mb-4">
                    <TextField
                      type="password"
                      fullWidth
                      id="outlined-error"
                      label="Password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.password && errors.password}
                      error={touched.password && Boolean(errors.password)}
                    />
                  </div>

                  <TextField
                    fullWidth
                    id="outlined-error"
                    label="Email"
                    className="mb-4"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    helperText={touched.email && errors.email}
                    error={touched.email && Boolean(errors.email)}
                  />

                  <div className="container my-2 flex justify-center text-gray-400">
                    <Button
                      onClick={() => navigate("/forgot")}
                      className="text-sm mx-auto"
                    >
                      <p className="text-sm mx-auto dark-gray font-medium">
                        Forget your password
                      </p>
                    </Button>
                  </div>

                  <p className="container my-3 flex-center font-semibold text-gray-600">
                    Already have an account? &nbsp;
                    <Link href="/">
                      <p className="font-semibold main-color capitalize no-underline">
                        sign in
                      </p>
                    </Link>
                  </p>

                  <LoadingButton
                    sx={{ padding: 0 }}
                    type="submit"
                    variant="contained"
                    disabled={!dirty || !isValid}
                    loading={isSubmitting}
                  >
                    <div
                      className={
                        !dirty || !isValid
                          ? "bg-transparent w-full h-full py-2 px-4"
                          : "bg-purple w-full h-full py-2 px-4"
                      }
                    >
                      sign up
                    </div>
                  </LoadingButton>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </AuthLayout>
  );
}
