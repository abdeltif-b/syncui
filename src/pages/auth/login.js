import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const router = useRouter();
  const defaultValues = {
    login: "",
    password: "",
  };

  const {
    control,
    setError,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const onSubmit = async (formData) => {
    const config = {
      params: {
        ...formData,
      },
    };

    // mock up success login and return to home page
    router.push("/");
    reset();
  };

  const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>;
  };

  return (
    <div className="flex align-items-center justify-content-center my-8">
      <div className="surface-card p-4 shadow-2 border-round w-full md:w-7 lg:w-4">
        <div className="text-center mb-5">
          <img src="/assets/img/logo_dark.png" alt="planiverse" height={35} className="mb-3" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
          <div className="field py-2">
            <span className="p-float-label p-input-icon-right">
              <i className="pi pi-envelope" />
              <Controller
                name="login"
                control={control}
                rules={{ required: "Ce champ est requis" }}
                render={({ field, fieldState }) => (
                  <InputText id={field.name} {...field} className={classNames({ "p-invalid": fieldState.invalid })} />
                )}
              />
              <label htmlFor="login" className={classNames({ "p-error": !!errors.login })}>
                Email*
              </label>
            </span>
            {getFormErrorMessage("login")}
          </div>
          <div className="field py-2">
            <span className="p-float-label">
              <Controller
                name="password"
                control={control}
                rules={{ required: "Ce champ est requis" }}
                render={({ field, fieldState }) => (
                  <Password
                    id={field.name}
                    {...field}
                    toggleMask
                    feedback={false}
                    className={classNames({ "p-invalid": fieldState.invalid })}
                  />
                )}
              />
              <label htmlFor="password" className={classNames({ "p-error": errors.password })}>
                Mot de passe*
              </label>
            </span>
            {getFormErrorMessage("password")}
          </div>

          <Button
            type="submit"
            label="Connexion"
            icon={<FontAwesomeIcon icon={faRightToBracket} className="mr-2" />}
            className="w-3 mt-3"
          />
        </form>
      </div>
    </div>
  );
}
