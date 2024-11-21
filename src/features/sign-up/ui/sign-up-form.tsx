import "./sign-up-form.scss";
import { Form, Formik } from "formik";
import { Field } from "../../../shared/ui/field/ui";
import { signUpService } from "../../../shared/api/sign-up-service";
import { SignUpDto } from "../../../shared/api/types/sign-up.dto";
import { userStore } from "../../../entities/user";
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from "../../../shared/lib/constants";
import { useTranslation } from "react-i18next";

type ValuesType = SignUpDto;

type PropsType = {
   onSignUp?: Function;
};

export function SignUpForm({ onSignUp }: PropsType) {
   const { t } = useTranslation();

   return (
      <Formik<ValuesType>
         initialValues={{ username: "", email: "", password: "" }}
         onSubmit={(signUpDto, formikHelpers) => {
            signUpService
               .signUp(signUpDto)
               .then(response => {
                  localStorage.setItem(ACCESS_TOKEN_NAME, response.access_token)
                  localStorage.setItem(REFRESH_TOKEN_NAME, response.refresh_token)

                  userStore.auth(response.access_token, response.refresh_token, (accessToken, refreshToken) => {
                     localStorage.setItem(ACCESS_TOKEN_NAME, accessToken)
                     localStorage.setItem(REFRESH_TOKEN_NAME, refreshToken)
                  });
                  onSignUp?.();
               })
               .catch(error => {
                  if (error.response.data.detail === "Username already exists") {
                     formikHelpers.setFieldError("username", t("User With That Name Already Exists"));
                  } else if (error.response.data.detail === "Email already exists") {
                     formikHelpers.setFieldError("email", t("User With That Email Already Exists"));
                  }
               });
         }}>
         {({}) => (
            <Form className="sign-in-form">
               {/*TODO rename to sign-up*/}
               <Field name="username" label={t("Name") + ":"} placeholder={t("Enter Your Name")} />
               <Field name="email" label={t("Email") + ":"} placeholder={"djonson@gmail.com"} />
               <Field name="password" label={t("Password") + ":"} type={"password"} placeholder="********" />
               <button className="submit-button" type="submit">
                  {t("Sign Up")}
               </button>
            </Form>
         )}
      </Formik>
   );
}
