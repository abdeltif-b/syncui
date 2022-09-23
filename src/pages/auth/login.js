import { useEffect, useState } from "react";
import Router, { useRouter } from 'next/router';
import { usePostAuth } from "../../hooks/services";
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons';


export default function Login() {
	const router = useRouter()
	const defaultValues = {
		login: '',
		password: '',
	}

	const { control, setError, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

	const onSubmit = async (formData) => {

		const config = {
			params: {
				db: process.env.NEXT_PUBLIC_DB_NAME,
				...formData
			}
		}
		const data = await usePostAuth(config)

		// FIXME setError does not work
		// TODO fix router pushing to home page instead of full reload
		if (data?.result) router.push('/')
		if (data.error) setError("login", { type: "server", message: 'data.error.data.arguments[0]' })
		reset()
	};

	const getFormErrorMessage = (name) => {
		return errors[name] && <small className="p-error">{errors[name].message}</small>
	};


	return (

		// <form o
		<div className="flex align-items-center justify-content-center my-8">
			<div className="surface-card p-4 shadow-2 border-round w-full md:w-7 lg:w-4">
				<div className="text-center mb-5">
					<img src="/assets/img/logo_dark.png" alt="planiverse" height={35} className="mb-3" />
					{/* <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
					<span className="text-600 font-medium line-height-3">Don't have an account?</span>
				<a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a> */}
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
					<div className="field py-2">
						<span className="p-float-label p-input-icon-right">
							<i className="pi pi-envelope" />
							{/* <FontAwesomeIcon icon={faEnvelope} /> */}
							<Controller name="login" control={control}
								// rules={{ required: 'Ce champ est requis', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Adresse e-mail invalide' } }}
								rules={{ required: 'Ce champ est requis' }}
								render={({ field, fieldState }) => (
									<InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
								)} />
							<label htmlFor="login" className={classNames({ 'p-error': !!errors.login })}>Email*</label>
						</span>
						{getFormErrorMessage('login')}
					</div>
					<div className="field py-2">
						<span className="p-float-label">
							<Controller name="password" control={control} rules={{ required: 'Ce champ est requis' }} render={({ field, fieldState }) => (
								<Password id={field.name} {...field} toggleMask feedback={false} className={classNames({ 'p-invalid': fieldState.invalid })} />
							)} />
							<label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Mot de passe*</label>
						</span>
						{getFormErrorMessage('password')}
					</div>




					{/* <div className="flex align-items-center justify-content-between mb-6">
						<div className="flex align-items-center">
						</div>
						<a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Mot de passe oublié?</a>
					</div> */}

					<Button type="submit" label="Connexion" icon={<FontAwesomeIcon icon={faRightToBracket} className="mr-2" />} className='w-3 mt-3' />
				</form>

			</div>
		</div>

	);
}