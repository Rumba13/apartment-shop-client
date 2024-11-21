import "./sign-in-form.scss";
import { Form, Formik } from "formik";
import { Field } from "../../../shared/ui/field/ui";
import { signInService } from "../../../shared/api/sign-in-service";
import { SignInDto } from "../../../shared/api/types/sign-in.dto";
import { userStore } from "../../../entities/user";
import { ERRORS } from "../../../shared/lib/backend-error-constants";
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from "../../../shared/lib/constants";
import { useTranslation } from "react-i18next";

type ValuesType = SignInDto;

type PropsType = {
   onSignIn?: Function;
};

export function SignInForm({ onSignIn }: PropsType) {
   const { t } = useTranslation();

   return (
      <Formik<ValuesType>
         initialValues={{ username: "sad", password: "sadad" }}
         onSubmit={(values, formikHelpers) => {
            signInService
               .signIn(values)
               .then(response => {
                  localStorage.setItem(ACCESS_TOKEN_NAME, response.access_token);
                  localStorage.setItem(REFRESH_TOKEN_NAME, response.refresh_token);
                  userStore.auth(response.access_token, response.refresh_token, (accessToken, refreshToken) => {
                     localStorage.setItem(ACCESS_TOKEN_NAME, accessToken);
                     localStorage.setItem(REFRESH_TOKEN_NAME, refreshToken);
                  });
                  onSignIn?.();
               })
               .catch(err => {
                  console.log(err);

                  if (err.response.data.detail === ERRORS.INCORRECT_USERNAME_OR_PASSWORD) {
                     formikHelpers.setFieldError("password", t("Incorrect Password Or Username"));
                  }
               });
         }}>
         {({}) => (
            <Form className="sign-in-form">
               <Field name="username" label={t("Name") + ":"} placeholder={t("Enter Your Name")} />
               <Field name="password" label={t("Password") + ":"} type={"password"} placeholder="********" />
               <button className="submit-button" type="submit">
                  {t("Sign In")}
               </button>
            </Form>
         )}
      </Formik>
   );
}
