import * as Yup from "yup";

import { Form, Formik } from "formik";
import { selectSignedIn, selectSubmit, selectSuccess } from "../authSlice";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { useEffect, useState } from "react";

import { AuthLayout } from "../../../components/layouts/Auth/AuthLayout";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { InputField } from "../../../components/common/InputField/InputField";
import LoadingButton from "@mui/lab/LoadingButton";
import { UserProfile } from "../../../models";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { signin } from "../authThunk";
import { specialAndSpace } from "../../../constants";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const signinStatus = useAppSelector(selectSignedIn);
  const isSubmitting = useAppSelector(selectSubmit);
  const isSuccess = useAppSelector(selectSuccess);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (signinStatus || isSuccess) {
      navigate("/dashboard");
    }
  }, [signinStatus, navigate, isSuccess]);

  const initialValue = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Invalid Username")
      .required("Username is required!!")
      .matches(specialAndSpace, "Cannot contain special characters or spaces"),

    password: Yup.string()
      .min(5, "Password must be at least 5 characters")
      .required("Password is required!!"),
  });

  const handleSignIn = (values: UserProfile) => {
    dispatch(signin(values));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <AuthLayout
      layoutDescription="Sign in to continue to Chatvia"
      title="Sign In"
    >
      <div className="p-4">
        <Formik
          initialValues={initialValue}
          onSubmit={(values) => handleSignIn(values)}
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
                <div className="flex flex-col">
                  <div className="mb-4">
                    <InputField
                      autoFocus={false}
                      type="text"
                      label="Username"
                      name="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.username && errors.username}
                      error={touched.username && Boolean(errors.username)}
                    />
                  </div>

                  <div className="mb-4">
                    <InputField
                      autoFocus={false}
                      type={showPassword ? "text" : "password"}
                      label="Password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.password && errors.password}
                      error={touched.password && Boolean(errors.password)}
                      appendIcon={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </div>

                  <div className="container my-2 flex justify-center text-gray-400">
                    <Button onClick={() => navigate("/forgot")}>
                      <p className="text-sm mx-auto dark-gray font-medium">
                        Forget your password
                      </p>
                    </Button>
                  </div>

                  <p className="container my-1 flex-center font-semibold text-gray-600">
                    Do not have an account? &nbsp;
                    <Button
                      onClick={() => navigate("/signup")}
                      className="text-indigo-700 font-semibold"
                    >
                      <p className="font-semibold main-color">Sign Up Now</p>
                    </Button>
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
                      Sign in
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
