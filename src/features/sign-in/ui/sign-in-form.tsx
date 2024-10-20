import './sign-in-form.scss';
import {Form, Formik} from "formik";
import {Field} from "../../../shared/ui/field/ui";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {signInService} from "../../../shared/api/sign-in-service";
import {SignInDto} from "../../../shared/api/types/sign-in.dto";
import {userStore} from "../../../entities/user";
import {ERRORS} from "../../../shared/lib/backend-error-constants";
import useLocalStorageState from "use-local-storage-state";

type ValuesType = SignInDto;

type PropsType = {
    onSignIn?: Function
}

export function SignInForm({onSignIn}: PropsType) {
    const {t} = useTypedTranslation()
    const [accessToken,setAccessToken, {removeItem:removeAccessToken}] = useLocalStorageState<string>("ACCESS-TOKEN", {defaultValue: ""});
    const [refreshToken,setRefreshToken, {removeItem:removeRefreshToken}] = useLocalStorageState<string>("REFRESH-TOKEN", {defaultValue: ""});

    return (
        <Formik<ValuesType> initialValues={{username: "sad", password: "sadad"}} onSubmit={(values, formikHelpers) => {
            signInService.signIn(values).then((response) => {
                setAccessToken(response.access_token);
                setRefreshToken(response.refresh_token);
                userStore.auth(response.access_token, () => {
                    removeRefreshToken()
                    removeAccessToken()
                });
                onSignIn?.();
            }).catch((err) => {
                console.log(err)

                if (err.response.data.detail === ERRORS.INCORRECT_USERNAME_OR_PASSWORD) {
                    formikHelpers.setFieldError("password", t("Incorrect Password Or Username"))
                }
            })
        }}>
            {({}) => <Form className="sign-in-form">
                <Field name="username" label={t("Name") + ":"} placeholder={t("Enter Your Name")}/>
                <Field name="password" label={t("Password") + ":"} type={"password"} placeholder="********"/>
                <button className="submit-button" type="submit">{t("Sign In")}</button>
            </Form>}
        </Formik>
    )
}
