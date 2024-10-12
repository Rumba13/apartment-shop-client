import './sign-in-form.scss';
import {Form, Formik} from "formik";
import {Field} from "../../../shared/ui/field/ui";
import {useTypedTranslation} from "../../../app/i18n/use-typed-translation";
import {signInService} from "../../../shared/api/sign-in-service";
import {SignInDto} from "../../../shared/api/types/sign-in.dto";
import {useCookies} from "react-cookie";
import {userStore} from "../../../entities/user";

type ValuesType = SignInDto;

type PropsType = {
    onSignIn?: Function
}

export function SignInForm({onSignIn}: PropsType) {
    const {t} = useTypedTranslation()
    const [cookies, setCookie] = useCookies(["ACCESS-TOKEN", "REFRESH-TOKEN"], {
        doNotParse: true,
    });

    return (
        <Formik<ValuesType> initialValues={{username: "", password: ""}} onSubmit={(values, formikHelpers) => {
            signInService.signIn(values).then((response) => {
                setCookie("ACCESS-TOKEN", response.access_token, {secure: true});
                setCookie("REFRESH-TOKEN", response.refresh_token, {secure: true});
                userStore.auth(response.access_token);
                onSignIn?.();
            }).catch((err) => {
                    console.log(err)
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
