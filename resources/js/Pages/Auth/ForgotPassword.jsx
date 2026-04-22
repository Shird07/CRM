import { Head, useForm } from '@inertiajs/react'

export default function ForgotPassword() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    })

    const submit = (e) => {
        e.preventDefault()
        post('/forgot-password')
    }

    return (
        <>
            <Head title="Forgot Password" />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2c3e50] to-[#8e44ad]">

                <div className="bg-white/95 p-8 rounded-2xl shadow-xl w-[380px]">

                    <h2 className="text-2xl font-bold text-center mb-3">
                        Reset Password 
                    </h2>

                    <p className="text-center text-gray-500 mb-6 text-sm">
                        Masukkan email, kami kirim link reset
                    </p>

                    <form onSubmit={submit} className="space-y-4">

                        <input
                            type="email"
                            placeholder="Masukkan email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-purple-500"
                        />

                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                        <button
                            disabled={processing}
                            className="w-full py-3 rounded-lg text-white font-semibold 
                            bg-gradient-to-r from-pink-500 to-purple-600"
                        >
                            Kirim Link Reset
                        </button>

                    </form>

                </div>
            </div>
        </>
    )
}