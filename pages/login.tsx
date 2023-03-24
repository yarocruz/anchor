import {signIn} from "next-auth/react";
import Image from 'next/image'
import "../app/globals.css"
import styles from "./Form.module.css"
import React from "react";
import Link from "next/link";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useState } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';

interface LoginData {
    email: string,
    password: string
}
export default function Login() {
    const [show, setShow] = useState(false)
    const router = useRouter()
    // formik hook
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit
    })

    async function onSubmit(values: LoginData) {
        const status = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl: "/"
        })

        if(status?.ok) await router.push(status.url!)
    }

    return (
        <section className='w-3/4 mx-auto flex flex-col gap-10 items-center'>
            {/* form */}
            <form className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>
                <div className={styles.input_group}>
                    <input
                        className={styles.input_text}
                        type="email"
                        name='email'
                        placeholder='Email'
                        {...formik.getFieldProps('email')}
                    />
                    <span className='icon flex items-center px-4'>
                        <HiAtSymbol size={25} />
                    </span>
                </div>
                <div className={styles.input_group}>
                    <input
                        className={styles.input_text}
                        type="password"
                        name='password'
                        placeholder='password'
                        {...formik.getFieldProps('password')}
                    />
                    <span className='icon flex items-center px-4' onClick={() => setShow(!show)}>
                        <HiFingerPrint size={25} />
                    </span>
                </div>

                {/* login buttons */}
                <div className="input-button">
                    <button type='submit' className={styles.button}>
                        Login
                    </button>
                </div>
                <div className="input-button">
                    <button type='submit' className={styles.button_custom} onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000'})}>
                        Sign In with Google <Image src={'/assets/google.svg'} width="20" height={20} alt="Google Logo"></Image>
                    </button>
                </div>
                <div className="input-button">
                    <button className={styles.button_custom} onClick={() => signIn('github', { callbackUrl: 'http://localhost:3000'})}>
                        Sign In with Github <Image src={'/assets/github.svg'} width={25} height={25} alt="Github Log"></Image>
                    </button>
                </div>
            </form>

            {/* bottom */}
            <p className='text-center text-gray-400 '>
                don't have an account yet? <Link className='text-blue-700' href={'/register'}>Sign Up</Link>
            </p>
        </section>

    );
}