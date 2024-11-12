import './sign-up-form.scss';
import {Form, Formik} from "formik";
import {Field} from "../../../shared/ui/field/ui";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {signUpService} from "../../../shared/api/sign-up-service";
import {SignUpDto} from "../../../shared/api/types/sign-up.dto";
import {userStore} from "../../../entities/user";
import useLocalStorageState from "use-local-storage-state";

type ValuesType = SignUpDto

type PropsType = {
    onSignUp?: Function
}

export function SignUpForm({onSignUp}: PropsType) {
    const {t} = useTypedTranslation()
    const [accessToken, setAccessToken, {removeItem: removeAccessToken}] = useLocalStorageState<string>("ACCESS-TOKEN", {defaultValue: ""});
    const [refreshToken, setRefreshToken, {removeItem: removeRefreshToken}] = useLocalStorageState<string>("REFRESH-TOKEN", {defaultValue: ""});
    return (
        <Formik<ValuesType> initialValues={{username: "", email: "", password: ""}}
                            onSubmit={(signUpDto, formikHelpers) => {
                                signUpService.signUp(signUpDto).then(response => {
                                    setAccessToken(response.access_token,);
                                    setRefreshToken(response.refresh_token);
                                    userStore.auth(response.access_token, response.refresh_token, (accessToken, refreshToken) => {
                                        setAccessToken(accessToken)
                                        setRefreshToken(refreshToken)
                                    });
                                    onSignUp?.();
                                }).catch((error) => {
                                    if (error.response.data.detail === "Username already exists") {
                                        formikHelpers.setFieldError("username", t("User With That Name Already Exists"));
                                    } else if (error.response.data.detail === "Email already exists") {
                                        formikHelpers.setFieldError("email", t("User With That Email Already Exists"));
                                    }
                                });
                            }}>
            {({}) => <Form className="sign-in-form">
                {/*TODO rename to sign-up*/}
                <Field name="username"
                       label={t("Name") + ":"}
                       placeholder={t("Enter Your Name")}/>
                <Field name="email"
                       label={t("Email") + ":"}
                       placeholder={"djonson@gmail.com"}/>
                <Field name="password"
                       label={t("Password") + ":"}
                       type={"password"}
                       placeholder="********"/>
                <button className="submit-button"
                        type="submit">{t("Sign Up")}</button>
            </Form>}
        </Formik>
    )
}
