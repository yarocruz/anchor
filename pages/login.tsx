import {signIn} from "next-auth/react";
import Image from 'next/image'
import "../app/globals.css"
import styles from "./Form.module.css"
export default function Login() {
    return (
        <section className='w-3/4 mx-auto flex flex-col gap-10 items-center'>

            {/* form */}
            <div className='flex flex-col gap-5'>
                <div className={styles.input_group}>
                    <input
                        className={styles.input_text}
                        type="email"
                        name='email'
                        placeholder='Email'
                    />
                </div>
                <div className={styles.input_group}>
                    <input
                        className={styles.input_text}
                        type="password"
                        name='password'
                        placeholder='password'
                    />
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
            </div>

            {/* bottom */}
            <p className='text-center text-gray-400 '>
                {/*don't have an account yet? <Link href={'/register'}><a className='text-blue-700'>Sign Up</a></Link>*/}
            </p>
        </section>

    );
}