import * as Yup from "yup";

import { Form, Formik } from "formik";
import { handleResetPwd, validateUser } from "../authThunk";
import { selectSubmit, selectValidUser } from "../authSlice";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { useEffect, useState } from "react";

import { AuthLayout } from "../../../components/layouts/Auth/AuthLayout";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { InputField } from "../../../components/common/InputField/InputField";
import LoadingButton from "@mui/lab/LoadingButton";
import NotFound from "../../../components/common/NotFound/NotFound";
import { UserProfile } from "../../../models";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useParams } from "react-router-dom";

export default function ResetPassword() {
  const { email } = useParams();

  const dispatch = useAppDispatch();
  const isSubmitting = useAppSelector(selectSubmit);

  const isValidUser = useAppSelector(selectValidUser);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    dispatch(validateUser({ email }));
  }, [dispatch, email]);

  const initialValue = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required!!"),

    password: Yup.string()
      .min(5, "Password must be at least 5 characters")
      .required("Password is required!!"),
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleResetPassword = (values: UserProfile) => {
    dispatch(handleResetPwd(values));
  };

  if (!isValidUser)
    return (
      <NotFound
        hasButton
        className="w-full h-full flex justify-center items-center"
      />
    );

  return (
    <AuthLayout
      layoutDescription="Reset your password with Chatvia"
      title="Reset your password"
    >
      <div className="p-4">
        <Formik
          initialValues={initialValue}
          onSubmit={(values) => handleResetPassword(values)}
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
                      helperText={touched.email && errors.email}
                      error={touched.email && Boolean(errors.email)}
                    />
                  </div>

                  <div className="mb-4">
                    <InputField
                      autoFocus={false}
                      type={showPassword ? "text" : "password"}
                      label="New Password"
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
                      Update Password
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
