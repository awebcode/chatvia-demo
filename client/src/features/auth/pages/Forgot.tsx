import * as Yup from "yup";

import { Card, Link } from "@mui/material";
import { Form, Formik } from "formik";

import { AuthLayout } from "../../../components/layouts/Auth/AuthLayout";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import { UserProfile } from "../../../models";
import { selectSubmit } from "../authSlice";
import { useAppSelector } from "../../../app/store";

export default function Forgot() {
  const isSubmitting = useAppSelector(selectSubmit);

  const initialValue = {
    email: "",
  };

  const handleForgot = async (values: UserProfile) => {
    console.log("🚀 ~ file: Forgot.tsx:22 ~ handleForgot ~ values:", values);
    // dispatch();
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required!!"),
  });

  return (
    <AuthLayout
      layoutDescription="Reset Password with Chatvia."
      title="Forgot Password"
    >
      <div className="p-4">
        <Formik
          initialValues={initialValue}
          onSubmit={(values) => handleForgot(values)}
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
                  <TextField
                    type="text"
                    fullWidth
                    id="outlined-error"
                    label="Email"
                    className="mb-4"
                    name="email"
                    placeholder="Ex: example@gmail.com"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.email && errors.email}
                    error={touched.email && Boolean(errors.email)}
                  />

                  <Card
                    sx={{ margin: "1rem 0", p: "0.5rem", fontWeight: "600" }}
                    elevation={2}
                  >
                    You should enter your mail name before @gmail.com
                  </Card>

                  <p className="container my-3 flex-center font-semibold text-gray-600">
                    Remember It? &nbsp;
                    <Link href="/" className="text-indigo-700 font-semibold">
                      <p className="font-semibold main-color">Sign In</p>
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
                          ? "bg-transparent w-full capitalize h-full py-2 px-4"
                          : "bg-purple w-full capitalize h-full py-2 px-4"
                      }
                    >
                      send
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
