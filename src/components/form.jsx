import React from 'react';
import "../assets/styles/form.css";
import { useForm } from 'react-hook-form';

const Form = () => {
	const { register, handleSubmit, formState: { errors } } = useForm();

	const onSubmit = (data) => {
		console.log(data);
		alert('Form submitted successfully!');
		alert(`Username: ${data.newUser}\nPassword: ${data.newPassword}`);
	};

	const getPasswordMessageClass = (message) => {
		if (message === 'Password is required') {
			return 'form-new-credentials__message--error';
		}
		if (message.startsWith('Weak')) {
			return 'form-new-credentials__message--weak';
		}
		if (message.startsWith('Medium')) {
			return 'form-new-credentials__message--medium';
		}
		if (message.startsWith('Strong')) {
			return 'form-new-credentials__message--strong';
		}
		return '';
	};

	return (
		<div className='form-new-credentials'>
			<form onSubmit={handleSubmit(onSubmit)} className='form-new-credentials__form'>
				<p className='form-new-credentials__title'>New Credentials</p>

				<div className='form-new-credentials__field'>
					<label htmlFor="username" className='form-new-credentials__label'>New username</label>
					<input
						type="text"
						id="username"
						className='form-new-credentials__input'
						{...register('newUser', {
							required: 'Username is required',
							minLength: { value: 3, message: 'Minimum length is 3 characters' },
							validate: value => {
								const trimmedValue = value.trim();
								if (trimmedValue === 'admin' || trimmedValue === 'root') {
									return 'This username is reserved';
								}
								return true;
							}
						})}
						autoComplete="username"
					/>
					{errors.newUser && <span className='form-new-credentials__message form-new-credentials__message--error'>{errors.newUser.message}</span>}
				</div>

				<div className='form-new-credentials__field'>
					<label htmlFor="password" className='form-new-credentials__label'>New password</label>
					<input
						type="password"
						id="password"
						className='form-new-credentials__input'
						{...register('newPassword', {
							required: 'Password is required',
							validate: value => {
								if (/^[a-zA-Z]+$/.test(value)) {
									return 'Weak password: The password contains only letters.';
								}
								if (/^[a-zA-Z0-9]+$/.test(value)) {
									return 'Medium password: The password contains only numbers and letters.';
								}
								if (!/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/.test(value)) {
									return 'Strong password: The password is at least an 8 characters combination of numbers, letters, and special characters.';
								}
								return true;
							}
						})}
						autoComplete="current-password"
					/>
					{errors.newPassword && (
						<span className={`form-new-credentials__message ${getPasswordMessageClass(errors.newPassword.message)}`}>
							{errors.newPassword.message}
						</span>
					)}
				</div>

				<button type="submit" className='form-new-credentials__button'>Submit</button>
			</form>
		</div>
	);
};

export default Form;